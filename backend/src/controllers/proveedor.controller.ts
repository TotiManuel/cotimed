import { Request, Response } from "express";
import { prisma } from "../config/database";



// LISTAR PROVEEDORES

export const obtenerProveedores = async(
    req:Request,
    res:Response
)=>{

    try{


        const proveedores =
            await prisma.proveedor.findMany({

                include:{
                    usuario:true
                }

            });


        res.json(proveedores);


    }catch(error){

        console.error(error);

        res.status(500).json({

            message:"Error obteniendo proveedores"

        });

    }

};






// OBTENER PROVEEDOR POR ID

export const obtenerProveedor = async(
    req:Request,
    res:Response
)=>{


    try{


        const id =
            Number(req.params.id);



        const proveedor =
            await prisma.proveedor.findUnique({

                where:{
                    id
                },

                include:{
                    usuario:true
                }

            });



        if(!proveedor){

            return res.status(404).json({

                message:"Proveedor no encontrado"

            });

        }



        res.json(proveedor);



    }catch(error){


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
            Number(req.params.id);



        const proveedor =
            await prisma.proveedor.update({

                where:{
                    id
                },

                data:req.body

            });



        res.json(proveedor);



    }catch(error){


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
            Number(req.params.id);



        await prisma.proveedor.delete({

            where:{
                id
            }

        });



        res.json({

            message:"Proveedor eliminado"

        });



    }catch(error){


        res.status(500).json({

            message:"Error eliminando proveedor"

        });


    }

};

export const obtenerDashboardProveedor = async(
    req:any,
    res:Response
)=>{


try{


const usuarioId =
    req.user.id;



const proveedor =
await prisma.proveedor.findUnique({

where:{
    usuarioId
}

});



if(!proveedor){

return res.status(404).json({

message:"Proveedor no encontrado"

});

}




const equipamientos =
await prisma.equipamiento.count({

where:{
proveedorId:
proveedor.id
}

});





const cotizaciones =
await prisma.cotizacion.count({

where:{
proveedorId:
proveedor.id
}

});





res.json({

proveedor,

estadisticas:{

equipamientos,

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