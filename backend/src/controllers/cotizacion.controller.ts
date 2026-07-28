import { Request, Response } from "express";
import { prisma } from "../config/database";




// LISTAR COTIZACIONES

export const obtenerCotizaciones = async(
req:Request,
res:Response
)=>{


try{


const cotizaciones =
await prisma.cotizacion.findMany({

include:{

proveedor:true,

solicitud:true

}

});



res.json(cotizaciones);



}catch(error){


console.error(error);


res.status(500).json({

message:"Error obteniendo cotizaciones"

});


}

};









// OBTENER UNA

export const obtenerCotizacion = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



const cotizacion =
await prisma.cotizacion.findUnique({

where:{
id
},

include:{

proveedor:true,

solicitud:true

}

});



if(!cotizacion){

return res.status(404).json({

message:"Cotización no encontrada"

});

}



res.json(cotizacion);



}catch(error){


res.status(500).json({

message:"Error"

});


}

};









// CREAR COTIZACION

export const crearCotizacion = async(
req:Request,
res:Response
)=>{


try{


const cotizacion =
await prisma.cotizacion.create({

data:req.body

});



res.status(201).json({

message:"Cotización creada",

cotizacion

});



}catch(error){


console.error(error);


res.status(500).json({

message:"Error creando cotización"

});


}

};









// ACTUALIZAR ESTADO

export const actualizarCotizacion = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



const cotizacion =
await prisma.cotizacion.update({

where:{
id
},

data:req.body

});



res.json(cotizacion);



}catch(error){


res.status(500).json({

message:"Error actualizando cotización"

});


}

};









// ELIMINAR

export const eliminarCotizacion = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



await prisma.cotizacion.delete({

where:{
id
}

});



res.json({

message:"Cotización eliminada"

});



}catch(error){


res.status(500).json({

message:"Error eliminando cotización"

});


}

};