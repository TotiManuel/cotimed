import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";



export const registrarUsuario = async(
    req:Request,
    res:Response
)=>{

    try{


        const {
            nombre,
            apellido,
            email,
            telefono,
            password,
            rol,

            // datos empresa/institución
            nombreEmpresa,
            nombreInstitucion,
            cuit,
            direccion,
            ciudad,
            provincia

        } = req.body;




        if(
            !nombre ||
            !apellido ||
            !email ||
            !password ||
            !rol
        ){

            return res.status(400).json({

                message:"Faltan datos obligatorios"

            });

        }



        const usuarioExiste =
            await prisma.user.findUnique({

                where:{
                    email
                }

            });



        if(usuarioExiste){

            return res.status(400).json({

                message:"El email ya está registrado"

            });

        }





        const passwordHash =
            await bcrypt.hash(
                password,
                10
            );






        const usuario =
        await prisma.user.create({

            data:{

                nombre,

                apellido,

                email,

                telefono,

                password:
                passwordHash,

                rol


            }

        });








        // CREAR INSTITUCION

        if(
            rol === "INSTITUCION"
        ){


            await prisma.institucion.create({

                data:{

                    usuarioId:
                    usuario.id,


                    nombre:
                    nombreInstitucion
                    ||
                    nombre,


                    cuit,

                    direccion,

                    ciudad,

                    provincia

                }

            });


        }








        // CREAR PROVEEDOR

        if(
            rol === "PROVEEDOR"
        ){


            await prisma.proveedor.create({

                data:{

                    usuarioId:
                    usuario.id,


                    nombreEmpresa:
                    nombreEmpresa
                    ||
                    nombre,


                    cuit,

                    direccion,

                    ciudad,

                    provincia

                }

            });


        }






        res.status(201).json({

            message:
            "Usuario registrado correctamente",


            usuario:{

                id:usuario.id,

                nombre:usuario.nombre,

                email:usuario.email,

                rol:usuario.rol

            }

        });




    }catch(error){


        console.error(error);



        res.status(500).json({

            message:
            "Error registrando usuario"

        });


    }


};
export const login = async(
    req:Request,
    res:Response
)=>{


    try{


        const {
            email,
            password
        }=req.body;




        const usuario =
            await prisma.user.findUnique({

                where:{
                    email
                }

            });



        if(!usuario){

            return res.status(404).json({

                message:"Usuario no encontrado"

            });

        }




        const correcto =
            await bcrypt.compare(
                password,
                usuario.password
            );



        if(!correcto){

            return res.status(401).json({

                message:"Contraseña incorrecta"

            });

        }





        const token =
            jwt.sign(

                {

                    id:usuario.id,

                    rol:usuario.rol

                },

                process.env.JWT_SECRET!,

                {
                    expiresIn:"7d"
                }

            );



        res.json({

            token,

            usuario:{

                id:usuario.id,

                nombre:usuario.nombre,

                email:usuario.email,

                rol:usuario.rol

            }

        });



    }catch(error){

        console.error("ERROR LOGIN:", error);

        res.status(500).json({

            message:"Error iniciando sesión"

        });

    }

};