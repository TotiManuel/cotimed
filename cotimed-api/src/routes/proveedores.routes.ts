import { Router } from "express";

import {
    listar,
    obtener,
    buscar,
    crear,
    actualizar,
    eliminar,
} from "../controllers/proveedores.controller";


const router = Router();


// =========================================================
// PROVEEDORES
// =========================================================

router.get(
    "/",
    listar
);


router.get(
    "/buscar",
    buscar
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