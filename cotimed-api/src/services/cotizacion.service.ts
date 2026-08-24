// cotimed-api/src/services/cotizacion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoCotizacion,
    TipoMoneda,
    TipoPago,
} from "@prisma/client";


// =========================================================
// SERVICE: COTIZACION
// =========================================================


// =========================================================
// LISTAR TODAS LAS COTIZACIONES
// =========================================================

export const listarCotizaciones = async () => {

    return await prisma.cotizacion.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            solicitud: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
            usuario: {
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
            archivos: true,
            mensajes: true,
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
// BUSCAR COTIZACION POR ID
// =========================================================

export const buscarCotizacion = async (
    id: number
) => {

    const cotizacion =
        await prisma.cotizacion.findUnique({

            where: {
                id: id,
            },

            include: {
            solicitud: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
            usuario: {
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
            archivos: true,
            mensajes: true,
            adjudicacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
        });

    if (!cotizacion) {

        throw new Error(
            "Cotizacion no encontrado"
        );
    }

    return 
        cotizacion;
};


// =========================================================
// CREAR COTIZACION
// =========================================================

export const crearCotizacion = async (data: {

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

        items?: {
            cotizacion_id: number;
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
        }[];

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

        mensajes?: {
            solicitud_id?: number;
            cotizacion_id?: number;
            remitente_id: number;
            tipo?: TipoMensaje;
            contenido: string;
            estado?: EstadoMensaje;
            fecha_lectura?: Date;
        }[];

}) => {

    // =====================================================
    // VERIFICAR SOLICITUD
    // =====================================================

    const solicitud =
        await prisma.solicitud.findUnique({

            where: {
                id: data.solicitud_id,
            },
        });

    if (!solicitud) {

        throw new Error(
            "El solicitud no existe"
        );
    }

    // =====================================================
    // VERIFICAR PROVEEDOR
    // =====================================================

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: data.proveedor_id,
            },
        });

    if (!proveedor) {

        throw new Error(
            "El proveedor no existe"
        );
    }

    // =====================================================
    // VERIFICAR USUARIO
    // =====================================================

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: data.usuario_id,
            },
        });

    if (!usuario) {

        throw new Error(
            "El usuario no existe"
        );
    }

    return await prisma.cotizacion.create({

        data: {

            numero:
                data.numero,

            solicitud_id:
                data.solicitud_id,

            proveedor_id:
                data.proveedor_id,

            usuario_id:
                data.usuario_id,

            estado:
                data.estado,

            moneda:
                data.moneda,

            subtotal:
                data.subtotal,

            impuestos:
                data.impuestos,

            descuento:
                data.descuento,

            envio:
                data.envio,

            total:
                data.total,

            plazo_entrega_dias:
                data.plazo_entrega_dias,

            garantia_meses:
                data.garantia_meses,

            validez_dias:
                data.validez_dias,

            fecha_vencimiento:
                data.fecha_vencimiento,

            condiciones_pago:
                data.condiciones_pago,

            condiciones:
                data.condiciones,

            observaciones:
                data.observaciones,

            fecha_envio:
                data.fecha_envio,

            items: {
                create:
                    data.items.map((item) => ({
                        cotizacion_id:
                            item.cotizacion_id,
                        item_solicitud_id:
                            item.item_solicitud_id,
                        equipamento_id:
                            item.equipamento_id,
                        nombre:
                            item.nombre,
                        descripcion:
                            item.descripcion,
                        cantidad:
                            item.cantidad,
                        precio_unitario:
                            item.precio_unitario,
                        descuento:
                            item.descuento,
                        subtotal:
                            item.subtotal,
                        impuestos:
                            item.impuestos,
                        total:
                            item.total,
                        estado:
                            item.estado,
                        plazo_entrega_dias:
                            item.plazo_entrega_dias,
                        garantia_meses:
                            item.garantia_meses,
                        incluye:
                            item.incluye,
                        observaciones:
                            item.observaciones,
                    })),
            },
            archivos: {
                create:
                    data.archivos.map((item) => ({
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
            mensajes: {
                create:
                    data.mensajes.map((item) => ({
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
        },

        include: {
            solicitud: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
            usuario: {
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
            archivos: true,
            mensajes: true,
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
// ACTUALIZAR COTIZACION
// =========================================================

export const actualizarCotizacion = async (

    id: number,

    data: {

        numero?: string;
        solicitud_id?: number;
        proveedor_id?: number;
        usuario_id?: number;
        estado?: EstadoCotizacion;
        moneda?: TipoMoneda;
        subtotal?: number;
        impuestos?: number;
        descuento?: number;
        envio?: number;
        total?: number;
        plazo_entrega_dias?: number | null;
        garantia_meses?: number | null;
        validez_dias?: number | null;
        fecha_vencimiento?: Date | null;
        condiciones_pago?: TipoPago | null;
        condiciones?: string | null;
        observaciones?: string | null;
        fecha_envio?: Date | null;

    },

) => {

    const cotizacion =
        await prisma.cotizacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!cotizacion) {

        throw new Error(
            "Cotizacion no encontrado"
        );
    }

    return await prisma.cotizacion.update({

        where: {
            id: id,
        },

        data,

        include: {
            solicitud: {
                select: {
                    id: true,
                    estado: true,
                },
            },
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
            usuario: {
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
            archivos: true,
            mensajes: true,
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
// ELIMINAR COTIZACION
// =========================================================

export const eliminarCotizacion = async (
    id: number
) => {

    const cotizacion =
        await prisma.cotizacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!cotizacion) {

        throw new Error(
            "Cotizacion no encontrado"
        );
    }

    return await prisma.cotizacion.delete({

        where: {
            id: id,
        },
    });
};