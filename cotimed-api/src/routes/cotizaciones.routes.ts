import { Router } from "express";

import {
    listar,
    obtener,
    listarPorProveedor,
    crear,
    actualizar,
    eliminar,
} from "../controllers/cotizaciones.controller";


const router = Router();


// =========================================================
// COTIZACIONES
// =========================================================

// GET /api/cotizaciones
router.get(
    "/",
    listar
);

// GET /api/cotizaciones/proveedor/:id
router.get(
    "/proveedor/:id",
    listarPorProveedor
);


// GET /api/cotizaciones/:id
router.get(
    "/:id",
    obtener
);


// POST /api/cotizaciones
router.post(
    "/",
    crear
);


// PUT /api/cotizaciones/:id
router.put(
    "/:id",
    actualizar
);


// DELETE /api/cotizaciones/:id
router.delete(
    "/:id",
    eliminar
);

export default router;