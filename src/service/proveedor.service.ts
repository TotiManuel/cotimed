import { api } from "../api/api";

import type {
  FormProveedor
} from "../types/Proveedor";





export const obtenerProveedores = async()=>{


return await api(

  "/proveedores"

);


};








export const obtenerProveedor = async(

id:number

)=>{


return await api(

  `/proveedores/${id}`

);


};









export const crearProveedor = async(

datos:FormProveedor

)=>{


return await api(

"/proveedores",

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









export const actualizarProveedor = async(

id:number,

datos:FormProveedor

)=>{


return await api(

`/proveedores/${id}`,

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









export const eliminarProveedor = async(

id:number

)=>{


return await api(

`/proveedores/${id}`,

{

method:"DELETE"

}

);


};