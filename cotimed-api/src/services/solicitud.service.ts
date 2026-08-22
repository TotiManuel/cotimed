// cotimed-api/src/services/solicitudes.service.ts

import prisma from "../prisma/prisma";
import {
    EstadoSolicitud,
    NivelUrgencia,
    TipoMoneda,
} from "@prisma/client";


// =========================================================
// LISTAR TODAS LAS SOLICITUDES
// =========================================================

export const listarSolicitudes = async () => {

    return await prisma.solicitud.findMany({

        where: {
            eliminado: false,
        },

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {

            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },

            creado_por: {
                select: {
                    id: true,
                    nombre: true,
                    apellido: true,
                    email: true,
                    rol: true,
                },
            },

            items: true,

            cotizaciones: true,
        },
    });
};


// =========================================================
// BUSCAR SOLICITUD POR ID
// =========================================================

export const buscarSolicitud = async (
    id: number
) => {

    const solicitud =
        await prisma.solicitud.findUnique({

            where: {
                id,
            },

            include: {

                institucion: {
                    select: {
                        id: true,
                        razon_social: true,
                        nombre_comercial: true,
                        email: true,
                        telefono: true,
                        estado: true,
                    },
                },

                creado_por: {
                    select: {
                        id: true,
                        nombre: true,
                        apellido: true,
                        email: true,
                        rol: true,
                    },
                },

                items: {

                    include: {

                        equipamento: true,
                    },
                },

                cotizaciones: {

                    include: {

                        proveedor: {
                            select: {
                                id: true,
                                razon_social: true,
                                nombre_comercial: true,
                                email: true,
                                telefono: true,
                                estado: true,
                                verificado: true,
                            },
                        },

                        items: true,
                    },
                },
            },
        });


    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada"
        );
    }


    return solicitud;
};


// =========================================================
// LISTAR SOLICITUDES DE UNA INSTITUCIÓN
// =========================================================

export const listarSolicitudesPorInstitucion = async (
    id_institucion: number
) => {

    return await prisma.solicitud.findMany({

        where: {

            institucion_id:
                id_institucion,

            eliminado: false,
        },

        orderBy: {

            fecha_creacion:
                "desc",
        },

        include: {

            items: true,

            cotizaciones: {

                include: {

                    proveedor: {
                        select: {
                            id: true,
                            razon_social: true,
                            nombre_comercial: true,
                            email: true,
                            estado: true,
                            verificado: true,
                        },
                    },

                    items: true,
                },
            },
        },
    });
};


// =========================================================
// CREAR SOLICITUD
// =========================================================

export const crearSolicitud = async (data: {

    numero: string;

    titulo: string;

    descripcion: string;

    institucion_id: number;

    creado_por_id: number;

    urgencia?: NivelUrgencia;

    estado?: EstadoSolicitud;

    fecha_limite_cotizacion?: Date;

    presupuesto_estimado?: number;

    moneda?: TipoMoneda;

    condiciones?: string;

    observaciones?: string;

    lugar_entrega?: string;

    requiere_instalacion?: boolean;

    requiere_capacitacion?: boolean;

    items: {

        equipamento_id?: number;

        nombre: string;

        descripcion?: string;

        cantidad: number;

        especificaciones?: string;

        marca_preferida?: string;

        modelo_preferido?: string;

        unidad_medida?: string;

        presupuesto_unitario?: number;

        presupuesto_total?: number;

    }[];

}) => {


    // =====================================================
    // VERIFICAR INSTITUCIÓN
    // =====================================================

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: data.institucion_id,
            },
        });


    if (!institucion) {

        throw new Error(
            "La institución no existe"
        );
    }


    // =====================================================
    // VERIFICAR USUARIO CREADOR
    // =====================================================

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: data.creado_por_id,
            },
        });


    if (!usuario) {

        throw new Error(
            "El usuario creador no existe"
        );
    }


    // =====================================================
    // CREAR SOLICITUD
    // =====================================================

    return await prisma.solicitud.create({

        data: {

            numero:
                data.numero,

            titulo:
                data.titulo,

            descripcion:
                data.descripcion,

            institucion_id:
                data.institucion_id,

            creado_por_id:
                data.creado_por_id,

            urgencia:
                data.urgencia ??
                NivelUrgencia.MEDIA,

            estado:
                data.estado ??
                EstadoSolicitud.BORRADOR,

            fecha_limite_cotizacion:
                data.fecha_limite_cotizacion,

            presupuesto_estimado:
                data.presupuesto_estimado,

            moneda:
                data.moneda ??
                TipoMoneda.ARS,

            condiciones:
                data.condiciones,

            observaciones:
                data.observaciones,

            lugar_entrega:
                data.lugar_entrega,

            requiere_instalacion:
                data.requiere_instalacion ??
                false,

            requiere_capacitacion:
                data.requiere_capacitacion ??
                false,

            items: {

                create:
                    data.items.map((item) => ({

                        equipamento_id:
                            item.equipamento_id,

                        nombre:
                            item.nombre,

                        descripcion:
                            item.descripcion,

                        cantidad:
                            item.cantidad,

                        especificaciones:
                            item.especificaciones,

                        marca_preferida:
                            item.marca_preferida,

                        modelo_preferido:
                            item.modelo_preferido,

                        unidad_medida:
                            item.unidad_medida,

                        presupuesto_unitario:
                            item.presupuesto_unitario,

                        presupuesto_total:
                            item.presupuesto_total,
                    })),
            },
        },

        include: {

            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },

            creado_por: {
                select: {
                    id: true,
                    nombre: true,
                    apellido: true,
                    email: true,
                    rol: true,
                },
            },

            items: true,

            cotizaciones: true,
        },
    });
};


// =========================================================
// ACTUALIZAR SOLICITUD
// =========================================================

export const actualizarSolicitud = async (

    id: number,

    data: {

        titulo?: string;

        descripcion?: string;

        estado?: EstadoSolicitud;

        urgencia?: NivelUrgencia;

        fecha_publicacion?: Date;

        fecha_limite_cotizacion?: Date;

        fecha_cierre?: Date;

        presupuesto_estimado?: number;

        moneda?: TipoMoneda;

        condiciones?: string;

        observaciones?: string;

        lugar_entrega?: string;

        requiere_instalacion?: boolean;

        requiere_capacitacion?: boolean;

    }

) => {


    const solicitud =
        await prisma.solicitud.findUnique({

            where: {
                id,
            },
        });


    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada"
        );
    }


    return await prisma.solicitud.update({

        where: {
            id,
        },

        data,

        include: {

            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },

            creado_por: {
                select: {
                    id: true,
                    nombre: true,
                    apellido: true,
                    email: true,
                    rol: true,
                },
            },

            items: true,

            cotizaciones: true,
        },
    });
};


// =========================================================
// ELIMINAR SOLICITUD
// =========================================================

export const eliminarSolicitud = async (
    id: number
) => {


    const solicitud =
        await prisma.solicitud.findUnique({

            where: {
                id,
            },
        });


    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada"
        );
    }


    return await prisma.solicitud.update({

        where: {
            id,
        },

        data: {
            eliminado: true,
        },
    });
};