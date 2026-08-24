// src/services/itemSolicitud.service.ts
//
// GENERADO AUTOMÁTICAMENTE
// Revisar especialmente los endpoints personalizados.

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface ItemSolicitud {
    id: number;
    solicitud_id: number;
    equipamento_id: number | null;
    nombre: string;
    descripcion: string | null;
    cantidad: number;
    especificaciones: string | null;
    marca_preferida: string | null;
    modelo_preferido: string | null;
    unidad_medida: string | null;
    presupuesto_unitario: number | null;
    presupuesto_total: number | null;
    fecha_creacion: string;
}

export interface CrearItemSolicitudData {
    solicitud_id: number;
    equipamento_id: number | null;
    nombre: string;
    descripcion: string | null;
    cantidad: number;
    especificaciones: string | null;
    marca_preferida: string | null;
    modelo_preferido: string | null;
    unidad_medida: string | null;
    presupuesto_unitario: number | null;
    presupuesto_total: number | null;
    fecha_creacion: string;
}

export interface ActualizarItemSolicitudData {
    solicitud_id?: number;
    equipamento_id?: number | null;
    nombre?: string;
    descripcion?: string | null;
    cantidad?: number;
    especificaciones?: string | null;
    marca_preferida?: string | null;
    modelo_preferido?: string | null;
    unidad_medida?: string | null;
    presupuesto_unitario?: number | null;
    presupuesto_total?: number | null;
    fecha_creacion?: string;
}

// =========================================================
// OBTENER TODAS
// =========================================================

export const obtener = async (): Promise<ItemSolicitud[]> => {

    return await api.get(
        "/"
    );

};

// =========================================================
// OBTENER ITEMSOLICITUD POR ID
// =========================================================

export const obtenerItemSolicitudPorId = async (
    id: number
): Promise<ItemSolicitud> => {

    return await api.get(
        `/${id}`
    );

};

// =========================================================
// CREAR ITEMSOLICITUD
// =========================================================

export const crearItemSolicitud = async (
    data: CrearItemSolicitudData
): Promise<ItemSolicitud> => {

    return await api.post(
        "/",
        data
    );

};

// =========================================================
// ACTUALIZAR ITEMSOLICITUD
// =========================================================

export const actualizarItemSolicitud = async (
    id: number,
    data: ActualizarItemSolicitudData
): Promise<ItemSolicitud> => {

    return await api.put(
        `/${id}`,
        data
    );

};

// =========================================================
// ELIMINAR
// =========================================================

export const eliminarItemSolicitud = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/${id}`
    );

};
