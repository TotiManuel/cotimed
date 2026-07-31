import { Request, Response } from "express";
import { prisma } from "../config/database";
// LISTAR PROVEEDORES
export const obtenerProveedores = async (
    req: Request,
    res: Response
) => {
    try {
        const proveedores =
            await prisma.proveedor.findMany({
                include:{
                    Cotizaciones:true,
                    Catalogo:true
                }
            });
        res.json(proveedores);
    } catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error obteniendo proveedores"
        });
    }
};
// OBTENER PROVEEDOR POR ID
export const obtenerProveedor = async (
    req:Request,
    res:Response
) => {
    try {
        const id = req.params.id;
        const proveedor =
            await prisma.proveedor.findUnique({
                where:{
                    IDProveedor:id
                },
                include:{
                    Cotizaciones:true,
                    Catalogo:true
                }
            });
        if(!proveedor){
            return res.status(404).json({
                message:"Proveedor no encontrado"
            });
        }
        res.json(proveedor);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error buscando proveedor"
        });
    }
};
// CREAR PROVEEDOR
export const crearProveedor = async(
    req:Request,
    res:Response
)=>{
    try{
        const proveedor =
            await prisma.proveedor.create({
                data:req.body
            });
        res.status(201).json({
            message:"Proveedor creado",
            proveedor
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error creando proveedor"
        });
    }
};
// ACTUALIZAR
export const actualizarProveedor = async(
    req:Request,
    res:Response
)=>{
    try{
        const id =
            req.params.id;
        const proveedor =
            await prisma.proveedor.update({
                where:{
                    IDProveedor:id
                },
                data:req.body
            });
        res.json(proveedor);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error actualizando proveedor"
        });
    }
};
// ELIMINAR
export const eliminarProveedor = async(
    req:Request,
    res:Response
)=>{
    try{
        const id =
            req.params.id;
        await prisma.proveedor.delete({
            where:{
                IDProveedor:id
            }
        });
        res.json({
            message:"Proveedor eliminado"
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Error eliminando proveedor"
        });
    }
};
// DASHBOARD PROVEEDOR
export const obtenerDashboardProveedor = async(
    req:any,
    res:Response
)=>{
try{
const usuarioId =
    req.user.id;
const proveedor =
await prisma.proveedor.findFirst({
where:{
    // actualmente no existe relación Usuario-Proveedor
    // buscar luego cuando agregues la relación
},
});
if(!proveedor){
return res.status(404).json({
message:"Proveedor no encontrado"
});
}
const cotizaciones =
await prisma.cotizacion.count({
where:{
    ProveedorID:
    proveedor.IDProveedor
}
});
res.json({
proveedor,
estadisticas:{
cotizaciones
}
});
}catch(error){
console.error(error);
res.status(500).json({
message:"Error dashboard proveedor"
});
}
};