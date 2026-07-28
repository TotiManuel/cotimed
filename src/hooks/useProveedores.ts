import { useEffect, useState } from "react";

import type {
  Proveedor,
  FormProveedor
} from "../types/Proveedor";

import {

  obtenerProveedores,

  crearProveedor,

  actualizarProveedor,

  eliminarProveedor


} from "../service/proveedor.service";





export const useProveedores = () => {



const [proveedores,setProveedores] =

useState<Proveedor[]>([]);




const [cargando,setCargando] =

useState(true);







const cargar = async()=>{


try{


setCargando(true);



const data =

await obtenerProveedores();



setProveedores(data);



}catch(error){


console.error(

"Error cargando proveedores:",

error

);



}finally{


setCargando(false);


}



};







useEffect(()=>{


cargar();


},[]);









const crear = async(

datos:FormProveedor

)=>{


await crearProveedor(datos);


await cargar();


};

const actualizar = async(

id:number,

datos:FormProveedor

)=>{


await actualizarProveedor(

id,

datos

);



await cargar();



};









const eliminar = async(

id:number

)=>{


await eliminarProveedor(id);



await cargar();



};









return {


proveedores,

cargando,


cargar,


crear,


actualizar,


eliminar


};



};