// cotimed-api/src/services/itemSolicitud.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";


// =========================================================
// SERVICE: ITEMSOLICITUD
// =========================================================


// =========================================================
// LISTAR TODAS LAS ITEMSSOLICITUD
// =========================================================

export const listarItemsSolicitud = async () => {

    return await prisma.itemSolicitud.findMany({

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
// BUSCAR ITEMSOLICITUD POR ID
// =========================================================

export const buscarItemSolicitud = async (
    id: number
) => {

    const itemSolicitud =
        await prisma.itemSolicitud.findUnique({

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
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
        });

    if (!itemSolicitud) {

        throw new Error(
            "ItemSolicitud no encontrado"
        );
    }

    return 
        itemSolicitud;
};


// =========================================================
// CREAR ITEMSOLICITUD
// =========================================================

export const crearItemSolicitud = async (data: {

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

    return await prisma.itemSolicitud.create({

        data: {

            solicitud_id:
                data.solicitud_id,

            equipamento_id:
                data.equipamento_id,

            nombre:
                data.nombre,

            descripcion:
                data.descripcion,

            cantidad:
                data.cantidad,

            especificaciones:
                data.especificaciones,

            marca_preferida:
                data.marca_preferida,

            modelo_preferido:
                data.modelo_preferido,

            unidad_medida:
                data.unidad_medida,

            presupuesto_unitario:
                data.presupuesto_unitario,

            presupuesto_total:
                data.presupuesto_total,
        },

        include: {
            solicitud: {
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
// ACTUALIZAR ITEMSOLICITUD
// =========================================================

export const actualizarItemSolicitud = async (

    id: number,

    data: {

        solicitud_id?: number;
        equipamento_id?: number | null;
        nombre?: string;
        descripcion?: string | null;
        cantidad?: number;
        especificaciones?: string | null;
        marca_preferida?: string | null;
        modelo_preferido?: string | null;
        unidad_medida?: string | null;
        presupuesto_unitario?: number | null;
        presupuesto_total?: number | null;

    },

) => {

    const itemSolicitud =
        await prisma.itemSolicitud.findUnique({

            where: {
                id: id,
            },
        });

    if (!itemSolicitud) {

        throw new Error(
            "ItemSolicitud no encontrado"
        );
    }

    return await prisma.itemSolicitud.update({

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
// ELIMINAR ITEMSOLICITUD
// =========================================================

export const eliminarItemSolicitud = async (
    id: number
) => {

    const itemSolicitud =
        await prisma.itemSolicitud.findUnique({

            where: {
                id: id,
            },
        });

    if (!itemSolicitud) {

        throw new Error(
            "ItemSolicitud no encontrado"
        );
    }

    return await prisma.itemSolicitud.delete({

        where: {
            id: id,
        },
    });
};