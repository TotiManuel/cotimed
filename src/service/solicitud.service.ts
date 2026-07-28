import axios from "axios";

import type {
  Solicitud,
  FormSolicitud
} from "../types/Solicitud";

const API = "http://localhost:3000/api/solicitudes";



export const obtenerSolicitudes = async (): Promise<Solicitud[]> => {

  const { data } = await axios.get(API);

  return data;

};



export const obtenerSolicitud = async (
  id: number
): Promise<Solicitud> => {

  const { data } = await axios.get(`${API}/${id}`);

  return data;

};



export const crearSolicitud = async (
  datos: FormSolicitud
): Promise<Solicitud> => {

  const { data } = await axios.post(API, datos);

  return data;

};



export const actualizarSolicitud = async (
  id: number,
  datos: FormSolicitud
): Promise<Solicitud> => {

  const { data } = await axios.put(
    `${API}/${id}`,
    datos
  );

  return data;

};



export const eliminarSolicitud = async (
  id: number
): Promise<void> => {

  await axios.delete(`${API}/${id}`);

};