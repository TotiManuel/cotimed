import {
    ArrowLeft,
    Bot,
    Check,
    CircleDollarSign,
    Clock3,
    Crown,
    Flame,
    Hand,
    Info,
    MessageCircle,
    RotateCcw,
    Shield,
    Sparkles,
    Trophy,
    X,
} from "lucide-react";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PUNTOS_OBJETIVO = 30;

const PREMIO_BASE = 5000;
const PREMIO_BONUS_PARTIDA_LARGA = 3000;
const MINUTOS_PARTIDA_LARGA = 10;

const USAR_FLOR = false;

/* =========================================================
   TIPOS
========================================================= */

type Palo =
    | "espada"
    | "basto"
    | "oro"
    | "copa";

type Jugador = "humano" | "ia";

type TipoTruco =
    | "truco"
    | "retruco"
    | "vale4";

type TipoEnvido =
    | "envido"
    | "real_envido"
    | "falta_envido";

type TipoCanto = TipoTruco | TipoEnvido | "flor";

type Carta = {
    id: string;
    numero: number;
    palo: Palo;
    nombre: string;
    jerarquia: number;
};

type Baza = {
    humano: Carta | null;
    ia: Carta | null;
    ganador: Jugador | null;
    parda: boolean;
};

type Historial = {
    id: number;
    texto: string;
    tipo:
        | "carta"
        | "truco"
        | "envido"
        | "baza"
        | "resultado"
        | "sistema";
};

type TrucoPendiente = {
    tipo: TipoTruco;
    por: Jugador;
    valor: 2 | 3 | 4;
    nivelAnterior: 1 | 2 | 3 | 4;
};

type EnvidoPendiente = {
    tipo: TipoEnvido;
    por: Jugador;

    /**
     * Valor total que está en juego
     * si se acepta.
     */
    valor: number;

    /**
     * Valor que ya estaba aceptado
     * antes del último canto.
     *
     * Sirve para No Quiero.
     */
    valorAnterior: number;

    /**
     * Cantos realizados en esta
     * cadena.
     */
    cantos: number;
};

type EstadoMano =
    | "jugando"
    | "respuesta_truco"
    | "respuesta_envido"
    | "finalizando";

type Estadisticas = {
    manosJugadas: number;
    manosGanadas: number;
    bazasGanadas: number;
    envidosGanados: number;
};

type Premio = {
    base: number;
    bonus: number;
    total: number;
    partidaLarga: boolean;
};

/* =========================================================
   CONSTANTES DEL MAZO
========================================================= */

const PALOS: Palo[] = [
    "espada",
    "basto",
    "oro",
    "copa",
];

const NUMEROS = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    10,
    11,
    12,
];

const SIMBOLOS: Record<Palo, string> = {
    espada: "♠",
    basto: "♣",
    oro: "♦",
    copa: "♥",
};

const NOMBRES_PALO: Record<Palo, string> = {
    espada: "Espada",
    basto: "Basto",
    oro: "Oro",
    copa: "Copa",
};

/* =========================================================
   JERARQUÍA
========================================================= */

function obtenerJerarquia(
    numero: number,
    palo: Palo
): number {
    if (numero === 1 && palo === "espada") return 1;
    if (numero === 1 && palo === "basto") return 2;
    if (numero === 7 && palo === "espada") return 3;
    if (numero === 7 && palo === "oro") return 4;
    if (numero === 3) return 5;
    if (numero === 2) return 6;
    if (numero === 1) return 7;
    if (numero === 12) return 8;
    if (numero === 11) return 9;
    if (numero === 10) return 10;
    if (numero === 7) return 11;
    if (numero === 6) return 12;
    if (numero === 5) return 13;
    if (numero === 4) return 14;

    return 99;
}

/* =========================================================
   MAZO
========================================================= */

function crearMazo(): Carta[] {
    return PALOS.flatMap((palo) =>
        NUMEROS.map((numero) => ({
            id: `${numero}-${palo}`,
            numero,
            palo,
            nombre: `${numero} de ${NOMBRES_PALO[palo]}`,
            jerarquia: obtenerJerarquia(numero, palo),
        }))
    );
}

function mezclar<T>(array: T[]): T[] {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [copia[i], copia[j]] = [
            copia[j],
            copia[i],
        ];
    }

    return copia;
}

/* =========================================================
   CARTAS
========================================================= */

function compararCartas(
    a: Carta,
    b: Carta
): number {
    if (a.jerarquia < b.jerarquia) return -1;
    if (a.jerarquia > b.jerarquia) return 1;

    return 0;
}

function cartaGana(
    a: Carta,
    b: Carta
): boolean {
    return compararCartas(a, b) < 0;
}

/* =========================================================
   ENVÍDO
========================================================= */

function valorEnvido(carta: Carta): number {
    return carta.numero >= 10
        ? 0
        : carta.numero;
}

function calcularEnvido(
    cartas: Carta[]
): number {
    if (!cartas.length) return 0;

    let mejor = 0;

    for (const carta of cartas) {
        mejor = Math.max(
            mejor,
            valorEnvido(carta)
        );
    }

    for (let i = 0; i < cartas.length; i++) {
        for (
            let j = i + 1;
            j < cartas.length;
            j++
        ) {
            if (
                cartas[i].palo ===
                cartas[j].palo
            ) {
                mejor = Math.max(
                    mejor,
                    20 +
                        valorEnvido(
                            cartas[i]
                        ) +
                        valorEnvido(
                            cartas[j]
                        )
                );
            }
        }
    }

    return mejor;
}

function tieneFlor(
    cartas: Carta[]
): boolean {
    return (
        cartas.length === 3 &&
        cartas.every(
            (carta) =>
                carta.palo ===
                cartas[0].palo
        )
    );
}

/* =========================================================
   FALTA ENVÍDO
========================================================= */

function calcularFaltaEnvido(
    puntosRival: number
): number {
    if (puntosRival < 15) {
        return Math.max(
            1,
            15 - puntosRival
        );
    }

    return Math.max(
        1,
        PUNTOS_OBJETIVO -
            puntosRival
    );
}

/* =========================================================
   NOMBRES
========================================================= */

function nombreCanto(
    tipo: TipoCanto
): string {
    switch (tipo) {
        case "truco":
            return "Truco";

        case "retruco":
            return "Retruco";

        case "vale4":
            return "Vale 4";

        case "envido":
            return "Envido";

        case "real_envido":
            return "Real Envido";

        case "falta_envido":
            return "Falta Envido";

        case "flor":
            return "Flor";
    }
}

/* =========================================================
   PREMIO
========================================================= */

function calcularPremio(
    duracionSegundos: number
): Premio {
    const partidaLarga =
        duracionSegundos >=
        MINUTOS_PARTIDA_LARGA * 60;

    const bonus = partidaLarga
        ? PREMIO_BONUS_PARTIDA_LARGA
        : 0;

    return {
        base: PREMIO_BASE,
        bonus,
        total: PREMIO_BASE + bonus,
        partidaLarga,
    };
}

/* =========================================================
   CARTA VISUAL
========================================================= */

function CartaVisual({
    carta,
    oculta = false,
    jugable = false,
    onClick,
    pequena = false,
}: {
    carta: Carta;
    oculta?: boolean;
    jugable?: boolean;
    onClick?: () => void;
    pequena?: boolean;
}) {
    if (oculta) {
        return (
            <div
                className={`
                    flex shrink-0 items-center justify-center
                    rounded-xl border-2 border-slate-600
                    bg-gradient-to-br from-slate-800
                    via-slate-900 to-black shadow-xl
                    ${
                        pequena
                            ? "h-20 w-14"
                            : "h-36 w-24"
                    }
                `}
            >
                <Shield
                    size={
                        pequena ? 22 : 32
                    }
                    className="text-slate-500"
                />
            </div>
        );
    }

    const roja =
        carta.palo === "oro" ||
        carta.palo === "copa";

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={!jugable}
            aria-label={`Jugar ${carta.nombre}`}
            className={`
                relative flex shrink-0 flex-col
                items-center justify-between rounded-xl
                border-2 bg-white p-2 shadow-xl
                transition-all duration-200
                ${
                    pequena
                        ? "h-20 w-14"
                        : "h-36 w-24"
                }
                ${
                    roja
                        ? "text-red-600"
                        : "text-slate-900"
                }
                ${
                    jugable
                        ? "cursor-pointer hover:-translate-y-3 hover:shadow-2xl"
                        : ""
                }
            `}
        >
            <span
                className={
                    pequena
                        ? "text-sm font-black"
                        : "text-xl font-black"
                }
            >
                {carta.numero}
            </span>

            <span
                className={
                    pequena
                        ? "text-xl"
                        : "text-4xl"
                }
            >
                {SIMBOLOS[carta.palo]}
            </span>

            {!pequena && (
                <span className="text-[9px] font-bold uppercase">
                    {NOMBRES_PALO[carta.palo]}
                </span>
            )}
        </button>
    );
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function Truco() {
    const navigate = useNavigate();

    /* =====================================================
       MARCADOR
    ===================================================== */

    const [puntosHumano, setPuntosHumano] =
        useState(0);

    const [puntosIA, setPuntosIA] =
        useState(0);

    const [partidaTerminada, setPartidaTerminada] =
        useState(false);

    const [ganadorPartida, setGanadorPartida] =
        useState<Jugador | null>(null);

    /* =====================================================
       TIEMPO
    ===================================================== */

    const [inicioPartida, setInicioPartida] =
        useState<number | null>(null);

    const [tiempoActual, setTiempoActual] =
        useState(0);

    /* =====================================================
       MANO
    ===================================================== */

    const [manoHumano, setManoHumano] =
        useState<Carta[]>([]);

    const [manoIA, setManoIA] =
        useState<Carta[]>([]);

    const [iniciador, setIniciador] =
        useState<Jugador>("humano");

    const [turno, setTurno] =
        useState<Jugador>("humano");

    const [estadoMano, setEstadoMano] =
        useState<EstadoMano>("jugando");

    /* =====================================================
       BAZAS
    ===================================================== */

    const [bazas, setBazas] =
        useState<Baza[]>([]);

    const [bazaActual, setBazaActual] =
        useState<Baza>({
            humano: null,
            ia: null,
            ganador: null,
            parda: false,
        });

    /* =====================================================
       TRUCO
    ===================================================== */

    const [nivelTruco, setNivelTruco] =
        useState<1 | 2 | 3 | 4>(1);

    const [trucoPendiente, setTrucoPendiente] =
        useState<TrucoPendiente | null>(null);

    /* =====================================================
       ENVÍDO
    ===================================================== */

    const [envidoPendiente, setEnvidoPendiente] =
        useState<EnvidoPendiente | null>(null);

    const [envidoResuelto, setEnvidoResuelto] =
        useState(false);

    /* =====================================================
       FLOR
    ===================================================== */

    const [florResuelta, setFlorResuelta] =
        useState(false);

    /* =====================================================
       UI
    ===================================================== */

    const [mensaje, setMensaje] =
        useState("Preparando partida...");

    const [historial, setHistorial] =
        useState<Historial[]>([]);

    const [mostrarReglas, setMostrarReglas] =
        useState(false);

    const [mostrarHistorial, setMostrarHistorial] =
        useState(false);

    const [premio, setPremio] =
        useState<Premio | null>(null);

    const [estadisticas, setEstadisticas] =
        useState<Estadisticas>({
            manosJugadas: 0,
            manosGanadas: 0,
            bazasGanadas: 0,
            envidosGanados: 0,
        });

    /* =====================================================
       REFS
    ===================================================== */

    const timerIA =
        useRef<number | null>(null);

    const timerBaza =
        useRef<number | null>(null);

    const eventoId =
        useRef(0);

    const resolviendoBaza =
        useRef(false);

    const finalizandoMano =
        useRef(false);

    const partidaInicializada =
        useRef(false);

    /* =====================================================
       HISTORIAL
    ===================================================== */

    const agregarEvento =
        useCallback(
            (
                texto: string,
                tipo: Historial["tipo"]
            ) => {
                eventoId.current += 1;

                setHistorial(
                    (actual) => [
                        ...actual,
                        {
                            id: eventoId.current,
                            texto,
                            tipo,
                        },
                    ]
                );
            },
            []
        );

    /* =====================================================
       TIEMPO
    ===================================================== */

    useEffect(() => {
        if (
            inicioPartida === null ||
            partidaTerminada
        ) {
            return;
        }

        const intervalo =
            window.setInterval(() => {
                setTiempoActual(
                    Math.floor(
                        (Date.now() -
                            inicioPartida) /
                            1000
                    )
                );
            }, 1000);

        return () =>
            window.clearInterval(
                intervalo
            );
    }, [
        inicioPartida,
        partidaTerminada,
    ]);

    const tiempoFormateado =
        useMemo(() => {
            const minutos =
                Math.floor(
                    tiempoActual / 60
                );

            const segundos =
                tiempoActual % 60;

            return `${String(
                minutos
            ).padStart(
                2,
                "0"
            )}:${String(
                segundos
            ).padStart(
                2,
                "0"
            )}`;
        }, [tiempoActual]);

    /* =====================================================
       LIMPIAR TIMERS
    ===================================================== */

    const limpiarTimers =
        useCallback(() => {
            if (
                timerIA.current !== null
            ) {
                window.clearTimeout(
                    timerIA.current
                );

                timerIA.current = null;
            }

            if (
                timerBaza.current !== null
            ) {
                window.clearTimeout(
                    timerBaza.current
                );

                timerBaza.current = null;
            }
        }, []);

    useEffect(() => {
        return limpiarTimers;
    }, [limpiarTimers]);

    /* =====================================================
       INICIAR MANO
    ===================================================== */

    const iniciarMano =
        useCallback(
            (
                quienEmpieza: Jugador
            ) => {
                limpiarTimers();

                const mazo =
                    mezclar(
                        crearMazo()
                    );

                const nuevasCartasHumano =
                    mazo.slice(0, 3);

                const nuevasCartasIA =
                    mazo.slice(3, 6);

                setManoHumano(
                    nuevasCartasHumano
                );

                setManoIA(
                    nuevasCartasIA
                );

                setBazas([]);

                setBazaActual({
                    humano: null,
                    ia: null,
                    ganador: null,
                    parda: false,
                });

                setIniciador(
                    quienEmpieza
                );

                setTurno(
                    quienEmpieza
                );

                setEstadoMano(
                    "jugando"
                );

                setNivelTruco(1);

                setTrucoPendiente(
                    null
                );

                setEnvidoPendiente(
                    null
                );

                setEnvidoResuelto(
                    false
                );

                setFlorResuelta(
                    false
                );

                resolviendoBaza.current =
                    false;

                finalizandoMano.current =
                    false;

                setMensaje(
                    quienEmpieza ===
                        "humano"
                        ? "Sos mano. Podés cantar Envido o jugar."
                        : "La IA es mano."
                );

                agregarEvento(
                    `Nueva mano. ${
                        quienEmpieza ===
                        "humano"
                            ? "Vos sos mano."
                            : "La IA es mano."
                    }`,
                    "sistema"
                );

                if (
                    USAR_FLOR &&
                    tieneFlor(
                        nuevasCartasHumano
                    )
                ) {
                    agregarEvento(
                        "Tenés Flor.",
                        "envido"
                    );
                }
            },
            [
                agregarEvento,
                limpiarTimers,
            ]
        );

    /* =====================================================
       NUEVA PARTIDA
    ===================================================== */

    const comenzarNuevaPartida =
        useCallback(() => {
            limpiarTimers();

            const ahora =
                Date.now();

            setPuntosHumano(0);
            setPuntosIA(0);

            setPartidaTerminada(
                false
            );

            setGanadorPartida(
                null
            );

            setPremio(null);

            setTiempoActual(0);

            setInicioPartida(
                ahora
            );

            setHistorial([]);

            eventoId.current = 0;

            setEstadisticas({
                manosJugadas: 0,
                manosGanadas: 0,
                bazasGanadas: 0,
                envidosGanados: 0,
            });

            iniciarMano("humano");
        }, [
            iniciarMano,
            limpiarTimers,
        ]);

    /* =====================================================
       INICIAR AUTOMÁTICAMENTE
    ===================================================== */

    useEffect(() => {
        if (
            partidaInicializada.current
        ) {
            return;
        }

        partidaInicializada.current =
            true;

        comenzarNuevaPartida();
    }, [comenzarNuevaPartida]);

    /* =====================================================
       FINALIZAR PARTIDA
    ===================================================== */

    const finalizarPartida =
        useCallback(
            (
                ganador: Jugador,
                marcadorHumano: number,
                marcadorIA: number
            ) => {
                if (
                    partidaTerminada
                ) {
                    return;
                }

                limpiarTimers();

                const duracion =
                    inicioPartida !==
                    null
                        ? Math.floor(
                              (Date.now() -
                                  inicioPartida) /
                                  1000
                          )
                        : tiempoActual;

                const recompensa =
                    calcularPremio(
                        duracion
                    );

                setTiempoActual(
                    duracion
                );

                setPremio(
                    recompensa
                );

                setGanadorPartida(
                    ganador
                );

                setPartidaTerminada(
                    true
                );

                setEstadoMano(
                    "finalizando"
                );

                setMensaje(
                    ganador ===
                        "humano"
                        ? "¡Ganaste la partida!"
                        : "La IA ganó la partida."
                );

                agregarEvento(
                    `Partida finalizada: ${marcadorHumano}-${marcadorIA}.`,
                    "resultado"
                );
            },
            [
                agregarEvento,
                inicioPartida,
                limpiarTimers,
                partidaTerminada,
                tiempoActual,
            ]
        );

    /* =====================================================
       SUMAR PUNTOS
    ===================================================== */

    const sumarPuntos =
        useCallback(
            (
                ganador: Jugador,
                puntos: number,
                motivo: string
            ) => {
                const nuevoHumano =
                    puntosHumano +
                    (ganador ===
                    "humano"
                        ? puntos
                        : 0);

                const nuevoIA =
                    puntosIA +
                    (ganador ===
                    "ia"
                        ? puntos
                        : 0);

                setPuntosHumano(
                    nuevoHumano
                );

                setPuntosIA(
                    nuevoIA
                );

                if (
                    ganador ===
                    "humano"
                ) {
                    setEstadisticas(
                        (actual) => ({
                            ...actual,
                            manosGanadas:
                                actual.manosGanadas,
                        })
                    );
                }

                agregarEvento(
                    `${
                        ganador ===
                        "humano"
                            ? "Vos"
                            : "La IA"
                    } gana ${puntos} punto${
                        puntos === 1
                            ? ""
                            : "s"
                    } por ${motivo}.`,
                    "resultado"
                );

                if (
                    nuevoHumano >=
                    PUNTOS_OBJETIVO
                ) {
                    window.setTimeout(
                        () =>
                            finalizarPartida(
                                "humano",
                                nuevoHumano,
                                nuevoIA
                            ),
                        500
                    );

                    return true;
                }

                if (
                    nuevoIA >=
                    PUNTOS_OBJETIVO
                ) {
                    window.setTimeout(
                        () =>
                            finalizarPartida(
                                "ia",
                                nuevoHumano,
                                nuevoIA
                            ),
                        500
                    );

                    return true;
                }

                return false;
            },
            [
                agregarEvento,
                finalizarPartida,
                puntosHumano,
                puntosIA,
            ]
        );

    /* =====================================================
       FINALIZAR MANO
    ===================================================== */

    const finalizarMano =
        useCallback(
            (
                ganador: Jugador,
                puntos: number,
                motivo: string
            ) => {
                if (
                    finalizandoMano.current ||
                    partidaTerminada
                ) {
                    return;
                }

                finalizandoMano.current =
                    true;

                setEstadoMano(
                    "finalizando"
                );

                setEstadisticas(
                    (actual) => ({
                        ...actual,
                        manosJugadas:
                            actual.manosJugadas +
                            1,
                        manosGanadas:
                            actual.manosGanadas +
                            (ganador ===
                            "humano"
                                ? 1
                                : 0),
                    })
                );

                setMensaje(
                    `${
                        ganador ===
                        "humano"
                            ? "Ganaste"
                            : "La IA ganó"
                    } la mano. +${puntos}`
                );

                agregarEvento(
                    `${
                        ganador ===
                        "humano"
                            ? "Ganaste"
                            : "La IA ganó"
                    } la mano por ${motivo}. +${puntos}.`,
                    "resultado"
                );

                const termino =
                    sumarPuntos(
                        ganador,
                        puntos,
                        motivo
                    );

                if (termino) {
                    return;
                }

                window.setTimeout(
                    () => {
                        finalizandoMano.current =
                            false;

                        iniciarMano(
                            ganador
                        );
                    },
                    1100
                );
            },
            [
                agregarEvento,
                iniciarMano,
                partidaTerminada,
                sumarPuntos,
            ]
        );

    /* =====================================================
       GANADOR DE LAS BAZAS
    ===================================================== */

    const determinarGanador =
        useCallback(
            (
                lista: Baza[]
            ): Jugador | null => {
                let humano = 0;
                let ia = 0;

                for (const baza of lista) {
                    if (
                        baza.ganador ===
                        "humano"
                    ) {
                        humano++;
                    }

                    if (
                        baza.ganador ===
                        "ia"
                    ) {
                        ia++;
                    }
                }

                if (humano >= 2)
                    return "humano";

                if (ia >= 2)
                    return "ia";

                if (
                    lista.length < 3
                ) {
                    return null;
                }

                /**
                 * Si hay una parda:
                 * gana quien ganó la primera
                 * baza decisiva según las
                 * reglas tradicionales.
                 */
                if (
                    lista[0].ganador
                ) {
                    return lista[0]
                        .ganador;
                }

                if (
                    lista[1].ganador
                ) {
                    return lista[1]
                        .ganador;
                }

                if (
                    lista[2].ganador
                ) {
                    return lista[2]
                        .ganador;
                }

                return iniciador;
            },
            [iniciador]
        );

    /* =====================================================
       RESOLVER BAZA
    ===================================================== */

    const resolverBaza =
        useCallback(() => {
            if (
                resolviendoBaza.current
            ) {
                return;
            }

            const humano =
                bazaActual.humano;

            const ia =
                bazaActual.ia;

            if (!humano || !ia) {
                return;
            }

            resolviendoBaza.current =
                true;

            const comparacion =
                compararCartas(
                    humano,
                    ia
                );

            const ganador =
                comparacion < 0
                    ? "humano"
                    : comparacion > 0
                      ? "ia"
                      : null;

            const nuevaBaza: Baza = {
                humano,
                ia,
                ganador,
                parda:
                    ganador === null,
            };

            const nuevasBazas = [
                ...bazas,
                nuevaBaza,
            ];

            setBazas(
                nuevasBazas
            );

            if (ganador) {
                agregarEvento(
                    `${
                        ganador ===
                        "humano"
                            ? "Vos ganaste"
                            : "La IA ganó"
                    } la baza.`,
                    "baza"
                );

                if (
                    ganador ===
                    "humano"
                ) {
                    setEstadisticas(
                        (actual) => ({
                            ...actual,
                            bazasGanadas:
                                actual.bazasGanadas +
                                1,
                        })
                    );
                }
            } else {
                agregarEvento(
                    "La baza fue parda.",
                    "baza"
                );
            }

            const ganadorMano =
                determinarGanador(
                    nuevasBazas
                );

            if (
                ganadorMano !== null
            ) {
                timerBaza.current =
                    window.setTimeout(
                        () => {
                            timerBaza.current =
                                null;

                            setBazaActual(
                                nuevaBaza
                            );

                            resolverBaza;

                            finalizarMano(
                                ganadorMano,
                                nivelTruco,
                                "resolución de las bazas"
                            );
                        },
                        700
                    );

                return;
            }

            /**
             * En una parda, quien salió
             * primero en esa baza conserva
             * la salida.
             */
            const siguiente =
                ganador ?? turno;

            timerBaza.current =
                window.setTimeout(
                    () => {
                        timerBaza.current =
                            null;

                        setBazaActual({
                            humano:
                                null,
                            ia: null,
                            ganador:
                                null,
                            parda:
                                false,
                        });

                        resolviendoBaza.current =
                            false;

                        setTurno(
                            siguiente
                        );
                    },
                    700
                );
        }, [
            agregarEvento,
            bazaActual,
            bazas,
            determinarGanador,
            finalizarMano,
            nivelTruco,
            turno,
        ]);

    useEffect(() => {
        if (
            bazaActual.humano &&
            bazaActual.ia &&
            !resolviendoBaza.current
        ) {
            resolverBaza();
        }
    }, [
        bazaActual.humano,
        bazaActual.ia,
        resolverBaza,
    ]);

    /* =====================================================
       JUGAR CARTA
    ===================================================== */

    const jugarCarta =
        useCallback(
            (carta: Carta) => {
                if (
                    turno !==
                        "humano" ||
                    estadoMano !==
                        "jugando" ||
                    partidaTerminada ||
                    trucoPendiente ||
                    envidoPendiente ||
                    bazaActual.humano
                ) {
                    return;
                }

                const existe =
                    manoHumano.some(
                        (c) =>
                            c.id ===
                            carta.id
                    );

                if (!existe) return;

                setManoHumano(
                    (actual) =>
                        actual.filter(
                            (c) =>
                                c.id !==
                                carta.id
                        )
                );

                setBazaActual(
                    (actual) => ({
                        ...actual,
                        humano:
                            carta,
                    })
                );

                agregarEvento(
                    `Jugaste ${carta.nombre}.`,
                    "carta"
                );

                setTurno("ia");
            },
            [
                agregarEvento,
                bazaActual.humano,
                envidoPendiente,
                estadoMano,
                manoHumano,
                partidaTerminada,
                turno,
                trucoPendiente,
            ]
        );

    /* =====================================================
       IA - FUERZA
    ===================================================== */

    const fuerzaIA =
        useMemo(() => {
            return manoIA.reduce(
                (total, carta) => {
                    if (
                        carta.jerarquia <= 2
                    )
                        return total + 5;

                    if (
                        carta.jerarquia <= 4
                    )
                        return total + 4;

                    if (
                        carta.jerarquia <= 7
                    )
                        return total + 3;

                    if (
                        carta.jerarquia <= 10
                    )
                        return total + 2;

                    return total + 1;
                },
                0
            );
        }, [manoIA]);

    /* =====================================================
       IA - ELEGIR CARTA
    ===================================================== */

    const elegirCartaIA =
        useCallback(() => {
            if (!manoIA.length)
                return null;

            const ordenadas =
                [...manoIA].sort(
                    (a, b) =>
                        a.jerarquia -
                        b.jerarquia
                );

            const cartaHumano =
                bazaActual.humano;

            if (!cartaHumano) {
                /**
                 * Si la IA sale, alterna
                 * entre carta fuerte y
                 * carta de sacrificio.
                 */
                if (
                    Math.random() < 0.3
                ) {
                    return (
                        ordenadas[
                            ordenadas.length -
                                1
                        ] ?? null
                    );
                }

                return ordenadas[0];
            }

            const ganadoras =
                ordenadas.filter(
                    (carta) =>
                        cartaGana(
                            carta,
                            cartaHumano
                        )
                );

            if (ganadoras.length) {
                /**
                 * Gana usando la carta
                 * más barata posible.
                 */
                return ganadoras[
                    ganadoras.length - 1
                ];
            }

            return (
                ordenadas[
                    ordenadas.length - 1
                ] ?? null
            );
        }, [
            bazaActual.humano,
            manoIA,
        ]);

    /* =====================================================
       TRUCO - SIGUIENTE NIVEL
    ===================================================== */

    function siguienteTruco(
        nivel: 1 | 2 | 3 | 4
    ): {
        tipo: TipoTruco;
        valor: 2 | 3 | 4;
    } | null {
        if (nivel === 1) {
            return {
                tipo: "truco",
                valor: 2,
            };
        }

        if (nivel === 2) {
            return {
                tipo: "retruco",
                valor: 3,
            };
        }

        if (nivel === 3) {
            return {
                tipo: "vale4",
                valor: 4,
            };
        }

        return null;
    }

    /* =====================================================
       CANTAR TRUCO HUMANO
    ===================================================== */

    const cantarTruco =
        useCallback(() => {
            if (
                turno !==
                    "humano" ||
                estadoMano !==
                    "jugando" ||
                trucoPendiente ||
                envidoPendiente ||
                partidaTerminada
            ) {
                return;
            }

            const siguiente =
                siguienteTruco(
                    nivelTruco
                );

            if (!siguiente) return;

            setTrucoPendiente({
                tipo: siguiente.tipo,
                por: "humano",
                valor: siguiente.valor,
                nivelAnterior:
                    nivelTruco,
            });

            setEstadoMano(
                "respuesta_truco"
            );

            agregarEvento(
                `Vos cantaste ${nombreCanto(
                    siguiente.tipo
                )}.`,
                "truco"
            );

            setMensaje(
                `Cantaste ${nombreCanto(
                    siguiente.tipo
                )}: vale ${siguiente.valor}.`
            );
        }, [
            agregarEvento,
            envidoPendiente,
            estadoMano,
            nivelTruco,
            partidaTerminada,
            trucoPendiente,
            turno,
        ]);

    /* =====================================================
       QUERER TRUCO
    ===================================================== */

    const quererTruco =
        useCallback(() => {
            if (
                !trucoPendiente ||
                trucoPendiente.por !==
                    "ia"
            ) {
                return;
            }

            setNivelTruco(
                trucoPendiente.valor
            );

            agregarEvento(
                `Dijiste Quiero al ${nombreCanto(
                    trucoPendiente.tipo
                )}.`,
                "truco"
            );

            setMensaje(
                `${nombreCanto(
                    trucoPendiente.tipo
                )} querido. Vale ${trucoPendiente.valor}.`
            );

            setTrucoPendiente(
                null
            );

            setEstadoMano(
                "jugando"
            );

            setTurno("humano");
        }, [
            agregarEvento,
            trucoPendiente,
        ]);

    /* =====================================================
       NO QUERER TRUCO
    ===================================================== */

    const noQuererTruco =
        useCallback(() => {
            if (!trucoPendiente)
                return;

            const ganador =
                trucoPendiente.por ===
                "humano"
                    ? "ia"
                    : "humano";

            const puntos =
                trucoPendiente.valor -
                1;

            agregarEvento(
                `${
                    trucoPendiente.por ===
                    "humano"
                        ? "La IA no quiso"
                        : "No quisiste"
                } ${nombreCanto(
                    trucoPendiente.tipo
                )}.`,
                "truco"
            );

            setTrucoPendiente(
                null
            );

            finalizarMano(
                ganador,
                puntos,
                `no querer ${nombreCanto(
                    trucoPendiente.tipo
                )}`
            );
        }, [
            agregarEvento,
            finalizarMano,
            trucoPendiente,
        ]);

    /* =====================================================
       RETRUCO / VALE 4 HUMANO
    ===================================================== */

    const revirarTruco =
        useCallback(() => {
            if (
                !trucoPendiente ||
                trucoPendiente.por !==
                    "ia" ||
                turno !== "humano"
            ) {
                return;
            }

            const siguiente =
                siguienteTruco(
                    trucoPendiente.valor
                );

            if (!siguiente) return;

            setNivelTruco(
                siguiente.valor === 3
                    ? 2
                    : 3
            );

            setTrucoPendiente({
                tipo: siguiente.tipo,
                por: "humano",
                valor: siguiente.valor,
                nivelAnterior:
                    trucoPendiente.valor,
            });

            agregarEvento(
                `Vos reviraste con ${nombreCanto(
                    siguiente.tipo
                )}.`,
                "truco"
            );

            setMensaje(
                `Reviraste: ${nombreCanto(
                    siguiente.tipo
                )} por ${siguiente.valor}.`
            );
        }, [
            agregarEvento,
            trucoPendiente,
            turno,
        ]);
    /* =====================================================
       CANTAR ENVÍDO HUMANO
    ===================================================== */

    const cantarEnvido =
        useCallback(
            (
                tipo: TipoEnvido
            ) => {
                if (
                    turno !==
                        "humano" ||
                    estadoMano !==
                        "jugando" ||
                    envidoResuelto ||
                    trucoPendiente ||
                    envidoPendiente ||
                    bazaActual.humano ||
                    partidaTerminada
                ) {
                    return;
                }

                const valor =
                    tipo ===
                    "falta_envido"
                        ? calcularFaltaEnvido(
                              puntosIA
                          )
                        : tipo ===
                            "real_envido"
                          ? 3
                          : 2;

                setEnvidoPendiente({
                    tipo,
                    por: "humano",
                    valor,
                    valorAnterior: 1,
                    cantos: 1,
                });

                setEstadoMano(
                    "respuesta_envido"
                );

                agregarEvento(
                    `Vos cantaste ${nombreCanto(
                        tipo
                    )}. Vale ${valor}.`,
                    "envido"
                );

                setMensaje(
                    `${nombreCanto(
                        tipo
                    )}: ${valor} puntos en juego.`
                );
            },
            [
                agregarEvento,
                bazaActual.humano,
                envidoPendiente,
                envidoResuelto,
                estadoMano,
                partidaTerminada,
                puntosIA,
                trucoPendiente,
                turno,
            ]
        );

    /* =====================================================
       QUERER ENVÍDO
    ===================================================== */

    const quererEnvido =
        useCallback(() => {
            if (
                !envidoPendiente
            ) {
                return;
            }

            const valorHumano =
                calcularEnvido(
                    manoHumano
                );

            const valorIA =
                calcularEnvido(
                    manoIA
                );

            const ganador =
                valorHumano >
                valorIA
                    ? "humano"
                    : valorIA >
                        valorHumano
                      ? "ia"
                      : iniciador;

            const puntos =
                envidoPendiente.valor;

            agregarEvento(
                `Envido: Vos ${valorHumano} - IA ${valorIA}. ${
                    ganador ===
                    "humano"
                        ? "Ganaste"
                        : "La IA ganó"
                } ${puntos}.`,
                "envido"
            );

            if (
                ganador ===
                "humano"
            ) {
                setEstadisticas(
                    (actual) => ({
                        ...actual,
                        envidosGanados:
                            actual.envidosGanados +
                            1,
                    })
                );
            }

            setEnvidoPendiente(
                null
            );

            setEnvidoResuelto(
                true
            );

            setEstadoMano(
                "jugando"
            );

            setTurno(
                iniciador
            );

            setMensaje(
                `Envido resuelto: ${valorHumano} a ${valorIA}. +${puntos}`
            );

            const termino =
                sumarPuntos(
                    ganador,
                    puntos,
                    "Envido"
                );

            if (termino) {
                return;
            }
        }, [
            agregarEvento,
            envidoPendiente,
            iniciador,
            manoHumano,
            manoIA,
            sumarPuntos,
        ]);

    /* =====================================================
       NO QUERER ENVÍDO
    ===================================================== */

    const noQuererEnvido =
        useCallback(() => {
            if (
                !envidoPendiente
            ) {
                return;
            }

            const ganador =
                envidoPendiente.por ===
                "humano"
                    ? "ia"
                    : "humano";

            /**
             * Si ya había una apuesta
             * aceptada, se cobra ese
             * valor.
             *
             * Si era el primer canto:
             * 1 punto.
             */
            const puntos =
                envidoPendiente.valorAnterior;

            agregarEvento(
                `${
                    envidoPendiente.por ===
                    "humano"
                        ? "La IA no quiso"
                        : "No quisiste"
                } ${nombreCanto(
                    envidoPendiente.tipo
                )}. +${puntos}.`,
                "envido"
            );

            setEnvidoPendiente(
                null
            );

            setEnvidoResuelto(
                true
            );

            setEstadoMano(
                "jugando"
            );

            setTurno(
                iniciador
            );

            setMensaje(
                `Envido no querido. +${puntos}.`
            );

            sumarPuntos(
                ganador,
                puntos,
                `no querer ${nombreCanto(
                    envidoPendiente.tipo
                )}`
            );
        }, [
            agregarEvento,
            envidoPendiente,
            iniciador,
            sumarPuntos,
        ]);

    /* =====================================================
       REVIRAR ENVÍDO HUMANO
    ===================================================== */

    const revirarEnvido =
        useCallback(
            (
                tipo: TipoEnvido
            ) => {
                if (
                    !envidoPendiente ||
                    envidoPendiente.por !==
                        "ia" ||
                    turno !== "humano"
                ) {
                    return;
                }

                /**
                 * Falta no puede ser
                 * respondida con otro
                 * envido.
                 */
                if (
                    envidoPendiente.tipo ===
                    "falta_envido"
                ) {
                    return;
                }

                const nuevoValor =
                    tipo ===
                    "falta_envido"
                        ? calcularFaltaEnvido(
                              puntosIA
                          )
                        : envidoPendiente.valor +
                          (tipo ===
                          "real_envido"
                              ? 3
                              : 2);

                setEnvidoPendiente({
                    tipo,
                    por: "humano",
                    valor: nuevoValor,
                    valorAnterior:
                        envidoPendiente.valor,
                    cantos:
                        envidoPendiente.cantos +
                        1,
                });

                agregarEvento(
                    `Vos reviraste con ${nombreCanto(
                        tipo
                    )}. Ahora hay ${nuevoValor} puntos en juego.`,
                    "envido"
                );

                setMensaje(
                    `${nombreCanto(
                        tipo
                    )}: ${nuevoValor} puntos en juego.`
                );
            },
            [
                agregarEvento,
                envidoPendiente,
                puntosIA,
                turno,
            ]
        );

    /* =====================================================
       IA - RESPONDER TRUCO
    ===================================================== */

    const responderTrucoIA =
        useCallback(() => {
            if (
                !trucoPendiente
            ) {
                return;
            }

            const fuerza =
                fuerzaIA;

            const probabilidad =
                Math.min(
                    0.92,
                    0.35 +
                        fuerza *
                            0.045
                );

            /**
             * Si puede subir, algunas
             * veces lo hace.
             */
            const siguiente =
                siguienteTruco(
                    trucoPendiente.valor
                );

            if (
                siguiente &&
                fuerza >= 10 &&
                Math.random() < 0.35
            ) {
                setTrucoPendiente({
                    tipo: siguiente.tipo,
                    por: "ia",
                    valor: siguiente.valor,
                    nivelAnterior:
                        trucoPendiente.valor,
                });

                setNivelTruco(
                    trucoPendiente.valor
                );

                agregarEvento(
                    `La IA reviró con ${nombreCanto(
                        siguiente.tipo
                    )}.`,
                    "truco"
                );

                setMensaje(
                    `La IA reviró: ${nombreCanto(
                        siguiente.tipo
                    )}.`
                );

                setTurno("humano");

                return;
            }

            if (
                Math.random() <
                probabilidad
            ) {
                setNivelTruco(
                    trucoPendiente.valor
                );

                agregarEvento(
                    `La IA dijo Quiero al ${nombreCanto(
                        trucoPendiente.tipo
                    )}.`,
                    "truco"
                );

                setMensaje(
                    `La IA quiso. Vale ${trucoPendiente.valor}.`
                );

                setTrucoPendiente(
                    null
                );

                setEstadoMano(
                    "jugando"
                );

                setTurno("humano");
            } else {
                const puntos =
                    trucoPendiente.valor -
                    1;

                const tipo =
                    trucoPendiente.tipo;

                setTrucoPendiente(
                    null
                );

                finalizarMano(
                    "humano",
                    puntos,
                    `la IA no quiso ${nombreCanto(
                        tipo
                    )}`
                );
            }
        }, [
            agregarEvento,
            finalizarMano,
            fuerzaIA,
            trucoPendiente,
        ]);

    /* =====================================================
       IA - RESPONDER ENVÍDO
    ===================================================== */

    const responderEnvidoIA =
        useCallback(() => {
            if (
                !envidoPendiente
            ) {
                return;
            }

            const valor =
                calcularEnvido(
                    manoIA
                );

            /**
             * Puede revirar si tiene
             * buen envido.
             */
            if (
                envidoPendiente.por ===
                    "humano" &&
                envidoPendiente.tipo !==
                    "falta_envido" &&
                valor >= 25 &&
                Math.random() <
                    0.35
            ) {
                const tipo =
                    valor >= 29 &&
                    Math.random() < 0.3
                        ? "real_envido"
                        : "envido";

                const nuevoValor =
                    envidoPendiente.valor +
                    (tipo ===
                    "real_envido"
                        ? 3
                        : 2);

                setEnvidoPendiente({
                    tipo,
                    por: "ia",
                    valor: nuevoValor,
                    valorAnterior:
                        envidoPendiente.valor,
                    cantos:
                        envidoPendiente.cantos +
                        1,
                });

                agregarEvento(
                    `La IA reviró con ${nombreCanto(
                        tipo
                    )}. ${nuevoValor} puntos en juego.`,
                    "envido"
                );

                setMensaje(
                    `La IA reviró: ${nombreCanto(
                        tipo
                    )}. ${nuevoValor} puntos.`
                );

                setTurno("humano");

                return;
            }

            /**
             * Ante una falta, la IA es
             * más conservadora si tiene
             * poco envido.
             */
            let probabilidad =
                0.35;

            if (valor >= 30)
                probabilidad = 0.9;
            else if (valor >= 27)
                probabilidad = 0.8;
            else if (valor >= 24)
                probabilidad = 0.68;
            else if (valor >= 20)
                probabilidad = 0.5;

            if (
                Math.random() <
                probabilidad
            ) {
                quererEnvido();
            } else {
                noQuererEnvido();
            }
        }, [
            agregarEvento,
            envidoPendiente,
            manoIA,
            noQuererEnvido,
            quererEnvido,
        ]);

    /* =====================================================
       IA - CANTAR TRUCO
    ===================================================== */

    const iaPuedeCantarTruco =
        useCallback(() => {
            if (
                trucoPendiente ||
                envidoPendiente ||
                nivelTruco >= 4
            ) {
                return false;
            }

            if (
                nivelTruco === 1 &&
                fuerzaIA >= 8 &&
                Math.random() < 0.25
            ) {
                setTrucoPendiente({
                    tipo: "truco",
                    por: "ia",
                    valor: 2,
                    nivelAnterior: 1,
                });

                setEstadoMano(
                    "respuesta_truco"
                );

                setMensaje(
                    "La IA cantó Truco. ¿Querés?"
                );

                agregarEvento(
                    "La IA cantó Truco.",
                    "truco"
                );

                return true;
            }

            if (
                nivelTruco === 2 &&
                fuerzaIA >= 10 &&
                Math.random() < 0.25
            ) {
                setTrucoPendiente({
                    tipo: "retruco",
                    por: "ia",
                    valor: 3,
                    nivelAnterior: 2,
                });

                setEstadoMano(
                    "respuesta_truco"
                );

                setMensaje(
                    "La IA cantó Retruco."
                );

                agregarEvento(
                    "La IA cantó Retruco.",
                    "truco"
                );

                return true;
            }

            if (
                nivelTruco === 3 &&
                fuerzaIA >= 12 &&
                Math.random() < 0.2
            ) {
                setTrucoPendiente({
                    tipo: "vale4",
                    por: "ia",
                    valor: 4,
                    nivelAnterior: 3,
                });

                setEstadoMano(
                    "respuesta_truco"
                );

                setMensaje(
                    "La IA cantó Vale 4."
                );

                agregarEvento(
                    "La IA cantó Vale 4.",
                    "truco"
                );

                return true;
            }

            return false;
        }, [
            agregarEvento,
            envidoPendiente,
            fuerzaIA,
            nivelTruco,
            trucoPendiente,
        ]);

    /* =====================================================
       IA - CANTAR ENVÍDO
    ===================================================== */

    const iaPuedeCantarEnvido =
        useCallback(() => {
            if (
                envidoResuelto ||
                envidoPendiente ||
                trucoPendiente ||
                bazaActual.humano ||
                bazaActual.ia
            ) {
                return false;
            }

            const valor =
                calcularEnvido(
                    manoIA
                );

            if (
                valor >= 30 &&
                Math.random() < 0.35
            ) {
                const falta =
                    calcularFaltaEnvido(
                        puntosHumano
                    );

                setEnvidoPendiente({
                    tipo: "falta_envido",
                    por: "ia",
                    valor: falta,
                    valorAnterior: 1,
                    cantos: 1,
                });

                setEstadoMano(
                    "respuesta_envido"
                );

                setMensaje(
                    `La IA cantó Falta Envido: ${falta} puntos.`
                );

                agregarEvento(
                    `La IA cantó Falta Envido: ${falta} puntos.`,
                    "envido"
                );

                return true;
            }

            if (
                valor >= 27 &&
                Math.random() < 0.4
            ) {
                setEnvidoPendiente({
                    tipo: "real_envido",
                    por: "ia",
                    valor: 3,
                    valorAnterior: 1,
                    cantos: 1,
                });

                setEstadoMano(
                    "respuesta_envido"
                );

                setMensaje(
                    "La IA cantó Real Envido: 3 puntos."
                );

                agregarEvento(
                    "La IA cantó Real Envido.",
                    "envido"
                );

                return true;
            }

            if (
                valor >= 24 &&
                Math.random() < 0.45
            ) {
                setEnvidoPendiente({
                    tipo: "envido",
                    por: "ia",
                    valor: 2,
                    valorAnterior: 1,
                    cantos: 1,
                });

                setEstadoMano(
                    "respuesta_envido"
                );

                setMensaje(
                    "La IA cantó Envido: 2 puntos."
                );

                agregarEvento(
                    "La IA cantó Envido.",
                    "envido"
                );

                return true;
            }

            return false;
        }, [
            agregarEvento,
            bazaActual.humano,
            bazaActual.ia,
            envidoPendiente,
            envidoResuelto,
            manoIA,
            puntosHumano,
            trucoPendiente,
        ]);

    /* =====================================================
       TURNOS DE IA
    ===================================================== */

    useEffect(() => {
        if (
            partidaTerminada ||
            turno !== "ia" ||
            estadoMano !==
                "jugando" ||
            trucoPendiente ||
            envidoPendiente
        ) {
            return;
        }

        if (
            timerIA.current !== null
        ) {
            return;
        }

        timerIA.current =
            window.setTimeout(
                () => {
                    timerIA.current =
                        null;

                    /**
                     * Primero intenta Envido.
                     */
                    if (
                        iaPuedeCantarEnvido()
                    ) {
                        return;
                    }

                    /**
                     * Después Truco.
                     */
                    if (
                        iaPuedeCantarTruco()
                    ) {
                        return;
                    }

                    const carta =
                        elegirCartaIA();

                    if (!carta) return;

                    setManoIA(
                        (actual) =>
                            actual.filter(
                                (c) =>
                                    c.id !==
                                    carta.id
                            )
                    );

                    setBazaActual(
                        (actual) => ({
                            ...actual,
                            ia: carta,
                        })
                    );

                    agregarEvento(
                        `La IA jugó ${carta.nombre}.`,
                        "carta"
                    );

                    setTurno(
                        "humano"
                    );
                },
                700
            );

        return () => {
            if (
                timerIA.current !==
                null
            ) {
                window.clearTimeout(
                    timerIA.current
                );

                timerIA.current =
                    null;
            }
        };
    }, [
        agregarEvento,
        elegirCartaIA,
        envidoPendiente,
        estadoMano,
        iaPuedeCantarEnvido,
        iaPuedeCantarTruco,
        partidaTerminada,
        turno,
        trucoPendiente,
    ]);

    /* =====================================================
       IA - RESPUESTAS
    ===================================================== */

    useEffect(() => {
        if (
            partidaTerminada ||
            turno !== "ia"
        ) {
            return;
        }

        if (
            trucoPendiente?.por ===
            "humano"
        ) {
            if (
                timerIA.current !== null
            ) {
                return;
            }

            timerIA.current =
                window.setTimeout(
                    () => {
                        timerIA.current =
                            null;

                        responderTrucoIA();
                    },
                    700
                );

            return;
        }

        if (
            envidoPendiente?.por ===
            "humano"
        ) {
            if (
                timerIA.current !== null
            ) {
                return;
            }

            timerIA.current =
                window.setTimeout(
                    () => {
                        timerIA.current =
                            null;

                        responderEnvidoIA();
                    },
                    700
                );
        }
    }, [
        envidoPendiente,
        partidaTerminada,
        responderEnvidoIA,
        responderTrucoIA,
        trucoPendiente,
        turno,
    ]);

    /* =====================================================
       ACCIONES DISPONIBLES
    ===================================================== */

    const puedeCantar =
        turno === "humano" &&
        estadoMano === "jugando" &&
        !partidaTerminada &&
        !bazaActual.humano &&
        !trucoPendiente &&
        !envidoPendiente;

    const siguienteCantoTruco =
        siguienteTruco(
            nivelTruco
        );

    const puedeRevirarEnvido =
        Boolean(
            envidoPendiente &&
                envidoPendiente.por ===
                    "ia" &&
                envidoPendiente.tipo !==
                    "falta_envido"
        );

    const premioActual =
        premio ?? {
            base: PREMIO_BASE,
            bonus: 0,
            total: PREMIO_BASE,
            partidaLarga: false,
        };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            {/* =================================================
                HEADER
            ================================================= */}

            <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/")
                            }
                            className="rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                        >
                            <ArrowLeft
                                size={20}
                            />
                        </button>

                        <div>
                            <h1 className="font-black">
                                🃏 Truco Argentino
                            </h1>

                            <p className="text-xs text-slate-500">
                                Partida a 30
                                puntos
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                            <Clock3
                                size={16}
                                className="text-emerald-300"
                            />

                            <span className="font-mono text-sm font-bold">
                                {
                                    tiempoFormateado
                                }
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarHistorial(
                                    true
                                )
                            }
                            className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                        >
                            <MessageCircle
                                size={18}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setMostrarReglas(
                                    true
                                )
                            }
                            className="rounded-xl border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                        >
                            <Info
                                size={18}
                            />
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-5">
                {/* =================================================
                    MARCADOR
                ================================================= */}

                <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                                    Vos
                                </p>

                                <p className="mt-1 text-4xl font-black">
                                    {
                                        puntosHumano
                                    }
                                </p>
                            </div>

                            <Crown
                                className="text-emerald-300"
                                size={30}
                            />
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
                            <div
                                className="h-full rounded-full bg-emerald-400 transition-all"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (puntosHumano /
                                            30) *
                                            100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-center">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                                Bazas
                            </p>

                            <p className="mt-1 text-3xl font-black">
                                {
                                    bazas.filter(
                                        (b) =>
                                            b.ganador ===
                                            "humano"
                                    ).length
                                }
                                {" - "}
                                {
                                    bazas.filter(
                                        (b) =>
                                            b.ganador ===
                                            "ia"
                                    ).length
                                }
                            </p>

                            <p className="text-xs text-slate-500">
                                de esta mano
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-red-300">
                                    IA
                                </p>

                                <p className="mt-1 text-4xl font-black">
                                    {puntosIA}
                                </p>
                            </div>

                            <Bot
                                className="text-red-300"
                                size={30}
                            />
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
                            <div
                                className="h-full rounded-full bg-red-400 transition-all"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (puntosIA /
                                            30) *
                                            100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* =================================================
                    ESTADO
                ================================================= */}

                <section className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-amber-500/10 p-2">
                                <Flame
                                    size={20}
                                    className="text-amber-300"
                                />
                            </div>

                            <div>
                                <p className="font-bold">
                                    {mensaje}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {turno ===
                                    "humano"
                                        ? "Tu turno"
                                        : "Turno de la IA"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-black text-amber-300">
                                Mano:{" "}
                                {iniciador ===
                                "humano"
                                    ? "Vos"
                                    : "IA"}
                            </span>

                            <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-black text-blue-300">
                                Truco:{" "}
                                {
                                    nivelTruco
                                }
                                {" punto"}
                                {nivelTruco ===
                                1
                                    ? ""
                                    : "s"}
                            </span>

                            <span className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-xs font-black text-purple-300">
                                Envido:{" "}
                                {envidoPendiente
                                    ? envidoPendiente.valor
                                    : envidoResuelto
                                      ? "resuelto"
                                      : "sin cantar"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    CANTO PENDIENTE
                ================================================= */}

                {trucoPendiente && (
                    <section className="mb-5 rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <Sparkles
                                    size={20}
                                    className="text-amber-300"
                                />

                                <div>
                                    <h2 className="font-black text-amber-200">
                                        La IA propone{" "}
                                        {
                                            nombreCanto(
                                                trucoPendiente.tipo
                                            )
                                        }
                                    </h2>

                                    <p className="text-sm text-amber-100/70">
                                        Hay{" "}
                                        <strong>
                                            {
                                                trucoPendiente.valor
                                            }{" "}
                                            puntos
                                        </strong>{" "}
                                        en juego.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={
                                        quererTruco
                                    }
                                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-black hover:bg-emerald-400"
                                >
                                    <Check
                                        size={18}
                                    />
                                    Quiero (
                                    {
                                        trucoPendiente.valor
                                    }
                                    )
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        noQuererTruco
                                    }
                                    className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-black hover:bg-red-400"
                                >
                                    <X
                                        size={18}
                                    />
                                    No quiero (
                                    {
                                        trucoPendiente
                                            .valor -
                                        1
                                    }
                                    )
                                </button>

                                {trucoPendiente.valor <
                                    4 && (
                                    <button
                                        type="button"
                                        onClick={
                                            revirarTruco
                                        }
                                        className="rounded-xl bg-amber-500 px-5 py-3 font-black text-slate-950 hover:bg-amber-400"
                                    >
                                        {trucoPendiente.valor ===
                                        2
                                            ? "Retruco (3)"
                                            : "Vale 4 (4)"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {envidoPendiente && (
                    <section className="mb-5 rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <CircleDollarSign
                                    size={20}
                                    className="text-blue-300"
                                />

                                <div>
                                    <h2 className="font-black text-blue-200">
                                        {envidoPendiente.por ===
                                        "ia"
                                            ? "La IA te propone "
                                            : "Vos propusiste "}
                                        {
                                            nombreCanto(
                                                envidoPendiente.tipo
                                            )
                                        }
                                    </h2>

                                    <p className="text-sm text-blue-100/70">
                                        <strong>
                                            {
                                                envidoPendiente.valor
                                            }{" "}
                                            puntos
                                        </strong>{" "}
                                        en juego.
                                    </p>
                                </div>
                            </div>

                            {envidoPendiente.por ===
                                "ia" && (
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={
                                            quererEnvido
                                        }
                                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-black hover:bg-emerald-400"
                                    >
                                        <Check
                                            size={
                                                18
                                            }
                                        />
                                        Quiero (
                                        {
                                            envidoPendiente.valor
                                        }
                                        )
                                    </button>

                                    <button
                                        type="button"
                                        onClick={
                                            noQuererEnvido
                                        }
                                        className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-black hover:bg-red-400"
                                    >
                                        <X
                                            size={
                                                18
                                            }
                                        />
                                        No quiero (
                                        {
                                            envidoPendiente
                                                .valorAnterior
                                        }
                                        )
                                    </button>

                                    {puedeRevirarEnvido && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    revirarEnvido(
                                                        "envido"
                                                    )
                                                }
                                                className="rounded-xl bg-blue-500 px-5 py-3 font-black hover:bg-blue-400"
                                            >
                                                Envido (
                                                {
                                                    envidoPendiente
                                                        .valor +
                                                    2
                                                }
                                                )
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    revirarEnvido(
                                                        "real_envido"
                                                    )
                                                }
                                                className="rounded-xl bg-cyan-500 px-5 py-3 font-black hover:bg-cyan-400"
                                            >
                                                Real Envido (
                                                {
                                                    envidoPendiente
                                                        .valor +
                                                    3
                                                }
                                                )
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    revirarEnvido(
                                                        "falta_envido"
                                                    )
                                                }
                                                className="rounded-xl bg-purple-500 px-5 py-3 font-black hover:bg-purple-400"
                                            >
                                                Falta (
                                                {
                                                    calcularFaltaEnvido(
                                                        puntosIA
                                                    )
                                                }
                                                )
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            {envidoPendiente.por ===
                                "humano" && (
                                <p className="text-xs text-blue-200/60">
                                    La IA está
                                    pensando su
                                    respuesta...
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* =================================================
                    MESA
                ================================================= */}

                <section className="mb-5 overflow-hidden rounded-3xl border border-emerald-400/10 bg-gradient-to-br from-emerald-900/60 via-emerald-950/70 to-slate-950 p-5 shadow-2xl">
                    {/* IA */}
                    <div className="flex min-h-40 flex-col items-center justify-center">
                        <div className="mb-3 flex items-center gap-2">
                            <Bot
                                size={17}
                                className="text-red-300"
                            />

                            <span className="text-xs font-black uppercase tracking-widest text-red-300">
                                IA
                            </span>

                            <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] text-red-200">
                                3 cartas
                            </span>
                        </div>

                        <div className="flex justify-center gap-2">
                            {manoIA.map(
                                (carta) => (
                                    <CartaVisual
                                        key={
                                            carta.id
                                        }
                                        carta={
                                            carta
                                        }
                                        oculta
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* CENTRO */}
                    <div className="flex min-h-48 items-center justify-center gap-5">
                        {bazaActual.humano ? (
                            <CartaVisual
                                carta={
                                    bazaActual.humano
                                }
                                pequena
                            />
                        ) : (
                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border border-dashed border-white/10 text-slate-700">
                                ?
                            </div>
                        )}

                        {bazaActual.ia ? (
                            <CartaVisual
                                carta={
                                    bazaActual.ia
                                }
                                pequena
                            />
                        ) : (
                            <div className="flex h-20 w-14 items-center justify-center rounded-xl border border-dashed border-white/10 text-slate-700">
                                ?
                            </div>
                        )}
                    </div>

                    {/* HUMANO */}
                    <div className="flex flex-col items-center">
                        <div className="mb-3 flex items-center gap-2">
                            <Crown
                                size={17}
                                className="text-emerald-300"
                            />

                            <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
                                Tus cartas
                            </span>
                        </div>

                        <div className="flex min-h-36 items-end justify-center gap-2">
                            {manoHumano.length ===
                            0 ? (
                                <p className="text-sm text-slate-600">
                                    Esperando
                                    nuevas
                                    cartas...
                                </p>
                            ) : (
                                manoHumano.map(
                                    (
                                        carta
                                    ) => (
                                        <CartaVisual
                                            key={
                                                carta.id
                                            }
                                            carta={
                                                carta
                                            }
                                            jugable={
                                                turno ===
                                                    "humano" &&
                                                estadoMano ===
                                                    "jugando" &&
                                                !bazaActual.humano &&
                                                !trucoPendiente &&
                                                !envidoPendiente
                                            }
                                            onClick={() =>
                                                jugarCarta(
                                                    carta
                                                )
                                            }
                                        />
                                    )
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    ACCIONES
                ================================================= */}

                <section className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <Hand
                            size={18}
                            className="text-emerald-300"
                        />

                        <h2 className="font-black">
                            Cantos
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                        <button
                            type="button"
                            disabled={
                                !puedeCantar ||
                                !siguienteCantoTruco
                            }
                            onClick={
                                cantarTruco
                            }
                            className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-3 text-sm font-black text-amber-200 hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            {nivelTruco ===
                            1
                                ? "Truco · 2"
                                : nivelTruco ===
                                    2
                                  ? "Retruco · 3"
                                  : "Vale 4 · 4"}
                        </button>

                        <button
                            type="button"
                            disabled={
                                !puedeCantar ||
                                envidoResuelto
                            }
                            onClick={() =>
                                cantarEnvido(
                                    "envido"
                                )
                            }
                            className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-3 text-sm font-black text-blue-200 hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            Envido · 2
                        </button>

                        <button
                            type="button"
                            disabled={
                                !puedeCantar ||
                                envidoResuelto
                            }
                            onClick={() =>
                                cantarEnvido(
                                    "real_envido"
                                )
                            }
                            className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-3 text-sm font-black text-cyan-200 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            Real Envido · 3
                        </button>

                        <button
                            type="button"
                            disabled={
                                !puedeCantar ||
                                envidoResuelto
                            }
                            onClick={() =>
                                cantarEnvido(
                                    "falta_envido"
                                )
                            }
                            className="rounded-xl border border-purple-400/20 bg-purple-500/10 px-3 py-3 text-sm font-black text-purple-200 hover:bg-purple-500/20 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                            Falta ·{" "}
                            {
                                calcularFaltaEnvido(
                                    puntosIA
                                )
                            }
                        </button>

                        {USAR_FLOR && (
                            <button
                                type="button"
                                disabled={
                                    !tieneFlor(
                                        manoHumano
                                    ) ||
                                    florResuelta ||
                                    !puedeCantar
                                }
                                className="rounded-xl border border-pink-400/20 bg-pink-500/10 px-3 py-3 text-sm font-black text-pink-200 disabled:opacity-25"
                            >
                                Flor · 3
                            </button>
                        )}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-black/20 p-3">
                            <p className="text-xs text-slate-500">
                                Truco actual
                            </p>

                            <p className="text-lg font-black text-amber-300">
                                {
                                    nivelTruco
                                }{" "}
                                punto
                                {nivelTruco !==
                                1
                                    ? "s"
                                    : ""}
                            </p>
                        </div>

                        <div className="rounded-xl bg-black/20 p-3">
                            <p className="text-xs text-slate-500">
                                Tu Envido
                            </p>

                            <p className="text-lg font-black text-blue-300">
                                {
                                    calcularEnvido(
                                        manoHumano
                                    )
                                }
                            </p>
                        </div>

                        <div className="rounded-xl bg-black/20 p-3">
                            <p className="text-xs text-slate-500">
                                Falta
                            </p>

                            <p className="text-lg font-black text-purple-300">
                                {
                                    calcularFaltaEnvido(
                                        puntosIA
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    ESTADÍSTICAS
                ================================================= */}

                <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Trophy
                            size={19}
                            className="mb-2 text-amber-300"
                        />

                        <p className="text-2xl font-black">
                            {
                                estadisticas.manosJugadas
                            }
                        </p>

                        <p className="text-xs text-slate-500">
                            Manos
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Crown
                            size={19}
                            className="mb-2 text-emerald-300"
                        />

                        <p className="text-2xl font-black">
                            {
                                estadisticas.manosGanadas
                            }
                        </p>

                        <p className="text-xs text-slate-500">
                            Manos ganadas
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Hand
                            size={19}
                            className="mb-2 text-blue-300"
                        />

                        <p className="text-2xl font-black">
                            {
                                estadisticas.bazasGanadas
                            }
                        </p>

                        <p className="text-xs text-slate-500">
                            Bazas ganadas
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <CircleDollarSign
                            size={19}
                            className="mb-2 text-purple-300"
                        />

                        <p className="text-2xl font-black">
                            {premioActual.total.toLocaleString(
                                "es-AR"
                            )}
                        </p>

                        <p className="text-xs text-slate-500">
                            Premio potencial
                        </p>
                    </div>
                </section>
            </main>

            {/* =====================================================
                HISTORIAL
            ===================================================== */}

            {mostrarHistorial && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                        <div className="flex items-center justify-between border-b border-white/10 p-5">
                            <div>
                                <h2 className="font-black">
                                    Historial
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Jugadas y
                                    cantos
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setMostrarHistorial(
                                        false
                                    )
                                }
                                className="rounded-xl bg-white/5 p-2"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-4">
                            <div className="space-y-2">
                                {historial.length ===
                                0 ? (
                                    <p className="text-center text-sm text-slate-500">
                                        Todavía
                                        no hay
                                        eventos.
                                    </p>
                                ) : (
                                    [
                                        ...historial,
                                    ]
                                        .reverse()
                                        .map(
                                            (
                                                evento
                                            ) => (
                                                <div
                                                    key={
                                                        evento.id
                                                    }
                                                    className="rounded-xl border border-white/5 bg-white/5 p-3"
                                                >
                                                    <p className="text-sm text-slate-300">
                                                        {
                                                            evento.texto
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
                REGLAS
            ===================================================== */}

            {mostrarReglas && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-black">
                                Reglas del Truco
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setMostrarReglas(
                                        false
                                    )
                                }
                                className="rounded-xl bg-white/5 p-2"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-5 text-sm leading-6 text-slate-300">
                            <div>
                                <h3 className="font-black text-emerald-300">
                                    Objetivo
                                </h3>

                                <p>
                                    La partida
                                    termina
                                    al llegar
                                    a 30
                                    puntos.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-black text-amber-300">
                                    Truco
                                </h3>

                                <p>
                                    La mano
                                    comienza
                                    valiendo
                                    1.
                                    Puede
                                    subir a
                                    Truco
                                    (2),
                                    Retruco
                                    (3) y
                                    Vale 4
                                    (4).
                                </p>
                            </div>

                            <div>
                                <h3 className="font-black text-blue-300">
                                    Envido
                                </h3>

                                <p>
                                    Envido
                                    vale 2.
                                    Real
                                    Envido
                                    vale 3.
                                    Las
                                    apuestas
                                    pueden
                                    revirarse
                                    antes de
                                    resolver
                                    el
                                    Envido.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-black text-purple-300">
                                    Falta
                                    Envido
                                </h3>

                                <p>
                                    Su valor
                                    depende
                                    del
                                    marcador.
                                    En esta
                                    versión
                                    se
                                    calcula
                                    para
                                    completar
                                    la etapa
                                    correspondiente
                                    hasta la
                                    victoria.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-black text-cyan-300">
                                    Jerarquía
                                </h3>

                                <p>
                                    1 de
                                    espada,
                                    1 de
                                    basto,
                                    7 de
                                    espada,
                                    7 de
                                    oro, 3,
                                    2, 1 de
                                    copa/oro,
                                    12, 11,
                                    10, 7 de
                                    copa/basto,
                                    6, 5 y
                                    4.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-black text-pink-300">
                                    Desempates
                                </h3>

                                <p>
                                    Las
                                    cartas
                                    iguales
                                    producen
                                    parda.
                                    Las
                                    reglas de
                                    las tres
                                    bazas
                                    determinan
                                    finalmente
                                    quién gana
                                    la mano.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =====================================================
                FIN DE PARTIDA
            ===================================================== */}

            {partidaTerminada &&
                ganadorPartida && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
                        <div className="w-full max-w-md rounded-3xl border border-emerald-400/20 bg-slate-950 p-7 text-center shadow-2xl">
                            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10">
                                {ganadorPartida ===
                                "humano" ? (
                                    <Trophy
                                        size={48}
                                        className="text-amber-300"
                                    />
                                ) : (
                                    <Bot
                                        size={48}
                                        className="text-red-300"
                                    />
                                )}
                            </div>

                            <h2 className="text-3xl font-black">
                                {ganadorPartida ===
                                "humano"
                                    ? "¡Ganaste la partida!"
                                    : "La IA ganó la partida"}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Partida
                                completa a
                                30 puntos
                            </p>

                            <div className="my-6 flex items-center justify-center gap-6">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-300">
                                        Vos
                                    </p>

                                    <p className="text-5xl font-black">
                                        {
                                            puntosHumano
                                        }
                                    </p>
                                </div>

                                <span className="text-2xl text-slate-600">
                                    -
                                </span>

                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-red-300">
                                        IA
                                    </p>

                                    <p className="text-5xl font-black">
                                        {
                                            puntosIA
                                        }
                                    </p>
                                </div>
                            </div>

                            {ganadorPartida ===
                                "humano" && (
                                <div className="mb-5 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-5">
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <CircleDollarSign
                                            size={
                                                22
                                            }
                                            className="text-amber-300"
                                        />

                                        <span className="font-black text-amber-200">
                                            Premio
                                        </span>
                                    </div>

                                    <p className="text-4xl font-black text-amber-300">
                                        +
                                        {premioActual.total.toLocaleString(
                                            "es-AR"
                                        )}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        fichas
                                    </p>

                                    {premioActual.bonus >
                                        0 && (
                                        <p className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300">
                                            +
                                            {premioActual.bonus.toLocaleString(
                                                "es-AR"
                                            )}{" "}
                                            bonus
                                            por
                                            partida
                                            larga
                                        </p>
                                    )}

                                    <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                                        <Clock3
                                            size={
                                                14
                                            }
                                        />

                                        Duración:{" "}
                                        {
                                            tiempoFormateado
                                        }
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={
                                    comenzarNuevaPartida
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-black transition hover:bg-emerald-400"
                            >
                                <RotateCcw
                                    size={19}
                                />
                                Jugar otra
                                partida
                            </button>
                        </div>
                    </div>
                )}
        </div>
    );
}