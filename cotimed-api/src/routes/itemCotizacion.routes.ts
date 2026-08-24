// cotimed-api/src/routes/itemCotizacion.routes.ts

import { Router } from "express";

import {
    listarItemcotizaccionesController,
    buscarItemCotizacionController,
    crearItemCotizacionController,
    actualizarItemCotizacionController,
    eliminarItemCotizacionController,
} from "../controllers/itemCotizacion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarItemcotizaccionesController);

router.get("/:id", buscarItemCotizacionController);

router.post("/", crearItemCotizacionController);

router.put("/:id", actualizarItemCotizacionController);

router.delete("/:id", eliminarItemCotizacionController);


export default router;
