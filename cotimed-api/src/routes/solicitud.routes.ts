import { Router } from "express";

import {
    listaSolicitudes,
    listaPorEstado,
    buscaSolicitudByID,
    creaSolicitud,
    actualizaSolicitud,
    eliminaCotizacion
} from "../controllers/solicitud.controller";

const router = Router();

// GET - Listar todas las solicitudes
router.get("/", listaSolicitudes);

// GET - Listar solicitudes por estado
router.get("/estado/:estado", listaPorEstado);

// GET - Buscar solicitud por ID
router.get("/:id", buscaSolicitudByID);

// POST - Crear solicitud
router.post("/", creaSolicitud);

// PUT - Actualizar solicitud
router.put("/:id", actualizaSolicitud);

// DELETE - Eliminar solicitud
router.delete("/:id", eliminaCotizacion);

export default router;