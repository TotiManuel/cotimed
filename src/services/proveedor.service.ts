// src/services/proveedor.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Proveedor {
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
    verificado: boolean;
    fecha_verificacion: string | null;
    direcciones: unknown[];
    contactos: unknown[];
    equipamentos: unknown[];
    favoritos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface CrearProveedorData {
    razon_social: string;
    nombre_comercial: string | null;
    cuit: string | null;
    descripcion: string | null;
    email: string | null;
    telefono: string | null;
    sitio_web: string | null;
    logo_url: string | null;
    estado: unknown;
    verificado: boolean;
    fecha_verificacion: string | null;
    direcciones: unknown[];
    contactos: unknown[];
    equipamentos: unknown[];
    favoritos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface ActualizarProveedorData {
    razon_social?: string;
    nombre_comercial?: string | null;
    cuit?: string | null;
    descripcion?: string | null;
    email?: string | null;
    telefono?: string | null;
    sitio_web?: string | null;
    logo_url?: string | null;
    estado?: unknown;
    verificado?: boolean;
    fecha_verificacion?: string | null;
    direcciones?: unknown[];
    contactos?: unknown[];
    equipamentos?: unknown[];
    favoritos?: unknown[];
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    eliminado?: boolean;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Proveedor[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER PROVEEDOR POR ID
// =========================================================

export const obtenerProveedorPorId = async (
    id: number
): Promise<Proveedor> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR PROVEEDOR
// =========================================================

export const crearProveedor = async (
    data: CrearProveedorData
): Promise<Proveedor> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR PROVEEDOR
// =========================================================

export const actualizarProveedor = async (
    id: number,
    data: ActualizarProveedorData
): Promise<Proveedor> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarProveedor = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
