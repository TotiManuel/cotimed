import { Router } from "express";

import {

  obtenerResumen,

  solicitudesReporte,

  cotizacionesReporte,

  equipamientosReporte,

  proveedoresReporte

} from "../controllers/reporte.controller";



const router = Router();



router.get(

  "/resumen",

  obtenerResumen

);



router.get(

  "/solicitudes",

  solicitudesReporte

);



router.get(

  "/cotizaciones",

  cotizacionesReporte

);



router.get(

  "/equipamientos",

  equipamientosReporte

);



router.get(

  "/proveedores",

  proveedoresReporte

);



export default router;