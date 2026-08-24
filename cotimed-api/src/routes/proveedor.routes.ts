// cotimed-api/src/routes/proveedor.routes.ts

import { Router } from "express";

import {
    listarProveedoresController,
    buscarProveedorController,
    crearProveedorController,
    actualizarProveedorController,
    eliminarProveedorController,
} from "../controllers/proveedor.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarProveedoresController);

router.get("/:id", buscarProveedorController);

router.post("/", crearProveedorController);

router.put("/:id", actualizarProveedorController);

router.delete("/:id", eliminarProveedorController);


export default router;
