import { Request, Response } from "express";

import { prisma } from "../config/database";

import {
  EstadoCotizacion
} from "@prisma/client";



export const obtenerDashboardProveedor = async (

  req: Request,

  res: Response

) => {


  try {

    const usuarioId = (req as any).user.id;

    const proveedor = await prisma.proveedor.findFirst({

      where: {

        usuarioId

      }

    });

    if (!proveedor) {


      return res.status(404).json({

        mensaje: "Proveedor no encontrado"

      });


    }

    const cotizaciones = await prisma.cotizacion.findMany({

      where: {

        proveedorId: proveedor.id

      },


      include: {


        solicitud: {


          include: {


            institucion: true


          }


        }


      },


      orderBy: {


        fechaCreacion: "desc"


      },


      take: 5


    });

    const solicitudesRecibidas = await prisma.destinatarioSolicitud.count({

      where: {

        proveedorId: proveedor.id

      }


    });









    const cotizacionesEnviadas = await prisma.cotizacion.count({

      where: {

        proveedorId: proveedor.id

      }


    });









    const cotizacionesAprobadas = await prisma.cotizacion.count({

      where: {


        proveedorId: proveedor.id,


        estado: EstadoCotizacion.ACEPTADA


      }


    });









    const productosPublicados = await prisma.equipamiento.count({

      where: {


        proveedorId: proveedor.id,


        activo: true


      }


    });









    const solicitudes = await prisma.solicitud.findMany({

      where: {


        destinatarios: {


          some: {


            proveedorId: proveedor.id


          }


        }


      },


      orderBy: {


        fechaCreacion: "desc"


      },


      take: 5


    });









    const totalCotizaciones = await prisma.cotizacion.count({

      where: {


        proveedorId: proveedor.id


      }


    });








    const aprobadas = await prisma.cotizacion.count({

      where: {


        proveedorId: proveedor.id,


        estado: EstadoCotizacion.ACEPTADA


      }


    });








    const tasaAprobacion =

      totalCotizaciones === 0

        ? 0

        : Math.round(

            (aprobadas / totalCotizaciones) * 100

          );









    res.json({


      solicitudesRecibidas,


      cotizacionesEnviadas,


      cotizacionesAprobadas,


      productosPublicados,


      solicitudes,


      cotizaciones,


      tasaAprobacion,


      tiempoRespuesta: "4h",


      valoracion: "4.8"


    });






  } catch(error) {


    console.error(

      "Error dashboard proveedor:",

      error

    );



    res.status(500).json({

      mensaje: "Error cargando dashboard proveedor"

    });


  }


};