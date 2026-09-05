// src/services/solicitud.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Solicitud {
    id: number;
    numero: string;
    titulo: string;
    descripcion: string;
    institucion_id: number;
    creado_por_id: number;
    estado: unknown;
    urgencia: unknown;
    fecha_publicacion: string | null;
    fecha_limite_cotizacion: string | null;
    fecha_cierre: string | null;
    presupuesto_estimado: number | null;
    moneda: unknown;
    condiciones: string | null;
    observaciones: string | null;
    lugar_entrega: string | null;
    requiere_instalacion: boolean;
    requiere_capacitacion: boolean;
    items: unknown[];
    mensajes: unknown[];
    archivos: unknown[];
    adjudicacion: unknown | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface CrearSolicitudData {
    numero: string;
    titulo: string;
    descripcion: string;
    institucion_id: number;
    creado_por_id: number;
    estado: unknown;
    urgencia: unknown;
    fecha_publicacion: string | null;
    fecha_limite_cotizacion: string | null;
    fecha_cierre: string | null;
    presupuesto_estimado: number | null;
    moneda: unknown;
    condiciones: string | null;
    observaciones: string | null;
    lugar_entrega: string | null;
    requiere_instalacion: boolean;
    requiere_capacitacion: boolean;
    items: unknown[];
    mensajes: unknown[];
    archivos: unknown[];
    adjudicacion: unknown | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface ActualizarSolicitudData {
    numero?: string;
    titulo?: string;
    descripcion?: string;
    institucion_id?: number;
    creado_por_id?: number;
    estado?: unknown;
    urgencia?: unknown;
    fecha_publicacion?: string | null;
    fecha_limite_cotizacion?: string | null;
    fecha_cierre?: string | null;
    presupuesto_estimado?: number | null;
    moneda?: unknown;
    condiciones?: string | null;
    observaciones?: string | null;
    lugar_entrega?: string | null;
    requiere_instalacion?: boolean;
    requiere_capacitacion?: boolean;
    items?: unknown[];
    mensajes?: unknown[];
    archivos?: unknown[];
    adjudicacion?: unknown | null;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    eliminado?: boolean;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Solicitud[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER SOLICITUD POR ID
// =========================================================

export const obtenerSolicitudPorId = async (
    id: number
): Promise<Solicitud> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR SOLICITUD
// =========================================================

export const crearSolicitud = async (
    data: CrearSolicitudData
): Promise<Solicitud> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR SOLICITUD
// =========================================================

export const actualizarSolicitud = async (
    id: number,
    data: ActualizarSolicitudData
): Promise<Solicitud> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarSolicitud = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
