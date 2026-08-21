import { Request, Response } from "express";

import {
    crearInstitucion,
    buscarInstitucion,
    listarInstituciones,
    actualizarInstitucion,
    eliminarInstitucion,
} from "../services/instituciones.service";


/**
 * CREAR INSTITUCIÓN
 */
export const createInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const institucion = await crearInstitucion(
            req.body
        );

        res.status(201).json({
            message: "Institución creada correctamente",
            institucion,
        });

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al crear la institución";

        /**
         * Email duplicado.
         */
        if (
            message === "El email ya está registrado"
        ) {

            res.status(409).json({
                message,
            });

            return;
        }

        res.status(400).json({
            message,
        });
    }
};


/**
 * BUSCAR INSTITUCIÓN POR ID
 */
export const getInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );

        /**
         * Validar ID.
         */
        if (!Number.isInteger(id) || id <= 0) {

            res.status(400).json({
                message: "El ID de la institución no es válido",
            });

            return;
        }

        const institucion =
            await buscarInstitucion(id);

        res.status(200).json(
            institucion
        );

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al buscar la institución";

        if (
            message === "Institución no encontrada"
        ) {

            res.status(404).json({
                message,
            });

            return;
        }

        res.status(500).json({
            message,
        });
    }
};


/**
 * LISTAR INSTITUCIONES
 */
export const getInstituciones = async (
    req: Request,
    res: Response
) => {

    try {

        const instituciones =
            await listarInstituciones();

        res.status(200).json(
            instituciones
        );

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al obtener las instituciones";

        res.status(500).json({
            message,
        });
    }
};


/**
 * ACTUALIZAR INSTITUCIÓN
 */
export const updateInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );

        /**
         * Validar ID.
         */
        if (!Number.isInteger(id) || id <= 0) {

            res.status(400).json({
                message: "El ID de la institución no es válido",
            });

            return;
        }

        /**
         * Evitar actualizar con un body vacío.
         */
        if (
            !req.body ||
            Object.keys(req.body).length === 0
        ) {

            res.status(400).json({
                message: "No se enviaron datos para actualizar",
            });

            return;
        }

        const institucion =
            await actualizarInstitucion(
                id,
                req.body
            );

        res.status(200).json({
            message: "Institución actualizada correctamente",
            institucion,
        });

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al actualizar la institución";

        /**
         * Institución inexistente.
         */
        if (
            message === "Institución no encontrada"
        ) {

            res.status(404).json({
                message,
            });

            return;
        }

        /**
         * Email duplicado.
         */
        if (
            message === "El email ya está registrado"
        ) {

            res.status(409).json({
                message,
            });

            return;
        }

        res.status(400).json({
            message,
        });
    }
};


/**
 * ELIMINAR INSTITUCIÓN
 */
export const deleteInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );

        /**
         * Validar ID.
         */
        if (!Number.isInteger(id) || id <= 0) {

            res.status(400).json({
                message: "El ID de la institución no es válido",
            });

            return;
        }

        const resultado =
            await eliminarInstitucion(id);

        res.status(200).json(
            resultado
        );

    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al eliminar la institución";

        /**
         * Institución inexistente.
         */
        if (
            message === "Institución no encontrada"
        ) {

            res.status(404).json({
                message,
            });

            return;
        }

        res.status(500).json({
            message,
        });
    }
};