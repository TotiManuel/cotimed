import { api } from "../api/api";

import type { Usuario } from "../types/Usuario";



export const obtenerUsuarios = async (): Promise<Usuario[]> => {


  return await api("/users");


};





export const obtenerUsuario = async (

  id:number

):Promise<Usuario>=>{


  return await api(`/users/${id}`);


};







export const crearUsuario = async (

  usuario:
  Partial<Usuario>
  &
  {
    password:string;
  }

)=>{


  return await api("/users",{


    method:"POST",


    headers:{

      "Content-Type":"application/json"

    },


    body:JSON.stringify(usuario)


  });


};

export const actualizarUsuario = async(
  id:number,
  datos:any
)=>{

  return await api(
    `/users/${id}`,
    {
      method:"PUT",
      body:JSON.stringify(datos)
    }
  );

};

export const eliminarUsuario = async (

  id:number

)=>{


  return await api(`/users/${id}`,{


    method:"DELETE"


  });


};









export const cambiarEstadoUsuario = async (

  id:number,

  estado:string

)=>{


  return await api(`/users/${id}/estado`,{


    method:"PATCH",


    headers:{

      "Content-Type":"application/json"

    },


    body:JSON.stringify({

      estado

    })


  });


};