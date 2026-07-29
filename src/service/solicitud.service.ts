import { api } from "../api/api";

import type {
  Solicitud,
  FormSolicitud
} from "../types/Solicitud";



const ENDPOINT = "/solicitudes";




export const obtenerSolicitudes = async (): Promise<Solicitud[]> => {


  const data = await api(
    ENDPOINT,
    {
      method: "GET"
    }
  );


  return data;

};





export const obtenerSolicitud = async (
  id:number
): Promise<Solicitud> => {


  const data = await api(
    `${ENDPOINT}/${id}`,
    {
      method:"GET"
    }
  );


  return data;

};





export const crearSolicitud = async (
  datos:FormSolicitud
): Promise<Solicitud> => {


  const data = await api(

    ENDPOINT,

    {
      method:"POST",

      body: JSON.stringify(datos)

    }

  );


  return data;

};





export const actualizarSolicitud = async (

  id:number,

  datos:FormSolicitud

): Promise<Solicitud> => {


  const data = await api(

    `${ENDPOINT}/${id}`,

    {

      method:"PUT",

      body:JSON.stringify(datos)

    }

  );


  return data;

};





export const eliminarSolicitud = async (

  id:number

): Promise<void> => {


  await api(

    `${ENDPOINT}/${id}`,

    {

      method:"DELETE"

    }

  );


};