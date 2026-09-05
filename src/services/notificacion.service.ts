// src/services/notificacion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Notificacion {
    id: number;
    usuario_id: number;
    tipo: unknown;
    titulo: string;
    mensaje: string;
    url: string | null;
    leida: boolean;
    fecha_lectura: string | null;
    fecha_creacion: string;
}

export interface CrearNotificacionData {
    usuario_id: number;
    tipo: unknown;
    titulo: string;
    mensaje: string;
    url: string | null;
    leida: boolean;
    fecha_lectura: string | null;
    fecha_creacion: string;
}

export interface ActualizarNotificacionData {
    usuario_id?: number;
    tipo?: unknown;
    titulo?: string;
    mensaje?: string;
    url?: string | null;
    leida?: boolean;
    fecha_lectura?: string | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Notificacion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER NOTIFICACION POR ID
// =========================================================

export const obtenerNotificacionPorId = async (
    id: number
): Promise<Notificacion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR NOTIFICACION
// =========================================================

export const crearNotificacion = async (
    data: CrearNotificacionData
): Promise<Notificacion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR NOTIFICACION
// =========================================================

export const actualizarNotificacion = async (
    id: number,
    data: ActualizarNotificacionData
): Promise<Notificacion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarNotificacion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
