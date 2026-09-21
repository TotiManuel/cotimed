import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    Coins,
    Crown,
    RotateCcw,
    Sparkles,
    Trophy,
    X,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

interface Carta {
    valor: number;
    nombre: string;
    palo: string;
    simbolo: string;
    color: string;
}

const PALOS = [
    {
        nombre: "Corazones",
        simbolo: "♥",
        color: "text-red-500",
    },
    {
        nombre: "Diamantes",
        simbolo: "♦",
        color: "text-red-500",
    },
    {
        nombre: "Tréboles",
        simbolo: "♣",
        color: "text-slate-900",
    },
    {
        nombre: "Picas",
        simbolo: "♠",
        color: "text-slate-900",
    },
];

const VALORES: Record<number, string> = {
    1: "A",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "J",
    12: "Q",
    13: "K",
};

const APUESTAS = [50, 100, 250, 500, 1000];

const MULTIPLICADOR = 1.8;

const formatDinero = (valor: number) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(valor);

function crearCarta(): Carta {
    const valor =
        Math.floor(Math.random() * 13) + 1;

    const palo =
        PALOS[
            Math.floor(
                Math.random() * PALOS.length,
            )
        ];

    return {
        valor,
        nombre: VALORES[valor],
        palo: palo.nombre,
        simbolo: palo.simbolo,
        color:
            palo.nombre === "Corazones" ||
            palo.nombre === "Diamantes"
                ? "text-red-500"
                : "text-slate-900",
    };
}

function crearCartaInicial(): Carta {
    return {
        valor: 7,
        nombre: "7",
        palo: "Corazones",
        simbolo: "♥",
        color: "text-red-500",
    };
}

export default function MayorMenor() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [cartaActual, setCartaActual] =
        useState<Carta>(crearCartaInicial);

    const [cartaAnterior, setCartaAnterior] =
        useState<Carta | null>(null);

    const [apuesta, setApuesta] =
        useState(100);

    const [eleccion, setEleccion] =
        useState<"mayor" | "menor" | null>(
            null,
        );

    const [jugando, setJugando] =
        useState(false);

    const [resultado, setResultado] =
        useState<
            "ganada" | "perdida" | "empate" | null
        >(null);

    const [premio, setPremio] =
        useState(0);

    const [mensaje, setMensaje] = useState(
        "¿La próxima carta será mayor o menor?",
    );

    const [rondas, setRondas] =
        useState(0);

    const [victorias, setVictorias] =
        useState(0);

    const [derrotas, setDerrotas] =
        useState(0);

    const [, setEmpates] =
        useState(0);

    const cartaSiguiente = useMemo(
        () => null,
        [],
    );

    void cartaSiguiente;

    const comenzar = () => {
        if (jugando) return;

        if (apuesta > saldo) {
            setMensaje(
                "⚠️ No tenés saldo suficiente.",
            );
            return;
        }

        const nuevaCarta = crearCarta();

        setCartaActual(nuevaCarta);
        setCartaAnterior(null);
        setEleccion(null);
        setResultado(null);
        setPremio(0);
        setJugando(true);

        setMensaje(
            "Elegí si la próxima carta será mayor o menor.",
        );
    };

    const elegir = (
        tipo: "mayor" | "menor",
    ) => {
        if (!jugando) return;

        if (eleccion !== null) return;

        if (apuesta > saldo) {
            setMensaje(
                "⚠️ No tenés saldo suficiente.",
            );
            return;
        }

        spendBalance(
            apuesta,
            "Mayor o Menor",
        );

        setEleccion(tipo);

        const nuevaCarta = crearCarta();

        const valorActual =
            cartaActual.valor;

        const nuevoValor =
            nuevaCarta.valor;

        setCartaAnterior(cartaActual);
        setCartaActual(nuevaCarta);

        setRondas(
            (actual) => actual + 1,
        );

        if (nuevoValor === valorActual) {
            const premioEmpate = apuesta;

            setPremio(premioEmpate);
            setResultado("empate");

            setEmpates(
                (actual) => actual + 1,
            );

            setMensaje(
                `🤝 Empate. Ambas cartas son ${nuevaCarta.nombre}. Recuperás tu apuesta.`,
            );

            recordGame({
                juegoId: "mayor-menor",
                juegoNombre: "Mayor o Menor",
                resultado: "GANADA",
                apuesta,
                premio: premioEmpate,
            });

            setTimeout(() => {
                setEleccion(null);
                setResultado(null);
                setPremio(0);
            }, 1200);

            return;
        }

        const gano =
            tipo === "mayor"
                ? nuevoValor > valorActual
                : nuevoValor < valorActual;

        if (gano) {
            const premioGanado =
                Math.floor(
                    apuesta *
                        MULTIPLICADOR,
                );

            setPremio(premioGanado);
            setResultado("ganada");

            setVictorias(
                (actual) => actual + 1,
            );

            setMensaje(
                `🎉 ¡Acertaste! Salió ${nuevaCarta.nombre}.`,
            );

            recordGame({
                juegoId: "mayor-menor",
                juegoNombre: "Mayor o Menor",
                resultado: "GANADA",
                apuesta,
                premio: premioGanado,
            });

            setEleccion(null);
            setResultado(null);
            setPremio(0);

            return;
        }

        setPremio(0);
        setResultado("perdida");

        setDerrotas(
            (actual) => actual + 1,
        );

        setMensaje(
            `❌ Fallaste. Salió ${nuevaCarta.nombre}.`,
        );

        recordGame({
            juegoId: "mayor-menor",
            juegoNombre: "Mayor o Menor",
            resultado: "PERDIDA",
            apuesta,
            premio: 0,
        });

        setJugando(false);
    };

    const terminar = () => {
        setJugando(false);
        setEleccion(null);
        setResultado(null);
        setPremio(0);

        setMensaje(
            "Partida terminada. Podés comenzar otra.",
        );
    };

    const nuevaPartida = () => {
        setCartaActual(
            crearCartaInicial(),
        );
        setCartaAnterior(null);
        setEleccion(null);
        setJugando(false);
        setResultado(null);
        setPremio(0);

        setMensaje(
            "¿La próxima carta será mayor o menor?",
        );
    };

    const porcentajeAciertos =
        rondas > 0
            ? Math.round(
                  (victorias / rondas) *
                      100,
              )
            : 0;

    return (
        <div
            className="min-h-screen bg-slate-950 px-3 py-3 text-white"
            style={{ zoom: 0.8 }}
        >
            <div className="mx-auto max-w-5xl">

                {/* HEADER */}
                <div className="mb-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold transition hover:bg-slate-800"
                    >
                        <ArrowLeft size={15} />
                        Volver
                    </button>

                    <div className="flex items-center gap-1.5 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5">
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
                        <span className="text-3xl">
                            🃏
                        </span>

                        <h1 className="text-2xl font-black sm:text-3xl">
                            MAYOR O MENOR
                        </h1>
                    </div>

                    <p className="text-xs text-slate-400">
                        Adiviná si la siguiente
                        carta será mayor o menor.
                    </p>
                </div>

                {/* CARTAS */}
                <div className="flex flex-col items-center">

                    <div className="mb-4 flex items-center justify-center gap-3 sm:gap-5">

                        {/* CARTA ANTERIOR */}
                        {cartaAnterior && (
                            <>
                                <div className="hidden text-center sm:block">
                                    <div className="mb-1 text-[10px] font-bold text-slate-500">
                                        ANTERIOR
                                    </div>

                                    <div className="flex h-32 w-24 flex-col items-center justify-center rounded-xl bg-white shadow-xl">
                                        <span
                                            className={`text-4xl font-black ${cartaAnterior.color}`}
                                        >
                                            {
                                                cartaAnterior.nombre
                                            }
                                        </span>

                                        <span
                                            className={`mt-1 text-3xl ${cartaAnterior.color}`}
                                        >
                                            {
                                                cartaAnterior.simbolo
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="text-xl font-black text-slate-600">
                                    →
                                </div>
                            </>
                        )}

                        {/* CARTA ACTUAL */}
                        <div className="text-center">
                            <div className="mb-1 text-[10px] font-bold text-cyan-400">
                                CARTA ACTUAL
                            </div>

                            <div className="relative flex h-44 w-32 flex-col items-center justify-center rounded-xl bg-white shadow-2xl sm:h-48 sm:w-36">

                                <div className="absolute left-3 top-2 text-left">
                                    <div
                                        className={`text-xl font-black ${cartaActual.color}`}
                                    >
                                        {
                                            cartaActual.nombre
                                        }
                                    </div>

                                    <div
                                        className={`text-lg ${cartaActual.color}`}
                                    >
                                        {
                                            cartaActual.simbolo
                                        }
                                    </div>
                                </div>

                                <span
                                    className={`text-6xl font-black ${cartaActual.color}`}
                                >
                                    {
                                        cartaActual.nombre
                                    }
                                </span>

                                <span
                                    className={`mt-1 text-4xl ${cartaActual.color}`}
                                >
                                    {
                                        cartaActual.simbolo
                                    }
                                </span>

                                <div className="absolute bottom-2 right-3 rotate-180 text-left">
                                    <div
                                        className={`text-xl font-black ${cartaActual.color}`}
                                    >
                                        {
                                            cartaActual.nombre
                                        }
                                    </div>

                                    <div
                                        className={`text-lg ${cartaActual.color}`}
                                    >
                                        {
                                            cartaActual.simbolo
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MENSAJE */}
                    <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            <Sparkles
                                size={15}
                                className="text-yellow-400"
                            />

                            <span className="text-xs font-bold">
                                {mensaje}
                            </span>
                        </div>
                    </div>

                    {/* APUESTA */}
                    {!jugando && (
                        <div className="mb-4 w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-4">

                            <div className="mb-3 flex items-center gap-1.5">
                                <Coins
                                    size={17}
                                    className="text-yellow-400"
                                />

                                <h2 className="text-sm font-bold">
                                    Apuesta
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
                                            onClick={() =>
                                                setApuesta(
                                                    valor,
                                                )
                                            }
                                            className={`rounded-lg border px-1.5 py-2 text-xs font-bold transition ${
                                                apuesta ===
                                                valor
                                                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                                                    : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                            }`}
                                        >
                                            $
                                            {valor}
                                        </button>
                                    ),
                                )}
                            </div>

                            <div className="mt-3 rounded-lg bg-slate-950 p-3 text-center">
                                <div className="text-[10px] text-slate-500">
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
                                    comenzar
                                }
                                disabled={
                                    apuesta >
                                    saldo
                                }
                                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Sparkles
                                    size={17}
                                />
                                COMENZAR PARTIDA
                            </button>
                        </div>
                    )}

                    {/* ELECCION */}
                    {jugando && (
                        <div className="w-full max-w-xl">

                            <div className="mb-3 text-center text-xs text-slate-400">
                                ¿Qué creés que
                                saldrá?
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        elegir(
                                            "mayor",
                                        )
                                    }
                                    disabled={
                                        eleccion !==
                                        null
                                    }
                                    className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-5 transition hover:border-green-400 hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="text-3xl">
                                        ⬆️
                                    </span>

                                    <span className="text-lg font-black text-green-400">
                                        MAYOR
                                    </span>

                                    <span className="text-[10px] text-slate-400">
                                        La próxima
                                        carta debe
                                        tener un valor
                                        superior
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        elegir(
                                            "menor",
                                        )
                                    }
                                    disabled={
                                        eleccion !==
                                        null
                                    }
                                    className="group flex flex-col items-center justify-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-5 transition hover:border-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="text-3xl">
                                        ⬇️
                                    </span>

                                    <span className="text-lg font-black text-red-400">
                                        MENOR
                                    </span>

                                    <span className="text-[10px] text-slate-400">
                                        La próxima
                                        carta debe
                                        tener un valor
                                        inferior
                                    </span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    terminar
                                }
                                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:bg-slate-800"
                            >
                                <X size={16} />
                                TERMINAR PARTIDA
                            </button>
                        </div>
                    )}

                    {/* RESULTADO */}
                    {resultado && (
                        <div className="mt-4 w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">

                            {resultado ===
                                "ganada" && (
                                <>
                                    <div className="mb-1 text-4xl">
                                        🎉
                                    </div>

                                    <h2 className="text-xl font-black text-green-400">
                                        ¡ACERTASTE!
                                    </h2>
                                </>
                            )}

                            {resultado ===
                                "perdida" && (
                                <>
                                    <div className="mb-1 text-4xl">
                                        ❌
                                    </div>

                                    <h2 className="text-xl font-black text-red-400">
                                        FALLASTE
                                    </h2>
                                </>
                            )}

                            {resultado ===
                                "empate" && (
                                <>
                                    <div className="mb-1 text-4xl">
                                        🤝
                                    </div>

                                    <h2 className="text-xl font-black text-yellow-400">
                                        EMPATE
                                    </h2>
                                </>
                            )}

                            {premio > 0 && (
                                <div className="mt-2 text-lg font-black text-yellow-400">
                                    Premio:{" "}
                                    {formatDinero(
                                        premio,
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ESTADISTICAS */}
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-center">
                        <div className="text-[10px] text-slate-500">
                            Rondas
                        </div>

                        <div className="mt-0.5 text-lg font-black">
                            {rondas}
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-center">
                        <div className="text-[10px] text-slate-500">
                            Aciertos
                        </div>

                        <div className="mt-0.5 text-lg font-black text-green-400">
                            {victorias}
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-center">
                        <div className="text-[10px] text-slate-500">
                            Fallos
                        </div>

                        <div className="mt-0.5 text-lg font-black text-red-400">
                            {derrotas}
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-900 p-3 text-center">
                        <div className="text-[10px] text-slate-500">
                            Aciertos %
                        </div>

                        <div className="mt-0.5 text-lg font-black text-cyan-400">
                            {porcentajeAciertos}%
                        </div>
                    </div>
                </div>

                {/* REGLAS */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900 p-4">

                    <div className="mb-3 flex items-center gap-1.5">
                        <Trophy
                            size={17}
                            className="text-yellow-400"
                        />

                        <h3 className="text-sm font-bold">
                            Cómo funciona
                        </h3>
                    </div>

                    <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-2">

                        <div className="flex gap-1.5">
                            <Check
                                size={15}
                                className="mt-0.5 shrink-0 text-green-400"
                            />

                            <span>
                                Adiviná si la
                                siguiente carta
                                será mayor o
                                menor.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <Coins
                                size={15}
                                className="mt-0.5 shrink-0 text-yellow-400"
                            />

                            <span>
                                Un acierto paga
                                x
                                {MULTIPLICADOR}.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <Sparkles
                                size={15}
                                className="mt-0.5 shrink-0 text-cyan-400"
                            />

                            <span>
                                Si sale el mismo
                                valor, recuperás
                                tu apuesta.
                            </span>
                        </div>

                        <div className="flex gap-1.5">
                            <Crown
                                size={15}
                                className="mt-0.5 shrink-0 text-yellow-400"
                            />

                            <span>
                                Después de acertar
                                podés seguir con la
                                nueva carta.
                            </span>
                        </div>
                    </div>
                </div>

                {/* NUEVA PARTIDA */}
                {!jugando && (
                    <button
                        type="button"
                        onClick={
                            nuevaPartida
                        }
                        className="mx-auto mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-xs font-bold transition hover:bg-slate-800"
                    >
                        <RotateCcw
                            size={16}
                        />
                        Reiniciar cartas
                    </button>
                )}
            </div>
        </div>
    );
}