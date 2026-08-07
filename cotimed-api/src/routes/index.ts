import { Router } from "express";

import usersRoutes from "./users.routes";
import authRoutes from "./auth.routes";


const router = Router();



router.get("/",(_,res)=>{

    res.json({
        message:"API CotiMed funcionando!"
    });

});



router.use("/users", usersRoutes);

router.use("/auth", authRoutes);



export default router;