import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";



// CREAR INSTITUCION

export const crearInstitucion = async (

    data:{
        name_user:string;
        email:string;
        password:string;
        organizacion:string;
    }

)=>{


    const existe = await prisma.user.findUnique({

        where:{
            email:data.email
        }

    });



    if(existe){

        throw new Error(
            "El email ya está registrado"
        );

    }



    const passwordHash = await bcrypt.hash(
        data.password,
        10
    );



    const institucion = await prisma.user.create({

        data:{

            name_user:data.name_user,

            email:data.email,

            password:passwordHash,

            rol:"institucion",

            organizacion:data.organizacion

        }

    });



    return institucion;


};




// BUSCAR INSTITUCION POR ID

export const buscarInstitucion = async (

    id:number

)=>{


    const institucion = await prisma.user.findFirst({

        where:{

            id,

            rol:"institucion"

        },

        include:{

            solicitudes:true,

            cotizaciones:true

        }

    });



    if(!institucion){

        throw new Error(
            "Institución no encontrada"
        );

    }



    return institucion;


};




// LISTAR INSTITUCIONES

export const listarInstituciones = async()=>{


    const instituciones = await prisma.user.findMany({

        where:{

            rol:"institucion"

        },

        include:{

            solicitudes:true

        },

        orderBy:{

            id:"desc"

        }

    });



    return instituciones;


};




// ACTUALIZAR INSTITUCION

export const actualizarInstitucion = async (

    id:number,

    data:{

        name_user?:string;

        email?:string;

        organizacion?:string;

        password?:string;

    }

)=>{


    const existe = await prisma.user.findFirst({

        where:{

            id,

            rol:"institucion"

        }

    });



    if(!existe){

        throw new Error(
            "Institución no encontrada"
        );

    }



    let datosActualizar:any = {

        ...data

    };



    if(data.password){

        datosActualizar.password =
            await bcrypt.hash(
                data.password,
                10
            );

    }



    const institucion = await prisma.user.update({

        where:{

            id

        },

        data:datosActualizar

    });



    return institucion;


};




// ELIMINAR INSTITUCION

export const eliminarInstitucion = async (

    id:number

)=>{


    const existe = await prisma.user.findFirst({

        where:{

            id,

            rol:"institucion"

        }

    });



    if(!existe){

        throw new Error(
            "Institución no encontrada"
        );

    }



    /*
        Primero eliminamos relaciones
        porque Prisma no tiene cascade configurado
    */


    await prisma.solicitud.deleteMany({

        where:{

            id_institucion:id

        }

    });



    const institucion = await prisma.user.delete({

        where:{

            id

        }

    });



    return institucion;


};