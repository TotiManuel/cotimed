import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CrearEquipamentoData {
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
}

export const crearEquipamento = async (
  data: CrearEquipamentoData
) => {
  return await prisma.equipamento.create({
    data: {
      id_proveedor: data.id_proveedor,
      nombre_equipamento: data.nombre_equipamento,
      marca_equipamento: data.marca_equipamento,
      modelo_equipamento: data.modelo_equipamento,
      categoria_equipamento: data.categoria_equipamento,
      descripcion_equipamento: data.descripcion_equipamento,
      precio_unitario_equipamento:
        data.precio_unitario_equipamento,
      plazo_entrega_dias: data.plazo_entrega_dias,
      garantia_meses: data.garantia_meses,
      incluye: data.incluye,
      especificaciones_equipamento:
        data.especificaciones_equipamento,
    },
  });
};

export const listarEquipamentos = async () => {
  return await prisma.equipamento.findMany({
    orderBy: {
      id_equipamento: "desc",
    },
  });
};

export const obtenerEquipamento = async (
  id: number
) => {
  return await prisma.equipamento.findUnique({
    where: {
      id_equipamento: id,
    },
  });
};

export const listarEquipamentosPorProveedor = async (
  id_proveedor: number
) => {
  return await prisma.equipamento.findMany({
    where: {
      id_proveedor: id_proveedor,
    },
    orderBy: {
      id_equipamento: "desc",
    },
  });
};

export const actualizarEquipamento = async (
  id: number,
  data: Partial<CrearEquipamentoData>
) => {
  return await prisma.equipamento.update({
    where: {
      id_equipamento: id,
    },
    data: {
      ...data,
    },
  });
};

export const eliminarEquipamento = async (
  id: number
) => {
  return await prisma.equipamento.delete({
    where: {
      id_equipamento: id,
    },
  });
};