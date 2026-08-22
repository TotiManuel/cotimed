import { Router } from "express";

import {
    listar,
    obtener,
    listarPorInstitucion,
    crear,
    actualizar,
    eliminar,
} from "../controllers/solicitud.controller";


const router = Router();


// =========================================================
// SOLICITUDES
// =========================================================

router.get(
    "/",
    listar
);


router.get(
    "/institucion/:id",
    listarPorInstitucion
);


router.get(
    "/:id",
    obtener
);


router.post(
    "/",
    crear
);


router.put(
    "/:id",
    actualizar
);


router.delete(
    "/:id",
    eliminar
);


export default router;