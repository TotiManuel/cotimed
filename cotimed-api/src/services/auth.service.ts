import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";

import {
    RolUsuario,
    TipoDocumento,
} from "@prisma/client"; 


const JWT_SECRET =
    process.env.JWT_SECRET || "cotimed_secret";


// =========================================================
// REGISTRAR USUARIO
// =========================================================

export const register = async (
data: {nombre: string, apellido: string, email: string, password: string, telefono: string,tipo_documento: TipoDocumento,numero_documento: string,pais: string,provincia: string,ciudad: string,rol: RolUsuario}) => {

    // =====================================================
    // VERIFICAR SI YA EXISTE
    // =====================================================

    const existingUser =
        await prisma.usuario.findUnique({
            where: {
                email: data.email,
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
            data.password,
            10
        );


    // =====================================================
    // CREAR USUARIO
    // =====================================================

    const user =
        await prisma.usuario.create({

            data: {

                nombre: data.nombre, 
                apellido: data.apellido, 
                email: data.email, 
                password: hashedPassword, 
                telefono: data.telefono,
                tipo_documento: data.tipo_documento,
                numero_documento: data.numero_documento,
                pais: data.pais,
                provincia: data.provincia,
                ciudad: data.ciudad,
                rol: data.rol
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