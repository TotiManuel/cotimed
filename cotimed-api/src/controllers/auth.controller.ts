import { Request, Response } from "express";
import { register, login } from "../services/auth.service";



export const registerUser = async(
    req:Request,
    res:Response
)=>{


    try{


        const user = await register(
            req.body.name_user,
            req.body.email,
            req.body.password,
            req.body.rol,
            req.body.organizacion
        );


        res.status(201).json(user);


    }catch(error:any){


        res.status(400).json({
            message:error.message
        });


    }

};




export const loginUser = async(
    req:Request,
    res:Response
)=>{


    try{


        const result = await login(
            req.body.email,
            req.body.password
        );


        res.json(result);


    }catch(error:any){


        res.status(401).json({
            message:error.message
        });


    }


};