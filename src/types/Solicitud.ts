export type EstadoSolicitud =
  | "PENDIENTE"
  | "ENVIADA"
  | "RECIBIENDO_COTIZACIONES"
  | "CERRADA"
  | "CANCELADA";


export interface Solicitud {

  id: number;

  institucionId: number;

  titulo: string;

  descripcion: string;

  categoria: string;

  cantidad: number;

  marcaPreferida?: string;

  modeloPreferido?: string;

  presupuestoMax?: number;

  fechaNecesidad?: string;

  archivoAdjunto?: string;

  estado: EstadoSolicitud;

  fechaCreacion: string;

  updatedAt: string;

}



export type FormSolicitud = {

  titulo: string;

  descripcion: string;

  categoria: string;

  cantidad: number;

  marcaPreferida?: string;

  modeloPreferido?: string;

  presupuestoMax?: number;

  fechaNecesidad?: string;

  archivoAdjunto?: string;

};