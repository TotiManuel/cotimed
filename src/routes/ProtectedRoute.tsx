// src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {

  children: React.ReactNode;

}


const ProtectedRoute = ({
  children
}: ProtectedRouteProps) => {


  const {
    usuario,
    cargando
  } = useAuth();



  if (cargando) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        Cargando...

      </div>

    );

  }



  if (!usuario) {

    return (

      <Navigate
        to="/login"
        replace
      />

    );

  }



  return <>{children}</>;

};


export default ProtectedRoute;