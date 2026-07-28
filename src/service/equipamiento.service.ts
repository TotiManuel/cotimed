import axios from "axios";

import type {
  Equipamiento,
  FormEquipamiento
} from "../types/Equipamiento";

const API = "http://localhost:3000/api/equipamientos";

export const obtenerEquipamientos = async (): Promise<Equipamiento[]> => {

  const { data } = await axios.get(API);

  return data;

};

export const obtenerEquipamiento = async (
  id:number
):Promise<Equipamiento>=>{

  const { data } = await axios.get(`${API}/${id}`);

  return data;

};

export const crearEquipamiento = async (

  datos:FormEquipamiento

):Promise<Equipamiento>=>{

  const { data } = await axios.post(API, datos);

  return data;

};

export const actualizarEquipamiento = async (

  id:number,

  datos:FormEquipamiento

):Promise<Equipamiento>=>{

  const { data } = await axios.put(

    `${API}/${id}`,

    datos

  );

  return data;

};

export const eliminarEquipamiento = async (

  id:number

):Promise<void>=>{

  await axios.delete(`${API}/${id}`);

};