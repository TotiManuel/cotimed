// cotimed-api/src/services/auditoria.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoAuditoria,
} from "@prisma/client";


// =========================================================
// SERVICE: AUDITORIA
// =========================================================


// =========================================================
// LISTAR TODAS LAS AUDITORIAS
// =========================================================

export const listarAuditorias = async () => {

    return await prisma.auditoria.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
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
        },
    });
};


// =========================================================
// BUSCAR AUDITORIA POR ID
// =========================================================

export const buscarAuditoria = async (
    id: number
) => {

    const auditoria =
        await prisma.auditoria.findUnique({

            where: {
                id: id,
            },

            include: {
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
        },
        });

    if (!auditoria) {

        throw new Error(
            "Auditoria no encontrado"
        );
    }

    return 
        auditoria;
};


// =========================================================
// CREAR AUDITORIA
// =========================================================

export const crearAuditoria = async (data: {

        usuario_id?: number;
        tipo: TipoAuditoria;
        entidad: string;
        entidad_id?: number;
        accion: string;
        descripcion?: string;
        datos_anteriores?: any;
        datos_nuevos?: any;
        ip?: string;
        user_agent?: string;

}) => {

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

    return await prisma.auditoria.create({

        data: {

            usuario_id:
                data.usuario_id,

            tipo:
                data.tipo,

            entidad:
                data.entidad,

            entidad_id:
                data.entidad_id,

            accion:
                data.accion,

            descripcion:
                data.descripcion,

            datos_anteriores:
                data.datos_anteriores,

            datos_nuevos:
                data.datos_nuevos,

            ip:
                data.ip,

            user_agent:
                data.user_agent,
        },

        include: {
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
        },
    });
};


// =========================================================
// ACTUALIZAR AUDITORIA
// =========================================================

export const actualizarAuditoria = async (

    id: number,

    data: {

        usuario_id?: number | null;
        tipo?: TipoAuditoria;
        entidad?: string;
        entidad_id?: number | null;
        accion?: string;
        descripcion?: string | null;
        datos_anteriores?: any | null;
        datos_nuevos?: any | null;
        ip?: string | null;
        user_agent?: string | null;

    },

) => {

    const auditoria =
        await prisma.auditoria.findUnique({

            where: {
                id: id,
            },
        });

    if (!auditoria) {

        throw new Error(
            "Auditoria no encontrado"
        );
    }

    return await prisma.auditoria.update({

        where: {
            id: id,
        },

        data,

        include: {
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
        },
    });
};


// =========================================================
// ELIMINAR AUDITORIA
// =========================================================

export const eliminarAuditoria = async (
    id: number
) => {

    const auditoria =
        await prisma.auditoria.findUnique({

            where: {
                id: id,
            },
        });

    if (!auditoria) {

        throw new Error(
            "Auditoria no encontrado"
        );
    }

    return await prisma.auditoria.delete({

        where: {
            id: id,
        },
    });
};