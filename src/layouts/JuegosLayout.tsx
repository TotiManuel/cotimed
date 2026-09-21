import {
    Coins,
    Gamepad2,
    LogOut,
    User,
    Zap,
} from "lucide-react";

import {
    Outlet,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useGame } from "../context/GameContext";

const JuegosLayout = () => {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();

    const {
        saldo,
        nivel,
        xpActualNivel,
        progresoNivel,
        stats,
    } = useGame();

    const handleLogout = () => {
        logout();

        navigate("/login", {
            replace: true,
        });
    };


    return (
        <div className="min-h-screen bg-zinc-950 text-white">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-50 border-b border-cyan-500/10 bg-zinc-950/95 backdrop-blur">

                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">

                    {/* LOGO */}

                    <button
                        onClick={() =>
                            navigate("/juegos")
                        }
                        className="group flex items-center gap-3"
                    >
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 transition group-hover:bg-cyan-500">

                            <Gamepad2
                                size={22}
                                strokeWidth={2.5}
                            />

                        </div>

                        <div className="hidden text-left sm:block">

                            <h1 className="text-base font-black">
                                Sala de Juegos
                            </h1>

                            <p className="text-[11px] text-zinc-600">
                                Jugá · Ganá · Subí de nivel
                            </p>

                        </div>
                    </button>


                    {/* INFORMACIÓN */}

                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* SALDO */}

                        <button
                            onClick={() =>
                                navigate("/juegos")
                            }
                            className="flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 transition hover:border-cyan-500/40 hover:bg-cyan-500/10"
                        >
                            <Coins
                                size={17}
                                className="text-cyan-400"
                            />

                            <div className="text-left">

                                <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                                    Saldo
                                </p>

                                <p className="text-sm font-black text-cyan-300">
                                    {saldo.toLocaleString(
                                        "es-AR"
                                    )}
                                </p>

                            </div>

                        </button>


                        {/* NIVEL */}

                        <div className="hidden min-w-[130px] rounded-lg border border-cyan-500/10 bg-zinc-900 px-3 py-2 md:block">

                            <div className="mb-1 flex items-center justify-between">

                                <div className="flex items-center gap-1.5">

                                    <Zap
                                        size={13}
                                        className="text-cyan-400"
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                        Nivel {nivel}
                                    </span>

                                </div>

                                <span className="text-[10px] text-zinc-600">
                                    {xpActualNivel}/500
                                </span>

                            </div>

                            <div className="h-1 overflow-hidden rounded-full bg-zinc-800">

                                <div
                                    className="h-full rounded-full bg-cyan-500 transition-all"
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            progresoNivel
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>


                        {/* USUARIO */}

                        {user && (
                            <div className="hidden items-center gap-2 lg:flex">

                                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-cyan-500/20 bg-zinc-900">

                                    {user.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt={
                                                user.nombre ||
                                                "Jugador"
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <User
                                            size={16}
                                            className="text-zinc-500"
                                        />
                                    )}

                                </div>

                                <div className="text-left">

                                    <p className="max-w-[130px] truncate text-sm font-semibold">
                                        {user.nombre ||
                                            user.email ||
                                            "Jugador"}
                                    </p>

                                    <p className="text-[10px] text-zinc-600">
                                        {stats.partidas} partidas
                                    </p>

                                </div>

                            </div>
                        )}


                        {/* SALIR */}

                        <button
                            onClick={handleLogout}
                            title="Cerrar sesión"
                            className="flex h-9 items-center justify-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-3 text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 sm:px-4"
                        >

                            <LogOut size={16} />

                            <span className="hidden text-sm font-medium sm:inline">
                                Salir
                            </span>

                        </button>

                    </div>

                </div>

            </header>


            {/* =====================================================
                CONTENIDO
            ===================================================== */}

            <main className="mx-auto min-h-[calc(100vh-110px)] max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                <Outlet />
            </main>

        </div>
    );
};

export default JuegosLayout;