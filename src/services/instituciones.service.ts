import api from "../api/api";


export interface Institucion {

    id:number;

    name_user:string;

    email:string;

    rol:string;

    organizacion:string;

}



export interface CrearInstitucion {

    name_user:string;

    email:string;

    password:string;

    organizacion:string;

}



export interface ActualizarInstitucion {

    name_user?:string;

    email?:string;

    password?:string;

    organizacion?:string;

}




// CREAR INSTITUCION

export const crearInstitucion = (

    data:CrearInstitucion

)=>{


    return api.post(

        "/instituciones",

        data

    );


};





// BUSCAR INSTITUCION POR ID

export const buscarInstitucion = (

    id:number

)=>{


    return api.get(

        `/instituciones/${id}`

    );


};





// LISTAR INSTITUCIONES

export const listarInstituciones = ()=>{


    return api.get(

        "/instituciones"

    );


};





// ACTUALIZAR INSTITUCION

export const actualizarInstitucion = (

    id:number,

    data:ActualizarInstitucion

)=>{


    return api.put(

        `/instituciones/${id}`,

        data

    );


};





// ELIMINAR INSTITUCION

export const eliminarInstitucion = (

    id:number

)=>{


    return api.delete(

        `/instituciones/${id}`

    );


};