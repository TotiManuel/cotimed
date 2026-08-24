// cotimed-api/src/routes/imagenEquipamento.routes.ts

import { Router } from "express";

import {
    listarImagenequipamentosController,
    buscarImagenEquipamentoController,
    crearImagenEquipamentoController,
    actualizarImagenEquipamentoController,
    eliminarImagenEquipamentoController,
} from "../controllers/imagenEquipamento.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarImagenequipamentosController);

router.get("/:id", buscarImagenEquipamentoController);

router.post("/", crearImagenEquipamentoController);

router.put("/:id", actualizarImagenEquipamentoController);

router.delete("/:id", eliminarImagenEquipamentoController);


export default router;
