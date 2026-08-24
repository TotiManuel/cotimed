// cotimed-api/src/routes/itemSolicitud.routes.ts

import { Router } from "express";

import {
    listarItemsSolicitudController,
    buscarItemSolicitudController,
    crearItemSolicitudController,
    actualizarItemSolicitudController,
    eliminarItemSolicitudController,
} from "../controllers/itemSolicitud.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarItemsSolicitudController);

router.get("/:id", buscarItemSolicitudController);

router.post("/", crearItemSolicitudController);

router.put("/:id", actualizarItemSolicitudController);

router.delete("/:id", eliminarItemSolicitudController);


export default router;
