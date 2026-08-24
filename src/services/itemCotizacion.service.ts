// src/services/itemCotizacion.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface ItemCotizacion {
    id: number;
    cotizacion_id: number;
    item_solicitud_id: number | null;
    equipamento_id: number | null;
    nombre: string;
    descripcion: string | null;
    cantidad: number;
    precio_unitario: number;
    descuento: number;
    subtotal: number;
    impuestos: number;
    total: number;
    estado: unknown;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    incluye: string | null;
    observaciones: string | null;
    fecha_creacion: string;
}

export interface CrearItemCotizacionData {
    cotizacion_id: number;
    item_solicitud_id: number | null;
    equipamento_id: number | null;
    nombre: string;
    descripcion: string | null;
    cantidad: number;
    precio_unitario: number;
    descuento: number;
    subtotal: number;
    impuestos: number;
    total: number;
    estado: unknown;
    plazo_entrega_dias: number | null;
    garantia_meses: number | null;
    incluye: string | null;
    observaciones: string | null;
    fecha_creacion: string;
}

export interface ActualizarItemCotizacionData {
    cotizacion_id?: number;
    item_solicitud_id?: number | null;
    equipamento_id?: number | null;
    nombre?: string;
    descripcion?: string | null;
    cantidad?: number;
    precio_unitario?: number;
    descuento?: number;
    subtotal?: number;
    impuestos?: number;
    total?: number;
    estado?: unknown;
    plazo_entrega_dias?: number | null;
    garantia_meses?: number | null;
    incluye?: string | null;
    observaciones?: string | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<ItemCotizacion[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER ITEMCOTIZACION POR ID
// =========================================================

export const obtenerItemCotizacionPorId = async (
    id: number
): Promise<ItemCotizacion> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR ITEMCOTIZACION
// =========================================================

export const crearItemCotizacion = async (
    data: CrearItemCotizacionData
): Promise<ItemCotizacion> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR ITEMCOTIZACION
// =========================================================

export const actualizarItemCotizacion = async (
    id: number,
    data: ActualizarItemCotizacionData
): Promise<ItemCotizacion> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarItemCotizacion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
