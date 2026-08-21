import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

/**
 * CREAR INSTITUCIÓN
 */
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

    const existe = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (existe) {
        throw new Error("El email ya está registrado");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const institucion = await prisma.user.create({
        data: {
            name_user: data.name_user,
            razon_social: data.razon_social,
            direccion: data.direccion,
            email: data.email,
            password: passwordHash,
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
            rol: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
        },
    });

    return institucion;
};


/**
 * BUSCAR INSTITUCIÓN POR ID
 */
export const buscarInstitucion = async (
    id: number
) => {

    const institucion = await prisma.user.findFirst({
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
            rol: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,

            solicitudes: true,
        },
    });

    if (!institucion) {
        throw new Error("Institución no encontrada");
    }

    return institucion;
};


/**
 * LISTAR INSTITUCIONES
 */
export const listarInstituciones = async () => {

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
            rol: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,

            solicitudes: true,
        },

        orderBy: {
            id: "desc",
        },
    });
};


/**
 * ACTUALIZAR INSTITUCIÓN
 */
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
        password?: string;
    }
) => {

    const existe = await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
    });

    if (!existe) {
        throw new Error("Institución no encontrada");
    }

    /**
     * Si se cambia el email,
     * verificamos que no esté siendo utilizado.
     */
    if (data.email && data.email !== existe.email) {

        const emailExiste = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (emailExiste) {
            throw new Error("El email ya está registrado");
        }
    }

    /**
     * Construimos los datos sin password.
     */
    const {
        password,
        ...datosActualizar
    } = data;

    /**
     * Si enviaron una nueva contraseña,
     * la hasheamos antes de guardarla.
     */
    const datosFinales = {
        ...datosActualizar,
        ...(password
            ? {
                password: await bcrypt.hash(password, 10),
            }
            : {}),
    };

    const institucion = await prisma.user.update({
        where: {
            id,
        },

        data: datosFinales,

        select: {
            id: true,
            name_user: true,
            razon_social: true,
            direccion: true,
            email: true,
            rol: true,
            organizacion: true,
            estado_user: true,
            ciudad_user: true,
            provincia_user: true,
            pais_user: true,
        },
    });

    return institucion;
};


/**
 * ELIMINAR INSTITUCIÓN
 */
export const eliminarInstitucion = async (
    id: number
) => {

    const existe = await prisma.user.findFirst({
        where: {
            id,
            rol: Role.institucion,
        },
    });

    if (!existe) {
        throw new Error("Institución no encontrada");
    }

    /**
     * Buscamos las solicitudes de la institución.
     */
    const solicitudes = await prisma.solicitud.findMany({
        where: {
            id_institucion: id,
        },

        select: {
            id_solicitud: true,
        },
    });

    const idsSolicitudes = solicitudes.map(
        solicitud => solicitud.id_solicitud
    );

    /**
     * Eliminamos todo dentro de una transacción.
     */
    await prisma.$transaction(async (tx) => {

        /**
         * Primero eliminamos los IncluyeCotizacion
         * asociados a las cotizaciones.
         */
        if (idsSolicitudes.length > 0) {

            const cotizaciones = await tx.cotizacion.findMany({
                where: {
                    id_solicitud: {
                        in: idsSolicitudes,
                    },
                },

                select: {
                    id_cotizacion: true,
                },
            });

            const idsCotizaciones = cotizaciones.map(
                cotizacion => cotizacion.id_cotizacion
            );

            if (idsCotizaciones.length > 0) {

                await tx.incluyeCotizacion.deleteMany({
                    where: {
                        id_cotizacion: {
                            in: idsCotizaciones,
                        },
                    },
                });

                await tx.cotizacion.deleteMany({
                    where: {
                        id_cotizacion: {
                            in: idsCotizaciones,
                        },
                    },
                });
            }

            /**
             * Ahora podemos eliminar las solicitudes.
             */
            await tx.solicitud.deleteMany({
                where: {
                    id_institucion: id,
                },
            });
        }

        /**
         * Finalmente eliminamos el usuario.
         */
        await tx.user.delete({
            where: {
                id,
            },
        });
    });

    return {
        mensaje: "Institución eliminada correctamente",
        id,
    };
};