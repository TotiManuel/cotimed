import { EstadoProveedor } from "@prisma/client";
import prisma from "../prisma/prisma"

export const listarProveedores = async()=> {
    return await prisma.proveedor.findMany();
}
export const listarProveedoresActivos = async()=> {
    return await prisma.proveedor.findMany({ where:{ eliminado:true } })
}
export const buscarProveedorByID = async(id:number)=> {
    const proveedor = await prisma.proveedor.findUnique({ where:{ id:id } })
    return proveedor
}
export const crearProveedor = async(data:{ razon_social: string,nombre_comercial: string,cuit: string,descripcion: string,email: string,telefono: string,sitio_web: string,pais: string,provincia: string,ciudad: string,estado: EstadoProveedor }) => {
    const proveedor = await prisma.proveedor.create({
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
            ciudad: data.ciudad,
            estado: data.estado
        }
    });
    return proveedor
}
export const actualizarProveedor = async(id:number, data: { razon_social: string,nombre_comercial: string,cuit: string,descripcion: string,email: string,telefono: string,sitio_web: string,pais: string,provincia: string,ciudad: string,estado: EstadoProveedor })=> {
    const proveedor = await prisma.proveedor.findUnique({
        where:{id:id}
    })
    if(!proveedor){
        throw new Error("Usuario no encontrado");
    }
    const proveedorActualizado = await prisma.proveedor.update({
        where: {
            id:id
        },
        data: data
    });
    return proveedorActualizado
}
export const eliminarProveedor = async(id:number)=> {
    await prisma.proveedor.update({ where:{ id:id }, data:{ eliminado: true } });
}