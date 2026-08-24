// src/services/imagenEquipamento.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface ImagenEquipamento {
    id: number;
    equipamento_id: number;
    url: string;
    alt: string | null;
    orden: number;
    principal: boolean;
    fecha_creacion: string;
}

export interface CrearImagenEquipamentoData {
    equipamento_id: number;
    url: string;
    alt: string | null;
    orden: number;
    principal: boolean;
    fecha_creacion: string;
}

export interface ActualizarImagenEquipamentoData {
    equipamento_id?: number;
    url?: string;
    alt?: string | null;
    orden?: number;
    principal?: boolean;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<ImagenEquipamento[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER IMAGENEQUIPAMENTO POR ID
// =========================================================

export const obtenerImagenEquipamentoPorId = async (
    id: number
): Promise<ImagenEquipamento> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR IMAGENEQUIPAMENTO
// =========================================================

export const crearImagenEquipamento = async (
    data: CrearImagenEquipamentoData
): Promise<ImagenEquipamento> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR IMAGENEQUIPAMENTO
// =========================================================

export const actualizarImagenEquipamento = async (
    id: number,
    data: ActualizarImagenEquipamentoData
): Promise<ImagenEquipamento> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarImagenEquipamento = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
