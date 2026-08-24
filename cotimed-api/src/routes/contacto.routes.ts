// cotimed-api/src/routes/contacto.routes.ts

import { Router } from "express";

import {
    listarContactosController,
    buscarContactoController,
    crearContactoController,
    actualizarContactoController,
    eliminarContactoController,
} from "../controllers/contacto.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarContactosController);

router.get("/:id", buscarContactoController);

router.post("/", crearContactoController);

router.put("/:id", actualizarContactoController);

router.delete("/:id", eliminarContactoController);


export default router;
