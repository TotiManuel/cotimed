// cotimed-api/src/services/imagenEquipamento.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";


// =========================================================
// SERVICE: IMAGENEQUIPAMENTO
// =========================================================


// =========================================================
// LISTAR TODAS LAS IMAGENEQUIPAMENTOS
// =========================================================

export const listarImagenequipamentos = async () => {

    return await prisma.imagenEquipamento.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
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
// BUSCAR IMAGENEQUIPAMENTO POR ID
// =========================================================

export const buscarImagenEquipamento = async (
    id: number
) => {

    const imagenEquipamento =
        await prisma.imagenEquipamento.findUnique({

            where: {
                id: id,
            },

            include: {
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
                },
            },
        },
        });

    if (!imagenEquipamento) {

        throw new Error(
            "ImagenEquipamento no encontrado"
        );
    }

    return 
        imagenEquipamento;
};


// =========================================================
// CREAR IMAGENEQUIPAMENTO
// =========================================================

export const crearImagenEquipamento = async (data: {

        equipamento_id: number;
        url: string;
        alt?: string;
        orden?: number;
        principal?: boolean;

}) => {

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

    return await prisma.imagenEquipamento.create({

        data: {

            equipamento_id:
                data.equipamento_id,

            url:
                data.url,

            alt:
                data.alt,

            orden:
                data.orden,

            principal:
                data.principal,
        },

        include: {
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
// ACTUALIZAR IMAGENEQUIPAMENTO
// =========================================================

export const actualizarImagenEquipamento = async (

    id: number,

    data: {

        equipamento_id?: number;
        url?: string;
        alt?: string | null;
        orden?: number;
        principal?: boolean;

    },

) => {

    const imagenEquipamento =
        await prisma.imagenEquipamento.findUnique({

            where: {
                id: id,
            },
        });

    if (!imagenEquipamento) {

        throw new Error(
            "ImagenEquipamento no encontrado"
        );
    }

    return await prisma.imagenEquipamento.update({

        where: {
            id: id,
        },

        data,

        include: {
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
// ELIMINAR IMAGENEQUIPAMENTO
// =========================================================

export const eliminarImagenEquipamento = async (
    id: number
) => {

    const imagenEquipamento =
        await prisma.imagenEquipamento.findUnique({

            where: {
                id: id,
            },
        });

    if (!imagenEquipamento) {

        throw new Error(
            "ImagenEquipamento no encontrado"
        );
    }

    return await prisma.imagenEquipamento.delete({

        where: {
            id: id,
        },
    });
};