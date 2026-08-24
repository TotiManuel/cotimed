// cotimed-api/src/services/archivo.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoDocumentoArchivo,
} from "@prisma/client";


// =========================================================
// SERVICE: ARCHIVO
// =========================================================


// =========================================================
// LISTAR TODAS LAS ARCHIVOS
// =========================================================

export const listarArchivos = async () => {

    return await prisma.archivo.findMany({

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
// BUSCAR ARCHIVO POR ID
// =========================================================

export const buscarArchivo = async (
    id: number
) => {

    const archivo =
        await prisma.archivo.findUnique({

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

    if (!archivo) {

        throw new Error(
            "Archivo no encontrado"
        );
    }

    return 
        archivo;
};


// =========================================================
// CREAR ARCHIVO
// =========================================================

export const crearArchivo = async (data: {

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

    return await prisma.archivo.create({

        data: {

            nombre:
                data.nombre,

            nombre_original:
                data.nombre_original,

            url:
                data.url,

            tipo_mime:
                data.tipo_mime,

            extension:
                data.extension,

            tamanio_bytes:
                data.tamanio_bytes,

            tipo:
                data.tipo,

            usuario_id:
                data.usuario_id,

            solicitud_id:
                data.solicitud_id,

            cotizacion_id:
                data.cotizacion_id,
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
// ACTUALIZAR ARCHIVO
// =========================================================

export const actualizarArchivo = async (

    id: number,

    data: {

        nombre?: string;
        nombre_original?: string | null;
        url?: string;
        tipo_mime?: string | null;
        extension?: string | null;
        tamanio_bytes?: number | null;
        tipo?: TipoDocumentoArchivo;
        usuario_id?: number | null;
        solicitud_id?: number | null;
        cotizacion_id?: number | null;

    },

) => {

    const archivo =
        await prisma.archivo.findUnique({

            where: {
                id: id,
            },
        });

    if (!archivo) {

        throw new Error(
            "Archivo no encontrado"
        );
    }

    return await prisma.archivo.update({

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
// ELIMINAR ARCHIVO
// =========================================================

export const eliminarArchivo = async (
    id: number
) => {

    const archivo =
        await prisma.archivo.findUnique({

            where: {
                id: id,
            },
        });

    if (!archivo) {

        throw new Error(
            "Archivo no encontrado"
        );
    }

    return await prisma.archivo.delete({

        where: {
            id: id,
        },
    });
};