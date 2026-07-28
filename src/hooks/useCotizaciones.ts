import { useEffect, useState } from "react";

import type {
  Cotizacion,
  FormCotizacion
} from "../types/Cotizacion";

import {

  obtenerCotizaciones,

  crearCotizacion,

  actualizarCotizacion,

  eliminarCotizacion

} from "../service/cotizacion.service";

export const useCotizaciones = () => {

  const [cotizaciones, setCotizaciones] =

    useState<Cotizacion[]>([]);

  const [cargando, setCargando] =

    useState(true);

  const cargar = async () => {

    try {

      setCargando(true);

      const data = await obtenerCotizaciones();

      setCotizaciones(data);

    } catch (error) {

      console.error(

        "Error cargando cotizaciones:",

        error

      );

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {

    cargar();

  }, []);

  const crear = async (

    datos: FormCotizacion

  ) => {

    await crearCotizacion(datos);

    await cargar();

  };

  const actualizar = async (

    id: number,

    datos: FormCotizacion

  ) => {

    await actualizarCotizacion(

      id,

      datos

    );

    await cargar();

  };

  const eliminar = async (

    id: number

  ) => {

    await eliminarCotizacion(id);

    await cargar();

  };

  return {

    cotizaciones,

    cargando,

    cargar,

    crear,

    actualizar,

    eliminar

  };

};