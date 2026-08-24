// src/services/contacto.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Contacto {
    id: number;
    nombre: string;
    apellido: string | null;
    cargo: string | null;
    email: string | null;
    telefono: string | null;
    tipo: unknown;
    principal: boolean;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface CrearContactoData {
    nombre: string;
    apellido: string | null;
    cargo: string | null;
    email: string | null;
    telefono: string | null;
    tipo: unknown;
    principal: boolean;
    institucion_id: number | null;
    proveedor_id: number | null;
    fecha_creacion: string;
}

export interface ActualizarContactoData {
    nombre?: string;
    apellido?: string | null;
    cargo?: string | null;
    email?: string | null;
    telefono?: string | null;
    tipo?: unknown;
    principal?: boolean;
    institucion_id?: number | null;
    proveedor_id?: number | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Contacto[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER CONTACTO POR ID
// =========================================================

export const obtenerContactoPorId = async (
    id: number
): Promise<Contacto> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR CONTACTO
// =========================================================

export const crearContacto = async (
    data: CrearContactoData
): Promise<Contacto> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR CONTACTO
// =========================================================

export const actualizarContacto = async (
    id: number,
    data: ActualizarContactoData
): Promise<Contacto> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarContacto = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
