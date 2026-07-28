export interface ReporteResumen {

  instituciones: number;

  proveedores: number;

  equipamientos: number;

  solicitudes: number;

  cotizaciones: number;

}


export interface SolicitudesPorEstado {

  estado: string;

  cantidad: number;

}


export interface CotizacionesPorEstado {

  estado: string;

  cantidad: number;

}


export interface EquipamientoPorCategoria {

  categoria: string;

  cantidad: number;

}


export interface ProveedorRanking {

  proveedorId: number;

  nombreEmpresa: string;

  cantidadCotizaciones: number;

}


export interface Reportes {

  resumen: ReporteResumen;

  solicitudesEstado: SolicitudesPorEstado[];

  cotizacionesEstado: CotizacionesPorEstado[];

  equipamientosCategoria: EquipamientoPorCategoria[];

  proveedoresRanking: ProveedorRanking[];

}