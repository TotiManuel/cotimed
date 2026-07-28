import { useEffect, useState } from "react";

import type {
  Institucion,
  InstitucionForm
} from "../types/Institucion";

import {
  obtenerInstituciones,
  crearInstitucion,
  actualizarInstitucion,
  eliminarInstitucion
} from "../service/institucion.service";



export const useInstituciones = () => {


  const [instituciones,setInstituciones] =
    useState<Institucion[]>([]);



  const [cargando,setCargando] =
    useState(true);



  const cargar = async()=>{

    try{

      setCargando(true);


      const data =
        await obtenerInstituciones();


      setInstituciones(data);


    }catch(error){

      console.error(
        "Error cargando instituciones:",
        error
      );


    }finally{

      setCargando(false);

    }

  };



  useEffect(()=>{

    cargar();

  },[]);





  const crear = async(
    datos:InstitucionForm
  )=>{


    await crearInstitucion(datos);


    await cargar();


  };





  const actualizar = async(

    id:number,

    datos:InstitucionForm

  )=>{


    await actualizarInstitucion(

      id,

      datos

    );


    await cargar();


  };






  const eliminar = async(

    id:number

  )=>{


    await eliminarInstitucion(id);


    await cargar();


  };






  return {


    instituciones,

    cargando,


    cargar,

    crear,

    actualizar,

    eliminar


  };


};