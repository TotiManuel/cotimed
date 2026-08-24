import {
    createContext,
    useContext,
    useState
} from "react";

import api from "../api/api";


// =========================================================
// TIPO USUARIO
// =========================================================

interface User {

    id: number;

    nombre: string;

    apellido?: string | null;

    email: string;

    telefono?: string | null;

    rol: string;

    estado: string;

    avatar_url?: string | null;

    ultimo_login?: string | null;

    email_verificado: boolean;

    institucion_id?: number | null;

    proveedor_id?: number | null;

    eliminado: boolean;

}


// =========================================================
// TIPO RESPUESTA LOGIN
// =========================================================

interface LoginResponse {

    token: string;

    user: User;

}


// =========================================================
// TIPO CONTEXTO
// =========================================================

interface AuthContextType {

    user: User | null;

    login: (
        email: string,
        password: string
    ) => Promise<User>;

    logout: () => void;

}


// =========================================================
// CONTEXT
// =========================================================

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);


// =========================================================
// PROVIDER
// =========================================================

export const AuthProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {


    // =====================================================
    // USUARIO INICIAL
    // =====================================================

    const [user, setUser] = useState<User | null>(() => {

        const savedUser =
            localStorage.getItem("user");


        if (!savedUser) {

            return null;

        }


        try {

            return JSON.parse(
                savedUser
            );

        } catch {

            localStorage.removeItem(
                "user"
            );

            return null;

        }

    });


    // =====================================================
    // LOGIN
    // =====================================================

    const login = async (
        email: string,
        password: string
    ): Promise<User> => {


        const response =
            await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            ) as LoginResponse;


        // =================================================
        // GUARDAR TOKEN
        // =================================================

        localStorage.setItem(
            "token",
            response.token
        );


        // =================================================
        // GUARDAR USUARIO
        // =================================================

        localStorage.setItem(
            "user",
            JSON.stringify(
                response.user
            )
        );


        // =================================================
        // ACTUALIZAR ESTADO
        // =================================================

        setUser(
            response.user
        );


        return response.user;

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {


        localStorage.removeItem(
            "token"
        );


        localStorage.removeItem(
            "user"
        );


        setUser(null);

    };


    // =====================================================
    // PROVIDER
    // =====================================================

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


// =========================================================
// HOOK
// =========================================================

export const useAuth = () =>
    useContext(AuthContext);