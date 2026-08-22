import { Request, Response } from "express";
import prisma from "../prisma/prisma";


// =========================================================
// OBTENER USUARIOS
// =========================================================

export const getUsers = async (req: Request, res: Response) => {

    try {

        const users = await prisma.user.findMany({
            orderBy: {
                id: "desc"
            }
        });

        res.status(200).json(users);

    } catch (error) {

        console.error("Error al obtener usuarios:", error);

        res.status(500).json({
            message: "Error al obtener usuarios"
        });

    }

};


// =========================================================
// CREAR USUARIO
// =========================================================

export const createUser = async (req: Request, res: Response) => {

    try {

        const {
            name_user,
            razon_social,
            direccion,
            email,
            password,
            rol,
            organizacion,
            estado_user,
            ciudad_user,
            provincia_user,
            pais_user
        } = req.body;


        // -----------------------------------------------------
        // VALIDACIÓN
        // -----------------------------------------------------

        if (
            !name_user ||
            !email ||
            !password ||
            !rol ||
            !organizacion ||
            !razon_social ||
            !direccion ||
            !estado_user ||
            !ciudad_user ||
            !provincia_user ||
            !pais_user
        ) {

            return res.status(400).json({
                message: "Todos los campos son obligatorios"
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

        if (!rolesPermitidos.includes(rol)) {

            return res.status(400).json({
                message: "Rol inválido"
            });

        }


        // -----------------------------------------------------
        // COMPROBAR EMAIL
        // -----------------------------------------------------

        const usuarioExistente = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (usuarioExistente) {

            return res.status(409).json({
                message: "El email ya está registrado"
            });

        }


        // -----------------------------------------------------
        // CREAR USUARIO
        // -----------------------------------------------------

        const user = await prisma.user.create({

            data: {
                name_user,
                razon_social,
                direccion,
                email,
                password,
                rol,
                organizacion,
                estado_user,
                ciudad_user,
                provincia_user,
                pais_user
            }

        });


        // -----------------------------------------------------
        // RESPUESTA
        // -----------------------------------------------------

        res.status(201).json(user);


    } catch (error) {

        console.error("Error al crear usuario:", error);

        res.status(500).json({
            message: "Error al crear usuario"
        });

    }

};