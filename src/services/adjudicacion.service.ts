// src/services/adjudicacion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Adjudicacion {
    id: number;
    solicitud_id: number;
    cotizacion_id: number;
    estado: unknown;
    monto_total: number;
    moneda: unknown;
    observaciones: string | null;
    fecha_adjudicacion: string | null;
    fecha_creacion: string;
}

export interface CrearAdjudicacionData {
    solicitud_id: number;
    cotizacion_id: number;
    estado: unknown;
    monto_total: number;
    moneda: unknown;
    observaciones: string | null;
    fecha_adjudicacion: string | null;
    fecha_creacion: string;
}

export interface ActualizarAdjudicacionData {
    solicitud_id?: number;
    cotizacion_id?: number;
    estado?: unknown;
    monto_total?: number;
    moneda?: unknown;
    observaciones?: string | null;
    fecha_adjudicacion?: string | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Adjudicacion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER ADJUDICACION POR ID
// =========================================================

export const obtenerAdjudicacionPorId = async (
    id: number
): Promise<Adjudicacion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR ADJUDICACION
// =========================================================

export const crearAdjudicacion = async (
    data: CrearAdjudicacionData
): Promise<Adjudicacion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR ADJUDICACION
// =========================================================

export const actualizarAdjudicacion = async (
    id: number,
    data: ActualizarAdjudicacionData
): Promise<Adjudicacion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarAdjudicacion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
