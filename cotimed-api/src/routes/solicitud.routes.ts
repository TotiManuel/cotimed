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
/*
 * GET /api/solicitudes
 *
 * Listar todas las solicitudes
 */
router.get(
    "/",
    listar
);
/*
 * GET /api/solicitudes/institucion/:id
 *
 * Listar solicitudes de una institución
 *
 * IMPORTANTE:
 * Esta ruta debe estar antes de /:id
 */
router.get(
    "/institucion/:id",
    listarPorInstitucion
);
/*
 * GET /api/solicitudes/:id
 *
 * Obtener una solicitud específica
 */
router.get(
    "/:id",
    obtener
);
/*
 * POST /api/solicitudes
 *
 * Crear una solicitud
 */
router.post(
    "/",
    crear
);
/*
 * PUT /api/solicitudes/:id
 *
 * Actualizar una solicitud
 */
router.put(
    "/:id",
    actualizar
);
/*
 * DELETE /api/solicitudes/:id
 *
 * Eliminar una solicitud
 */
router.delete(
    "/:id",
    eliminar
);
export default router;