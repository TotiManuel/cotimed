// src/services/auditoria.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Auditoria {
    id: number;
    usuario_id: number | null;
    tipo: unknown;
    entidad: string;
    entidad_id: number | null;
    accion: string;
    descripcion: string | null;
    datos_anteriores: unknown | null;
    datos_nuevos: unknown | null;
    ip: string | null;
    user_agent: string | null;
    fecha_creacion: string;
}

export interface CrearAuditoriaData {
    usuario_id: number | null;
    tipo: unknown;
    entidad: string;
    entidad_id: number | null;
    accion: string;
    descripcion: string | null;
    datos_anteriores: unknown | null;
    datos_nuevos: unknown | null;
    ip: string | null;
    user_agent: string | null;
    fecha_creacion: string;
}

export interface ActualizarAuditoriaData {
    usuario_id?: number | null;
    tipo?: unknown;
    entidad?: string;
    entidad_id?: number | null;
    accion?: string;
    descripcion?: string | null;
    datos_anteriores?: unknown | null;
    datos_nuevos?: unknown | null;
    ip?: string | null;
    user_agent?: string | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Auditoria[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER AUDITORIA POR ID
// =========================================================

export const obtenerAuditoriaPorId = async (
    id: number
): Promise<Auditoria> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR AUDITORIA
// =========================================================

export const crearAuditoria = async (
    data: CrearAuditoriaData
): Promise<Auditoria> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR AUDITORIA
// =========================================================

export const actualizarAuditoria = async (
    id: number,
    data: ActualizarAuditoriaData
): Promise<Auditoria> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarAuditoria = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
