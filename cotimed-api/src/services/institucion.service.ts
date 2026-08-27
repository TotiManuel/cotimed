import { EstadoInstitucion } from "@prisma/client";
import prisma from "../prisma/prisma"

export const listarInstituciones = async()=>{
    return await prisma.institucion.findMany();
}
export const institucionByID = async(id: number)=> {
    const institucion = await prisma.institucion.findUnique({
        where:{
            id: id
        }
    });
    return institucion
}
export const listarInstitucionesActivas = async()=> {
    const instituciones = await prisma.institucion.findMany({
        where:{
            estado: EstadoInstitucion.VERIFICADO
        }
    });
    return instituciones
}
export const crearInstitucion = async(data: {razon_social: string,nombre_comercial: string, cuit: string, descripcion: string, email: string,telefono: string,sitio_web: string,pais: string,provincia: string,ciudad: string})=> {
    const existente = await prisma.institucion.findUnique({
        where:{
            email: data.email
        }
    });
    if (existente) {
        throw new Error("Email ya registrado");
    }
    const institucion = await prisma.institucion.create({
        data: {
            razon_social: data.razon_social,
            nombre_comercial: data.nombre_comercial, 
            cuit: data.cuit, 
            descripcion: data.descripcion, 
            email: data.email,
            telefono: data.telefono,
            sitio_web: data.sitio_web,
            pais: data.pais,
            provincia: data.provincia,
            ciudad: data.ciudad
        }
    });
    return institucion
}
export const actualizarInstitucion = async(id:number, data: {razon_social: string,nombre_comercial: string, cuit: string, descripcion: string, email: string,telefono: string,sitio_web: string,pais: string,provincia: string,ciudad: string})=> {
    const institucion = await prisma.institucion.findUnique({
        where:{
            id:id
        }
    });
    if (!institucion) {
        throw new Error("Institucion no encontrada");
    }
    const institucionActualizada = await prisma.institucion.update({
        where:{
            id:id
        },
        data: data
    });
    return institucionActualizada
}
export const eliminarInstitucion = async(id:number)=> {
    const institucion = await prisma.institucion.update({
        where:{
            id:id
        },
        data:{
            eliminado: true
        }
    }); 
}

