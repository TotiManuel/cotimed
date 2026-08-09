import { Request, Response } from "express";

import {
  crearEquipamento,
  listarEquipamentos,
  obtenerEquipamento,
  listarEquipamentosPorProveedor,
  actualizarEquipamento,
  eliminarEquipamento,
} from "../services/equipamento.service";

export const crear = async (
  req: Request,
  res: Response
) => {
  try {
    const equipamento = await crearEquipamento(req.body);

    res.status(201).json(equipamento);
  } catch (error) {
    console.error(
      "Error creando equipamento:",
      error
    );

    res.status(500).json({
      message: "Error creando equipamento",
    });
  }
};

export const listar = async (
  req: Request,
  res: Response
) => {
  try {
    const equipamentos =
      await listarEquipamentos();

    res.status(200).json(equipamentos);
  } catch (error) {
    console.error(
      "Error obteniendo equipamentos:",
      error
    );

    res.status(500).json({
      message: "Error obteniendo equipamentos",
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
        message: "ID de equipamento inválido",
      });
    }

    const equipamento =
      await obtenerEquipamento(id);

    if (!equipamento) {
      return res.status(404).json({
        message: "Equipamento no encontrado",
      });
    }

    return res.status(200).json(equipamento);
  } catch (error) {
    console.error(
      "Error obteniendo equipamento:",
      error
    );

    return res.status(500).json({
      message: "Error obteniendo equipamento",
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

    const equipamentos =
      await listarEquipamentosPorProveedor(
        id_proveedor
      );

    return res.status(200).json(equipamentos);
  } catch (error) {
    console.error(
      "Error obteniendo equipamentos del proveedor:",
      error
    );

    return res.status(500).json({
      message:
        "Error obteniendo equipamentos del proveedor",
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
        message: "ID de equipamento inválido",
      });
    }

    const equipamento =
      await actualizarEquipamento(
        id,
        req.body
      );

    return res.status(200).json(equipamento);
  } catch (error) {
    console.error(
      "Error actualizando equipamento:",
      error
    );

    return res.status(500).json({
      message: "Error actualizando equipamento",
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
        message: "ID de equipamento inválido",
      });
    }

    await eliminarEquipamento(id);

    return res.status(200).json({
      message: "Equipamento eliminado correctamente",
    });
  } catch (error) {
    console.error(
      "Error eliminando equipamento:",
      error
    );

    return res.status(500).json({
      message: "Error eliminando equipamento",
    });
  }
};