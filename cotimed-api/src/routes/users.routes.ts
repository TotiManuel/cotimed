import { Router } from "express";

import { 
    getUsers,
    createUser
} from "../controllers/user.controller";

import { authenticate } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";


const router = Router();



router.get(
    "/",
    authenticate,
    allowRoles(["admin"]),
    getUsers
);



router.post(
    "/",
    createUser
);



export default router;