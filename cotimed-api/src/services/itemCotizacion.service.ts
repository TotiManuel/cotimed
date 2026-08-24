// cotimed-api/src/services/itemCotizacion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoItemCotizacion,
} from "@prisma/client";


// =========================================================
// SERVICE: ITEMCOTIZACION
// =========================================================


// =========================================================
// LISTAR TODAS LAS ITEMCOTIZACCIONES
// =========================================================

export const listarItemcotizacciones = async () => {

    return await prisma.itemCotizacion.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// BUSCAR ITEMCOTIZACION POR ID
// =========================================================

export const buscarItemCotizacion = async (
    id: number
) => {

    const itemCotizacion =
        await prisma.itemCotizacion.findUnique({

            where: {
                id: id,
            },

            include: {
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
        });

    if (!itemCotizacion) {

        throw new Error(
            "ItemCotizacion no encontrado"
        );
    }

    return 
        itemCotizacion;
};


// =========================================================
// CREAR ITEMCOTIZACION
// =========================================================

export const crearItemCotizacion = async (data: {

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

}) => {

    // =====================================================
    // VERIFICAR COTIZACION
    // =====================================================

    const cotizacion =
        await prisma.cotizacion.findUnique({

            where: {
                id: data.cotizacion_id,
            },
        });

    if (!cotizacion) {

        throw new Error(
            "El cotizacion no existe"
        );
    }

    // =====================================================
    // VERIFICAR EQUIPAMENTO
    // =====================================================

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id: data.equipamento_id,
            },
        });

    if (!equipamento) {

        throw new Error(
            "El equipamento no existe"
        );
    }

    return await prisma.itemCotizacion.create({

        data: {

            cotizacion_id:
                data.cotizacion_id,

            item_solicitud_id:
                data.item_solicitud_id,

            equipamento_id:
                data.equipamento_id,

            nombre:
                data.nombre,

            descripcion:
                data.descripcion,

            cantidad:
                data.cantidad,

            precio_unitario:
                data.precio_unitario,

            descuento:
                data.descuento,

            subtotal:
                data.subtotal,

            impuestos:
                data.impuestos,

            total:
                data.total,

            estado:
                data.estado,

            plazo_entrega_dias:
                data.plazo_entrega_dias,

            garantia_meses:
                data.garantia_meses,

            incluye:
                data.incluye,

            observaciones:
                data.observaciones,
        },

        include: {
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// ACTUALIZAR ITEMCOTIZACION
// =========================================================

export const actualizarItemCotizacion = async (

    id: number,

    data: {

        cotizacion_id?: number;
        item_solicitud_id?: number | null;
        equipamento_id?: number | null;
        nombre?: string;
        descripcion?: string | null;
        cantidad?: number;
        precio_unitario?: number;
        descuento?: number;
        subtotal?: number;
        impuestos?: number;
        total?: number;
        estado?: EstadoItemCotizacion;
        plazo_entrega_dias?: number | null;
        garantia_meses?: number | null;
        incluye?: string | null;
        observaciones?: string | null;

    },

) => {

    const itemCotizacion =
        await prisma.itemCotizacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!itemCotizacion) {

        throw new Error(
            "ItemCotizacion no encontrado"
        );
    }

    return await prisma.itemCotizacion.update({

        where: {
            id: id,
        },

        data,

        include: {
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// ELIMINAR ITEMCOTIZACION
// =========================================================

export const eliminarItemCotizacion = async (
    id: number
) => {

    const itemCotizacion =
        await prisma.itemCotizacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!itemCotizacion) {

        throw new Error(
            "ItemCotizacion no encontrado"
        );
    }

    return await prisma.itemCotizacion.delete({

        where: {
            id: id,
        },
    });
};