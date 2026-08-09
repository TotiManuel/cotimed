import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/**
 * LISTAR TODAS LAS SOLICITUDES
 */
export const listarSolicitudes = async () => {

    return await prisma.solicitud.findMany({

        orderBy: {
            fecha_creacion_solicitud: "desc",
        },

        include: {
            institucion: {
                select: {
                    id: true,
                    name_user: true,
                    email: true,
                    organizacion: true,
                },
            },

            cotizaciones: true,
        },
    });
};


/**
 * BUSCAR SOLICITUD POR ID
 */
export const buscarSolicitud = async (
    id: number
) => {

    return await prisma.solicitud.findUnique({

        where: {
            id_solicitud: id,
        },

        include: {

            institucion: {
                select: {
                    id: true,
                    name_user: true,
                    email: true,
                    organizacion: true,
                },
            },

            cotizaciones: true,
        },
    });
};


/**
 * LISTAR SOLICITUDES DE UNA INSTITUCIÓN
 */
export const listarSolicitudesPorInstitucion = async (
    id_institucion: number
) => {

    return await prisma.solicitud.findMany({

        where: {
            id_institucion,
        },

        orderBy: {
            fecha_creacion_solicitud: "desc",
        },

        include: {

            cotizaciones: true,

        },
    });
};


/**
 * CREAR SOLICITUD
 */
export const crearSolicitud = async (data: {

    titulo_solicitud: string;

    equipamiento_solicitud: string;

    descripcion_solicitud: string;

    cantidad_solicitud: number;

    urgencia_solicitud: string;

    estado_solicitud: string;

    id_institucion: number;

    nombre_institucion: string;

    especificaciones_solicitud: string;

    presupuesto_estimado_solicitud: number;

}) => {

    return await prisma.solicitud.create({

        data: {

            titulo_solicitud:
                data.titulo_solicitud,

            equipamiento_solicitud:
                data.equipamiento_solicitud,

            descripcion_solicitud:
                data.descripcion_solicitud,

            cantidad_solicitud:
                data.cantidad_solicitud,

            urgencia_solicitud:
                data.urgencia_solicitud,

            estado_solicitud:
                data.estado_solicitud,

            id_institucion:
                data.id_institucion,

            nombre_institucion:
                data.nombre_institucion,

            especificaciones_solicitud:
                data.especificaciones_solicitud,

            presupuesto_estimado_solicitud:
                data.presupuesto_estimado_solicitud,
        },

        include: {

            institucion: {
                select: {
                    id: true,
                    name_user: true,
                    email: true,
                    organizacion: true,
                },
            },

            cotizaciones: true,
        },
    });
};


/**
 * ACTUALIZAR SOLICITUD
 */
export const actualizarSolicitud = async (
    id: number,
    data: {

        titulo_solicitud?: string;

        equipamiento_solicitud?: string;

        descripcion_solicitud?: string;

        cantidad_solicitud?: number;

        urgencia_solicitud?: string;

        estado_solicitud?: string;

        nombre_institucion?: string;

        especificaciones_solicitud?: string;

        presupuesto_estimado_solicitud?: number;

    }
) => {

    return await prisma.solicitud.update({

        where: {
            id_solicitud: id,
        },

        data,

        include: {

            institucion: {
                select: {
                    id: true,
                    name_user: true,
                    email: true,
                    organizacion: true,
                },
            },

            cotizaciones: true,
        },
    });
};


/**
 * ELIMINAR SOLICITUD
 */
export const eliminarSolicitud = async (
    id: number
) => {

    return await prisma.solicitud.delete({

        where: {
            id_solicitud: id,
        },
    });
};