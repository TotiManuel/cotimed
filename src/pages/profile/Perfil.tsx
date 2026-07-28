import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import PerfilAdmin from "./PerfilAdmin";
import PerfilInstitucion from "./PerfilInstitucion";
import PerfilProveedor from "./PerfilProveedor";
import PerfilEmpleado from "./PerfilEmpleado";


const Perfil = () => {

  const { usuario } = useAuth();


  if(!usuario){

    return <Navigate to="/login" />;

  }


  switch(usuario.rol){

    case "ADMIN":
      return <PerfilAdmin />;


    case "INSTITUCION":
      return <PerfilInstitucion />;


    case "PROVEEDOR":
      return <PerfilProveedor />;


    case "EMPLEADO":
      return <PerfilEmpleado />;


    default:

      return (
        <h1>
          Rol no reconocido: {usuario.rol}
        </h1>
      );

  }

};


export default Perfil;