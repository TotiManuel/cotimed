import { Request, Response } from "express";

import {
    crearInstitucion,
    buscarInstitucion,
    listarInstituciones,
    actualizarInstitucion,
    eliminarInstitucion
} from "../services/instituciones.service";




// CREAR INSTITUCION

export const createInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const institucion = await crearInstitucion(

            req.body

        );


        res.status(201).json(

            institucion

        );


    } catch (error:any) {


        res.status(400).json({

            message:error.message

        });


    }


};





// BUSCAR INSTITUCION POR ID

export const getInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const id = Number(

            req.params.id

        );


        const institucion = await buscarInstitucion(

            id

        );


        res.json(

            institucion

        );


    } catch(error:any){


        res.status(404).json({

            message:error.message

        });


    }


};





// LISTAR INSTITUCIONES

export const getInstituciones = async (

    req: Request,

    res: Response

) => {


    try {


        const instituciones = await listarInstituciones();



        res.json(

            instituciones

        );


    }catch(error:any){


        res.status(500).json({

            message:error.message

        });


    }


};





// ACTUALIZAR INSTITUCION

export const updateInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const id = Number(

            req.params.id

        );


        const institucion = await actualizarInstitucion(

            id,

            req.body

        );


        res.json(

            institucion

        );


    }catch(error:any){


        res.status(400).json({

            message:error.message

        });


    }


};





// ELIMINAR INSTITUCION

export const deleteInstitucion = async (

    req: Request,

    res: Response

) => {


    try {


        const id = Number(

            req.params.id

        );


        const institucion = await eliminarInstitucion(

            id

        );


        res.json({

            message:"Institución eliminada correctamente",

            institucion

        });


    }catch(error:any){


        res.status(400).json({

            message:error.message

        });


    }


};