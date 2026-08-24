// cotimed-api/src/routes/adjudicacion.routes.ts

import { Router } from "express";

import {
    listarAdjudicaccionesController,
    buscarAdjudicacionController,
    crearAdjudicacionController,
    actualizarAdjudicacionController,
    eliminarAdjudicacionController,
} from "../controllers/adjudicacion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarAdjudicaccionesController);

router.get("/:id", buscarAdjudicacionController);

router.post("/", crearAdjudicacionController);

router.put("/:id", actualizarAdjudicacionController);

router.delete("/:id", eliminarAdjudicacionController);


export default router;
