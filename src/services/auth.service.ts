import api from "../api/api";

export interface RegistroInstitucion {
  nombreInstitucion: string;
  email: string;
  telefono?: string;
  password: string;
}

export interface RegistroProveedor {
  nombreEmpresa: string;
  razonSocial?: string;
  email: string;
  telefono?: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registrarInstitucion = (data: RegistroInstitucion) =>
  api.post("/auth/register/institucion", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registrarProveedor = (data: RegistroProveedor) =>
  api.post("/auth/register/proveedor", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data: LoginData) =>
  api.post("/auth/login", data);