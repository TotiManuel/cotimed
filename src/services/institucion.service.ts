// src/services/institucion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Institucion {
    id: number;
    razon_social: string;
    nombre_comercial: string | null;
    cuit: string | null;
    descripcion: string | null;
    email: string | null;
    telefono: string | null;
    sitio_web: string | null;
    logo_url: string | null;
    estado: unknown;
    direcciones: unknown[];
    contactos: unknown[];
    favoritos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface CrearInstitucionData {
    razon_social: string;
    nombre_comercial: string | null;
    cuit: string | null;
    descripcion: string | null;
    email: string | null;
    telefono: string | null;
    sitio_web: string | null;
    logo_url: string | null;
    estado: unknown;
    direcciones: unknown[];
    contactos: unknown[];
    favoritos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface ActualizarInstitucionData {
    razon_social?: string;
    nombre_comercial?: string | null;
    cuit?: string | null;
    descripcion?: string | null;
    email?: string | null;
    telefono?: string | null;
    sitio_web?: string | null;
    logo_url?: string | null;
    estado?: unknown;
    direcciones?: unknown[];
    contactos?: unknown[];
    favoritos?: unknown[];
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    eliminado?: boolean;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Institucion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER INSTITUCION POR ID
// =========================================================

export const obtenerInstitucionPorId = async (
    id: number
): Promise<Institucion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR INSTITUCION
// =========================================================

export const crearInstitucion = async (
    data: CrearInstitucionData
): Promise<Institucion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR INSTITUCION
// =========================================================

export const actualizarInstitucion = async (
    id: number,
    data: ActualizarInstitucionData
): Promise<Institucion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarInstitucion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
