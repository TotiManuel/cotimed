import { api } from "../api/api";

import type {
  InstitucionForm
} from "../types/Institucion";



export const obtenerInstituciones = async()=>{


  return await api(

    "/instituciones"

  );


};





export const obtenerInstitucion = async(

  id:number

)=>{


  return await api(

    `/instituciones/${id}`

  );


};







export const crearInstitucion = async(

  datos:InstitucionForm

)=>{


  return await api(

    "/instituciones",

    {

      method:"POST",

      headers:{

        "Content-Type":
          "application/json"

      },

      body:

        JSON.stringify(datos)

    }

  );


};








export const actualizarInstitucion = async(

  id:number,

  datos:InstitucionForm

)=>{


  return await api(

    `/instituciones/${id}`,

    {

      method:"PUT",

      headers:{

        "Content-Type":
          "application/json"

      },

      body:

        JSON.stringify(datos)

    }

  );


};








export const eliminarInstitucion = async(

  id:number

)=>{


  return await api(

    `/instituciones/${id}`,

    {

      method:"DELETE"

    }

  );


};