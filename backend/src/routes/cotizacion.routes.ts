import { Router } from "express";


import {

    obtenerCotizaciones,
    obtenerCotizacion,
    crearCotizacion,
    actualizarCotizacion,
    eliminarCotizacion

} from "../controllers/cotizacion.controller";



const router = Router();



router.get(
    "/",
    obtenerCotizaciones
);



router.get(
    "/:id",
    obtenerCotizacion
);



router.post(
    "/",
    crearCotizacion
);



router.put(
    "/:id",
    actualizarCotizacion
);



router.delete(
    "/:id",
    eliminarCotizacion
);



export default router;