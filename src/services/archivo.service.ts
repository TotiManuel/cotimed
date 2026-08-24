// src/services/archivo.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Archivo {
    id: number;
    nombre: string;
    nombre_original: string | null;
    url: string;
    tipo_mime: string | null;
    extension: string | null;
    tamanio_bytes: number | null;
    tipo: unknown;
    usuario_id: number | null;
    solicitud_id: number | null;
    cotizacion_id: number | null;
    fecha_creacion: string;
}

export interface CrearArchivoData {
    nombre: string;
    nombre_original: string | null;
    url: string;
    tipo_mime: string | null;
    extension: string | null;
    tamanio_bytes: number | null;
    tipo: unknown;
    usuario_id: number | null;
    solicitud_id: number | null;
    cotizacion_id: number | null;
    fecha_creacion: string;
}

export interface ActualizarArchivoData {
    nombre?: string;
    nombre_original?: string | null;
    url?: string;
    tipo_mime?: string | null;
    extension?: string | null;
    tamanio_bytes?: number | null;
    tipo?: unknown;
    usuario_id?: number | null;
    solicitud_id?: number | null;
    cotizacion_id?: number | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Archivo[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER ARCHIVO POR ID
// =========================================================

export const obtenerArchivoPorId = async (
    id: number
): Promise<Archivo> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR ARCHIVO
// =========================================================

export const crearArchivo = async (
    data: CrearArchivoData
): Promise<Archivo> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR ARCHIVO
// =========================================================

export const actualizarArchivo = async (
    id: number,
    data: ActualizarArchivoData
): Promise<Archivo> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarArchivo = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
