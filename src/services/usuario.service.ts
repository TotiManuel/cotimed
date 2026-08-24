// src/services/usuario.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string | null;
    email: string;
    password: string;
    telefono: string | null;
    numero_documento: string | null;
    avatar_url: string | null;
    ultimo_login: string | null;
    email_verificado: boolean;
    institucion_id: number | null;
    proveedor_id: number | null;
    mensajes_enviados: unknown[];
    notificaciones: unknown[];
    auditorias: unknown[];
    favoritos: unknown[];
    archivos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface CrearUsuarioData {
    nombre: string;
    apellido: string | null;
    email: string;
    password: string;
    telefono: string | null;
    numero_documento: string | null;
    avatar_url: string | null;
    ultimo_login: string | null;
    email_verificado: boolean;
    institucion_id: number | null;
    proveedor_id: number | null;
    mensajes_enviados: unknown[];
    notificaciones: unknown[];
    auditorias: unknown[];
    favoritos: unknown[];
    archivos: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface ActualizarUsuarioData {
    nombre?: string;
    apellido?: string | null;
    email?: string;
    telefono?: string | null;
    numero_documento?: string | null;
    avatar_url?: string | null;
    ultimo_login?: string | null;
    email_verificado?: boolean;
    institucion_id?: number | null;
    proveedor_id?: number | null;
    mensajes_enviados?: unknown[];
    notificaciones?: unknown[];
    auditorias?: unknown[];
    favoritos?: unknown[];
    archivos?: unknown[];
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    eliminado?: boolean;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Usuario[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER USUARIO POR ID
// =========================================================

export const obtenerUsuarioPorId = async (
    id: number
): Promise<Usuario> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR USUARIO
// =========================================================

export const crearUsuario = async (
    data: CrearUsuarioData
): Promise<Usuario> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR USUARIO
// =========================================================

export const actualizarUsuario = async (
    id: number,
    data: ActualizarUsuarioData
): Promise<Usuario> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarUsuario = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
