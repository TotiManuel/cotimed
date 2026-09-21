import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowLeft,
    Coins,
    Crown,
    RotateCw,
    Sparkles,
    Trophy,
    Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";

type CantidadCarriles = 3 | 5 | 7;

type Simbolo = {
    id: string;
    icono: string;
    nombre: string;
    valor: number;
};

type Resultado = {
    simbolos: Simbolo[];
    multiplicador: number;
    premio: number;
    coincidencias: number;
    simboloGanador: Simbolo | null;
    mensaje: string;
    ganado: boolean;
};

const SIMBOLOS: Simbolo[] = [
    {
        id: "7",
        icono: "7️⃣",
        nombre: "Lucky 7",
        valor: 25,
    },
    {
        id: "diamante",
        icono: "💎",
        nombre: "Diamante",
        valor: 12,
    },
    {
        id: "corona",
        icono: "👑",
        nombre: "Corona",
        valor: 8,
    },
    {
        id: "estrella",
        icono: "⭐",
        nombre: "Estrella",
        valor: 5,
    },
    {
        id: "oro",
        icono: "💰",
        nombre: "Oro",
        valor: 3,
    },
    {
        id: "campana",
        icono: "🔔",
        nombre: "Campana",
        valor: 2,
    },
    {
        id: "cereza",
        icono: "🍒",
        nombre: "Cereza",
        valor: 0,
    },
];

const APUESTAS = [50, 100, 250, 500, 1000];

const CONFIG_CARRILES: Record<
    CantidadCarriles,
    {
        minimo: number;
        multiplicador: number;
        jackpot: number;
    }
> = {
    3: {
        minimo: 3,
        multiplicador: 1,
        jackpot: 25,
    },
    5: {
        minimo: 4,
        multiplicador: 0.7,
        jackpot: 40,
    },
    7: {
        minimo: 5,
        multiplicador: 0.5,
        jackpot: 75,
    },
};

const formatoDinero = (valor: number) =>
    `$${valor.toLocaleString("es-AR")}`;

const elegirSimbolo = (
    soloGanadores = false,
): Simbolo => {
    const disponibles = soloGanadores
        ? SIMBOLOS.filter(
              (simbolo) => simbolo.valor > 0,
          )
        : SIMBOLOS;

    return disponibles[
        Math.floor(
            Math.random() * disponibles.length,
        )
    ];
};

const generarCarriles = (
    cantidad: CantidadCarriles,
    forzarCombinacion = false,
): Simbolo[] => {
    if (!forzarCombinacion) {
        return Array.from(
            { length: cantidad },
            () => elegirSimbolo(),
        );
    }

    const simboloGanador =
        elegirSimbolo(true);

    let coincidencias: number;

    if (cantidad === 3) {
        coincidencias = 3;
    } else if (cantidad === 5) {
        coincidencias =
            Math.random() < 0.75
                ? 4
                : 5;
    } else {
        const aleatorio =
            Math.random();

        if (aleatorio < 0.75) {
            coincidencias = 5;
        } else if (aleatorio < 0.97) {
            coincidencias = 6;
        } else {
            coincidencias = 7;
        }
    }

    const resultado: Simbolo[] =
        Array.from(
            {
                length: coincidencias,
            },
            () => simboloGanador,
        );

    while (
        resultado.length < cantidad
    ) {
        let simbolo =
            elegirSimbolo();

        while (
            simbolo.id ===
            simboloGanador.id
        ) {
            simbolo = elegirSimbolo();
        }

        resultado.push(simbolo);
    }

    for (
        let i = resultado.length - 1;
        i > 0;
        i--
    ) {
        const j = Math.floor(
            Math.random() * (i + 1),
        );

        [
            resultado[i],
            resultado[j],
        ] = [
            resultado[j],
            resultado[i],
        ];
    }

    return resultado;
};

const obtenerMultiplicador = (
    simbolo: Simbolo,
    cantidad: CantidadCarriles,
    coincidencias: number,
) => {
    const config =
        CONFIG_CARRILES[cantidad];

    if (
        cantidad === 7 &&
        coincidencias === 7
    ) {
        return config.jackpot;
    }

    if (
        cantidad === 5 &&
        coincidencias === 5
    ) {
        return Math.max(
            1,
            Math.round(
                simbolo.valor * 2,
            ),
        );
    }

    if (
        cantidad === 3 &&
        coincidencias === 3
    ) {
        return simbolo.valor;
    }

    if (
        cantidad === 5 &&
        coincidencias === 4
    ) {
        return Math.max(
            1,
            Math.round(
                simbolo.valor *
                    config.multiplicador,
            ),
        );
    }

    if (
        cantidad === 7 &&
        coincidencias === 5
    ) {
        return Math.max(
            1,
            Math.round(
                simbolo.valor * 0.5,
            ),
        );
    }

    if (
        cantidad === 7 &&
        coincidencias === 6
    ) {
        return Math.max(
            1,
            Math.round(
                simbolo.valor * 0.75,
            ),
        );
    }

    return 0;
};

const calcularResultado = (
    apuesta: number,
    cantidad: CantidadCarriles,
): Resultado => {
    const probabilidadGanadora =
        cantidad === 3
            ? 0.18
            : cantidad === 5
              ? 0.14
              : 0.1;

    const esGanador =
        Math.random() <
        probabilidadGanadora;

    const simbolos =
        generarCarriles(
            cantidad,
            esGanador,
        );

    const conteos = new Map<
        string,
        {
            simbolo: Simbolo;
            cantidad: number;
        }
    >();

    for (const simbolo of simbolos) {
        const existente =
            conteos.get(simbolo.id);

        if (existente) {
            existente.cantidad++;
        } else {
            conteos.set(simbolo.id, {
                simbolo,
                cantidad: 1,
            });
        }
    }

    let mejor:
        | {
              simbolo: Simbolo;
              cantidad: number;
          }
        | undefined;

    for (
        const entrada of conteos.values()
    ) {
        if (
            !mejor ||
            entrada.cantidad >
                mejor.cantidad
        ) {
            mejor = entrada;
        }
    }

    if (!mejor) {
        return {
            simbolos,
            multiplicador: 0,
            premio: 0,
            coincidencias: 0,
            simboloGanador: null,
            mensaje: "Sin premio",
            ganado: false,
        };
    }

    const multiplicador =
        obtenerMultiplicador(
            mejor.simbolo,
            cantidad,
            mejor.cantidad,
        );

    let mensaje =
        "No hubo combinación ganadora";

    if (multiplicador > 0) {
        if (
            cantidad === 7 &&
            mejor.cantidad === 7
        ) {
            mensaje =
                "¡JACKPOT! ¡SIETE IGUALES!";
        } else if (
            mejor.simbolo.id === "7" &&
            mejor.cantidad === cantidad
        ) {
            mensaje =
                "¡LUCKY 7! ¡COMBINACIÓN PERFECTA!";
        } else {
            mensaje = `¡${mejor.cantidad} ${mejor.simbolo.nombre.toUpperCase()} IGUALES!`;
        }
    }

    return {
        simbolos,
        multiplicador,
        premio:
            apuesta * multiplicador,
        coincidencias:
            mejor.cantidad,
        simboloGanador:
            mejor.simbolo,
        mensaje,
        ganado:
            multiplicador > 0,
    };
};

export default function Lucky7() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [
        cantidadCarriles,
        setCantidadCarriles,
    ] = useState<CantidadCarriles>(3);

    const [apuesta, setApuesta] =
        useState(100);

    const [carretes, setCarretes] =
        useState<Simbolo[]>(
            generarCarriles(3),
        );

    const [girando, setGirando] =
        useState(false);

    const [resultado, setResultado] =
        useState<Resultado | null>(null);

    const [giros, setGiros] =
        useState(0);

    const [ultimoPremio, setUltimoPremio] =
        useState(0);

    const intervaloRef =
        useRef<ReturnType<
            typeof setInterval
        > | null>(null);

    useEffect(() => {
        return () => {
            if (intervaloRef.current) {
                clearInterval(
                    intervaloRef.current,
                );
            }
        };
    }, []);

    const configActual =
        CONFIG_CARRILES[cantidadCarriles];

    const premioMaximo = useMemo(() => {
        const simboloMaximo =
            Math.max(
                ...SIMBOLOS.map(
                    (simbolo) =>
                        simbolo.valor,
                ),
            );

        return Math.max(
            ...APUESTAS.map(
                (valor) => {
                    if (
                        cantidadCarriles ===
                        7
                    ) {
                        return (
                            valor *
                            CONFIG_CARRILES[7]
                                .jackpot
                        );
                    }

                    if (
                        cantidadCarriles ===
                        5
                    ) {
                        return (
                            valor *
                            Math.max(
                                1,
                                Math.round(
                                    simboloMaximo *
                                        2,
                                ),
                            )
                        );
                    }

                    return (
                        valor *
                        simboloMaximo
                    );
                },
            ),
        );
    }, [cantidadCarriles]);

    const puedeJugar =
        !girando && saldo >= apuesta;

    const cambiarApuesta = (
        direccion: number,
    ) => {
        if (girando) return;

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

    const cambiarCarriles = (
        cantidad: CantidadCarriles,
    ) => {
        if (girando) return;

        setCantidadCarriles(cantidad);

        setCarretes(
            generarCarriles(cantidad),
        );

        setResultado(null);
    };

    const jugar = () => {
        if (
            girando ||
            saldo < apuesta
        ) {
            return;
        }

        spendBalance(
            apuesta,
            "Lucky 7",
        );

        setGirando(true);
        setResultado(null);

        let contador = 0;

        intervaloRef.current =
            setInterval(() => {
                contador++;

                setCarretes(
                    generarCarriles(
                        cantidadCarriles,
                    ),
                );

                if (contador >= 15) {
                    if (
                        intervaloRef.current
                    ) {
                        clearInterval(
                            intervaloRef.current,
                        );
                    }

                    intervaloRef.current =
                        null;

                    const resultadoFinal =
                        calcularResultado(
                            apuesta,
                            cantidadCarriles,
                        );

                    setCarretes(
                        resultadoFinal.simbolos,
                    );

                    setResultado(
                        resultadoFinal,
                    );

                    setUltimoPremio(
                        resultadoFinal.premio,
                    );

                    setGiros(
                        (valor) =>
                            valor + 1,
                    );

                    setGirando(false);

                    recordGame({
                        juegoId: "lucky-7",
                        juegoNombre:
                            "Lucky 7",
                        resultado:
                            resultadoFinal.ganado
                                ? "GANADA"
                                : "PERDIDA",
                        apuesta,
                        premio:
                            resultadoFinal.premio,
                    });
                }
            }, 85);
    };

    return (
        <div
            className="min-h-screen bg-slate-950 text-white"
            style={{ zoom: 0.8 }}
        >
            <div className="mx-auto w-full max-w-6xl px-3 py-3 sm:px-4 sm:py-4">

                {/* HEADER */}
                <header className="mb-4 flex items-center justify-between gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(-1)
                        }
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10"
                    >
                        <ArrowLeft size={15} />
                        Volver
                    </button>

                    <div className="flex items-center gap-1.5 rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1.5">
                        <Coins
                            size={15}
                            className="text-yellow-300"
                        />

                        <span className="text-xs font-black text-yellow-200">
                            {formatoDinero(
                                saldo,
                            )}
                        </span>
                    </div>
                </header>

                {/* TITULO */}
                <section className="mb-4 text-center">
                    <div className="mb-1 flex items-center justify-center gap-1.5">
                        <Crown
                            size={22}
                            className="text-yellow-400"
                        />

                        <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
                            LUCKY{" "}
                            <span className="text-yellow-400">
                                7
                            </span>
                        </h1>

                        <Crown
                            size={22}
                            className="text-yellow-400"
                        />
                    </div>

                    <p className="text-[11px] text-slate-400">
                        Elegí la cantidad de carriles
                        y buscá la combinación ganadora.
                    </p>
                </section>

                {/* CARRILES */}
                <section className="mb-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-black">
                                Cantidad de carriles
                            </h2>

                            <p className="text-[10px] text-slate-500">
                                Más carriles = combinaciones
                                más difíciles.
                            </p>
                        </div>

                        <Zap
                            size={16}
                            className="text-yellow-400"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                        {(
                            [3, 5, 7] as const
                        ).map(
                            (cantidad) => {
                                const activo =
                                    cantidadCarriles ===
                                    cantidad;

                                const config =
                                    CONFIG_CARRILES[
                                        cantidad
                                    ];

                                return (
                                    <button
                                        key={
                                            cantidad
                                        }
                                        type="button"
                                        onClick={() =>
                                            cambiarCarriles(
                                                cantidad,
                                            )
                                        }
                                        disabled={
                                            girando
                                        }
                                        className={`rounded-lg border px-2 py-2 transition ${
                                            activo
                                                ? "border-yellow-400 bg-yellow-400/15 text-yellow-300"
                                                : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.05]"
                                        } disabled:cursor-not-allowed disabled:opacity-50`}
                                    >
                                        <div className="text-xl font-black">
                                            {
                                                cantidad
                                            }
                                        </div>

                                        <div className="text-[9px] font-bold uppercase tracking-wider">
                                            carriles
                                        </div>

                                        <div className="mt-0.5 text-[9px] text-slate-500">
                                            Desde{" "}
                                            {
                                                config.minimo
                                            }{" "}
                                            iguales
                                        </div>
                                    </button>
                                );
                            },
                        )}
                    </div>
                </section>

                {/* MAQUINA */}
                <section className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-b from-slate-900 to-slate-950 p-3 shadow-2xl sm:p-5">
                    <div className="absolute -left-20 -top-20 h-44 w-44 rounded-full bg-yellow-500/10 blur-3xl" />

                    <div className="absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="relative">

                        {/* CABECERA MAQUINA */}
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500">
                                    Lucky Machine
                                </p>

                                <p className="mt-0.5 text-[10px] text-slate-500">
                                    {
                                        cantidadCarriles
                                    }{" "}
                                    carriles
                                </p>
                            </div>

                            <div className="rounded-md bg-yellow-400/10 px-2 py-1 text-[10px] font-black text-yellow-300">
                                JACKPOT ×
                                {
                                    configActual.jackpot
                                }
                            </div>
                        </div>

                        {/* CARRETES */}
                        <div
                            className={`grid gap-1.5 sm:gap-2 ${
                                cantidadCarriles ===
                                3
                                    ? "grid-cols-3"
                                    : cantidadCarriles ===
                                        5
                                      ? "grid-cols-5"
                                      : "grid-cols-7"
                            }`}
                        >
                            {carretes.map(
                                (
                                    simbolo,
                                    index,
                                ) => (
                                    <div
                                        key={`${simbolo.id}-${index}`}
                                        className={`flex aspect-square items-center justify-center rounded-lg border-2 bg-slate-950 shadow-inner transition-all ${
                                            girando
                                                ? "animate-pulse border-yellow-500/40"
                                                : "border-white/10"
                                        }`}
                                    >
                                        <span
                                            className={`${
                                                girando
                                                    ? "blur-[1px]"
                                                    : ""
                                            } ${
                                                cantidadCarriles ===
                                                7
                                                    ? "text-xl sm:text-3xl"
                                                    : cantidadCarriles ===
                                                        5
                                                      ? "text-2xl sm:text-4xl"
                                                      : "text-3xl sm:text-5xl"
                                            }`}
                                        >
                                            {
                                                simbolo.icono
                                            }
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* RESULTADO */}
                        <div className="mt-3 min-h-16 text-center">
                            {girando ? (
                                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-yellow-300">
                                    <RotateCw
                                        size={15}
                                        className="animate-spin"
                                    />

                                    Girando{" "}
                                    {
                                        cantidadCarriles
                                    }{" "}
                                    carriles...
                                </div>
                            ) : resultado ? (
                                <div
                                    className={
                                        resultado.ganado
                                            ? "animate-pulse"
                                            : ""
                                    }
                                >
                                    <p
                                        className={`text-sm font-black sm:text-base ${
                                            resultado.ganado
                                                ? "text-emerald-400"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {
                                            resultado.mensaje
                                        }
                                    </p>

                                    {resultado.ganado && (
                                        <p className="mt-0.5 text-xs font-black text-yellow-300">
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
                            ) : (
                                <p className="text-xs text-slate-600">
                                    Presioná GIRAR
                                </p>
                            )}
                        </div>

                        {/* APUESTA */}
                        <div className="mx-auto mt-1 max-w-md">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                    Apuesta
                                </span>

                                <span className="text-[10px] text-slate-500">
                                    Saldo:{" "}
                                    {formatoDinero(
                                        saldo,
                                    )}
                                </span>
                            </div>

                            <div className="mb-3 flex items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        cambiarApuesta(
                                            -1,
                                        )
                                    }
                                    disabled={
                                        girando ||
                                        APUESTAS.indexOf(
                                            apuesta,
                                        ) === 0
                                    }
                                    className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 text-xl font-black transition hover:bg-white/10 disabled:opacity-30"
                                >
                                    −
                                </button>

                                <div className="flex-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 py-1.5 text-center">
                                    <p className="text-[9px] font-bold uppercase text-yellow-500/70">
                                        Apuesta
                                    </p>

                                    <p className="text-lg font-black text-yellow-300">
                                        {formatoDinero(
                                            apuesta,
                                        )}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        cambiarApuesta(
                                            1,
                                        )
                                    }
                                    disabled={
                                        girando ||
                                        APUESTAS.indexOf(
                                            apuesta,
                                        ) ===
                                            APUESTAS.length -
                                                1
                                    }
                                    className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 text-xl font-black transition hover:bg-white/10 disabled:opacity-30"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={jugar}
                                disabled={
                                    !puedeJugar
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 px-4 py-3 text-sm font-black text-black shadow-lg shadow-yellow-500/10 transition hover:scale-[1.01] hover:from-yellow-400 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                            >
                                {girando ? (
                                    <>
                                        <RotateCw
                                            size={18}
                                            className="animate-spin"
                                        />
                                        GIRANDO...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles
                                            size={18}
                                        />
                                        GIRAR
                                    </>
                                )}
                            </button>

                            {saldo < apuesta &&
                                !girando && (
                                    <p className="mt-2 text-center text-[10px] font-bold text-red-400">
                                        Saldo insuficiente
                                        para esta apuesta.
                                    </p>
                                )}
                        </div>
                    </div>
                </section>

                {/* ESTADISTICAS */}
                <section className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                            Giros
                        </p>

                        <p className="mt-0.5 text-lg font-black">
                            {giros}
                        </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                            Último premio
                        </p>

                        <p className="mt-0.5 text-lg font-black text-emerald-400">
                            {formatoDinero(
                                ultimoPremio,
                            )}
                        </p>
                    </div>

                    <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center sm:col-span-1">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
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
                    <div className="mb-3 flex items-center gap-1.5">
                        <Trophy
                            size={16}
                            className="text-yellow-400"
                        />

                        <div>
                            <h2 className="text-sm font-black">
                                Tabla de premios
                            </h2>

                            <p className="text-[10px] text-slate-500">
                                {
                                    cantidadCarriles
                                }{" "}
                                carriles
                            </p>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {SIMBOLOS.filter(
                            (simbolo) =>
                                simbolo.id !==
                                "cereza",
                        ).map(
                            (simbolo) => {
                                const tres =
                                    simbolo.valor;

                                let premio = 0;
                                let requisito = "";

                                if (
                                    cantidadCarriles ===
                                    3
                                ) {
                                    premio =
                                        tres;
                                    requisito =
                                        "3 iguales";
                                }

                                if (
                                    cantidadCarriles ===
                                    5
                                ) {
                                    premio =
                                        Math.max(
                                            1,
                                            Math.round(
                                                tres *
                                                    2,
                                            ),
                                        );
                                    requisito =
                                        "5 iguales";
                                }

                                if (
                                    cantidadCarriles ===
                                    7
                                ) {
                                    premio =
                                        simbolo.id ===
                                        "7"
                                            ? CONFIG_CARRILES[
                                                  7
                                              ]
                                                  .jackpot
                                            : Math.max(
                                                  1,
                                                  Math.round(
                                                      tres *
                                                          2,
                                                  ),
                                              );

                                    requisito =
                                        "7 iguales";
                                }

                                return (
                                    <div
                                        key={
                                            simbolo.id
                                        }
                                        className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                                            simbolo.id ===
                                            "7"
                                                ? "bg-yellow-500/10"
                                                : "bg-white/[0.03]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">
                                                {
                                                    simbolo.icono
                                                }
                                            </span>

                                            <div>
                                                <p className="text-xs font-black">
                                                    {
                                                        simbolo.nombre
                                                    }
                                                </p>

                                                <p className="text-[9px] uppercase text-slate-500">
                                                    {
                                                        requisito
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`text-sm font-black ${
                                                simbolo.id ===
                                                "7"
                                                    ? "text-yellow-300"
                                                    : "text-emerald-400"
                                            }`}
                                        >
                                            ×
                                            {premio}
                                        </span>
                                    </div>
                                );
                            },
                        )}

                        <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2 text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">
                                    🍒
                                </span>

                                <span className="text-xs font-bold">
                                    Sin combinación
                                </span>
                            </div>

                            <span className="text-sm font-black">
                                ×0
                            </span>
                        </div>
                    </div>
                </section>

                {/* REGLAS */}
                <section className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[10px] leading-relaxed text-slate-500">
                    <p className="font-black text-slate-400">
                        Cómo funciona
                    </p>

                    <ul className="mt-1.5 space-y-0.5">
                        <li>
                            • Con 3 carriles necesitás
                            3 símbolos iguales.
                        </li>

                        <li>
                            • Con 5 carriles necesitás
                            4 o 5 iguales.
                        </li>

                        <li>
                            • Con 7 carriles necesitás
                            5, 6 o 7 iguales.
                        </li>

                        <li>
                            • Con 7 carriles, 7️⃣ × 7
                            activa el JACKPOT.
                        </li>

                        <li>
                            • Cambiar la cantidad de
                            carriles no cambia la apuesta.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}