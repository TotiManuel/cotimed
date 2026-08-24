// cotimed-api/src/routes/notificacion.routes.ts

import { Router } from "express";

import {
    listarNotificaccionesController,
    buscarNotificacionController,
    crearNotificacionController,
    actualizarNotificacionController,
    eliminarNotificacionController,
} from "../controllers/notificacion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarNotificaccionesController);

router.get("/:id", buscarNotificacionController);

router.post("/", crearNotificacionController);

router.put("/:id", actualizarNotificacionController);

router.delete("/:id", eliminarNotificacionController);


export default router;
