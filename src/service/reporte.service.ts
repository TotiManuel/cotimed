import axios from "axios";

import type {
  Reportes,
  ReporteResumen,
  SolicitudesPorEstado,
  CotizacionesPorEstado,
  EquipamientoPorCategoria,
  ProveedorRanking
} from "../types/Reporte";


const API = "http://localhost:3000/api/reportes";



export const obtenerResumen = async (): Promise<ReporteResumen> => {

  const { data } = await axios.get(
    `${API}/resumen`
  );

  return data;

};




export const obtenerSolicitudesReporte = async (): Promise<
  SolicitudesPorEstado[]
> => {

  const { data } = await axios.get(
    `${API}/solicitudes`
  );

  return data;

};




export const obtenerCotizacionesReporte = async (): Promise<
  CotizacionesPorEstado[]
> => {

  const { data } = await axios.get(
    `${API}/cotizaciones`
  );

  return data;

};




export const obtenerEquipamientosReporte = async (): Promise<
  EquipamientoPorCategoria[]
> => {

  const { data } = await axios.get(
    `${API}/equipamientos`
  );

  return data;

};




export const obtenerProveedoresReporte = async (): Promise<
  ProveedorRanking[]
> => {

  const { data } = await axios.get(
    `${API}/proveedores`
  );

  return data;

};




export const obtenerReportes = async (): Promise<Reportes> => {

  const [

    resumen,

    solicitudesEstado,

    cotizacionesEstado,

    equipamientosCategoria,

    proveedoresRanking

  ] = await Promise.all([

    obtenerResumen(),

    obtenerSolicitudesReporte(),

    obtenerCotizacionesReporte(),

    obtenerEquipamientosReporte(),

    obtenerProveedoresReporte()

  ]);



  return {

    resumen,

    solicitudesEstado,

    cotizacionesEstado,

    equipamientosCategoria,

    proveedoresRanking

  };

};