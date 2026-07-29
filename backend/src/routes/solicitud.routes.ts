import { Router } from "express";

import {

    obtenerSolicitudesInstitucion,
    crearSolicitud,
    actualizarSolicitud,
    eliminarSolicitud

} from "../controllers/solicitud.controller";


import { verificarToken } from "../middlewares/auth.middleware";

import { permitirRoles } from "../middlewares/role.middleware";


const router = Router();



router.get(

    "/",

    verificarToken,

    permitirRoles(
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





router.put(

    "/:id",

    verificarToken,

    permitirRoles(
        "INSTITUCION",
        "EMPLEADO"
    ),

    actualizarSolicitud

);





router.delete(

    "/:id",

    verificarToken,

    permitirRoles(
        "INSTITUCION",
        "EMPLEADO"
    ),

    eliminarSolicitud

);



export default router;