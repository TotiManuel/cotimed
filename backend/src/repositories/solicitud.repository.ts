import { prisma } from "../config/database";

export const crearSolicitud = (data: any) => {
    return prisma.solicitud.create({
        data
    });
};

export const obtenerSolicitud = (id: number) => {
    return prisma.solicitud.findUnique({
        where: { id },
        include: {
            institucion: true,
            cotizaciones: true,
            destinatarios: {
                include: {
                    proveedor: true
                }
            }
        }
    });
};

export const listarSolicitudes = () => {
    return prisma.solicitud.findMany({
        include: {
            institucion: true,
            cotizaciones: true
        },
        orderBy: {
            fechaCreacion: "desc"
        }
    });
};

export const listarSolicitudesInstitucion = (
    institucionId: number
) => {
    return prisma.solicitud.findMany({
        where: {
            institucionId
        },
        include: {
            cotizaciones: true,
            destinatarios: true
        },
        orderBy: {
            fechaCreacion: "desc"
        }
    });
};

export const actualizarSolicitud = (
    id: number,
    data: any
) => {
    return prisma.solicitud.update({
        where: {
            id
        },
        data
    });
};

export const eliminarSolicitud = (
    id: number
) => {
    return prisma.solicitud.delete({
        where: {
            id
        }
    });
};