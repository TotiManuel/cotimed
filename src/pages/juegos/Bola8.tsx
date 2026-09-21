import {
    ArrowLeft,
    Check,
    Coins,
    RotateCw,
    Sparkles,
    Trophy,
    X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

type Modalidad = "5" | "7" | "8";

interface Resultado {
    jugadores: number[];
    ganadores: number[];
    coincidencias: number[];
    premio: number;
    multiplicador: number;
    mensaje: string;
    ganado: boolean;
}

const NUMEROS = Array.from(
    { length: 30 },
    (_, i) => i + 1,
);

const APUESTAS = [50, 100, 250, 500, 1000];

const MODALIDADES: Record<
    Modalidad,
    {
        nombre: string;
        descripcion: string;
        minimo: number;
        premioBase: number;
        jackpot: number;
    }
> = {
    "5": {
        nombre: "Bola 5",
        descripcion:
            "Elegí 5 números y acertá al menos 2.",
        minimo: 2,
        premioBase: 2,
        jackpot: 20,
    },
    "7": {
        nombre: "Bola 7",
        descripcion:
            "Elegí 7 números y acertá al menos 3.",
        minimo: 3,
        premioBase: 3,
        jackpot: 50,
    },
    "8": {
        nombre: "Bola 8",
        descripcion:
            "Elegí 8 números y acertá al menos 4.",
        minimo: 4,
        premioBase: 5,
        jackpot: 100,
    },
};

const formatoDinero = (valor: number) =>
    `$${valor.toLocaleString("es-AR")}`;

const mezclar = <T,>(array: T[]): T[] => {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1),
        );

        [copia[i], copia[j]] = [
            copia[j],
            copia[i],
        ];
    }

    return copia;
};

const sortearNumeros = (
    cantidad: number,
): number[] =>
    mezclar(NUMEROS)
        .slice(0, cantidad)
        .sort((a, b) => a - b);

const calcularMultiplicador = (
    coincidencias: number,
    modalidad: Modalidad,
): number => {
    if (modalidad === "5") {
        if (coincidencias === 5) return 20;
        if (coincidencias === 4) return 8;
        if (coincidencias === 3) return 4;
        if (coincidencias === 2) return 2;
    }

    if (modalidad === "7") {
        if (coincidencias === 7) return 50;
        if (coincidencias === 6) return 20;
        if (coincidencias === 5) return 10;
        if (coincidencias === 4) return 5;
        if (coincidencias === 3) return 3;
    }

    if (modalidad === "8") {
        if (coincidencias === 8) return 100;
        if (coincidencias === 7) return 35;
        if (coincidencias === 6) return 15;
        if (coincidencias === 5) return 8;
        if (coincidencias === 4) return 5;
    }

    return 0;
};

export default function Bola8() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [modalidad, setModalidad] =
        useState<Modalidad>("5");

    const [apuesta, setApuesta] =
        useState(100);

    const [seleccionados, setSeleccionados] =
        useState<number[]>([]);

    const [resultado, setResultado] =
        useState<Resultado | null>(null);

    const [sorteando, setSorteando] =
        useState(false);

    const [numeroAnimado, setNumeroAnimado] =
        useState<number | null>(null);

    const [ultimoPremio, setUltimoPremio] =
        useState(0);

    const [partidas, setPartidas] =
        useState(0);

    const config = MODALIDADES[modalidad];

    const cantidadNumeros =
        Number(modalidad);

    const maxSeleccion = cantidadNumeros;

    const seleccionCompleta =
        seleccionados.length === maxSeleccion;

    const puedeJugar =
        seleccionCompleta &&
        !sorteando &&
        saldo >= apuesta;

    const premioMaximo =
        apuesta *
        (modalidad === "5"
            ? 20
            : modalidad === "7"
              ? 50
              : 100);

    const cambiarModalidad = (
        nueva: Modalidad,
    ) => {
        if (sorteando) return;

        setModalidad(nueva);
        setSeleccionados([]);
        setResultado(null);
        setNumeroAnimado(null);
    };

    const cambiarApuesta = (
        direccion: number,
    ) => {
        if (sorteando) return;

        const indice =
            APUESTAS.indexOf(apuesta);

        const nuevoIndice = Math.min(
            APUESTAS.length - 1,
            Math.max(
                0,
                indice + direccion,
            ),
        );

        setApuesta(
            APUESTAS[nuevoIndice],
        );

        setResultado(null);
    };

    const seleccionarNumero = (
        numero: number,
    ) => {
        if (sorteando) return;

        setResultado(null);

        setSeleccionados((actuales) => {
            if (actuales.includes(numero)) {
                return actuales.filter(
                    (n) => n !== numero,
                );
            }

            if (
                actuales.length >=
                maxSeleccion
            ) {
                return actuales;
            }

            return [...actuales, numero].sort(
                (a, b) => a - b,
            );
        });
    };

    const limpiarSeleccion = () => {
        if (sorteando) return;

        setSeleccionados([]);
        setResultado(null);
    };

    const jugar = async () => {
        if (!puedeJugar) return;

        spendBalance(
            apuesta,
            "Bola 8",
        );

        setSorteando(true);
        setResultado(null);

        const ganadores =
            sortearNumeros(5);

        for (let i = 0; i < 12; i++) {
            await new Promise<void>(
                (resolve) => {
                    setTimeout(resolve, 90);
                },
            );

            setNumeroAnimado(
                ganadores[
                    i % ganadores.length
                ],
            );
        }

        const coincidencias =
            seleccionados.filter(
                (numero) =>
                    ganadores.includes(
                        numero,
                    ),
            );

        const multiplicador =
            calcularMultiplicador(
                coincidencias.length,
                modalidad,
            );

        const premio =
            apuesta * multiplicador;

        let mensaje =
            "No hubo premio";

        if (multiplicador > 0) {
            if (
                coincidencias.length ===
                cantidadNumeros
            ) {
                mensaje =
                    "¡COMBINACIÓN PERFECTA!";
            } else if (
                multiplicador >=
                config.jackpot
            ) {
                mensaje =
                    "¡JACKPOT!";
            } else {
                mensaje = `¡${coincidencias.length} coincidencias!`;
            }
        }

        const resultadoFinal: Resultado = {
            jugadores: [...seleccionados],
            ganadores,
            coincidencias,
            premio,
            multiplicador,
            mensaje,
            ganado: premio > 0,
        };

        setNumeroAnimado(null);
        setResultado(resultadoFinal);
        setUltimoPremio(premio);
        setPartidas(
            (actual) => actual + 1,
        );
        setSorteando(false);

        recordGame({
            juegoId: "bola-8",
            juegoNombre: "Bola 8",
            resultado:
                premio > 0
                    ? "GANADA"
                    : "PERDIDA",
            apuesta,
            premio,
        });
    };

    return (
        <div
            className="min-h-screen bg-slate-950 text-white"
            style={{ zoom: 0.8 }}
        >
            <div className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-4 sm:py-4">
                {/* HEADER */}

                <header className="mb-3 flex items-center justify-between gap-2">
                    <button
                        onClick={() =>
                            navigate(-1)
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                    >
                        <ArrowLeft size={15} />
                        Volver
                    </button>

                    <div className="flex items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1.5">
                        <Coins
                            size={15}
                            className="text-cyan-300"
                        />

                        <span className="text-xs font-black text-cyan-200">
                            {formatoDinero(
                                saldo,
                            )}
                        </span>
                    </div>
                </header>

                {/* TITULO */}

                <section className="mb-3 text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                        <span className="text-2xl">
                            🎱
                        </span>

                        <h1 className="text-2xl font-black sm:text-4xl">
                            BOLA{" "}
                            <span className="text-cyan-400">
                                8
                            </span>
                        </h1>

                        <span className="text-2xl">
                            🎱
                        </span>
                    </div>

                    <p className="text-[11px] text-slate-400">
                        Elegí tus números y descubrí
                        cuántos acertaste.
                    </p>
                </section>

                {/* MODALIDAD */}

                <section className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="mb-2">
                        <h2 className="text-sm font-black">
                            Elegí tu modalidad
                        </h2>

                        <p className="text-[10px] text-slate-500">
                            Cuantos más números
                            elegís, mayor puede ser
                            el premio.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                        {(
                            ["5", "7", "8"] as const
                        ).map((tipo) => {
                            const activo =
                                modalidad ===
                                tipo;

                            const datos =
                                MODALIDADES[
                                    tipo
                                ];

                            return (
                                <button
                                    key={tipo}
                                    onClick={() =>
                                        cambiarModalidad(
                                            tipo,
                                        )
                                    }
                                    disabled={
                                        sorteando
                                    }
                                    className={`rounded-lg border p-2 text-center transition ${
                                        activo
                                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                            : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                                    } disabled:cursor-not-allowed disabled:opacity-50`}
                                >
                                    <div className="text-xl font-black">
                                        {tipo}
                                    </div>

                                    <div className="text-[8px] font-bold uppercase tracking-wider">
                                        números
                                    </div>

                                    <p className="mt-0.5 text-[9px] text-slate-500">
                                        {datos.minimo}{" "}
                                        aciertos
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-2 text-center text-[10px] text-slate-500">
                        {config.descripcion}
                    </p>
                </section>

                {/* TABLERO */}

                <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900 to-slate-950 p-3 shadow-2xl sm:p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.25em] text-cyan-400">
                                Tus números
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400">
                                Elegí{" "}
                                <strong className="text-white">
                                    {cantidadNumeros}
                                </strong>{" "}
                                números
                            </p>
                        </div>

                        <div className="rounded-lg bg-cyan-400/10 px-2.5 py-1.5 text-[11px] font-black text-cyan-300">
                            {
                                seleccionados.length
                            }{" "}
                            /{" "}
                            {cantidadNumeros}
                        </div>
                    </div>

                    {/* NUMEROS */}

                    <div className="grid grid-cols-5 gap-1 sm:grid-cols-6 md:grid-cols-10">
                        {NUMEROS.map(
                            (numero) => {
                                const seleccionado =
                                    seleccionados.includes(
                                        numero,
                                    );

                                const coincidencia =
                                    resultado?.coincidencias.includes(
                                        numero,
                                    );

                                const ganador =
                                    resultado?.ganadores.includes(
                                        numero,
                                    );

                                return (
                                    <button
                                        key={
                                            numero
                                        }
                                        onClick={() =>
                                            seleccionarNumero(
                                                numero,
                                            )
                                        }
                                        disabled={
                                            sorteando
                                        }
                                        className={`relative aspect-square rounded-lg border text-xs font-black transition sm:text-sm ${
                                            coincidencia
                                                ? "border-emerald-400 bg-emerald-400/20 text-emerald-300 shadow-lg shadow-emerald-500/10"
                                                : seleccionado
                                                  ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-lg shadow-cyan-500/10"
                                                  : ganador
                                                    ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
                                                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.07]"
                                        } disabled:cursor-not-allowed`}
                                    >
                                        {numero}

                                        {coincidencia && (
                                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-slate-950">
                                                <Check
                                                    size={
                                                        10
                                                    }
                                                />
                                            </span>
                                        )}
                                    </button>
                                );
                            },
                        )}
                    </div>

                    {/* SELECCION */}

                    <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                Tu combinación
                            </span>

                            <button
                                onClick={
                                    limpiarSeleccion
                                }
                                disabled={
                                    sorteando ||
                                    seleccionados.length ===
                                        0
                                }
                                className="text-[10px] font-bold text-slate-500 transition hover:text-white disabled:opacity-30"
                            >
                                Limpiar
                            </button>
                        </div>

                        <div className="flex min-h-9 flex-wrap items-center gap-1.5">
                            {seleccionados.length >
                            0 ? (
                                seleccionados.map(
                                    (numero) => (
                                        <div
                                            key={
                                                numero
                                            }
                                            className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-cyan-400/15 px-2.5 text-xs font-black text-cyan-300"
                                        >
                                            {
                                                numero
                                            }
                                        </div>
                                    ),
                                )
                            ) : (
                                <p className="text-[10px] text-slate-600">
                                    Todavía no
                                    seleccionaste
                                    números.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* SORTEO */}

                    <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-center">
                        <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-600">
                            {sorteando
                                ? "Sorteando"
                                : "Números ganadores"}
                        </p>

                        <div className="mt-2 flex min-h-12 flex-wrap justify-center gap-1.5">
                            {sorteando ? (
                                <div className="flex items-center gap-2">
                                    <RotateCw
                                        size={18}
                                        className="animate-spin text-cyan-400"
                                    />

                                    <span className="text-xl font-black text-cyan-300">
                                        {numeroAnimado ??
                                            "?"}
                                    </span>
                                </div>
                            ) : resultado ? (
                                resultado.ganadores.map(
                                    (numero) => (
                                        <div
                                            key={
                                                numero
                                            }
                                            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black ${
                                                resultado.coincidencias.includes(
                                                    numero,
                                                )
                                                    ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                                                    : "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                                            }`}
                                        >
                                            {
                                                numero
                                            }
                                        </div>
                                    ),
                                )
                            ) : (
                                <span className="text-[10px] text-slate-700">
                                    Los números
                                    aparecerán
                                    después del
                                    sorteo.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* RESULTADO */}

                    {resultado &&
                        !sorteando && (
                            <div
                                className={`mt-3 rounded-xl border p-3 text-center ${
                                    resultado.ganado
                                        ? "border-emerald-400/30 bg-emerald-400/10"
                                        : "border-white/10 bg-white/[0.02]"
                                }`}
                            >
                                <div className="mb-1 flex items-center justify-center gap-1.5">
                                    {resultado.ganado ? (
                                        <Trophy
                                            size={
                                                18
                                            }
                                            className="text-yellow-400"
                                        />
                                    ) : (
                                        <X
                                            size={
                                                18
                                            }
                                            className="text-slate-500"
                                        />
                                    )}

                                    <span
                                        className={`text-base font-black ${
                                            resultado.ganado
                                                ? "text-emerald-300"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {
                                            resultado.mensaje
                                        }
                                    </span>
                                </div>

                                <p className="text-[11px] text-slate-400">
                                    Aciertos:{" "}
                                    <strong className="text-white">
                                        {
                                            resultado.coincidencias.length
                                        }
                                    </strong>
                                </p>

                                {resultado.ganado && (
                                    <p className="mt-1 text-xl font-black text-yellow-300">
                                        ×
                                        {
                                            resultado.multiplicador
                                        }{" "}
                                        · +
                                        {formatoDinero(
                                            resultado.premio,
                                        )}
                                    </p>
                                )}
                            </div>
                        )}

                    {/* APUESTA */}

                    <div className="mx-auto mt-4 max-w-md">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                Apuesta
                            </span>

                            <span className="text-[10px] text-slate-500">
                                Saldo:{" "}
                                {formatoDinero(
                                    saldo,
                                )}
                            </span>
                        </div>

                        <div className="mb-2.5 flex items-center gap-1.5">
                            <button
                                onClick={() =>
                                    cambiarApuesta(
                                        -1,
                                    )
                                }
                                disabled={
                                    sorteando ||
                                    APUESTAS.indexOf(
                                        apuesta,
                                    ) === 0
                                }
                                className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-xl font-black transition hover:bg-white/10 disabled:opacity-30"
                            >
                                −
                            </button>

                            <div className="flex-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 py-1.5 text-center">
                                <p className="text-[8px] font-bold uppercase text-cyan-500/70">
                                    Apuesta
                                </p>

                                <p className="text-base font-black text-cyan-300">
                                    {formatoDinero(
                                        apuesta,
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    cambiarApuesta(
                                        1,
                                    )
                                }
                                disabled={
                                    sorteando ||
                                    APUESTAS.indexOf(
                                        apuesta,
                                    ) ===
                                        APUESTAS.length -
                                            1
                                }
                                className="h-10 w-10 rounded-lg border border-white/10 bg-white/5 text-xl font-black transition hover:bg-white/10 disabled:opacity-30"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={jugar}
                            disabled={!puedeJugar}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-base font-black text-white shadow-lg shadow-cyan-500/10 transition hover:scale-[1.01] hover:from-cyan-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                        >
                            {sorteando ? (
                                <>
                                    <RotateCw
                                        size={18}
                                        className="animate-spin"
                                    />
                                    SORTEANDO...
                                </>
                            ) : (
                                <>
                                    <Sparkles
                                        size={18}
                                    />
                                    SORTEAR
                                </>
                            )}
                        </button>

                        {!seleccionCompleta &&
                            !sorteando && (
                                <p className="mt-2 text-center text-[10px] font-bold text-amber-400">
                                    Elegí{" "}
                                    {cantidadNumeros -
                                        seleccionados.length}{" "}
                                    número
                                    {cantidadNumeros -
                                        seleccionados.length !==
                                    1
                                        ? "s"
                                        : ""}{" "}
                                    más.
                                </p>
                            )}

                        {saldo < apuesta &&
                            seleccionCompleta &&
                            !sorteando && (
                                <p className="mt-2 text-center text-[10px] font-bold text-red-400">
                                    Saldo insuficiente
                                    para esta
                                    apuesta.
                                </p>
                            )}
                    </div>
                </section>

                {/* ESTADISTICAS */}

                <section className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                            Partidas
                        </p>

                        <p className="mt-0.5 text-lg font-black">
                            {partidas}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                            Último premio
                        </p>

                        <p className="mt-0.5 text-lg font-black text-emerald-400">
                            {formatoDinero(
                                ultimoPremio,
                            )}
                        </p>
                    </div>

                    <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center sm:col-span-1">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                            Premio máximo
                        </p>

                        <p className="mt-0.5 text-lg font-black text-yellow-300">
                            {formatoDinero(
                                premioMaximo,
                            )}
                        </p>
                    </div>
                </section>

                {/* TABLA DE PREMIOS */}

                <section className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="mb-2 flex items-center gap-1.5">
                        <Trophy
                            size={16}
                            className="text-yellow-400"
                        />

                        <div>
                            <h2 className="text-sm font-black">
                                Tabla de premios
                            </h2>

                            <p className="text-[9px] text-slate-500">
                                Modalidad{" "}
                                {modalidad}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-5">
                        {Array.from(
                            {
                                length:
                                    cantidadNumeros,
                            },
                            (_, indice) => {
                                const aciertos =
                                    indice +
                                    1;

                                const multiplicador =
                                    calcularMultiplicador(
                                        aciertos,
                                        modalidad,
                                    );

                                if (
                                    multiplicador <=
                                    0
                                ) {
                                    return null;
                                }

                                return (
                                    <div
                                        key={
                                            aciertos
                                        }
                                        className={`rounded-lg border p-2 text-center ${
                                            aciertos ===
                                            cantidadNumeros
                                                ? "border-yellow-400/30 bg-yellow-400/10"
                                                : "border-white/10 bg-white/[0.03]"
                                        }`}
                                    >
                                        <p className="text-[10px] font-bold text-slate-500">
                                            {
                                                aciertos
                                            }{" "}
                                            aciertos
                                        </p>

                                        <p className="mt-0.5 text-base font-black text-emerald-400">
                                            ×
                                            {
                                                multiplicador
                                            }
                                        </p>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </section>

                {/* REGLAS */}

                <section className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[10px] leading-relaxed text-slate-500">
                    <p className="font-black text-slate-400">
                        Cómo jugar
                    </p>

                    <ul className="mt-1.5 space-y-0.5">
                        <li>
                            • Elegí tus números antes
                            del sorteo.
                        </li>

                        <li>
                            • Se sortean 5 números
                            diferentes del 1 al 30.
                        </li>

                        <li>
                            • Los números que
                            coincidan aparecen en
                            verde.
                        </li>

                        <li>
                            • El multiplicador depende
                            de la cantidad de aciertos
                            y de la modalidad.
                        </li>

                        <li>
                            • El premio se calcula
                            multiplicando tu apuesta
                            por el multiplicador.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}