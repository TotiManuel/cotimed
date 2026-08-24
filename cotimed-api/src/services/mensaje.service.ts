// cotimed-api/src/services/mensaje.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoMensaje,
    EstadoMensaje,
} from "@prisma/client";


// =========================================================
// SERVICE: MENSAJE
// =========================================================


// =========================================================
// LISTAR TODAS LAS MENSAJES
// =========================================================

export const listarMensajes = async () => {

    return await prisma.mensaje.findMany({

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
            remitente: {
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
// BUSCAR MENSAJE POR ID
// =========================================================

export const buscarMensaje = async (
    id: number
) => {

    const mensaje =
        await prisma.mensaje.findUnique({

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
            remitente: {
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

    if (!mensaje) {

        throw new Error(
            "Mensaje no encontrado"
        );
    }

    return 
        mensaje;
};


// =========================================================
// CREAR MENSAJE
// =========================================================

export const crearMensaje = async (data: {

        solicitud_id?: number;
        cotizacion_id?: number;
        remitente_id: number;
        tipo?: TipoMensaje;
        contenido: string;
        estado?: EstadoMensaje;
        fecha_lectura?: Date;

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

    // =====================================================
    // VERIFICAR USUARIO
    // =====================================================

    const usuario =
        await prisma.usuario.findUnique({

            where: {
                id: data.remitente_id,
            },
        });

    if (!usuario) {

        throw new Error(
            "El usuario no existe"
        );
    }

    return await prisma.mensaje.create({

        data: {

            solicitud_id:
                data.solicitud_id,

            cotizacion_id:
                data.cotizacion_id,

            remitente_id:
                data.remitente_id,

            tipo:
                data.tipo,

            contenido:
                data.contenido,

            estado:
                data.estado,

            fecha_lectura:
                data.fecha_lectura,
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
            remitente: {
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
// ACTUALIZAR MENSAJE
// =========================================================

export const actualizarMensaje = async (

    id: number,

    data: {

        solicitud_id?: number | null;
        cotizacion_id?: number | null;
        remitente_id?: number;
        tipo?: TipoMensaje;
        contenido?: string;
        estado?: EstadoMensaje;
        fecha_lectura?: Date | null;

    },

) => {

    const mensaje =
        await prisma.mensaje.findUnique({

            where: {
                id: id,
            },
        });

    if (!mensaje) {

        throw new Error(
            "Mensaje no encontrado"
        );
    }

    return await prisma.mensaje.update({

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
            remitente: {
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
// ELIMINAR MENSAJE
// =========================================================

export const eliminarMensaje = async (
    id: number
) => {

    const mensaje =
        await prisma.mensaje.findUnique({

            where: {
                id: id,
            },
        });

    if (!mensaje) {

        throw new Error(
            "Mensaje no encontrado"
        );
    }

    return await prisma.mensaje.delete({

        where: {
            id: id,
        },
    });
};