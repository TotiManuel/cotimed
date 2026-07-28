import axios from "axios";

import type {
  Cotizacion,
  FormCotizacion
} from "../types/Cotizacion";

const API = "http://localhost:3000/api/cotizaciones";



export const obtenerCotizaciones = async (): Promise<Cotizacion[]> => {

  const { data } = await axios.get(API);

  return data;

};



export const obtenerCotizacion = async (
  id: number
): Promise<Cotizacion> => {

  const { data } = await axios.get(`${API}/${id}`);

  return data;

};



export const crearCotizacion = async (
  datos: FormCotizacion
): Promise<Cotizacion> => {

  const { data } = await axios.post(API, datos);

  return data;

};



export const actualizarCotizacion = async (
  id: number,
  datos: FormCotizacion
): Promise<Cotizacion> => {

  const { data } = await axios.put(
    `${API}/${id}`,
    datos
  );

  return data;

};



export const eliminarCotizacion = async (
  id: number
): Promise<void> => {

  await axios.delete(`${API}/${id}`);

};