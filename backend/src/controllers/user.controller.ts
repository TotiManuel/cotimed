import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/database";

// LISTAR USUARIOS

export const obtenerUsuarios = async (
  req:Request,
  res:Response
)=>{

  try{


    const usuarios =
      await prisma.user.findMany({

        select:{

          id:true,

          nombre:true,

          apellido:true,

          email:true,

          telefono:true,

          rol:true,

          estado:true,
          institucionId:true,

          institucion:{
          select:{
            id:true,
            nombre:true
          }
          },

          proveedor:{
          select:{
            id:true,
            nombreEmpresa:true
          }
          }

        }

      });


    res.json(usuarios);


  }catch(error){

    console.error(error);

    res.status(500).json({

      message:"Error obteniendo usuarios"

    });

  }

};
// OBTENER UNO
export const obtenerUsuario = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



const usuario =
await prisma.user.findUnique({

where:{
id
},


select:{


id:true,

nombre:true,

apellido:true,

email:true,

telefono:true,

rol:true,

estado:true,

fotoPerfil:true,

ultimoAcceso:true,

fechaCreacion:true,

createdAt:true,

updatedAt:true,

institucionId:true,



institucion:{

select:{

id:true,

nombre:true

}

},



institucionAdmin:{

select:{

id:true,

nombre:true

}

},



proveedor:{

select:{

id:true,

nombre:true

}

}


}


});



if(!usuario){

return res.status(404).json({

message:"Usuario no encontrado"

});

}



res.json(usuario);



}catch(error){


console.error(error);


res.status(500).json({

message:"Error obteniendo usuario"

});


}


};
// CREAR USUARIO
export const crearUsuario = async(
req:Request,
res:Response
)=>{
try{
const {
nombre,
apellido,
email,
telefono,
password,
rol,
estado,
fotoPerfil,
institucionId,
nombreInstitucion,
nombreComercial,
cuit,
direccion,
ciudad,
provincia

}=req.body;

const hash =
await bcrypt.hash(

password,

10

);




const usuario =
await prisma.user.create({

data:{

nombre,

apellido,

email,

telefono,

password:hash,

rol,

estado,

fotoPerfil,

institucionId

}

});


// Crear institución vinculada al usuario

if(rol === "INSTITUCION"){

await prisma.institucion.create({

data:{

usuarioId: usuario.id,

nombre:
nombreInstitucion || nombre,

nombreComercial,

cuit,

direccion,

ciudad,

provincia

}

});

}


// Crear proveedor vinculado al usuario

if(rol === "PROVEEDOR"){

  await prisma.proveedor.create({

    data:{

      usuarioId: usuario.id,

      nombreEmpresa:
        req.body.nombreEmpresa || nombre,

      cuit,

      telefono,

      direccion,

      ciudad,

      provincia

    }

  });

}
res.status(201).json(usuario);

}catch(error){


console.error(error);


res.status(500).json({

message:"Error creando usuario"

});


}


};

export const actualizarUsuario = async(
req:Request,
res:Response
)=>{

try{

const id = Number(req.params.id);


const {
nombre,
apellido,
email,
telefono,
rol,
estado,
fotoPerfil,
institucionId,
password
}=req.body;



const datos:any={

nombre,
apellido,
email,
telefono,
rol,
estado,
fotoPerfil,
institucionId

};



if(password){

datos.password =
await bcrypt.hash(
password,
10
);

}



const usuario =
await prisma.user.update({

where:{
id
},

data:datos

});



res.json(usuario);


}catch(error){

console.error(error);

res.status(500).json({

message:"Error actualizando usuario"

});

}

};
// ELIMINAR USUARIO


export const eliminarUsuario = async(
req:Request,
res:Response
)=>{


try{


const id =
Number(req.params.id);



await prisma.$transaction(async (tx)=>{

  await tx.institucion.deleteMany({
    where:{
      usuarioId:id
    }
  });


  await tx.proveedor.deleteMany({
    where:{
      usuarioId:id
    }
  });


  await tx.user.delete({
    where:{
      id
    }
  });

});



res.json({

message:"Usuario eliminado"

});



}catch(error){


console.error(error);


res.status(500).json({

message:"Error eliminando usuario"

});


}


};









// PERFIL USUARIO LOGUEADO


export const obtenerPerfil = async(
req:any,
res:Response
)=>{


try{


const usuario =
await prisma.user.findUnique({

where:{

id:req.user.id

},


select:{


id:true,

nombre:true,

apellido:true,

email:true,

rol:true,

estado:true,

fotoPerfil:true


}


});



res.json(usuario);



}catch(error){


res.status(500).json({

message:"Error obteniendo perfil"

});


}


};