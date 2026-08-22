import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";

import {
    RolUsuario,
    EstadoUsuario,
} from "@prisma/client";


const JWT_SECRET =
    process.env.JWT_SECRET || "cotimed_secret";


// =========================================================
// REGISTRAR USUARIO
// =========================================================

export const register = async (
nombre: string, apellido: string | undefined, email: string, password: string, rol: RolUsuario, telefono?: string, organizacion?: any, estado_user?: any, ciudad_user?: any, provincia_user?: any, pais_user?: any) => {

    // =====================================================
    // VERIFICAR SI YA EXISTE
    // =====================================================

    const existingUser =
        await prisma.usuario.findUnique({
            where: {
                email,
            },
        });


    if (existingUser) {

        throw new Error(
            "El usuario ya existe"
        );

    }


    // =====================================================
    // ENCRIPTAR CONTRASEÑA
    // =====================================================

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );


    // =====================================================
    // CREAR USUARIO
    // =====================================================

    const user =
        await prisma.usuario.create({

            data: {

                nombre,

                apellido,

                email,

                password:
                    hashedPassword,

                telefono,

                rol,

                estado:
                    rol === RolUsuario.ADMIN
                        ? EstadoUsuario.ACTIVO
                        : EstadoUsuario.PENDIENTE,

            },

        });


    // =====================================================
    // DEVOLVER USUARIO
    // =====================================================

    return user;

};


// =========================================================
// LOGIN
// =========================================================

export const login = async (
    email: string,
    password: string
) => {

    // =====================================================
    // BUSCAR USUARIO
    // =====================================================

    const user =
        await prisma.usuario.findUnique({

            where: {
                email,
            },

        });


    if (!user) {

        throw new Error(
            "Usuario no encontrado"
        );

    }


    // =====================================================
    // VERIFICAR ESTADO
    // =====================================================

    if (
        user.estado === EstadoUsuario.BLOQUEADO
    ) {

        throw new Error(
            "El usuario se encuentra bloqueado"
        );

    }


    if (
        user.estado === EstadoUsuario.INACTIVO
    ) {

        throw new Error(
            "El usuario se encuentra inactivo"
        );

    }


    // =====================================================
    // COMPARAR CONTRASEÑA
    // =====================================================

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


    // =====================================================
    // ACTUALIZAR ÚLTIMO LOGIN
    // =====================================================

    await prisma.usuario.update({

        where: {
            id: user.id,
        },

        data: {
            ultimo_login: new Date(),
        },

    });


    // =====================================================
    // GENERAR JWT
    // =====================================================

    const token =
        jwt.sign(

            {
                id: user.id,
                rol: user.rol,
            },

            JWT_SECRET,

            {
                expiresIn: "7d",
            }

        );


    // =====================================================
    // NO DEVOLVER PASSWORD
    // =====================================================

    const {
        password: _password,
        ...userWithoutPassword
    } = user;


    // =====================================================
    // RESPUESTA
    // =====================================================

    return {

        user:
            userWithoutPassword,

        token,

    };

};