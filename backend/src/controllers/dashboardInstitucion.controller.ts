import { Request, Response } from "express";
import { prisma } from "../config/database";
import { EstadoSolicitud, EstadoCotizacion } from "@prisma/client";


export const obtenerDashboardInstitucion = async (
  req: any,
  res: Response
) => {

  try {

    const usuarioId = req.user.id;


    const institucion = await prisma.institucion.findUnique({

      where: {
        usuarioId
      }

    });


    if (!institucion) {

      return res.status(404).json({

        message: "Institución no encontrada"

      });

    }



    // Total solicitudes

    const solicitudes = await prisma.solicitud.count({

      where: {

        institucionId: institucion.id

      }

    });



    // Solicitudes abiertas

    const solicitudesAbiertas =
      await prisma.solicitud.count({

        where: {

          institucionId: institucion.id,

          estado: {

            not: EstadoSolicitud.CERRADA

          }

        }

      });



    // Solicitudes cerradas

    const solicitudesCerradas =
      await prisma.solicitud.count({

        where: {

          institucionId: institucion.id,

          estado: EstadoSolicitud.CERRADA

        }

      });





    // Total cotizaciones

    const cotizaciones =
      await prisma.cotizacion.count({

        where: {

          solicitud: {

            institucionId: institucion.id

          }

        }

      });




    // Cotizaciones aceptadas

    const cotizacionesAceptadas =
      await prisma.cotizacion.count({

        where: {

          estado: EstadoCotizacion.ACEPTADA,

          solicitud: {

            institucionId: institucion.id

          }

        }

      });





    // Proveedores invitados/contactados

    const proveedores =
      await prisma.cotizacion.findMany({

        where: {

          solicitud: {

            institucionId: institucion.id

          }

        },

        select: {

          proveedorId: true

        }

      });



    const proveedoresInvitados =
      new Set(

        proveedores.map(
          p => p.proveedorId
        )

      ).size;





    // Actividad reciente

    const solicitudesRecientes =
      await prisma.solicitud.findMany({

        where: {

          institucionId: institucion.id

        },

        orderBy: {

          fechaCreacion: "desc"

        },

        take: 5,

        select: {

          titulo: true,

          fechaCreacion: true

        }

      });



    const actividad =
      solicitudesRecientes.map(item => ({

        titulo:
          `Nueva solicitud: ${item.titulo}`,

        fecha:
          item.fechaCreacion.toISOString()

      }));





    return res.json({

      solicitudes,

      solicitudesAbiertas,

      solicitudesCerradas,

      cotizaciones,

      cotizacionesAceptadas,

      proveedoresInvitados,

      actividad

    });



  } catch(error) {


    console.error(
      "Error dashboard institución:",
      error
    );


    return res.status(500).json({

      message:
        "Error cargando dashboard"

    });


  }

};