// cotimed-api/src/services/notificacion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoNotificacion,
} from "@prisma/client";


// =========================================================
// SERVICE: NOTIFICACION
// =========================================================


// =========================================================
// LISTAR TODAS LAS NOTIFICACCIONES
// =========================================================

export const listarNotificacciones = async () => {

    return await prisma.notificacion.findMany({

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
// BUSCAR NOTIFICACION POR ID
// =========================================================

export const buscarNotificacion = async (
    id: number
) => {

    const notificacion =
        await prisma.notificacion.findUnique({

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

    if (!notificacion) {

        throw new Error(
            "Notificacion no encontrado"
        );
    }

    return 
        notificacion;
};


// =========================================================
// CREAR NOTIFICACION
// =========================================================

export const crearNotificacion = async (data: {

        usuario_id: number;
        tipo: TipoNotificacion;
        titulo: string;
        mensaje: string;
        url?: string;
        leida?: boolean;
        fecha_lectura?: Date;

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

    return await prisma.notificacion.create({

        data: {

            usuario_id:
                data.usuario_id,

            tipo:
                data.tipo,

            titulo:
                data.titulo,

            mensaje:
                data.mensaje,

            url:
                data.url,

            leida:
                data.leida,

            fecha_lectura:
                data.fecha_lectura,
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
// ACTUALIZAR NOTIFICACION
// =========================================================

export const actualizarNotificacion = async (

    id: number,

    data: {

        usuario_id?: number;
        tipo?: TipoNotificacion;
        titulo?: string;
        mensaje?: string;
        url?: string | null;
        leida?: boolean;
        fecha_lectura?: Date | null;

    },

) => {

    const notificacion =
        await prisma.notificacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!notificacion) {

        throw new Error(
            "Notificacion no encontrado"
        );
    }

    return await prisma.notificacion.update({

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
// ELIMINAR NOTIFICACION
// =========================================================

export const eliminarNotificacion = async (
    id: number
) => {

    const notificacion =
        await prisma.notificacion.findUnique({

            where: {
                id: id,
            },
        });

    if (!notificacion) {

        throw new Error(
            "Notificacion no encontrado"
        );
    }

    return await prisma.notificacion.delete({

        where: {
            id: id,
        },
    });
};