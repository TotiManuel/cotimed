import { useEffect, useState } from "react";

import type { Usuario } from "../types/Usuario";

import {

  obtenerUsuarios,

  eliminarUsuario,

} from "../service/user.service";
export const useUsuarios = ()=>{

  const [usuarios,setUsuarios] =
    useState<Usuario[]>([]);

  const [loading,setLoading] =
    useState(true);

  const cargarUsuarios = async()=>{

    try{

      const data =
        await obtenerUsuarios();

      setUsuarios(data);

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    cargarUsuarios();

  },[]);

  const borrar = async(id:number)=>{

    await eliminarUsuario(id);

    cargarUsuarios();

  };

  return{

    usuarios,

    loading,

    cargarUsuarios,

    borrar

  };

};