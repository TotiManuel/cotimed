// src/services/mensaje.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Mensaje {
    id: number;
    solicitud_id: number | null;
    cotizacion_id: number | null;
    remitente_id: number;
    tipo: unknown;
    contenido: string;
    estado: unknown;
    fecha_lectura: string | null;
    fecha_creacion: string;
}

export interface CrearMensajeData {
    solicitud_id: number | null;
    cotizacion_id: number | null;
    remitente_id: number;
    tipo: unknown;
    contenido: string;
    estado: unknown;
    fecha_lectura: string | null;
    fecha_creacion: string;
}

export interface ActualizarMensajeData {
    solicitud_id?: number | null;
    cotizacion_id?: number | null;
    remitente_id?: number;
    tipo?: unknown;
    contenido?: string;
    estado?: unknown;
    fecha_lectura?: string | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Mensaje[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER MENSAJE POR ID
// =========================================================

export const obtenerMensajePorId = async (
    id: number
): Promise<Mensaje> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR MENSAJE
// =========================================================

export const crearMensaje = async (
    data: CrearMensajeData
): Promise<Mensaje> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR MENSAJE
// =========================================================

export const actualizarMensaje = async (
    id: number,
    data: ActualizarMensajeData
): Promise<Mensaje> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarMensaje = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
