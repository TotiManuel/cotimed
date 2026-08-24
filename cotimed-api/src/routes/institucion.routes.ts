// cotimed-api/src/routes/institucion.routes.ts

import { Router } from "express";

import {
    listarInstitucionesController,
    buscarInstitucionController,
    crearInstitucionController,
    actualizarInstitucionController,
    eliminarInstitucionController,
} from "../controllers/institucion.controller";


const router = Router();


// =========================================================
// RUTAS
// =========================================================

router.get("/", listarInstitucionesController);

router.get("/:id", buscarInstitucionController);

router.post("/", crearInstitucionController);

router.put("/:id", actualizarInstitucionController);

router.delete("/:id", eliminarInstitucionController);


export default router;
