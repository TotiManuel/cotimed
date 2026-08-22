import prisma from "../prisma/prisma";


// =========================================================
// CAMPOS DEL PROVEEDOR
// =========================================================

const proveedorSelect = {
    id: true,
    razon_social: true,
    nombre_comercial: true,
    cuit: true,
    descripcion: true,
    email: true,
    telefono: true,
    sitio_web: true,
    logo_url: true,
    estado: true,
    verificado: true,
    fecha_verificacion: true,
    fecha_creacion: true,
    fecha_actualizacion: true,
};


// =========================================================
// LISTAR PROVEEDORES
// =========================================================

export const listarProveedores = async () => {

    return await prisma.proveedor.findMany({

        where: {
            eliminado: false,
        },

        select: proveedorSelect,

        orderBy: {
            id: "desc",
        },
    });
};


// =========================================================
// BUSCAR PROVEEDOR POR ID
// =========================================================

export const buscarProveedor = async (
    id: number
) => {

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id,
            },

            select: {
                ...proveedorSelect,

                usuarios: {
                    select: {
                        id: true,
                        nombre: true,
                        apellido: true,
                        email: true,
                        telefono: true,
                        rol: true,
                        estado: true,
                    },
                },

                direcciones: true,

                contactos: true,

                equipamentos: true,

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


// =========================================================
// BUSCAR PROVEEDORES POR TEXTO
// =========================================================

export const buscarProveedores = async (
    texto: string
) => {

    return await prisma.proveedor.findMany({

        where: {

            eliminado: false,

            OR: [

                {
                    razon_social: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    nombre_comercial: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

                {
                    cuit: {
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
                    telefono: {
                        contains: texto,
                        mode: "insensitive",
                    },
                },

            ],
        },

        select: proveedorSelect,

        orderBy: {
            razon_social: "asc",
        },
    });
};