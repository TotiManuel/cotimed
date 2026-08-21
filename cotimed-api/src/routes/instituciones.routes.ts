import { Router } from "express";

import {
    getInstituciones,
    getInstitucionById,
    postInstitucion,
    putInstitucion,
    patchEstadoInstitucion,
    deleteInstitucion,
    getInstitucionConSolicitudes,
} from "../controllers/instituciones.controller";


const router = Router();


// =========================================================
// INSTITUCIONES
// =========================================================

// GET /api/instituciones
router.get(
    "/",
    getInstituciones
);


// POST /api/instituciones
router.post(
    "/",
    postInstitucion
);


// GET /api/instituciones/:id
router.get(
    "/:id",
    getInstitucionById
);


// PUT /api/instituciones/:id
router.put(
    "/:id",
    putInstitucion
);


// DELETE /api/instituciones/:id
router.delete(
    "/:id",
    deleteInstitucion
);


// PATCH /api/instituciones/:id/estado
router.patch(
    "/:id/estado",
    patchEstadoInstitucion
);


// GET /api/instituciones/:id/solicitudes
router.get(
    "/:id/solicitudes",
    getInstitucionConSolicitudes
);


export default router;