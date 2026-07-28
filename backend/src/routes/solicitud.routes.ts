import { Router } from "express";


import {

    obtenerSolicitudes,
    crearSolicitud

} from "../controllers/solicitud.controller";
import { verificarToken } from "../middlewares/auth.middleware";
import { permitirRoles } from "../middlewares/role.middleware";

const router = Router();

router.get(
    "/",
    obtenerSolicitudes
);

router.post(
    "/",
    verificarToken,
    permitirRoles(
        "INSTITUCION",
        "EMPLEADO"
    ),
    crearSolicitud
);



export default router;