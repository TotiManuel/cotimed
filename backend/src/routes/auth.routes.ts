import { Router } from "express";

import {
    registroInstitucion,
    registerProveedor,
    login
} from "../controllers/auth.controller";


const router = Router();



router.post(
    "/registro/institucion",
    registroInstitucion
);



router.post(
    "/register/proveedor",
    registerProveedor
);



router.post(
    "/login",
    login
);



export default router;