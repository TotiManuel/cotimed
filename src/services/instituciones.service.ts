// src/services/instituciones.service.ts

import api from "../api/api";


// =========================================================
// TIPOS
// =========================================================

export interface Institucion {
    id: number;
    name_user: string;
    razon_social: string;
    direccion: string;
    email: string;
    organizacion: string;
    estado_user: string;
    ciudad_user: string;
    provincia_user: string;
    pais_user: string;
}


export interface CrearInstitucionData {
    name_user: string;
    razon_social: string;
    direccion: string;
    email: string;
    password: string;
    organizacion: string;
    estado_user: string;
    ciudad_user: string;
    provincia_user: string;
    pais_user: string;
}


export interface ActualizarInstitucionData {
    name_user?: string;
    razon_social?: string;
    direccion?: string;
    email?: string;
    organizacion?: string;
    estado_user?: string;
    ciudad_user?: string;
    provincia_user?: string;
    pais_user?: string;
}


export interface CambiarEstadoData {
    estado: string;
}


// =========================================================
// OBTENER TODAS LAS INSTITUCIONES
// =========================================================

export const obtenerInstituciones = async (): Promise<Institucion[]> => {

    return await api.get("/instituciones");

};


// =========================================================
// OBTENER INSTITUCIÓN POR ID
// =========================================================

export const obtenerInstitucionPorId = async (
    id: number
): Promise<Institucion> => {

    return await api.get(`/instituciones/${id}`);

};


// =========================================================
// CREAR INSTITUCIÓN
// =========================================================

export const crearInstitucion = async (
    data: CrearInstitucionData
): Promise<Institucion> => {

    const response = await api.post(
        "/instituciones",
        data
    );

    return response.institucion;

};


// =========================================================
// ACTUALIZAR INSTITUCIÓN
// =========================================================

export const actualizarInstitucion = async (
    id: number,
    data: ActualizarInstitucionData
): Promise<Institucion> => {

    const response = await api.put(
        `/instituciones/${id}`,
        data
    );

    return response.institucion;

};


// =========================================================
// CAMBIAR ESTADO
// =========================================================

export const cambiarEstadoInstitucion = async (
    id: number,
    estado: string
): Promise<Institucion> => {

    const response = await api.patch(
        `/instituciones/${id}/estado`,
        {
            estado,
        }
    );

    return response.institucion;

};


// =========================================================
// ELIMINAR INSTITUCIÓN
// =========================================================

export const eliminarInstitucion = async (
    id: number
): Promise<void> => {

    await api.delete(
        `/instituciones/${id}`
    );

};


// =========================================================
// OBTENER INSTITUCIÓN + SOLICITUDES
// =========================================================

export const obtenerInstitucionConSolicitudes = async (
    id: number
): Promise<Institucion> => {

    return await api.get(
        `/instituciones/${id}/solicitudes`
    );

};