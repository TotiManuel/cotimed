import { Request, Response } from "express";

import {
    crearEquipamento,
    listarEquipamentos,
    obtenerEquipamento,
    listarEquipamentosPorProveedor,
    actualizarEquipamento,
    eliminarEquipamento,
} from "../services/equipamento.service";


// =========================================================
// GET /api/equipamentos
// Listar todos los equipamientos
// =========================================================

export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const equipamentos =
            await listarEquipamentos();

        return res.status(200).json(
            equipamentos
        );

    } catch (error) {

        console.error(
            "Error listando equipamientos:",
            error
        );

        return res.status(500).json({
            mensaje:
                "Error obteniendo los equipamientos",
        });
    }
};


// =========================================================
// GET /api/equipamentos/:id
// Obtener equipamiento por ID
// =========================================================

export const obtener = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);

        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de equipamiento inválido",
            });
        }

        const equipamento =
            await obtenerEquipamento(id);

        return res.status(200).json(
            equipamento
        );

    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamiento:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error obteniendo el equipamiento";

        if (
            mensaje ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }

        return res.status(500).json({
            mensaje:
                "Error obteniendo el equipamiento",
        });
    }
};


// =========================================================
// GET /api/equipamentos/proveedor/:id
// Listar equipamientos por proveedor
// =========================================================

export const listarPorProveedor = async (
    req: Request,
    res: Response
) => {

    try {

        const id_proveedor =
            Number(req.params.id);

        if (
            !Number.isInteger(id_proveedor) ||
            id_proveedor <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de proveedor inválido",
            });
        }

        const equipamentos =
            await listarEquipamentosPorProveedor(
                id_proveedor
            );

        return res.status(200).json(
            equipamentos
        );

    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamientos del proveedor:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error obteniendo los equipamientos";

        if (
            mensaje ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }

        return res.status(500).json({
            mensaje:
                "Error obteniendo los equipamientos",
        });
    }
};


// =========================================================
// POST /api/equipamentos
// Crear equipamiento
// =========================================================

export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            id_proveedor,
            nombre_equipamento,
            marca_equipamento,
            modelo_equipamento,
            categoria_equipamento,
            tipo_equipamento,
            estado_equipamento,
            descripcion_equipamento,
            precio_unitario_equipamento,
            tipo_precio,
            moneda,
            stock,
            stock_minimo,
            plazo_entrega_dias,
            garantia_meses,
            disponible,
            fabricante,
            origen,
            registro_sanitario,
            vida_util_anios,
            requiere_instalacion,
            requiere_capacitacion,
            incluye,
            accesorios,
            caracteristicas,
            imagen_principal,
            especificaciones_equipamento,
        } = req.body;


        // -----------------------------------------------------
        // VALIDACIONES
        // -----------------------------------------------------

        if (
            id_proveedor === undefined ||
            id_proveedor === null
        ) {

            return res.status(400).json({
                mensaje:
                    "El proveedor es obligatorio",
            });
        }


        if (
            !nombre_equipamento ||
            !String(nombre_equipamento).trim()
        ) {

            return res.status(400).json({
                mensaje:
                    "El nombre del equipamiento es obligatorio",
            });
        }


        if (
            !categoria_equipamento ||
            !String(categoria_equipamento).trim()
        ) {

            return res.status(400).json({
                mensaje:
                    "La categoría es obligatoria",
            });
        }


        if (
            !descripcion_equipamento ||
            !String(descripcion_equipamento).trim()
        ) {

            return res.status(400).json({
                mensaje:
                    "La descripción es obligatoria",
            });
        }


        if (
            precio_unitario_equipamento ===
            undefined ||
            precio_unitario_equipamento === null
        ) {

            return res.status(400).json({
                mensaje:
                    "El precio unitario es obligatorio",
            });
        }


        const idProveedor =
            Number(id_proveedor);

        const precio =
            Number(precio_unitario_equipamento);


        if (
            !Number.isInteger(idProveedor) ||
            idProveedor <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de proveedor inválido",
            });
        }


        if (
            !Number.isFinite(precio) ||
            precio < 0
        ) {

            return res.status(400).json({
                mensaje:
                    "El precio unitario no es válido",
            });
        }


        // -----------------------------------------------------
        // CREAR
        // -----------------------------------------------------

        const equipamento =
            await crearEquipamento({

                id_proveedor:
                    idProveedor,

                nombre_equipamento:
                    String(
                        nombre_equipamento
                    ).trim(),

                marca_equipamento:
                    marca_equipamento !== undefined
                        ? String(
                            marca_equipamento
                        ).trim()
                        : undefined,

                modelo_equipamento:
                    modelo_equipamento !== undefined
                        ? String(
                            modelo_equipamento
                        ).trim()
                        : undefined,

                categoria_equipamento:
                    String(
                        categoria_equipamento
                    ).trim(),

                tipo_equipamento,

                estado_equipamento,

                descripcion_equipamento:
                    String(
                        descripcion_equipamento
                    ).trim(),

                precio_unitario_equipamento:
                    precio,

                tipo_precio,

                moneda,

                stock:
                    stock !== undefined
                        ? Number(stock)
                        : undefined,

                stock_minimo:
                    stock_minimo !== undefined
                        ? Number(stock_minimo)
                        : undefined,

                plazo_entrega_dias:
                    plazo_entrega_dias !== undefined
                        ? Number(
                            plazo_entrega_dias
                        )
                        : undefined,

                garantia_meses:
                    garantia_meses !== undefined
                        ? Number(
                            garantia_meses
                        )
                        : undefined,

                disponible,

                fabricante,

                origen,

                registro_sanitario,

                vida_util_anios:
                    vida_util_anios !== undefined
                        ? Number(
                            vida_util_anios
                        )
                        : undefined,

                requiere_instalacion,

                requiere_capacitacion,

                incluye,

                accesorios,

                caracteristicas,

                imagen_principal,

                especificaciones_equipamento,
            });


        return res.status(201).json({

            mensaje:
                "Equipamiento creado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error creando equipamiento:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error creando el equipamiento";


        if (
            mensaje ===
            "El proveedor no existe"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        if (
            mensaje ===
            "La categoría del equipamiento es obligatoria"
        ) {

            return res.status(400).json({
                mensaje,
            });
        }


        return res.status(500).json({
            mensaje,
        });
    }
};


// =========================================================
// PUT /api/equipamentos/:id
// Actualizar equipamiento
// =========================================================

export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de equipamiento inválido",
            });
        }


        if (
            !req.body ||
            Object.keys(req.body).length === 0
        ) {

            return res.status(400).json({
                mensaje:
                    "No se enviaron datos para actualizar",
            });
        }


        const {
            id_proveedor,
            nombre_equipamento,
            marca_equipamento,
            modelo_equipamento,
            categoria_equipamento,
            tipo_equipamento,
            estado_equipamento,
            descripcion_equipamento,
            precio_unitario_equipamento,
            tipo_precio,
            moneda,
            stock,
            stock_minimo,
            plazo_entrega_dias,
            garantia_meses,
            disponible,
            fabricante,
            origen,
            registro_sanitario,
            vida_util_anios,
            requiere_instalacion,
            requiere_capacitacion,
            incluye,
            accesorios,
            caracteristicas,
            imagen_principal,
            especificaciones_equipamento,
        } = req.body;


        const data: any = {};


        if (id_proveedor !== undefined) {
            data.id_proveedor =
                Number(id_proveedor);
        }

        if (nombre_equipamento !== undefined) {
            data.nombre_equipamento =
                String(nombre_equipamento).trim();
        }

        if (marca_equipamento !== undefined) {
            data.marca_equipamento =
                String(marca_equipamento).trim();
        }

        if (modelo_equipamento !== undefined) {
            data.modelo_equipamento =
                String(modelo_equipamento).trim();
        }

        if (categoria_equipamento !== undefined) {
            data.categoria_equipamento =
                String(categoria_equipamento).trim();
        }

        if (tipo_equipamento !== undefined) {
            data.tipo_equipamento =
                tipo_equipamento;
        }

        if (estado_equipamento !== undefined) {
            data.estado_equipamento =
                estado_equipamento;
        }

        if (descripcion_equipamento !== undefined) {
            data.descripcion_equipamento =
                String(descripcion_equipamento).trim();
        }

        if (
            precio_unitario_equipamento !== undefined
        ) {
            data.precio_unitario_equipamento =
                Number(
                    precio_unitario_equipamento
                );
        }

        if (tipo_precio !== undefined) {
            data.tipo_precio =
                tipo_precio;
        }

        if (moneda !== undefined) {
            data.moneda =
                moneda;
        }

        if (stock !== undefined) {
            data.stock =
                Number(stock);
        }

        if (stock_minimo !== undefined) {
            data.stock_minimo =
                Number(stock_minimo);
        }

        if (plazo_entrega_dias !== undefined) {
            data.plazo_entrega_dias =
                Number(plazo_entrega_dias);
        }

        if (garantia_meses !== undefined) {
            data.garantia_meses =
                Number(garantia_meses);
        }

        if (disponible !== undefined) {
            data.disponible =
                disponible;
        }

        if (fabricante !== undefined) {
            data.fabricante =
                fabricante;
        }

        if (origen !== undefined) {
            data.origen =
                origen;
        }

        if (registro_sanitario !== undefined) {
            data.registro_sanitario =
                registro_sanitario;
        }

        if (vida_util_anios !== undefined) {
            data.vida_util_anios =
                Number(vida_util_anios);
        }

        if (requiere_instalacion !== undefined) {
            data.requiere_instalacion =
                requiere_instalacion;
        }

        if (requiere_capacitacion !== undefined) {
            data.requiere_capacitacion =
                requiere_capacitacion;
        }

        if (incluye !== undefined) {
            data.incluye =
                incluye;
        }

        if (accesorios !== undefined) {
            data.accesorios =
                accesorios;
        }

        if (caracteristicas !== undefined) {
            data.caracteristicas =
                caracteristicas;
        }

        if (imagen_principal !== undefined) {
            data.imagen_principal =
                imagen_principal;
        }

        if (
            especificaciones_equipamento !== undefined
        ) {
            data.especificaciones_equipamento =
                especificaciones_equipamento;
        }


        const equipamento =
            await actualizarEquipamento(
                id,
                data
            );


        return res.status(200).json({

            mensaje:
                "Equipamiento actualizado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error actualizando equipamiento:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error actualizando el equipamiento";


        if (
            mensaje ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        if (
            mensaje ===
            "El proveedor indicado no existe"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(500).json({
            mensaje,
        });
    }
};


// =========================================================
// DELETE /api/equipamentos/:id
// Eliminación lógica
// =========================================================

export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    "ID de equipamiento inválido",
            });
        }


        const equipamento =
            await eliminarEquipamento(id);


        return res.status(200).json({

            mensaje:
                "Equipamiento eliminado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error eliminando equipamiento:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error eliminando el equipamiento";


        if (
            mensaje ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(500).json({
            mensaje,
        });
    }
};