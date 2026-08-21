import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


/**
 * LISTAR PROVEEDORES
 */
export const listarProveedores = async () => {

    return await prisma.user.findMany({
        where: {
            rol: Role.proveedor,
        },
        select: {
            id: true,
            name_user: true,
            email: true,
            rol: true,
            organizacion: true,
        },
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

    return await prisma.user.findFirst({
        where: {
            id,
            rol: Role.proveedor,
        },
        select: {
            id: true,
            name_user: true,
            email: true,
            rol: true,
            organizacion: true,
        },
    });
};


/**
 * BUSCAR PROVEEDORES POR TEXTO
 *
 * Busca por:
 * - nombre de usuario
 * - email
 * - organización
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
            ],
        },

        select: {
            id: true,
            name_user: true,
            email: true,
            rol: true,
            organizacion: true,
        },

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
    email: string;
    password: string;
    organizacion: string;
}) => {

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({

        data: {
            name_user: data.name_user,
            email: data.email,
            password: passwordHash,
            rol: Role.proveedor,
            organizacion: data.organizacion,
        },

        select: {
            id: true,
            name_user: true,
            email: true,
            rol: true,
            organizacion: true,
        },
    });
};

/**
 * ACTUALIZAR PROVEEDOR
 */
export const actualizarProveedor = async (
    id: number,
    data: {
        name_user?: string;
        email?: string;
        password?: string;
        organizacion?: string;
    }
) => {

    const datosActualizados = {
        ...data,
    };

    if (data.password) {
        datosActualizados.password = await bcrypt.hash(data.password, 10);
    }

    return await prisma.user.updateMany({

        where: {
            id,
            rol: Role.proveedor,
        },

        data: datosActualizados,
    });
};
/**
 * ELIMINAR PROVEEDOR
 */
export const eliminarProveedor = async (
    id: number
) => {

    return await prisma.user.deleteMany({

        where: {
            id,
            rol: Role.proveedor,
        },
    });
};