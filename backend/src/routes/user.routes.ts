import { Router } from "express";


import {

    obtenerUsuarios,

    obtenerUsuario,

    crearUsuario,

    actualizarUsuario,

    eliminarUsuario,

    obtenerPerfil


} from "../controllers/user.controller";


import { verificarToken } from "../middlewares/auth.middleware";

import { permitirRoles } from "../middlewares/role.middleware";

import { obtenerDashboardAdmin } from "../controllers/admin.controller";



const router = Router();




// DASHBOARD ADMIN


router.get(

    "/dashboard",

    verificarToken,

    permitirRoles("ADMIN"),

    obtenerDashboardAdmin

);

// PERFIL PROPIO
router.get(

    "/me",

    verificarToken,

    obtenerPerfil

);

// LISTAR USUARIOS

// Solo administrador


router.get(

    "/",

    verificarToken,

    permitirRoles("ADMIN"),

    obtenerUsuarios

);

// VER USUARIO

// Solo administrador


router.get(

    "/:id",

    verificarToken,

    permitirRoles("ADMIN"),

    obtenerUsuario

);

// CREAR USUARIO

router.post(

    "/",

    verificarToken,

    permitirRoles("ADMIN"),

    crearUsuario

);

// ACTUALIZAR USUARIO

router.put(

    "/:id",

    verificarToken,

    permitirRoles("ADMIN"),

    actualizarUsuario

);

// ELIMINAR USUARIO


router.delete(

    "/:id",

    verificarToken,

    permitirRoles("ADMIN"),

    eliminarUsuario

);

export default router;