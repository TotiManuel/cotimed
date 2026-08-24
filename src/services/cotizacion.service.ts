// src/services/cotizacion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Cotizacion {
    id: number;
    numero: string;
    solicitud_id: number;
    proveedor_id: number;
    usuario_id: number;
    estado: unknown;
    moneda: unknown;
    subtotal: number;
    impuestos: number;
    descuento: number;
    envio: number;
    total: number;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    validez_dias: number | null;
    fecha_vencimiento: string | null;
    condiciones_pago: unknown | null;
    condiciones: string | null;
    observaciones: string | null;
    fecha_envio: string | null;
    items: unknown[];
    archivos: unknown[];
    mensajes: unknown[];
    adjudicacion: unknown | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface CrearCotizacionData {
    numero: string;
    solicitud_id: number;
    proveedor_id: number;
    usuario_id: number;
    estado: unknown;
    moneda: unknown;
    subtotal: number;
    impuestos: number;
    descuento: number;
    envio: number;
    total: number;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    validez_dias: number | null;
    fecha_vencimiento: string | null;
    condiciones_pago: unknown | null;
    condiciones: string | null;
    observaciones: string | null;
    fecha_envio: string | null;
    items: unknown[];
    archivos: unknown[];
    mensajes: unknown[];
    adjudicacion: unknown | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

export interface ActualizarCotizacionData {
    numero?: string;
    solicitud_id?: number;
    proveedor_id?: number;
    usuario_id?: number;
    estado?: unknown;
    moneda?: unknown;
    subtotal?: number;
    impuestos?: number;
    descuento?: number;
    envio?: number;
    total?: number;
    plazo_entrega_dias?: number | null;
    garantia_meses?: number | null;
    validez_dias?: number | null;
    fecha_vencimiento?: string | null;
    condiciones_pago?: unknown | null;
    condiciones?: string | null;
    observaciones?: string | null;
    fecha_envio?: string | null;
    items?: unknown[];
    archivos?: unknown[];
    mensajes?: unknown[];
    adjudicacion?: unknown | null;
    fecha_creacion?: string;
    fecha_actualizacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<Cotizacion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER COTIZACION POR ID
// =========================================================

export const obtenerCotizacionPorId = async (
    id: number
): Promise<Cotizacion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR COTIZACION
// =========================================================

export const crearCotizacion = async (
    data: CrearCotizacionData
): Promise<Cotizacion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR COTIZACION
// =========================================================

export const actualizarCotizacion = async (
    id: number,
    data: ActualizarCotizacionData
): Promise<Cotizacion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarCotizacion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
