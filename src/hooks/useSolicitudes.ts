import { useEffect, useState } from "react";

import type {
  Solicitud,
  FormSolicitud
} from "../types/Solicitud";

import {

  obtenerSolicitudes,

  crearSolicitud,

  actualizarSolicitud,

  eliminarSolicitud

} from "../service/solicitud.service";



export const useSolicitudes = () => {

  const [solicitudes, setSolicitudes] =

    useState<Solicitud[]>([]);



  const [cargando, setCargando] =

    useState(true);




  const cargar = async () => {

    try {

      setCargando(true);

      const data = await obtenerSolicitudes();

      setSolicitudes(data);

    } catch (error) {

      console.error(

        "Error cargando solicitudes:",

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

    datos: FormSolicitud

  ) => {

    await crearSolicitud(datos);

    await cargar();

  };




  const actualizar = async (

    id: number,

    datos: FormSolicitud

  ) => {

    await actualizarSolicitud(

      id,

      datos

    );

    await cargar();

  };




  const eliminar = async (

    id: number

  ) => {

    await eliminarSolicitud(id);

    await cargar();

  };




  return {

    solicitudes,

    cargando,

    cargar,

    crear,

    actualizar,

    eliminar

  };

};