import { Request, Response } from "express";
import { listarInstituciones, listarInstitucionesActivas,institucionByID, crearInstitucion, actualizarInstitucion, eliminarInstitucion } from "../services/institucion.service";

export const listaInstituciones = async( req: Request, res:Response )=>{
    try {
        const instituciones = await listarInstituciones();
        res.status(201).json(instituciones);
    } catch (error) {
        error:error
    }
};
export const listaInstitucionesActivas = async( req: Request, res:Response )=>{
    try {
        const instituciones = await listarInstitucionesActivas();
        res.status(200).json(instituciones);
    } catch (error) {
        res.status(404).json({
            error: error
        });
    }
};
export const busquedaInstitucionByID = async( req: Request, res:Response )=>{
    try{
        const id = Number(req.params.id);
        const instituciones = await institucionByID(id);
        res.status(200).json(instituciones);
    } catch(error){
        res.status(404).json({
            error: error        
        });
    }

}
export const crearInstituciones = async( req: Request, res:Response )=>{
    try {
        const institucionCreada = await crearInstitucion(req.body);
        res.status(201).json(institucionCreada);
    } catch (error) {
        res.status(400).json({
            error:error
        });
    }
};
export const actualizaInstitucion = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                mensaje: "ID de Institucion inválido"
            });
        }

        const institucionActualizado = await actualizarInstitucion(
            id,
            req.body
        );

        return res.status(200).json({
            mensaje: "Institucion actualizada correctamente",
            institucion: institucionActualizado
        });

    } catch (error: any) {

        if (error.message === "Institucion no encontrada") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar institucion"
        });
    }
};
export const eliminaInstitucion = async( req: Request, res:Response )=>{
    try {
        const id = Number(req.params.id);
        const institucionEliminada = await eliminarInstitucion(id)
        res.status(201).json(institucionEliminada);
    } catch (error) {
        res.status(400).json({
            error:error
        });
    }
}