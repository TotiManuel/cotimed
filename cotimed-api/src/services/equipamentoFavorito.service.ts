// cotimed-api/src/services/equipamentoFavorito.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";


// =========================================================
// SERVICE: EQUIPAMENTOFAVORITO
// =========================================================


// =========================================================
// LISTAR TODAS LAS EQUIPAMENTOFAVORITOS
// =========================================================

export const listarEquipamentofavoritos = async () => {

    return await prisma.equipamentoFavorito.findMany({

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
        },
    });
};


// =========================================================
// BUSCAR EQUIPAMENTOFAVORITO POR ID
// =========================================================

export const buscarEquipamentoFavorito = async (
    id: number
) => {

    const equipamentoFavorito =
        await prisma.equipamentoFavorito.findUnique({

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
        },
        });

    if (!equipamentoFavorito) {

        throw new Error(
            "EquipamentoFavorito no encontrado"
        );
    }

    return 
        equipamentoFavorito;
};


// =========================================================
// CREAR EQUIPAMENTOFAVORITO
// =========================================================

export const crearEquipamentoFavorito = async (data: {

        equipamento_id: number;
        usuario_id?: number;
        institucion_id?: number;
        proveedor_id?: number;

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
            "El institucion no existe"
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

    return await prisma.equipamentoFavorito.create({

        data: {

            equipamento_id:
                data.equipamento_id,

            usuario_id:
                data.usuario_id,

            institucion_id:
                data.institucion_id,

            proveedor_id:
                data.proveedor_id,
        },

        include: {
            equipamento: {
                select: {
                    id: true,
                    nombre: true,
                    estado: true,
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
        },
    });
};


// =========================================================
// ACTUALIZAR EQUIPAMENTOFAVORITO
// =========================================================

export const actualizarEquipamentoFavorito = async (

    id: number,

    data: {

        equipamento_id?: number;
        usuario_id?: number | null;
        institucion_id?: number | null;
        proveedor_id?: number | null;

    },

) => {

    const equipamentoFavorito =
        await prisma.equipamentoFavorito.findUnique({

            where: {
                id: id,
            },
        });

    if (!equipamentoFavorito) {

        throw new Error(
            "EquipamentoFavorito no encontrado"
        );
    }

    return await prisma.equipamentoFavorito.update({

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
        },
    });
};


// =========================================================
// ELIMINAR EQUIPAMENTOFAVORITO
// =========================================================

export const eliminarEquipamentoFavorito = async (
    id: number
) => {

    const equipamentoFavorito =
        await prisma.equipamentoFavorito.findUnique({

            where: {
                id: id,
            },
        });

    if (!equipamentoFavorito) {

        throw new Error(
            "EquipamentoFavorito no encontrado"
        );
    }

    return await prisma.equipamentoFavorito.delete({

        where: {
            id: id,
        },
    });
};