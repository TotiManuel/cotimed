// cotimed-api/src/services/contacto.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoContacto,
} from "@prisma/client";


// =========================================================
// SERVICE: CONTACTO
// =========================================================


// =========================================================
// LISTAR TODAS LAS CONTACTOS
// =========================================================

export const listarContactos = async () => {

    return await prisma.contacto.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
        },
    });
};


// =========================================================
// BUSCAR CONTACTO POR ID
// =========================================================

export const buscarContacto = async (
    id: number
) => {

    const contacto =
        await prisma.contacto.findUnique({

            where: {
                id: id,
            },

            include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
        },
        });

    if (!contacto) {

        throw new Error(
            "Contacto no encontrado"
        );
    }

    return 
        contacto;
};


// =========================================================
// CREAR CONTACTO
// =========================================================

export const crearContacto = async (data: {

        nombre: string;
        apellido?: string;
        cargo?: string;
        email?: string;
        telefono?: string;
        tipo: TipoContacto;
        principal?: boolean;
        institucion_id?: number;
        proveedor_id?: number;

}) => {

    // =====================================================
    // VERIFICAR INSTITUCION
    // =====================================================

    const institucion =
        await prisma.institucion.findUnique({

            where: {
                id: data.institucion_id,
            },
        });

    if (!institucion) {

        throw new Error(
            "El institucion no existe"
        );
    }

    // =====================================================
    // VERIFICAR PROVEEDOR
    // =====================================================

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: data.proveedor_id,
            },
        });

    if (!proveedor) {

        throw new Error(
            "El proveedor no existe"
        );
    }

    return await prisma.contacto.create({

        data: {

            nombre:
                data.nombre,

            apellido:
                data.apellido,

            cargo:
                data.cargo,

            email:
                data.email,

            telefono:
                data.telefono,

            tipo:
                data.tipo,

            principal:
                data.principal,

            institucion_id:
                data.institucion_id,

            proveedor_id:
                data.proveedor_id,
        },

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
        },
    });
};


// =========================================================
// ACTUALIZAR CONTACTO
// =========================================================

export const actualizarContacto = async (

    id: number,

    data: {

        nombre?: string;
        apellido?: string | null;
        cargo?: string | null;
        email?: string | null;
        telefono?: string | null;
        tipo?: TipoContacto;
        principal?: boolean;
        institucion_id?: number | null;
        proveedor_id?: number | null;

    },

) => {

    const contacto =
        await prisma.contacto.findUnique({

            where: {
                id: id,
            },
        });

    if (!contacto) {

        throw new Error(
            "Contacto no encontrado"
        );
    }

    return await prisma.contacto.update({

        where: {
            id: id,
        },

        data,

        include: {
            institucion: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                },
            },
            proveedor: {
                select: {
                    id: true,
                    razon_social: true,
                    nombre_comercial: true,
                    email: true,
                    telefono: true,
                    estado: true,
                    verificado: true,
                },
            },
        },
    });
};


// =========================================================
// ELIMINAR CONTACTO
// =========================================================

export const eliminarContacto = async (
    id: number
) => {

    const contacto =
        await prisma.contacto.findUnique({

            where: {
                id: id,
            },
        });

    if (!contacto) {

        throw new Error(
            "Contacto no encontrado"
        );
    }

    return await prisma.contacto.delete({

        where: {
            id: id,
        },
    });
};