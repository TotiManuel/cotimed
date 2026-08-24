// cotimed-api/src/routes/equipamentoFavorito.routes.ts

import { Router } from "express";

import {
    listarEquipamentofavoritosController,
    buscarEquipamentoFavoritoController,
    crearEquipamentoFavoritoController,
    actualizarEquipamentoFavoritoController,
    eliminarEquipamentoFavoritoController,
} from "../controllers/equipamentoFavorito.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarEquipamentofavoritosController);

router.get("/:id", buscarEquipamentoFavoritoController);

router.post("/", crearEquipamentoFavoritoController);

router.put("/:id", actualizarEquipamentoFavoritoController);

router.delete("/:id", eliminarEquipamentoFavoritoController);


export default router;
