// cotimed-api/src/services/adjudicacion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    EstadoAdjudicacion,
    TipoMoneda,
} from "@prisma/client";


// =========================================================
// SERVICE: ADJUDICACION
// =========================================================


// =========================================================
// LISTAR TODAS LAS ADJUDICACCIONES
// =========================================================

export const listarAdjudicacciones = async () => {

    return await prisma.adjudicacion.findMany({

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
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// BUSCAR ADJUDICACION POR ID
// =========================================================

export const buscarAdjudicacion = async (
    id: number
) => {

    const adjudicacion =
        await prisma.adjudicacion.findUnique({

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
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
        });

    if (!adjudicacion) {

        throw new Error(
            "Adjudicacion no encontrado"
        );
    }

    return 
        adjudicacion;
};


// =========================================================
// CREAR ADJUDICACION
// =========================================================

export const crearAdjudicacion = async (data: {

        solicitud_id: number;
        cotizacion_id: number;
        estado?: EstadoAdjudicacion;
        monto_total: number;
        moneda: TipoMoneda;
        observaciones?: string;
        fecha_adjudicacion?: Date;

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

    return await prisma.adjudicacion.create({

        data: {

            solicitud_id:
                data.solicitud_id,

            cotizacion_id:
                data.cotizacion_id,

            estado:
                data.estado,

            monto_total:
                data.monto_total,

            moneda:
                data.moneda,

            observaciones:
                data.observaciones,

            fecha_adjudicacion:
                data.fecha_adjudicacion,
        },

        include: {
            solicitud: {
                select: {
                    id: true,
                    estado: true,
                },
            },
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// ACTUALIZAR ADJUDICACION
// =========================================================

export const actualizarAdjudicacion = async (

    id: number,

    data: {

        solicitud_id?: number;
        cotizacion_id?: number;
        estado?: EstadoAdjudicacion;
        monto_total?: number;
        moneda?: TipoMoneda;
        observaciones?: string | null;
        fecha_adjudicacion?: Date | null;

    },

) => {

    const adjudicacion =
        await prisma.adjudicacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!adjudicacion) {

        throw new Error(
            "Adjudicacion no encontrado"
        );
    }

    return await prisma.adjudicacion.update({

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
            cotizacion: {
                select: {
                    id: true,
                    estado: true,
                },
            },
        },
    });
};


// =========================================================
// ELIMINAR ADJUDICACION
// =========================================================

export const eliminarAdjudicacion = async (
    id: number
) => {

    const adjudicacion =
        await prisma.adjudicacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!adjudicacion) {

        throw new Error(
            "Adjudicacion no encontrado"
        );
    }

    return await prisma.adjudicacion.delete({

        where: {
            id: id,
        },
    });
};