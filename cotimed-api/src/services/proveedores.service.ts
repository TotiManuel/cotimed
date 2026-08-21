import prisma from "../prisma/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";

/**
 * CAMPOS QUE SE PUEDEN DEVOLVER DEL PROVEEDOR
 *
 * IMPORTANTE:
 * Nunca incluimos "password".
 */
const proveedorSelect = {
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
};


/**
 * LISTAR PROVEEDORES
 */
export const listarProveedores = async () => {

    return await prisma.user.findMany({

        where: {
            rol: Role.proveedor,
        },

        select: proveedorSelect,

        orderBy: {
            id: "desc",
        },
    });
};


/**
 * BUSCAR PROVEEDOR POR ID
 */
export const buscarProveedor = async (
    id: number
) => {

    const proveedor = await prisma.user.findFirst({

        where: {
            id,
            rol: Role.proveedor,
        },

        select: {
            ...proveedorSelect,

            cotizaciones: true,
        },
    });

    if (!proveedor) {
        throw new Error(
            "Proveedor no encontrado"
        );
    }

    return proveedor;
};


/**
 * BUSCAR PROVEEDORES POR TEXTO
 *
 * Busca por:
 * - nombre de usuario
 * - razón social
 * - email
 * - organización
 * - dirección
 * - ciudad
 * - provincia
 * - país
 */
export const buscarProveedores = async (
    texto: string
) => {

    return await prisma.user.findMany({

        where: {

            rol: Role.proveedor,

            OR: [

                {
                    name_user: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    razon_social: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    email: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    organizacion: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    direccion: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    ciudad_user: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    provincia_user: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    pais_user: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },
            ],
        },

        select: proveedorSelect,

        orderBy: {
            name_user: "asc",
        },
    });
};


/**
 * CREAR PROVEEDOR
 *
 * Crea un User cuyo rol automáticamente
 * será "proveedor".
 */
export const crearProveedor = async (data: {

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

    /**
     * Verificar que el email no esté registrado.
     */
    const existe = await prisma.user.findUnique({

        where: {
            email: data.email,
        },
    });

    if (existe) {

        throw new Error(
            "El email ya está registrado"
        );
    }


    /**
     * Hashear contraseña.
     */
    const passwordHash = await bcrypt.hash(
        data.password,
        10
    );


    /**
     * Crear proveedor.
     */
    return await prisma.user.create({

        data: {

            name_user: data.name_user,

            razon_social: data.razon_social,

            direccion: data.direccion,

            email: data.email,

            password: passwordHash,

            rol: Role.proveedor,

            organizacion: data.organizacion,

            estado_user: data.estado_user,

            ciudad_user: data.ciudad_user,

            provincia_user: data.provincia_user,

            pais_user: data.pais_user,
        },

        select: proveedorSelect,
    });
};


/**
 * ACTUALIZAR PROVEEDOR
 */
export const actualizarProveedor = async (

    id: number,

    data: {

        name_user?: string;

        razon_social?: string;

        direccion?: string;

        email?: string;

        password?: string;

        organizacion?: string;

        estado_user?: string;

        ciudad_user?: string;

        provincia_user?: string;

        pais_user?: string;
    }

) => {

    /**
     * Verificar que el proveedor exista.
     */
    const proveedor = await prisma.user.findFirst({

        where: {
            id,
            rol: Role.proveedor,
        },
    });

    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }


    /**
     * Si se está cambiando el email,
     * verificar que no pertenezca a otro usuario.
     */
    if (
        data.email &&
        data.email !== proveedor.email
    ) {

        const emailExiste = await prisma.user.findUnique({

            where: {
                email: data.email,
            },
        });

        if (emailExiste) {

            throw new Error(
                "El email ya está registrado"
            );
        }
    }


    /**
     * Separamos password del resto
     * para poder hashearla.
     */
    const {
        password,
        ...datosSinPassword
    } = data;


    /**
     * Datos que finalmente se enviarán a Prisma.
     */
    const datosActualizar = {

        ...datosSinPassword,

        ...(password
            ? {
                password: await bcrypt.hash(
                    password,
                    10
                ),
            }
            : {}),
    };


    /**
     * Actualizar proveedor.
     */
    return await prisma.user.update({

        where: {
            id,
        },

        data: datosActualizar,

        select: proveedorSelect,
    });
};


/**
 * ELIMINAR PROVEEDOR
 */
export const eliminarProveedor = async (

    id: number

) => {

    /**
     * Verificar que exista y sea proveedor.
     */
    const proveedor = await prisma.user.findFirst({

        where: {
            id,
            rol: Role.proveedor,
        },
    });

    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }


    /**
     * IMPORTANTE:
     *
     * Las cotizaciones pertenecientes
     * al proveedor deben eliminarse antes
     * de eliminar el User porque existe
     * una relación:
     *
     * Cotizacion -> User
     */
    await prisma.$transaction(async (tx) => {

        /**
         * Buscar las cotizaciones del proveedor.
         */
        const cotizaciones =
            await tx.cotizacion.findMany({

                where: {
                    id_proveedor: id,
                },

                select: {
                    id_cotizacion: true,
                },
            });


        const idsCotizaciones =
            cotizaciones.map(
                cotizacion =>
                    cotizacion.id_cotizacion
            );


        /**
         * Eliminar elementos incluidos
         * en las cotizaciones.
         */
        if (idsCotizaciones.length > 0) {

            await tx.incluyeCotizacion.deleteMany({

                where: {
                    id_cotizacion: {
                        in: idsCotizaciones,
                    },
                },
            });


            /**
             * Eliminar cotizaciones.
             */
            await tx.cotizacion.deleteMany({

                where: {
                    id_cotizacion: {
                        in: idsCotizaciones,
                    },
                },
            });
        }


        /**
         * Finalmente eliminar el proveedor.
         */
        await tx.user.delete({

            where: {
                id,
            },
        });
    });


    return {
        mensaje: "Proveedor eliminado correctamente",
        id,
    };
};