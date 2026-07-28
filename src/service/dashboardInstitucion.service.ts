import { api } from "../api/api";

export const obtenerDashboardInstitucion = async () => {
  return await api("/dashboard/institucion");
};