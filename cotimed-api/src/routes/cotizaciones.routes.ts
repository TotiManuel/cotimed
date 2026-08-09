import {
    Router
} from "express";

import {
    listar,
    buscar,
    listarPorSolicitud,
    listarPorProveedor,
    crear,
    actualizar,
    eliminar,
    agregarIncluye,
    eliminarIncluye
} from "../controllers/cotizaciones.controller";


const router =
    Router();



/*
 * ==========================================
 * LISTAR TODAS LAS COTIZACIONES
 * ==========================================
 *
 * GET /api/cotizaciones
 */

router.get(
    "/",
    listar
);



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UNA SOLICITUD
 * ==========================================
 *
 * GET /api/cotizaciones/solicitud/:id
 */

router.get(
    "/solicitud/:id",
    listarPorSolicitud
);



/*
 * ==========================================
 * LISTAR COTIZACIONES DE UN PROVEEDOR
 * ==========================================
 *
 * GET /api/cotizaciones/proveedor/:id
 */

router.get(
    "/proveedor/:id",
    listarPorProveedor
);



/*
 * ==========================================
 * BUSCAR COTIZACIÓN POR ID
 * ==========================================
 *
 * GET /api/cotizaciones/:id
 */

router.get(
    "/:id",
    buscar
);



/*
 * ==========================================
 * CREAR COTIZACIÓN
 * ==========================================
 *
 * POST /api/cotizaciones
 */

router.post(
    "/",
    crear
);



/*
 * ==========================================
 * ACTUALIZAR COTIZACIÓN
 * ==========================================
 *
 * PUT /api/cotizaciones/:id
 */

router.put(
    "/:id",
    actualizar
);



/*
 * ==========================================
 * ELIMINAR COTIZACIÓN
 * ==========================================
 *
 * DELETE /api/cotizaciones/:id
 */

router.delete(
    "/:id",
    eliminar
);



/*
 * ==========================================
 * AGREGAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * POST /api/cotizaciones/:id/incluye
 */

router.post(
    "/:id/incluye",
    agregarIncluye
);



/*
 * ==========================================
 * ELIMINAR ELEMENTO INCLUIDO
 * ==========================================
 *
 * DELETE /api/cotizaciones/incluye/:id
 */

router.delete(
    "/incluye/:id",
    eliminarIncluye
);



export default router;
