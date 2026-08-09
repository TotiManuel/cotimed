
import api from "../api/api";

/*
 * ================================
 * TIPOS
 * ================================
 */

export interface EquipoCatalogo {
  id: string;
  proveedorId: string;

  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  descripcion: string;

  precioUnitario: number;
  plazoEntregaDias: number;
  garantiaMeses: number;

  incluye: string[];
  especificaciones: string;

  createdAt?: string;
}

export interface CrearEquipamientoData {
  proveedorId: string;

  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  descripcion: string;

  precioUnitario: number;
  plazoEntregaDias: number;
  garantiaMeses: number;

  incluye: string[];
  especificaciones: string;
}

/*
 * ================================
 * FORMATO DE LA API
 * ================================
 */

interface EquipamientoAPI {
  id_equipamiento: number;
  id_proveedor: number;

  nombre_equipamiento: string;
  marca_equipamiento: string;
  modelo_equipamiento: string;
  categoria_equipamiento: string;
  descripcion_equipamiento: string;

  precio_unitario_equipamiento: number;
  plazo_entrega_dias: number;
  garantia_meses: number;

  incluye: string[];
  especificaciones_equipamiento: string;

  createdAt?: string;
}

/*
 * ================================
 * TRANSFORMAR API → FRONTEND
 * ================================
 */

const transformarEquipamiento = (
  equipo: EquipamientoAPI
): EquipoCatalogo => {
  return {
    id: String(equipo.id_equipamiento),

    proveedorId: String(equipo.id_proveedor),

    nombre: equipo.nombre_equipamiento ?? "",
    marca: equipo.marca_equipamiento ?? "",
    modelo: equipo.modelo_equipamiento ?? "",
    categoria: equipo.categoria_equipamiento ?? "",
    descripcion: equipo.descripcion_equipamiento ?? "",

    precioUnitario:
      Number(equipo.precio_unitario_equipamiento) || 0,

    plazoEntregaDias:
      Number(equipo.plazo_entrega_dias) || 0,

    garantiaMeses:
      Number(equipo.garantia_meses) || 0,

    incluye:
      Array.isArray(equipo.incluye)
        ? equipo.incluye
        : [],

    especificaciones:
      equipo.especificaciones_equipamiento ?? "",

    createdAt:
      equipo.createdAt
  };
};

/*
 * ================================
 * CREAR
 * ================================
 */

export const crearEquipamiento = async (
  data: CrearEquipamientoData
): Promise<EquipoCatalogo> => {
  const response = await api.post(
    "/equipamientos",
    {
      id_proveedor: Number(data.proveedorId),

      nombre_equipamiento:
        data.nombre,

      marca_equipamiento:
        data.marca,

      modelo_equipamiento:
        data.modelo,

      categoria_equipamiento:
        data.categoria,

      descripcion_equipamiento:
        data.descripcion,

      precio_unitario_equipamiento:
        Number(data.precioUnitario),

      plazo_entrega_dias:
        Number(data.plazoEntregaDias),

      garantia_meses:
        Number(data.garantiaMeses),

      incluye:
        data.incluye,

      especificaciones_equipamiento:
        data.especificaciones
    }
  );

  return transformarEquipamiento(
    response as EquipamientoAPI
  );
};

/*
 * ================================
 * LISTAR TODOS
 * ================================
 */

export const listarEquipamientos = async (): Promise<
  EquipoCatalogo[]
> => {
  const response = await api.get(
    "/equipamientos"
  );

  const equipamientos =
    response as EquipamientoAPI[];

  return equipamientos.map(
    transformarEquipamiento
  );
};

/*
 * ================================
 * OBTENER POR ID
 * ================================
 */

export const obtenerEquipamiento = async (
  id: string
): Promise<EquipoCatalogo> => {
  const response = await api.get(
    `/equipamientos/${id}`
  );

  return transformarEquipamiento(
    response as EquipamientoAPI
  );
};

/*
 * ================================
 * ALIAS
 * ================================
 *
 * Compatibilidad con:
 *
 * buscarEquipamento(id)
 *
 */

export const buscarEquipamento =
  obtenerEquipamiento;

/*
 * ================================
 * LISTAR POR PROVEEDOR
 * ================================
 */

export const listarEquipamientosPorProveedor =
  async (
    proveedorId: string
  ): Promise<EquipoCatalogo[]> => {
    const response = await api.get(
      `/equipamientos/proveedor/${proveedorId}`
    );

    const equipamientos =
      response as EquipamientoAPI[];

    return equipamientos.map(
      transformarEquipamiento
    );
  };

/*
 * ================================
 * ACTUALIZAR
 * ================================
 */

export const actualizarEquipamiento = async (
  id: string,
  data: Partial<CrearEquipamientoData>
): Promise<EquipoCatalogo> => {
  const body: Record<string, unknown> = {};

  if (data.proveedorId !== undefined) {
    body.id_proveedor =
      Number(data.proveedorId);
  }

  if (data.nombre !== undefined) {
    body.nombre_equipamiento =
      data.nombre;
  }

  if (data.marca !== undefined) {
    body.marca_equipamiento =
      data.marca;
  }

  if (data.modelo !== undefined) {
    body.modelo_equipamiento =
      data.modelo;
  }

  if (data.categoria !== undefined) {
    body.categoria_equipamiento =
      data.categoria;
  }

  if (data.descripcion !== undefined) {
    body.descripcion_equipamiento =
      data.descripcion;
  }

  if (data.precioUnitario !== undefined) {
    body.precio_unitario_equipamiento =
      Number(data.precioUnitario);
  }

  if (data.plazoEntregaDias !== undefined) {
    body.plazo_entrega_dias =
      Number(data.plazoEntregaDias);
  }

  if (data.garantiaMeses !== undefined) {
    body.garantia_meses =
      Number(data.garantiaMeses);
  }

  if (data.incluye !== undefined) {
    body.incluye =
      data.incluye;
  }

  if (data.especificaciones !== undefined) {
    body.especificaciones_equipamiento =
      data.especificaciones;
  }

  const response = await api.put(
    `/equipamientos/${id}`,
    body
  );

  return transformarEquipamiento(
    response as EquipamientoAPI
  );
};

/*
 * ================================
 * ALIAS PARA COMPATIBILIDAD
 * ================================
 */

export const actualizarEquipamento =
  actualizarEquipamiento;

/*
 * ================================
 * ELIMINAR
 * ================================
 */

export const eliminarEquipamiento = async (
  id: string
): Promise<void> => {
  await api.delete(
    `/equipamientos/${id}`
  );
};

/*
 * ================================
 * ALIAS PARA COMPATIBILIDAD
 * ================================
 */

export const eliminarEquipamento =
  eliminarEquipamiento;
