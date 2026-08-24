// cotimed-api/src/routes/direccion.routes.ts

import { Router } from "express";

import {
    listarDirecccionesController,
    buscarDireccionController,
    crearDireccionController,
    actualizarDireccionController,
    eliminarDireccionController,
} from "../controllers/direccion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarDirecccionesController);

router.get("/:id", buscarDireccionController);

router.post("/", crearDireccionController);

router.put("/:id", actualizarDireccionController);

router.delete("/:id", eliminarDireccionController);


export default router;
