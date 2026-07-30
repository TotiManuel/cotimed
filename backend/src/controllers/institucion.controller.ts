import {
    Request,
    Response
} from "express";

import {
    prisma
} from "../config/database";

// Obtener instituciones públicas

export const obtenerInstituciones = async (

    req: Request,

    res: Response

) => {


    try {


        const instituciones = await prisma.institucion.findMany({

            where: {

                Estado: "ACTIVO"

            },


            select: {


                IDInstitucion: true,

                NombreInstitucion: true,

                NombreComercial: true,

                TipoInstitucion: true,

                Pais: true,

                Ciudad: true,

                Estado: true,

                Verificada: true


            },


            orderBy: {

                FechaCreacion: "desc"

            }


        });



        res.json(instituciones);



    } catch(error) {


        console.error(
            error
        );


        res.status(500).json({

            message:
            "Error obteniendo instituciones"

        });


    }


};







// Crear institución

export const crearInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const institucion = await prisma.institucion.create({

            data: req.body

        });



        res.status(201).json(

            institucion

        );



    } catch(error) {


        console.error(
            error
        );


        res.status(500).json({

            message:
            "Error creando institución"

        });


    }


};







// Dashboard institución

export const obtenerDashboardInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const totalSolicitudes = await prisma.solicitud.count();



        const totalUsuarios = await prisma.usuario.count();



        res.json({

            totalSolicitudes,

            totalUsuarios

        });



    } catch(error) {


        console.error(
            error
        );


        res.status(500).json({

            message:
            "Error obteniendo dashboard"

        });


    }


};