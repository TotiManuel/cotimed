import { Request, Response } from "express";

import {
    listarProveedores,
    buscarProveedor,
    buscarProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
} from "../services/proveedores.service";


/**
 * GET /api/proveedores
 *
 * Listar todos los proveedores
 */
export const listar = async (
    req: Request,
    res: Response
) => {

    try {

        const proveedores =
            await listarProveedores();

        return res.status(200).json(
            proveedores
        );

    } catch (error) {

        console.error(
            "Error listando proveedores:",
            error
        );

        return res.status(500).json({
            mensaje: "Error obteniendo los proveedores",
        });
    }
};


/**
 * GET /api/proveedores/:id
 *
 * Buscar proveedor por ID
 */
export const obtener = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );

        if (isNaN(id)) {

            return res.status(400).json({
                mensaje: "ID de proveedor inválido",
            });
        }

        const proveedor =
            await buscarProveedor(id);

        if (!proveedor) {

            return res.status(404).json({
                mensaje: "Proveedor no encontrado",
            });
        }

        return res.status(200).json(
            proveedor
        );

    } catch (error) {

        console.error(
            "Error buscando proveedor:",
            error
        );

        return res.status(500).json({
            mensaje: "Error buscando el proveedor",
        });
    }
};


/**
 * GET /api/proveedores/buscar?q=texto
 *
 * Buscar proveedores por:
 * nombre
 * email
 * organización
 */
export const buscar = async (
    req: Request,
    res: Response
) => {

    try {

        const texto = String(
            req.query.q || ""
        ).trim();

        if (!texto) {

            return res.status(400).json({
                mensaje: "Debe ingresar un texto para buscar",
            });
        }

        const proveedores =
            await buscarProveedores(texto);

        return res.status(200).json(
            proveedores
        );

    } catch (error) {

        console.error(
            "Error buscando proveedores:",
            error
        );

        return res.status(500).json({
            mensaje: "Error realizando la búsqueda",
        });
    }
};


/**
 * POST /api/proveedores
 *
 * Crear proveedor
 */
export const crear = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            name_user,
            email,
            password,
            organizacion,
        } = req.body;


        /*
         * Validaciones
         */

        if (!name_user) {

            return res.status(400).json({
                mensaje: "El nombre del usuario es obligatorio",
            });
        }


        if (!email) {

            return res.status(400).json({
                mensaje: "El email es obligatorio",
            });
        }


        if (!password) {

            return res.status(400).json({
                mensaje: "La contraseña es obligatoria",
            });
        }


        if (!organizacion) {

            return res.status(400).json({
                mensaje: "La organización es obligatoria",
            });
        }


        const proveedor =
            await crearProveedor({

                name_user,
                email,
                password,
                organizacion,

            });


        return res.status(201).json(
            proveedor
        );

    } catch (error: any) {

        console.error(
            "Error creando proveedor:",
            error
        );


        /*
         * Email duplicado
         */
        if (
            error?.code === "P2002"
        ) {

            return res.status(409).json({
                mensaje: "El email ya está registrado",
            });
        }


        return res.status(500).json({
            mensaje: "Error creando el proveedor",
        });
    }
};


/**
 * PUT /api/proveedores/:id
 *
 * Actualizar proveedor
 */
export const actualizar = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );


        if (isNaN(id)) {

            return res.status(400).json({
                mensaje: "ID de proveedor inválido",
            });
        }


        /*
         * Verificar que exista
         * y que sea realmente proveedor.
         */

        const proveedor =
            await buscarProveedor(id);


        if (!proveedor) {

            return res.status(404).json({
                mensaje: "Proveedor no encontrado",
            });
        }


        const {
            name_user,
            email,
            password,
            organizacion,
        } = req.body;


        const datosActualizacion: {
            name_user?: string;
            email?: string;
            password?: string;
            organizacion?: string;
        } = {};


        if (name_user !== undefined) {

            datosActualizacion.name_user =
                name_user;
        }


        if (email !== undefined) {

            datosActualizacion.email =
                email;
        }


        if (password !== undefined) {

            datosActualizacion.password =
                password;
        }


        if (organizacion !== undefined) {

            datosActualizacion.organizacion =
                organizacion;
        }


        const resultado =
            await actualizarProveedor(
                id,
                datosActualizacion
            );


        if (resultado.count === 0) {

            return res.status(404).json({
                mensaje: "Proveedor no encontrado",
            });
        }


        const proveedorActualizado =
            await buscarProveedor(id);


        return res.status(200).json(
            proveedorActualizado
        );

    } catch (error: any) {

        console.error(
            "Error actualizando proveedor:",
            error
        );


        /*
         * Email duplicado
         */
        if (
            error?.code === "P2002"
        ) {

            return res.status(409).json({
                mensaje: "El email ya está registrado",
            });
        }


        return res.status(500).json({
            mensaje: "Error actualizando el proveedor",
        });
    }
};


/**
 * DELETE /api/proveedores/:id
 *
 * Eliminar proveedor
 */
export const eliminar = async (
    req: Request,
    res: Response
) => {

    try {

        const id = Number(
            req.params.id
        );


        if (isNaN(id)) {

            return res.status(400).json({
                mensaje: "ID de proveedor inválido",
            });
        }


        /*
         * Verificar que exista
         */
        const proveedor =
            await buscarProveedor(id);


        if (!proveedor) {

            return res.status(404).json({
                mensaje: "Proveedor no encontrado",
            });
        }


        /*
         * Eliminar
         */
        const resultado =
            await eliminarProveedor(id);


        if (resultado.count === 0) {

            return res.status(404).json({
                mensaje: "Proveedor no encontrado",
            });
        }


        return res.status(200).json({
            mensaje: "Proveedor eliminado correctamente",
        });

    } catch (error: any) {

        console.error(
            "Error eliminando proveedor:",
            error
        );


        /*
         * Error por relaciones existentes.
         *
         * Por ejemplo, si el proveedor tiene
         * cotizaciones asociadas.
         */
        if (
            error?.code === "P2003"
        ) {

            return res.status(409).json({
                mensaje:
                    "No se puede eliminar el proveedor porque tiene cotizaciones asociadas",
            });
        }


        return res.status(500).json({
            mensaje: "Error eliminando el proveedor",
        });
    }
};