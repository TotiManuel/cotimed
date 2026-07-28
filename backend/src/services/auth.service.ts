import bcrypt from "bcrypt";

import { UserRepository } from "../repositories/user.repository";

import { generarToken } from "../utils/jwt";


const repository = new UserRepository();


export const loginService = async (

    email: string,

    password: string

) => {

    const usuario = await repository.findByEmail(email);

    if (!usuario) {

        throw new Error("Usuario no encontrado");

    }

    const passwordCorrecto = await bcrypt.compare(

        password,

        usuario.password

    );

    if (!passwordCorrecto) {

        throw new Error("Contraseña incorrecta");

    }

    const token = generarToken({

        id: usuario.id,

        rol: usuario.rol

    });

    return {

        usuario: {

            id: usuario.id,

            nombre: usuario.nombre,

            apellido: usuario.apellido,

            email: usuario.email,

            rol: usuario.rol

        },

        token

    };

};