import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    Lock,
    Mail,
    LogIn,
    ShieldCheck
} from "lucide-react";


// =========================================================
// LOGIN
// =========================================================

const Login = () => {

    const {
        login
    } = useAuth();

    const navigate = useNavigate();


    // =====================================================
    // ESTADOS
    // =====================================================

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // =====================================================
    // LOGIN
    // =====================================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const user = await login(
                email,
                password
            );


            // =================================================
            // REDIRECCION SEGUN ROL
            // =================================================

            switch (user.rol) {

                case "ADMIN":

                    navigate(
                        "/admin/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                case "INSTITUCION":

                    navigate(
                        "/institucion/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                case "PROVEEDOR":

                    navigate(
                        "/proveedor/dashboard",
                        {
                            replace: true
                        }
                    );

                    break;


                default:

                    setError(
                        "El usuario no tiene un rol válido."
                    );

                    break;

            }


        } catch (err) {

            console.error(
                "Error iniciando sesión:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Email o contraseña incorrectos."
            );


        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main
            className="
                min-h-screen
                bg-slate-50
                flex
                items-center
                justify-center
                px-6
            "
        >

            <div className="w-full max-w-md">


                {/* =================================================
                    ENCABEZADO
                ================================================= */}

                <div className="mb-10 text-center">

                    <div
                        className="
                            mx-auto
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-600
                            text-white
                        "
                    >

                        <ShieldCheck size={32} />

                    </div>


                    <h1
                        className="
                            mt-6
                            text-4xl
                            font-bold
                            text-slate-900
                        "
                    >

                        Bienvenido a CotiMed

                    </h1>


                    <p
                        className="
                            mt-3
                            text-slate-600
                        "
                    >

                        Ingresá a tu cuenta para continuar

                    </p>

                </div>


                {/* =================================================
                    FORMULARIO
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        rounded-2xl
                        bg-white
                        p-8
                        shadow-lg
                    "
                >


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="mb-6">

                        <label
                            className="
                                mb-2
                                block
                                font-medium
                                text-slate-700
                            "
                        >

                            Email

                        </label>


                        <div className="relative">

                            <Mail
                                size={20}
                                className="
                                    absolute
                                    left-3
                                    top-3
                                    text-slate-400
                                "
                            />


                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    py-3
                                    pl-10
                                    pr-4
                                    outline-none
                                    focus:border-cyan-500
                                "
                                required
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        CONTRASEÑA
                    ================================================= */}

                    <div className="mb-6">

                        <label
                            className="
                                mb-2
                                block
                                font-medium
                                text-slate-700
                            "
                        >

                            Contraseña

                        </label>


                        <div className="relative">

                            <Lock
                                size={20}
                                className="
                                    absolute
                                    left-3
                                    top-3
                                    text-slate-400
                                "
                            />


                            <input
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    py-3
                                    pl-10
                                    pr-4
                                    outline-none
                                    focus:border-cyan-500
                                "
                                required
                                autoComplete="current-password"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div
                            className="
                                mb-5
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-center
                                text-sm
                                text-red-600
                            "
                        >

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        BOTÓN
                    ================================================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-lg
                            bg-cyan-600
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-cyan-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <LogIn size={20} />


                        {loading
                            ? "Ingresando..."
                            : "Ingresar"
                        }

                    </button>


                    {/* =================================================
                        RECUPERAR CONTRASEÑA
                    ================================================= */}

                    <div className="mt-6 text-center">

                        <Link
                            to="/recuperar-password"
                            className="
                                text-sm
                                text-cyan-600
                                hover:underline
                            "
                        >

                            ¿Olvidaste tu contraseña?

                        </Link>

                    </div>


                    {/* =================================================
                        REGISTRO
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            border-t
                            pt-6
                            text-center
                        "
                    >

                        <p className="text-slate-600">

                            ¿No tenés cuenta?

                        </p>


                        <div
                            className="
                                mt-3
                                flex
                                justify-center
                                gap-4
                            "
                        >

                            <Link
                                to="/registro/institucion"
                                className="
                                    font-semibold
                                    text-cyan-600
                                    hover:underline
                                "
                            >

                                Institución

                            </Link>


                            <span className="text-slate-400">

                                |

                            </span>


                            <Link
                                to="/registro/proveedor"
                                className="
                                    font-semibold
                                    text-cyan-600
                                    hover:underline
                                "
                            >

                                Proveedor

                            </Link>

                        </div>

                    </div>

                </form>

            </div>

        </main>

    );

};


export default Login;