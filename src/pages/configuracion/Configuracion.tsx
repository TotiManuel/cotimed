import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import ConfiguracionAdmin from "./ConfiguracionAdmin";
import ConfiguracionInstitucion from "./ConfiguracionInstitucion";
import ConfiguracionProveedor from "./ConfiguracionProveedor";
import ConfiguracionEmpleado from "./ConfiguracionEmpleado";


const Configuracion = () => {

  const { usuario } = useAuth();


  if(!usuario){

    return <Navigate to="/login" />;

  }


  switch(usuario.rol){


    case "ADMIN":

      return <ConfiguracionAdmin />;



    case "INSTITUCION":

      return <ConfiguracionInstitucion />;



    case "PROVEEDOR":

      return <ConfiguracionProveedor />;



    case "EMPLEADO":

      return <ConfiguracionEmpleado />;



    default:

      return (

        <h1 className="p-10 text-2xl">

          Rol no reconocido: {usuario.rol}

        </h1>

      );


  }


};


export default Configuracion;