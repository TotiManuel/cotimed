import { Request, Response } from "express";

import {
    register,
    login, 
} from "../services/auth.service";

// =========================================================
// REGISTRO
// POST /api/auth/register
// =========================================================

export const registerUser = async ( req: Request, res: Response ) => {
    try {
        const {
            nombre, apellido, email, password, telefono,tipo_documento,numero_documento,pais,provincia,ciudad,rol
        } = req.body;


        // =====================================================
        // VALIDACIÓN BÁSICA
        // =====================================================

        if (
            !nombre ||
            !apellido || 
            !email ||
            !password || 
            !telefono ||
            !tipo_documento ||
            !numero_documento ||
            !pais ||
            !provincia ||
            !ciudad ||
            !rol
        ) {

            return res.status(400).json({
                message:
                    "Todos los campos son obligatorios",
            });
        }
        // =====================================================
        // REGISTRAR
        // =====================================================
        const user =
            await register(
                req.body
            );


        // =====================================================
        // RESPUESTA
        // =====================================================

        return res.status(201).json(
            user
        );


    } catch (error: unknown) {

        console.error(
            "Error registrando usuario:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al registrar usuario";


        return res.status(400).json({
            message,
        });
    }
};


// =========================================================
// LOGIN
// POST /api/auth/login
// =========================================================

export const loginUser = async (
    req: Request,
    res: Response
) => {

    try {

        const {
            email,
            password,
        } = req.body;


        // =====================================================
        // VALIDACIÓN
        // =====================================================

        if (
            !email ||
            !password
        ) {

            return res.status(400).json({
                message:
                    "El email y la contraseña son obligatorios",
            });
        }


        // =====================================================
        // LOGIN
        // =====================================================

        const result =
            await login(
                email,
                password
            );


        // =====================================================
        // RESPUESTA
        // =====================================================

        return res.status(200).json(
            result
        );


    } catch (error: unknown) {

        console.error(
            "Error iniciando sesión:",
            error
        );


        const message =
            error instanceof Error
                ? error.message
                : "Error al iniciar sesión";


        return res.status(401).json({
            message,
        });
    }
};