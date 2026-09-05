 import { Request, Response } from "express";
 import { listarSolicitudes, listarPorEstado,buscarSolicitudByID, crearSolicitud, actualizarSolicitud, eliminarSolicitud } from "../services/solicitud.service";
import { EstadoSolicitud } from "@prisma/client";
 
 export const listaSolicitudes = async( req: Request, res:Response )=>{
     try {
         const solicitudes = await listarSolicitudes();
         res.status(201).json(solicitudes);
     } catch (error) {
         error:error
     }
 };
 export const listaPorEstado = async( req: Request, res:Response )=>{
     try {
        const estado = (req.params.estado) as EstadoSolicitud;
         const solicitudes = await listarPorEstado(estado);
         res.status(200).json(solicitudes);
     } catch (error) {
         res.status(404).json({
             error: error
         });
     }
 };
 export const buscaSolicitudByID = async( req: Request, res:Response )=>{
     try{
         const id = Number(req.params.id);
         const solicitudes = await buscarSolicitudByID(id);
         res.status(200).json(solicitudes);
     } catch(error){
         res.status(404).json({
             error: error        
         });
     }
 
 }
 export const creaSolicitud = async( req: Request, res:Response )=>{
     try {
         const solicitudes = await crearSolicitud(req.body);
         res.status(201).json(solicitudes);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 };
 export const actualizaSolicitud = async (
     req: Request,
     res: Response
 ) => {
     try {
         const id = Number(req.params.id);
 
         if (isNaN(id)) {
             return res.status(400).json({
                 mensaje: "ID de solicitudes inválido"
             });
         }
 
         const cotizacionActualizada = await actualizarSolicitud(
             id,
             req.body
         );
 
         return res.status(200).json({
             mensaje: "solicitudes actualizado correctamente",
             solicitud: cotizacionActualizada
         });
 
     } catch (error: any) {
 
         if (error.message === "solicitudes no encontrada") {
             return res.status(404).json({
                 mensaje: error.message
             });
         }
 
         console.error(error);
 
         return res.status(500).json({
             mensaje: "Error al actualizar solicitudes"
         });
     }
 };
 export const eliminaCotizacion = async( req: Request, res:Response )=>{
     try {
         const id = Number(req.params.id);
         const solicitudesEliminado = await eliminarSolicitud(id)
         res.status(201).json(solicitudesEliminado);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 }