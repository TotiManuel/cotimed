import { Request, Response } from "express";

import {
    crearEquipamento,
    listarEquipamentos,
    obtenerEquipamento,
    listarEquipamentosPorProveedor,
    actualizarEquipamento,
    eliminarEquipamento,
} from "../services/equipamento.service";


/**
 * POST /api/equipamentos
 *
 * Crear equipamiento
 */
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
            estado_equipamento,
            descripcion_equipamento,
            precio_unitario_equipamento,
            plazo_entrega_dias,
            garantia_meses,
            incluye,
            especificaciones_equipamento,
        } = req.body;


        /**
         * Validaciones
         */

        const proveedorId =
            Number(id_proveedor);


        if (
            !Number.isInteger(proveedorId) ||
            proveedorId <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de proveedor inválido",
            });
        }


        if (
            !nombre_equipamento ||
            !String(nombre_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "El nombre del equipamiento es obligatorio",
            });
        }


        if (
            !marca_equipamento ||
            !String(marca_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "La marca del equipamiento es obligatoria",
            });
        }


        if (
            !modelo_equipamento ||
            !String(modelo_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "El modelo del equipamiento es obligatorio",
            });
        }


        if (
            !categoria_equipamento ||
            !String(categoria_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "La categoría del equipamiento es obligatoria",
            });
        }


        if (
            !estado_equipamento ||
            !String(estado_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "El estado del equipamiento es obligatorio",
            });
        }


        if (
            !descripcion_equipamento ||
            !String(descripcion_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "La descripción del equipamiento es obligatoria",
            });
        }


        const precio =
            Number(precio_unitario_equipamento);


        if (
            !Number.isFinite(precio) ||
            precio < 0
        ) {

            return res.status(400).json({
                message:
                    "El precio unitario no es válido",
            });
        }


        const plazoEntrega =
            Number(plazo_entrega_dias);


        if (
            !Number.isInteger(plazoEntrega) ||
            plazoEntrega < 0
        ) {

            return res.status(400).json({
                message:
                    "El plazo de entrega no es válido",
            });
        }


        const garantia =
            Number(garantia_meses);


        if (
            !Number.isInteger(garantia) ||
            garantia < 0
        ) {

            return res.status(400).json({
                message:
                    "La garantía no es válida",
            });
        }


        if (!Array.isArray(incluye)) {

            return res.status(400).json({
                message:
                    "El campo incluye debe ser un array",
            });
        }


        if (
            !especificaciones_equipamento ||
            !String(especificaciones_equipamento).trim()
        ) {

            return res.status(400).json({
                message:
                    "Las especificaciones del equipamiento son obligatorias",
            });
        }


        /**
         * Crear equipamiento.
         */
        const equipamento =
            await crearEquipamento({

                id_proveedor:
                    proveedorId,

                nombre_equipamento:
                    String(nombre_equipamento).trim(),

                marca_equipamento:
                    String(marca_equipamento).trim(),

                modelo_equipamento:
                    String(modelo_equipamento).trim(),

                categoria_equipamento:
                    String(categoria_equipamento).trim(),

                estado_equipamento:
                    String(estado_equipamento).trim(),

                descripcion_equipamento:
                    String(descripcion_equipamento).trim(),

                precio_unitario_equipamento:
                    precio,

                plazo_entrega_dias:
                    plazoEntrega,

                garantia_meses:
                    garantia,

                incluye,

                especificaciones_equipamento:
                    String(
                        especificaciones_equipamento
                    ).trim(),
            });


        return res.status(201).json({

            message:
                "Equipamento creado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error creando equipamento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error creando equipamento";


        if (
            message ===
            "El proveedor no existe o no tiene el rol proveedor"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


/**
 * GET /api/equipamentos
 *
 * Listar todos los equipamientos
 */
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

    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamentos:",
            error
        );


        return res.status(500).json({
            message:
                "Error obteniendo equipamentos",
        });
    }
};


/**
 * GET /api/equipamentos/:id
 *
 * Obtener equipamiento por ID
 */
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
                message:
                    "ID de equipamento inválido",
            });
        }


        const equipamento =
            await obtenerEquipamento(id);


        return res.status(200).json(
            equipamento
        );

    } catch (error: unknown) {

        console.error(
            "Error obteniendo equipamento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error obteniendo equipamento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


/**
 * GET /api/equipamentos/proveedor/:id_proveedor
 *
 * Listar equipamientos de un proveedor
 */
export const listarPorProveedor = async (
    req: Request,
    res: Response
) => {

    try {

        const id_proveedor =
            Number(
                req.params.id_proveedor
            );


        if (
            !Number.isInteger(id_proveedor) ||
            id_proveedor <= 0
        ) {

            return res.status(400).json({
                message:
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
            "Error obteniendo equipamentos del proveedor:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error obteniendo equipamentos del proveedor";


        if (
            message ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


/**
 * PUT /api/equipamentos/:id
 *
 * Actualizar equipamiento
 */
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
                message:
                    "ID de equipamento inválido",
            });
        }


        /**
         * No permitir body vacío.
         */
        if (
            !req.body ||
            Object.keys(req.body).length === 0
        ) {

            return res.status(400).json({
                message:
                    "No se enviaron datos para actualizar",
            });
        }


        const {
            id_proveedor,
            nombre_equipamento,
            marca_equipamento,
            modelo_equipamento,
            categoria_equipamento,
            estado_equipamento,
            descripcion_equipamento,
            precio_unitario_equipamento,
            plazo_entrega_dias,
            garantia_meses,
            incluye,
            especificaciones_equipamento,
        } = req.body;


        const datosActualizacion: {
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
        } = {};


        if (
            id_proveedor !== undefined
        ) {

            const proveedorId =
                Number(id_proveedor);


            if (
                !Number.isInteger(proveedorId) ||
                proveedorId <= 0
            ) {

                return res.status(400).json({
                    message:
                        "ID de proveedor inválido",
                });
            }


            datosActualizacion.id_proveedor =
                proveedorId;
        }


        if (
            nombre_equipamento !== undefined
        ) {

            datosActualizacion.nombre_equipamento =
                String(nombre_equipamento).trim();
        }


        if (
            marca_equipamento !== undefined
        ) {

            datosActualizacion.marca_equipamento =
                String(marca_equipamento).trim();
        }


        if (
            modelo_equipamento !== undefined
        ) {

            datosActualizacion.modelo_equipamento =
                String(modelo_equipamento).trim();
        }


        if (
            categoria_equipamento !== undefined
        ) {

            datosActualizacion.categoria_equipamento =
                String(categoria_equipamento).trim();
        }


        if (
            estado_equipamento !== undefined
        ) {

            datosActualizacion.estado_equipamento =
                String(estado_equipamento).trim();
        }


        if (
            descripcion_equipamento !== undefined
        ) {

            datosActualizacion.descripcion_equipamento =
                String(descripcion_equipamento).trim();
        }


        if (
            precio_unitario_equipamento !== undefined
        ) {

            const precio =
                Number(
                    precio_unitario_equipamento
                );


            if (
                !Number.isFinite(precio) ||
                precio < 0
            ) {

                return res.status(400).json({
                    message:
                        "El precio unitario no es válido",
                });
            }


            datosActualizacion
                .precio_unitario_equipamento =
                    precio;
        }


        if (
            plazo_entrega_dias !== undefined
        ) {

            const plazo =
                Number(
                    plazo_entrega_dias
                );


            if (
                !Number.isInteger(plazo) ||
                plazo < 0
            ) {

                return res.status(400).json({
                    message:
                        "El plazo de entrega no es válido",
                });
            }


            datosActualizacion
                .plazo_entrega_dias =
                    plazo;
        }


        if (
            garantia_meses !== undefined
        ) {

            const garantia =
                Number(
                    garantia_meses
                );


            if (
                !Number.isInteger(garantia) ||
                garantia < 0
            ) {

                return res.status(400).json({
                    message:
                        "La garantía no es válida",
                });
            }


            datosActualizacion
                .garantia_meses =
                    garantia;
        }


        if (
            incluye !== undefined
        ) {

            if (
                !Array.isArray(incluye)
            ) {

                return res.status(400).json({
                    message:
                        "El campo incluye debe ser un array",
                });
            }


            datosActualizacion.incluye =
                incluye;
        }


        if (
            especificaciones_equipamento !==
            undefined
        ) {

            datosActualizacion
                .especificaciones_equipamento =
                    String(
                        especificaciones_equipamento
                    ).trim();
        }


        const equipamento =
            await actualizarEquipamento(
                id,
                datosActualizacion
            );


        return res.status(200).json({

            message:
                "Equipamento actualizado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error actualizando equipamento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error actualizando equipamento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        if (
            message ===
            "El proveedor indicado no existe o no tiene el rol proveedor"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


/**
 * DELETE /api/equipamentos/:id
 *
 * Eliminar equipamiento
 */
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
                message:
                    "ID de equipamento inválido",
            });
        }


        const equipamento =
            await eliminarEquipamento(id);


        return res.status(200).json({

            message:
                "Equipamento eliminado correctamente",

            equipamento,
        });

    } catch (error: unknown) {

        console.error(
            "Error eliminando equipamento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error eliminando equipamento";


        if (
            message ===
            "Equipamiento no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};