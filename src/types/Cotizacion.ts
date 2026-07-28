export type EstadoCotizacion =
  | "ENVIADA"
  | "ACEPTADA"
  | "RECHAZADA"
  | "CANCELADA";

export interface Cotizacion {

  id: number;

  solicitudId: number;

  proveedorId: number;

  precio: number;

  moneda: string;

  tiempoEntrega?: string;

  garantia?: string;

  observaciones?: string;

  incluyeEnvio: boolean;

  estado: EstadoCotizacion;

  fechaCreacion: string;

  updatedAt: string;

}

export type FormCotizacion = Omit<
  Cotizacion,
  "id" |
  "fechaCreacion" |
  "updatedAt"
>;