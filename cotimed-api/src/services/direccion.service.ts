// cotimed-api/src/services/direccion.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoDireccion,
} from "@prisma/client";


// =========================================================
// SERVICE: DIRECCION
// =========================================================


// =========================================================
// LISTAR TODAS LAS DIRECCCIONES
// =========================================================

export const listarDireccciones = async () => {

    return await prisma.direccion.findMany({

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
// BUSCAR DIRECCION POR ID
// =========================================================

export const buscarDireccion = async (
    id: number
) => {

    const direccion =
        await prisma.direccion.findUnique({

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

    if (!direccion) {

        throw new Error(
            "Direccion no encontrado"
        );
    }

    return 
        direccion;
};


// =========================================================
// CREAR DIRECCION
// =========================================================

export const crearDireccion = async (data: {

        tipo: TipoDireccion;
        calle: string;
        numero?: string;
        piso?: string;
        departamento?: string;
        codigo_postal?: string;
        ciudad: string;
        provincia: string;
        pais: string;
        latitud?: number;
        longitud?: number;
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

    return await prisma.direccion.create({

        data: {

            tipo:
                data.tipo,

            calle:
                data.calle,

            numero:
                data.numero,

            piso:
                data.piso,

            departamento:
                data.departamento,

            codigo_postal:
                data.codigo_postal,

            ciudad:
                data.ciudad,

            provincia:
                data.provincia,

            pais:
                data.pais,

            latitud:
                data.latitud,

            longitud:
                data.longitud,

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
// ACTUALIZAR DIRECCION
// =========================================================

export const actualizarDireccion = async (

    id: number,

    data: {

        tipo?: TipoDireccion;
        calle?: string;
        numero?: string | null;
        piso?: string | null;
        departamento?: string | null;
        codigo_postal?: string | null;
        ciudad?: string;
        provincia?: string;
        pais?: string;
        latitud?: number | null;
        longitud?: number | null;
        institucion_id?: number | null;
        proveedor_id?: number | null;

    },

) => {

    const direccion =
        await prisma.direccion.findUnique({

            where: {
                id: id,
            },
        });

    if (!direccion) {

        throw new Error(
            "Direccion no encontrado"
        );
    }

    return await prisma.direccion.update({

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
// ELIMINAR DIRECCION
// =========================================================

export const eliminarDireccion = async (
    id: number
) => {

    const direccion =
        await prisma.direccion.findUnique({

            where: {
                id: id,
            },
        });

    if (!direccion) {

        throw new Error(
            "Direccion no encontrado"
        );
    }

    return await prisma.direccion.delete({

        where: {
            id: id,
        },
    });
};