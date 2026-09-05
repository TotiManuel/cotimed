 import { Router } from "express";
 
 import {
     listaProveedores,
     listaProveedoresActivos,
     buscaProveedorByID,
     creaProveedor,
     actualizaProveedor,
     eliminaProveedor
 } from "../controllers/proveedor.controller";
 
 const router = Router();
 
 // GET - Listar todas las instituciones
 router.get("/", listaProveedores);
 
 // GET - Listar instituciones activas
 router.get("/activas", listaProveedoresActivos);
 
 // GET - Buscar institución por ID
 router.get("/:id", buscaProveedorByID);
 
 // POST - Crear institución
 router.post("/", creaProveedor);
 
 // PUT - Actualizar institución
 router.put("/:id", actualizaProveedor);
 
 // DELETE - Eliminar institución
 router.delete("/:id", eliminaProveedor);
 
 export default router;
 