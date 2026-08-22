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

router.get(
    "/",
    getInstituciones
);


router.post(
    "/",
    postInstitucion
);


router.get(
    "/:id",
    getInstitucionById
);


router.put(
    "/:id",
    putInstitucion
);


router.delete(
    "/:id",
    deleteInstitucion
);


router.patch(
    "/:id/estado",
    patchEstadoInstitucion
);


router.get(
    "/:id/solicitudes",
    getInstitucionConSolicitudes
);


export default router;