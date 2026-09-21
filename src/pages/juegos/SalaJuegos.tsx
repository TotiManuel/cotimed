import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    Play,
} from "lucide-react";


// ============================================================
// TIPOS
// ============================================================

interface Juego {
    id: string;
    titulo: string;
    descripcion: string;
    icono: string;
    ruta: string;
    categoria: string;
    color: string;
    nuevo?: boolean;
}

// ============================================================
// JUEGOS
// ============================================================

const juegos: Juego[] = [
    {
        id: "raspa",
        titulo: "Raspa y Gana",
        descripcion:
            "Raspá la tarjeta y descubrí tu premio.",
        icono: "🎫",
        ruta: "/juegos/raspa-y-gana",
        categoria: "Suerte",
        color: "bg-red-600",
    },
    {
        id: "21",
        titulo: "21",
        descripcion:
            "Acercate a 21 sin pasarte.",
        icono: "🃏",
        ruta: "/juegos/21",
        categoria: "Cartas",
        color: "bg-emerald-600",
    },
    {
        id: "arcade",
        titulo: "Arcade",
        descripcion:
            "Superá diferentes desafíos de habilidad.",
        icono: "🕹️",
        ruta: "/juegos/arcade",
        categoria: "Arcade",
        color: "bg-orange-600",
        nuevo: true,
    },
    {
        id: "ruleta",
        titulo: "Ruleta",
        descripcion:
            "Elegí tu apuesta y hacé girar la ruleta.",
        icono: "🎡",
        ruta: "/juegos/ruleta",
        categoria: "Casino",
        color: "bg-red-800",
        nuevo: true,
    },
    {
        id: "trivia",
        titulo: "Trivia",
        descripcion:
            "Poné a prueba tus conocimientos del cuerpo humano.",
        icono: "🧠",
        ruta: "/juegos/trivia",
        categoria: "Conocimiento",
        color: "bg-blue-600",
        nuevo: true,
    },
    {
        id: "bola-8",
        titulo: "Bola 8",
        descripcion:
            "Elegí números o combinaciones antes del sorteo.",
        icono: "🎱",
        ruta: "/juegos/bola8",
        categoria: "Suerte",
        color: "bg-slate-800",
        nuevo: true,
    },
    {
        id: "carrera",
        titulo: "Carrera",
        descripcion:
            "Elegí un corredor y seguí la carrera hasta la meta.",
        icono: "🏇",
        ruta: "/juegos/carrera",
        categoria: "Competencia",
        color: "bg-amber-700",
        nuevo: true,
    },
    {
        id: "carrera-autos",
        titulo: "Carrera de Autos",
        descripcion:
            "Elegí tu auto y competí en una carrera.",
        icono: "🏎️",
        ruta: "/juegos/carreraautos",
        categoria: "Competencia",
        color: "bg-orange-700",
        nuevo: true,
    },
    {
        id: "lucky-7",
        titulo: "Lucky 7",
        descripcion:
            "Elegí los carriles y buscá el 7 de la suerte.",
        icono: "🍀",
        ruta: "/juegos/lucky7",
        categoria: "Suerte",
        color: "bg-green-600",
        nuevo: true,
    },
    {
        id: "mayor-menor",
        titulo: "Mayor o Menor",
        descripcion:
            "Adiviná si la siguiente carta será mayor o menor.",
        icono: "🃏",
        ruta: "/juegos/mayormenor",
        categoria: "Cartas",
        color: "bg-blue-700",
        nuevo: true,
    },
    {
        id: "poker",
        titulo: "Póker",
        descripcion: "Jugá Texas Hold'em contra la CPU.",
        icono: "♠️",
        ruta: "/juegos/poker",
        categoria: "Cartas",
        color: "bg-purple-700",
        nuevo: true,
    },
        {
        id: "truco",
        titulo: "Truco",
        descripcion:
            "Truco Argentino.",
        icono: "🃏",
        ruta: "/juegos/truco",
        categoria: "Cartas",
        color: "bg-blue-700",
        nuevo: true,
    },
];

// ============================================================
// COMPONENTE
// ============================================================

const SalaJuegos = () => {
    const navigate = useNavigate();

    // ========================================================
    // NOTIFICACIÓN
    // ========================================================


    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div className="space-y-3">

            {/* ==================================================
                JUEGOS
            ================================================== */}

            <section>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">

                    {juegos.map((juego) => (
                        <button
                            key={juego.id}
                            type="button"
                            onClick={() =>
                                navigate(
                                    juego.ruta
                                )
                            }
                            className="group overflow-hidden rounded-lg border border-white/10 bg-slate-900 text-left transition hover:-translate-y-0.5 hover:border-red-500/40"
                        >

                            <div className="flex items-center gap-2.5 px-2.5 py-2">

                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${juego.color} text-xl`}
                                >
                                    {juego.icono}
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center gap-1">

                                        <h3 className="truncate text-[13px] font-bold">
                                            {juego.titulo}
                                        </h3>

                                        {juego.nuevo && (
                                            <span className="rounded bg-red-500/10 px-1 py-0.5 text-[7px] font-bold uppercase text-red-400">
                                                Nuevo
                                            </span>
                                        )}

                                    </div>

                                    <p className="mt-0.5 truncate text-[10px] text-slate-500">
                                        {juego.descripcion}
                                    </p>

                                    <span className="text-[8px] text-slate-600">
                                        {juego.categoria}
                                    </span>

                                </div>

                                <ArrowRight
                                    size={14}
                                    className="shrink-0 text-slate-700 transition group-hover:text-red-400"
                                />

                            </div>

                            <div className="border-t border-white/5 px-2.5 py-1">
                                <span className="flex items-center gap-1 text-[9px] font-bold text-red-400">
                                    <Play
                                        size={10}
                                        fill="currentColor"
                                    />
                                    Jugar
                                </span>
                            </div>

                        </button>
                    ))}

                </div>

            </section>

        </div>
    );
};

export default SalaJuegos;
