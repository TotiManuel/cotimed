// src/services/equipamento.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Equipamento {
    id: number;
    proveedor_id: number;
    categoria_id: number;
    nombre: string;
    marca: string | null;
    modelo: string | null;
    numero_parte: string | null;
    codigo_interno: string | null;
    tipo: unknown;
    descripcion: string;
    especificaciones: string | null;
    estado: unknown;
    precio_unitario: number;
    tipo_precio: unknown;
    moneda: unknown;
    stock: number | null;
    stock_minimo: number | null;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    disponible: boolean;
    fabricante: string | null;
    origen: string | null;
    registro_sanitario: string | null;
    vida_util_anios: number | null;
    requiere_instalacion: boolean;
    requiere_capacitacion: boolean;
    incluye: unknown | null;
    accesorios: unknown | null;
    caracteristicas: unknown | null;
    imagen_principal: string | null;
    imagenes: unknown[];
    favoritos: unknown[];
    items_solicitud: unknown[];
    items_cotizacion: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface CrearEquipamentoData {
    proveedor_id: number;
    categoria_id: number;
    nombre: string;
    marca: string | null;
    modelo: string | null;
    numero_parte: string | null;
    codigo_interno: string | null;
    tipo: unknown;
    descripcion: string;
    especificaciones: string | null;
    estado: unknown;
    precio_unitario: number;
    tipo_precio: unknown;
    moneda: unknown;
    stock: number | null;
    stock_minimo: number | null;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    disponible: boolean;
    fabricante: string | null;
    origen: string | null;
    registro_sanitario: string | null;
    vida_util_anios: number | null;
    requiere_instalacion: boolean;
    requiere_capacitacion: boolean;
    incluye: unknown | null;
    accesorios: unknown | null;
    caracteristicas: unknown | null;
    imagen_principal: string | null;
    imagenes: unknown[];
    favoritos: unknown[];
    items_solicitud: unknown[];
    items_cotizacion: unknown[];
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}

export interface ActualizarEquipamentoData {
    proveedor_id?: number;
    categoria_id?: number;
    nombre?: string;
    marca?: string | null;
    modelo?: string | null;
    numero_parte?: string | null;
    codigo_interno?: string | null;
    tipo?: unknown;
    descripcion?: string;
    especificaciones?: string | null;
    estado?: unknown;
    precio_unitario?: number;
    tipo_precio?: unknown;
    moneda?: unknown;
    stock?: number | null;
    stock_minimo?: number | null;
    plazo_entrega_dias?: number | null;
    garantia_meses?: number | null;
    disponible?: boolean;
    fabricante?: string | null;
    origen?: string | null;
    registro_sanitario?: string | null;
    vida_util_anios?: number | null;
    requiere_instalacion?: boolean;
    requiere_capacitacion?: boolean;
    incluye?: unknown | null;
    accesorios?: unknown | null;
    caracteristicas?: unknown | null;
    imagen_principal?: string | null;
    imagenes?: unknown[];
    favoritos?: unknown[];
    items_solicitud?: unknown[];
    items_cotizacion?: unknown[];
    fecha_creacion?: string;
    fecha_actualizacion?: string;
    eliminado?: boolean;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Equipamento[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER EQUIPAMENTO POR ID
// =========================================================

export const obtenerEquipamentoPorId = async (
    id: number
): Promise<Equipamento> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR EQUIPAMENTO
// =========================================================

export const crearEquipamento = async (
    data: CrearEquipamentoData
): Promise<Equipamento> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR EQUIPAMENTO
// =========================================================

export const actualizarEquipamento = async (
    id: number,
    data: ActualizarEquipamentoData
): Promise<Equipamento> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarEquipamento = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
