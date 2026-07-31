import { api } from "../api/api";


interface RegistroInstitucion {

    nombreInstitucion: string;
    email: string;
    telefono?: string;
    password: string;

}



interface RegistroProveedor {

    nombreEmpresa: string;
    razonSocial?: string;
    email: string;
    telefono?: string;
    password: string;

}



interface LoginData {

    email: string;
    password: string;

}




export const registrarInstitucion = async (

    data: RegistroInstitucion

) => {


    return await api(

        "/auth/register/institucion",

        {

            method: "POST",

            body: JSON.stringify(data)

        }

    );


};






export const registrarProveedor = async (

    data: RegistroProveedor

) => {


    return await api(

        "/auth/register/proveedor",

        {

            method: "POST",

            body: JSON.stringify(data)

        }

    );


};






export const login = async (

    data: LoginData

) => {


    return await api(

        "/auth/login",

        {

            method: "POST",

            body: JSON.stringify(data)

        }

    );


};