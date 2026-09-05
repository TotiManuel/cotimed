 import { Request, Response } from "express";
 import { listarCotizaciones, listarCotizacionesPorEstado,buscarCotizacionByID, crearCotizacion, actualizarCotizacion, eliminarCotizacion } from "../services/cotizacion.service";
import { EstadoCotizacion } from "@prisma/client";
 
 export const listaCotizaciones = async( req: Request, res:Response )=>{
     try {
         const cotizaciones = await listarCotizaciones();
         res.status(201).json(cotizaciones);
     } catch (error) {
         error:error
     }
 };
 export const listaCotizacionesPorEstado = async( req: Request, res:Response )=>{
     try {
        const estado = (req.params.estado) as EstadoCotizacion;
         const cotizaciones = await listarCotizacionesPorEstado(estado);
         res.status(200).json(cotizaciones);
     } catch (error) {
         res.status(404).json({
             error: error
         });
     }
 };
 export const buscaCotizacionByID = async( req: Request, res:Response )=>{
     try{
         const id = Number(req.params.id);
         const cotizaciones = await buscarCotizacionByID(id);
         res.status(200).json(cotizaciones);
     } catch(error){
         res.status(404).json({
             error: error        
         });
     }
 
 }
 export const creaCotizacion = async( req: Request, res:Response )=>{
     try {
         const cotizaciones = await crearCotizacion(req.body);
         res.status(201).json(cotizaciones);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 };
 export const actualizaCotizacion = async (
     req: Request,
     res: Response
 ) => {
     try {
         const id = Number(req.params.id);
 
         if (isNaN(id)) {
             return res.status(400).json({
                 mensaje: "ID de cotizacion inválido"
             });
         }
 
         const cotizacionActualizada = await actualizarCotizacion(
             id,
             req.body
         );
 
         return res.status(200).json({
             mensaje: "Proveedor actualizado correctamente",
             cotizacion: cotizacionActualizada
         });
 
     } catch (error: any) {
 
         if (error.message === "cotizacion no encontrada") {
             return res.status(404).json({
                 mensaje: error.message
             });
         }
 
         console.error(error);
 
         return res.status(500).json({
             mensaje: "Error al actualizar cotizacion"
         });
     }
 };
 export const eliminaCotizacion = async( req: Request, res:Response )=>{
     try {
         const id = Number(req.params.id);
         const cotizacionEliminado = await eliminarCotizacion(id)
         res.status(201).json(cotizacionEliminado);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 }