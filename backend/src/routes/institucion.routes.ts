import { Router } from "express";

import {

    obtenerInstituciones,
    crearInstitucion

} from "../controllers/institucion.controller";


const router = Router();



router.get(
    "/",
    obtenerInstituciones
);



router.post(
    "/",
    crearInstitucion
);

import {
    obtenerDashboardInstitucion
} from "../controllers/institucion.controller";


import {
    verificarToken
} from "../middlewares/auth.middleware";


import {
    permitirRoles
} from "../middlewares/role.middleware";



router.get(
    "/dashboard",
    verificarToken,
    permitirRoles(
        "INSTITUCION",
        "EMPLEADO"
    ),
    obtenerDashboardInstitucion
);

export default router;