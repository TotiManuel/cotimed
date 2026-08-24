// cotimed-api/src/controllers/auditoria.controller.ts

import { Request, Response } from "express";

import * as service from "../services/auditoria.service";

// =========================================================
// CONTROLLER
// =========================================================

// =========================================================
// LISTAR
// =========================================================

export const listarAuditoriasController = async (

    req: Request,

    res: Response

) => {

    try {

        const resultado =
            await service.listarAuditorias();

        return res.status(200).json(
            resultado
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            message:
                "Error al obtener los registros",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",
        });
    }
};


// =========================================================
// BUSCAR
// =========================================================

export const buscarAuditoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.buscarAuditoria(
                id
            );


        return res.status(200).json(
            resultado
        );

    } catch (error) {

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {

            return res.status(404).json({

                message:
                    error.message,

            });
        }


        return res.status(500).json({

            message:
                "Error al buscar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        });
    }
};


// =========================================================
// CREAR
// =========================================================

export const crearAuditoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const resultado =
            await service.crearAuditoria(
                req.body
            );


        return res.status(201).json(
            resultado
        );


    } catch (error) {

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no existe"
            )
        ) {

            return res.status(400).json({

                message:
                    error.message,

            });
        }


        return res.status(500).json({

            message:
                "Error al crear el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        });
    }
};


// =========================================================
// ACTUALIZAR
// =========================================================

export const actualizarAuditoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.actualizarAuditoria(
                id,

                req.body
            );


        return res.status(200).json(
            resultado
        );


    } catch (error) {

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {

            return res.status(404).json({

                message:
                    error.message,

            });
        }


        return res.status(500).json({

            message:
                "Error al actualizar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        });
    }
};


// =========================================================
// ELIMINAR
// =========================================================

export const eliminarAuditoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.eliminarAuditoria(
                id
            );


        return res.status(200).json({

            message:
                "Registro eliminado correctamente",

            data:
                resultado,

        });


    } catch (error) {

        console.error(error);


        if (
            error instanceof Error &&
            error.message.includes(
                "no encontrado"
            )
        ) {

            return res.status(404).json({

                message:
                    error.message,

            });
        }


        return res.status(500).json({

            message:
                "Error al eliminar el registro",

            error:
                error instanceof Error
                    ? error.message
                    : "Error desconocido",

        });
    }
};
