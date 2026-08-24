// cotimed-api/src/controllers/categoria.controller.ts

import { Request, Response } from "express";

import * as service from "../services/categoria.service";

// =========================================================
// CONTROLLER
// =========================================================

// =========================================================
// LISTAR
// =========================================================

export const listarCategoriasController = async (

    req: Request,

    res: Response

) => {

    try {

        const resultado =
            await service.listarCategorias();

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

export const buscarCategoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.buscarCategoria(
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

export const crearCategoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const resultado =
            await service.crearCategoria(
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

export const actualizarCategoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.actualizarCategoria(
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

export const eliminarCategoriaController = async (

    req: Request,

    res: Response

) => {

    try {

        const id =
            Number(req.params.id);


        const resultado =
            await service.eliminarCategoria(
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
