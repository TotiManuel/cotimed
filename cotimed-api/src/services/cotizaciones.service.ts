import prisma from "../prisma/prisma";

import {
    EstadoCotizacion,
    TipoMoneda,
    TipoPago,
    EstadoItemCotizacion,
} from "@prisma/client";


// =========================================================
// DATOS PARA CREAR COTIZACIÓN
// =========================================================

export interface CrearCotizacionData {

    solicitud_id: number;

    proveedor_id: number;

    usuario_id: number;

    moneda?: TipoMoneda;

    subtotal: number;

    impuestos?: number;

    descuento?: number;

    envio?: number;

    total: number;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    validez_dias?: number;

    condiciones_pago?: TipoPago;

    condiciones?: string;

    observaciones?: string;

    fecha_envio?: Date;

    estado?: EstadoCotizacion;

    items?: CrearItemCotizacionData[];
}


// =========================================================
// DATOS PARA CREAR ITEM DE COTIZACIÓN
// =========================================================

export interface CrearItemCotizacionData {

    item_solicitud_id?: number;

    equipamento_id?: number;

    nombre: string;

    descripcion?: string;

    cantidad: number;

    precio_unitario: number;

    descuento?: number;

    subtotal: number;

    impuestos?: number;

    total: number;

    estado?: EstadoItemCotizacion;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    incluye?: string;

    observaciones?: string;
}


// =========================================================
// DATOS PARA ACTUALIZAR COTIZACIÓN
// =========================================================

export interface ActualizarCotizacionData {

    solicitud_id?: number;

    proveedor_id?: number;

    usuario_id?: number;

    moneda?: TipoMoneda;

    subtotal?: number;

    impuestos?: number;

    descuento?: number;

    envio?: number;

    total?: number;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    validez_dias?: number;

    condiciones_pago?: TipoPago;

    condiciones?: string;

    observaciones?: string;

    fecha_envio?: Date;

    estado?: EstadoCotizacion;

    items?: CrearItemCotizacionData[];
}


// =========================================================
// LISTAR TODAS LAS COTIZACIONES
// =========================================================

export const listarCotizaciones = async () => {

    return await prisma.cotizacion.findMany({

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,

                },

            },

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

            archivos: true,

            mensajes: true,

            adjudicacion: true,

        },

        orderBy: {

            fecha_creacion: "desc",

        },

    });

};


// =========================================================
// BUSCAR COTIZACIÓN
// =========================================================

export const buscarCotizacion = async (

    id: number

) => {

    return await prisma.cotizacion.findUnique({

        where: {

            id,

        },

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,

                },

            },

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

            archivos: true,

            mensajes: true,

            adjudicacion: true,

        },

    });

};


// =========================================================
// LISTAR COTIZACIONES DE UNA SOLICITUD
// =========================================================

export const listarCotizacionesPorSolicitud = async (

    solicitud_id: number

) => {

    return await prisma.cotizacion.findMany({

        where: {

            solicitud_id,

        },

        include: {

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,

                },

            },

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

        },

        orderBy: {

            total: "asc",

        },

    });

};


// =========================================================
// LISTAR COTIZACIONES DE UN PROVEEDOR
// =========================================================

export const listarCotizacionesPorProveedor = async (

    proveedor_id: number

) => {

    return await prisma.cotizacion.findMany({

        where: {

            proveedor_id,

        },

        include: {

            solicitud: true,

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

        },

        orderBy: {

            fecha_creacion: "desc",

        },

    });

};


// =========================================================
// CREAR COTIZACIÓN
// =========================================================

export const crearCotizacion = async (

    data: CrearCotizacionData

) => {

    const {

        items,

        ...datosCotizacion

    } = data;


    // =====================================================
    // CREAR COTIZACIÓN
    // =====================================================

    return await prisma.cotizacion.create({

        data: {

            ...datosCotizacion,

            numero:
                `COT-${Date.now()}`,

            items:

                items &&
                items.length > 0

                    ? {

                        create:
                            items,

                    }

                    : undefined,

        },

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,

                },

            },

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

        },

    });

};


// =========================================================
// ACTUALIZAR COTIZACIÓN
// =========================================================

export const actualizarCotizacion = async (

    id: number,

    data: ActualizarCotizacionData

) => {

    const {

        items,

        ...datosCotizacion

    } = data;


    // =====================================================
    // SI SE MANDAN ITEMS
    // =====================================================

    if (items !== undefined) {

        return await prisma.$transaction(

            async (tx) => {

                // =========================================
                // ELIMINAR ITEMS ANTERIORES
                // =========================================

                await tx.itemCotizacion.deleteMany({

                    where: {

                        cotizacion_id: id,

                    },

                });


                // =========================================
                // ACTUALIZAR COTIZACIÓN
                // =========================================

                return await tx.cotizacion.update({

                    where: {

                        id,

                    },

                    data: {

                        ...datosCotizacion,

                        items: {

                            create: items,

                        },

                    },

                    include: {

                        solicitud: true,

                        proveedor: {

                            select: {

                                id: true,

                                razon_social: true,

                                nombre_comercial: true,

                                email: true,

                                telefono: true,

                            },

                        },

                        usuario: {

                            select: {

                                id: true,

                                nombre: true,

                                apellido: true,

                                email: true,

                            },

                        },

                        items: true,

                    },

                });

            }

        );

    }


    // =====================================================
    // ACTUALIZAR SOLO COTIZACIÓN
    // =====================================================

    return await prisma.cotizacion.update({

        where: {

            id,

        },

        data: datosCotizacion,

        include: {

            solicitud: true,

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,

                },

            },

            usuario: {

                select: {

                    id: true,

                    nombre: true,

                    apellido: true,

                    email: true,

                },

            },

            items: true,

        },

    });

};


// =========================================================
// ELIMINAR COTIZACIÓN
// =========================================================

export const eliminarCotizacion = async (

    id: number

) => {

    return await prisma.cotizacion.delete({

        where: {

            id,

        },

    });

};


// =========================================================
// AGREGAR ITEM A COTIZACIÓN
// =========================================================

export const agregarItemCotizacion = async (

    cotizacion_id: number,

    data: CrearItemCotizacionData

) => {

    return await prisma.itemCotizacion.create({

        data: {

            cotizacion_id,

            ...data,

        },

    });

};


// =========================================================
// ELIMINAR ITEM DE COTIZACIÓN
// =========================================================

export const eliminarItemCotizacion = async (

    id: number

) => {

    return await prisma.itemCotizacion.delete({

        where: {

            id,

        },

    });

};