import { Router } from "express";

import usersRoutes from "./users.routes";
import authRoutes from "./auth.routes";
import institucionesRoutes from "./instituciones.routes";
import proveedoresRoutes from "./proveedores.routes";


const router = Router();



router.get("/",(_,res)=>{

    res.json({
        message:"API CotiMed funcionando!"
    });

});



router.use("/users", usersRoutes);

router.use("/auth", authRoutes);

router.use("/instituciones", institucionesRoutes);

router.use("/proveedores", proveedoresRoutes);

export default router;