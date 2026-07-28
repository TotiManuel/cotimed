import { api } from "../api/api";

export const obtenerDashboardProveedor = async () => {
  return await api("/dashboard/proveedor");
};