import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";


const JWT_SECRET =
    process.env.JWT_SECRET || "cotimed_secret";


// =========================================================
// REGISTRAR USUARIO
// =========================================================

export const register = async (
    name_user: string,
    razon_social: string,
    direccion: string,
    email: string,
    password: string,
    rol: "admin" | "institucion" | "proveedor",
    organizacion: string,
    estado_user: string,
    ciudad_user: string,
    provincia_user: string,
    pais_user: string
) => {

    const existingUser =
        await prisma.user.findUnique({
            where: {
                email
            }
        });


    if (existingUser) {

        throw new Error(
            "El usuario ya existe"
        );

    }


    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );


    const user =
        await prisma.user.create({

            data: {

                name_user,

                razon_social,

                direccion,

                email,

                password:
                    hashedPassword,

                rol,

                organizacion,

                estado_user,

                ciudad_user,

                provincia_user,

                pais_user

            }

        });


    return user;

};


// =========================================================
// LOGIN
// =========================================================

export const login = async (
    email: string,
    password: string
) => {

    const user =
        await prisma.user.findUnique({

            where: {
                email
            }

        });


    if (!user) {

        throw new Error(
            "Usuario no encontrado"
        );

    }


    const passwordCorrect =
        await bcrypt.compare(
            password,
            user.password
        );


    if (!passwordCorrect) {

        throw new Error(
            "Contraseña incorrecta"
        );

    }


    const token =
        jwt.sign(

            {
                id: user.id,
                rol: user.rol
            },

            JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


    return {

        user,

        token

    };

};