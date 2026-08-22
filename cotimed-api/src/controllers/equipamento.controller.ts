import { Request, Response } from "express";

import {
    crearEquipamento,
    listarEquipamentos,
    obtenerEquipamento,
    listarEquipamentosPorProveedor,
    actualizarEquipamento,
    eliminarEquipamento,
} from "../services/equipamento.service";



/*
 * =========================================================
 * POST /api/equipamentos
 * CREAR EQUIPAMIENTO
 * =========================================================
 */

export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        /*
         * =====================================================
         * RECIBIR DATOS
         *
         * Aceptamos tanto:
         *
         * proveedorId
         *
         * como:
         *
         * id_proveedor
         *
         * =====================================================
         */

        const proveedorIdRaw =
            req.body.proveedorId ??
            req.body.id_proveedor;


        const nombreRaw =
            req.body.nombre ??
            req.body.nombre_equipamento;


        const marcaRaw =
            req.body.marca ??
            req.body.marca_equipamento;


        const modeloRaw =
            req.body.modelo ??
            req.body.modelo_equipamento;


        const categoriaRaw =
            req.body.categoria ??
            req.body.categoria_equipamento;


        const estadoRaw =
            req.body.estado ??
            req.body.estado_equipamiento;


        const descripcionRaw =
            req.body.descripcion ??
            req.body.descripcion_equipamiento;


        const precioRaw =
            req.body.precioUnitario ??
            req.body.precio_unitario_equipamiento;


        const plazoRaw =
            req.body.plazoEntregaDias ??
            req.body.plazo_entrega_dias;


        const garantiaRaw =
            req.body.garantiaMeses ??
            req.body.garantia_meses;


        const incluyeRaw =
            req.body.incluye;


        const especificacionesRaw =
            req.body.especificaciones ??
            req.body.especificaciones_equipamento;



        /*
         * =====================================================
         * PROVEEDOR
         * =====================================================
         */

        const proveedorId =
            Number(proveedorIdRaw);


        if (
            !Number.isInteger(proveedorId) ||
            proveedorId <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de proveedor inválido",
            });

        }



        /*
         * =====================================================
         * NOMBRE
         * =====================================================
         */

        if (
            nombreRaw === undefined ||
            nombreRaw === null ||
            !String(nombreRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "El nombre del equipamiento es obligatorio",
            });

        }


        const nombre =
            String(nombreRaw).trim();



        /*
         * =====================================================
         * MARCA
         * =====================================================
         */

        if (
            marcaRaw === undefined ||
            marcaRaw === null ||
            !String(marcaRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "La marca del equipamiento es obligatoria",
            });

        }


        const marca =
            String(marcaRaw).trim();



        /*
         * =====================================================
         * MODELO
         * =====================================================
         */

        if (
            modeloRaw === undefined ||
            modeloRaw === null ||
            !String(modeloRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "El modelo del equipamiento es obligatorio",
            });

        }


        const modelo =
            String(modeloRaw).trim();



        /*
         * =====================================================
         * CATEGORÍA
         * =====================================================
         */

        if (
            categoriaRaw === undefined ||
            categoriaRaw === null ||
            !String(categoriaRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "La categoría del equipamiento es obligatoria",
            });

        }


        const categoria =
            String(categoriaRaw).trim();



        /*
         * =====================================================
         * ESTADO
         * =====================================================
         */

        const estado =
            estadoRaw !== undefined &&
            estadoRaw !== null &&
            String(estadoRaw).trim()
                ? String(estadoRaw).trim()
                : "activo";



        /*
         * =====================================================
         * DESCRIPCIÓN
         * =====================================================
         */

        if (
            descripcionRaw === undefined ||
            descripcionRaw === null ||
            !String(descripcionRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "La descripción del equipamiento es obligatoria",
            });

        }


        const descripcion =
            String(descripcionRaw).trim();



        /*
         * =====================================================
         * PRECIO
         * =====================================================
         */

        /*
         * IMPORTANTE:
         *
         * El frontend envía:
         *
         * precioUnitario
         *
         * y ahora lo recibimos correctamente.
         */

        if (
            precioRaw === undefined ||
            precioRaw === null ||
            precioRaw === ""
        ) {

            return res.status(400).json({
                message:
                    "El precio unitario es obligatorio",
            });

        }


        const precio =
            Number(precioRaw);


        if (
            !Number.isFinite(precio) ||
            precio < 0
        ) {

            return res.status(400).json({
                message:
                    "El precio unitario no es válido",
            });

        }



        /*
         * =====================================================
         * PLAZO DE ENTREGA
         * =====================================================
         */

        if (
            plazoRaw === undefined ||
            plazoRaw === null ||
            plazoRaw === ""
        ) {

            return res.status(400).json({
                message:
                    "El plazo de entrega es obligatorio",
            });

        }


        const plazoEntrega =
            Number(plazoRaw);


        if (
            !Number.isInteger(plazoEntrega) ||
            plazoEntrega < 0
        ) {

            return res.status(400).json({
                message:
                    "El plazo de entrega no es válido",
            });

        }



        /*
         * =====================================================
         * GARANTÍA
         * =====================================================
         */

        if (
            garantiaRaw === undefined ||
            garantiaRaw === null ||
            garantiaRaw === ""
        ) {

            return res.status(400).json({
                message:
                    "La garantía es obligatoria",
            });

        }


        const garantia =
            Number(garantiaRaw);


        if (
            !Number.isInteger(garantia) ||
            garantia < 0
        ) {

            return res.status(400).json({
                message:
                    "La garantía no es válida",
            });

        }



        /*
         * =====================================================
         * INCLUYE
         * =====================================================
         */

        let incluye: string[] = [];


        if (
            incluyeRaw !== undefined &&
            incluyeRaw !== null
        ) {

            if (
                !Array.isArray(incluyeRaw)
            ) {

                return res.status(400).json({
                    message:
                        "El campo incluye debe ser un array",
                });

            }


            incluye =
                incluyeRaw
                    .map(
                        (item: unknown) =>
                            String(item).trim()
                    )
                    .filter(
                        (item: string) =>
                            item.length > 0
                    );

        }



        /*
         * =====================================================
         * ESPECIFICACIONES
         * =====================================================
         */

        if (
            especificacionesRaw === undefined ||
            especificacionesRaw === null ||
            !String(especificacionesRaw).trim()
        ) {

            return res.status(400).json({
                message:
                    "Las especificaciones del equipamiento son obligatorias",
            });

        }


        const especificaciones =
            String(
                especificacionesRaw
            ).trim();



        /*
         * =====================================================
         * CREAR EQUIPAMIENTO
         * =====================================================
         */

        const equipamento =
            await crearEquipamento({

                id_proveedor:
                    proveedorId,

                nombre_equipamento:
                    nombre,

                marca_equipamento:
                    marca,

                modelo_equipamento:
                    modelo,

                categoria_equipamento:
                    categoria,

                estado_equipamento:
                    estado,

                descripcion_equipamento:
                    descripcion,

                precio_unitario_equipamento:
                    precio,

                plazo_entrega_dias:
                    plazoEntrega,

                garantia_meses:
                    garantia,

                incluye:

                    incluye,

                especificaciones_equipamento:
                    especificaciones,

            });



        /*
         * =====================================================
         * RESPUESTA
         * =====================================================
         */

        return res.status(201).json(
            equipamento
        );



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



/*
 * =========================================================
 * GET /api/equipamentos
 * LISTAR TODOS
 * =========================================================
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



/*
 * =========================================================
 * GET /api/equipamentos/:id
 * OBTENER UNO
 * =========================================================
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



/*
 * =========================================================
 * GET /api/equipamentos/proveedor/:id_proveedor
 * LISTAR POR PROVEEDOR
 * =========================================================
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



/*
 * =========================================================
 * PUT /api/equipamentos/:id
 * ACTUALIZAR
 * =========================================================
 */

export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        /*
         * =====================================================
         * VALIDAR ID
         * =====================================================
         */

        if (
            !Number.isInteger(id) ||
            id <= 0
        ) {

            return res.status(400).json({
                message:
                    "ID de equipamento inválido",
            });

        }



        /*
         * =====================================================
         * BODY
         * =====================================================
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



        /*
         * =====================================================
         * ACEPTAR CAMELCASE Y SNAKE_CASE
         * =====================================================
         */

        const proveedorRaw =
            req.body.proveedorId ??
            req.body.id_proveedor;


        const nombreRaw =
            req.body.nombre ??
            req.body.nombre_equipamento;


        const marcaRaw =
            req.body.marca ??
            req.body.marca_equipamento;


        const modeloRaw =
            req.body.modelo ??
            req.body.modelo_equipamento;


        const categoriaRaw =
            req.body.categoria ??
            req.body.categoria_equipamento;


        const estadoRaw =
            req.body.estado ??
            req.body.estado_equipamento;


        const descripcionRaw =
            req.body.descripcion ??
            req.body.descripcion_equipamento;


        const precioRaw =
            req.body.precioUnitario ??
            req.body.precio_unitario_equipamiento;


        const plazoRaw =
            req.body.plazoEntregaDias ??
            req.body.plazo_entrega_dias;


        const garantiaRaw =
            req.body.garantiaMeses ??
            req.body.garantia_meses;


        const incluyeRaw =
            req.body.incluye;


        const especificacionesRaw =
            req.body.especificaciones ??
            req.body.especificaciones_equipamento;



        /*
         * =====================================================
         * DATOS DE ACTUALIZACIÓN
         * =====================================================
         */

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



        /*
         * =====================================================
         * PROVEEDOR
         * =====================================================
         */

        if (
            proveedorRaw !== undefined
        ) {

            const proveedorId =
                Number(proveedorRaw);


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



        /*
         * =====================================================
         * NOMBRE
         * =====================================================
         */

        if (
            nombreRaw !== undefined
        ) {

            const valor =
                String(
                    nombreRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El nombre del equipamiento no puede estar vacío",
                });

            }


            datosActualizacion.nombre_equipamento =
                valor;

        }



        /*
         * =====================================================
         * MARCA
         * =====================================================
         */

        if (
            marcaRaw !== undefined
        ) {

            const valor =
                String(
                    marcaRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La marca del equipamiento no puede estar vacía",
                });

            }


            datosActualizacion.marca_equipamento =
                valor;

        }



        /*
         * =====================================================
         * MODELO
         * =====================================================
         */

        if (
            modeloRaw !== undefined
        ) {

            const valor =
                String(
                    modeloRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El modelo del equipamiento no puede estar vacío",
                });

            }


            datosActualizacion.modelo_equipamento =
                valor;

        }



        /*
         * =====================================================
         * CATEGORÍA
         * =====================================================
         */

        if (
            categoriaRaw !== undefined
        ) {

            const valor =
                String(
                    categoriaRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La categoría no puede estar vacía",
                });

            }


            datosActualizacion.categoria_equipamento =
                valor;

        }



        /*
         * =====================================================
         * ESTADO
         * =====================================================
         */

        if (
            estadoRaw !== undefined
        ) {

            const valor =
                String(
                    estadoRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El estado no puede estar vacío",
                });

            }


            datosActualizacion.estado_equipamento =
                valor;

        }



        /*
         * =====================================================
         * DESCRIPCIÓN
         * =====================================================
         */

        if (
            descripcionRaw !== undefined
        ) {

            const valor =
                String(
                    descripcionRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La descripción no puede estar vacía",
                });

            }


            datosActualizacion.descripcion_equipamento =
                valor;

        }



        /*
         * =====================================================
         * PRECIO
         * =====================================================
         */

        if (
            precioRaw !== undefined
        ) {

            const precio =
                Number(
                    precioRaw
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



        /*
         * =====================================================
         * PLAZO
         * =====================================================
         */

        if (
            plazoRaw !== undefined
        ) {

            const plazo =
                Number(
                    plazoRaw
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



        /*
         * =====================================================
         * GARANTÍA
         * =====================================================
         */

        if (
            garantiaRaw !== undefined
        ) {

            const garantia =
                Number(
                    garantiaRaw
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



        /*
         * =====================================================
         * INCLUYE
         * =====================================================
         */

        if (
            incluyeRaw !== undefined
        ) {

            if (
                !Array.isArray(
                    incluyeRaw
                )
            ) {

                return res.status(400).json({
                    message:
                        "El campo incluye debe ser un array",
                });

            }


            datosActualizacion.incluye =
                incluyeRaw
                    .map(
                        (item: unknown) =>
                            String(item).trim()
                    )
                    .filter(
                        (item: string) =>
                            item.length > 0
                    );

        }



        /*
         * =====================================================
         * ESPECIFICACIONES
         * =====================================================
         */

        if (
            especificacionesRaw !== undefined
        ) {

            const valor =
                String(
                    especificacionesRaw
                ).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "Las especificaciones no pueden estar vacías",
                });

            }


            datosActualizacion
                .especificaciones_equipamento =
                    valor;

        }



        /*
         * =====================================================
         * ACTUALIZAR
         * =====================================================
         */

        const equipamento =
            await actualizarEquipamento(
                id,
                datosActualizacion
            );



        /*
         * =====================================================
         * RESPUESTA
         * =====================================================
         */

        return res.status(200).json(
            equipamento
        );



    } catch (error: unknown) {

        console.error(
            "Error actualizando equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error actualizando equipamiento";


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



/*
 * =========================================================
 * DELETE /api/equipamentos/:id
 * ELIMINAR
 * =========================================================
 */

export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(
                req.params.id
            );


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
            await eliminarEquipamento(
                id
            );


        return res.status(200).json({

            message:
                "Equipamento eliminado correctamente",

            equipamento,

        });


    } catch (error: unknown) {

        console.error(
            "Error eliminando equipamiento:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error eliminando equipamiento";


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