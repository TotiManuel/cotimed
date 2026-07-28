export interface Proveedor {
  id: number;
  nombreEmpresa: string;
  cuit: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  descripcion: string;
  email: string;
  estado: string;
}


export type FormProveedor = Omit<Proveedor, "id">;