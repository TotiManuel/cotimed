// cotimed-api/src/services/equipamento.service.ts

// =========================================================
// IMPORTS
// =========================================================

import prisma from "../prisma/prisma";

import {
    TipoEquipamiento,
    EstadoEquipamiento,
    TipoPrecio,
    TipoMoneda,
} from "@prisma/client";


// =========================================================
// SERVICE: EQUIPAMENTO
// =========================================================


// =========================================================
// LISTAR TODAS LAS EQUIPAMENTOS
// =========================================================

export const listarEquipamentos = async () => {

    return await prisma.equipamento.findMany({

        where: {
            eliminado: false,
        },

        orderBy: {
            fecha_creacion: "desc",
        },

        include: {
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
            categoria: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            imagenes: true,
            favoritos: true,
            items_solicitud: true,
            items_cotizacion: true,
        },
    });
};


// =========================================================
// BUSCAR EQUIPAMENTO POR ID
// =========================================================

export const buscarEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id: id,
            },

            include: {
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
            categoria: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            imagenes: true,
            favoritos: true,
            items_solicitud: true,
            items_cotizacion: true,
        },
        });

    if (!equipamento) {

        throw new Error(
            "Equipamento no encontrado"
        );
    }

    return 
        equipamento;
};


// =========================================================
// CREAR EQUIPAMENTO
// =========================================================

export const crearEquipamento = async (data: {

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

        imagenes?: {
            equipamento_id: number;
            url: string;
            alt?: string;
            orden?: number;
            principal?: boolean;
        }[];

        favoritos?: {
            equipamento_id: number;
            usuario_id?: number;
            institucion_id?: number;
            proveedor_id?: number;
        }[];

        items_solicitud?: {
            solicitud_id: number;
            equipamento_id?: number;
            nombre: string;
            descripcion?: string;
            cantidad: number;
            especificaciones?: string;
            marca_preferida?: string;
            modelo_preferido?: string;
            unidad_medida?: string;
            presupuesto_unitario?: number;
            presupuesto_total?: number;
        }[];

        items_cotizacion?: {
            cotizacion_id: number;
            item_solicitud_id?: number;
            equipamento_id?: number;
            nombre: string;
            descripcion?: string;
            cantidad: number;
            precio_unitario: number;
            descuento?: number;
            subtotal: number;
            impuestos?: number;
            total: number;
            estado?: EstadoItemCotizacion;
            plazo_entrega_dias?: number;
            garantia_meses?: number;
            incluye?: string;
            observaciones?: string;
        }[];

}) => {

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

    // =====================================================
    // VERIFICAR CATEGORIA
    // =====================================================

    const categoria =
        await prisma.categoria.findUnique({

            where: {
                id: data.categoria_id,
            },
        });

    if (!categoria) {

        throw new Error(
            "El categoria no existe"
        );
    }

    return await prisma.equipamento.create({

        data: {

            proveedor_id:
                data.proveedor_id,

            categoria_id:
                data.categoria_id,

            nombre:
                data.nombre,

            marca:
                data.marca,

            modelo:
                data.modelo,

            numero_parte:
                data.numero_parte,

            codigo_interno:
                data.codigo_interno,

            tipo:
                data.tipo,

            descripcion:
                data.descripcion,

            especificaciones:
                data.especificaciones,

            estado:
                data.estado,

            precio_unitario:
                data.precio_unitario,

            tipo_precio:
                data.tipo_precio,

            moneda:
                data.moneda,

            stock:
                data.stock,

            stock_minimo:
                data.stock_minimo,

            plazo_entrega_dias:
                data.plazo_entrega_dias,

            garantia_meses:
                data.garantia_meses,

            disponible:
                data.disponible,

            fabricante:
                data.fabricante,

            origen:
                data.origen,

            registro_sanitario:
                data.registro_sanitario,

            vida_util_anios:
                data.vida_util_anios,

            requiere_instalacion:
                data.requiere_instalacion,

            requiere_capacitacion:
                data.requiere_capacitacion,

            incluye:
                data.incluye,

            accesorios:
                data.accesorios,

            caracteristicas:
                data.caracteristicas,

            imagen_principal:
                data.imagen_principal,

            eliminado:
                data.eliminado,

            imagenes: {
                create:
                    data.imagenes.map((item) => ({
                        equipamento_id:
                            item.equipamento_id,
                        url:
                            item.url,
                        alt:
                            item.alt,
                        orden:
                            item.orden,
                        principal:
                            item.principal,
                    })),
            },
            favoritos: {
                create:
                    data.favoritos.map((item) => ({
                        equipamento_id:
                            item.equipamento_id,
                        usuario_id:
                            item.usuario_id,
                        institucion_id:
                            item.institucion_id,
                        proveedor_id:
                            item.proveedor_id,
                    })),
            },
            items_solicitud: {
                create:
                    data.items_solicitud.map((item) => ({
                        solicitud_id:
                            item.solicitud_id,
                        equipamento_id:
                            item.equipamento_id,
                        nombre:
                            item.nombre,
                        descripcion:
                            item.descripcion,
                        cantidad:
                            item.cantidad,
                        especificaciones:
                            item.especificaciones,
                        marca_preferida:
                            item.marca_preferida,
                        modelo_preferido:
                            item.modelo_preferido,
                        unidad_medida:
                            item.unidad_medida,
                        presupuesto_unitario:
                            item.presupuesto_unitario,
                        presupuesto_total:
                            item.presupuesto_total,
                    })),
            },
            items_cotizacion: {
                create:
                    data.items_cotizacion.map((item) => ({
                        cotizacion_id:
                            item.cotizacion_id,
                        item_solicitud_id:
                            item.item_solicitud_id,
                        equipamento_id:
                            item.equipamento_id,
                        nombre:
                            item.nombre,
                        descripcion:
                            item.descripcion,
                        cantidad:
                            item.cantidad,
                        precio_unitario:
                            item.precio_unitario,
                        descuento:
                            item.descuento,
                        subtotal:
                            item.subtotal,
                        impuestos:
                            item.impuestos,
                        total:
                            item.total,
                        estado:
                            item.estado,
                        plazo_entrega_dias:
                            item.plazo_entrega_dias,
                        garantia_meses:
                            item.garantia_meses,
                        incluye:
                            item.incluye,
                        observaciones:
                            item.observaciones,
                    })),
            },
        },

        include: {
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
            categoria: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            imagenes: true,
            favoritos: true,
            items_solicitud: true,
            items_cotizacion: true,
        },
    });
};


// =========================================================
// ACTUALIZAR EQUIPAMENTO
// =========================================================

export const actualizarEquipamento = async (

    id: number,

    data: {

        proveedor_id?: number;
        categoria_id?: number;
        nombre?: string;
        marca?: string | null;
        modelo?: string | null;
        numero_parte?: string | null;
        codigo_interno?: string | null;
        tipo?: TipoEquipamiento;
        descripcion?: string;
        especificaciones?: string | null;
        estado?: EstadoEquipamiento;
        precio_unitario?: number;
        tipo_precio?: TipoPrecio;
        moneda?: TipoMoneda;
        stock?: number | null;
        stock_minimo?: number | null;
        plazo_entrega_dias?: number | null;
        garantia_meses?: number | null;
        disponible?: boolean;
        fabricante?: string | null;
        origen?: string | null;
        registro_sanitario?: string | null;
        vida_util_anios?: number | null;
        requiere_instalacion?: boolean;
        requiere_capacitacion?: boolean;
        incluye?: any | null;
        accesorios?: any | null;
        caracteristicas?: any | null;
        imagen_principal?: string | null;
        eliminado?: boolean;

    },

) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id: id,
            },
        });

    if (!equipamento) {

        throw new Error(
            "Equipamento no encontrado"
        );
    }

    return await prisma.equipamento.update({

        where: {
            id: id,
        },

        data,

        include: {
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
            categoria: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            imagenes: true,
            favoritos: true,
            items_solicitud: true,
            items_cotizacion: true,
        },
    });
};


// =========================================================
// ELIMINAR EQUIPAMENTO
// =========================================================

export const eliminarEquipamento = async (
    id: number
) => {

    const equipamento =
        await prisma.equipamento.findUnique({

            where: {
                id: id,
            },
        });

    if (!equipamento) {

        throw new Error(
            "Equipamento no encontrado"
        );
    }

    return await prisma.equipamento.update({

        where: {
            id: id,
        },

        data: {
            eliminado: true,
        },
    });
};