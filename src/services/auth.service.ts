import api from "../api/api";


// =========================================================
// REGISTRO INSTITUCIÓN
// =========================================================

export interface RegistroInstitucion {

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


export const registrarInstitucion = (
    data: RegistroInstitucion
) => {

    return api.post(
        "/auth/register/institucion",
        data
    );

};


// =========================================================
// REGISTRO PROVEEDOR
// =========================================================

export interface RegistroProveedor {

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


export const registrarProveedor = (
    data: RegistroProveedor
) => {

    return api.post(
        "/auth/register/proveedor",
        data
    );

};


// =========================================================
// LOGIN
// =========================================================

export interface LoginData {

    email: string;

    password: string;

}


export const login = (
    data: LoginData
) => {

    return api.post(
        "/auth/login",
        data
    );

};