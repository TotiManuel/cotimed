import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const verificarToken = (
    req:any,
    res:Response,
    next:NextFunction
)=>{


    try{


        const header =
            req.headers.authorization;



        if(!header){

            return res.status(401).json({

                message:"Token requerido"

            });

        }



        const token =
            header.split(" ")[1];



        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET!
            );



        req.user = decoded;



        next();



    }catch(error){


        return res.status(401).json({

            message:"Token inválido o expirado"

        });


    }

};