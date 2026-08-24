// cotimed-api/src/routes/cotizacion.routes.ts

import { Router } from "express";

import {
    listarCotizacionesController,
    buscarCotizacionController,
    crearCotizacionController,
    actualizarCotizacionController,
    eliminarCotizacionController,
} from "../controllers/cotizacion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarCotizacionesController);

router.get("/:id", buscarCotizacionController);

router.post("/", crearCotizacionController);

router.put("/:id", actualizarCotizacionController);

router.delete("/:id", eliminarCotizacionController);


export default router;
