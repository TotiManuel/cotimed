import prisma from "../prisma/prisma";

import {
    Prisma,
    EstadoEquipamiento,
    TipoEquipamiento,
    TipoPrecio,
    TipoMoneda,
} from "@prisma/client";


// =========================================================
// TIPOS JSON
// =========================================================

type JsonInput = Prisma.InputJsonValue;


// =========================================================
// DATOS PARA CREAR EQUIPAMIENTO
// =========================================================

export interface CrearEquipamentoData {

    id_proveedor: number;

    nombre_equipamento: string;

    marca_equipamento?: string;

    modelo_equipamento?: string;

    categoria_equipamento: string;

    tipo_equipamento?: TipoEquipamiento;

    estado_equipamento?: EstadoEquipamiento;

    descripcion_equipamento: string;

    precio_unitario_equipamento: number;

    tipo_precio?: TipoPrecio;

    moneda?: TipoMoneda;

    stock?: number;

    stock_minimo?: number;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    disponible?: boolean;

    fabricante?: string;

    origen?: string;

    registro_sanitario?: string;

    vida_util_anios?: number;

    requiere_instalacion?: boolean;

    requiere_capacitacion?: boolean;

    incluye?: JsonInput;

    accesorios?: JsonInput;

    caracteristicas?: JsonInput;

    imagen_principal?: string;

    especificaciones_equipamento?: string;
}


// =========================================================
// DATOS PARA ACTUALIZAR EQUIPAMIENTO
// =========================================================

export interface ActualizarEquipamentoData {

    id_proveedor?: number;

    nombre_equipamento?: string;

    marca_equipamento?: string;

    modelo_equipamento?: string;

    categoria_equipamento?: string;

    tipo_equipamiento?: TipoEquipamiento;

    estado_equipamento?: EstadoEquipamiento;

    descripcion_equipamento?: string;

    precio_unitario_equipamento?: number;

    tipo_precio?: TipoPrecio;

    moneda?: TipoMoneda;

    stock?: number;

    stock_minimo?: number;

    plazo_entrega_dias?: number;

    garantia_meses?: number;

    disponible?: boolean;

    fabricante?: string;

    origen?: string;

    registro_sanitario?: string;

    vida_util_anios?: number;

    requiere_instalacion?: boolean;

    requiere_capacitacion?: boolean;

    incluye?: JsonInput;

    accesorios?: JsonInput;

    caracteristicas?: JsonInput;

    imagen_principal?: string;

    especificaciones_equipamento?: string;
}


// =========================================================
// OBTENER / CREAR CATEGORÍA
// =========================================================

const obtenerCategoria = async (
    nombreCategoria: string
) => {

    const nombre = nombreCategoria.trim();

    if (!nombre) {

        throw new Error(
            "La categoría del equipamiento es obligatoria"
        );
    }


    let categoria =
        await prisma.categoria.findUnique({

            where: {
                nombre,
            },
        });


    if (!categoria) {

        categoria =
            await prisma.categoria.create({

                data: {

                    nombre,

                    activa: true,
                },
            });
    }


    return categoria;
};


// =========================================================
// CREAR EQUIPAMIENTO
// =========================================================

export const crearEquipamento = async (
    data: CrearEquipamentoData
) => {

    // ---------------------------------------------------------
    // VERIFICAR PROVEEDOR
    // ---------------------------------------------------------

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: data.id_proveedor,
            },

            select: {
                id: true,
                razon_social: true,
                email: true,
            },
        });


    if (!proveedor) {

        throw new Error(
            "El proveedor no existe"
        );
    }


    // ---------------------------------------------------------
    // OBTENER CATEGORÍA
    // ---------------------------------------------------------

    const categoria =
        await obtenerCategoria(
            data.categoria_equipamento
        );


    // ---------------------------------------------------------
    // CREAR EQUIPAMIENTO
    // ---------------------------------------------------------

    return await prisma.equipamento.create({

        data: {

            proveedor: {

                connect: {
                    id: proveedor.id,
                },
            },

            categoria: {

                connect: {
                    id: categoria.id,
                },
            },

            nombre:
                data.nombre_equipamento,

            marca:
                data.marca_equipamento,

            modelo:
                data.modelo_equipamento,

            tipo:
                data.tipo_equipamento ??
                TipoEquipamiento.EQUIPAMIENTO_MEDICO,

            descripcion:
                data.descripcion_equipamento,

            especificaciones:
                data.especificaciones_equipamento,

            estado:
                data.estado_equipamento ??
                EstadoEquipamiento.ACTIVO,

            precio_unitario:
                data.precio_unitario_equipamento,

            tipo_precio:
                data.tipo_precio ??
                TipoPrecio.UNITARIO,

            moneda:
                data.moneda ??
                TipoMoneda.ARS,

            stock:
                data.stock,

            stock_minimo:
                data.stock_minimo,

            plazo_entrega_dias:
                data.plazo_entrega_dias,

            garantia_meses:
                data.garantia_meses,

            disponible:
                data.disponible ?? true,

            fabricante:
                data.fabricante,

            origen:
                data.origen,

            registro_sanitario:
                data.registro_sanitario,

            vida_util_anios:
                data.vida_util_anios,

            requiere_instalacion:
                data.requiere_instalacion ?? false,

            requiere_capacitacion:
                data.requiere_capacitacion ?? false,

            incluye:
                data.incluye,

            accesorios:
                data.accesorios,

            caracteristicas:
                data.caracteristicas,

            imagen_principal:
                data.imagen_principal,
        },

        include: {

            proveedor: true,

            categoria: true,

            imagenes: true,
        },
    });
};


// =========================================================
// LISTAR TODOS LOS EQUIPAMIENTOS
// =========================================================

export const listarEquipamentos = async () => {

    return await prisma.equipamento.findMany({

        where: {

            eliminado: false,
        },

        include: {

            proveedor: {

                select: {

                    id: true,

                    razon_social: true,

                    nombre_comercial: true,

                    email: true,

                    telefono: true,
                },
            },

            categoria: true,

            imagenes: true,
        },

        orderBy: {

            id: "desc",
        },
    });
};


// =========================================================
// OBTENER EQUIPAMIENTO POR ID
// =========================================================

export const obtenerEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id,
            },

            include: {

                proveedor: true,

                categoria: true,

                imagenes: true,

                favoritos: true,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    return equipamento;
};


// =========================================================
// LISTAR EQUIPAMIENTOS POR PROVEEDOR
// =========================================================

export const listarEquipamentosPorProveedor = async (
    id_proveedor: number
) => {

    const proveedor =
        await prisma.proveedor.findUnique({

            where: {
                id: id_proveedor,
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

            proveedor_id:
                id_proveedor,

            eliminado: false,
        },

        include: {

            categoria: true,

            imagenes: true,
        },

        orderBy: {

            id: "desc",
        },
    });
};


// =========================================================
// ACTUALIZAR EQUIPAMIENTO
// =========================================================

export const actualizarEquipamento = async (

    id: number,

    data: ActualizarEquipamentoData

) => {

    // ---------------------------------------------------------
    // VERIFICAR EQUIPAMIENTO
    // ---------------------------------------------------------

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    // ---------------------------------------------------------
    // DATOS A ACTUALIZAR
    // ---------------------------------------------------------

    const datosActualizar:
        Prisma.EquipamentoUpdateInput = {};


    // ---------------------------------------------------------
    // PROVEEDOR
    // ---------------------------------------------------------

    if (
        data.id_proveedor !== undefined
    ) {

        const proveedor =
            await prisma.proveedor.findUnique({

                where: {
                    id: data.id_proveedor,
                },

                select: {
                    id: true,
                },
            });


        if (!proveedor) {

            throw new Error(
                "El proveedor indicado no existe"
            );
        }


        datosActualizar.proveedor = {

            connect: {

                id:
                    data.id_proveedor,
            },
        };
    }


    // ---------------------------------------------------------
    // CATEGORÍA
    // ---------------------------------------------------------

    if (
        data.categoria_equipamento !== undefined
    ) {

        const categoria =
            await obtenerCategoria(
                data.categoria_equipamento
            );


        datosActualizar.categoria = {

            connect: {

                id:
                    categoria.id,
            },
        };
    }


    // ---------------------------------------------------------
    // NOMBRE
    // ---------------------------------------------------------

    if (
        data.nombre_equipamento !== undefined
    ) {

        datosActualizar.nombre =
            data.nombre_equipamento;
    }


    // ---------------------------------------------------------
    // MARCA
    // ---------------------------------------------------------

    if (
        data.marca_equipamento !== undefined
    ) {

        datosActualizar.marca =
            data.marca_equipamento;
    }


    // ---------------------------------------------------------
    // MODELO
    // ---------------------------------------------------------

    if (
        data.modelo_equipamento !== undefined
    ) {

        datosActualizar.modelo =
            data.modelo_equipamento;
    }


    // ---------------------------------------------------------
    // TIPO
    // ---------------------------------------------------------

    if (
        data.tipo_equipamiento !== undefined
    ) {

        datosActualizar.tipo =
            data.tipo_equipamiento;
    }


    // ---------------------------------------------------------
    // ESTADO
    // ---------------------------------------------------------

    if (
        data.estado_equipamento !== undefined
    ) {

        datosActualizar.estado =
            data.estado_equipamento;
    }


    // ---------------------------------------------------------
    // DESCRIPCIÓN
    // ---------------------------------------------------------

    if (
        data.descripcion_equipamento !== undefined
    ) {

        datosActualizar.descripcion =
            data.descripcion_equipamento;
    }


    // ---------------------------------------------------------
    // ESPECIFICACIONES
    // ---------------------------------------------------------

    if (
        data.especificaciones_equipamento !== undefined
    ) {

        datosActualizar.especificaciones =
            data.especificaciones_equipamento;
    }


    // ---------------------------------------------------------
    // PRECIO
    // ---------------------------------------------------------

    if (
        data.precio_unitario_equipamento !== undefined
    ) {

        datosActualizar.precio_unitario =
            data.precio_unitario_equipamento;
    }


    // ---------------------------------------------------------
    // TIPO DE PRECIO
    // ---------------------------------------------------------

    if (
        data.tipo_precio !== undefined
    ) {

        datosActualizar.tipo_precio =
            data.tipo_precio;
    }


    // ---------------------------------------------------------
    // MONEDA
    // ---------------------------------------------------------

    if (
        data.moneda !== undefined
    ) {

        datosActualizar.moneda =
            data.moneda;
    }


    // ---------------------------------------------------------
    // STOCK
    // ---------------------------------------------------------

    if (
        data.stock !== undefined
    ) {

        datosActualizar.stock =
            data.stock;
    }


    // ---------------------------------------------------------
    // STOCK MÍNIMO
    // ---------------------------------------------------------

    if (
        data.stock_minimo !== undefined
    ) {

        datosActualizar.stock_minimo =
            data.stock_minimo;
    }


    // ---------------------------------------------------------
    // PLAZO DE ENTREGA
    // ---------------------------------------------------------

    if (
        data.plazo_entrega_dias !== undefined
    ) {

        datosActualizar.plazo_entrega_dias =
            data.plazo_entrega_dias;
    }


    // ---------------------------------------------------------
    // GARANTÍA
    // ---------------------------------------------------------

    if (
        data.garantia_meses !== undefined
    ) {

        datosActualizar.garantia_meses =
            data.garantia_meses;
    }


    // ---------------------------------------------------------
    // DISPONIBILIDAD
    // ---------------------------------------------------------

    if (
        data.disponible !== undefined
    ) {

        datosActualizar.disponible =
            data.disponible;
    }


    // ---------------------------------------------------------
    // FABRICANTE
    // ---------------------------------------------------------

    if (
        data.fabricante !== undefined
    ) {

        datosActualizar.fabricante =
            data.fabricante;
    }


    // ---------------------------------------------------------
    // ORIGEN
    // ---------------------------------------------------------

    if (
        data.origen !== undefined
    ) {

        datosActualizar.origen =
            data.origen;
    }


    // ---------------------------------------------------------
    // REGISTRO SANITARIO
    // ---------------------------------------------------------

    if (
        data.registro_sanitario !== undefined
    ) {

        datosActualizar.registro_sanitario =
            data.registro_sanitario;
    }


    // ---------------------------------------------------------
    // VIDA ÚTIL
    // ---------------------------------------------------------

    if (
        data.vida_util_anios !== undefined
    ) {

        datosActualizar.vida_util_anios =
            data.vida_util_anios;
    }


    // ---------------------------------------------------------
    // INSTALACIÓN
    // ---------------------------------------------------------

    if (
        data.requiere_instalacion !== undefined
    ) {

        datosActualizar.requiere_instalacion =
            data.requiere_instalacion;
    }


    // ---------------------------------------------------------
    // CAPACITACIÓN
    // ---------------------------------------------------------

    if (
        data.requiere_capacitacion !== undefined
    ) {

        datosActualizar.requiere_capacitacion =
            data.requiere_capacitacion;
    }


    // ---------------------------------------------------------
    // INCLUYE
    // ---------------------------------------------------------

    if (
        data.incluye !== undefined
    ) {

        datosActualizar.incluye =
            data.incluye;
    }


    // ---------------------------------------------------------
    // ACCESORIOS
    // ---------------------------------------------------------

    if (
        data.accesorios !== undefined
    ) {

        datosActualizar.accesorios =
            data.accesorios;
    }


    // ---------------------------------------------------------
    // CARACTERÍSTICAS
    // ---------------------------------------------------------

    if (
        data.caracteristicas !== undefined
    ) {

        datosActualizar.caracteristicas =
            data.caracteristicas;
    }


    // ---------------------------------------------------------
    // IMAGEN PRINCIPAL
    // ---------------------------------------------------------

    if (
        data.imagen_principal !== undefined
    ) {

        datosActualizar.imagen_principal =
            data.imagen_principal;
    }


    // ---------------------------------------------------------
    // ACTUALIZAR
    // ---------------------------------------------------------

    return await prisma.equipamento.update({

        where: {
            id,
        },

        data: datosActualizar,

        include: {

            proveedor: true,

            categoria: true,

            imagenes: true,
        },
    });
};


// =========================================================
// ELIMINAR EQUIPAMIENTO
// =========================================================

export const eliminarEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id,
            },
        });


    if (!equipamento) {

        throw new Error(
            "Equipamiento no encontrado"
        );
    }


    /*
     * Eliminación lógica.
     */

    return await prisma.equipamento.update({

        where: {
            id,
        },

        data: {

            eliminado: true,

            disponible: false,

            estado:
                EstadoEquipamiento.INACTIVO,
        },
    });
};