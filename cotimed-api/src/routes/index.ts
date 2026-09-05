import { Router } from "express";

import authRoutes from "./auth.routes";
import institucionesRoutes from "./instituciones.routes";
import proveedoresRoutes from "./proveedores.routes";
import solicitudRoutes from "./solicitud.routes";
import cotizacionesRoutes from "./cotizacion.routes";

const router = Router();



router.get("/",(_,res)=>{

    res.json({
        message:"API CotiMed funcionando!"
    });

});


router.use("/auth", authRoutes);

router.use("/instituciones", institucionesRoutes);

router.use("/proveedores", proveedoresRoutes);

router.use("/solicitudes", solicitudRoutes);

router.use("/cotizaciones", cotizacionesRoutes);

export default router; 