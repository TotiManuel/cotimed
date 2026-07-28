import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import DashboardAdmin from "./DashboardAdmin";
import DashboardInstitucion from "./DashboardInstitucion";
import DashboardProveedor from "./DashboardProveedor";
import DashboardEmpleado from "./DashboardEmpleado";


const Dashboard = () => {


  const {
    usuario,
    cargando
  } = useAuth();



  if(cargando){

    return (

      <div className="flex min-h-screen items-center justify-center">

        Cargando dashboard...

      </div>

    );

  }



  if(!usuario){

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }



  switch(usuario.rol){


    case "ADMIN":

      return <DashboardAdmin />;



    case "INSTITUCION":

      return <DashboardInstitucion />;



    case "PROVEEDOR":

      return <DashboardProveedor />;



    case "EMPLEADO":

      return <DashboardEmpleado />;



    default:

      return (

        <Navigate
          to="/login"
          replace
        />

      );


  }


};


export default Dashboard;