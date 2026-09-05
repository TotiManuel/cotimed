 import { Router } from "express";

import {
    listaCotizaciones,
    listaCotizacionesPorEstado,
    buscaCotizacionByID,
    creaCotizacion,
    actualizaCotizacion,
    eliminaCotizacion
} from "../controllers/cotizacion.controller";

const router = Router();

// GET - Listar todas las cotizaciones
router.get("/", listaCotizaciones);

// GET - Listar cotizaciones por estado
router.get("/estado/:estado", listaCotizacionesPorEstado);

// GET - Buscar cotización por ID
router.get("/:id", buscaCotizacionByID);

// POST - Crear cotización
router.post("/", creaCotizacion);

// PUT - Actualizar cotización
router.put("/:id", actualizaCotizacion);

// DELETE - Eliminar cotización
router.delete("/:id", eliminaCotizacion);

export default router;
