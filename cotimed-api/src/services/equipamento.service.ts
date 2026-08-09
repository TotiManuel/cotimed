import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface CrearEquipamientoData {
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
}

export const crearEquipamiento = async (
  data: CrearEquipamientoData
) => {
  return await prisma.equipamiento.create({
    data: {
      id_proveedor: data.id_proveedor,
      nombre_equipamiento: data.nombre_equipamiento,
      marca_equipamiento: data.marca_equipamiento,
      modelo_equipamiento: data.modelo_equipamiento,
      categoria_equipamiento: data.categoria_equipamiento,
      descripcion_equipamiento: data.descripcion_equipamiento,
      precio_unitario_equipamiento:
        data.precio_unitario_equipamiento,
      plazo_entrega_dias: data.plazo_entrega_dias,
      garantia_meses: data.garantia_meses,
      incluye: data.incluye,
      especificaciones_equipamiento:
        data.especificaciones_equipamiento,
    },
  });
};

export const listarEquipamientos = async () => {
  return await prisma.equipamiento.findMany({
    orderBy: {
      id_equipamiento: "desc",
    },
  });
};

export const obtenerEquipamiento = async (
  id: number
) => {
  return await prisma.equipamiento.findUnique({
    where: {
      id_equipamiento: id,
    },
  });
};

export const listarEquipamientosPorProveedor = async (
  id_proveedor: number
) => {
  return await prisma.equipamiento.findMany({
    where: {
      id_proveedor: id_proveedor,
    },
    orderBy: {
      id_equipamiento: "desc",
    },
  });
};

export const actualizarEquipamiento = async (
  id: number,
  data: Partial<CrearEquipamientoData>
) => {
  return await prisma.equipamiento.update({
    where: {
      id_equipamiento: id,
    },
    data: {
      ...data,
    },
  });
};

export const eliminarEquipamiento = async (
  id: number
) => {
  return await prisma.equipamiento.delete({
    where: {
      id_equipamiento: id,
    },
  });
};