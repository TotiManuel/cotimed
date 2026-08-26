import { EstadoSolicitud } from "@prisma/client";
import prisma from "../prisma/prisma";

export const listarSolicitudes = async()=> {
    return await prisma.solicitud.findMany();
}
export const listarPorEstado = async(estado: EstadoSolicitud)=> {
    const solicitudes = await prisma.solicitud.findMany({ where:{ estado:estado } })
    return solicitudes
}
export const buscarSolicitudByID = async(id:number)=> {
    return await prisma.solicitud.findUnique({ where:{ id:id } })
}
export const crearSolicitud = async(data: { numero: string, titulo: string,descripcion: string,institucion_id: number,creado_por_id: number,fecha_publicacion: Date,fecha_limite_cotizacion: Date,fecha_cierre: Date,presupuesto_estimado: number,condiciones: string,observaciones: string,lugar_entrega: string })=> {
    const existente = await prisma.solicitud.findUnique({
        where:{
            numero:data.numero
        }
    });
    if(!existente){
        throw new Error("Solicitud ya realizada");
    }
    const solicitud = await prisma.solicitud.create({
        data: data
    });
    return solicitud
}
export const actualizarSolicitud = async(id: number, data: { numero: string, titulo: string,descripcion: string,institucion_id: number,creado_por_id: number,fecha_publicacion: Date,fecha_limite_cotizacion: Date,fecha_cierre: Date,presupuesto_estimado: number,condiciones: string,observaciones: string,lugar_entrega: string })=> {
    const existente = await prisma.solicitud.findUnique({
        where:{
            id:id
        }
    });
    if(!existente){
        throw new Error("Solicitud ya realizada");
    }
    const solicitud = await prisma.solicitud.update({
        where:{
            id:id
        },
        data: data
    });
    return solicitud
}
export const eliminarSolicitud = async(id:number)=> {
    await prisma.solicitud.update({
        where: {
            id:id
        },
        data: {
            eliminado: true
        }
    });
}
