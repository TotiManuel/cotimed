import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Lock,
    Mail,
    LogIn,
    Eye,
    EyeOff,
    Gamepad2,
    User,
    UserPlus,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";


type Mode = "login" | "register";


const Login = () => {

    const {
        login,
        register,
    } = useAuth();

    const navigate = useNavigate();


    // =====================================================
    // MODO
    // =====================================================

    const [mode, setMode] =
        useState<Mode>("login");


    // =====================================================
    // CAMPOS
    // =====================================================

    const [nombre, setNombre] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");


    // =====================================================
    // ESTADO
    // =====================================================

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // CAMBIAR MODO
    // =====================================================

    const changeMode = (newMode: Mode) => {

        setMode(newMode);

        setError("");

        setPassword("");

        setConfirmPassword("");
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");


        // =================================================
        // VALIDACIONES GENERALES
        // =================================================

        if (!email.trim()) {

            setError(
                "Ingresá tu email."
            );

            return;
        }


        if (!password) {

            setError(
                "Ingresá tu contraseña."
            );

            return;
        }


        // =================================================
        // REGISTRO
        // =================================================

        if (mode === "register") {

            if (!nombre.trim()) {

                setError(
                    "Ingresá tu nombre."
                );

                return;
            }


            if (password.length < 6) {

                setError(
                    "La contraseña debe tener al menos 6 caracteres."
                );

                return;
            }


            if (
                password !==
                confirmPassword
            ) {

                setError(
                    "Las contraseñas no coinciden."
                );

                return;
            }
        }


        setLoading(true);


        try {

            if (mode === "login") {

                await login(
                    email.trim(),
                    password
                );

            } else {

                await register(
                    nombre.trim(),
                    email.trim(),
                    password
                );
            }


            navigate(
                "/juegos",
                {
                    replace: true,
                }
            );

        } catch (err) {

            console.error(
                "Error de autenticación:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white">

            <div className="w-full max-w-sm">


                {/* =================================================
                    LOGO
                ================================================= */}

                <div className="mb-7 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/20">

                        <Gamepad2 size={34} />

                    </div>


                    <h1 className="mt-5 text-3xl font-bold">

                        Sala de Juegos

                    </h1>


                    <p className="mt-2 text-sm text-slate-400">

                        {mode === "login"
                            ? "Ingresá para comenzar a jugar"
                            : "Creá tu cuenta y comenzá a jugar"}

                    </p>

                </div>


                {/* =================================================
                    FORMULARIO
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
                >


                    {/* =================================================
                        SELECTOR
                    ================================================= */}

                    <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-800 p-1">

                        <button
                            type="button"
                            onClick={() =>
                                changeMode("login")
                            }
                            className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                                mode === "login"
                                    ? "bg-indigo-600 text-white shadow"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Ingresar
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                changeMode("register")
                            }
                            className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                                mode === "register"
                                    ? "bg-indigo-600 text-white shadow"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Crear cuenta
                        </button>

                    </div>


                    {/* =================================================
                        NOMBRE
                    ================================================= */}

                    {mode === "register" && (

                        <div className="mb-5">

                            <label
                                htmlFor="nombre"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Nombre
                            </label>


                            <div className="relative">

                                <User
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <input
                                    id="nombre"
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => {
                                        setNombre(
                                            e.target.value
                                        );

                                        setError("");
                                    }}
                                    placeholder="Tu nombre"
                                    autoComplete="name"
                                    autoFocus
                                    disabled={loading}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                                />

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="mb-5">

                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Email
                        </label>


                        <div className="relative">

                            <Mail
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />


                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(
                                        e.target.value
                                    );

                                    setError("");
                                }}
                                placeholder="tu@email.com"
                                autoComplete="email"
                                autoFocus={
                                    mode === "login"
                                }
                                disabled={loading}
                                className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        CONTRASEÑA
                    ================================================= */}

                    <div className="mb-5">

                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            Contraseña
                        </label>


                        <div className="relative">

                            <Lock
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />


                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) => {
                                    setPassword(
                                        e.target.value
                                    );

                                    setError("");
                                }}
                                placeholder="Mínimo 6 caracteres"
                                autoComplete={
                                    mode === "login"
                                        ? "current-password"
                                        : "new-password"
                                }
                                disabled={loading}
                                className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-10 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                            />


                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                disabled={loading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                                aria-label={
                                    showPassword
                                        ? "Ocultar contraseña"
                                        : "Mostrar contraseña"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        REPETIR CONTRASEÑA
                    ================================================= */}

                    {mode === "register" && (

                        <div className="mb-5">

                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Repetir contraseña
                            </label>


                            <div className="relative">

                                <Lock
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={
                                        confirmPassword
                                    }
                                    onChange={(e) => {
                                        setConfirmPassword(
                                            e.target.value
                                        );

                                        setError("");
                                    }}
                                    placeholder="Repetí tu contraseña"
                                    autoComplete="new-password"
                                    disabled={loading}
                                    className="w-full rounded-xl border border-white/10 bg-slate-800 py-3 pl-10 pr-12 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Ocultar contraseña"
                                            : "Mostrar contraseña"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        BONIFICACIÓN REGISTRO
                    ================================================= */}

                    {mode === "register" && (

                        <div className="mb-5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">

                            <p className="text-sm text-indigo-300">

                                🎁 Al registrarte recibís{" "}
                                <strong>
                                    1.000 créditos
                                </strong>{" "}
                                para jugar.

                            </p>

                        </div>

                    )}


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        BOTÓN
                    ================================================= */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {loading ? (

                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                {mode === "login"
                                    ? "Ingresando..."
                                    : "Creando cuenta..."}
                            </>

                        ) : (

                            <>
                                {mode === "login" ? (
                                    <LogIn size={19} />
                                ) : (
                                    <UserPlus size={19} />
                                )}

                                {mode === "login"
                                    ? "Ingresar"
                                    : "Crear cuenta"}

                            </>

                        )}

                    </button>

                </form>


                {/* =================================================
                    PIE
                ================================================= */}

                <p className="mt-6 text-center text-xs text-slate-600">

                    Sala de Juegos

                </p>

            </div>

        </main>
    );
};


export default Login;