// cotimed-api/src/routes/usuario.routes.ts

import { Router } from "express";

import {
    listarUsuariosController,
    buscarUsuarioController,
    crearUsuarioController,
    actualizarUsuarioController,
    eliminarUsuarioController,
} from "../controllers/usuario.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarUsuariosController);

router.get("/:id", buscarUsuarioController);

router.post("/", crearUsuarioController);

router.put("/:id", actualizarUsuarioController);

router.delete("/:id", eliminarUsuarioController);


export default router;
