import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";


const JWT_SECRET = process.env.JWT_SECRET || "cotimed_secret";


export const register = async (
    name_user: string,
    email: string,
    password: string,
    rol: "admin" | "institucion" | "proveedor",
    organizacion: string
) => {


    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });


    if(existingUser){
        throw new Error("El usuario ya existe");
    }


    const hashedPassword = await bcrypt.hash(password, 10);



    const user = await prisma.user.create({

        data:{
            name_user,
            email,
            password: hashedPassword,
            rol,
            organizacion
        }

    });


    return user;

};



export const login = async (
    email:string,
    password:string
) => {

    console.log("EMAIL RECIBIDO:", email);
    console.log("PASSWORD RECIBIDA:", password);

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });

    console.log("USUARIO ENCONTRADO:", user?.email);

    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    console.log("PASSWORD CORRECTA:", passwordCorrect);

    if(!passwordCorrect){
        throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign(
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