import { Request, Response } from "express";

import {
    listarCotizaciones,
    buscarCotizacion,
    listarCotizacionesPorSolicitud,
    listarCotizacionesPorProveedor,
    crearCotizacion,
    actualizarCotizacion,
    eliminarCotizacion,
    agregarIncluyeCotizacion,
    eliminarIncluyeCotizacion
} from "../services/cotizaciones.service";


/*
 * ==========================================
 * LISTAR TODAS LAS COTIZACIONES
 * ==========================================
 *
 * GET /api/cotizaciones
 */

export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const cotizaciones =
            await listarCotizaciones();

        res.json(
            cotizaciones
        );

    } catch (error) {

        console.error(
            "Error obteniendo cotizaciones:",
            error
        );

        res.status(500).json({

            mensaje:
                "No se pudieron obtener las cotizaciones"

        });

    }

};



/*
 * ==========================================
 * BUSCAR COTIZACIÓN POR ID
 * ==========================================
 *
 * GET /api/cotizaciones/:id
 */

export const buscar = async (
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

                mensaje:
                    "ID de cotización inválido"

            });

        }


        const cotizacion =
            await buscarCotizacion(id);


        if (!cotizacion) {

            return res.status(404).json({

                mensaje:
                    "Cotización no encontrada"

            });

        }


        return res.json(
            cotizacion
        );

    } catch (error) {

        console.error(
            "Error buscando cotización:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo obtener la cotización"

        });

    }

};



/*
 * ==========================================
 * COTIZACIONES DE UNA SOLICITUD
 * ==========================================
 *
 * GET /api/cotizaciones/solicitud/:id
 */

export const listarPorSolicitud = async (
    req: Request,
    res: Response
) => {

    try {

        const id_solicitud =
            Number(
                req.params.id
            );


        if (
            !Number.isInteger(id_solicitud) ||
            id_solicitud <= 0
        ) {

            return res.status(400).json({

                mensaje:
                    "ID de solicitud inválido"

            });

        }


        const cotizaciones =
            await listarCotizacionesPorSolicitud(
                id_solicitud
            );


        return res.json(
            cotizaciones
        );

    } catch (error) {

        console.error(
            "Error obteniendo cotizaciones de solicitud:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudieron obtener las cotizaciones"

        });

    }

};



/*
 * ==========================================
 * COTIZACIONES DE UN PROVEEDOR
 * ==========================================
 *
 * GET /api/cotizaciones/proveedor/:id
 */

export const listarPorProveedor = async (
    req: Request,
    res: Response
) => {

    try {

        const id_proveedor =
            Number(
                req.params.id
            );


        if (
            !Number.isInteger(id_proveedor) ||
            id_proveedor <= 0
        ) {

            return res.status(400).json({

                mensaje:
                    "ID de proveedor inválido"

            });

        }


        const cotizaciones =
            await listarCotizacionesPorProveedor(
                id_proveedor
            );


        return res.json(
            cotizaciones
        );

    } catch (error) {

        console.error(
            "Error obteniendo cotizaciones del proveedor:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudieron obtener las cotizaciones"

        });

    }

};



/*
 * ==========================================
 * CREAR COTIZACIÓN
 * ==========================================
 *
 * POST /api/cotizaciones
 */

export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const {

            id_solicitud,

            id_proveedor,

            nombre_proveedor,

            precio_unitario_cotizacion,

            precio_total_cotizacion,

            plazo_entrega_dias_cotizacion,

            garantia_meses_cotizacion,

            descripcion_cotizacion,

            estado_cotizacion,

            incluye_cotizacion

        } = req.body;


        /*
         * Validaciones básicas
         */

        if (
            !id_solicitud ||
            !id_proveedor
        ) {

            return res.status(400).json({

                mensaje:
                    "La solicitud y el proveedor son obligatorios"

            });

        }


        if (
            !nombre_proveedor ||
            !descripcion_cotizacion
        ) {

            return res.status(400).json({

                mensaje:
                    "El nombre del proveedor y la descripción son obligatorios"

            });

        }


        if (
            precio_unitario_cotizacion === undefined ||
            precio_total_cotizacion === undefined
        ) {

            return res.status(400).json({

                mensaje:
                    "Los precios son obligatorios"

            });

        }


        if (
            plazo_entrega_dias_cotizacion === undefined ||
            garantia_meses_cotizacion === undefined
        ) {

            return res.status(400).json({

                mensaje:
                    "El plazo de entrega y la garantía son obligatorios"

            });

        }


        const cotizacion =
            await crearCotizacion({

                id_solicitud:
                    Number(id_solicitud),

                id_proveedor:
                    Number(id_proveedor),

                nombre_proveedor:
                    String(nombre_proveedor),

                precio_unitario_cotizacion:
                    Number(precio_unitario_cotizacion),

                precio_total_cotizacion:
                    Number(precio_total_cotizacion),

                plazo_entrega_dias_cotizacion:
                    Number(plazo_entrega_dias_cotizacion),

                garantia_meses_cotizacion:
                    Number(garantia_meses_cotizacion),

                descripcion_cotizacion:
                    String(descripcion_cotizacion),

                estado_cotizacion:
                    estado_cotizacion
                    ?
                    String(estado_cotizacion)
                    :
                    "enviada",

                incluye_cotizacion:
                    Array.isArray(
                        incluye_cotizacion
                    )
                    ?
                    incluye_cotizacion
                    :
                    undefined

            });


        return res.status(201).json(
            cotizacion
        );

    } catch (error) {

        console.error(
            "Error creando cotización:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo crear la cotización"

        });

    }

};



/*
 * ==========================================
 * ACTUALIZAR COTIZACIÓN
 * ==========================================
 *
 * PUT /api/cotizaciones/:id
 */

export const actualizar = async (
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

                mensaje:
                    "ID de cotización inválido"

            });

        }


        const {

            id_solicitud,

            id_proveedor,

            nombre_proveedor,

            precio_unitario_cotizacion,

            precio_total_cotizacion,

            plazo_entrega_dias_cotizacion,

            garantia_meses_cotizacion,

            descripcion_cotizacion,

            estado_cotizacion,

            incluye_cotizacion

        } = req.body;


        const data: any = {};


        if (
            id_solicitud !== undefined
        ) {

            data.id_solicitud =
                Number(id_solicitud);

        }


        if (
            id_proveedor !== undefined
        ) {

            data.id_proveedor =
                Number(id_proveedor);

        }


        if (
            nombre_proveedor !== undefined
        ) {

            data.nombre_proveedor =
                String(nombre_proveedor);

        }


        if (
            precio_unitario_cotizacion !== undefined
        ) {

            data.precio_unitario_cotizacion =
                Number(
                    precio_unitario_cotizacion
                );

        }


        if (
            precio_total_cotizacion !== undefined
        ) {

            data.precio_total_cotizacion =
                Number(
                    precio_total_cotizacion
                );

        }


        if (
            plazo_entrega_dias_cotizacion !== undefined
        ) {

            data.plazo_entrega_dias_cotizacion =
                Number(
                    plazo_entrega_dias_cotizacion
                );

        }


        if (
            garantia_meses_cotizacion !== undefined
        ) {

            data.garantia_meses_cotizacion =
                Number(
                    garantia_meses_cotizacion
                );

        }


        if (
            descripcion_cotizacion !== undefined
        ) {

            data.descripcion_cotizacion =
                String(
                    descripcion_cotizacion
                );

        }


        if (
            estado_cotizacion !== undefined
        ) {

            data.estado_cotizacion =
                String(
                    estado_cotizacion
                );

        }


        if (
            incluye_cotizacion !== undefined
        ) {

            if (
                !Array.isArray(
                    incluye_cotizacion
                )
            ) {

                return res.status(400).json({

                    mensaje:
                        "incluye_cotizacion debe ser un array"

                });

            }


            data.incluye_cotizacion =
                incluye_cotizacion;

        }


        const cotizacion =
            await actualizarCotizacion(

                id,

                data

            );


        return res.json(
            cotizacion
        );

    } catch (error) {

        console.error(
            "Error actualizando cotización:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo actualizar la cotización"

        });

    }

};



/*
 * ==========================================
 * ELIMINAR COTIZACIÓN
 * ==========================================
 *
 * DELETE /api/cotizaciones/:id
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

                mensaje:
                    "ID de cotización inválido"

            });

        }


        const cotizacion =
            await buscarCotizacion(id);


        if (!cotizacion) {

            return res.status(404).json({

                mensaje:
                    "Cotización no encontrada"

            });

        }


        await eliminarCotizacion(
            id
        );


        return res.json({

            mensaje:
                "Cotización eliminada correctamente"

        });

    } catch (error) {

        console.error(
            "Error eliminando cotización:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo eliminar la cotización"

        });

    }

};



/*
 * ==========================================
 * AGREGAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * POST /api/cotizaciones/:id/incluye
 */

export const agregarIncluye = async (
    req: Request,
    res: Response
) => {

    try {

        const id_cotizacion =
            Number(
                req.params.id
            );


        const {
            descripcion
        } = req.body;


        if (
            !Number.isInteger(
                id_cotizacion
            ) ||
            id_cotizacion <= 0
        ) {

            return res.status(400).json({

                mensaje:
                    "ID de cotización inválido"

            });

        }


        if (
            !descripcion ||
            !String(descripcion).trim()
        ) {

            return res.status(400).json({

                mensaje:
                    "La descripción es obligatoria"

            });

        }


        const elemento =
            await agregarIncluyeCotizacion(

                id_cotizacion,

                String(
                    descripcion
                ).trim()

            );


        return res.status(201).json(
            elemento
        );

    } catch (error) {

        console.error(
            "Error agregando elemento a cotización:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo agregar el elemento"

        });

    }

};



/*
 * ==========================================
 * ELIMINAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * DELETE /api/cotizaciones/incluye/:id
 */

export const eliminarIncluye = async (
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

                mensaje:
                    "ID del elemento inválido"

            });

        }


        await eliminarIncluyeCotizacion(
            id
        );


        return res.json({

            mensaje:
                "Elemento eliminado correctamente"

        });

    } catch (error) {

        console.error(
            "Error eliminando elemento:",
            error
        );

        return res.status(500).json({

            mensaje:
                "No se pudo eliminar el elemento"

        });

    }

};
