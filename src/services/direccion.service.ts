// src/services/direccion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Direccion {
    id: number;
    tipo: unknown;
    calle: string;
    numero: string | null;
    piso: string | null;
    departamento: string | null;
    codigo_postal: string | null;
    ciudad: string;
    provincia: string;
    pais: string;
    latitud: number | null;
    longitud: number | null;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface CrearDireccionData {
    tipo: unknown;
    calle: string;
    numero: string | null;
    piso: string | null;
    departamento: string | null;
    codigo_postal: string | null;
    ciudad: string;
    provincia: string;
    pais: string;
    latitud: number | null;
    longitud: number | null;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface ActualizarDireccionData {
    tipo?: unknown;
    calle?: string;
    numero?: string | null;
    piso?: string | null;
    departamento?: string | null;
    codigo_postal?: string | null;
    ciudad?: string;
    provincia?: string;
    pais?: string;
    latitud?: number | null;
    longitud?: number | null;
    institucion_id?: number | null;
    proveedor_id?: number | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Direccion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER DIRECCION POR ID
// =========================================================

export const obtenerDireccionPorId = async (
    id: number
): Promise<Direccion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR DIRECCION
// =========================================================

export const crearDireccion = async (
    data: CrearDireccionData
): Promise<Direccion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR DIRECCION
// =========================================================

export const actualizarDireccion = async (
    id: number,
    data: ActualizarDireccionData
): Promise<Direccion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarDireccion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
