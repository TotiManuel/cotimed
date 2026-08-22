import { Request, Response } from "express";

import {
    obtenerInstituciones,
    obtenerInstitucionPorId,
    crearInstitucion,
    actualizarInstitucion,
    cambiarEstadoInstitucion,
    eliminarInstitucion,
    obtenerInstitucionConSolicitudes,
} from "../services/instituciones.service";


// =========================================================
// GET /api/instituciones
// =========================================================

export const getInstituciones = async (
    req: Request,
    res: Response
) => {

    try {

        const instituciones =
            await obtenerInstituciones();

        return res.status(200).json(
            instituciones
        );

    } catch (error: unknown) {

        console.error(
            "Error al obtener instituciones:",
            error
        );

        return res.status(500).json({
            message:
                "Error al obtener las instituciones",
        });
    }
};


// =========================================================
// GET /api/instituciones/:id
// =========================================================

export const getInstitucionById = async (
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
                    "El ID de la institución no es válido",
            });
        }


        const institucion =
            await obtenerInstitucionPorId(id);


        if (!institucion) {

            return res.status(404).json({
                message:
                    "Institución no encontrada",
            });
        }


        return res.status(200).json(
            institucion
        );

    } catch (error: unknown) {

        console.error(
            "Error al obtener institución:",
            error
        );

        return res.status(500).json({
            message:
                "Error al obtener la institución",
        });
    }
};


// =========================================================
// POST /api/instituciones
// =========================================================

export const postInstitucion = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            name_user,
            razon_social,
            email,
            password,
        } = req.body;


        if (
            !name_user ||
            !razon_social ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                message:
                    "Todos los campos son obligatorios",
            });
        }


        const institucion =
            await crearInstitucion({

                nombre: String(name_user),
                razon_social: String(razon_social),
                email: String(email),
                password: String(password),

            });


        return res.status(201).json({

            message:
                "Institución creada correctamente",

            institucion,

        });

    } catch (error: unknown) {

        console.error(
            "Error al crear institución:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al crear la institución";


        if (
            message ===
            "Ya existe un usuario registrado con ese email"
        ) {

            return res.status(409).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


// =========================================================
// PUT /api/instituciones/:id
// =========================================================

export const putInstitucion = async (
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
                    "El ID de la institución no es válido",
            });
        }


        const institucion =
            await actualizarInstitucion(
                id,
                req.body
            );


        return res.status(200).json({

            message:
                "Institución actualizada correctamente",

            institucion,

        });

    } catch (error: unknown) {

        console.error(
            "Error al actualizar institución:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al actualizar la institución";


        if (
            message ===
            "Institución no encontrada"
        ) {

            return res.status(404).json({
                message,
            });
        }


        if (
            message ===
            "El email ya está siendo utilizado"
        ) {

            return res.status(409).json({
                message,
            });
        }


        return res.status(500).json({
            message,
        });
    }
};


// =========================================================
// PATCH /api/instituciones/:id/estado
// =========================================================

export const patchEstadoInstitucion = async (
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
                    "El ID de la institución no es válido",
            });
        }


        const { estado } =
            req.body;


        if (!estado) {

            return res.status(400).json({
                message:
                    "El estado es obligatorio",
            });
        }


        const institucion =
            await cambiarEstadoInstitucion(
                id,
                estado
            );


        return res.status(200).json({

            message:
                "Estado actualizado correctamente",

            institucion,

        });

    } catch (error: unknown) {

        console.error(
            "Error al cambiar estado de institución:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al cambiar el estado";


        if (
            message ===
            "Institución no encontrada"
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


// =========================================================
// DELETE /api/instituciones/:id
// =========================================================

export const deleteInstitucion = async (
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
                    "El ID de la institución no es válido",
            });
        }


        await eliminarInstitucion(id);


        return res.status(200).json({

            message:
                "Institución eliminada correctamente",

        });

    } catch (error: unknown) {

        console.error(
            "Error al eliminar institución:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al eliminar la institución";


        if (
            message ===
            "Institución no encontrada"
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


// =========================================================
// GET /api/instituciones/:id/solicitudes
// =========================================================

export const getInstitucionConSolicitudes = async (
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
                    "El ID de la institución no es válido",
            });
        }


        const institucion =
            await obtenerInstitucionConSolicitudes(
                id
            );


        if (!institucion) {

            return res.status(404).json({
                message:
                    "Institución no encontrada",
            });
        }


        return res.status(200).json(
            institucion
        );

    } catch (error: unknown) {

        console.error(
            "Error al obtener institución con solicitudes:",
            error
        );


        return res.status(500).json({

            message:
                "Error al obtener la institución y sus solicitudes",

        });
    }
};