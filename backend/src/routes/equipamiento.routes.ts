import { Router } from "express";

import {

    obtenerEquipamientos,
    obtenerEquipamiento,
    crearEquipamiento,
    actualizarEquipamiento,
    eliminarEquipamiento

} from "../controllers/equipamiento.controller";
import { verificarToken } from "../middlewares/auth.middleware";
import { permitirRoles } from "../middlewares/role.middleware";


const router = Router();



router.get(
    "/",
    obtenerEquipamientos
);



router.get(
    "/:id",
    obtenerEquipamiento
);



router.post(
    "/",
    verificarToken,
    permitirRoles("PROVEEDOR"),
    crearEquipamiento
);



router.put(
    "/:id",
    actualizarEquipamiento
);



router.delete(
    "/:id",
    eliminarEquipamiento
);



export default router;