import { Request, Response } from "express";

import {
    listarSolicitudes,
    buscarSolicitud,
    listarSolicitudesPorInstitucion,
    crearSolicitud,
    actualizarSolicitud,
    eliminarSolicitud,
} from "../services/solicitud.service";


/**
 * GET /api/solicitudes
 *
 * Listar todas las solicitudes
 */
export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const solicitudes =
            await listarSolicitudes();


        return res.status(200).json(
            solicitudes
        );


    } catch (error) {

        console.error(
            "Error listando solicitudes:",
            error
        );


        return res.status(500).json({

            mensaje:
                "Error obteniendo las solicitudes",

        });

    }

};


/**
 * GET /api/solicitudes/:id
 *
 * Buscar solicitud por ID
 */
export const obtener = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                mensaje:
                    "ID de solicitud inválido",

            });

        }


        const solicitud =
            await buscarSolicitud(id);


        if (!solicitud) {

            return res.status(404).json({

                mensaje:
                    "Solicitud no encontrada",

            });

        }


        return res.status(200).json(
            solicitud
        );


    } catch (error) {

        console.error(
            "Error buscando solicitud:",
            error
        );


        return res.status(500).json({

            mensaje:
                "Error buscando la solicitud",

        });

    }

};


/**
 * GET /api/solicitudes/institucion/:id
 *
 * Listar solicitudes de una institución
 */
export const listarPorInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const id_institucion =
            Number(
                req.params.id
            );


        if (isNaN(id_institucion)) {

            return res.status(400).json({

                mensaje:
                    "ID de institución inválido",

            });

        }


        const solicitudes =
            await listarSolicitudesPorInstitucion(
                id_institucion
            );


        return res.status(200).json(
            solicitudes
        );


    } catch (error) {

        console.error(
            "Error obteniendo solicitudes de institución:",
            error
        );


        return res.status(500).json({

            mensaje:
                "Error obteniendo las solicitudes",

        });

    }

};


/**
 * POST /api/solicitudes
 *
 * Crear solicitud
 */
export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const {

            titulo_solicitud,

            equipamiento_solicitud,

            descripcion_solicitud,

            cantidad_solicitud,

            urgencia_solicitud,

            estado_solicitud,

            id_institucion,

            nombre_institucion,

            especificaciones_solicitud,

            presupuesto_estimado_solicitud,

        } = req.body;


        /*
         * Validaciones
         */

        if (!titulo_solicitud) {

            return res.status(400).json({

                mensaje:
                    "El título de la solicitud es obligatorio",

            });

        }


        if (!equipamiento_solicitud) {

            return res.status(400).json({

                mensaje:
                    "El equipamiento es obligatorio",

            });

        }


        if (!descripcion_solicitud) {

            return res.status(400).json({

                mensaje:
                    "La descripción es obligatoria",

            });

        }


        if (
            cantidad_solicitud === undefined ||
            cantidad_solicitud === null
        ) {

            return res.status(400).json({

                mensaje:
                    "La cantidad es obligatoria",

            });

        }


        if (!urgencia_solicitud) {

            return res.status(400).json({

                mensaje:
                    "La urgencia es obligatoria",

            });

        }


        if (!id_institucion) {

            return res.status(400).json({

                mensaje:
                    "La institución es obligatoria",

            });

        }


        if (!nombre_institucion) {

            return res.status(400).json({

                mensaje:
                    "El nombre de la institución es obligatorio",

            });

        }


        if (!especificaciones_solicitud) {

            return res.status(400).json({

                mensaje:
                    "Las especificaciones son obligatorias",

            });

        }


        if (
            presupuesto_estimado_solicitud ===
            undefined ||
            presupuesto_estimado_solicitud === null
        ) {

            return res.status(400).json({

                mensaje:
                    "El presupuesto estimado es obligatorio",

            });

        }


        /*
         * Estado inicial
         *
         * Si no viene desde el frontend,
         * usamos "pendiente".
         */

        const estado =
            estado_solicitud ||
            "pendiente";


        const solicitud =
            await crearSolicitud({

                titulo_solicitud,

                equipamiento_solicitud,

                descripcion_solicitud,

                cantidad_solicitud:
                    Number(cantidad_solicitud),

                urgencia_solicitud,

                estado_solicitud:
                    estado,

                id_institucion:
                    Number(id_institucion),

                nombre_institucion,

                especificaciones_solicitud,

                presupuesto_estimado_solicitud:
                    Number(
                        presupuesto_estimado_solicitud
                    ),

            });


        return res.status(201).json(
            solicitud
        );


    } catch (error) {

        console.error(
            "Error creando solicitud:",
            error
        );


        return res.status(500).json({

            mensaje:
                "Error creando la solicitud",

        });

    }

};


/**
 * PUT /api/solicitudes/:id
 *
 * Actualizar solicitud
 */
export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                mensaje:
                    "ID de solicitud inválido",

            });

        }


        /*
         * Verificar que exista
         */

        const existente =
            await buscarSolicitud(id);


        if (!existente) {

            return res.status(404).json({

                mensaje:
                    "Solicitud no encontrada",

            });

        }


        const {

            titulo_solicitud,

            equipamiento_solicitud,

            descripcion_solicitud,

            cantidad_solicitud,

            urgencia_solicitud,

            estado_solicitud,

            nombre_institucion,

            especificaciones_solicitud,

            presupuesto_estimado_solicitud,

        } = req.body;


        const datosActualizacion: {

            titulo_solicitud?: string;

            equipamiento_solicitud?: string;

            descripcion_solicitud?: string;

            cantidad_solicitud?: number;

            urgencia_solicitud?: string;

            estado_solicitud?: string;

            nombre_institucion?: string;

            especificaciones_solicitud?: string;

            presupuesto_estimado_solicitud?: number;

        } = {};


        if (
            titulo_solicitud !== undefined
        ) {

            datosActualizacion
                .titulo_solicitud =
                titulo_solicitud;

        }


        if (
            equipamiento_solicitud !== undefined
        ) {

            datosActualizacion
                .equipamiento_solicitud =
                equipamiento_solicitud;

        }


        if (
            descripcion_solicitud !== undefined
        ) {

            datosActualizacion
                .descripcion_solicitud =
                descripcion_solicitud;

        }


        if (
            cantidad_solicitud !== undefined
        ) {

            datosActualizacion
                .cantidad_solicitud =
                Number(
                    cantidad_solicitud
                );

        }


        if (
            urgencia_solicitud !== undefined
        ) {

            datosActualizacion
                .urgencia_solicitud =
                urgencia_solicitud;

        }


        if (
            estado_solicitud !== undefined
        ) {

            datosActualizacion
                .estado_solicitud =
                estado_solicitud;

        }


        if (
            nombre_institucion !== undefined
        ) {

            datosActualizacion
                .nombre_institucion =
                nombre_institucion;

        }


        if (
            especificaciones_solicitud !== undefined
        ) {

            datosActualizacion
                .especificaciones_solicitud =
                especificaciones_solicitud;

        }


        if (
            presupuesto_estimado_solicitud !==
            undefined
        ) {

            datosActualizacion
                .presupuesto_estimado_solicitud =
                Number(
                    presupuesto_estimado_solicitud
                );

        }


        const solicitud =
            await actualizarSolicitud(

                id,

                datosActualizacion

            );


        return res.status(200).json(
            solicitud
        );


    } catch (error: any) {

        console.error(
            "Error actualizando solicitud:",
            error
        );


        /*
         * Solicitud inexistente
         */

        if (
            error?.code === "P2025"
        ) {

            return res.status(404).json({

                mensaje:
                    "Solicitud no encontrada",

            });

        }


        return res.status(500).json({

            mensaje:
                "Error actualizando la solicitud",

        });

    }

};


/**
 * DELETE /api/solicitudes/:id
 *
 * Eliminar solicitud
 */
export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id =
            Number(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                mensaje:
                    "ID de solicitud inválido",

            });

        }


        /*
         * Verificar que exista
         */

        const solicitud =
            await buscarSolicitud(id);


        if (!solicitud) {

            return res.status(404).json({

                mensaje:
                    "Solicitud no encontrada",

            });

        }


        /*
         * Si tiene cotizaciones,
         * no permitir eliminarla.
         */

        if (
            solicitud.cotizaciones &&
            solicitud.cotizaciones.length > 0
        ) {

            return res.status(409).json({

                mensaje:
                    "No se puede eliminar una solicitud que tiene cotizaciones",

            });

        }


        await eliminarSolicitud(id);


        return res.status(200).json({

            mensaje:
                "Solicitud eliminada correctamente",

        });


    } catch (error: any) {

        console.error(
            "Error eliminando solicitud:",
            error
        );


        /*
         * Restricción de relación
         */

        if (
            error?.code === "P2003"
        ) {

            return res.status(409).json({

                mensaje:
                    "No se puede eliminar la solicitud porque tiene datos relacionados",

            });

        }


        return res.status(500).json({

            mensaje:
                "Error eliminando la solicitud",

        });

    }

};