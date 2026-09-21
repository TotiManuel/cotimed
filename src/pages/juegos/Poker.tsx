import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    Bot,
    CircleDollarSign,
    Coins,
    Crown,
    Eye,
    RotateCcw,
    Shield,
    Sparkles,
    Trophy,
    User,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

// ============================================================
// TIPOS
// ============================================================

type Palo = "♠" | "♥" | "♦" | "♣";

type Carta = {
    palo: Palo;
    valor: number;
};

type Calle =
    | "preflop"
    | "flop"
    | "turn"
    | "river"
    | "showdown";

type Jugador = {
    cartas: Carta[];
    fichas: number;
    apuestaRonda: number;
    apuestaTotal: number;
    activo: boolean;
    allIn: boolean;
};

type Evaluacion = {
    categoria: number;
    nombre: string;
    valores: number[];
};

type ResultadoMano = {
    jugador: Evaluacion;
    cpu: Evaluacion;
    ganador: "jugador" | "cpu" | "empate";
};

// ============================================================
// CONSTANTES
// ============================================================

const PALOS: Palo[] = ["♠", "♥", "♦", "♣"];

const VALORES = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
];

const APUESTAS = [50, 100, 250, 500, 1000];

const SMALL_BLIND = 25;
const BIG_BLIND = 50;

const MIN_RAISE = BIG_BLIND;

const NOMBRES_VALORES: Record<number, string> = {
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
    14: "A",
};

// ============================================================
// UTILIDADES
// ============================================================

const formatDinero = (valor: number) =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(valor);

const cartaRoja = (palo: Palo) =>
    palo === "♥" || palo === "♦";

const valorTexto = (valor: number) =>
    NOMBRES_VALORES[valor] ?? String(valor);

// ============================================================
// BARAJA
// ============================================================

function crearBaraja(): Carta[] {
    const baraja: Carta[] = [];

    for (const palo of PALOS) {
        for (const valor of VALORES) {
            baraja.push({
                palo,
                valor,
            });
        }
    }

    return baraja;
}

function barajar(cartas: Carta[]): Carta[] {
    const copia = [...cartas];

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

// ============================================================
// COMPARADORES
// ============================================================

function compararArrays(
    a: number[],
    b: number[]
): number {
    const longitud = Math.max(
        a.length,
        b.length
    );

    for (let i = 0; i < longitud; i++) {
        const av = a[i] ?? 0;
        const bv = b[i] ?? 0;

        if (av > bv) return 1;
        if (av < bv) return -1;
    }

    return 0;
}

function compararManos(
    a: Evaluacion,
    b: Evaluacion
): number {
    if (a.categoria !== b.categoria) {
        return a.categoria > b.categoria
            ? 1
            : -1;
    }

    return compararArrays(
        a.valores,
        b.valores
    );
}

// ============================================================
// ESCALERAS
// ============================================================

function mejorEscalera(
    valores: number[]
): number[] | null {
    const unicos = [
        ...new Set(valores),
    ].sort((a, b) => b - a);

    if (unicos.includes(14)) {
        unicos.push(1);
    }

    for (
        let i = 0;
        i <= unicos.length - 5;
        i++
    ) {
        const grupo = unicos.slice(
            i,
            i + 5
        );

        if (
            grupo.length === 5 &&
            grupo[0] - grupo[4] === 4
        ) {
            return grupo;
        }
    }

    return null;
}

// ============================================================
// EVALUADOR TEXAS HOLD'EM
// ============================================================

function evaluarMano(
    cartas: Carta[]
): Evaluacion {
    const valores = cartas
        .map((carta) => carta.valor)
        .sort((a, b) => b - a);

    const conteo = new Map<
        number,
        number
    >();

    for (const valor of valores) {
        conteo.set(
            valor,
            (conteo.get(valor) ?? 0) + 1
        );
    }

    const grupos = [
        ...conteo.entries(),
    ].sort((a, b) => {
        if (a[1] !== b[1]) {
            return b[1] - a[1];
        }

        return b[0] - a[0];
    });

    const palos = new Map<
        Palo,
        Carta[]
    >();

    for (const carta of cartas) {
        const existentes =
            palos.get(carta.palo) ?? [];

        existentes.push(carta);

        palos.set(
            carta.palo,
            existentes
        );
    }

    // ========================================================
    // ESCALERA REAL / ESCALERA DE COLOR
    // ========================================================

    let mejorEscaleraColor:
        | number[]
        | null = null;

    for (const cartasPalo of palos.values()) {
        if (cartasPalo.length < 5) {
            continue;
        }

        const escalera =
            mejorEscalera(
                cartasPalo.map(
                    (carta) =>
                        carta.valor
                )
            );

        if (
            escalera &&
            (!mejorEscaleraColor ||
                compararArrays(
                    escalera,
                    mejorEscaleraColor
                ) > 0)
        ) {
            mejorEscaleraColor =
                escalera;
        }
    }

    if (mejorEscaleraColor) {
        if (
            mejorEscaleraColor[0] ===
            14
        ) {
            return {
                categoria: 9,
                nombre: "Escalera real",
                valores:
                    mejorEscaleraColor,
            };
        }

        return {
            categoria: 8,
            nombre:
                "Escalera de color",
            valores:
                mejorEscaleraColor,
        };
    }

    // ========================================================
    // PÓKER
    // ========================================================

    const poker = grupos.find(
        ([, cantidad]) =>
            cantidad === 4
    );

    if (poker) {
        const kicker =
            valores.find(
                (valor) =>
                    valor !== poker[0]
            ) ?? 0;

        return {
            categoria: 7,
            nombre: "Póker",
            valores: [
                poker[0],
                kicker,
            ],
        };
    }

    // ========================================================
    // FULL
    // ========================================================

    const trios = grupos
        .filter(
            ([, cantidad]) =>
                cantidad >= 3
        )
        .map(([valor]) => valor)
        .sort((a, b) => b - a);

    const parejas = grupos
        .filter(
            ([valor, cantidad]) =>
                cantidad >= 2 &&
                !trios.includes(valor)
        )
        .map(([valor]) => valor)
        .sort((a, b) => b - a);

    if (trios.length >= 2) {
        return {
            categoria: 6,
            nombre: "Full",
            valores: [
                trios[0],
                trios[1],
            ],
        };
    }

    if (
        trios.length >= 1 &&
        parejas.length >= 1
    ) {
        return {
            categoria: 6,
            nombre: "Full",
            valores: [
                trios[0],
                parejas[0],
            ],
        };
    }

    // ========================================================
    // COLOR
    // ========================================================

    let mejorColor:
        | number[]
        | null = null;

    for (const cartasPalo of palos.values()) {
        if (cartasPalo.length < 5) {
            continue;
        }

        const valoresColor =
            cartasPalo
                .map(
                    (carta) =>
                        carta.valor
                )
                .sort(
                    (a, b) => b - a
                )
                .slice(0, 5);

        if (
            !mejorColor ||
            compararArrays(
                valoresColor,
                mejorColor
            ) > 0
        ) {
            mejorColor =
                valoresColor;
        }
    }

    if (mejorColor) {
        return {
            categoria: 5,
            nombre: "Color",
            valores: mejorColor,
        };
    }

    // ========================================================
    // ESCALERA
    // ========================================================

    const escalera =
        mejorEscalera(valores);

    if (escalera) {
        return {
            categoria: 4,
            nombre: "Escalera",
            valores: escalera,
        };
    }

    // ========================================================
    // TRÍO
    // ========================================================

    if (trios.length >= 1) {
        const trio =
            trios[0];

        const kickers = valores
            .filter(
                (valor) =>
                    valor !== trio
            )
            .slice(0, 2);

        return {
            categoria: 3,
            nombre: "Trío",
            valores: [
                trio,
                ...kickers,
            ],
        };
    }

    // ========================================================
    // DOBLE PAREJA
    // ========================================================

    const pares = grupos
        .filter(
            ([, cantidad]) =>
                cantidad >= 2
        )
        .map(([valor]) => valor)
        .sort((a, b) => b - a);

    if (pares.length >= 2) {
        const pareja1 = pares[0];
        const pareja2 = pares[1];

        const kicker =
            valores.find(
                (valor) =>
                    valor !== pareja1 &&
                    valor !== pareja2
            ) ?? 0;

        return {
            categoria: 2,
            nombre:
                "Doble pareja",
            valores: [
                pareja1,
                pareja2,
                kicker,
            ],
        };
    }

    // ========================================================
    // PAREJA
    // ========================================================

    if (pares.length >= 1) {
        const pareja =
            pares[0];

        const kickers = valores
            .filter(
                (valor) =>
                    valor !== pareja
            )
            .slice(0, 3);

        return {
            categoria: 1,
            nombre: "Pareja",
            valores: [
                pareja,
                ...kickers,
            ],
        };
    }

    // ========================================================
    // CARTA ALTA
    // ========================================================

    return {
        categoria: 0,
        nombre: "Carta alta",
        valores: valores.slice(
            0,
            5
        ),
    };
}

// ============================================================
// COMPONENTE CARTA
// ============================================================

function CartaVisual({
    carta,
    oculta = false,
    pequena = false,
}: {
    carta?: Carta;
    oculta?: boolean;
    pequena?: boolean;
}) {
    if (oculta || !carta) {
        return (
            <div
                className={[
                    "flex items-center justify-center rounded-lg border",
                    "border-cyan-400/40 bg-slate-800",
                    "shadow-lg shadow-cyan-950/20",
                    pequena
                        ? "h-16 w-11 text-xl"
                        : "h-24 w-16 text-2xl",
                ].join(" ")}
            >
                <div className="text-cyan-400">
                    🂠
                </div>
            </div>
        );
    }

    return (
        <div
            className={[
                "flex flex-col items-center justify-center",
                "rounded-lg border border-slate-300",
                "bg-white font-bold shadow-lg",
                pequena
                    ? "h-16 w-11"
                    : "h-24 w-16",
            ].join(" ")}
        >
            <span
                className={
                    cartaRoja(carta.palo)
                        ? "text-red-600"
                        : "text-slate-900"
                }
            >
                {valorTexto(
                    carta.valor
                )}
            </span>

            <span
                className={[
                    cartaRoja(carta.palo)
                        ? "text-red-600"
                        : "text-slate-900",
                    pequena
                        ? "text-lg"
                        : "text-2xl",
                ].join(" ")}
            >
                {carta.palo}
            </span>
        </div>
    );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function Poker() {
    const navigate = useNavigate();

    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    // ========================================================
    // ESTADO PRINCIPAL
    // ========================================================

    const [apuesta, setApuesta] =
        useState(100);

    const [jugador, setJugador] =
        useState<Jugador>({
            cartas: [],
            fichas: 0,
            apuestaRonda: 0,
            apuestaTotal: 0,
            activo: true,
            allIn: false,
        });

    const [cpu, setCpu] =
        useState<Jugador>({
            cartas: [],
            fichas: 0,
            apuestaRonda: 0,
            apuestaTotal: 0,
            activo: true,
            allIn: false,
        });

    const [
        comunitarias,
        setComunitarias,
    ] = useState<Carta[]>([]);

    const [calle, setCalle] =
        useState<Calle>("preflop");

    const [pot, setPot] =
        useState(0);

    const [
        apuestaActual,
        setApuestaActual,
    ] = useState(BIG_BLIND);

    const [turno, setTurno] =
        useState<
            "jugador" | "cpu" | null
        >(null);

    const [
        manoIniciada,
        setManoIniciada,
    ] = useState(false);

    const [
        mostrandoCPU,
        setMostrandoCPU,
    ] = useState(false);

    const [
        resultado,
        setResultado,
    ] =
        useState<ResultadoMano | null>(
            null
        );

    const [mensaje, setMensaje] =
        useState("");

    const [
        procesando,
        setProcesando,
    ] = useState(false);

    const [numeroMano, setNumeroMano] =
        useState(0);

    const [victorias, setVictorias] =
        useState(0);

    const [derrotas, setDerrotas] =
        useState(0);

    const [empates, setEmpates] =
        useState(0);

    const [raiseAmount, setRaiseAmount] =
        useState(BIG_BLIND * 2);

    /*
     * Cantidad de acciones realizadas
     * desde la última subida.
     *
     * 0 = todavía nadie actuó
     * 1 = un jugador actuó
     * 2 = ronda cerrada si las apuestas
     *     están igualadas.
     */
    const [
        accionesCalle,
        setAccionesCalle,
    ] = useState(0);

    /*
     * En heads-up:
     *
     * dealer = small blind
     * big blind actúa después del SB
     * preflop.
     *
     * Después del flop comienza
     * actuando el big blind.
     */
    const [
        jugadorEsDealer,
        setJugadorEsDealer,
    ] = useState(true);

    const barajaRef =
        useRef<Carta[]>([]);

    const timerRef =
        useRef<ReturnType<
            typeof setTimeout
        > | null>(null);

    const rondaRef =
        useRef(0);

    // ========================================================
    // LIMPIAR TIMER
    // ========================================================

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(
                    timerRef.current
                );
            }
        };
    }, []);

    // ========================================================
    // CALL
    // ========================================================

    const cantidadCall = Math.max(
        0,
        apuestaActual -
            jugador.apuestaRonda
    );

    const puedeCall =
        cantidadCall <=
        jugador.fichas;

    const minimoRaise =
        Math.max(
            BIG_BLIND * 2,
            apuestaActual +
                MIN_RAISE
        );

    const maximoRaise =
        jugador.fichas +
        jugador.apuestaRonda;

    const puedeRaise =
        jugador.fichas >
            cantidadCall &&
        maximoRaise >=
            minimoRaise;

    // ========================================================
    // SACAR CARTA DE LA BARAJA
    // ========================================================

    const sacarCarta = useCallback(() => {
        const carta =
            barajaRef.current.pop();

        if (!carta) {
            throw new Error(
                "La baraja se quedó sin cartas."
            );
        }

        return carta;
    }, []);

    // ========================================================
    // AGREGAR CARTA QUEMADA
    // ========================================================

    const quemarCarta =
        useCallback(() => {
            if (
                barajaRef.current.length >
                0
            ) {
                barajaRef.current.pop();
            }
        }, []);

    // ========================================================
    // REVELAR COMUNITARIAS
    // ========================================================

    const revelarFlop = useCallback(() => {
        quemarCarta();

        const nuevas = [
            sacarCarta(),
            sacarCarta(),
            sacarCarta(),
        ];

        setComunitarias(nuevas);
        setCalle("flop");
    }, [
        quemarCarta,
        sacarCarta,
    ]);

    const revelarTurn = useCallback(() => {
        quemarCarta();

        const nueva = sacarCarta();

        setComunitarias(
            (actual) => [
                ...actual,
                nueva,
            ]
        );

        setCalle("turn");
    }, [
        quemarCarta,
        sacarCarta,
    ]);

    const revelarRiver = useCallback(() => {
        quemarCarta();

        const nueva = sacarCarta();

        setComunitarias(
            (actual) => [
                ...actual,
                nueva,
            ]
        );

        setCalle("river");
    }, [
        quemarCarta,
        sacarCarta,
    ]);

    // ========================================================
    // FINALIZAR MANO
    // ========================================================

    const finalizarMano = useCallback(
        (
            ganador:
                | "jugador"
                | "cpu"
                | "empate",
            potFinal: number,
            evalJugador: Evaluacion,
            evalCPU: Evaluacion
        ) => {
            const resultadoFinal: ResultadoMano =
                {
                    jugador:
                        evalJugador,
                    cpu: evalCPU,
                    ganador,
                };

            setResultado(
                resultadoFinal
            );

            setMostrandoCPU(true);
            setCalle("showdown");
            setTurno(null);
            setProcesando(false);

            if (
                ganador ===
                "jugador"
            ) {
                setVictorias(
                    (valor) =>
                        valor + 1
                );

                setMensaje(
                    `¡Ganaste! ${evalJugador.nombre}. Pozo: ${formatDinero(
                        potFinal
                    )}`
                );

                recordGame({
                    juegoId: "poker",
                    juegoNombre:
                        "Póker - Texas Hold'em",
                    resultado: "GANADA",
                    apuesta,
                    premio: potFinal,
                });
            } else if (
                ganador === "empate"
            ) {
                setEmpates(
                    (valor) =>
                        valor + 1
                );

                setMensaje(
                    `Empate. Pozo dividido: ${formatDinero(
                        Math.floor(
                            potFinal / 2
                        )
                    )} por jugador.`
                );

                recordGame({
                    juegoId: "poker",
                    juegoNombre:
                        "Póker - Texas Hold'em",
                    resultado: "GANADA",
                    apuesta,
                    premio: Math.floor(
                        potFinal / 2
                    ),
                });
            } else {
                setDerrotas(
                    (valor) =>
                        valor + 1
                );

                setMensaje(
                    `Perdiste. La CPU tiene ${evalCPU.nombre}.`
                );

                recordGame({
                    juegoId: "poker",
                    juegoNombre:
                        "Póker - Texas Hold'em",
                    resultado: "PERDIDA",
                    apuesta,
                    premio: 0,
                });
            }
        },
        [
            apuesta,
            recordGame,
        ]
    );

    // ========================================================
    // SHOWDOWN
    // ========================================================

    const ejecutarShowdown =
        useCallback(
            (
                cartasFinales: Carta[],
                potFinal: number
            ) => {
                const evalJugador =
                    evaluarMano([
                        ...jugador.cartas,
                        ...cartasFinales,
                    ]);

                const evalCPU =
                    evaluarMano([
                        ...cpu.cartas,
                        ...cartasFinales,
                    ]);

                const comparacion =
                    compararManos(
                        evalJugador,
                        evalCPU
                    );

                const ganador =
                    comparacion > 0
                        ? "jugador"
                        : comparacion < 0
                        ? "cpu"
                        : "empate";

                finalizarMano(
                    ganador,
                    potFinal,
                    evalJugador,
                    evalCPU
                );
            },
            [
                cpu.cartas,
                jugador.cartas,
                finalizarMano,
            ]
        );

    // ========================================================
    // RUNOUT ALL-IN
    // ========================================================

    const completarAllIn =
        useCallback(() => {
            if (
                timerRef.current
            ) {
                clearTimeout(
                    timerRef.current
                );
            }

            setProcesando(true);
            setTurno(null);

            let cartas =
                [...comunitarias];

            /*
             * Si todavía no hay flop,
             * se queman y salen 3.
             */
            if (cartas.length === 0) {
                quemarCarta();

                cartas = [
                    sacarCarta(),
                    sacarCarta(),
                    sacarCarta(),
                ];

                setComunitarias(
                    cartas
                );
            }

            /*
             * Si tenemos flop,
             * agregamos turn.
             */
            if (cartas.length === 3) {
                quemarCarta();

                cartas = [
                    ...cartas,
                    sacarCarta(),
                ];

                setComunitarias(
                    cartas
                );
            }

            /*
             * Si tenemos turn,
             * agregamos river.
             */
            if (cartas.length === 4) {
                quemarCarta();

                cartas = [
                    ...cartas,
                    sacarCarta(),
                ];

                setComunitarias(
                    cartas
                );
            }

            setCalle("showdown");

            const rondaActual =
                rondaRef.current;

            timerRef.current =
                setTimeout(() => {
                    if (
                        rondaRef.current !==
                        rondaActual
                    ) {
                        return;
                    }

                    ejecutarShowdown(
                        cartas,
                        pot
                    );
                }, 900);
        }, [
            comunitarias,
            ejecutarShowdown,
            quemarCarta,
            sacarCarta,
            pot,
        ]);

    // ========================================================
    // INICIAR MANO
    // ========================================================

    const iniciarMano =
        useCallback(() => {
            if (
                manoIniciada ||
                procesando
            ) {
                return;
            }

            if (saldo < apuesta) {
                setMensaje(
                    "No tenés saldo suficiente para entrar en la mano."
                );

                return;
            }

            spendBalance(
                apuesta,
                "Póker - Texas Hold'em"
            );

            /*
             * Cada mano tiene su propia
             * baraja de 52 cartas.
             */
            barajaRef.current =
                barajar(
                    crearBaraja()
                );

            const cartasJugador = [
                sacarCarta(),
                sacarCarta(),
            ];

            const cartasCPU = [
                sacarCarta(),
                sacarCarta(),
            ];

            const bankroll =
                apuesta * 20;

            const jugadorEsSB =
                jugadorEsDealer;

            const apuestaSB =
                jugadorEsSB
                    ? SMALL_BLIND
                    : BIG_BLIND;

            const apuestaBB =
                jugadorEsSB
                    ? BIG_BLIND
                    : SMALL_BLIND;

            const jugadorInicial: Jugador =
                {
                    cartas:
                        cartasJugador,
                    fichas:
                        bankroll -
                        apuestaSB,
                    apuestaRonda:
                        apuestaSB,
                    apuestaTotal:
                        apuestaSB,
                    activo: true,
                    allIn:
                        bankroll ===
                        apuestaSB,
                };

            const cpuInicial: Jugador =
                {
                    cartas: cartasCPU,
                    fichas:
                        bankroll -
                        apuestaBB,
                    apuestaRonda:
                        apuestaBB,
                    apuestaTotal:
                        apuestaBB,
                    activo: true,
                    allIn:
                        bankroll ===
                        apuestaBB,
                };

            setJugador(
                jugadorInicial
            );

            setCpu(cpuInicial);

            setComunitarias([]);

            setPot(
                SMALL_BLIND +
                    BIG_BLIND
            );

            setApuestaActual(
                BIG_BLIND
            );

            setRaiseAmount(
                BIG_BLIND * 2
            );

            setCalle("preflop");

            setManoIniciada(true);
            setMostrandoCPU(false);
            setResultado(null);

            setAccionesCalle(0);

            setNumeroMano(
                (valor) =>
                    valor + 1
            );

            setMensaje(
                jugadorEsDealer
                    ? "Sos Small Blind. Tenés que igualar, subir o retirarte."
                    : "Sos Big Blind. La CPU actúa primero."
            );

            /*
             * Heads-up real:
             *
             * Preflop:
             * Small Blind actúa primero.
             *
             * Postflop:
             * Big Blind actúa primero.
             */
            setTurno(
                jugadorEsDealer
                    ? "jugador"
                    : "cpu"
            );

            setJugadorEsDealer(
                (valor) => !valor
            );

            rondaRef.current += 1;
        }, [
            apuesta,
            jugadorEsDealer,
            manoIniciada,
            procesando,
            saldo,
            sacarCarta,
            spendBalance,
        ]);

    // ========================================================
    // AVANZAR CALLE
    // ========================================================

    const avanzarCalle =
        useCallback(() => {
            if (
                calle === "preflop"
            ) {
                revelarFlop();
            } else if (
                calle === "flop"
            ) {
                revelarTurn();
            } else if (
                calle === "turn"
            ) {
                revelarRiver();
            } else if (
                calle === "river"
            ) {
                ejecutarShowdown(
                    comunitarias,
                    pot
                );

                return;
            }

            setJugador(
                (actual) => ({
                    ...actual,
                    apuestaRonda: 0,
                })
            );

            setCpu(
                (actual) => ({
                    ...actual,
                    apuestaRonda: 0,
                })
            );

            setApuestaActual(0);

            setRaiseAmount(
                MIN_RAISE
            );

            setAccionesCalle(0);

            /*
             * Postflop comienza actuando
             * el Big Blind.
             */
            setTurno(
                jugadorEsDealer
                    ? "cpu"
                    : "jugador"
            );
        }, [
            calle,
            comunitarias,
            ejecutarShowdown,
            jugadorEsDealer,
            pot,
            revelarFlop,
            revelarRiver,
            revelarTurn,
        ]);

    // ========================================================
    // COMPROBAR CIERRE DE CALLE
    // ========================================================

    const comprobarCierre =
        useCallback(
            (
                nuevasAcciones: number,
                apuestaJugador: number,
                apuestaCPU: number,
                jugadorAllIn: boolean,
                cpuAllIn: boolean
            ) => {
                if (
                    jugadorAllIn ||
                    cpuAllIn
                ) {
                    completarAllIn();
                    return;
                }

                if (
                    nuevasAcciones >=
                        2 &&
                    apuestaJugador ===
                        apuestaCPU
                ) {
                    timerRef.current =
                        setTimeout(
                            () => {
                                avanzarCalle();
                            },
                            450
                        );
                }
            },
            [
                avanzarCalle,
                completarAllIn,
            ]
        );

    // ========================================================
    // CHECK
    // ========================================================

    const check =
        useCallback(() => {
            if (
                turno !==
                    "jugador" ||
                procesando ||
                !manoIniciada
            ) {
                return;
            }

            if (
                jugador.apuestaRonda !==
                apuestaActual
            ) {
                setMensaje(
                    `No podés pasar. Tenés que igualar ${formatDinero(
                        cantidadCall
                    )}.`
                );

                return;
            }

            const nuevasAcciones =
                accionesCalle + 1;

            setAccionesCalle(
                nuevasAcciones
            );

            setMensaje(
                "Pasás."
            );

            comprobarCierre(
                nuevasAcciones,
                jugador.apuestaRonda,
                cpu.apuestaRonda,
                jugador.allIn,
                cpu.allIn
            );

            if (
                nuevasAcciones < 2
            ) {
                setTurno("cpu");
            }
        }, [
            accionesCalle,
            apuestaActual,
            cantidadCall,
            comprobarCierre,
            cpu.apuestaRonda,
            cpu.allIn,
            jugador.apuestaRonda,
            jugador.allIn,
            manoIniciada,
            procesando,
            turno,
        ]);

    // ========================================================
    // CALL
    // ========================================================

    const call =
        useCallback(() => {
            if (
                turno !==
                    "jugador" ||
                procesando ||
                !manoIniciada
            ) {
                return;
            }

            if (
                cantidadCall <= 0
            ) {
                check();
                return;
            }

            const cantidad =
                Math.min(
                    cantidadCall,
                    jugador.fichas
                );

            const fichasRestantes =
                jugador.fichas -
                cantidad;

            const nuevaApuesta =
                jugador.apuestaRonda +
                cantidad;

            const nuevoJugador: Jugador =
                {
                    ...jugador,
                    fichas:
                        fichasRestantes,
                    apuestaRonda:
                        nuevaApuesta,
                    apuestaTotal:
                        jugador.apuestaTotal +
                        cantidad,
                    allIn:
                        fichasRestantes ===
                        0,
                };

            setJugador(
                nuevoJugador
            );

            setPot(
                (valor) =>
                    valor + cantidad
            );

            const nuevasAcciones =
                accionesCalle + 1;

            setAccionesCalle(
                nuevasAcciones
            );

            setMensaje(
                `Igualás ${formatDinero(
                    cantidad
                )}.`
            );

            if (
                nuevoJugador.allIn
            ) {
                completarAllIn();
                return;
            }

            comprobarCierre(
                nuevasAcciones,
                nuevaApuesta,
                cpu.apuestaRonda,
                false,
                cpu.allIn
            );

            if (
                nuevasAcciones < 2
            ) {
                setTurno("cpu");
            }
        }, [
            accionesCalle,
            cantidadCall,
            check,
            comprobarCierre,
            completarAllIn,
            cpu.apuestaRonda,
            cpu.allIn,
            jugador,
            manoIniciada,
            procesando,
            turno,
        ]);

    // ========================================================
    // RAISE
    // ========================================================

    const raise =
        useCallback(() => {
            if (
                turno !==
                    "jugador" ||
                procesando ||
                !manoIniciada
            ) {
                return;
            }

            const objetivo =
                Math.max(
                    raiseAmount,
                    minimoRaise
                );

            const adicional =
                objetivo -
                jugador.apuestaRonda;

            if (
                objetivo >
                    maximoRaise ||
                adicional <= 0
            ) {
                setMensaje(
                    "La subida no es válida."
                );

                return;
            }

            const fichasRestantes =
                jugador.fichas -
                adicional;

            const nuevoJugador: Jugador =
                {
                    ...jugador,
                    fichas:
                        fichasRestantes,
                    apuestaRonda:
                        objetivo,
                    apuestaTotal:
                        jugador.apuestaTotal +
                        adicional,
                    allIn:
                        fichasRestantes ===
                        0,
                };

            setJugador(
                nuevoJugador
            );

            setPot(
                (valor) =>
                    valor + adicional
            );

            setApuestaActual(
                objetivo
            );

            /*
             * Una subida reinicia la
             * cuenta de acciones.
             */
            setAccionesCalle(1);

            setMensaje(
                nuevoJugador.allIn
                    ? `¡ALL-IN a ${formatDinero(
                          objetivo
                      )}!`
                    : `Subís a ${formatDinero(
                          objetivo
                      )}.`
            );

            if (
                nuevoJugador.allIn
            ) {
                setTurno("cpu");
                return;
            }

            setTurno("cpu");
        }, [
            jugador,
            manoIniciada,
            maximoRaise,
            minimoRaise,
            procesando,
            raiseAmount,
            turno,
        ]);

    // ========================================================
    // FOLD
    // ========================================================

    const fold =
        useCallback(() => {
            if (
                turno !==
                    "jugador" ||
                procesando ||
                !manoIniciada
            ) {
                return;
            }

            setJugador(
                (actual) => ({
                    ...actual,
                    activo: false,
                })
            );

            const evalJugador =
                comunitarias.length >= 3
                    ? evaluarMano([
                          ...jugador.cartas,
                          ...comunitarias,
                      ])
                    : {
                          categoria: 0,
                          nombre:
                              "Sin mostrar",
                          valores: [],
                      };

            const evalCPU =
                comunitarias.length >= 3
                    ? evaluarMano([
                          ...cpu.cartas,
                          ...comunitarias,
                      ])
                    : {
                          categoria: 0,
                          nombre:
                              "Mano oculta",
                          valores: [],
                      };

            setResultado({
                jugador:
                    evalJugador,
                cpu: evalCPU,
                ganador: "cpu",
            });

            setMostrandoCPU(true);
            setTurno(null);
            setCalle("showdown");
            setProcesando(false);

            setDerrotas(
                (valor) =>
                    valor + 1
            );

            setMensaje(
                "Te retiraste. La CPU gana el pozo."
            );

            recordGame({
                juegoId: "poker",
                juegoNombre:
                    "Póker - Texas Hold'em",
                resultado: "PERDIDA",
                apuesta,
                premio: 0,
            });
        }, [
            apuesta,
            comunitarias,
            cpu.cartas,
            jugador.cartas,
            manoIniciada,
            procesando,
            recordGame,
            turno,
        ]);

    // ========================================================
    // ALL-IN
    // ========================================================

    const allIn =
        useCallback(() => {
            if (
                turno !==
                    "jugador" ||
                procesando ||
                !manoIniciada ||
                jugador.fichas <= 0
            ) {
                return;
            }

            const cantidad =
                jugador.fichas;

            const nuevaApuesta =
                jugador.apuestaRonda +
                cantidad;

            const nuevoJugador: Jugador =
                {
                    ...jugador,
                    fichas: 0,
                    apuestaRonda:
                        nuevaApuesta,
                    apuestaTotal:
                        jugador.apuestaTotal +
                        cantidad,
                    allIn: true,
                };

            setJugador(
                nuevoJugador
            );

            setPot(
                (valor) =>
                    valor + cantidad
            );

            setApuestaActual(
                Math.max(
                    apuestaActual,
                    nuevaApuesta
                )
            );

            setAccionesCalle(1);

            setMensaje(
                `¡ALL-IN! ${formatDinero(
                    nuevaApuesta
                )}`
            );

            setTurno("cpu");
        }, [
            apuestaActual,
            jugador,
            manoIniciada,
            procesando,
            turno,
        ]);

    // ========================================================
    // FUERZA PREFLOP DE LA CPU
    // ========================================================

    const fuerzaPreflop = (
        cartas: Carta[]
    ) => {
        if (cartas.length !== 2) {
            return 0;
        }

        const a = cartas[0].valor;
        const b = cartas[1].valor;

        const pareja = a === b;

        const as = a === 14 || b === 14;

        const altas =
            a >= 11 && b >= 11;

        const diferencia =
            Math.abs(a - b);

        const mismoPalo =
            cartas[0].palo ===
            cartas[1].palo;

        if (
            pareja &&
            a >= 12
        ) {
            return 5;
        }

        if (
            pareja &&
            a >= 10
        ) {
            return 4;
        }

        if (
            as &&
            altas
        ) {
            return 4;
        }

        if (
            as &&
            mismoPalo
        ) {
            return 3;
        }

        if (
            pareja
        ) {
            return 3;
        }

        if (
            altas &&
            mismoPalo
        ) {
            return 3;
        }

        if (
            diferencia <= 2 &&
            a >= 9 &&
            b >= 9
        ) {
            return 2;
        }

        if (
            mismoPalo &&
            diferencia <= 3
        ) {
            return 2;
        }

        return 1;
    };

    // ========================================================
    // IA CPU
    // ========================================================

    const ejecutarCPU =
        useCallback(() => {
            if (
                turno !== "cpu" ||
                procesando ||
                !manoIniciada
            ) {
                return;
            }

            setProcesando(true);

            timerRef.current =
                setTimeout(() => {
                    const ronda =
                        rondaRef.current;

                    const diferencia =
                        Math.max(
                            0,
                            apuestaActual -
                                cpu.apuestaRonda
                        );

                    let fuerza = 0;

                    if (
                        comunitarias.length >=
                        3
                    ) {
                        const evaluacion =
                            evaluarMano([
                                ...cpu.cartas,
                                ...comunitarias,
                            ]);

                        fuerza =
                            evaluacion.categoria;
                    } else {
                        fuerza =
                            fuerzaPreflop(
                                cpu.cartas
                            );
                    }

                    /*
                     * Un poco de variación
                     * para que la CPU no sea
                     * totalmente predecible.
                     */
                    const azar =
                        Math.random();

                    // ========================================
                    // FOLD
                    // ========================================

                    if (
                        diferencia > 0 &&
                        fuerza <= 1 &&
                        azar < 0.22
                    ) {
                        setCpu(
                            (actual) => ({
                                ...actual,
                                activo: false,
                            })
                        );

                        const evalJugador =
                            comunitarias.length >=
                            3
                                ? evaluarMano([
                                      ...jugador.cartas,
                                      ...comunitarias,
                                  ])
                                : {
                                      categoria: 0,
                                      nombre:
                                          "Carta alta",
                                      valores: [],
                                  };

                        const evalCPU =
                            comunitarias.length >=
                            3
                                ? evaluarMano([
                                      ...cpu.cartas,
                                      ...comunitarias,
                                  ])
                                : {
                                      categoria: 0,
                                      nombre:
                                          "Mano oculta",
                                      valores: [],
                                  };

                        setResultado({
                            jugador:
                                evalJugador,
                            cpu: evalCPU,
                            ganador:
                                "jugador",
                        });

                        setMostrandoCPU(
                            true
                        );

                        setCalle(
                            "showdown"
                        );

                        setTurno(null);

                        setVictorias(
                            (valor) =>
                                valor + 1
                        );

                        setMensaje(
                            `La CPU se retiró. Ganás el pozo de ${formatDinero(
                                pot
                            )}.`
                        );

                        recordGame({
                            juegoId:
                                "poker",
                            juegoNombre:
                                "Póker - Texas Hold'em",
                            resultado:
                                "GANADA",
                            apuesta,
                            premio: pot,
                        });

                        setProcesando(
                            false
                        );

                        return;
                    }

                    // ========================================
                    // ALL-IN CPU
                    // ========================================

                    if (
                        fuerza >= 4 &&
                        cpu.fichas > 0 &&
                        azar < 0.30
                    ) {
                        const cantidad =
                            cpu.fichas;

                        const nuevaApuesta =
                            cpu.apuestaRonda +
                            cantidad;

                        setCpu(
                            (actual) => ({
                                ...actual,
                                fichas: 0,
                                apuestaRonda:
                                    nuevaApuesta,
                                apuestaTotal:
                                    actual.apuestaTotal +
                                    cantidad,
                                allIn: true,
                            })
                        );

                        setPot(
                            (valor) =>
                                valor +
                                cantidad
                        );

                        setApuestaActual(
                            Math.max(
                                apuestaActual,
                                nuevaApuesta
                            )
                        );

                        setAccionesCalle(
                            1
                        );

                        setMensaje(
                            "La CPU responde con ALL-IN."
                        );

                        setProcesando(
                            false
                        );

                        setTurno(
                            "jugador"
                        );

                        return;
                    }

                    // ========================================
                    // RAISE CPU
                    // ========================================

                    if (
                        fuerza >= 2 &&
                        cpu.fichas >
                            diferencia +
                                MIN_RAISE &&
                        azar <
                            (fuerza >= 4
                                ? 0.55
                                : 0.32)
                    ) {
                        const incremento =
                            Math.max(
                                MIN_RAISE,
                                BIG_BLIND *
                                    (fuerza >=
                                    4
                                        ? 4
                                        : 2)
                            );

                        const objetivo =
                            Math.min(
                                cpu.apuestaRonda +
                                    Math.max(
                                        incremento,
                                        diferencia
                                    ) +
                                    incremento,
                                cpu.apuestaRonda +
                                    cpu.fichas
                            );

                        const adicional =
                            objetivo -
                            cpu.apuestaRonda;

                        if (
                            adicional >
                                0 &&
                            adicional <=
                                cpu.fichas
                        ) {
                            const fichasRestantes =
                                cpu.fichas -
                                adicional;

                            setCpu(
                                (
                                    actual
                                ) => ({
                                    ...actual,
                                    fichas:
                                        fichasRestantes,
                                    apuestaRonda:
                                        objetivo,
                                    apuestaTotal:
                                        actual.apuestaTotal +
                                        adicional,
                                    allIn:
                                        fichasRestantes ===
                                        0,
                                })
                            );

                            setPot(
                                (valor) =>
                                    valor +
                                    adicional
                            );

                            setApuestaActual(
                                objetivo
                            );

                            setAccionesCalle(
                                1
                            );

                            setMensaje(
                                `La CPU sube a ${formatDinero(
                                    objetivo
                                )}.`
                            );

                            setProcesando(
                                false
                            );

                            setTurno(
                                "jugador"
                            );

                            return;
                        }
                    }

                    // ========================================
                    // CALL / CHECK
                    // ========================================

                    const cantidad =
                        Math.min(
                            diferencia,
                            cpu.fichas
                        );

                    const fichasRestantes =
                        cpu.fichas -
                        cantidad;

                    const nuevaApuesta =
                        cpu.apuestaRonda +
                        cantidad;

                    const cpuAllIn =
                        fichasRestantes ===
                        0;

                    setCpu(
                        (actual) => ({
                            ...actual,
                            fichas:
                                fichasRestantes,
                            apuestaRonda:
                                nuevaApuesta,
                            apuestaTotal:
                                actual.apuestaTotal +
                                cantidad,
                            allIn:
                                cpuAllIn,
                        })
                    );

                    setPot(
                        (valor) =>
                            valor + cantidad
                    );

                    const nuevasAcciones =
                        accionesCalle + 1;

                    setAccionesCalle(
                        nuevasAcciones
                    );

                    setMensaje(
                        cantidad > 0
                            ? `La CPU iguala ${formatDinero(
                                  cantidad
                              )}.`
                            : "La CPU pasa."
                    );

                    setProcesando(
                        false
                    );

                    if (
                        cpuAllIn
                    ) {
                        completarAllIn();
                        return;
                    }

                    /*
                     * Si la acción CPU
                     * cerró la calle,
                     * avanzamos.
                     */
                    if (
                        nuevasAcciones >=
                            2 &&
                        nuevaApuesta ===
                            jugador.apuestaRonda
                    ) {
                        timerRef.current =
                            setTimeout(
                                () => {
                                    if (
                                        rondaRef.current !==
                                        ronda
                                    ) {
                                        return;
                                    }

                                    avanzarCalle();
                                },
                                450
                            );

                        return;
                    }

                    setTurno(
                        "jugador"
                    );
                }, 850);
        }, [
            accionesCalle,
            apuesta,
            apuestaActual,
            avanzarCalle,
            comunitarias,
            completarAllIn,
            cpu.apuestaRonda,
            cpu.cartas,
            cpu.fichas,
            jugador.apuestaRonda,
            jugador.cartas,
            manoIniciada,
            pot,
            procesando,
            recordGame,
            turno,
        ]);

    // ========================================================
    // TURNO AUTOMÁTICO CPU
    // ========================================================

    useEffect(() => {
        if (
            turno === "cpu" &&
            manoIniciada &&
            !procesando &&
            calle !== "showdown"
        ) {
            ejecutarCPU();
        }
    }, [
        calle,
        ejecutarCPU,
        manoIniciada,
        procesando,
        turno,
    ]);

    // ========================================================
    // CERRAR MANO
    // ========================================================

    const cerrarMano =
        useCallback(() => {
            rondaRef.current += 1;

            if (
                timerRef.current
            ) {
                clearTimeout(
                    timerRef.current
                );
            }

            setManoIniciada(false);
            setMostrandoCPU(false);
            setResultado(null);
            setComunitarias([]);
            setTurno(null);
            setPot(0);
            setApuestaActual(
                BIG_BLIND
            );
            setRaiseAmount(
                BIG_BLIND * 2
            );
            setAccionesCalle(0);

            setJugador({
                cartas: [],
                fichas: 0,
                apuestaRonda: 0,
                apuestaTotal: 0,
                activo: true,
                allIn: false,
            });

            setCpu({
                cartas: [],
                fichas: 0,
                apuestaRonda: 0,
                apuestaTotal: 0,
                activo: true,
                allIn: false,
            });

            setCalle("preflop");
            setMensaje("");
            setProcesando(false);

            barajaRef.current = [];
        }, []);

    // ========================================================
    // ESTADÍSTICAS
    // ========================================================

    const manosTerminadas =
        victorias +
        derrotas +
        empates;

    const porcentaje =
        manosTerminadas > 0
            ? Math.round(
                  (victorias /
                      manosTerminadas) *
                      100
              )
            : 0;

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <div
            className="min-h-screen bg-slate-950 px-3 py-3 text-white"
            style={{ zoom: 0.8 }}
        >
            <div className="mx-auto w-full max-w-[1500px]">

                {/* ================================================= */}
                {/* CABECERA */}
                {/* ================================================= */}

                <div className="mb-3 flex items-center justify-between">

                    <button
                        onClick={() =>
                            navigate(
                                "/juegos"
                            )
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-bold transition hover:border-cyan-500 hover:bg-slate-800"
                    >
                        <ArrowLeft
                            size={17}
                        />
                        Volver
                    </button>

                    <div className="flex items-center gap-2">

                        <div className="rounded-lg bg-red-600 p-2">
                            <Crown
                                size={20}
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-black">
                                PÓKER
                            </h1>

                            <p className="text-[10px] text-slate-400">
                                Texas Hold'em
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-slate-900 px-3 py-2">

                        <Coins
                            size={17}
                            className="text-yellow-400"
                        />

                        <span className="text-sm font-bold">
                            {formatDinero(
                                saldo
                            )}
                        </span>

                    </div>

                </div>

                {/* ================================================= */}
                {/* LAYOUT */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_280px]">

                    {/* ================================================= */}
                    {/* MESA */}
                    {/* ================================================= */}

                    <section className="relative overflow-hidden rounded-2xl border border-emerald-700/50 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950 p-4 shadow-2xl">

                        <div className="pointer-events-none absolute inset-0 opacity-20">

                            <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-emerald-300" />

                            <div className="absolute left-1/2 top-1/2 h-[400px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-emerald-300" />

                        </div>

                        {/* ================================================= */}
                        {/* INFO */}
                        {/* ================================================= */}

                        <div className="relative z-10 mb-3 flex flex-wrap items-center justify-between gap-2">

                            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2">

                                <CircleDollarSign
                                    size={17}
                                    className="text-yellow-400"
                                />

                                <div>

                                    <div className="text-[9px] uppercase text-slate-400">
                                        Pozo
                                    </div>

                                    <div className="text-lg font-black text-yellow-300">
                                        {formatDinero(
                                            pot
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-3 text-xs">

                                <span className="rounded-full bg-black/20 px-3 py-1">
                                    Mano #
                                    {
                                        numeroMano
                                    }
                                </span>

                                <span className="rounded-full bg-black/20 px-3 py-1 uppercase">
                                    {
                                        calle
                                    }
                                </span>

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* CPU */}
                        {/* ================================================= */}

                        <div className="relative z-10 mb-4 rounded-xl border border-white/10 bg-black/15 p-3">

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <div className="rounded-full bg-slate-800 p-2">
                                        <Bot
                                            size={18}
                                            className="text-cyan-400"
                                        />
                                    </div>

                                    <div>

                                        <div className="text-sm font-black">
                                            CPU
                                        </div>

                                        <div className="text-[10px] text-slate-400">
                                            Fichas:{" "}
                                            {formatDinero(
                                                cpu.fichas
                                            )}
                                        </div>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <div className="text-[9px] uppercase text-slate-400">
                                        Apostado
                                    </div>

                                    <div className="font-bold">
                                        {formatDinero(
                                            cpu.apuestaRonda
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className="flex justify-center gap-2">

                                {cpu.cartas.map(
                                    (
                                        carta,
                                        index
                                    ) => (
                                        <CartaVisual
                                            key={`${carta.palo}-${carta.valor}-${index}`}
                                            carta={
                                                carta
                                            }
                                            oculta={
                                                !mostrandoCPU
                                            }
                                        />
                                    )
                                )}

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* COMUNITARIAS */}
                        {/* ================================================= */}

                        <div className="relative z-10 mb-5">

                            <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                                Cartas comunitarias
                            </div>

                            <div className="flex min-h-[100px] justify-center gap-2">

                                {comunitarias.map(
                                    (
                                        carta,
                                        index
                                    ) => (
                                        <CartaVisual
                                            key={`${carta.palo}-${carta.valor}-${index}`}
                                            carta={
                                                carta
                                            }
                                        />
                                    )
                                )}

                                {Array.from({
                                    length:
                                        5 -
                                        comunitarias.length,
                                }).map(
                                    (
                                        _,
                                        index
                                    ) => (
                                        <div
                                            key={`empty-${index}`}
                                            className="flex h-24 w-16 items-center justify-center rounded-lg border border-dashed border-emerald-400/20 bg-black/10"
                                        />
                                    )
                                )}

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* JUGADOR */}
                        {/* ================================================= */}

                        <div className="relative z-10 rounded-xl border border-cyan-400/20 bg-black/20 p-3">

                            <div className="mb-2 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <div className="rounded-full bg-cyan-950 p-2">
                                        <User
                                            size={18}
                                            className="text-cyan-400"
                                        />
                                    </div>

                                    <div>

                                        <div className="text-sm font-black">
                                            VOS
                                        </div>

                                        <div className="text-[10px] text-slate-400">
                                            Fichas:{" "}
                                            {formatDinero(
                                                jugador.fichas
                                            )}
                                        </div>

                                    </div>

                                </div>

                                <div className="text-right">

                                    <div className="text-[9px] uppercase text-slate-400">
                                        Tu apuesta
                                    </div>

                                    <div className="font-bold text-cyan-300">
                                        {formatDinero(
                                            jugador.apuestaRonda
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className="flex justify-center gap-2">

                                {jugador.cartas.map(
                                    (
                                        carta,
                                        index
                                    ) => (
                                        <CartaVisual
                                            key={`${carta.palo}-${carta.valor}-${index}`}
                                            carta={
                                                carta
                                            }
                                        />
                                    )
                                )}

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* MENSAJE */}
                        {/* ================================================= */}

                        {mensaje && (
                            <div className="relative z-10 mt-3 rounded-lg border border-yellow-400/20 bg-black/30 px-3 py-2 text-center text-sm font-bold text-yellow-200">
                                {
                                    mensaje
                                }
                            </div>
                        )}

                        {/* ================================================= */}
                        {/* INICIO */}
                        {/* ================================================= */}

                        {!manoIniciada && (
                            <div className="relative z-10 mt-4 rounded-xl border border-white/10 bg-black/20 p-4">

                                <div className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Elegí tu entrada
                                </div>

                                <div className="mb-4 flex flex-wrap justify-center gap-2">

                                    {APUESTAS.map(
                                        (
                                            valor
                                        ) => (
                                            <button
                                                key={
                                                    valor
                                                }
                                                onClick={() =>
                                                    setApuesta(
                                                        valor
                                                    )
                                                }
                                                className={[
                                                    "rounded-lg border px-4 py-2 text-sm font-black transition",
                                                    apuesta ===
                                                    valor
                                                        ? "border-yellow-400 bg-yellow-500 text-black"
                                                        : "border-slate-600 bg-slate-900 hover:border-yellow-400",
                                                ].join(
                                                    " "
                                                )}
                                            >
                                                {formatDinero(
                                                    valor
                                                )}
                                            </button>
                                        )
                                    )}

                                </div>

                                <button
                                    onClick={
                                        iniciarMano
                                    }
                                    disabled={
                                        saldo <
                                        apuesta
                                    }
                                    className="mx-auto flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-3 text-sm font-black shadow-lg shadow-red-950/30 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Sparkles
                                        size={
                                            18
                                        }
                                    />
                                    REPARTIR
                                    CARTAS
                                </button>

                            </div>
                        )}

                        {/* ================================================= */}
                        {/* CONTROLES */}
                        {/* ================================================= */}

                        {manoIniciada &&
                            calle !==
                                "showdown" && (
                                <div className="relative z-10 mt-4">

                                    <div className="mb-3 rounded-xl border border-white/10 bg-black/20 p-3">

                                        <div className="mb-2 flex items-center justify-between">

                                            <span className="text-[10px] font-bold uppercase text-slate-400">
                                                Subir apuesta
                                            </span>

                                            <span className="text-xs font-bold text-yellow-300">
                                                {formatDinero(
                                                    raiseAmount
                                                )}
                                            </span>

                                        </div>

                                        <input
                                            type="range"
                                            min={
                                                minimoRaise
                                            }
                                            max={Math.max(
                                                minimoRaise,
                                                maximoRaise
                                            )}
                                            step={
                                                BIG_BLIND
                                            }
                                            value={Math.min(
                                                Math.max(
                                                    raiseAmount,
                                                    minimoRaise
                                                ),
                                                maximoRaise
                                            )}
                                            onChange={(
                                                e
                                            ) =>
                                                setRaiseAmount(
                                                    Number(
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                )
                                            }
                                            disabled={
                                                !puedeRaise ||
                                                turno !==
                                                    "jugador"
                                            }
                                            className="w-full accent-yellow-400"
                                        />

                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">

                                        <button
                                            onClick={
                                                check
                                            }
                                            disabled={
                                                turno !==
                                                    "jugador" ||
                                                jugador.apuestaRonda !==
                                                    apuestaActual ||
                                                procesando
                                            }
                                            className="rounded-lg border border-emerald-500/40 bg-emerald-900/60 px-3 py-3 text-xs font-black transition hover:bg-emerald-800 disabled:opacity-30"
                                        >
                                            CHECK
                                        </button>

                                        <button
                                            onClick={
                                                call
                                            }
                                            disabled={
                                                turno !==
                                                    "jugador" ||
                                                !puedeCall ||
                                                procesando
                                            }
                                            className="rounded-lg border border-blue-500/40 bg-blue-900/60 px-3 py-3 text-xs font-black transition hover:bg-blue-800 disabled:opacity-30"
                                        >
                                            IGUALAR
                                            <span className="block text-[9px] font-normal">
                                                {formatDinero(
                                                    cantidadCall
                                                )}
                                            </span>
                                        </button>

                                        <button
                                            onClick={
                                                raise
                                            }
                                            disabled={
                                                turno !==
                                                    "jugador" ||
                                                !puedeRaise ||
                                                procesando
                                            }
                                            className="rounded-lg border border-yellow-500/40 bg-yellow-900/60 px-3 py-3 text-xs font-black transition hover:bg-yellow-800 disabled:opacity-30"
                                        >
                                            SUBIR
                                        </button>

                                        <button
                                            onClick={
                                                allIn
                                            }
                                            disabled={
                                                turno !==
                                                    "jugador" ||
                                                jugador.fichas <=
                                                    0 ||
                                                procesando
                                            }
                                            className="rounded-lg border border-purple-500/40 bg-purple-900/60 px-3 py-3 text-xs font-black transition hover:bg-purple-800 disabled:opacity-30"
                                        >
                                            ALL-IN
                                        </button>

                                        <button
                                            onClick={
                                                fold
                                            }
                                            disabled={
                                                turno !==
                                                    "jugador" ||
                                                procesando
                                            }
                                            className="rounded-lg border border-red-500/40 bg-red-900/60 px-3 py-3 text-xs font-black transition hover:bg-red-800 disabled:opacity-30"
                                        >
                                            RETIRARSE
                                        </button>

                                    </div>

                                </div>
                            )}

                        {/* ================================================= */}
                        {/* SHOWDOWN */}
                        {/* ================================================= */}

                        {calle ===
                            "showdown" &&
                            resultado && (
                                <div className="relative z-10 mt-4 rounded-xl border border-yellow-400/30 bg-black/40 p-4">

                                    <div className="mb-3 flex items-center justify-center gap-2 text-lg font-black">

                                        <Trophy
                                            size={
                                                20
                                            }
                                            className="text-yellow-400"
                                        />

                                        {resultado.ganador ===
                                        "jugador"
                                            ? "¡GANASTE!"
                                            : resultado.ganador ===
                                              "cpu"
                                            ? "GANÓ LA CPU"
                                            : "EMPATE"}

                                    </div>

                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                                        <div className="rounded-lg bg-cyan-950/60 p-3">

                                            <div className="text-[9px] uppercase text-cyan-300">
                                                Tu mano
                                            </div>

                                            <div className="font-black">
                                                {
                                                    resultado
                                                        .jugador
                                                        .nombre
                                                }
                                            </div>

                                        </div>

                                        <div className="rounded-lg bg-slate-800/70 p-3">

                                            <div className="text-[9px] uppercase text-slate-400">
                                                CPU
                                            </div>

                                            <div className="font-black">
                                                {
                                                    resultado
                                                        .cpu
                                                        .nombre
                                                }
                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        onClick={
                                            cerrarMano
                                        }
                                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-sm font-black transition hover:bg-red-500"
                                    >
                                        <RotateCcw
                                            size={
                                                17
                                            }
                                        />
                                        NUEVA MANO
                                    </button>

                                </div>
                            )}

                    </section>

                    {/* ================================================= */}
                    {/* PANEL DERECHO */}
                    {/* ================================================= */}

                    <aside className="h-fit rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-xl xl:sticky xl:top-3">

                        <div className="mb-3 flex items-center gap-2 border-b border-slate-700 pb-3">

                            <Shield
                                size={
                                    19
                                }
                                className="text-yellow-400"
                            />

                            <div>

                                <h2 className="text-sm font-black">
                                    VALORES DE MANO
                                </h2>

                                <p className="text-[9px] text-slate-500">
                                    Ranking de Texas Hold'em
                                </p>

                            </div>

                        </div>

                        <div className="space-y-1.5">

                            {[
                                {
                                    nombre:
                                        "Escalera real",
                                    descripcion:
                                        "A-K-Q-J-10 del mismo palo",
                                    icono:
                                        "👑",
                                },
                                {
                                    nombre:
                                        "Escalera de color",
                                    descripcion:
                                        "5 cartas consecutivas del mismo palo",
                                    icono:
                                        "🔥",
                                },
                                {
                                    nombre:
                                        "Póker",
                                    descripcion:
                                        "4 cartas del mismo valor",
                                    icono:
                                        "💎",
                                },
                                {
                                    nombre:
                                        "Full",
                                    descripcion:
                                        "Trío + pareja",
                                    icono:
                                        "🏆",
                                },
                                {
                                    nombre:
                                        "Color",
                                    descripcion:
                                        "5 cartas del mismo palo",
                                    icono:
                                        "🌈",
                                },
                                {
                                    nombre:
                                        "Escalera",
                                    descripcion:
                                        "5 valores consecutivos",
                                    icono:
                                        "🪜",
                                },
                                {
                                    nombre:
                                        "Trío",
                                    descripcion:
                                        "3 cartas del mismo valor",
                                    icono:
                                        "🔺",
                                },
                                {
                                    nombre:
                                        "Doble pareja",
                                    descripcion:
                                        "2 parejas diferentes",
                                    icono:
                                        "👥",
                                },
                                {
                                    nombre:
                                        "Pareja",
                                    descripcion:
                                        "2 cartas del mismo valor",
                                    icono:
                                        "👤",
                                },
                                {
                                    nombre:
                                        "Carta alta",
                                    descripcion:
                                        "Ninguna combinación",
                                    icono:
                                        "🃏",
                                },
                            ].map(
                                (
                                    mano
                                ) => (
                                    <div
                                        key={
                                            mano.nombre
                                        }
                                        className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 p-2"
                                    >

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-800 text-base">
                                            {
                                                mano.icono
                                            }
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="text-[11px] font-black">
                                                {
                                                    mano.nombre
                                                }
                                            </div>

                                            <div className="truncate text-[8px] text-slate-500">
                                                {
                                                    mano.descripcion
                                                }
                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                        {/* ================================================= */}
                        {/* ESTADÍSTICAS */}
                        {/* ================================================= */}

                        <div className="mt-4 border-t border-slate-700 pt-3">

                            <div className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                                Estadísticas
                            </div>

                            <div className="grid grid-cols-2 gap-2">

                                <div className="rounded-lg bg-emerald-950/50 p-2 text-center">
                                    <div className="text-lg font-black text-emerald-400">
                                        {
                                            victorias
                                        }
                                    </div>

                                    <div className="text-[8px] uppercase text-slate-500">
                                        Victorias
                                    </div>
                                </div>

                                <div className="rounded-lg bg-red-950/50 p-2 text-center">
                                    <div className="text-lg font-black text-red-400">
                                        {
                                            derrotas
                                        }
                                    </div>

                                    <div className="text-[8px] uppercase text-slate-500">
                                        Derrotas
                                    </div>
                                </div>

                                <div className="rounded-lg bg-yellow-950/50 p-2 text-center">
                                    <div className="text-lg font-black text-yellow-400">
                                        {
                                            empates
                                        }
                                    </div>

                                    <div className="text-[8px] uppercase text-slate-500">
                                        Empates
                                    </div>
                                </div>

                                <div className="rounded-lg bg-cyan-950/50 p-2 text-center">
                                    <div className="text-lg font-black text-cyan-400">
                                        {
                                            porcentaje
                                        }
                                        %
                                    </div>

                                    <div className="text-[8px] uppercase text-slate-500">
                                        Victorias
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* REGLAS */}
                        {/* ================================================= */}

                        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3">

                            <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">

                                <Eye
                                    size={
                                        13
                                    }
                                />

                                Cómo jugar

                            </div>

                            <div className="space-y-1 text-[9px] leading-relaxed text-slate-500">

                                <p>
                                    • 2 cartas privadas para cada jugador.
                                </p>

                                <p>
                                    • Flop: 3 cartas comunitarias.
                                </p>

                                <p>
                                    • Turn: 1 carta adicional.
                                </p>

                                <p>
                                    • River: 1 carta adicional.
                                </p>

                                <p>
                                    • Se utiliza la mejor combinación de 5 cartas.
                                </p>

                                <p>
                                    • Podés pasar, igualar, subir, ir all-in o retirarte.
                                </p>

                                <p>
                                    • Una subida reinicia la acción de la calle.
                                </p>

                                <p>
                                    • Si ambos igualan, se descubre la siguiente calle.
                                </p>

                            </div>

                        </div>

                        {/* ================================================= */}
                        {/* BLINDS */}
                        {/* ================================================= */}

                        <div className="mt-3 grid grid-cols-2 gap-2">

                            <div className="rounded-lg bg-slate-800 p-2 text-center">

                                <div className="text-[8px] uppercase text-slate-500">
                                    Small Blind
                                </div>

                                <div className="font-black text-yellow-400">
                                    {formatDinero(
                                        SMALL_BLIND
                                    )}
                                </div>

                            </div>

                            <div className="rounded-lg bg-slate-800 p-2 text-center">

                                <div className="text-[8px] uppercase text-slate-500">
                                    Big Blind
                                </div>

                                <div className="font-black text-yellow-400">
                                    {formatDinero(
                                        BIG_BLIND
                                    )}
                                </div>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>
        </div>
    );
}