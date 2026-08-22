import { Request, Response } from "express";
import { register, login } from "../services/auth.service";


// =========================================================
// REGISTRO
// =========================================================

export const registerUser = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await register(

            req.body.name_user,

            req.body.razon_social,

            req.body.direccion,

            req.body.email,

            req.body.password,

            req.body.rol,

            req.body.organizacion,

            req.body.estado_user,

            req.body.ciudad_user,

            req.body.provincia_user,

            req.body.pais_user

        );


        return res.status(201).json(user);


    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al registrar usuario";


        return res.status(400).json({
            message
        });

    }

};


// =========================================================
// LOGIN
// =========================================================

export const loginUser = async (
    req: Request,
    res: Response
) => {

    try {

        const result = await login(
            req.body.email,
            req.body.password
        );


        return res.json(result);


    } catch (error: unknown) {

        const message =
            error instanceof Error
                ? error.message
                : "Error al iniciar sesión";


        return res.status(401).json({
            message
        });

    }

};