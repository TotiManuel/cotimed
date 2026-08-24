// cotimed-api/src/services/categoria.service.ts

// =========================================================
// IMPORTS
// =========================================================

import { EstadoEquipamiento, TipoEquipamiento, TipoMoneda, TipoPrecio } from "@prisma/client";
import prisma from "../prisma/prisma";


// =========================================================
// SERVICE: CATEGORIA
// =========================================================


// =========================================================
// LISTAR TODAS LAS CATEGORIAS
// =========================================================

export const listarCategorias = async () => {

    return await prisma.categoria.findMany({

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
            categoria_padre: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            subcategorias: true,
            equipamentos: true,
        },
    });
};


// =========================================================
// BUSCAR CATEGORIA POR ID
// =========================================================

export const buscarCategoria = async (
    id: number
) => {

    const categoria =
        await prisma.categoria.findUnique({

            where: {
                id: id,
            },

            include: {
            categoria_padre: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            subcategorias: true,
            equipamentos: true,
        },
        });

    if (!categoria) {

        throw new Error(
            "Categoria no encontrado"
        );
    }

    return 
        categoria;
};


// =========================================================
// CREAR CATEGORIA
// =========================================================

export const crearCategoria = async (data: {

        nombre: string;
        descripcion?: string;
        imagen_url?: string;
        activa?: boolean;
        categoria_padre_id?: number;

        subcategorias?: {
            nombre: string;
            descripcion?: string;
            imagen_url?: string;
            activa?: boolean;
            categoria_padre_id?: number;
        }[];

        equipamentos?: {
            proveedor_id: number;
            categoria_id: number;
            nombre: string;
            marca?: string;
            modelo?: string;
            numero_parte?: string;
            codigo_interno?: string;
            tipo: TipoEquipamiento;
            descripcion: string;
            especificaciones?: string;
            estado?: EstadoEquipamiento;
            precio_unitario: number;
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
            incluye?: any;
            accesorios?: any;
            caracteristicas?: any;
            imagen_principal?: string;
            eliminado?: boolean;
        }[];

}) => {

    // =====================================================
    // VERIFICAR CATEGORIA
    // =====================================================

    const categoria =
        await prisma.categoria.findUnique({

            where: {
                id: data.categoria_padre_id,
            },
        });

    if (!categoria) {

        throw new Error(
            "El categoria no existe"
        );
    }

    return await prisma.categoria.create({

        data: {

            nombre:
                data.nombre,

            descripcion:
                data.descripcion,

            imagen_url:
                data.imagen_url,

            activa:
                data.activa,

            categoria_padre_id:
                data.categoria_padre_id,

            subcategorias: {
                create:
                    (data.subcategorias ?? []).map((item) => ({
                        nombre:
                            item.nombre,
                        descripcion:
                            item.descripcion,
                        imagen_url:
                            item.imagen_url,
                        activa:
                            item.activa,
                        categoria_padre_id:
                            item.categoria_padre_id,
                    })),
            },
            equipamentos: {
                create:
                    (data.equipamentos ?? []).map((item) => ({
                        proveedor_id:
                            item.proveedor_id,
                        categoria_id:
                            item.categoria_id,
                        nombre:
                            item.nombre,
                        marca:
                            item.marca,
                        modelo:
                            item.modelo,
                        numero_parte:
                            item.numero_parte,
                        codigo_interno:
                            item.codigo_interno,
                        tipo:
                            item.tipo,
                        descripcion:
                            item.descripcion,
                        especificaciones:
                            item.especificaciones,
                        estado:
                            item.estado,
                        precio_unitario:
                            item.precio_unitario,
                        tipo_precio:
                            item.tipo_precio,
                        moneda:
                            item.moneda,
                        stock:
                            item.stock,
                        stock_minimo:
                            item.stock_minimo,
                        plazo_entrega_dias:
                            item.plazo_entrega_dias,
                        garantia_meses:
                            item.garantia_meses,
                        disponible:
                            item.disponible,
                        fabricante:
                            item.fabricante,
                        origen:
                            item.origen,
                        registro_sanitario:
                            item.registro_sanitario,
                        vida_util_anios:
                            item.vida_util_anios,
                        requiere_instalacion:
                            item.requiere_instalacion,
                        requiere_capacitacion:
                            item.requiere_capacitacion,
                        incluye:
                            item.incluye,
                        accesorios:
                            item.accesorios,
                        caracteristicas:
                            item.caracteristicas,
                        imagen_principal:
                            item.imagen_principal,
                        eliminado:
                            item.eliminado,
                    })),
            },
        },

        include: {
            categoria_padre: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            subcategorias: true,
            equipamentos: true,
        },
    });
};


// =========================================================
// ACTUALIZAR CATEGORIA
// =========================================================

export const actualizarCategoria = async (

    id: number,

    data: {

        nombre?: string;
        descripcion?: string | null;
        imagen_url?: string | null;
        activa?: boolean;
        categoria_padre_id?: number | null;

    },

) => {

    const categoria =
        await prisma.categoria.findUnique({

            where: {
                id: id,
            },
        });

    if (!categoria) {

        throw new Error(
            "Categoria no encontrado"
        );
    }

    return await prisma.categoria.update({

        where: {
            id: id,
        },

        data,

        include: {
            categoria_padre: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            subcategorias: true,
            equipamentos: true,
        },
    });
};


// =========================================================
// ELIMINAR CATEGORIA
// =========================================================

export const eliminarCategoria = async (
    id: number
) => {

    const categoria =
        await prisma.categoria.findUnique({

            where: {
                id: id,
            },
        });

    if (!categoria) {

        throw new Error(
            "Categoria no encontrado"
        );
    }

    return await prisma.categoria.delete({

        where: {
            id: id,
        },
    });
};