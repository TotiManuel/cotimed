// cotimed-api/src/routes/equipamento.routes.ts

import { Router } from "express";

import {
    listarEquipamentosController,
    buscarEquipamentoController,
    crearEquipamentoController,
    actualizarEquipamentoController,
    eliminarEquipamentoController,
} from "../controllers/equipamento.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarEquipamentosController);

router.get("/:id", buscarEquipamentoController);

router.post("/", crearEquipamentoController);

router.put("/:id", actualizarEquipamentoController);

router.delete("/:id", eliminarEquipamentoController);


export default router;
