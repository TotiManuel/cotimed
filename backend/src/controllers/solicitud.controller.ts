import { Response } from "express";
import { prisma } from "../config/database";




// Obtener solicitudes de la institución logueada

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

                institucionId: institucion.id

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








// Crear solicitud

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


                cantidad:Number(
                    req.body.cantidad
                ),


                marcaPreferida:
                    req.body.marcaPreferida || null,


                modeloPreferido:
                    req.body.modeloPreferido || null,



                presupuestoMax:
                    req.body.presupuestoMax
                    ? Number(req.body.presupuestoMax)
                    : null,



                fechaNecesidad:
                    req.body.fechaNecesidad
                    ? new Date(
                        req.body.fechaNecesidad
                    )
                    : null,



                archivoAdjunto:
                    req.body.archivoAdjunto || null


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









// Actualizar solicitud

export const actualizarSolicitud =
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
        await prisma.solicitud.findFirst({

            where:{

                id:Number(req.params.id),

                institucionId:institucion.id

            }

        });





        if(!solicitud){

            return res.status(404).json({

                message:"Solicitud no encontrada"

            });

        }





        const actualizada =
        await prisma.solicitud.update({

            where:{

                id:solicitud.id

            },

            data:{


                titulo:req.body.titulo,


                descripcion:req.body.descripcion,


                categoria:req.body.categoria,


                cantidad:Number(
                    req.body.cantidad
                ),


                marcaPreferida:
                    req.body.marcaPreferida || null,


                modeloPreferido:
                    req.body.modeloPreferido || null,


                presupuestoMax:
                    req.body.presupuestoMax
                    ? Number(req.body.presupuestoMax)
                    : null,


                fechaNecesidad:
                    req.body.fechaNecesidad
                    ? new Date(
                        req.body.fechaNecesidad
                    )
                    : null,


                archivoAdjunto:
                    req.body.archivoAdjunto || null


            }


        });




        res.json(actualizada);



    }catch(error){


        console.error(error);


        res.status(500).json({

            message:"Error actualizando solicitud"

        });


    }


};









// Eliminar solicitud

export const eliminarSolicitud =
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
        await prisma.solicitud.findFirst({

            where:{

                id:Number(req.params.id),

                institucionId:institucion.id

            }

        });





        if(!solicitud){

            return res.status(404).json({

                message:"Solicitud no encontrada"

            });

        }





        await prisma.solicitud.delete({

            where:{

                id:solicitud.id

            }

        });





        res.json({

            message:"Solicitud eliminada"

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            message:"Error eliminando solicitud"

        });



    }


};