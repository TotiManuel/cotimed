 import { Request, Response } from "express";
 import { listarProveedores, listarProveedoresActivos,buscarProveedorByID, crearProveedor, actualizarProveedor, eliminarProveedor } from "../services/proveedor.service";
 
 export const listaProveedores = async( req: Request, res:Response )=>{
     try {
         const proveedores = await listarProveedores();
         res.status(201).json(proveedores);
     } catch (error) {
         error:error
     }
 };
 export const listaProveedoresActivos = async( req: Request, res:Response )=>{
     try {
         const proveedores = await listarProveedoresActivos();
         res.status(200).json(proveedores);
     } catch (error) {
         res.status(404).json({
             error: error
         });
     }
 };
 export const buscaProveedorByID = async( req: Request, res:Response )=>{
     try{
         const id = Number(req.params.id);
         const proveedores = await buscarProveedorByID(id);
         res.status(200).json(proveedores);
     } catch(error){
         res.status(404).json({
             error: error        
         });
     }
 
 }
 export const creaProveedor = async( req: Request, res:Response )=>{
     try {
         const proveedorCreado = await crearProveedor(req.body);
         res.status(201).json(proveedorCreado);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 };
 export const actualizaProveedor = async (
     req: Request,
     res: Response
 ) => {
     try {
         const id = Number(req.params.id);
 
         if (isNaN(id)) {
             return res.status(400).json({
                 mensaje: "ID de Proveedor inválido"
             });
         }
 
         const proveedorActualizado = await actualizarProveedor(
             id,
             req.body
         );
 
         return res.status(200).json({
             mensaje: "Proveedor actualizado correctamente",
             proveedor: proveedorActualizado
         });
 
     } catch (error: any) {
 
         if (error.message === "Proveedor no encontrada") {
             return res.status(404).json({
                 mensaje: error.message
             });
         }
 
         console.error(error);
 
         return res.status(500).json({
             mensaje: "Error al actualizar Proveedor"
         });
     }
 };
 export const eliminaProveedor = async( req: Request, res:Response )=>{
     try {
         const id = Number(req.params.id);
         const proveedorEliminado = await eliminarProveedor(id)
         res.status(201).json(proveedorEliminado);
     } catch (error) {
         res.status(400).json({
             error:error
         });
     }
 }