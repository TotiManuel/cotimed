import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {

    children: React.ReactNode;

    roles?: string[];

}



const ProtectedRoute = ({

    children,

    roles

}: ProtectedRouteProps) => {



    const {

        usuario,

        cargando

    } = useAuth();






    if(cargando){


        return (

            <div className="flex min-h-screen items-center justify-center">

                Cargando...

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







    if(

        roles &&

        !roles.includes(usuario.rol)

    ){


        return (

            <Navigate

                to="/dashboard"

                replace

            />

        );


    }






    return <>{children}</>;

};



export default ProtectedRoute;