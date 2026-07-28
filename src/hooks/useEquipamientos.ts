import { useEffect, useState } from "react";

import type {
  Equipamiento,
  FormEquipamiento
} from "../types/Equipamiento";

import {

  obtenerEquipamientos,

  crearEquipamiento,

  actualizarEquipamiento,

  eliminarEquipamiento

} from "../service/equipamiento.service";



export const useEquipamientos = () => {



  const [equipamientos, setEquipamientos] =

    useState<Equipamiento[]>([]);



  const [cargando, setCargando] =

    useState(true);




  const cargar = async () => {

    try {

      setCargando(true);

      const data = await obtenerEquipamientos();

      setEquipamientos(data);

    } catch (error) {

      console.error(

        "Error cargando equipamientos:",

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

    datos: FormEquipamiento

  ) => {

    await crearEquipamiento(datos);

    await cargar();

  };




  const actualizar = async (

    id: number,

    datos: FormEquipamiento

  ) => {

    await actualizarEquipamiento(

      id,

      datos

    );

    await cargar();

  };




  const eliminar = async (

    id: number

  ) => {

    await eliminarEquipamiento(id);

    await cargar();

  };




  return {

    equipamientos,

    cargando,

    cargar,

    crear,

    actualizar,

    eliminar

  };

};