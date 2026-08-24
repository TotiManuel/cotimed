// src/services/categoria.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string | null;
    imagen_url: string | null;
    activa: boolean;
    categoria_padre_id: number | null;
    categoria_padre: unknown | null;
    subcategorias: unknown[];
    equipamentos: unknown[];
    fecha_creacion: string;
}

export interface CrearCategoriaData {
    nombre: string;
    descripcion: string | null;
    imagen_url: string | null;
    activa: boolean;
    categoria_padre_id: number | null;
    categoria_padre: unknown | null;
    subcategorias: unknown[];
    equipamentos: unknown[];
    fecha_creacion: string;
}

export interface ActualizarCategoriaData {
    nombre?: string;
    descripcion?: string | null;
    imagen_url?: string | null;
    activa?: boolean;
    categoria_padre_id?: number | null;
    categoria_padre?: unknown | null;
    subcategorias?: unknown[];
    equipamentos?: unknown[];
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Categoria[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER CATEGORIA POR ID
// =========================================================

export const obtenerCategoriaPorId = async (
    id: number
): Promise<Categoria> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR CATEGORIA
// =========================================================

export const crearCategoria = async (
    data: CrearCategoriaData
): Promise<Categoria> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR CATEGORIA
// =========================================================

export const actualizarCategoria = async (
    id: number,
    data: ActualizarCategoriaData
): Promise<Categoria> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarCategoria = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
