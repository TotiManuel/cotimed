import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Car,
    Clock3,
    Coins,
    Flag,
    Gauge,
    Medal,
    OctagonAlert,
    Play,
    RotateCcw,
    Settings,
    Trophy,
    Wrench,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

interface Auto {
    id: number;
    nombre: string;
    emoji: string;
    color: string;
}

interface Pista {
    id: number;
    nombre: string;
    descripcion: string;
    vueltas: number;
    dificultad: string;
    clima: string;
    icono: string;
}

interface EstadoAuto {
    id: number;
    progreso: number;
    velocidad: number;
    vueltas: number;
    combustible: number;
    danio: number;
    enBoxes: boolean;
    accidente: boolean;
    eliminado: boolean;
    ultimaNovedad: string;
}

interface Resultado {
    ganador: Auto;
    posicionJugador: number;
    premio: number;
    multiplicador: number;
    clasificacion: number[];
}

const AUTOS: Auto[] = [
    {
        id: 1,
        nombre: "Rayo",
        emoji: "🏎️",
        color: "text-cyan-400",
    },
    {
        id: 2,
        nombre: "Fénix",
        emoji: "🏎️",
        color: "text-red-400",
    },
    {
        id: 3,
        nombre: "Titán",
        emoji: "🏎️",
        color: "text-yellow-400",
    },
    {
        id: 4,
        nombre: "Vortex",
        emoji: "🏎️",
        color: "text-purple-400",
    },
    {
        id: 5,
        nombre: "Relámpago",
        emoji: "🏎️",
        color: "text-blue-400",
    },
    {
        id: 6,
        nombre: "Inferno",
        emoji: "🏎️",
        color: "text-orange-400",
    },
    {
        id: 7,
        nombre: "Fantasma",
        emoji: "🏎️",
        color: "text-slate-300",
    },
    {
        id: 8,
        nombre: "Maverick",
        emoji: "🏎️",
        color: "text-green-400",
    },
];

const PISTAS: Pista[] = [
    {
        id: 1,
        nombre: "Circuito Nacional",
        descripcion:
            "Pista equilibrada para todo tipo de autos.",
        vueltas: 8,
        dificultad: "Normal",
        clima: "☀️ Soleado",
        icono: "🏁",
    },
    {
        id: 2,
        nombre: "Montaña Extrema",
        descripcion:
            "Curvas cerradas y grandes desniveles.",
        vueltas: 7,
        dificultad: "Difícil",
        clima: "🌧️ Lluvia",
        icono: "⛰️",
    },
    {
        id: 3,
        nombre: "Autopista Nocturna",
        descripcion:
            "Alta velocidad y poca tolerancia a errores.",
        vueltas: 10,
        dificultad: "Difícil",
        clima: "🌙 Noche",
        icono: "🌃",
    },
    {
        id: 4,
        nombre: "Desierto",
        descripcion:
            "Rectas largas pero temperaturas extremas.",
        vueltas: 6,
        dificultad: "Normal",
        clima: "☀️ Calor",
        icono: "🏜️",
    },
    {
        id: 5,
        nombre: "Circuito Urbano",
        descripcion:
            "Calles estrechas, tráfico y muchas curvas.",
        vueltas: 9,
        dificultad: "Extrema",
        clima: "🌆 Nublado",
        icono: "🏙️",
    },
];

const APUESTAS = [50, 100, 250, 500, 1000];

const MULTIPLICADORES: Record<number, number> = {
    1: 6,
    2: 3,
    3: 1.5,
};

const formatDinero = (valor: number) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(valor);

const esperar = (ms: number) =>
    new Promise<void>((resolve) =>
        setTimeout(resolve, ms),
    );

function crearEstados(): EstadoAuto[] {
    return AUTOS.map(
        (auto): EstadoAuto => ({
            id: auto.id,
            progreso: 0,
            velocidad: 0,
            vueltas: 0,
            combustible: 100,
            danio: 0,
            enBoxes: false,
            accidente: false,
            eliminado: false,
            ultimaNovedad: "Listo",
        }),
    );
}

export default function CarreraAutos() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [autoSeleccionado, setAutoSeleccionado] =
        useState<number | null>(null);

    const [pistaSeleccionada, setPistaSeleccionada] =
        useState<number>(1);

    const [apuesta, setApuesta] =
        useState<number>(100);

    const [estados, setEstados] =
        useState<EstadoAuto[]>(crearEstados);

    const [corriendo, setCorriendo] =
        useState<boolean>(false);

    const [finalizada, setFinalizada] =
        useState<boolean>(false);

    const [resultado, setResultado] =
        useState<Resultado | null>(null);

    const [mensaje, setMensaje] = useState(
        "Elegí un auto, una pista y preparate para largar.",
    );

    const [evento, setEvento] = useState(
        "Esperando la largada...",
    );

    const [carrerasJugadas, setCarrerasJugadas] =
        useState<number>(0);

    const [carrerasGanadas, setCarrerasGanadas] =
        useState<number>(0);

    const carreraTerminadaRef =
        useRef<boolean>(false);

    const pista = useMemo(
        () =>
            PISTAS.find(
                (item) =>
                    item.id === pistaSeleccionada,
            ) ?? PISTAS[0],
        [pistaSeleccionada],
    );

    const resetCarrera = () => {
        carreraTerminadaRef.current = false;

        setEstados(crearEstados());
        setCorriendo(false);
        setFinalizada(false);
        setResultado(null);

        setEvento(
            "Esperando la largada...",
        );

        setMensaje(
            "Elegí un auto, una pista y preparate para largar.",
        );
    };

    const ordenarClasificacion = (
        estadosActuales: EstadoAuto[],
    ): number[] => {
        return [...estadosActuales]
            .sort((a, b) => {
                if (
                    a.eliminado &&
                    !b.eliminado
                ) {
                    return 1;
                }

                if (
                    !a.eliminado &&
                    b.eliminado
                ) {
                    return -1;
                }

                return b.progreso - a.progreso;
            })
            .map((auto) => auto.id);
    };

    const terminarCarrera = (
        estadosFinales: EstadoAuto[],
    ) => {
        if (carreraTerminadaRef.current) {
            return;
        }

        carreraTerminadaRef.current = true;

        const clasificacion =
            ordenarClasificacion(
                estadosFinales,
            );

        const ganadorId =
            clasificacion[0];

        const ganador =
            AUTOS.find(
                (auto) =>
                    auto.id === ganadorId,
            ) ?? AUTOS[0];

        const posicionJugador =
            clasificacion.indexOf(
                autoSeleccionado ?? -1,
            ) + 1;

        const multiplicador =
            MULTIPLICADORES[
                posicionJugador
            ] ?? 0;

        const premio = Math.floor(
            apuesta * multiplicador,
        );

        setResultado({
            ganador,
            posicionJugador,
            premio,
            multiplicador,
            clasificacion,
        });

        setCorriendo(false);
        setFinalizada(true);

        setCarrerasJugadas(
            (actual) => actual + 1,
        );

        if (premio > 0) {
            setCarrerasGanadas(
                (actual) => actual + 1,
            );

            setMensaje(
                `🏆 ¡Tu auto terminó ${posicionJugador}°!`,
            );
        } else {
            setMensaje(
                `🏁 Ganó ${ganador.nombre}. Tu auto terminó ${posicionJugador}°.`,
            );
        }

        recordGame({
            juegoId: "carrera-autos",
            juegoNombre: "Carrera de Autos",
            resultado:
                premio > 0
                    ? "GANADA"
                    : "PERDIDA",
            apuesta,
            premio,
        });
    };

    const iniciarCarrera = () => {
        if (corriendo) {
            return;
        }

        if (autoSeleccionado === null) {
            setMensaje(
                "⚠️ Primero elegí tu auto.",
            );
            return;
        }

        if (apuesta > saldo) {
            setMensaje(
                "⚠️ No tenés saldo suficiente.",
            );
            return;
        }

        carreraTerminadaRef.current =
            false;

        const iniciales =
            crearEstados();

        setEstados(iniciales);
        setResultado(null);
        setFinalizada(false);

        spendBalance(
            apuesta,
            "Carrera de Autos",
        );

        setCorriendo(true);

        setEvento(
            "🏁 ¡Todos los autos están en la largada!",
        );

        setMensaje(
            `🏁 Carrera en ${pista.nombre}`,
        );
    };

    useEffect(() => {
        if (!corriendo) {
            return;
        }

        let cancelado = false;

        const ejecutarCarrera = async () => {
            let estadosActuales =
                crearEstados();

            setEstados(estadosActuales);

            setEvento("🔴 3...");

            await esperar(700);

            if (cancelado) {
                return;
            }

            setEvento("🟡 2...");

            await esperar(700);

            if (cancelado) {
                return;
            }

            setEvento("🟢 1...");

            await esperar(700);

            if (cancelado) {
                return;
            }

            setEvento("🏁 ¡LARGADA!");

            await esperar(500);

            while (
                !cancelado &&
                !carreraTerminadaRef.current
            ) {
                const progresoMaximo =
                    pista.vueltas * 100;

                estadosActuales =
                    estadosActuales.map(
                        (auto): EstadoAuto => {
                            if (
                                auto.eliminado ||
                                auto.progreso >=
                                    progresoMaximo
                            ) {
                                return {
                                    ...auto,
                                    progreso:
                                        Math.min(
                                            auto.progreso,
                                            progresoMaximo,
                                        ),
                                    vueltas:
                                        Math.min(
                                            pista.vueltas,
                                            Math.floor(
                                                Math.min(
                                                    auto.progreso,
                                                    progresoMaximo,
                                                ) /
                                                    100,
                                            ),
                                        ),
                                };
                            }

                            let velocidad: number =
                                55 +
                                Math.random() * 45;

                            if (
                                auto.id ===
                                autoSeleccionado
                            ) {
                                velocidad +=
                                    Math.random() *
                                    12;
                            }

                            if (
                                pista.dificultad ===
                                "Difícil"
                            ) {
                                velocidad *=
                                    0.94;
                            }

                            if (
                                pista.dificultad ===
                                "Extrema"
                            ) {
                                velocidad *=
                                    0.88;
                            }

                            if (
                                pista.id === 2
                            ) {
                                velocidad *=
                                    0.9;
                            }

                            if (
                                pista.id === 4
                            ) {
                                velocidad *=
                                    0.96;
                            }

                            let avance: number =
                                velocidad *
                                0.055;

                            let combustible: number =
                                Math.max(
                                    0,
                                    auto.combustible -
                                        0.18,
                                );

                            let danio: number =
                                auto.danio;

                            let enBoxes: boolean =
                                auto.enBoxes;

                            let accidente: boolean =
                                auto.accidente;

                            let eliminado: boolean =
                                auto.eliminado;

                            let novedad: string =
                                auto.ultimaNovedad;

                            if (
                                !enBoxes &&
                                combustible <
                                    15 &&
                                Math.random() <
                                    0.12
                            ) {
                                enBoxes = true;

                                novedad =
                                    "🔧 Entró en boxes";
                            }

                            if (enBoxes) {
                                avance *=
                                    0.18;

                                combustible =
                                    Math.min(
                                        100,
                                        combustible +
                                            2.5,
                                    );

                                if (
                                    Math.random() <
                                    0.1
                                ) {
                                    enBoxes =
                                        false;

                                    novedad =
                                        "🏎️ Salió de boxes";
                                }
                            }

                            const probabilidadAccidente: number =
                                pista.dificultad ===
                                "Extrema"
                                    ? 0.018
                                    : pista.dificultad ===
                                      "Difícil"
                                    ? 0.012
                                    : 0.008;

                            if (
                                !accidente &&
                                Math.random() <
                                    probabilidadAccidente
                            ) {
                                accidente =
                                    true;

                                danio +=
                                    15 +
                                    Math.floor(
                                        Math.random() *
                                            35,
                                    );

                                avance *=
                                    0.2;

                                novedad =
                                    "💥 ¡Accidente!";
                            }

                            if (
                                accidente &&
                                Math.random() <
                                    0.025
                            ) {
                                accidente =
                                    false;

                                novedad =
                                    "🏎️ Volvió a la pista";
                            }

                            if (
                                danio >= 90
                            ) {
                                eliminado =
                                    true;

                                avance = 0;

                                novedad =
                                    "🚨 Abandonó la carrera";
                            }

                            if (
                                pista.id === 5 &&
                                Math.random() <
                                    0.012
                            ) {
                                avance *=
                                    0.45;

                                novedad =
                                    "🚧 Tráfico / curva complicada";
                            }

                            if (
                                pista.id === 4 &&
                                Math.random() <
                                    0.01
                            ) {
                                avance *=
                                    0.55;

                                novedad =
                                    "🌡️ Problemas de temperatura";
                            }

                            avance = Math.max(
                                0,
                                avance,
                            );

                            const nuevoProgreso: number =
                                Math.min(
                                    progresoMaximo,
                                    auto.progreso +
                                        avance,
                                );

                            const nuevasVueltas: number =
                                Math.min(
                                    pista.vueltas,
                                    Math.floor(
                                        nuevoProgreso /
                                            100,
                                    ),
                                );

                            return {
                                ...auto,
                                progreso:
                                    nuevoProgreso,
                                velocidad,
                                vueltas:
                                    nuevasVueltas,
                                combustible,
                                danio,
                                enBoxes,
                                accidente,
                                eliminado,
                                ultimaNovedad:
                                    novedad,
                            };
                        },
                    );

                setEstados([
                    ...estadosActuales,
                ]);

                const jugador =
                    estadosActuales.find(
                        (auto) =>
                            auto.id ===
                            autoSeleccionado,
                    );

                if (jugador) {
                    setEvento(
                        jugador.ultimaNovedad,
                    );
                }

                const ganador =
                    estadosActuales.find(
                        (auto) =>
                            !auto.eliminado &&
                            auto.progreso >=
                                progresoMaximo,
                    );

                if (ganador) {
                    await esperar(400);

                    if (
                        cancelado ||
                        carreraTerminadaRef.current
                    ) {
                        return;
                    }

                    terminarCarrera(
                        estadosActuales,
                    );

                    return;
                }

                const autosActivos =
                    estadosActuales.filter(
                        (auto) =>
                            !auto.eliminado,
                    );

                if (
                    autosActivos.length ===
                    0
                ) {
                    terminarCarrera(
                        estadosActuales,
                    );

                    return;
                }

                await esperar(140);
            }
        };

        void ejecutarCarrera();

        return () => {
            cancelado = true;
        };
    }, [
        corriendo,
        autoSeleccionado,
        pista,
    ]);

    const porcentajeGanadas =
        carrerasJugadas > 0
            ? Math.round(
                  (carrerasGanadas /
                      carrerasJugadas) *
                      100,
              )
            : 0;

    return (
        <div
            className="min-h-screen bg-slate-950 px-3 py-3 text-white"
            style={{ zoom: 0.8 }}
        >
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="mb-3 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold transition hover:bg-slate-800"
                    >
                        <ArrowLeft size={15} />
                        Volver
                    </button>

                    <div className="flex items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1.5">
                        <Coins
                            size={15}
                            className="text-yellow-400"
                        />

                        <span className="text-xs font-bold text-yellow-300">
                            {formatDinero(saldo)}
                        </span>
                    </div>
                </div>

                {/* TITULO */}
                <div className="mb-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-2">
                        <span className="text-2xl">
                            🏎️
                        </span>

                        <h1 className="text-2xl font-black sm:text-3xl">
                            CARRERA DE AUTOS
                        </h1>
                    </div>

                    <p className="text-[11px] text-slate-400">
                        Elegí tu auto y mirá cómo se desarrolla la carrera.
                    </p>
                </div>

                {/* CONFIGURACION */}
                {!corriendo &&
                    !finalizada && (
                        <div className="grid gap-3 lg:grid-cols-2">

                            {/* PISTAS */}
                            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                                <div className="mb-3 flex items-center gap-1.5">
                                    <Flag
                                        size={16}
                                        className="text-cyan-400"
                                    />

                                    <h2 className="text-sm font-bold">
                                        Elegí la pista
                                    </h2>
                                </div>

                                <div className="space-y-1.5">
                                    {PISTAS.map(
                                        (item) => {
                                            const activa: boolean =
                                                pistaSeleccionada ===
                                                item.id;

                                            return (
                                                <button
                                                    key={
                                                        item.id
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setPistaSeleccionada(
                                                            item.id,
                                                        )
                                                    }
                                                    className={`w-full rounded-lg border p-2.5 text-left transition ${
                                                        activa
                                                            ? "border-cyan-400 bg-cyan-400/10"
                                                            : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">
                                                            {
                                                                item.icono
                                                            }
                                                        </span>

                                                        <div className="min-w-0 flex-1">
                                                            <div className="text-xs font-bold">
                                                                {
                                                                    item.nombre
                                                                }
                                                            </div>

                                                            <div className="mt-0.5 text-[10px] text-slate-400">
                                                                {
                                                                    item.descripcion
                                                                }
                                                            </div>

                                                            <div className="mt-1.5 flex flex-wrap gap-1.5 text-[9px]">
                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5">
                                                                    {
                                                                        item.vueltas
                                                                    }{" "}
                                                                    vueltas
                                                                </span>

                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5">
                                                                    {
                                                                        item.dificultad
                                                                    }
                                                                </span>

                                                                <span className="rounded bg-slate-800 px-1.5 py-0.5">
                                                                    {
                                                                        item.clima
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            </div>

                            {/* AUTO + APUESTA */}
                            <div className="space-y-3">

                                {/* AUTOS */}
                                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                                    <div className="mb-3 flex items-center gap-1.5">
                                        <Car
                                            size={16}
                                            className="text-red-400"
                                        />

                                        <h2 className="text-sm font-bold">
                                            Elegí tu auto
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                                        {AUTOS.map(
                                            (auto) => {
                                                const activo: boolean =
                                                    autoSeleccionado ===
                                                    auto.id;

                                                return (
                                                    <button
                                                        key={
                                                            auto.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            setAutoSeleccionado(
                                                                auto.id,
                                                            )
                                                        }
                                                        className={`rounded-lg border p-2.5 text-center transition ${
                                                            activo
                                                                ? "border-cyan-400 bg-cyan-400/10"
                                                                : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                                        }`}
                                                    >
                                                        <div className="text-2xl">
                                                            {
                                                                auto.emoji
                                                            }
                                                        </div>

                                                        <div
                                                            className={`mt-1 text-[11px] font-bold ${auto.color}`}
                                                        >
                                                            {
                                                                auto.nombre
                                                            }
                                                        </div>

                                                        {activo && (
                                                            <div className="mt-0.5 text-[8px] text-cyan-400">
                                                                TU AUTO
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>

                                {/* APUESTA */}
                                <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">

                                    <div className="mb-3 flex items-center gap-1.5">
                                        <Coins
                                            size={16}
                                            className="text-yellow-400"
                                        />

                                        <h2 className="text-sm font-bold">
                                            Apuesta
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-5 gap-1.5">
                                        {APUESTAS.map(
                                            (valor) => {
                                                const activa: boolean =
                                                    apuesta ===
                                                    valor;

                                                return (
                                                    <button
                                                        key={
                                                            valor
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            setApuesta(
                                                                valor,
                                                            )
                                                        }
                                                        className={`rounded-lg border px-1 py-2 text-[10px] font-bold ${
                                                            activa
                                                                ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                                                                : "border-slate-700 bg-slate-950"
                                                        }`}
                                                    >
                                                        $
                                                        {valor}
                                                    </button>
                                                );
                                            },
                                        )}
                                    </div>

                                    <div className="mt-2 rounded-lg bg-slate-950 p-2.5 text-center">
                                        <div className="text-[9px] text-slate-500">
                                            Apuesta
                                        </div>

                                        <div className="text-2xl font-black text-yellow-400">
                                            {formatDinero(
                                                apuesta,
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={
                                            iniciarCarrera
                                        }
                                        disabled={
                                            autoSeleccionado ===
                                                null ||
                                            apuesta >
                                                saldo
                                        }
                                        className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Play size={16} />
                                        LARGAR
                                    </button>

                                    <div className="mt-2 text-center text-[10px] text-slate-400">
                                        {mensaje}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                {/* CARRERA EN VIVO */}
                {corriendo && (
                    <div>

                        {/* INFORMACION */}
                        <div className="mb-3 grid gap-2 sm:grid-cols-3">

                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                                <div className="text-[9px] text-slate-500">
                                    Pista
                                </div>

                                <div className="mt-0.5 text-xs font-bold">
                                    {pista.icono}{" "}
                                    {pista.nombre}
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                                <div className="text-[9px] text-slate-500">
                                    Vueltas
                                </div>

                                <div className="mt-0.5 text-xs font-bold">
                                    {pista.vueltas}
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                                <div className="text-[9px] text-slate-500">
                                    Evento
                                </div>

                                <div className="mt-0.5 text-xs font-bold text-yellow-400">
                                    {evento}
                                </div>
                            </div>
                        </div>

                        {/* PISTA */}
                        <div className="mb-3 rounded-xl border border-slate-800 bg-slate-900 p-3">

                            <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <Flag
                                        size={16}
                                        className="text-red-400"
                                    />

                                    <span className="text-sm font-bold">
                                        CARRERA EN VIVO
                                    </span>
                                </div>

                                <span className="text-[10px] text-slate-500">
                                    {pista.clima}
                                </span>
                            </div>

                            <div className="mb-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5 text-center">
                                <div className="flex items-center justify-center gap-1.5 text-xs text-yellow-400">
                                    <Clock3
                                        size={14}
                                    />

                                    La carrera transcurre automáticamente
                                </div>

                                <div className="mt-0.5 text-[9px] text-slate-500">
                                    No podés modificar el resultado.
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                {[
                                    ...estados,
                                ]
                                    .sort(
                                        (a, b) =>
                                            b.progreso -
                                            a.progreso,
                                    )
                                    .map(
                                        (
                                            estado,
                                            index,
                                        ) => {
                                            const auto =
                                                AUTOS.find(
                                                    (
                                                        item,
                                                    ) =>
                                                        item.id ===
                                                        estado.id,
                                                );

                                            if (
                                                !auto
                                            ) {
                                                return null;
                                            }

                                            const progresoMaximo =
                                                pista.vueltas *
                                                100;

                                            const porcentaje: number =
                                                Math.min(
                                                    100,
                                                    (estado.progreso /
                                                        progresoMaximo) *
                                                        100,
                                                );

                                            const jugador: boolean =
                                                estado.id ===
                                                autoSeleccionado;

                                            return (
                                                <div
                                                    key={
                                                        estado.id
                                                    }
                                                >
                                                    <div className="mb-0.5 flex items-center justify-between text-[10px]">

                                                        <div className="flex items-center gap-1.5">
                                                            <span className="w-5 text-slate-500">
                                                                #
                                                                {
                                                                    index +
                                                                    1
                                                                }
                                                            </span>

                                                            <span
                                                                className={`font-bold ${auto.color}`}
                                                            >
                                                                {
                                                                    auto.nombre
                                                                }
                                                            </span>

                                                            {jugador && (
                                                                <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[8px] text-cyan-400">
                                                                    VOS
                                                                </span>
                                                            )}
                                                        </div>

                                                        <span className="text-slate-500">
                                                            {Math.floor(
                                                                porcentaje,
                                                            )}
                                                            %
                                                        </span>
                                                    </div>

                                                    <div className="relative h-8 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">

                                                        <div
                                                            className={`absolute inset-y-0 left-0 transition-all duration-100 ${
                                                                jugador
                                                                    ? "bg-cyan-400/20"
                                                                    : "bg-slate-800"
                                                            }`}
                                                            style={{
                                                                width: `${porcentaje}%`,
                                                            }}
                                                        />

                                                        <div
                                                            className="absolute top-1/2 -translate-y-1/2 text-xl transition-all duration-100"
                                                            style={{
                                                                left: `calc(${Math.min(
                                                                    porcentaje,
                                                                    96,
                                                                )}% - 12px)`,
                                                            }}
                                                        >
                                                            {
                                                                auto.emoji
                                                            }
                                                        </div>

                                                        {estado.enBoxes && (
                                                            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[9px] text-orange-400">
                                                                <Wrench
                                                                    size={
                                                                        12
                                                                    }
                                                                />
                                                                BOXES
                                                            </div>
                                                        )}

                                                        {estado.accidente &&
                                                            !estado.eliminado && (
                                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-red-400">
                                                                    💥
                                                                    PERCANCE
                                                                </div>
                                                            )}

                                                        {estado.eliminado && (
                                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-red-500">
                                                                ELIMINADO
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mt-0.5 flex flex-wrap gap-2.5 text-[8px] text-slate-500">

                                                        <span>
                                                            🏁{" "}
                                                            {Math.min(
                                                                pista.vueltas,
                                                                estado.vueltas,
                                                            )}
                                                            /
                                                            {
                                                                pista.vueltas
                                                            }
                                                        </span>

                                                        <span>
                                                            ⛽{" "}
                                                            {Math.floor(
                                                                estado.combustible,
                                                            )}
                                                            %
                                                        </span>

                                                        <span>
                                                            🔧{" "}
                                                            {Math.floor(
                                                                estado.danio,
                                                            )}
                                                            %
                                                        </span>

                                                        <span>
                                                            ⚡{" "}
                                                            {Math.floor(
                                                                estado.velocidad,
                                                            )}
                                                            km/h
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>
                        </div>

                        {/* EVENTO */}
                        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3 text-center">

                            <div className="flex items-center justify-center gap-1.5">
                                <Gauge
                                    size={17}
                                    className="text-cyan-400"
                                />

                                <span className="text-xs font-bold text-cyan-400">
                                    {evento}
                                </span>
                            </div>

                            <p className="mt-1 text-[10px] text-slate-500">
                                Mirá la carrera y esperá hasta que alguno de los autos llegue a la meta.
                            </p>
                        </div>
                    </div>
                )}

                {/* RESULTADO */}
                {finalizada &&
                    resultado && (
                        <div className="mx-auto max-w-xl">

                            <div className="rounded-xl border border-yellow-500/30 bg-slate-900 p-4 text-center">

                                <div className="mb-2 text-4xl">
                                    {resultado.posicionJugador ===
                                    1
                                        ? "🏆"
                                        : resultado.premio >
                                          0
                                        ? "🎉"
                                        : "🏁"}
                                </div>

                                <h2 className="text-2xl font-black">
                                    {resultado.posicionJugador ===
                                    1
                                        ? "¡GANASTE!"
                                        : "CARRERA TERMINADA"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-400">
                                    Ganó{" "}
                                    <b className="text-white">
                                        {
                                            resultado
                                                .ganador
                                                .nombre
                                        }
                                    </b>
                                </p>

                                <div className="mt-3 grid grid-cols-2 gap-2">

                                    <div className="rounded-lg bg-slate-950 p-3">
                                        <div className="text-[10px] text-slate-500">
                                            Tu posición
                                        </div>

                                        <div className="mt-0.5 text-2xl font-black text-cyan-400">
                                            #
                                            {
                                                resultado.posicionJugador
                                            }
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-slate-950 p-3">
                                        <div className="text-[10px] text-slate-500">
                                            Multiplicador
                                        </div>

                                        <div className="mt-0.5 text-2xl font-black text-yellow-400">
                                            x
                                            {
                                                resultado.multiplicador
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3">

                                    <div className="text-[10px] text-slate-400">
                                        Premio
                                    </div>

                                    <div className="mt-0.5 text-3xl font-black text-green-400">
                                        {formatDinero(
                                            resultado.premio,
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        resetCarrera
                                    }
                                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold transition hover:bg-slate-800"
                                >
                                    <RotateCcw
                                        size={16}
                                    />
                                    Nueva carrera
                                </button>
                            </div>

                            {/* CLASIFICACION */}
                            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900 p-3">

                                <div className="mb-3 flex items-center gap-1.5">
                                    <Trophy
                                        size={17}
                                        className="text-yellow-400"
                                    />

                                    <h3 className="text-sm font-bold">
                                        Clasificación final
                                    </h3>
                                </div>

                                <div className="space-y-1.5">
                                    {resultado.clasificacion.map(
                                        (
                                            id,
                                            index,
                                        ) => {
                                            const auto =
                                                AUTOS.find(
                                                    (
                                                        item,
                                                    ) =>
                                                        item.id ===
                                                        id,
                                                );

                                            if (
                                                !auto
                                            ) {
                                                return null;
                                            }

                                            const jugador: boolean =
                                                auto.id ===
                                                autoSeleccionado;

                                            return (
                                                <div
                                                    key={
                                                        auto.id
                                                    }
                                                    className={`flex items-center justify-between rounded-lg p-2.5 ${
                                                        jugador
                                                            ? "bg-cyan-400/10"
                                                            : "bg-slate-950"
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2">

                                                        <span className="w-6 text-xs font-black text-slate-500">
                                                            {
                                                                index +
                                                                1
                                                            }
                                                            °
                                                        </span>

                                                        <span className="text-xl">
                                                            {
                                                                auto.emoji
                                                            }
                                                        </span>

                                                        <span
                                                            className={`text-xs font-bold ${auto.color}`}
                                                        >
                                                            {
                                                                auto.nombre
                                                            }
                                                        </span>

                                                        {jugador && (
                                                            <span className="rounded bg-cyan-400/10 px-1.5 py-0.5 text-[8px] text-cyan-400">
                                                                TU AUTO
                                                            </span>
                                                        )}
                                                    </div>

                                                    {index ===
                                                        0 && (
                                                        <Trophy
                                                            size={
                                                                17
                                                            }
                                                            className="text-yellow-400"
                                                        />
                                                    )}

                                                    {index ===
                                                        1 && (
                                                        <Medal
                                                            size={
                                                                17
                                                            }
                                                            className="text-slate-300"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                {/* ESTADISTICAS */}
                <div className="mt-4 grid grid-cols-3 gap-2">

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-center">
                        <div className="text-[9px] text-slate-500">
                            Carreras
                        </div>

                        <div className="mt-0.5 text-lg font-black">
                            {carrerasJugadas}
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-center">
                        <div className="text-[9px] text-slate-500">
                            Victorias
                        </div>

                        <div className="mt-0.5 text-lg font-black text-green-400">
                            {carrerasGanadas}
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5 text-center">
                        <div className="text-[9px] text-slate-500">
                            Efectividad
                        </div>

                        <div className="mt-0.5 text-lg font-black text-cyan-400">
                            {porcentajeGanadas}
                            %
                        </div>
                    </div>
                </div>

                {/* PREMIOS */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3">

                    <h3 className="mb-3 text-sm font-bold">
                        🏆 Premios por posición
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map(
                            (posicion) => (
                                <div
                                    key={
                                        posicion
                                    }
                                    className="rounded-lg bg-slate-950 p-2.5 text-center"
                                >
                                    <div className="text-[9px] text-slate-500">
                                        {posicion}°
                                    </div>

                                    <div className="mt-0.5 text-xl font-black text-yellow-400">
                                        x
                                        {
                                            MULTIPLICADORES[
                                                posicion
                                            ]
                                        }
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    <p className="mt-2 text-center text-[9px] text-slate-500">
                        Del 4° puesto en adelante no hay premio.
                    </p>
                </div>

                {/* REGLAS */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3">

                    <div className="mb-3 flex items-center gap-1.5">
                        <Settings
                            size={16}
                            className="text-cyan-400"
                        />

                        <h3 className="text-sm font-bold">
                            Cómo funciona
                        </h3>
                    </div>

                    <div className="grid gap-2 text-[10px] text-slate-400 sm:grid-cols-2">

                        <div className="flex gap-1.5">
                            <Flag
                                size={14}
                                className="mt-0.5 shrink-0 text-cyan-400"
                            />

                            <span>
                                Elegí tu auto, la pista y la cantidad a apostar.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <OctagonAlert
                                size={14}
                                className="mt-0.5 shrink-0 text-red-400"
                            />

                            <span>
                                Durante la carrera pueden ocurrir accidentes y daños.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <Wrench
                                size={14}
                                className="mt-0.5 shrink-0 text-orange-400"
                            />

                            <span>
                                Los autos pueden entrar a boxes automáticamente.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <Clock3
                                size={14}
                                className="mt-0.5 shrink-0 text-cyan-400"
                            />

                            <span>
                                Una vez iniciada, la carrera es completamente automática.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}