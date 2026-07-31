import { Router } from "express";

import {
    registerInstitucion,
    registerProveedor,
    login
} from "../controllers/auth.controller";


const router = Router();



router.post(
    "/register/institucion",
    registerInstitucion
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