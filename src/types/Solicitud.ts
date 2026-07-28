export type EstadoSolicitud =
  | "PENDIENTE"
  | "ABIERTA"
  | "EN_PROCESO"
  | "COTIZADA"
  | "FINALIZADA"
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

export type FormSolicitud = Omit<
  Solicitud,
  "id" |
  "fechaCreacion" |
  "updatedAt"
>;