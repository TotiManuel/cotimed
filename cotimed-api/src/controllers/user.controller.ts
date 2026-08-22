import { Request, Response } from "express";
import prisma from "../prisma/prisma";


// =========================================================
// OBTENER USUARIOS
// =========================================================

export const getUsers = async (
    req: Request,
    res: Response
) => {

    try {

        const users =
            await prisma.usuario.findMany({

                orderBy: {
                    id: "desc"
                }

            });


        return res.status(200).json(
            users
        );


    } catch (error: unknown) {

        console.error(
            "Error al obtener usuarios:",
            error
        );


        return res.status(500).json({

            message:
                "Error al obtener usuarios"

        });

    }

};


// =========================================================
// CREAR USUARIO
// =========================================================

export const createUser = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            nombre,
            razon_social,
            direccion,
            email,
            password,
            rol,
            organizacion,
            estado,
            ciudad,
            provincia,
            pais
        } = req.body;


        // -----------------------------------------------------
        // VALIDACIÓN
        // -----------------------------------------------------

        if (
            !nombre ||
            !razon_social ||
            !direccion ||
            !email ||
            !password ||
            !rol ||
            !organizacion ||
            !estado ||
            !ciudad ||
            !provincia ||
            !pais
        ) {

            return res.status(400).json({

                message:
                    "Todos los campos son obligatorios"

            });

        }


        // -----------------------------------------------------
        // VALIDAR ROL
        // -----------------------------------------------------

        const rolesPermitidos = [
            "admin",
            "institucion",
            "proveedor"
        ];


        if (
            !rolesPermitidos.includes(rol)
        ) {

            return res.status(400).json({

                message:
                    "Rol inválido"

            });

        }


        // -----------------------------------------------------
        // COMPROBAR EMAIL
        // -----------------------------------------------------

        const usuarioExistente =
            await prisma.usuario.findUnique({

                where: {
                    email
                }

            });


        if (usuarioExistente) {

            return res.status(409).json({

                message:
                    "El email ya está registrado"

            });

        }


        // -----------------------------------------------------
        // CREAR USUARIO
        // -----------------------------------------------------

        const user =
            await prisma.usuario.create({

                data: {

                    nombre,

                    razon_social,

                    direccion,

                    email,

                    password,

                    rol,

                    organizacion,

                    estado,

                    ciudad,

                    provincia,

                    pais

                }

            });


        // -----------------------------------------------------
        // RESPUESTA
        // -----------------------------------------------------

        return res.status(201).json(
            user
        );


    } catch (error: unknown) {

        console.error(
            "Error al crear usuario:",
            error
        );


        return res.status(500).json({

            message:
                "Error al crear usuario"

        });

    }

};