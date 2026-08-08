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


/*
 * GET /api/proveedores
 * Listar todos los proveedores
 */
router.get(
    "/",
    listar
);


/*
 * GET /api/proveedores/buscar?q=texto
 * Buscar proveedores
 *
 * IMPORTANTE:
 * Esta ruta debe estar antes de /:id
 */
router.get(
    "/buscar",
    buscar
);


/*
 * GET /api/proveedores/:id
 * Obtener proveedor por ID
 */
router.get(
    "/:id",
    obtener
);


/*
 * POST /api/proveedores
 * Crear proveedor
 */
router.post(
    "/",
    crear
);


/*
 * PUT /api/proveedores/:id
 * Actualizar proveedor
 */
router.put(
    "/:id",
    actualizar
);


/*
 * DELETE /api/proveedores/:id
 * Eliminar proveedor
 */
router.delete(
    "/:id",
    eliminar
);


export default router;