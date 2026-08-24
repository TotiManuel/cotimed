// cotimed-api/src/routes/auditoria.routes.ts

import { Router } from "express";

import {
    listarAuditoriasController,
    buscarAuditoriaController,
    crearAuditoriaController,
    actualizarAuditoriaController,
    eliminarAuditoriaController,
} from "../controllers/auditoria.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarAuditoriasController);

router.get("/:id", buscarAuditoriaController);

router.post("/", crearAuditoriaController);

router.put("/:id", actualizarAuditoriaController);

router.delete("/:id", eliminarAuditoriaController);


export default router;
