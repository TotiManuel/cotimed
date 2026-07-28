export interface Equipamiento {

  id: number;

  proveedorId: number;

  nombre: string;

  descripcion?: string;

  categoria: string;

  marca?: string;

  modelo?: string;

  precio?: number;

  moneda: string;

  stock: number;

  imagen?: string;

  activo: boolean;

  fechaCreacion: string;

  updatedAt: string;

}


export type FormEquipamiento = Omit<

  Equipamiento,

  "id" |
  "fechaCreacion" |
  "updatedAt"

>;