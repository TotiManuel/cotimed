import {
    createContext,
    useContext,
    useState,
} from "react";


// =========================================================
// TIPO USUARIO
// =========================================================

export interface User {
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

    saldo: number;
}


// =========================================================
// USUARIO GUARDADO
// =========================================================

interface StoredUser extends User {
    password: string;
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

    register: (
        nombre: string,
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
// CLAVES LOCALSTORAGE
// =========================================================

const USERS_KEY = "sala_juegos_users";

const CURRENT_USER_KEY = "sala_juegos_user";


// =========================================================
// OBTENER USUARIOS
// =========================================================

const getUsers = (): StoredUser[] => {

    const savedUsers =
        localStorage.getItem(USERS_KEY);

    if (!savedUsers) {
        return [];
    }

    try {
        return JSON.parse(savedUsers);
    } catch {
        localStorage.removeItem(USERS_KEY);
        return [];
    }
};


// =========================================================
// GUARDAR USUARIOS
// =========================================================

const saveUsers = (users: StoredUser[]) => {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

};


// =========================================================
// USUARIO ACTUAL
// =========================================================

const getSavedUser = (): User | null => {

    const savedUser =
        localStorage.getItem(CURRENT_USER_KEY);

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
        return null;
    }
};


// =========================================================
// PROVIDER
// =========================================================

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const [user, setUser] = useState<User | null>(
        getSavedUser
    );


    // =====================================================
    // LOGIN
    // =====================================================

    const login = async (
        email: string,
        password: string
    ): Promise<User> => {

        const normalizedEmail =
            email.trim().toLowerCase();

        const users = getUsers();

        const foundUser =
            users.find(
                (item) =>
                    item.email.toLowerCase() ===
                        normalizedEmail &&
                    item.password === password
            );

        if (!foundUser) {
            throw new Error(
                "Email o contraseña incorrectos."
            );
        }

        if (foundUser.estado !== "ACTIVO") {
            throw new Error(
                "Este usuario se encuentra bloqueado."
            );
        }

        foundUser.ultimo_login =
            new Date().toISOString();

        saveUsers(users);

        const loggedUser: User = {
            id: foundUser.id,
            nombre: foundUser.nombre,
            apellido: foundUser.apellido,
            email: foundUser.email,
            telefono: foundUser.telefono,
            rol: foundUser.rol,
            estado: foundUser.estado,
            avatar_url: foundUser.avatar_url,
            ultimo_login: foundUser.ultimo_login,
            email_verificado: foundUser.email_verificado,
            institucion_id: foundUser.institucion_id,
            proveedor_id: foundUser.proveedor_id,
            eliminado: foundUser.eliminado,
            saldo: foundUser.saldo,
        };

        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(loggedUser)
        );

        setUser(loggedUser);

        return loggedUser;
    };


    // =====================================================
    // REGISTRO
    // =====================================================

    const register = async (
        nombre: string,
        email: string,
        password: string
    ): Promise<User> => {

        const normalizedEmail =
            email.trim().toLowerCase();

        const normalizedNombre =
            nombre.trim();


        if (!normalizedNombre) {
            throw new Error(
                "Ingresá tu nombre."
            );
        }


        if (!normalizedEmail) {
            throw new Error(
                "Ingresá tu email."
            );
        }


        if (password.length < 6) {
            throw new Error(
                "La contraseña debe tener al menos 6 caracteres."
            );
        }


        const users = getUsers();


        // =================================================
        // COMPROBAR EMAIL EXISTENTE
        // =================================================

        const existingUser =
            users.find(
                (item) =>
                    item.email.toLowerCase() ===
                    normalizedEmail
            );


        if (existingUser) {
            throw new Error(
                "Ya existe una cuenta con ese email."
            );
        }


        // =================================================
        // CREAR USUARIO
        // =================================================

        const newUser: StoredUser = {

            id:
                users.length > 0
                    ? Math.max(
                        ...users.map(
                            (item) => item.id
                        )
                    ) + 1
                    : 1,

            nombre: normalizedNombre,

            apellido: null,

            email: normalizedEmail,

            password,

            telefono: null,

            rol: "JUGADOR",

            estado: "ACTIVO",

            avatar_url: null,

            ultimo_login:
                new Date().toISOString(),

            email_verificado: false,

            institucion_id: null,

            proveedor_id: null,

            eliminado: false,

            // Créditos iniciales
            saldo: 1000,
        };


        // =================================================
        // GUARDAR USUARIO
        // =================================================

        users.push(newUser);

        saveUsers(users);


        // =================================================
        // CREAR SESIÓN
        // =================================================

        const loggedUser: User = {
            id: newUser.id,
            nombre: newUser.nombre,
            apellido: newUser.apellido,
            email: newUser.email,
            telefono: newUser.telefono,
            rol: newUser.rol,
            estado: newUser.estado,
            avatar_url: newUser.avatar_url,
            ultimo_login: newUser.ultimo_login,
            email_verificado:
                newUser.email_verificado,
            institucion_id:
                newUser.institucion_id,
            proveedor_id:
                newUser.proveedor_id,
            eliminado:
                newUser.eliminado,
            saldo: newUser.saldo,
        };


        localStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(loggedUser)
        );


        setUser(loggedUser);


        return loggedUser;
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem(
            CURRENT_USER_KEY
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
                register,
                logout,
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