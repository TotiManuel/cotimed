// cotimed-api/src/routes/archivo.routes.ts

import { Router } from "express";

import {
    listarArchivosController,
    buscarArchivoController,
    crearArchivoController,
    actualizarArchivoController,
    eliminarArchivoController,
} from "../controllers/archivo.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarArchivosController);

router.get("/:id", buscarArchivoController);

router.post("/", crearArchivoController);

router.put("/:id", actualizarArchivoController);

router.delete("/:id", eliminarArchivoController);


export default router;
