import { Request, Response } from "express";
import { prisma } from "../config/database";




// LISTAR EQUIPAMIENTO

export const obtenerEquipamientos = async(
req:Request,
res:Response
)=>{


try{


const equipos =
await prisma.equipamiento.findMany({

include:{

proveedor:true

}

});



res.json(equipos);



}catch(error){

console.error(error);

res.status(500).json({

message:"Error obteniendo equipamientos"

});

}


};









// OBTENER UNO

export const obtenerEquipamiento = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



const equipo =
await prisma.equipamiento.findUnique({

where:{
id
},

include:{
proveedor:true
}

});



if(!equipo){

return res.status(404).json({

message:"Equipamiento no encontrado"

});

}



res.json(equipo);



}catch(error){


res.status(500).json({

message:"Error buscando equipo"

});


}

};









// CREAR

export const crearEquipamiento = async(
req:Request,
res:Response
)=>{


try{


const equipo =
await prisma.equipamiento.create({

data:req.body

});



res.status(201).json({

message:"Equipamiento creado",

equipo

});



}catch(error){


console.error(error);


res.status(500).json({

message:"Error creando equipamiento"

});


}

};









// ACTUALIZAR

export const actualizarEquipamiento = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



const equipo =
await prisma.equipamiento.update({

where:{
id
},

data:req.body

});



res.json(equipo);



}catch(error){


res.status(500).json({

message:"Error actualizando equipo"

});


}

};









// ELIMINAR

export const eliminarEquipamiento = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



await prisma.equipamiento.delete({

where:{
id
}

});



res.json({

message:"Equipamiento eliminado"

});



}catch(error){


res.status(500).json({

message:"Error eliminando equipo"

});


}

};