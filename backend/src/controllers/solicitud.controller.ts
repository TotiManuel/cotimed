import { Request, Response } from "express";
import { prisma } from "../config/database";



export const obtenerSolicitudes =
async(req:Request,res:Response)=>{


try{


const solicitudes =
await prisma.solicitud.findMany();



res.json(solicitudes);



}catch(error){

res.status(500).json({

message:"Error"

});

}


};






export const crearSolicitud =
async(req:Request,res:Response)=>{


try{


const solicitud =
await prisma.solicitud.create({

data:req.body

});



res.status(201).json(solicitud);



}catch(error){

res.status(500).json({

message:"Error creando solicitud"

});

}


};