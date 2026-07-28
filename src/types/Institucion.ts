export interface Institucion {

  id: number;

  nombre: string;

  nombreComercial?: string;

  cuit?: string;

  telefono?: string;

  direccion?: string;

  ciudad?: string;

  provincia?: string;

  administrador?: string;

  email?: string;

  solicitudes?: number;

  fechaCreacion?: string;

  estado?: 
    | "ACTIVO"
    | "PENDIENTE"
    | "SUSPENDIDO";

}

export interface InstitucionForm {

  nombre: string;

  nombreComercial: string;

  cuit: string;

  telefono: string;

  direccion: string;

  ciudad: string;

  provincia: string;

}