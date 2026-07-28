import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


interface Props {

    children: React.ReactNode;

    roles: string[];

}


const RoleRoute = ({
    children,
    roles
}: Props)=>{


    const { usuario } = useAuth();



    if(!usuario){

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }



    if(!roles.includes(usuario.rol)){

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );

    }



    return <>{children}</>;


};


export default RoleRoute;