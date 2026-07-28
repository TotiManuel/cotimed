import { Router } from "express";

import { obtenerDashboardInstitucion } from "../controllers/dashboardInstitucion.controller";
import { obtenerDashboardProveedor } from "../controllers/dashboardProveedor.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { permitirRoles } from "../middlewares/role.middleware";

const router = Router();
router.get(
  "/institucion",
  verificarToken,
  permitirRoles("INSTITUCION", "EMPLEADO"),
  obtenerDashboardInstitucion
);

router.get(
  "/proveedor",
  verificarToken,
  permitirRoles("PROVEEDOR"),
  obtenerDashboardProveedor
);

export default router;