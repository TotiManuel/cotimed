import { Response } from "express";
import { prisma } from "../config/database";


export const obtenerSolicitudesInstitucion =
async(req:any,res:Response)=>{


    try{


        const usuarioId = req.user.id;


        const institucion =
        await prisma.institucion.findUnique({

            where:{
                usuarioId
            }

        });



        if(!institucion){

            return res.status(404).json({

                message:"Institución no encontrada"

            });

        }



        const solicitudes =
        await prisma.solicitud.findMany({

            where:{
                institucionId:institucion.id
            },

            orderBy:{
                fechaCreacion:"desc"
            }

        });



        res.json(solicitudes);



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Error obteniendo solicitudes"

        });


    }


};





export const crearSolicitud =
async(req:any,res:Response)=>{


    try{


        const usuarioId = req.user.id;



        const institucion =
        await prisma.institucion.findUnique({

            where:{
                usuarioId
            }

        });



        if(!institucion){

            return res.status(404).json({

                message:"Institución no encontrada"

            });

        }




        const solicitud =
        await prisma.solicitud.create({

            data:{

                institucionId:institucion.id,

                titulo:req.body.titulo,

                descripcion:req.body.descripcion,

                categoria:req.body.categoria,

                cantidad:Number(req.body.cantidad),

                marcaPreferida:req.body.marcaPreferida || null,

                modeloPreferido:req.body.modeloPreferido || null,

                presupuestoMax:req.body.presupuestoMax
                    ? Number(req.body.presupuestoMax)
                    : null,

                fechaNecesidad:req.body.fechaNecesidad
                    ? new Date(req.body.fechaNecesidad)
                    : null

            }

        });



        res.status(201).json(solicitud);



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Error creando solicitud"

        });


    }


};