// cotimed-api/src/routes/mensaje.routes.ts

import { Router } from "express";

import {
    listarMensajesController,
    buscarMensajeController,
    crearMensajeController,
    actualizarMensajeController,
    eliminarMensajeController,
} from "../controllers/mensaje.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarMensajesController);

router.get("/:id", buscarMensajeController);

router.post("/", crearMensajeController);

router.put("/:id", actualizarMensajeController);

router.delete("/:id", eliminarMensajeController);


export default router;
