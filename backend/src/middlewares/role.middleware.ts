import { Response, NextFunction } from "express";


export const permitirRoles = (
    ...roles:string[]
)=>{


    return(
        req:any,
        res:Response,
        next:NextFunction
    )=>{


        if(!req.user){

            return res.status(401).json({

                message:"No autenticado"

            });

        }



        if(
            !roles.includes(req.user.rol)
        ){

            return res.status(403).json({

                message:"No tienes permisos"

            });

        }



        next();


    };


};