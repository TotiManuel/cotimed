import { useEffect, useState } from "react";

import type {
  Reportes
} from "../types/Reporte";

import {
  obtenerReportes
} from "../service/reporte.service";


export const useReportes = () => {


  const [reportes, setReportes] =

    useState<Reportes | null>(null);



  const [cargando, setCargando] =

    useState(true);



  const [error, setError] =

    useState<string | null>(null);





  const cargar = async () => {


    try {


      setCargando(true);

      setError(null);



      const data = await obtenerReportes();



      setReportes(data);



    } catch (error) {


      console.error(

        "Error cargando reportes:",

        error

      );



      setError(

        "No se pudieron cargar los reportes"

      );



    } finally {


      setCargando(false);


    }



  };







  useEffect(() => {


    cargar();


  }, []);







  return {


    reportes,


    cargando,


    error,


    cargar


  };


};