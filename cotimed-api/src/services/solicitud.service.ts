// cotimed-api/src/services/solicitud.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoCotizacion,
    EstadoMensaje,
    EstadoSolicitud,
    NivelUrgencia,
    TipoDocumentoArchivo,
    TipoMensaje,
    TipoMoneda,
    TipoPago,
} from "@prisma/client";


// =========================================================
// SERVICE: SOLICITUD
// =========================================================


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
                    telefono: true,
                    estado: true,
                    rol: true,
                },
            },

            items: true,
            cotizaciones: true,
            mensajes: true,
            archivos: true,

            adjudicacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
                id: id,
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
                        telefono: true,
                        estado: true,
                        rol: true,
                    },
                },

                items: true,
                cotizaciones: true,
                mensajes: true,
                archivos: true,

                adjudicacion: {
                    select: {
                        id: true,
                        estado: true,
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
// CREAR SOLICITUD
// =========================================================

export const crearSolicitud = async (data: {

    numero: string;
    titulo: string;
    descripcion: string;
    institucion_id: number;
    creado_por_id: number;

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

    eliminado?: boolean;


    // =====================================================
    // ITEMS
    // =====================================================

    items?: {

        solicitud_id: number;

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


    // =====================================================
    // COTIZACIONES
    // =====================================================

    cotizaciones?: {

        numero: string;

        solicitud_id: number;
        proveedor_id: number;
        usuario_id: number;

        estado?: EstadoCotizacion;

        moneda?: TipoMoneda;

        subtotal: number;

        impuestos?: number;
        descuento?: number;
        envio?: number;

        total: number;

        plazo_entrega_dias?: number;
        garantia_meses?: number;
        validez_dias?: number;

        fecha_vencimiento?: Date;

        condiciones_pago?: TipoPago;

        condiciones?: string;
        observaciones?: string;

        fecha_envio?: Date;

    }[];


    // =====================================================
    // MENSAJES
    // =====================================================

    mensajes?: {

        solicitud_id?: number;
        cotizacion_id?: number;

        remitente_id: number;

        tipo?: TipoMensaje;

        contenido: string;

        estado?: EstadoMensaje;

        fecha_lectura?: Date;

    }[];


    // =====================================================
    // ARCHIVOS
    // =====================================================

    archivos?: {

        nombre: string;

        nombre_original?: string;

        url: string;

        tipo_mime?: string;

        extension?: string;

        tamanio_bytes?: number;

        tipo: TipoDocumentoArchivo;

        usuario_id?: number;

        solicitud_id?: number;

        cotizacion_id?: number;

    }[];

}) => {


    // =====================================================
    // VERIFICAR INSTITUCION
    // =====================================================

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: data.institucion_id,
            },
        });

    if (!institucion) {

        throw new Error(
            "La institucion no existe"
        );
    }


    // =====================================================
    // VERIFICAR USUARIO
    // =====================================================

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: data.creado_por_id,
            },
        });

    if (!usuario) {

        throw new Error(
            "El usuario no existe"
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

            estado:
                data.estado,

            urgencia:
                data.urgencia,

            fecha_publicacion:
                data.fecha_publicacion,

            fecha_limite_cotizacion:
                data.fecha_limite_cotizacion,

            fecha_cierre:
                data.fecha_cierre,

            presupuesto_estimado:
                data.presupuesto_estimado,

            moneda:
                data.moneda,

            condiciones:
                data.condiciones,

            observaciones:
                data.observaciones,

            lugar_entrega:
                data.lugar_entrega,

            requiere_instalacion:
                data.requiere_instalacion,

            requiere_capacitacion:
                data.requiere_capacitacion,

            eliminado:
                data.eliminado,


            // =================================================
            // ITEMS
            // =================================================

            items: {

                create:
                    (data.items ?? []).map((item) => ({

                        solicitud_id:
                            item.solicitud_id,

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


            // =================================================
            // COTIZACIONES
            // =================================================

            cotizaciones: {

                create:
                    (data.cotizaciones ?? []).map((item) => ({

                        numero:
                            item.numero,

                        solicitud_id:
                            item.solicitud_id,

                        proveedor_id:
                            item.proveedor_id,

                        usuario_id:
                            item.usuario_id,

                        estado:
                            item.estado,

                        moneda:
                            item.moneda,

                        subtotal:
                            item.subtotal,

                        impuestos:
                            item.impuestos,

                        descuento:
                            item.descuento,

                        envio:
                            item.envio,

                        total:
                            item.total,

                        plazo_entrega_dias:
                            item.plazo_entrega_dias,

                        garantia_meses:
                            item.garantia_meses,

                        validez_dias:
                            item.validez_dias,

                        fecha_vencimiento:
                            item.fecha_vencimiento,

                        condiciones_pago:
                            item.condiciones_pago,

                        condiciones:
                            item.condiciones,

                        observaciones:
                            item.observaciones,

                        fecha_envio:
                            item.fecha_envio,

                    })),
            },


            // =================================================
            // MENSAJES
            // =================================================

            mensajes: {

                create:
                    (data.mensajes ?? []).map((item) => ({

                        solicitud_id:
                            item.solicitud_id,

                        cotizacion_id:
                            item.cotizacion_id,

                        remitente_id:
                            item.remitente_id,

                        tipo:
                            item.tipo,

                        contenido:
                            item.contenido,

                        estado:
                            item.estado,

                        fecha_lectura:
                            item.fecha_lectura,

                    })),
            },


            // =================================================
            // ARCHIVOS
            // =================================================

            archivos: {

                create:
                    (data.archivos ?? []).map((item) => ({

                        nombre:
                            item.nombre,

                        nombre_original:
                            item.nombre_original,

                        url:
                            item.url,

                        tipo_mime:
                            item.tipo_mime,

                        extension:
                            item.extension,

                        tamanio_bytes:
                            item.tamanio_bytes,

                        tipo:
                            item.tipo,

                        usuario_id:
                            item.usuario_id,

                        solicitud_id:
                            item.solicitud_id,

                        cotizacion_id:
                            item.cotizacion_id,

                    })),
            },
        },


        // =====================================================
        // INCLUDE
        // =====================================================

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
                    telefono: true,
                    estado: true,
                    rol: true,
                },
            },

            items: true,

            cotizaciones: true,

            mensajes: true,

            archivos: true,

            adjudicacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// ACTUALIZAR SOLICITUD
// =========================================================

export const actualizarSolicitud = async (

    id: number,

    data: {

        numero?: string;

        titulo?: string;

        descripcion?: string;

        institucion_id?: number;

        creado_por_id?: number;

        estado?: EstadoSolicitud;

        urgencia?: NivelUrgencia;

        fecha_publicacion?: Date | null;

        fecha_limite_cotizacion?: Date | null;

        fecha_cierre?: Date | null;

        presupuesto_estimado?: number | null;

        moneda?: TipoMoneda;

        condiciones?: string | null;

        observaciones?: string | null;

        lugar_entrega?: string | null;

        requiere_instalacion?: boolean;

        requiere_capacitacion?: boolean;

        eliminado?: boolean;

    },

) => {

    const solicitud =
        await prisma.solicitud.findUnique({

            where: {
                id: id,
            },
        });

    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada"
        );
    }

    return await prisma.solicitud.update({

        where: {
            id: id,
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
                    telefono: true,
                    estado: true,
                    rol: true,
                },
            },

            items: true,

            cotizaciones: true,

            mensajes: true,

            archivos: true,

            adjudicacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
                id: id,
            },
        });

    if (!solicitud) {

        throw new Error(
            "Solicitud no encontrada"
        );
    }

    return await prisma.solicitud.update({

        where: {
            id: id,
        },

        data: {
            eliminado: true,
        },
    });
};