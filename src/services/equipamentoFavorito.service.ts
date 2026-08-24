// src/services/equipamentoFavorito.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface EquipamentoFavorito {
    id: number;
    equipamento_id: number;
    usuario_id: number | null;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface CrearEquipamentoFavoritoData {
    equipamento_id: number;
    usuario_id: number | null;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface ActualizarEquipamentoFavoritoData {
    equipamento_id?: number;
    usuario_id?: number | null;
    institucion_id?: number | null;
    proveedor_id?: number | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<EquipamentoFavorito[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER EQUIPAMENTOFAVORITO POR ID
// =========================================================

export const obtenerEquipamentoFavoritoPorId = async (
    id: number
): Promise<EquipamentoFavorito> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR EQUIPAMENTOFAVORITO
// =========================================================

export const crearEquipamentoFavorito = async (
    data: CrearEquipamentoFavoritoData
): Promise<EquipamentoFavorito> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR EQUIPAMENTOFAVORITO
// =========================================================

export const actualizarEquipamentoFavorito = async (
    id: number,
    data: ActualizarEquipamentoFavoritoData
): Promise<EquipamentoFavorito> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarEquipamentoFavorito = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
