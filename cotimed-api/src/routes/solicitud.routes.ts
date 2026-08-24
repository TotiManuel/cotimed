// cotimed-api/src/routes/solicitud.routes.ts

import { Router } from "express";

import {
    listarSolicitudesController,
    buscarSolicitudController,
    crearSolicitudController,
    actualizarSolicitudController,
    eliminarSolicitudController,
} from "../controllers/solicitud.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarSolicitudesController);

router.get("/:id", buscarSolicitudController);

router.post("/", crearSolicitudController);

router.put("/:id", actualizarSolicitudController);

router.delete("/:id", eliminarSolicitudController);


export default router;
