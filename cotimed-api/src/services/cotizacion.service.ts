import { EstadoCotizacion, TipoMoneda, TipoPago } from "@prisma/client";
import prisma from "../prisma/prisma"
import { data } from "react-router-dom";

export const listarCotizaciones = async()=> {
    return await prisma.cotizacion.findMany();
}
export const listarCotizacionesPorEstado = async(estado: EstadoCotizacion)=> {
    const cotizaciones = await prisma.cotizacion.findMany({
        where:{
            estado: estado
        }
    });
    return cotizaciones
}
export const buscarCotizacionByID = async(id:number)=> {
    const cotizacion = await prisma.cotizacion.findUnique({
        where:{
            id:id
        }
    });
    return cotizacion
}
export const crearCotizacion = async(data: {numero: string,solicitud_id: number,proveedor_id: number,ItemCotizacionId: number,usuario_id: number,estado: EstadoCotizacion,moneda: TipoMoneda,subtotal: number,impuestos: number,descuento: number,envio: number,total: number,plazo_entrega_dias: number,garantia_meses: number,validez_dias: number,fecha_vencimiento: Date,condiciones_pago: TipoPago,condiciones: string,observaciones: string,fecha_envio: Date})=> {
    const existente = await prisma.cotizacion.findUnique({
        where:{
            numero:data.numero
        }
    });
    if (!existente) {
        throw new Error("Usuario no encontrado");
    }
    const cotizacion = await prisma.cotizacion.create({
        data:data
    });
    return cotizacion
}

export const actualizarCotizacion = async(id:number, data: { numero: string,solicitud_id: number,proveedor_id: number,ItemCotizacionId: number,usuario_id: number,estado: EstadoCotizacion,moneda: TipoMoneda,subtotal: number,impuestos: number,descuento: number,envio: number,total: number,plazo_entrega_dias: number,garantia_meses: number,validez_dias: number,fecha_vencimiento: Date,condiciones_pago: TipoPago,condiciones: string,observaciones: string,fecha_envio: Date })=> {
    const cotizacion = await prisma.cotizacion.findUnique({
        where:{
            id:id
        }
    });
    if (!cotizacion) {
        throw new Error("Cotizacion no encontrada");
    }
    const cotizacionActualizada = await prisma.cotizacion.create({
        data: data
    });
    return cotizacionActualizada
}

export const eliminarCotizacion = async(id:number)=> {
    await prisma.cotizacion.update({
        where:{
            id:id
        },
        data:{
            estado:"CANCELADA"
        }
    });
}
