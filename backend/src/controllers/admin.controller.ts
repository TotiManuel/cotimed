import { Request, Response } from "express";
import { prisma } from "../config/database";


export const obtenerDashboardAdmin = async(
 req:Request,
 res:Response
)=>{

try{


const usuarios =
await prisma.user.count();


const instituciones =
await prisma.institucion.count();


const proveedores =
await prisma.proveedor.count();


const solicitudes =
await prisma.solicitud.count();


const cotizaciones =
await prisma.cotizacion.count();

const equipamientos =
await prisma.equipamiento.count();

res.json({

usuarios,

instituciones,

proveedores,

solicitudes,

cotizaciones,

equipamientos:0,


actividad:[

{
titulo:"Nueva institución registrada",
fecha:"Hace 5 minutos"
},

{
titulo:"Nuevo proveedor agregado",
fecha:"Hace 10 minutos"
}

]


});


}catch(error){

console.error(error);


res.status(500).json({

message:"Error obteniendo dashboard"

});


}

};