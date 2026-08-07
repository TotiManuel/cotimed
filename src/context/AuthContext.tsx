import {
    createContext,
    useContext,
    useState
} from "react";

import api from "../api/api";


interface User {

    id:number;
    name_user:string;
    email:string;
    rol:string;
    organizacion:string;

}


interface AuthContextType {

    user:User | null;

    login:(
        email:string,
        password:string
    )=>Promise<void>;

    logout:()=>void;

}



const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);



export const AuthProvider = ({
    children
}:{
    children:React.ReactNode
})=>{


    const [user,setUser] = useState<User | null>(null);



    const login = async(
        email:string,
        password:string
    )=>{


        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );


        localStorage.setItem(
            "token",
            response.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );


        setUser(
            response.user
        );


    };



    const logout = ()=>{


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );


        setUser(null);

    };



    return (

        <AuthContext.Provider

            value={{
                user,
                login,
                logout
            }}

        >

            {children}

        </AuthContext.Provider>

    );

};



export const useAuth = ()=>useContext(AuthContext);