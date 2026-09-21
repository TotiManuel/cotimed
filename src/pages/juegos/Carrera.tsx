import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Award,
    Clock3,
    Coins,
    Crown,
    Flag,
    Medal,
    RotateCcw,
    Trophy,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

interface Caballo {
    id: number;
    nombre: string;
    emoji: string;
    color: string;
    velocidad: number;
}

interface ResultadoCarrera {
    ganador: Caballo;
    posicionJugador: number;
    premio: number;
    multiplicador: number;
}

const CABALLOS: Caballo[] = [
    {
        id: 1,
        nombre: "Rayo",
        emoji: "🐎",
        color: "text-cyan-400",
        velocidad: 1,
    },
    {
        id: 2,
        nombre: "Trueno",
        emoji: "🏇",
        color: "text-yellow-400",
        velocidad: 1,
    },
    {
        id: 3,
        nombre: "Fuego",
        emoji: "🐎",
        color: "text-orange-400",
        velocidad: 1,
    },
    {
        id: 4,
        nombre: "Relámpago",
        emoji: "🏇",
        color: "text-purple-400",
        velocidad: 1,
    },
    {
        id: 5,
        nombre: "Titan",
        emoji: "🐎",
        color: "text-red-400",
        velocidad: 1,
    },
    {
        id: 6,
        nombre: "Sombra",
        emoji: "🏇",
        color: "text-gray-300",
        velocidad: 1,
    },
];

const APUESTAS = [50, 100, 250, 500, 1000];

const MULTIPLICADORES: Record<number, number> = {
    1: 5,
    2: 2,
    3: 1,
    4: 0,
    5: 0,
    6: 0,
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

export default function Carrera() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [
        caballoSeleccionado,
        setCaballoSeleccionado,
    ] = useState<number | null>(null);

    const [apuesta, setApuesta] =
        useState(100);

    const [corriendo, setCorriendo] =
        useState(false);

    const [progreso, setProgreso] =
        useState<Record<number, number>>(
            () =>
                Object.fromEntries(
                    CABALLOS.map(
                        (caballo) => [
                            caballo.id,
                            0,
                        ],
                    ),
                ),
        );

    const [posiciones, setPosiciones] =
        useState<number[]>([]);

    const [resultado, setResultado] =
        useState<ResultadoCarrera | null>(
            null,
        );

    const [mensaje, setMensaje] =
        useState(
            "Elegí tu caballo y preparate para la carrera",
        );

    const [carrerasJugadas, setCarrerasJugadas] =
        useState(0);

    const [carrerasGanadas, setCarrerasGanadas] =
        useState(0);

    const resetCarrera = () => {
        setProgreso(
            Object.fromEntries(
                CABALLOS.map(
                    (caballo) => [
                        caballo.id,
                        0,
                    ],
                ),
            ),
        );

        setPosiciones([]);
        setResultado(null);

        setMensaje(
            "Elegí tu caballo y preparate para la carrera",
        );
    };

    useEffect(() => {
        if (!corriendo) return;

        let cancelado = false;

        const ejecutarCarrera =
            async () => {
                setMensaje(
                    "🏁 ¡La carrera comenzó!",
                );

                const posicionesInternas: number[] =
                    [];

                const progresoActual: Record<
                    number,
                    number
                > = Object.fromEntries(
                    CABALLOS.map(
                        (caballo) => [
                            caballo.id,
                            0,
                        ],
                    ),
                );

                const velocidades: Record<
                    number,
                    number
                > = {};

                CABALLOS.forEach(
                    (caballo) => {
                        velocidades[
                            caballo.id
                        ] =
                            0.65 +
                            Math.random() *
                                0.65;
                    },
                );

                while (
                    !cancelado &&
                    posicionesInternas.length <
                        CABALLOS.length
                ) {
                    for (const caballo of CABALLOS) {
                        if (
                            posicionesInternas.includes(
                                caballo.id,
                            )
                        ) {
                            continue;
                        }

                        const variacion =
                            0.35 +
                            Math.random() *
                                0.7 +
                            velocidades[
                                caballo.id
                            ] *
                                0.35;

                        progresoActual[
                            caballo.id
                        ] = Math.min(
                            100,
                            progresoActual[
                                caballo.id
                            ] + variacion,
                        );
                    }

                    const queLlegaron =
                        CABALLOS.filter(
                            (caballo) =>
                                progresoActual[
                                    caballo.id
                                ] >= 100 &&
                                !posicionesInternas.includes(
                                    caballo.id,
                                ),
                        );

                    queLlegaron.forEach(
                        (caballo) => {
                            posicionesInternas.push(
                                caballo.id,
                            );
                        },
                    );

                    setProgreso({
                        ...progresoActual,
                    });

                    setPosiciones([
                        ...posicionesInternas,
                    ]);

                    await esperar(90);
                }

                if (cancelado) return;

                const ganadorId =
                    posicionesInternas[0];

                const ganador =
                    CABALLOS.find(
                        (caballo) =>
                            caballo.id ===
                            ganadorId,
                    ) ??
                    CABALLOS[0];

                const posicionJugador =
                    posicionesInternas.indexOf(
                        caballoSeleccionado ??
                            -1,
                    ) + 1;

                const multiplicador =
                    MULTIPLICADORES[
                        posicionJugador
                    ] ?? 0;

                const premio =
                    apuesta *
                    multiplicador;

                setResultado({
                    ganador,
                    posicionJugador,
                    premio,
                    multiplicador,
                });

                setCarrerasJugadas(
                    (actual) => actual + 1,
                );

                if (premio > 0) {
                    setCarrerasGanadas(
                        (actual) =>
                            actual + 1,
                    );

                    setMensaje(
                        `🎉 ¡Tu caballo terminó ${posicionJugador}°!`,
                    );
                } else {
                    setMensaje(
                        `🏁 Ganó ${ganador.nombre}. Tu caballo terminó ${posicionJugador}°.`,
                    );
                }

                recordGame({
                    juegoId: "carrera",
                    juegoNombre: "Carrera",
                    resultado:
                        premio > 0
                            ? "GANADA"
                            : "PERDIDA",
                    apuesta,
                    premio,
                });

                setCorriendo(false);
            };

        ejecutarCarrera();

        return () => {
            cancelado = true;
        };
    }, [
        corriendo,
        caballoSeleccionado,
        apuesta,
        recordGame,
    ]);

    const iniciarCarrera = () => {
        if (corriendo) return;

        if (!caballoSeleccionado) {
            setMensaje(
                "⚠️ Primero elegí un caballo",
            );
            return;
        }

        if (apuesta > saldo) {
            setMensaje(
                "⚠️ No tenés saldo suficiente",
            );
            return;
        }

        resetCarrera();

        spendBalance(
            apuesta,
            "Carrera",
        );

        setCorriendo(true);
    };

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
                            {formatDinero(
                                saldo,
                            )}
                        </span>
                    </div>
                </div>

                {/* TITULO */}

                <div className="mb-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-2">
                        <span className="text-2xl">
                            🐎
                        </span>

                        <h1 className="text-2xl font-black sm:text-4xl">
                            CARRERA
                        </h1>
                    </div>

                    <p className="text-[11px] text-slate-400">
                        Elegí un corredor y apostá
                        por él
                    </p>
                </div>

                {/* PISTA */}

                <div className="mb-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
                        <div className="flex items-center gap-1.5">
                            <Flag
                                size={15}
                                className="text-red-400"
                            />

                            <span className="text-xs font-bold">
                                Pista de carrera
                            </span>
                        </div>

                        {corriendo && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-400">
                                <Clock3 size={13} />
                                EN CARRERA
                            </div>
                        )}
                    </div>

                    <div className="p-3">
                        <div className="space-y-2">
                            {CABALLOS.map(
                                (
                                    caballo,
                                    index,
                                ) => {
                                    const avance =
                                        progreso[
                                            caballo.id
                                        ] ?? 0;

                                    const posicion =
                                        posiciones.indexOf(
                                            caballo.id,
                                        );

                                    return (
                                        <div
                                            key={
                                                caballo.id
                                            }
                                            className="relative"
                                        >
                                            <div className="mb-0.5 flex items-center justify-between text-[10px]">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="w-4 text-slate-500">
                                                        {index +
                                                            1}
                                                    </span>

                                                    <span className="font-bold">
                                                        {
                                                            caballo.nombre
                                                        }
                                                    </span>
                                                </div>

                                                {posicion >=
                                                    0 && (
                                                    <span className="font-bold text-yellow-400">
                                                        #
                                                        {posicion +
                                                            1}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="relative h-9 overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
                                                <div className="absolute bottom-0 right-3 top-0 border-r-2 border-dashed border-white/30" />

                                                <div
                                                    className="absolute inset-y-0 left-0 rounded-r-lg bg-slate-800/60"
                                                    style={{
                                                        width: `${avance}%`,
                                                    }}
                                                />

                                                <div
                                                    className="absolute top-1/2 -translate-y-1/2 text-2xl transition-all duration-75"
                                                    style={{
                                                        left: `calc(${Math.min(
                                                            avance,
                                                            96,
                                                        )}% - 14px)`,
                                                    }}
                                                >
                                                    {
                                                        caballo.emoji
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>

                        <div className="mt-2 flex justify-end text-[10px] text-slate-500">
                            META 🏁
                        </div>
                    </div>
                </div>

                {/* SELECCION */}

                {!resultado && (
                    <div className="grid gap-3 lg:grid-cols-2">

                        {/* CABALLOS */}

                        <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                            <div className="mb-3 flex items-center gap-1.5">
                                <Flag
                                    size={16}
                                    className="text-cyan-400"
                                />

                                <h2 className="text-sm font-bold">
                                    Elegí tu corredor
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {CABALLOS.map(
                                    (caballo) => {
                                        const activo =
                                            caballoSeleccionado ===
                                            caballo.id;

                                        return (
                                            <button
                                                key={
                                                    caballo.id
                                                }
                                                type="button"
                                                disabled={
                                                    corriendo
                                                }
                                                onClick={() =>
                                                    setCaballoSeleccionado(
                                                        caballo.id,
                                                    )
                                                }
                                                className={`rounded-lg border p-2.5 text-center transition ${
                                                    activo
                                                        ? "border-cyan-400 bg-cyan-400/10"
                                                        : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                                } ${
                                                    corriendo
                                                        ? "cursor-not-allowed opacity-60"
                                                        : ""
                                                }`}
                                            >
                                                <div className="mb-1 text-3xl">
                                                    {
                                                        caballo.emoji
                                                    }
                                                </div>

                                                <div
                                                    className={`text-xs font-bold ${caballo.color}`}
                                                >
                                                    {
                                                        caballo.nombre
                                                    }
                                                </div>

                                                {activo && (
                                                    <div className="mt-0.5 text-[9px] text-cyan-400">
                                                        SELECCIONADO
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
                                    Elegí tu apuesta
                                </h2>
                            </div>

                            <div className="grid grid-cols-5 gap-1.5">
                                {APUESTAS.map(
                                    (valor) => (
                                        <button
                                            key={
                                                valor
                                            }
                                            type="button"
                                            disabled={
                                                corriendo
                                            }
                                            onClick={() =>
                                                setApuesta(
                                                    valor,
                                                )
                                            }
                                            className={`rounded-lg border px-1 py-2 text-[10px] font-bold transition ${
                                                apuesta ===
                                                valor
                                                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                                                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                                            }`}
                                        >
                                            $
                                            {valor}
                                        </button>
                                    ),
                                )}
                            </div>

                            <div className="mt-3 rounded-lg bg-slate-950 p-3 text-center">
                                <div className="text-[10px] text-slate-400">
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
                                disabled={
                                    corriendo ||
                                    caballoSeleccionado ===
                                        null ||
                                    apuesta > saldo
                                }
                                onClick={
                                    iniciarCarrera
                                }
                                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Flag size={17} />

                                {corriendo
                                    ? "CARRERA EN CURSO..."
                                    : "¡CORRER!"}
                            </button>

                            <div className="mt-2 text-center text-[10px] text-slate-400">
                                {mensaje}
                            </div>
                        </div>
                    </div>
                )}

                {/* RESULTADO */}

                {resultado && (
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

                            <h2 className="text-xl font-black">
                                {resultado.posicionJugador ===
                                1
                                    ? "¡GANASTE!"
                                    : resultado.premio >
                                        0
                                      ? "¡PREMIO!"
                                      : "Carrera terminada"}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Ganó{" "}
                                <span className="font-bold text-white">
                                    {
                                        resultado
                                            .ganador
                                            .nombre
                                    }
                                </span>
                            </p>

                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="rounded-lg bg-slate-950 p-3">
                                    <div className="text-[10px] text-slate-500">
                                        Tu posición
                                    </div>

                                    <div className="mt-0.5 text-xl font-black text-cyan-400">
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

                                    <div className="mt-0.5 text-xl font-black text-yellow-400">
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
                                    Clasificación
                                </h3>
                            </div>

                            <div className="space-y-1.5">
                                {posiciones.map(
                                    (
                                        id,
                                        index,
                                    ) => {
                                        const caballo =
                                            CABALLOS.find(
                                                (
                                                    item,
                                                ) =>
                                                    item.id ===
                                                    id,
                                            );

                                        if (
                                            !caballo
                                        )
                                            return null;

                                        const esJugador =
                                            caballo.id ===
                                            caballoSeleccionado;

                                        return (
                                            <div
                                                key={
                                                    caballo.id
                                                }
                                                className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                                                    esJugador
                                                        ? "bg-cyan-400/10"
                                                        : "bg-slate-950"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="w-5 text-xs font-black text-slate-500">
                                                        {
                                                            index +
                                                            1
                                                        }
                                                    </span>

                                                    <span className="text-xl">
                                                        {
                                                            caballo.emoji
                                                        }
                                                    </span>

                                                    <span className="text-xs font-bold">
                                                        {
                                                            caballo.nombre
                                                        }
                                                    </span>
                                                </div>

                                                {index ===
                                                    0 && (
                                                    <Crown
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

                                                {index ===
                                                    2 && (
                                                    <Award
                                                        size={
                                                            17
                                                        }
                                                        className="text-orange-400"
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

                {/* TABLA DE PREMIOS */}

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <h3 className="mb-3 text-sm font-bold">
                        🏆 Premios según posición
                    </h3>

                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {[1, 2, 3, 4, 5, 6].map(
                            (posicion) => (
                                <div
                                    key={
                                        posicion
                                    }
                                    className={`rounded-lg p-2 text-center ${
                                        posicion ===
                                        1
                                            ? "bg-yellow-400/10"
                                            : "bg-slate-950"
                                    }`}
                                >
                                    <div className="text-[9px] text-slate-500">
                                        {posicion}°
                                    </div>

                                    <div
                                        className={`mt-0.5 text-sm font-black ${
                                            MULTIPLICADORES[
                                                posicion
                                            ] > 0
                                                ? "text-yellow-400"
                                                : "text-slate-600"
                                        }`}
                                    >
                                        {MULTIPLICADORES[
                                            posicion
                                        ] > 0
                                            ? `x${MULTIPLICADORES[posicion]}`
                                            : "—"}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>

                {/* REGLAS */}

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <h3 className="mb-2 text-sm font-bold">
                        📋 Cómo jugar
                    </h3>

                    <ul className="space-y-1 text-[10px] text-slate-400">
                        <li>
                            • Elegí uno de los 6
                            caballos.
                        </li>

                        <li>
                            • Seleccioná cuánto querés
                            apostar.
                        </li>

                        <li>
                            • Presioná{" "}
                            <b className="text-white">
                                ¡CORRER!
                            </b>
                            .
                        </li>

                        <li>
                            • La carrera se simula
                            automáticamente.
                        </li>

                        <li>
                            • Si tu caballo termina 1°,
                            ganás x5.
                        </li>

                        <li>
                            • Si termina 2°, ganás x2.
                        </li>

                        <li>
                            • Si termina 3°, recuperás
                            x1.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}