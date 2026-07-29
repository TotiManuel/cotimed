import { Router } from "express";


import {

    obtenerSolicitudesInstitucion,
    crearSolicitud

} from "../controllers/solicitud.controller";


import { verificarToken } from "../middlewares/auth.middleware";
import { permitirRoles } from "../middlewares/role.middleware";


const router = Router();



router.get(

    "/",

    verificarToken,

    permitirRoles(
        "ADMIN",
        "INSTITUCION",
        "EMPLEADO"
    ),

    obtenerSolicitudesInstitucion

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