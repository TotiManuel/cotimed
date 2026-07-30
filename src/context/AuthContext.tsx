import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import type { ReactNode } from "react";


import { api } from "../api/api";


import type { Usuario } from "../types/Usuario";



interface AuthContextType {


    usuario: Usuario | null;


    login:(
        email:string,
        password:string
    )=>Promise<Usuario>;


    logout:()=>void;


    cargando:boolean;

}




const AuthContext =
createContext<AuthContextType | null>(null);





export const AuthProvider =({

    children

}:{

    children:ReactNode

})=>{



const [usuario,setUsuario]
=
useState<Usuario | null>(null);



const [cargando,setCargando]
=
useState(true);





useEffect(()=>{


const cargarUsuario = async()=>{


const token =
localStorage.getItem("token");



if(!token){

setCargando(false);

return;

}



try{


const usuarioActual =
await api("/users/me");



setUsuario(usuarioActual);



}catch(error){


localStorage.removeItem("token");

setUsuario(null);



}finally{


setCargando(false);


}



};



cargarUsuario();



},[]);








const login = async(

email:string,

password:string

)=>{


const data =
await api(

"/auth/login",

{

method:"POST",

body:JSON.stringify({

email,

password

})

}

);



localStorage.setItem(

"token",

data.token

);



setUsuario(

data.usuario

);



return data.usuario;



};







const logout = ()=>{


localStorage.removeItem(

"token"

);


setUsuario(null);


};








if(cargando){


return (

<div className="flex h-screen items-center justify-center">

<p>
Cargando...
</p>

</div>

);


}







return (

<AuthContext.Provider


value={{

usuario,

login,

logout,

cargando

}}


>


{children}


</AuthContext.Provider>


);



};








export const useAuth =()=>{


const context =
useContext(AuthContext);



if(!context){


throw new Error(

"useAuth debe estar dentro de AuthProvider"

);


}



return context;


};






export const obtenerDashboard=(rol:string)=>{


switch(rol){


case "ADMIN":

return "/dashboard/admin";



case "INSTITUCION":

return "/dashboard/institucion";



case "PROVEEDOR":

return "/dashboard/proveedor";



default:

return "/dashboard";


}



};