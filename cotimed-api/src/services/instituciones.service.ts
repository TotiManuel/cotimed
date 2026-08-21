// cotimed-api/src/services/instituciones.service.ts

import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();


// =========================================================
// OBTENER TODAS LAS INSTITUCIONES
// =========================================================

export const obtenerInstituciones = async () => {
    return await prisma.user.findMany({
        where: {
            rol: Role.institucion,
        },
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
        },
        orderBy: {
            id: "desc",
        },
    });
};


// =========================================================
// OBTENER INSTITUCIÓN POR ID
// =========================================================

export const obtenerInstitucionPorId = async (id: number) => {
    return await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
            solicitudes: true,
        },
    });
};


// =========================================================
// CREAR INSTITUCIÓN
// =========================================================

export const crearInstitucion = async (data: {
    name_user: string;
    razon_social: string;
    direccion: string;
    email: string;
    password: string;
    organizacion: string;
    estado_user: string;
    ciudad_user: string;
    provincia_user: string;
    pais_user: string;
}) => {

    const institucionExistente = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (institucionExistente) {
        throw new Error("Ya existe un usuario registrado con ese email");
    }

    return await prisma.user.create({
        data: {
            name_user: data.name_user,
            razon_social: data.razon_social,
            direccion: data.direccion,
            email: data.email,
            password: data.password,
            rol: Role.institucion,
            organizacion: data.organizacion,
            estado_user: data.estado_user,
            ciudad_user: data.ciudad_user,
            provincia_user: data.provincia_user,
            pais_user: data.pais_user,
        },
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
        },
    });
};


// =========================================================
// ACTUALIZAR INSTITUCIÓN
// =========================================================

export const actualizarInstitucion = async (
    id: number,
    data: {
        name_user?: string;
        razon_social?: string;
        direccion?: string;
        email?: string;
        organizacion?: string;
        estado_user?: string;
        ciudad_user?: string;
        provincia_user?: string;
        pais_user?: string;
    }
) => {

    const institucion = await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
    });

    if (!institucion) {
        throw new Error("Institución no encontrada");
    }

    if (data.email && data.email !== institucion.email) {

        const emailExistente = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (emailExistente) {
            throw new Error("El email ya está siendo utilizado");
        }
    }

    return await prisma.user.update({
        where: {
            id,
        },
        data,
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
        },
    });
};


// =========================================================
// CAMBIAR ESTADO DE INSTITUCIÓN
// =========================================================

export const cambiarEstadoInstitucion = async (
    id: number,
    estado: string
) => {

    const institucion = await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
    });

    if (!institucion) {
        throw new Error("Institución no encontrada");
    }

    return await prisma.user.update({
        where: {
            id,
        },
        data: {
            estado_user: estado,
        },
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            email: true,
            estado_user: true,
        },
    });
};


// =========================================================
// ELIMINAR INSTITUCIÓN
// =========================================================

export const eliminarInstitucion = async (id: number) => {

    const institucion = await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
    });

    if (!institucion) {
        throw new Error("Institución no encontrada");
    }

    return await prisma.user.delete({
        where: {
            id,
        },
    });
};


// =========================================================
// OBTENER INSTITUCIÓN + SOLICITUDES
// =========================================================

export const obtenerInstitucionConSolicitudes = async (id: number) => {

    return await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,

            solicitudes: {
                orderBy: {
                    fecha_creacion_solicitud: "desc",
                },
            },
        },
    });
};