import { Router } from "express";

import {
    createInstitucion,
    getInstitucion,
    getInstituciones,
    updateInstitucion,
    deleteInstitucion
} from "../controllers/instituciones.controller";


const router = Router();



// Crear institución
router.post(
    "/",
    createInstitucion
);



// Listar instituciones
router.get(
    "/",
    getInstituciones
);



// Buscar institución por ID
router.get(
    "/:id",
    getInstitucion
);



// Actualizar institución
router.put(
    "/:id",
    updateInstitucion
);



// Eliminar institución
router.delete(
    "/:id",
    deleteInstitucion
);



export default router;