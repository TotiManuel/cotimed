import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../config/database";





export const registerInstitucion = async (

    req: Request,

    res: Response

): Promise<any> => {


    try {


        const {

            email,

            password,

            nombreInstitucion

        } = req.body;




        if(

            !email ||

            !password ||

            !nombreInstitucion

        ){

            return res.status(400).json({

                message: "Faltan datos obligatorios"

            });

        }





        const existeInstitucion = await prisma.institucion.findUnique({

            where: {

                Email: email

            }

        });



        const existeProveedor = await prisma.proveedor.findUnique({

            where: {

                Email: email

            }

        });





        if(existeInstitucion || existeProveedor){

            return res.status(400).json({

                message: "El email ya está registrado"

            });

        }





        const passwordHash = await bcrypt.hash(

            password,

            10

        );





        const institucion = await prisma.institucion.create({

            data: {


                Email: email,


                Password: passwordHash,


                NombreInstitucion: nombreInstitucion


            }

        });





        return res.status(201).json({

            message: "Institución creada correctamente",

            institucion

        });





    } catch(error){


        return res.status(500).json({

            message: "Error al registrar institución",

            error

        });


    }


};









export const registerProveedor = async (

    req: Request,

    res: Response

): Promise<any> => {


    try {


        const {

            email,

            password,

            nombreEmpresa,

            razonSocial

        } = req.body;





        if(

            !email ||

            !password ||

            !nombreEmpresa

        ){

            return res.status(400).json({

                message: "Faltan datos obligatorios"

            });

        }





        const existeInstitucion = await prisma.institucion.findUnique({

            where: {

                Email: email

            }

        });



        const existeProveedor = await prisma.proveedor.findUnique({

            where: {

                Email: email

            }

        });





        if(existeInstitucion || existeProveedor){

            return res.status(400).json({

                message: "El email ya está registrado"

            });

        }





        const passwordHash = await bcrypt.hash(

            password,

            10

        );





        const proveedor = await prisma.proveedor.create({

            data: {


                Email: email,


                Password: passwordHash,


                NombreEmpresa: nombreEmpresa,


                RazonSocial: razonSocial


            }

        });





        return res.status(201).json({

            message: "Proveedor creado correctamente",

            proveedor

        });





    } catch(error){


        return res.status(500).json({

            message: "Error al registrar proveedor",

            error

        });


    }


};









export const login = async (

    req: Request,

    res: Response

): Promise<any> => {


    try {


        const {

            email,

            password

        } = req.body;





        if(

            !email ||

            !password

        ){

            return res.status(400).json({

                message: "Email y contraseña obligatorios"

            });

        }





        let usuario: any = null;

        let rol = "";





        const institucion = await prisma.institucion.findUnique({

            where: {

                Email: email

            }

        });





        if(institucion){

            usuario = institucion;

            rol = "INSTITUCION";

        }





        if(!usuario){


            const proveedor = await prisma.proveedor.findUnique({

                where: {

                    Email: email

                }

            });



            if(proveedor){

                usuario = proveedor;

                rol = "PROVEEDOR";

            }

        }





        if(!usuario){

            return res.status(401).json({

                message: "Usuario o contraseña incorrectos"

            });

        }





        const passwordCorrecta = await bcrypt.compare(

            password,

            usuario.Password

        );





        if(!passwordCorrecta){

            return res.status(401).json({

                message: "Usuario o contraseña incorrectos"

            });

        }





        const token = jwt.sign(

            {

                id: usuario.IDInstitucion || usuario.IDProveedor,

                rol

            },


            process.env.JWT_SECRET!,


            {

                expiresIn: "7d"

            }


        );





        return res.json({

            message: "Login correcto",

            token,

            rol,

            usuario: {


                id: usuario.IDInstitucion || usuario.IDProveedor,


                email: usuario.Email


            }


        });





    } catch(error){


        return res.status(500).json({

            message: "Error al iniciar sesión",

            error

        });


    }


};