import { Request, Response } from "express";
import { prisma } from "../config/database";



export const obtenerInstituciones =
async(req:Request,res:Response)=>{


try{


const instituciones =
await prisma.institucion.findMany();



res.json(instituciones);



}catch(error){

res.status(500).json({

message:"Error"

});

}


};





export const crearInstitucion =
async(req:Request,res:Response)=>{

try{

const {
  usuarioId,
  nombre,
  nombreComercial,
  cuit,
  telefono,
  direccion,
  ciudad,
  provincia

} = req.body;


const institucion =
await prisma.institucion.create({

data:{
  usuarioId,

  nombre,

  nombreComercial,

  cuit,

  telefono,

  direccion,

  ciudad,

  provincia
}

});


res.status(201).json(institucion);


}catch(error){

console.error(error);

res.status(500).json({

message:"Error creando institución"

});

}

};

export const obtenerDashboardInstitucion = async(
    req:any,
    res:Response
)=>{

    try{


        const usuarioId = req.user.id;


        const institucion =
            await prisma.institucion.findUnique({

                where:{
                    usuarioId
                }

            });



        if(!institucion){

            return res.status(404).json({

                message:"Institución no encontrada"

            });

        }




        const solicitudes =
            await prisma.solicitud.count({

                where:{
                    institucionId:
                    institucion.id
                }

            });





        const cotizaciones =
            await prisma.cotizacion.count({

                where:{

                    solicitud:{

                        institucionId:
                        institucion.id

                    }

                }

            });





        res.json({

            institucion,

            estadisticas:{

                solicitudes,

                cotizaciones

            }


        });



    }catch(error){

        console.error(error);


        res.status(500).json({

            message:"Error dashboard institución"

        });

    }

};