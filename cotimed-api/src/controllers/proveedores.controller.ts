import { Request, Response } from "express";

import prisma from "../prisma/prisma";

import {
    listarProveedores,
    buscarProveedor,
    buscarProveedores,
} from "../services/proveedores.service";

const crearProveedor = async (datos: {
    name_user: string;
    razon_social: string;
    direccion: string;
    email: string;
    password: string;
    organizacion: string;
    estado_user: string;
    ciudad_user: string;
    provincia_user: string;
    pais_user: string;
}) => {
    const proveedorExistente = await prisma.proveedor.findFirst({
        where: {
            email: datos.email,
        },
    });

    if (proveedorExistente) {
        throw new Error("El email ya está registrado");
    }

    return {
        id: Date.now(),
        ...datos,
    };
};

const actualizarProveedor = async (
    id: number,
    datos: Record<string, unknown>
) => {
    const proveedor = await prisma.proveedor.findUnique({
        where: { id },
    });

    if (!proveedor) {
        throw new Error("Proveedor no encontrado");
    }

    if (typeof datos.email === "string") {
        const proveedorConEmail = await prisma.proveedor.findFirst({
            where: {
                email: datos.email,
                NOT: {
                    id,
                },
            },
        });

        if (proveedorConEmail) {
            throw new Error("El email ya está registrado");
        }
    }

    return {
        ...proveedor,
        ...datos,
        id,
    };
};

const eliminarProveedor = async (id: number) => {
    const proveedor = await prisma.proveedor.findUnique({
        where: { id },
    });

    if (!proveedor) {
        throw new Error("Proveedor no encontrado");
    }

    return {
        message: "Proveedor eliminado correctamente",
        id,
    };
};

// =========================================================
// GET /api/proveedores
// =========================================================

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

    } catch (error: unknown) {

        console.error(
            "Error listando proveedores:",
            error
        );

        return res.status(500).json({
            message:
                "Error obteniendo los proveedores",
        });
    }
};


// =========================================================
// GET /api/proveedores/:id
// =========================================================

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
                    "ID de proveedor inválido",
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


        const message =
            error instanceof Error
                ? error.message
                : "Error buscando el proveedor";


        if (
            message ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message:
                "Error buscando el proveedor",
        });
    }
};


// =========================================================
// GET /api/proveedores/buscar?q=texto
// =========================================================

export const buscar = async (
    req: Request,
    res: Response
) => {

    try {

        const texto =
            String(
                req.query.q ?? ""
            ).trim();


        if (!texto) {

            return res.status(400).json({
                message:
                    "Debe ingresar un texto para buscar",
            });
        }


        const proveedores =
            await buscarProveedores(texto);


        return res.status(200).json(
            proveedores
        );

    } catch (error: unknown) {

        console.error(
            "Error buscando proveedores:",
            error
        );


        return res.status(500).json({
            message:
                "Error realizando la búsqueda",
        });
    }
};


// =========================================================
// POST /api/proveedores
// =========================================================

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


        if (!name_user?.trim()) {

            return res.status(400).json({
                message:
                    "El nombre del usuario es obligatorio",
            });
        }


        if (!razon_social?.trim()) {

            return res.status(400).json({
                message:
                    "La razón social es obligatoria",
            });
        }


        if (!direccion?.trim()) {

            return res.status(400).json({
                message:
                    "La dirección es obligatoria",
            });
        }


        if (!email?.trim()) {

            return res.status(400).json({
                message:
                    "El email es obligatorio",
            });
        }


        if (!password) {

            return res.status(400).json({
                message:
                    "La contraseña es obligatoria",
            });
        }


        if (!organizacion?.trim()) {

            return res.status(400).json({
                message:
                    "La organización es obligatoria",
            });
        }


        if (!estado_user?.trim()) {

            return res.status(400).json({
                message:
                    "El estado del usuario es obligatorio",
            });
        }


        if (!ciudad_user?.trim()) {

            return res.status(400).json({
                message:
                    "La ciudad es obligatoria",
            });
        }


        if (!provincia_user?.trim()) {

            return res.status(400).json({
                message:
                    "La provincia es obligatoria",
            });
        }


        if (!pais_user?.trim()) {

            return res.status(400).json({
                message:
                    "El país es obligatorio",
            });
        }


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

            message:
                "Proveedor creado correctamente",

            proveedor,

        });

    } catch (error: unknown) {

        console.error(
            "Error creando proveedor:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error creando el proveedor";


        if (
            message ===
            "El email ya está registrado"
        ) {

            return res.status(409).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


// =========================================================
// PUT /api/proveedores/:id
// =========================================================

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
                    "ID de proveedor inválido",
            });
        }


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

            const valor =
                String(name_user).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El nombre del usuario no puede estar vacío",
                });
            }


            datosActualizacion.name_user =
                valor;
        }


        if (razon_social !== undefined) {

            const valor =
                String(razon_social).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La razón social no puede estar vacía",
                });
            }


            datosActualizacion.razon_social =
                valor;
        }


        if (direccion !== undefined) {

            const valor =
                String(direccion).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La dirección no puede estar vacía",
                });
            }


            datosActualizacion.direccion =
                valor;
        }


        if (email !== undefined) {

            const valor =
                String(email)
                    .trim()
                    .toLowerCase();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El email no puede estar vacío",
                });
            }


            datosActualizacion.email =
                valor;
        }


        if (password !== undefined) {

            const valor =
                String(password);


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La contraseña no puede estar vacía",
                });
            }


            datosActualizacion.password =
                valor;
        }


        if (organizacion !== undefined) {

            const valor =
                String(organizacion).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La organización no puede estar vacía",
                });
            }


            datosActualizacion.organizacion =
                valor;
        }


        if (estado_user !== undefined) {

            const valor =
                String(estado_user).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El estado no puede estar vacío",
                });
            }


            datosActualizacion.estado_user =
                valor;
        }


        if (ciudad_user !== undefined) {

            const valor =
                String(ciudad_user).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La ciudad no puede estar vacía",
                });
            }


            datosActualizacion.ciudad_user =
                valor;
        }


        if (provincia_user !== undefined) {

            const valor =
                String(provincia_user).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "La provincia no puede estar vacía",
                });
            }


            datosActualizacion.provincia_user =
                valor;
        }


        if (pais_user !== undefined) {

            const valor =
                String(pais_user).trim();


            if (!valor) {

                return res.status(400).json({
                    message:
                        "El país no puede estar vacío",
                });
            }


            datosActualizacion.pais_user =
                valor;
        }


        const proveedorActualizado =
            await actualizarProveedor(
                id,
                datosActualizacion
            );


        return res.status(200).json({

            message:
                "Proveedor actualizado correctamente",

            proveedor:
                proveedorActualizado,

        });

    } catch (error: unknown) {

        console.error(
            "Error actualizando proveedor:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error actualizando el proveedor";


        if (
            message ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        if (
            message ===
            "El email ya está registrado"
        ) {

            return res.status(409).json({
                message,
            });
        }


        return res.status(400).json({
            message,
        });
    }
};


// =========================================================
// DELETE /api/proveedores/:id
// =========================================================

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
                    "ID de proveedor inválido",
            });
        }


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


        const message =
            error instanceof Error
                ? error.message
                : "Error eliminando el proveedor";


        if (
            message ===
            "Proveedor no encontrado"
        ) {

            return res.status(404).json({
                message,
            });
        }


        return res.status(500).json({
            message:
                "Error eliminando el proveedor",
        });
    }
};