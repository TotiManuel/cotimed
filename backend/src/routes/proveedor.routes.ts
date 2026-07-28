import { Router } from "express";

import {

    obtenerProveedores,
    obtenerProveedor,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor

} from "../controllers/proveedor.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { permitirRoles } from "../middlewares/role.middleware";
import { obtenerDashboardProveedor } from "../controllers/proveedor.controller";

const router = Router();



router.get(
    "/",
    obtenerProveedores
);



router.get(
    "/:id",
    obtenerProveedor
);



router.post(
    "/",
    crearProveedor
);



router.put(
    "/:id",
    actualizarProveedor
);



router.delete(
    "/:id",
    eliminarProveedor
);

router.get(
    "/dashboard",
    verificarToken,
    permitirRoles("PROVEEDOR"),
    obtenerDashboardProveedor
);

export default router;