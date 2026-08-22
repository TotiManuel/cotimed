import prisma from "../prisma/prisma";
import { Prisma } from "@prisma/client";


/**
 * DATOS PARA CREAR EQUIPAMIENTO
 */
export interface CrearEquipamentoData {

    id_proveedor: number;

    nombre_equipamento: string;

    marca_equipamento: string;

    modelo_equipamento: string;

    categoria_equipamento: string;

    estado_equipamento: string;

    descripcion_equipamento: string;

    precio_unitario_equipamento: number;

    plazo_entrega_dias: number;

    garantia_meses: number;

    incluye: string[];

    especificaciones_equipamento: string;
}


/**
 * DATOS PARA ACTUALIZAR EQUIPAMIENTO
 */
export interface ActualizarEquipamentoData {

    id_proveedor?: number;

    nombre_equipamento?: string;

    marca_equipamento?: string;

    modelo_equipamento?: string;

    categoria_equipamento?: string;

    estado_equipamento?: string;

    descripcion_equipamento?: string;

    precio_unitario_equipamento?: number;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    incluye?: string[];

    especificaciones_equipamento?: string;
}


/**
 * CREAR EQUIPAMIENTO
 */
export const crearEquipamento = async (
    data: CrearEquipamentoData
) => {

    const proveedor = await prisma.user.findFirst({

        where: {
            id: data.id_proveedor,
            rol: "proveedor",
        },

        select: {
            id: true,
            name_user: true,
            organizacion: true,
        },
    });


    if (!proveedor) {

        throw new Error(
            "El proveedor no existe o no tiene el rol proveedor"
        );
    }


    return await prisma.equipamento.create({

        data: {

            id_proveedor:
                data.id_proveedor,

            nombre_equipamento:
                data.nombre_equipamento,

            marca_equipamento:
                data.marca_equipamento,

            modelo_equipamento:
                data.modelo_equipamento,

            categoria_equipamento:
                data.categoria_equipamento,

            estado_equipamento:
                data.estado_equipamento,

            descripcion_equipamento:
                data.descripcion_equipamento,

            precio_unitario_equipamento:
                data.precio_unitario_equipamento,

            plazo_entrega_dias:
                data.plazo_entrega_dias,

            garantia_meses:
                data.garantia_meses,

            incluye:
                data.incluye,

            especificaciones_equipamento:
                data.especificaciones_equipamento,
        },
    });
};


/**
 * LISTAR TODOS LOS EQUIPAMIENTOS
 */
export const listarEquipamentos = async () => {

    return await prisma.equipamento.findMany({

        orderBy: {
            id_equipamento: "desc",
        },
    });
};


/**
 * OBTENER EQUIPAMIENTO POR ID
 */
export const obtenerEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id_equipamento: id,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    return equipamento;
};


/**
 * LISTAR EQUIPAMIENTOS POR PROVEEDOR
 */
export const listarEquipamentosPorProveedor = async (
    id_proveedor: number
) => {

    const proveedor =
        await prisma.user.findFirst({

            where: {
                id: id_proveedor,
                rol: "proveedor",
            },

            select: {
                id: true,
            },
        });


    if (!proveedor) {

        throw new Error(
            "Proveedor no encontrado"
        );
    }


    return await prisma.equipamento.findMany({

        where: {
            id_proveedor,
        },

        orderBy: {
            id_equipamento: "desc",
        },
    });
};


/**
 * ACTUALIZAR EQUIPAMIENTO
 */
export const actualizarEquipamento = async (

    id: number,

    data: ActualizarEquipamentoData

) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id_equipamento: id,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    /**
     * Verificar nuevo proveedor si corresponde.
     */
    if (data.id_proveedor !== undefined) {

        const proveedor =
            await prisma.user.findFirst({

                where: {
                    id: data.id_proveedor,
                    rol: "proveedor",
                },

                select: {
                    id: true,
                },
            });


        if (!proveedor) {

            throw new Error(
                "El proveedor indicado no existe o no tiene el rol proveedor"
            );
        }
    }


    const datosActualizar: Prisma.EquipamentoUpdateInput = {};


    if (data.id_proveedor !== undefined) {

        datosActualizar.id_proveedor =
            data.id_proveedor;
    }


    if (data.nombre_equipamento !== undefined) {

        datosActualizar.nombre_equipamento =
            data.nombre_equipamento;
    }


    if (data.marca_equipamento !== undefined) {

        datosActualizar.marca_equipamento =
            data.marca_equipamento;
    }


    if (data.modelo_equipamento !== undefined) {

        datosActualizar.modelo_equipamento =
            data.modelo_equipamento;
    }


    if (data.categoria_equipamento !== undefined) {

        datosActualizar.categoria_equipamento =
            data.categoria_equipamento;
    }


    if (data.estado_equipamento !== undefined) {

        datosActualizar.estado_equipamento =
            data.estado_equipamento;
    }


    if (data.descripcion_equipamento !== undefined) {

        datosActualizar.descripcion_equipamento =
            data.descripcion_equipamento;
    }


    if (
        data.precio_unitario_equipamento !== undefined
    ) {

        datosActualizar.precio_unitario_equipamento =
            data.precio_unitario_equipamento;
    }


    if (data.plazo_entrega_dias !== undefined) {

        datosActualizar.plazo_entrega_dias =
            data.plazo_entrega_dias;
    }


    if (data.garantia_meses !== undefined) {

        datosActualizar.garantia_meses =
            data.garantia_meses;
    }


    if (data.incluye !== undefined) {

        datosActualizar.incluye =
            data.incluye;
    }


    if (
        data.especificaciones_equipamento !== undefined
    ) {

        datosActualizar.especificaciones_equipamento =
            data.especificaciones_equipamento;
    }


    return await prisma.equipamento.update({

        where: {
            id_equipamento: id,
        },

        data: datosActualizar,
    });
};


/**
 * ELIMINAR EQUIPAMIENTO
 */
export const eliminarEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id_equipamento: id,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    return await prisma.equipamento.delete({

        where: {
            id_equipamento: id,
        },
    });
};