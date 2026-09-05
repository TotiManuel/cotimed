import { Router } from "express";

import {
    listaInstituciones,
    listaInstitucionesActivas,
    busquedaInstitucionByID,
    crearInstituciones,
    actualizaInstitucion,
    eliminaInstitucion
} from "../controllers/institucion.controller";

const router = Router();

// GET - Listar todas las instituciones
router.get("/", listaInstituciones);

// GET - Listar instituciones activas
router.get("/activas", listaInstitucionesActivas);

// GET - Buscar institución por ID
router.get("/:id", busquedaInstitucionByID);

// POST - Crear institución
router.post("/", crearInstituciones);

// PUT - Actualizar institución
router.put("/:id", actualizaInstitucion);

// DELETE - Eliminar institución
router.delete("/:id", eliminaInstitucion);

export default router;
