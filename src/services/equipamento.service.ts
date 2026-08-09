
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

export interface CrearEquipamentoData {
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

interface EquipamentoAPI {
  id_equipamento: number;
  id_proveedor: number;

  nombre_equipamento: string;
  marca_equipamento: string;
  modelo_equipamento: string;
  categoria_equipamento: string;
  descripcion_equipamento: string;

  precio_unitario_equipamento: number;
  plazo_entrega_dias: number;
  garantia_meses: number;

  incluye: string[];
  especificaciones_equipamento: string;

  createdAt?: string;
}

const transformarEquipamento = (
  equipo: EquipamentoAPI
): EquipoCatalogo => {
  return {
    id: String(equipo.id_equipamento),

    proveedorId: String(equipo.id_proveedor),

    nombre: equipo.nombre_equipamento ?? "",
    marca: equipo.marca_equipamento ?? "",
    modelo: equipo.modelo_equipamento ?? "",
    categoria: equipo.categoria_equipamento ?? "",
    descripcion: equipo.descripcion_equipamento ?? "",

    precioUnitario:
      Number(equipo.precio_unitario_equipamento) || 0,

    plazoEntregaDias:
      Number(equipo.plazo_entrega_dias) || 0,

    garantiaMeses:
      Number(equipo.garantia_meses) || 0,

    incluye:
      Array.isArray(equipo.incluye)
        ? equipo.incluye
        : [],

    especificaciones:
      equipo.especificaciones_equipamento ?? "",

    createdAt:
      equipo.createdAt
  };
};

export const crearEquipamento = async (
  data: CrearEquipamentoData
): Promise<EquipoCatalogo> => {
  const response = await api.post(
    "/equipamentos",
    {
      id_proveedor: Number(data.proveedorId),

      nombre_equipamento:
        data.nombre,

      marca_equipamento:
        data.marca,

      modelo_equipamento:
        data.modelo,

      categoria_equipamento:
        data.categoria,

      descripcion_equipamento:
        data.descripcion,

      precio_unitario_equipamento:
        Number(data.precioUnitario),

      plazo_entrega_dias:
        Number(data.plazoEntregaDias),

      garantia_meses:
        Number(data.garantiaMeses),

      incluye:
        data.incluye,

      especificaciones_equipamento:
        data.especificaciones
    }
  );

  return transformarEquipamento(
    response as EquipamentoAPI
  );
};

export const listarEquipamentos = async (): Promise<
  EquipoCatalogo[]
> => {
  const response = await api.get(
    "/equipamentos"
  );

  const equipamentos =
    response as EquipamentoAPI[];

  return equipamentos.map(
    transformarEquipamento
  );
};

export const obtenerEquipamento = async (
  id: string
): Promise<EquipoCatalogo> => {
  const response = await api.get(
    `/equipamentos/${id}`
  );

  return transformarEquipamento(
    response as EquipamentoAPI
  );
};

export const buscarEquipamento =
  obtenerEquipamento;

export const listarEquipamentosPorProveedor =
  async (
    proveedorId: string
  ): Promise<EquipoCatalogo[]> => {
    const response = await api.get(
      `/equipamentos/proveedor/${proveedorId}`
    );

    const equipamentos =
      response as EquipamentoAPI[];

    return equipamentos.map(
      transformarEquipamento
    );
  };

export const actualizarEquipamiento = async (
  id: string,
  data: Partial<CrearEquipamentoData>
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

  const response =
    await api.put(
      `/equipamentos/${id}`,
      body
    );

  return transformarEquipamento(
    response as EquipamentoAPI
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
    `/equipamentos/${id}`
  );

};


/*
 * ================================
 * ALIAS PARA COMPATIBILIDAD
 * ================================
 */

export const eliminarEquipamento =
  eliminarEquipamiento;
