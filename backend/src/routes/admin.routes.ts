import { Router } from "express";

import {
    obtenerDashboardAdmin
} from "../controllers/admin.controller";


import { verificarToken } from "../middlewares/auth.middleware";


const router = Router();



router.get(
    "/dashboard",
    verificarToken,
    obtenerDashboardAdmin
);



export default router;