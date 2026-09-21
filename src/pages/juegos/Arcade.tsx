import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

/* =========================================================
   TIPOS
========================================================= */

type MiniJuego =
    | "menu"
    | "reaccion"
    | "memoria"
    | "clicker"
    | "esquiva";

type CartaMemoria = {
    id: number;
    simbolo: string;
    emparejada: boolean;
};

type EstadoReaccion =
    | "inicio"
    | "esperando"
    | "listo"
    | "resultado"
    | "demasiado-pronto";

/* =========================================================
   CONSTANTES
========================================================= */

const SIMBOLOS_MEMORIA = [
    "🍒",
    "🍋",
    "🍉",
    "🍊",
    "🍇",
    "⭐",
    "💎",
    "🍀",
];

const DURACION_CLICKER = 10;
const INTERVALO_ESQUIVA = 650;
const DISTANCIA_COLISION = 9;

/* =========================================================
   HELPERS
========================================================= */

const mezclar = <T,>(array: T[]): T[] => {
    const resultado = [...array];

    for (let i = resultado.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1)
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

/* =========================================================
   ARCADE
========================================================= */

const Arcade = () => {
    const [juego, setJuego] =
        useState<MiniJuego>("menu");

    const volverAlMenu = useCallback(() => {
        setJuego("menu");
    }, []);

    return (
        <div
            className="mx-auto h-screen max-w-6xl overflow-hidden px-2 py-2"
            style={{ zoom: 0.8 }}
        >
            {/* =================================================
                HEADER
            ================================================= */}

            <header className="mb-3 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-2xl shadow-lg shadow-purple-900/20">
                    🕹️
                </div>

                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-purple-400">
                    Sala Arcade
                </p>

                <h1 className="mt-0.5 text-2xl font-black tracking-tight sm:text-3xl">
                    Mini Juegos
                </h1>

                <p className="mx-auto mt-1 max-w-xl text-[11px] leading-4 text-slate-400 sm:text-xs">
                    Juegos rápidos para poner a prueba tus
                    reflejos, memoria y velocidad.
                </p>
            </header>

            {/* =================================================
                CONTENIDO
            ================================================= */}

            {juego === "menu" && (
                <MenuArcade
                    seleccionarJuego={setJuego}
                />
            )}

            {juego === "reaccion" && (
                <JuegoReaccion
                    volver={volverAlMenu}
                />
            )}

            {juego === "memoria" && (
                <JuegoMemoria
                    volver={volverAlMenu}
                />
            )}

            {juego === "clicker" && (
                <JuegoClicker
                    volver={volverAlMenu}
                />
            )}

            {juego === "esquiva" && (
                <JuegoEsquiva
                    volver={volverAlMenu}
                />
            )}
        </div>
    );
};

/* =========================================================
   MENU ARCADE
========================================================= */

const MenuArcade = ({
    seleccionarJuego,
}: {
    seleccionarJuego: (
        juego: MiniJuego
    ) => void;
}) => {
    const juegos: {
        id: MiniJuego;
        icono: string;
        titulo: string;
        descripcion: string;
        color: string;
    }[] = [
        {
            id: "reaccion",
            icono: "⚡",
            titulo: "Reacción",
            descripcion:
                "Esperá la señal y reaccioná lo más rápido posible.",
            color: "yellow",
        },
        {
            id: "memoria",
            icono: "🧠",
            titulo: "Memoria",
            descripcion:
                "Encontrá todos los pares usando la menor cantidad de movimientos.",
            color: "purple",
        },
        {
            id: "clicker",
            icono: "👆",
            titulo: "Clicker",
            descripcion:
                "Hacé la mayor cantidad de clics posibles durante 10 segundos.",
            color: "pink",
        },
        {
            id: "esquiva",
            icono: "🪨",
            titulo: "Esquiva",
            descripcion:
                "Movete por la pantalla y evitá los obstáculos.",
            color: "emerald",
        },
    ];

    return (
        <div className="grid gap-2 sm:grid-cols-2">
            {juegos.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                        seleccionarJuego(item.id)
                    }
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 p-3 text-left shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-slate-800/90 hover:shadow-2xl"
                >
                    <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-purple-500/5 blur-2xl transition group-hover:bg-purple-500/10" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-2xl shadow-inner transition duration-300 group-hover:scale-110">
                            {item.icono}
                        </div>

                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/5 bg-white/5 text-base text-slate-500 transition group-hover:translate-x-1 group-hover:border-purple-400/20 group-hover:bg-purple-500/10 group-hover:text-purple-400">
                            →
                        </span>
                    </div>

                    <div className="relative mt-2">
                        <h2 className="text-lg font-black">
                            {item.titulo}
                        </h2>

                        <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
                            {item.descripcion}
                        </p>
                    </div>

                    <div className="relative mt-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-slate-500 transition group-hover:text-purple-400">
                        <span>Jugar ahora</span>
                        <span>→</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

/* =========================================================
   BOTÓN VOLVER
========================================================= */

const BotonVolver = ({
    volver,
}: {
    volver: () => void;
}) => {
    return (
        <button
            type="button"
            onClick={volver}
            className="mb-2 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:border-white/20 hover:bg-slate-800 hover:text-white"
        >
            <span>←</span>
            <span>Volver al Arcade</span>
        </button>
    );
};

/* =========================================================
   REACCIÓN
========================================================= */

const JuegoReaccion = ({
    volver,
}: {
    volver: () => void;
}) => {
    const [estado, setEstado] =
        useState<EstadoReaccion>("inicio");

    const [tiempo, setTiempo] =
        useState<number | null>(null);

    const [mejorTiempo, setMejorTiempo] =
        useState<number | null>(null);

    const inicioRef =
        useRef<number | null>(null);

    const timeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    const limpiarTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(
                timeoutRef.current
            );

            timeoutRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            limpiarTimeout();
        };
    }, []);

    const comenzar = () => {
        limpiarTimeout();

        inicioRef.current = null;

        setTiempo(null);

        setEstado("esperando");

        const espera =
            1800 +
            Math.random() * 3200;

        timeoutRef.current =
            setTimeout(() => {
                inicioRef.current =
                    performance.now();

                setEstado("listo");
            }, espera);
    };

    const pulsar = () => {
        if (estado === "esperando") {
            limpiarTimeout();

            setTiempo(null);

            setEstado(
                "demasiado-pronto"
            );

            return;
        }

        if (
            estado !== "listo" ||
            inicioRef.current === null
        ) {
            return;
        }

        const resultado =
            performance.now() -
            inicioRef.current;

        setTiempo(resultado);

        setMejorTiempo((mejor) => {
            if (
                mejor === null ||
                resultado < mejor
            ) {
                return resultado;
            }

            return mejor;
        });

        setEstado("resultado");
    };

    const iniciarOReintentar =
        estado === "inicio" ||
        estado === "resultado" ||
        estado === "demasiado-pronto";

    return (
        <div>
            <BotonVolver volver={volver} />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                <div className="border-b border-white/10 p-3 text-center">
                    <div className="text-2xl">
                        ⚡
                    </div>

                    <h2 className="mt-1 text-xl font-black">
                        Prueba de Reacción
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                        Esperá el cambio y hacé clic
                        inmediatamente.
                    </p>
                </div>

                <div className="p-3 sm:p-4">
                    <button
                        type="button"
                        onClick={
                            iniciarOReintentar
                                ? comenzar
                                : pulsar
                        }
                        className={`relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-xl p-4 text-center transition active:scale-[0.995] ${
                            estado === "listo"
                                ? "bg-emerald-500 text-slate-950"
                                : estado ===
                                    "esperando"
                                  ? "bg-red-500 text-white"
                                  : "bg-indigo-600 text-white hover:bg-indigo-500"
                        }`}
                    >
                        {estado === "inicio" && (
                            <div>
                                <div className="text-4xl">
                                    ▶
                                </div>

                                <p className="mt-2 text-lg font-black">
                                    Comenzar
                                </p>

                                <p className="mt-1 text-[11px] opacity-70">
                                    Prepará el dedo...
                                </p>
                            </div>
                        )}

                        {estado === "esperando" && (
                            <div>
                                <div className="text-4xl">
                                    🚫
                                </div>

                                <p className="mt-2 text-xl font-black">
                                    ¡ESPERÁ!
                                </p>

                                <p className="mt-1 text-[11px] opacity-80">
                                    No hagas clic todavía
                                </p>
                            </div>
                        )}

                        {estado === "listo" && (
                            <div>
                                <div className="animate-pulse text-5xl">
                                    ⚡
                                </div>

                                <p className="mt-2 text-2xl font-black">
                                    ¡AHORA!
                                </p>
                            </div>
                        )}

                        {estado ===
                            "demasiado-pronto" && (
                            <div>
                                <div className="text-4xl">
                                    ❌
                                </div>

                                <p className="mt-2 text-lg font-black">
                                    ¡Demasiado rápido!
                                </p>

                                <p className="mt-1 text-[11px] opacity-70">
                                    Hacé clic para volver
                                    a intentarlo
                                </p>
                            </div>
                        )}

                        {estado ===
                            "resultado" && (
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-widest opacity-60">
                                    Tiempo de reacción
                                </p>

                                <p className="mt-1 text-4xl font-black">
                                    {tiempo?.toFixed(
                                        0
                                    )}
                                    <span className="ml-2 text-lg">
                                        ms
                                    </span>
                                </p>

                                <p className="mt-2 text-[11px] opacity-70">
                                    Hacé clic para
                                    intentarlo nuevamente
                                </p>
                            </div>
                        )}
                    </button>

                    {mejorTiempo !== null && (
                        <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-3 py-2">
                            <span>
                                🏆
                            </span>

                            <span className="text-[11px] text-slate-400">
                                Mejor tiempo
                            </span>

                            <strong className="text-xs text-emerald-400">
                                {mejorTiempo.toFixed(
                                    0
                                )}
                                ms
                            </strong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   MEMORIA
========================================================= */

const crearCartasMemoria =
    (): CartaMemoria[] => {
        const pares = [
            ...SIMBOLOS_MEMORIA,
            ...SIMBOLOS_MEMORIA,
        ];

        return mezclar(pares).map(
            (simbolo, index) => ({
                id: index,
                simbolo,
                emparejada: false,
            })
        );
    };

const JuegoMemoria = ({
    volver,
}: {
    volver: () => void;
}) => {
    const [cartas, setCartas] =
        useState<CartaMemoria[]>(
            crearCartasMemoria
        );

    const [seleccionadas, setSeleccionadas] =
        useState<number[]>([]);

    const [movimientos, setMovimientos] =
        useState(0);

    const [bloqueado, setBloqueado] =
        useState(false);

    const [ganado, setGanado] =
        useState(false);

    const timeoutRef =
        useRef<ReturnType<typeof setTimeout> | null>(
            null
        );

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(
                    timeoutRef.current
                );
            }
        };
    }, []);

    const reiniciar = () => {
        if (timeoutRef.current) {
            clearTimeout(
                timeoutRef.current
            );
        }

        setCartas(
            crearCartasMemoria()
        );

        setSeleccionadas([]);

        setMovimientos(0);

        setBloqueado(false);

        setGanado(false);
    };

    const seleccionar = (
        index: number
    ) => {
        if (
            bloqueado ||
            ganado ||
            seleccionadas.includes(index) ||
            cartas[index].emparejada
        ) {
            return;
        }

        const nuevasSeleccionadas = [
            ...seleccionadas,
            index,
        ];

        setSeleccionadas(
            nuevasSeleccionadas
        );

        if (
            nuevasSeleccionadas.length !== 2
        ) {
            return;
        }

        setMovimientos(
            (valor) => valor + 1
        );

        const primera =
            cartas[
                nuevasSeleccionadas[0]
            ];

        const segunda =
            cartas[
                nuevasSeleccionadas[1]
            ];

        if (
            primera.simbolo ===
            segunda.simbolo
        ) {
            const nuevasCartas =
                cartas.map(
                    (
                        carta,
                        cartaIndex
                    ) =>
                        nuevasSeleccionadas.includes(
                            cartaIndex
                        )
                            ? {
                                  ...carta,
                                  emparejada:
                                      true,
                              }
                            : carta
                );

            setCartas(
                nuevasCartas
            );

            setSeleccionadas([]);

            if (
                nuevasCartas.every(
                    (carta) =>
                        carta.emparejada
                )
            ) {
                setGanado(true);
            }

            return;
        }

        setBloqueado(true);

        timeoutRef.current =
            setTimeout(() => {
                setSeleccionadas([]);
                setBloqueado(false);
                timeoutRef.current =
                    null;
            }, 750);
    };

    const parejasEncontradas =
        cartas.filter(
            (carta) =>
                carta.emparejada
        ).length / 2;

    return (
        <div>
            <BotonVolver volver={volver} />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                <div className="border-b border-white/10 p-3 text-center">
                    <div className="text-2xl">
                        🧠
                    </div>

                    <h2 className="mt-1 text-xl font-black">
                        Memoria
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                        Encontrá todos los pares.
                    </p>

                    <div className="mt-2 flex justify-center gap-2">
                        <Estadistica
                            etiqueta="Movimientos"
                            valor={movimientos}
                        />

                        <Estadistica
                            etiqueta="Parejas"
                            valor={`${parejasEncontradas}/${SIMBOLOS_MEMORIA.length}`}
                        />
                    </div>
                </div>

                {ganado && (
                    <div className="mx-3 mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-2 text-center">
                        <div className="text-3xl">
                            🎉
                        </div>

                        <h3 className="mt-1 text-lg font-black text-emerald-400">
                            ¡Juego completado!
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-400">
                            Lo lograste en{" "}
                            <strong className="text-white">
                                {movimientos}
                            </strong>{" "}
                            movimientos.
                        </p>
                    </div>
                )}

                <div className="mx-auto grid max-w-2xl grid-cols-4 gap-1.5 p-3 sm:gap-2 sm:p-4">
                    {cartas.map(
                        (
                            carta,
                            index
                        ) => {
                            const visible =
                                seleccionadas.includes(
                                    index
                                ) ||
                                carta.emparejada;

                            return (
                                <button
                                    key={carta.id}
                                    type="button"
                                    disabled={
                                        bloqueado ||
                                        carta.emparejada
                                    }
                                    onClick={() =>
                                        seleccionar(
                                            index
                                        )
                                    }
                                    aria-label={
                                        visible
                                            ? `Carta ${carta.simbolo}`
                                            : "Carta oculta"
                                    }
                                    className={`aspect-square rounded-lg border text-xl shadow-lg transition duration-200 sm:text-2xl ${
                                        visible
                                            ? "border-white/20 bg-white text-slate-900"
                                            : "border-indigo-400/10 bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-500 active:scale-95"
                                    }`}
                                >
                                    {visible
                                        ? carta.simbolo
                                        : "?"}
                                </button>
                            );
                        }
                    )}
                </div>

                <div className="pb-3 text-center">
                    <button
                        type="button"
                        onClick={reiniciar}
                        className="rounded-lg border border-white/10 bg-slate-800 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-slate-700"
                    >
                        🔄 Nueva partida
                    </button>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   CLICKER
========================================================= */

const JuegoClicker = ({
    volver,
}: {
    volver: () => void;
}) => {
    const [clics, setClics] =
        useState(0);

    const [tiempo, setTiempo] =
        useState(DURACION_CLICKER);

    const [jugando, setJugando] =
        useState(false);

    const [mejor, setMejor] =
        useState(0);

    const intervaloRef =
        useRef<ReturnType<typeof setInterval> | null>(
            null
        );

    const clicsRef =
        useRef(0);

    useEffect(() => {
        clicsRef.current = clics;
    }, [clics]);

    const detener = useCallback(() => {
        if (intervaloRef.current) {
            clearInterval(
                intervaloRef.current
            );

            intervaloRef.current = null;
        }

        setJugando(false);

        setMejor((valor) =>
            Math.max(
                valor,
                clicsRef.current
            )
        );
    }, []);

    useEffect(() => {
        return () => {
            if (intervaloRef.current) {
                clearInterval(
                    intervaloRef.current
                );
            }
        };
    }, []);

    const comenzar = () => {
        if (intervaloRef.current) {
            clearInterval(
                intervaloRef.current
            );
        }

        setClics(0);

        clicsRef.current = 0;

        setTiempo(
            DURACION_CLICKER
        );

        setJugando(true);

        intervaloRef.current =
            setInterval(() => {
                setTiempo((valor) => {
                    if (valor <= 1) {
                        detener();
                        return 0;
                    }

                    return valor - 1;
                });
            }, 1000);
    };

    const click = () => {
        if (!jugando) {
            return;
        }

        clicsRef.current += 1;

        setClics(
            clicsRef.current
        );
    };

    const clicsPorSegundo =
        jugando ||
        tiempo === DURACION_CLICKER
            ? 0
            : clics / DURACION_CLICKER;

    return (
        <div>
            <BotonVolver volver={volver} />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                <div className="border-b border-white/10 p-3 text-center">
                    <div className="text-2xl">
                        👆
                    </div>

                    <h2 className="mt-1 text-xl font-black">
                        Clicker
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                        Hacé todos los clics que puedas
                        en {DURACION_CLICKER} segundos.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-3 sm:p-4">
                    <Estadistica
                        etiqueta="Tiempo"
                        valor={`${tiempo}s`}
                        destacado
                    />

                    <Estadistica
                        etiqueta="Clics"
                        valor={clics}
                    />

                    <Estadistica
                        etiqueta="Récord"
                        valor={mejor}
                    />
                </div>

                <div className="px-3 pb-3 sm:px-4">
                    <button
                        type="button"
                        onClick={
                            jugando
                                ? click
                                : comenzar
                        }
                        className={`flex min-h-[220px] w-full select-none items-center justify-center rounded-xl text-5xl font-black shadow-2xl transition active:scale-[0.985] ${
                            jugando
                                ? "cursor-pointer bg-purple-500 hover:bg-purple-400"
                                : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                    >
                        {jugando
                            ? "👆"
                            : "▶"}
                    </button>
                </div>

                {!jugando &&
                    clics > 0 && (
                        <div className="mx-3 mb-3 rounded-lg border border-emerald-400/10 bg-emerald-400/5 p-2 text-center sm:mx-4">
                            <p className="text-[11px] text-slate-400">
                                Resultado
                            </p>

                            <p className="mt-0.5 text-lg font-black text-emerald-400">
                                {clics} clics
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-500">
                                {clicsPorSegundo.toFixed(
                                    1
                                )}{" "}
                                clics por segundo
                            </p>
                        </div>
                    )}
            </div>
        </div>
    );
};

/* =========================================================
   ESQUIVA
========================================================= */

const JuegoEsquiva = ({
    volver,
}: {
    volver: () => void;
}) => {
    const [jugando, setJugando] =
        useState(false);

    const [posicion, setPosicion] =
        useState(50);

    const [obstaculo, setObstaculo] =
        useState(50);

    const [puntaje, setPuntaje] =
        useState(0);

    const [mejor, setMejor] =
        useState(0);

    const intervaloRef =
        useRef<ReturnType<typeof setInterval> | null>(
            null
        );

    const comenzar = () => {
        if (intervaloRef.current) {
            clearInterval(
                intervaloRef.current
            );
        }

        setPosicion(50);

        setObstaculo(
            5 +
                Math.random() * 90
        );

        setPuntaje(0);

        setJugando(true);
    };

    const terminar = useCallback(() => {
        if (intervaloRef.current) {
            clearInterval(
                intervaloRef.current
            );

            intervaloRef.current = null;
        }

        setJugando(false);

        setMejor((valor) =>
            Math.max(
                valor,
                puntaje
            )
        );
    }, [puntaje]);

    useEffect(() => {
        return () => {
            if (intervaloRef.current) {
                clearInterval(
                    intervaloRef.current
                );
            }
        };
    }, []);

    /* ============================================
       MOVIMIENTO DEL JUGADOR
    ============================================ */

    useEffect(() => {
        if (!jugando) {
            return;
        }

        const teclado = (
            event: KeyboardEvent
        ) => {
            const tecla =
                event.key.toLowerCase();

            if (
                tecla === "arrowleft" ||
                tecla === "a"
            ) {
                event.preventDefault();

                setPosicion((valor) =>
                    Math.max(
                        5,
                        valor - 7
                    )
                );
            }

            if (
                tecla === "arrowright" ||
                tecla === "d"
            ) {
                event.preventDefault();

                setPosicion((valor) =>
                    Math.min(
                        95,
                        valor + 7
                    )
                );
            }
        };

        window.addEventListener(
            "keydown",
            teclado
        );

        return () => {
            window.removeEventListener(
                "keydown",
                teclado
            );
        };
    }, [jugando]);

    /* ============================================
       BOTONES TÁCTILES
    ============================================ */

    const moverJugador = (
        direccion: "izquierda" | "derecha"
    ) => {
        if (!jugando) {
            return;
        }

        setPosicion((valor) => {
            if (
                direccion ===
                "izquierda"
            ) {
                return Math.max(
                    5,
                    valor - 7
                );
            }

            return Math.min(
                95,
                valor + 7
            );
        });
    };

    /* ============================================
       BUCLE DEL JUEGO
    ============================================ */

    useEffect(() => {
        if (!jugando) {
            return;
        }

        intervaloRef.current =
            setInterval(() => {
                const nuevaPosicion =
                    5 +
                    Math.random() * 90;

                setObstaculo(
                    nuevaPosicion
                );

                setPuntaje(
                    (valor) =>
                        valor + 1
                );
            }, INTERVALO_ESQUIVA);

        return () => {
            if (intervaloRef.current) {
                clearInterval(
                    intervaloRef.current
                );

                intervaloRef.current = null;
            }
        };
    }, [jugando]);

    /* ============================================
       COLISIÓN
    ============================================ */

    useEffect(() => {
        if (!jugando) {
            return;
        }

        const diferencia =
            Math.abs(
                posicion -
                    obstaculo
            );

        if (
            diferencia <
            DISTANCIA_COLISION
        ) {
            terminar();
        }
    }, [
        posicion,
        obstaculo,
        jugando,
        terminar,
    ]);

    return (
        <div>
            <BotonVolver volver={volver} />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
                <div className="border-b border-white/10 p-3 text-center">
                    <div className="text-2xl">
                        🪨
                    </div>

                    <h2 className="mt-1 text-xl font-black">
                        Esquiva
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                        Usá ← → o A/D para moverte.
                    </p>
                </div>

                <div className="flex justify-center gap-2 p-3 sm:p-4">
                    <Estadistica
                        etiqueta="Puntaje"
                        valor={puntaje}
                    />

                    <Estadistica
                        etiqueta="Récord"
                        valor={mejor}
                        destacado
                    />
                </div>

                <div className="px-3 pb-3 sm:px-4">
                    <div
                        className="relative mx-auto h-[260px] max-w-2xl overflow-hidden rounded-xl border border-white/5 bg-slate-950"
                        tabIndex={0}
                    >
                        {/* GRID DE FONDO */}

                        <div
                            className="pointer-events-none absolute inset-0 opacity-20"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                                backgroundSize:
                                    "40px 40px",
                            }}
                        />

                        {/* ESTADO INACTIVO */}

                        {!jugando && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 px-4 text-center backdrop-blur-sm">
                                <div className="text-4xl">
                                    {puntaje >
                                    0
                                        ? "💥"
                                        : "🪨"}
                                </div>

                                <p className="mt-2 text-lg font-black">
                                    {puntaje >
                                    0
                                        ? "¡Choque!"
                                        : "¿Preparado?"}
                                </p>

                                {puntaje >
                                    0 && (
                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Puntaje:{" "}
                                        <strong className="text-white">
                                            {
                                                puntaje
                                            }
                                        </strong>
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={
                                        comenzar
                                    }
                                    className="mt-3 rounded-lg bg-purple-500 px-5 py-2 text-xs font-bold text-white transition hover:bg-purple-400"
                                >
                                    ▶{" "}
                                    {puntaje >
                                    0
                                        ? "Jugar nuevamente"
                                        : "Comenzar"}
                                </button>
                            </div>
                        )}

                        {/* OBSTÁCULO */}

                        {jugando && (
                            <div
                                className="absolute top-5 z-10 text-2xl drop-shadow-lg transition-all duration-300"
                                style={{
                                    left: `${obstaculo}%`,
                                    transform:
                                        "translateX(-50%)",
                                }}
                            >
                                🪨
                            </div>
                        )}

                        {/* JUGADOR */}

                        <div
                            className="absolute bottom-5 z-10 text-2xl drop-shadow-lg transition-all duration-100"
                            style={{
                                left: `${posicion}%`,
                                transform:
                                    "translateX(-50%)",
                            }}
                        >
                            🏃
                        </div>

                        {/* LÍNEA INFERIOR */}

                        <div className="absolute bottom-3 left-0 right-0 h-px bg-white/10" />
                    </div>

                    {/* CONTROLES TÁCTILES */}

                    <div className="mx-auto mt-2 grid max-w-2xl grid-cols-2 gap-2 sm:hidden">
                        <button
                            type="button"
                            disabled={!jugando}
                            onClick={() =>
                                moverJugador(
                                    "izquierda"
                                )
                            }
                            className="rounded-lg border border-white/10 bg-slate-800 py-2.5 text-lg font-black transition active:scale-95 disabled:opacity-40"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            disabled={!jugando}
                            onClick={() =>
                                moverJugador(
                                    "derecha"
                                )
                            }
                            className="rounded-lg border border-white/10 bg-slate-800 py-2.5 text-lg font-black transition active:scale-95 disabled:opacity-40"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* =========================================================
   COMPONENTE ESTADÍSTICA
========================================================= */

const Estadistica = ({
    etiqueta,
    valor,
    destacado = false,
}: {
    etiqueta: string;
    valor: string | number;
    destacado?: boolean;
}) => {
    return (
        <div className="min-w-[68px] rounded-lg border border-white/5 bg-slate-950/60 px-2.5 py-1.5 text-center">
            <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                {etiqueta}
            </p>

            <p
                className={`mt-0.5 text-lg font-black ${
                    destacado
                        ? "text-emerald-400"
                        : "text-white"
                }`}
            >
                {valor}
            </p>
        </div>
    );
};

export default Arcade;