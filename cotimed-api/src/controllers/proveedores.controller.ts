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

        if (!Number.isInteger(id) || id <= 0) {

            return res.status(400).json({
                mensaje: "ID de proveedor inválido",
            });
        }

        const proveedor =
            await buscarProveedor(id);

        return res.status(200).json(
            proveedor
        );

    } catch (error: unknown) {

        console.error(
            "Error buscando proveedor:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error buscando el proveedor";

        if (
            mensaje === "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }

        return res.status(500).json({
            mensaje: "Error buscando el proveedor",
        });
    }
};


/**
 * GET /api/proveedores/buscar?q=texto
 *
 * Buscar proveedores por:
 * - nombre
 * - razón social
 * - email
 * - organización
 * - dirección
 * - ciudad
 * - provincia
 * - país
 */
export const buscar = async (
    req: Request,
    res: Response
) => {

    try {

        const texto = String(
            req.query.q ?? ""
        ).trim();

        if (!texto) {

            return res.status(400).json({
                mensaje:
                    "Debe ingresar un texto para buscar",
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
            mensaje:
                "Error realizando la búsqueda",
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
            razon_social,
            direccion,
            email,
            password,
            organizacion,
            estado_user,
            ciudad_user,
            provincia_user,
            pais_user,
        } = req.body;


        /**
         * Validaciones
         */

        if (!name_user?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El nombre del usuario es obligatorio",
            });
        }


        if (!razon_social?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La razón social es obligatoria",
            });
        }


        if (!direccion?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La dirección es obligatoria",
            });
        }


        if (!email?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El email es obligatorio",
            });
        }


        if (!password) {

            return res.status(400).json({
                mensaje:
                    "La contraseña es obligatoria",
            });
        }


        if (!organizacion?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La organización es obligatoria",
            });
        }


        if (!estado_user?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El estado del usuario es obligatorio",
            });
        }


        if (!ciudad_user?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La ciudad es obligatoria",
            });
        }


        if (!provincia_user?.trim()) {

            return res.status(400).json({
                mensaje:
                    "La provincia es obligatoria",
            });
        }


        if (!pais_user?.trim()) {

            return res.status(400).json({
                mensaje:
                    "El país es obligatorio",
            });
        }


        /**
         * Crear proveedor.
         *
         * El service se encarga de:
         * - verificar email
         * - hashear password
         * - asignar Role.proveedor
         */
        const proveedor =
            await crearProveedor({

                name_user:
                    name_user.trim(),

                razon_social:
                    razon_social.trim(),

                direccion:
                    direccion.trim(),

                email:
                    email.trim().toLowerCase(),

                password,

                organizacion:
                    organizacion.trim(),

                estado_user:
                    estado_user.trim(),

                ciudad_user:
                    ciudad_user.trim(),

                provincia_user:
                    provincia_user.trim(),

                pais_user:
                    pais_user.trim(),
            });


        return res.status(201).json({
            mensaje:
                "Proveedor creado correctamente",

            proveedor,
        });

    } catch (error: unknown) {

        console.error(
            "Error creando proveedor:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error creando el proveedor";


        /**
         * Email duplicado.
         */
        if (
            mensaje === "El email ya está registrado"
        ) {

            return res.status(409).json({
                mensaje,
            });
        }


        return res.status(400).json({
            mensaje,
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


        if (!Number.isInteger(id) || id <= 0) {

            return res.status(400).json({
                mensaje:
                    "ID de proveedor inválido",
            });
        }


        /**
         * Evitar actualización vacía.
         */
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
            name_user,
            razon_social,
            direccion,
            email,
            password,
            organizacion,
            estado_user,
            ciudad_user,
            provincia_user,
            pais_user,
        } = req.body;


        /**
         * Construir únicamente los campos
         * que fueron enviados.
         */
        const datosActualizacion: {

            name_user?: string;

            razon_social?: string;

            direccion?: string;

            email?: string;

            password?: string;

            organizacion?: string;

            estado_user?: string;

            ciudad_user?: string;

            provincia_user?: string;

            pais_user?: string;

        } = {};


        if (name_user !== undefined) {

            if (!String(name_user).trim()) {

                return res.status(400).json({
                    mensaje:
                        "El nombre del usuario no puede estar vacío",
                });
            }

            datosActualizacion.name_user =
                String(name_user).trim();
        }


        if (razon_social !== undefined) {

            if (!String(razon_social).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La razón social no puede estar vacía",
                });
            }

            datosActualizacion.razon_social =
                String(razon_social).trim();
        }


        if (direccion !== undefined) {

            if (!String(direccion).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La dirección no puede estar vacía",
                });
            }

            datosActualizacion.direccion =
                String(direccion).trim();
        }


        if (email !== undefined) {

            if (!String(email).trim()) {

                return res.status(400).json({
                    mensaje:
                        "El email no puede estar vacío",
                });
            }

            datosActualizacion.email =
                String(email)
                    .trim()
                    .toLowerCase();
        }


        if (password !== undefined) {

            if (!String(password)) {

                return res.status(400).json({
                    mensaje:
                        "La contraseña no puede estar vacía",
                });
            }

            datosActualizacion.password =
                String(password);
        }


        if (organizacion !== undefined) {

            if (!String(organizacion).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La organización no puede estar vacía",
                });
            }

            datosActualizacion.organizacion =
                String(organizacion).trim();
        }


        if (estado_user !== undefined) {

            if (!String(estado_user).trim()) {

                return res.status(400).json({
                    mensaje:
                        "El estado no puede estar vacío",
                });
            }

            datosActualizacion.estado_user =
                String(estado_user).trim();
        }


        if (ciudad_user !== undefined) {

            if (!String(ciudad_user).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La ciudad no puede estar vacía",
                });
            }

            datosActualizacion.ciudad_user =
                String(ciudad_user).trim();
        }


        if (provincia_user !== undefined) {

            if (!String(provincia_user).trim()) {

                return res.status(400).json({
                    mensaje:
                        "La provincia no puede estar vacía",
                });
            }

            datosActualizacion.provincia_user =
                String(provincia_user).trim();
        }


        if (pais_user !== undefined) {

            if (!String(pais_user).trim()) {

                return res.status(400).json({
                    mensaje:
                        "El país no puede estar vacío",
                });
            }

            datosActualizacion.pais_user =
                String(pais_user).trim();
        }


        /**
         * Actualizar.
         *
         * El service se encarga de:
         * - comprobar que exista
         * - comprobar email
         * - hashear password
         */
        const proveedorActualizado =
            await actualizarProveedor(
                id,
                datosActualizacion
            );


        return res.status(200).json({
            mensaje:
                "Proveedor actualizado correctamente",

            proveedor:
                proveedorActualizado,
        });

    } catch (error: unknown) {

        console.error(
            "Error actualizando proveedor:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error actualizando el proveedor";


        /**
         * Proveedor inexistente.
         */
        if (
            mensaje === "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        /**
         * Email duplicado.
         */
        if (
            mensaje === "El email ya está registrado"
        ) {

            return res.status(409).json({
                mensaje,
            });
        }


        return res.status(400).json({
            mensaje,
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


        if (!Number.isInteger(id) || id <= 0) {

            return res.status(400).json({
                mensaje:
                    "ID de proveedor inválido",
            });
        }


        /**
         * El service se encarga de:
         * - verificar que exista
         * - eliminar cotizaciones
         * - eliminar IncluyeCotizacion
         * - eliminar proveedor
         */
        const resultado =
            await eliminarProveedor(id);


        return res.status(200).json(
            resultado
        );

    } catch (error: unknown) {

        console.error(
            "Error eliminando proveedor:",
            error
        );

        const mensaje =
            error instanceof Error
                ? error.message
                : "Error eliminando el proveedor";


        /**
         * Proveedor inexistente.
         */
        if (
            mensaje === "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                mensaje,
            });
        }


        return res.status(500).json({
            mensaje:
                "Error eliminando el proveedor",
        });
    }
};