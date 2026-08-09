import { Request, Response } from "express";

import {
  crearEquipamiento,
  listarEquipamientos,
  obtenerEquipamiento,
  listarEquipamientosPorProveedor,
  actualizarEquipamiento,
  eliminarEquipamiento,
} from "../services/equipamento.service";

export const crear = async (
  req: Request,
  res: Response
) => {
  try {
    const equipamiento = await crearEquipamiento(req.body);

    res.status(201).json(equipamiento);
  } catch (error) {
    console.error(
      "Error creando equipamiento:",
      error
    );

    res.status(500).json({
      message: "Error creando equipamiento",
    });
  }
};

export const listar = async (
  req: Request,
  res: Response
) => {
  try {
    const equipamientos =
      await listarEquipamientos();

    res.status(200).json(equipamientos);
  } catch (error) {
    console.error(
      "Error obteniendo equipamientos:",
      error
    );

    res.status(500).json({
      message: "Error obteniendo equipamientos",
    });
  }
};

export const obtener = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID de equipamiento inválido",
      });
    }

    const equipamiento =
      await obtenerEquipamiento(id);

    if (!equipamiento) {
      return res.status(404).json({
        message: "Equipamiento no encontrado",
      });
    }

    return res.status(200).json(equipamiento);
  } catch (error) {
    console.error(
      "Error obteniendo equipamiento:",
      error
    );

    return res.status(500).json({
      message: "Error obteniendo equipamiento",
    });
  }
};

export const listarPorProveedor = async (
  req: Request,
  res: Response
) => {
  try {
    const id_proveedor = Number(
      req.params.id_proveedor
    );

    if (isNaN(id_proveedor)) {
      return res.status(400).json({
        message: "ID de proveedor inválido",
      });
    }

    const equipamientos =
      await listarEquipamientosPorProveedor(
        id_proveedor
      );

    return res.status(200).json(equipamientos);
  } catch (error) {
    console.error(
      "Error obteniendo equipamientos del proveedor:",
      error
    );

    return res.status(500).json({
      message:
        "Error obteniendo equipamientos del proveedor",
    });
  }
};

export const actualizar = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID de equipamiento inválido",
      });
    }

    const equipamiento =
      await actualizarEquipamiento(
        id,
        req.body
      );

    return res.status(200).json(equipamiento);
  } catch (error) {
    console.error(
      "Error actualizando equipamiento:",
      error
    );

    return res.status(500).json({
      message: "Error actualizando equipamiento",
    });
  }
};

export const eliminar = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID de equipamiento inválido",
      });
    }

    await eliminarEquipamiento(id);

    return res.status(200).json({
      message: "Equipamiento eliminado correctamente",
    });
  } catch (error) {
    console.error(
      "Error eliminando equipamiento:",
      error
    );

    return res.status(500).json({
      message: "Error eliminando equipamiento",
    });
  }
};