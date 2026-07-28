import { Request, Response } from "express";
import { prisma } from "../config/database";
import { EstadoSolicitud, EstadoCotizacion } from "@prisma/client";

export const obtenerDashboardInstitucion = async (
  req: any,
  res: Response
) => {
  try {

    const usuarioId = req.user.id;
    console.log("USER TOKEN:", req.user);
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

    const solicitudes = await prisma.solicitud.findMany({
      where: {
        institucionId: institucion.id
      },
      orderBy: {
        fechaCreacion: "desc"
      },
      take: 5
    });

    const solicitudesActivas = await prisma.solicitud.count({
      where: {
        institucionId: institucion.id,
        estado: {
          not: EstadoSolicitud.CERRADA
        }
      }
    });

    const cotizaciones = await prisma.cotizacion.findMany({
      where: {
        solicitud: {
          institucionId: institucion.id
        }
      },
      include: {
        proveedor: true,
        solicitud: true
      },
      orderBy: {
        fechaCreacion: "desc"
      },
      take: 5
    });

    const cotizacionesRecibidas = await prisma.cotizacion.count({
      where: {
        solicitud: {
          institucionId: institucion.id
        }
      }
    });

    const proveedores = await prisma.cotizacion.findMany({
      where: {
        solicitud: {
          institucionId: institucion.id
        }
      },
      select: {
        proveedorId: true
      }
    });

    const proveedoresContactados = new Set(
      proveedores.map(p => p.proveedorId)
    ).size;

    const comprasRealizadas = await prisma.cotizacion.count({
      where: {
        estado: EstadoCotizacion.ACEPTADA,
        solicitud: {
          institucionId: institucion.id
        }
      }
    });

    res.json({
      solicitudesActivas,
      cotizacionesRecibidas,
      comprasRealizadas,
      proveedoresContactados,
      solicitudes,
      cotizaciones
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error cargando dashboard"
    });

  }
};