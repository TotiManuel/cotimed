// cotimed-api/src/routes/categoria.routes.ts

import { Router } from "express";

import {
    listarCategoriasController,
    buscarCategoriaController,
    crearCategoriaController,
    actualizarCategoriaController,
    eliminarCategoriaController,
} from "../controllers/categoria.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarCategoriasController);

router.get("/:id", buscarCategoriaController);

router.post("/", crearCategoriaController);

router.put("/:id", actualizarCategoriaController);

router.delete("/:id", eliminarCategoriaController);


export default router;
