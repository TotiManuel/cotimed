import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type PointerEvent,
} from "react";

import {
    ArrowLeft,
    Check,
    Lock,
    RefreshCw,
    ShoppingCart,
    Trophy,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

/* =========================================================
   TIPOS
========================================================= */

type TipoTarjeta =
    | "clasica"
    | "oro"
    | "diamante"
    | "premium";

type TipoTicket =
    | "triple"
    | "cuadruple"
    | "numeros"
    | "bonus"
    | "jackpot";

type TipoZona =
    | "simbolo"
    | "numero"
    | "bonus"
    | "jackpot";

interface Premio {
    valor: number;
    peso: number;
}

interface ConfigTarjeta {
    id: TipoTarjeta;
    nombre: string;
    descripcion: string;
    icono: string;
    costo: number;
    probabilidadVictoria: number;
    premios: Premio[];
    etiqueta: string;
}

interface ConfigTicket {
    id: TipoTicket;
    nombre: string;
    descripcion: string;
    reglas: string;
    icono: string;
    multiplicadorCosto: number;
    zonas: number;
    etiqueta: string;
    tipo: "simbolos" | "numeros";
    colorClase: string;
    premioMaximo: string;
}

interface ZonaTicket {
    id: number;
    tipo: TipoZona;
    valor: string;
}

interface Ticket {
    id: number;
    tarjetaId: TipoTarjeta;
    tarjetaNombre: string;
    tipoTicketId: TipoTicket;
    tipoTicketNombre: string;
    tipoTicketIcono: string;
    costo: number;
    zonas: ZonaTicket[];
    numerosJugador: number[];
    numerosGanadores: number[];
    coincidencias: number[];
    bonus: boolean;
    jackpot: boolean;
    premio: number;
    ganado: boolean;
    detalleResultado: string;
}

/* =========================================================
   CONFIGURACIÓN DE TARJETAS
========================================================= */

const TARJETAS: ConfigTarjeta[] = [
    {
        id: "clasica",
        nombre: "Clásica",
        descripcion: "La raspadita tradicional.",
        icono: "🎫",
        costo: 100,
        probabilidadVictoria: 0.28,
        premios: [
            { valor: 100, peso: 50 },
            { valor: 250, peso: 30 },
            { valor: 500, peso: 15 },
            { valor: 1000, peso: 4 },
            { valor: 2500, peso: 1 },
        ],
        etiqueta: "Entrada",
    },
    {
        id: "oro",
        nombre: "Oro",
        descripcion: "Más posibilidades y mejores premios.",
        icono: "🪙",
        costo: 250,
        probabilidadVictoria: 0.33,
        premios: [
            { valor: 250, peso: 45 },
            { valor: 500, peso: 30 },
            { valor: 1000, peso: 17 },
            { valor: 2500, peso: 6 },
            { valor: 5000, peso: 2 },
        ],
        etiqueta: "Popular",
    },
    {
        id: "diamante",
        nombre: "Diamante",
        descripcion: "Premios importantes y mecánicas especiales.",
        icono: "💎",
        costo: 500,
        probabilidadVictoria: 0.38,
        premios: [
            { valor: 500, peso: 40 },
            { valor: 1000, peso: 30 },
            { valor: 2500, peso: 18 },
            { valor: 5000, peso: 9 },
            { valor: 10000, peso: 3 },
        ],
        etiqueta: "Premium",
    },
    {
        id: "premium",
        nombre: "Premium",
        descripcion: "La experiencia de mayor valor.",
        icono: "👑",
        costo: 1000,
        probabilidadVictoria: 0.42,
        premios: [
            { valor: 1000, peso: 35 },
            { valor: 2500, peso: 30 },
            { valor: 5000, peso: 20 },
            { valor: 10000, peso: 10 },
            { valor: 25000, peso: 5 },
        ],
        etiqueta: "Elite",
    },
];

/* =========================================================
   CONFIGURACIÓN DE TIPOS DE TICKET
========================================================= */

const TIPOS_TICKET: ConfigTicket[] = [
    {
        id: "triple",
        nombre: "Triple",
        descripcion: "La clásica de 3 casilleros.",
        reglas: "Revelá los 3 símbolos. Si los tres son iguales, ganás.",
        icono: "🎯",
        multiplicadorCosto: 1,
        zonas: 3,
        etiqueta: "Clásico",
        tipo: "simbolos",
        colorClase: "from-sky-500/20 to-blue-500/10",
        premioMaximo: "x1",
    },
    {
        id: "cuadruple",
        nombre: "Cuádruple",
        descripcion: "Cuatro símbolos y dos niveles de premio.",
        reglas:
            "3 símbolos iguales = premio. 4 símbolos iguales = premio x2.",
        icono: "🔥",
        multiplicadorCosto: 1.25,
        zonas: 4,
        etiqueta: "4 zonas",
        tipo: "simbolos",
        colorClase: "from-orange-500/20 to-red-500/10",
        premioMaximo: "x2",
    },
    {
        id: "numeros",
        nombre: "Números",
        descripcion: "Encontrá coincidencias entre tus números y los ganadores.",
        reglas:
            "Se sortean 3 números ganadores. Tenés 6 números. 1 coincidencia gana, 2 multiplican x3 y 3 multiplican x10.",
        icono: "🔢",
        multiplicadorCosto: 1.5,
        zonas: 6,
        etiqueta: "Números",
        tipo: "numeros",
        colorClase: "from-violet-500/20 to-purple-500/10",
        premioMaximo: "x10",
    },
    {
        id: "bonus",
        nombre: "Bonus",
        descripcion: "Cinco casilleros con posibilidad de activar un bonus.",
        reglas:
            "4 símbolos iguales ganan. Si aparece 🎁 BONUS, el premio se duplica.",
        icono: "🎁",
        multiplicadorCosto: 1.75,
        zonas: 5,
        etiqueta: "Bonus",
        tipo: "simbolos",
        colorClase: "from-emerald-500/20 to-green-500/10",
        premioMaximo: "x2",
    },
    {
        id: "jackpot",
        nombre: "Jackpot",
        descripcion: "Siete casilleros para buscar el gran premio.",
        reglas:
            "5 o más símbolos iguales ganan. 7 iguales activan JACKPOT y multiplican el premio x10.",
        icono: "💎",
        multiplicadorCosto: 2.5,
        zonas: 7,
        etiqueta: "Jackpot",
        tipo: "simbolos",
        colorClase: "from-fuchsia-500/20 to-pink-500/10",
        premioMaximo: "x10",
    },
];

/* =========================================================
   SÍMBOLOS
========================================================= */

const SIMBOLOS_PREMIO = [
    "💰",
    "💎",
    "🍀",
    "⭐",
    "7️⃣",
    "👑",
];

const SIMBOLOS_PERDEDOR = [
    "🍒",
    "🍋",
    "🍊",
    "🔔",
    "🍉",
    "🎲",
    "🪙",
];

const SIMBOLO_BONUS = "🎁";

/* =========================================================
   HELPERS
========================================================= */

const obtenerTarjeta = (
    id: TipoTarjeta,
): ConfigTarjeta => {
    return (
        TARJETAS.find(
            (tarjeta) => tarjeta.id === id,
        ) ?? TARJETAS[0]
    );
};

const obtenerTipoTicket = (
    id: TipoTicket,
): ConfigTicket => {
    return (
        TIPOS_TICKET.find(
            (tipo) => tipo.id === id,
        ) ?? TIPOS_TICKET[0]
    );
};

const mezclar = <T,>(
    array: T[],
): T[] => {
    const copia = [...array];

    for (
        let i = copia.length - 1;
        i > 0;
        i -= 1
    ) {
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

const elegirPremio = (
    premios: Premio[],
): number => {
    const total = premios.reduce(
        (acumulado, premio) =>
            acumulado + premio.peso,
        0,
    );

    let valor =
        Math.random() * total;

    for (const premio of premios) {
        valor -= premio.peso;

        if (valor <= 0) {
            return premio.valor;
        }
    }

    return (
        premios[premios.length - 1]
            ?.valor ?? 0
    );
};

/* =========================================================
   NUEVO:
   CADA SÍMBOLO TIENE SU PROPIO PREMIO
========================================================= */

const obtenerPremioPorSimbolo = (
    tarjeta: ConfigTarjeta,
    simbolo: string,
): number => {
    const premios = tarjeta.premios;

    if (premios.length === 0) {
        return 0;
    }

    const premiosOrdenados = [
        ...premios,
    ].sort(
        (a, b) => a.valor - b.valor,
    );

    const premioMinimo =
        premiosOrdenados[0]?.valor ??
        0;

    const premioMaximo =
        premiosOrdenados[
            premiosOrdenados.length - 1
        ]?.valor ?? premioMinimo;

    const segundo =
        premiosOrdenados[1]?.valor ??
        premioMinimo;

    const tercero =
        premiosOrdenados[2]?.valor ??
        segundo;

    const cuarto =
        premiosOrdenados[3]?.valor ??
        tercero;

    const quinto =
        premiosOrdenados[4]?.valor ??
        cuarto;

    switch (simbolo) {
        case "💰":
            return premioMinimo;

        case "💎":
            return segundo;

        case "🍀":
            return tercero;

        case "⭐":
            return cuarto;

        case "7️⃣":
            return quinto;

        case "👑":
            return premioMaximo;

        default:
            return premioMinimo;
    }
};

const elegirSimbolo = (
    lista: string[],
): string => {
    return (
        lista[
            Math.floor(
                Math.random() *
                    lista.length,
            )
        ] ?? "🍒"
    );
};

const generarNumerosUnicos = (
    cantidad: number,
    excluir: number[] = [],
): number[] => {
    const resultado: number[] = [];
    const usados = new Set<number>(
        excluir,
    );

    while (
        resultado.length < cantidad
    ) {
        const numero =
            Math.floor(
                Math.random() * 30,
            ) + 1;

        if (!usados.has(numero)) {
            usados.add(numero);
            resultado.push(numero);
        }
    }

    return resultado;
};

const obtenerCostoTicket = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
): number => {
    return Math.round(
        tarjeta.costo *
            tipo.multiplicadorCosto,
    );
};

const obtenerPremioMaximo = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
): number => {
    const premioMaximo =
        Math.max(
            ...tarjeta.premios.map(
                (premio) =>
                    premio.valor,
            ),
        );

    const multiplicador =
        tipo.id === "jackpot"
            ? 10
            : tipo.id === "numeros"
              ? 10
              : tipo.id === "cuadruple"
                ? 2
                : tipo.id === "bonus"
                  ? 2
                  : 1;

    return (
        premioMaximo *
        multiplicador
    );
};

const obtenerPremiosSimbolos = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
) => {
    const multiplicador =
        tipo.id === "jackpot"
            ? 10
            : tipo.id === "cuadruple"
              ? 2
              : tipo.id === "bonus"
                ? 2
                : 1;

    return SIMBOLOS_PREMIO.map(
        (simbolo) => {
            const premioBase =
                obtenerPremioPorSimbolo(
                    tarjeta,
                    simbolo,
                );

            return {
                simbolo,
                premioBase,
                premioFinal:
                    premioBase *
                    multiplicador,
                multiplicador,
            };
        },
    );
};

const generarSimbolosPerdedores = (
    cantidad: number,
): string[] => {
    const resultado: string[] = [];

    while (
        resultado.length < cantidad
    ) {
        const simbolo =
            elegirSimbolo(
                SIMBOLOS_PERDEDOR,
            );

        const cantidadActual =
            resultado.filter(
                (item) =>
                    item === simbolo,
            ).length;

        if (cantidadActual < 2) {
            resultado.push(simbolo);
        }
    }

    return resultado;
};

const crearZonasSimbolos = (
    simbolos: string[],
): ZonaTicket[] => {
    return simbolos.map(
        (valor, index) => ({
            id: index,
            tipo:
                valor ===
                SIMBOLO_BONUS
                    ? "bonus"
                    : valor === "💎" &&
                        simbolos.length >=
                            7
                      ? "jackpot"
                      : "simbolo",
            valor,
        }),
    );
};

/* =========================================================
   GENERACIÓN DE TICKETS
========================================================= */

const generarTicketTriple = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    const ganado =
        Math.random() <
        tarjeta.probabilidadVictoria;

    let simbolos: string[];
    let premioBase = 0;

    if (ganado) {
        const simbolo =
            elegirSimbolo(
                SIMBOLOS_PREMIO,
            );

        simbolos = [
            simbolo,
            simbolo,
            simbolo,
        ];

        premioBase =
            obtenerPremioPorSimbolo(
                tarjeta,
                simbolo,
            );
    } else {
        simbolos =
            generarSimbolosPerdedores(
                3,
            );
    }

    return {
        id: numero,
        tarjetaId: tarjeta.id,
        tarjetaNombre:
            tarjeta.nombre,
        tipoTicketId: tipo.id,
        tipoTicketNombre:
            tipo.nombre,
        tipoTicketIcono: tipo.icono,
        costo: obtenerCostoTicket(
            tarjeta,
            tipo,
        ),
        zonas: crearZonasSimbolos(
            simbolos,
        ),
        numerosJugador: [],
        numerosGanadores: [],
        coincidencias: [],
        bonus: false,
        jackpot: false,
        premio: ganado
            ? premioBase
            : 0,
        ganado,
        detalleResultado: ganado
            ? "¡Los 3 símbolos coinciden!"
            : "No hubo 3 símbolos iguales.",
    };
};

const generarTicketCuadruple = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    const ganado =
        Math.random() <
        tarjeta.probabilidadVictoria;

    let simbolos: string[];
    let cantidadIguales = 0;
    let premioBase = 0;

    if (ganado) {
        cantidadIguales =
            Math.random() < 0.22
                ? 4
                : 3;

        const simbolo =
            elegirSimbolo(
                SIMBOLOS_PREMIO,
            );

        premioBase =
            obtenerPremioPorSimbolo(
                tarjeta,
                simbolo,
            );

        const diferentes =
            generarSimbolosPerdedores(
                4 -
                    cantidadIguales,
            );

        simbolos = mezclar([
            ...Array(
                cantidadIguales,
            ).fill(simbolo),
            ...diferentes,
        ]);
    } else {
        simbolos =
            generarSimbolosPerdedores(
                4,
            );
    }

    const premio =
        ganado &&
        cantidadIguales === 4
            ? premioBase * 2
            : ganado
              ? premioBase
              : 0;

    return {
        id: numero,
        tarjetaId: tarjeta.id,
        tarjetaNombre:
            tarjeta.nombre,
        tipoTicketId: tipo.id,
        tipoTicketNombre:
            tipo.nombre,
        tipoTicketIcono: tipo.icono,
        costo: obtenerCostoTicket(
            tarjeta,
            tipo,
        ),
        zonas: crearZonasSimbolos(
            simbolos,
        ),
        numerosJugador: [],
        numerosGanadores: [],
        coincidencias: [],
        bonus: false,
        jackpot: false,
        premio,
        ganado,
        detalleResultado:
            ganado &&
            cantidadIguales === 4
                ? "🔥 ¡4 símbolos iguales! Premio x2."
                : ganado
                  ? "¡3 símbolos iguales!"
                  : "No hubo suficientes símbolos iguales.",
    };
};

const generarTicketNumeros = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    const ganado =
        Math.random() <
        tarjeta.probabilidadVictoria;

    const numerosGanadores =
        generarNumerosUnicos(3);

    let numerosJugador: number[];

    if (ganado) {
        const cantidadCoincidencias =
            Math.random() < 0.1
                ? 3
                : Math.random() < 0.35
                  ? 2
                  : 1;

        const coincidenciasForzadas =
            mezclar(
                numerosGanadores,
            ).slice(
                0,
                cantidadCoincidencias,
            );

        const restantes =
            generarNumerosUnicos(
                6 -
                    cantidadCoincidencias,
                numerosGanadores,
            );

        numerosJugador = mezclar([
            ...coincidenciasForzadas,
            ...restantes,
        ]);
    } else {
        numerosJugador =
            generarNumerosUnicos(
                6,
                numerosGanadores,
            );
    }

    const coincidencias =
        numerosJugador.filter(
            (numeroJugador) =>
                numerosGanadores.includes(
                    numeroJugador,
                ),
        );

    const premioBase =
        elegirPremio(
            tarjeta.premios,
        );

    let multiplicador = 0;

    if (coincidencias.length === 1) {
        multiplicador = 1;
    } else if (
        coincidencias.length === 2
    ) {
        multiplicador = 3;
    } else if (
        coincidencias.length >= 3
    ) {
        multiplicador = 10;
    }

    const premio =
        premioBase * multiplicador;

    const zonas: ZonaTicket[] =
        numerosJugador.map(
            (valor, index) => ({
                id: index,
                tipo: "numero",
                valor: String(valor),
            }),
        );

    return {
        id: numero,
        tarjetaId: tarjeta.id,
        tarjetaNombre:
            tarjeta.nombre,
        tipoTicketId: tipo.id,
        tipoTicketNombre:
            tipo.nombre,
        tipoTicketIcono: tipo.icono,
        costo: obtenerCostoTicket(
            tarjeta,
            tipo,
        ),
        zonas,
        numerosJugador,
        numerosGanadores,
        coincidencias,
        bonus: false,
        jackpot:
            coincidencias.length >=
            3,
        premio,
        ganado:
            coincidencias.length > 0,
        detalleResultado:
            coincidencias.length ===
            0
                ? "No coincidió ningún número."
                : coincidencias.length ===
                    1
                  ? "¡1 número ganador!"
                  : coincidencias.length ===
                      2
                    ? "¡2 números ganadores! Premio x3."
                    : "¡3 números ganadores! ¡Premio x10!",
    };
};

const generarTicketBonus = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    const ganoBase =
        Math.random() <
        tarjeta.probabilidadVictoria;

    const activoBonus =
        Math.random() < 0.16;

    let simbolos: string[];
    let ganoPorSimbolos = false;
    let premioBase = 0;

    if (ganoBase) {
        const simbolo =
            elegirSimbolo(
                SIMBOLOS_PREMIO,
            );

        premioBase =
            obtenerPremioPorSimbolo(
                tarjeta,
                simbolo,
            );

        simbolos = mezclar([
            simbolo,
            simbolo,
            simbolo,
            simbolo,
            elegirSimbolo(
                SIMBOLOS_PERDEDOR,
            ),
        ]);

        ganoPorSimbolos = true;
    } else if (activoBonus) {
        simbolos = mezclar([
            SIMBOLO_BONUS,
            elegirSimbolo(
                SIMBOLOS_PERDEDOR,
            ),
            elegirSimbolo(
                SIMBOLOS_PERDEDOR,
            ),
            elegirSimbolo(
                SIMBOLOS_PREMIO,
            ),
            elegirSimbolo(
                SIMBOLOS_PERDEDOR,
            ),
        ]);

        const simboloPremio =
            simbolos.find(
                (simbolo) =>
                    SIMBOLOS_PREMIO.includes(
                        simbolo,
                    ),
            );

        if (simboloPremio) {
            premioBase =
                obtenerPremioPorSimbolo(
                    tarjeta,
                    simboloPremio,
                );
        }
    } else {
        simbolos =
            generarSimbolosPerdedores(
                5,
            );
    }

    const bonus =
        activoBonus &&
        simbolos.includes(
            SIMBOLO_BONUS,
        );

    const ganado =
        ganoPorSimbolos || bonus;

    const premio = bonus
        ? premioBase * 2
        : ganado
          ? premioBase
          : 0;

    return {
        id: numero,
        tarjetaId: tarjeta.id,
        tarjetaNombre:
            tarjeta.nombre,
        tipoTicketId: tipo.id,
        tipoTicketNombre:
            tipo.nombre,
        tipoTicketIcono: tipo.icono,
        costo: obtenerCostoTicket(
            tarjeta,
            tipo,
        ),
        zonas: crearZonasSimbolos(
            simbolos,
        ),
        numerosJugador: [],
        numerosGanadores: [],
        coincidencias: [],
        bonus,
        jackpot: false,
        premio,
        ganado,
        detalleResultado: bonus
            ? "🎁 ¡BONUS ACTIVADO! Premio x2."
            : ganoPorSimbolos
              ? "¡4 símbolos iguales!"
              : "No hubo combinación ganadora.",
    };
};

const generarTicketJackpot = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    const ganado =
        Math.random() <
        tarjeta.probabilidadVictoria;

    let simbolos: string[];
    let jackpot = false;
    let premioBase = 0;

    if (ganado) {
        jackpot =
            Math.random() < 0.12;

        const cantidadIguales =
            jackpot ? 7 : 5;

        const simbolo = jackpot
            ? "💎"
            : elegirSimbolo(
                  SIMBOLOS_PREMIO,
              );

        premioBase =
            obtenerPremioPorSimbolo(
                tarjeta,
                simbolo,
            );

        simbolos = mezclar([
            ...Array(
                cantidadIguales,
            ).fill(simbolo),
            ...generarSimbolosPerdedores(
                7 -
                    cantidadIguales,
            ),
        ]);
    } else {
        simbolos =
            generarSimbolosPerdedores(
                7,
            );
    }

    const premio = jackpot
        ? premioBase * 10
        : ganado
          ? premioBase
          : 0;

    return {
        id: numero,
        tarjetaId: tarjeta.id,
        tarjetaNombre:
            tarjeta.nombre,
        tipoTicketId: tipo.id,
        tipoTicketNombre:
            tipo.nombre,
        tipoTicketIcono: tipo.icono,
        costo: obtenerCostoTicket(
            tarjeta,
            tipo,
        ),
        zonas: crearZonasSimbolos(
            simbolos,
        ),
        numerosJugador: [],
        numerosGanadores: [],
        coincidencias: [],
        bonus: false,
        jackpot,
        premio,
        ganado,
        detalleResultado: jackpot
            ? "👑 ¡JACKPOT! 7 símbolos iguales. Premio x10."
            : ganado
              ? "¡5 o más símbolos iguales!"
              : "No hubo suficientes símbolos iguales.",
    };
};

const generarTicket = (
    tarjeta: ConfigTarjeta,
    tipo: ConfigTicket,
    numero: number,
): Ticket => {
    switch (tipo.id) {
        case "triple":
            return generarTicketTriple(
                tarjeta,
                tipo,
                numero,
            );

        case "cuadruple":
            return generarTicketCuadruple(
                tarjeta,
                tipo,
                numero,
            );

        case "numeros":
            return generarTicketNumeros(
                tarjeta,
                tipo,
                numero,
            );

        case "bonus":
            return generarTicketBonus(
                tarjeta,
                tipo,
                numero,
            );

        case "jackpot":
            return generarTicketJackpot(
                tarjeta,
                tipo,
                numero,
            );

        default:
            return generarTicketTriple(
                tarjeta,
                tipo,
                numero,
            );
    }
};

/* =========================================================
   CANVAS
========================================================= */

const prepararCanvas = (
    canvas: HTMLCanvasElement,
) => {
    const contexto =
        canvas.getContext("2d");

    if (!contexto) {
        return;
    }

    const ancho = canvas.width;
    const alto = canvas.height;

    contexto.globalCompositeOperation =
        "source-over";

    contexto.fillStyle = "#64748b";

    contexto.fillRect(
        0,
        0,
        ancho,
        alto,
    );

    contexto.fillStyle =
        "rgba(255,255,255,0.08)";

    for (
        let x = -alto;
        x < ancho;
        x += 18
    ) {
        contexto.save();
        contexto.translate(x, 0);
        contexto.rotate(
            (-35 * Math.PI) / 180,
        );

        contexto.fillRect(
            0,
            0,
            8,
            alto * 2,
        );

        contexto.restore();
    }

    contexto.fillStyle =
        "rgba(15,23,42,0.42)";

    contexto.font =
        "700 14px Arial";

    contexto.textAlign = "center";
    contexto.textBaseline = "middle";

    contexto.fillText(
        "RASPA AQUÍ",
        ancho / 2,
        alto / 2,
    );
};

/* =========================================================
   COMPONENTE
========================================================= */

const RaspaYGana = () => {
    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [
        tarjetaSeleccionada,
        setTarjetaSeleccionada,
    ] =
        useState<TipoTarjeta>(
            "clasica",
        );

    const [
        tipoTicketSeleccionado,
        setTipoTicketSeleccionado,
    ] =
        useState<TipoTicket>(
            "triple",
        );

    const [ticket, setTicket] =
        useState<Ticket | null>(
            null,
        );

    const [ticketSiguiente, setTicketSiguiente] =
        useState(1);

    const [ticketDetalle, setTicketDetalle] =
        useState<ConfigTicket | null>(
            null,
        );

    const [mostrarListado, setMostrarListado] =
        useState(true);

    const [revelados, setRevelados] =
        useState<boolean[]>([]);

    const [raspando, setRaspando] =
        useState(false);

    const [mensaje, setMensaje] =
        useState("");

    const [
        resultadoRegistrado,
        setResultadoRegistrado,
    ] = useState(false);

    const canvasRefs =
        useRef<
            (HTMLCanvasElement | null)[]
        >([]);

    const audioContext =
        useRef<AudioContext | null>(
            null,
        );

    const mensajeTimer =
        useRef<
            ReturnType<
                typeof setTimeout
            > | null
        >(null);

    const configTarjeta =
        useMemo(
            () =>
                obtenerTarjeta(
                    tarjetaSeleccionada,
                ),
            [tarjetaSeleccionada],
        );

    const configTicketSeleccionado =
        useMemo(
            () =>
                obtenerTipoTicket(
                    tipoTicketSeleccionado,
                ),
            [tipoTicketSeleccionado],
        );

    const premiosSimbolos =
        useMemo(
            () =>
                obtenerPremiosSimbolos(
                    configTarjeta,
                    configTicketSeleccionado,
                ),
            [
                configTarjeta,
                configTicketSeleccionado,
            ],
        );

    const ticketTerminado =
        ticket !== null &&
        revelados.length > 0 &&
        revelados.every(Boolean);

    const reproducirSonido = (
        frecuencia = 300,
        duracion = 0.05,
    ) => {
        try {
            if (
                typeof window ===
                "undefined"
            ) {
                return;
            }

            const AudioContextClass =
                window.AudioContext ||
                (
                    window as typeof window & {
                        webkitAudioContext?: typeof AudioContext;
                    }
                )
                    .webkitAudioContext;

            if (!AudioContextClass) {
                return;
            }

            if (
                !audioContext.current
            ) {
                audioContext.current =
                    new AudioContextClass();
            }

            const contexto =
                audioContext.current;

            const oscilador =
                contexto.createOscillator();

            const ganancia =
                contexto.createGain();

            oscilador.type = "sine";
            oscilador.frequency.value =
                frecuencia;

            ganancia.gain.setValueAtTime(
                0.025,
                contexto.currentTime,
            );

            ganancia.gain.exponentialRampToValueAtTime(
                0.001,
                contexto.currentTime +
                    duracion,
            );

            oscilador.connect(
                ganancia,
            );

            ganancia.connect(
                contexto.destination,
            );

            oscilador.start();

            oscilador.stop(
                contexto.currentTime +
                    duracion,
            );
        } catch {
            // El sonido es opcional.
        }
    };

    const mostrarMensaje = (
        texto: string,
    ) => {
        setMensaje(texto);

        if (mensajeTimer.current) {
            clearTimeout(
                mensajeTimer.current,
            );
        }

        mensajeTimer.current =
            setTimeout(() => {
                setMensaje("");
            }, 3500);
    };

    useEffect(() => {
        if (!ticket) {
            return;
        }

        const timer =
            window.setTimeout(() => {
                ticket.zonas.forEach(
                    (_, index) => {
                        const canvas =
                            canvasRefs
                                .current[
                                index
                            ];

                        if (canvas) {
                            prepararCanvas(
                                canvas,
                            );
                        }
                    },
                );
            }, 30);

        return () => {
            window.clearTimeout(
                timer,
            );
        };
    }, [ticket]);

    useEffect(() => {
        if (
            !ticket ||
            !ticketTerminado ||
            resultadoRegistrado
        ) {
            return;
        }

        setResultadoRegistrado(true);

        recordGame({
            juegoId:
                "raspa-y-gana",
            juegoNombre:
                "Raspa y Gana",
            resultado: ticket.ganado
                ? "GANADA"
                : "PERDIDA",
            apuesta: ticket.costo,
            premio: ticket.premio,
        });

        if (ticket.ganado) {
            if (ticket.jackpot) {
                reproducirSonido(
                    900,
                    0.35,
                );

                mostrarMensaje(
                    `👑 ¡JACKPOT! Ganaste $${ticket.premio.toLocaleString(
                        "es-AR",
                    )}`,
                );
            } else if (
                ticket.bonus
            ) {
                reproducirSonido(
                    750,
                    0.25,
                );

                mostrarMensaje(
                    `🎁 ¡BONUS! Ganaste $${ticket.premio.toLocaleString(
                        "es-AR",
                    )}`,
                );
            } else {
                reproducirSonido(
                    650,
                    0.25,
                );

                mostrarMensaje(
                    `🎉 ¡GANASTE $${ticket.premio.toLocaleString(
                        "es-AR",
                    )}!`,
                );
            }
        } else {
            reproducirSonido(
                180,
                0.15,
            );

            mostrarMensaje(
                "😔 Esta vez no hubo premio.",
            );
        }
    }, [
        ticket,
        ticketTerminado,
        resultadoRegistrado,
        recordGame,
    ]);

    const obtenerPosicion = (
        evento: PointerEvent<HTMLCanvasElement>,
    ) => {
        const canvas =
            evento.currentTarget;

        const rect =
            canvas.getBoundingClientRect();

        return {
            x:
                ((evento.clientX -
                    rect.left) /
                    rect.width) *
                canvas.width,

            y:
                ((evento.clientY -
                    rect.top) /
                    rect.height) *
                canvas.height,
        };
    };

    const revelarCelda = (
        index: number,
    ) => {
        setRevelados((actuales) => {
            if (actuales[index]) {
                return actuales;
            }

            const nuevas = [
                ...actuales,
            ];

            nuevas[index] = true;

            return nuevas;
        });
    };

    const comprobarRevelado = (
        index: number,
    ) => {
        const canvas =
            canvasRefs.current[index];

        if (!canvas) {
            return;
        }

        const contexto =
            canvas.getContext("2d");

        if (!contexto) {
            return;
        }

        const imagen =
            contexto.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
            );

        let transparentes = 0;
        let total = 0;

        for (
            let i = 3;
            i < imagen.data.length;
            i += 4
        ) {
            total += 1;

            if (
                imagen.data[i] < 100
            ) {
                transparentes += 1;
            }
        }

        const porcentaje =
            transparentes / total;

        if (porcentaje > 0.42) {
            revelarCelda(index);
        }
    };

    const raspar = (
        evento: PointerEvent<HTMLCanvasElement>,
        index: number,
    ) => {
        if (
            !ticket ||
            revelados[index] ||
            ticketTerminado
        ) {
            return;
        }

        const canvas =
            evento.currentTarget;

        const contexto =
            canvas.getContext("2d");

        if (!contexto) {
            return;
        }

        const { x, y } =
            obtenerPosicion(evento);

        contexto.globalCompositeOperation =
            "destination-out";

        contexto.beginPath();

        contexto.arc(
            x,
            y,
            24,
            0,
            Math.PI * 2,
        );

        contexto.fill();

        reproducirSonido(
            180 +
                Math.random() * 80,
            0.025,
        );

        comprobarRevelado(index);
    };

    const iniciarRaspado = (
        evento: PointerEvent<HTMLCanvasElement>,
        index: number,
    ) => {
        if (
            !ticket ||
            revelados[index] ||
            ticketTerminado
        ) {
            return;
        }

        setRaspando(true);

        try {
            evento.currentTarget.setPointerCapture(
                evento.pointerId,
            );
        } catch {
            // Algunos navegadores pueden no soportarlo.
        }

        raspar(evento, index);
    };

    const continuarRaspando = (
        evento: PointerEvent<HTMLCanvasElement>,
        index: number,
    ) => {
        if (!raspando) {
            return;
        }

        raspar(evento, index);
    };

    const terminarRaspado = (
        evento: PointerEvent<HTMLCanvasElement>,
    ) => {
        setRaspando(false);

        try {
            evento.currentTarget.releasePointerCapture(
                evento.pointerId,
            );
        } catch {
            // No hacer nada.
        }
    };

    const revelarTodo = () => {
        if (!ticket) {
            return;
        }

        ticket.zonas.forEach(
            (_, index) => {
                const canvas =
                    canvasRefs.current[
                        index
                    ];

                if (canvas) {
                    const contexto =
                        canvas.getContext(
                            "2d",
                        );

                    if (contexto) {
                        contexto.clearRect(
                            0,
                            0,
                            canvas.width,
                            canvas.height,
                        );
                    }
                }
            },
        );

        setRevelados(
            new Array(
                ticket.zonas.length,
            ).fill(true),
        );

        reproducirSonido(
            500,
            0.12,
        );
    };

    const comprarTicket = (
        tarjeta: ConfigTarjeta,
        tipo: ConfigTicket,
    ) => {
        if (ticket) {
            return;
        }

        const costo =
            obtenerCostoTicket(
                tarjeta,
                tipo,
            );

        if (saldo < costo) {
            mostrarMensaje(
                `No tenés saldo suficiente. Necesitás $${costo.toLocaleString(
                    "es-AR",
                )}.`,
            );

            return;
        }

        const descontado =
            spendBalance(
                costo,
                `Compra ticket ${tipo.nombre} - ${tarjeta.nombre}`,
            );

        if (descontado === false) {
            mostrarMensaje(
                "No se pudo realizar la compra.",
            );

            return;
        }

        const nuevoTicket =
            generarTicket(
                tarjeta,
                tipo,
                ticketSiguiente,
            );

        setTicketSiguiente(
            (actual) => actual + 1,
        );

        setTicket(nuevoTicket);

        setRevelados(
            new Array(
                nuevoTicket.zonas.length,
            ).fill(false),
        );

        canvasRefs.current = [];

        setResultadoRegistrado(false);
        setTicketDetalle(null);
        setMostrarListado(false);
        setRaspando(false);

        mostrarMensaje(
            `🎫 ${tipo.nombre} comprado por $${costo.toLocaleString(
                "es-AR",
            )}`,
        );
    };

    const seleccionarTipoTicket = (
        tipo: ConfigTicket,
    ) => {
        setTipoTicketSeleccionado(
            tipo.id,
        );

        setTicketDetalle(tipo);
    };

    const cambiarTarjetaAntesDeComprar = (
        tarjeta: ConfigTarjeta,
    ) => {
        setTarjetaSeleccionada(
            tarjeta.id,
        );
    };

    const volverAlListado = () => {
        if (ticket) {
            setTicket(null);
        }

        setTicketDetalle(null);
        setMostrarListado(true);
        setRaspando(false);
        setRevelados([]);
        canvasRefs.current = [];
    };

    const comprarOtro = () => {
        setTicket(null);
        setRevelados([]);
        setResultadoRegistrado(false);
        setRaspando(false);
        canvasRefs.current = [];
        setMostrarListado(true);
    };

    const obtenerGridClass = (
        cantidad: number,
    ) => {
        if (cantidad === 3) {
            return "grid-cols-3";
        }

        if (cantidad === 4) {
            return "grid-cols-2 sm:grid-cols-4";
        }

        if (cantidad === 5) {
            return "grid-cols-2 sm:grid-cols-5";
        }

        if (cantidad === 6) {
            return "grid-cols-2 sm:grid-cols-3";
        }

        return "grid-cols-2 sm:grid-cols-4";
    };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div className="min-h-screen overflow-hidden bg-slate-950 px-2 py-2 text-white [zoom:0.80] sm:px-3 sm:py-3">
            <div className="mx-auto max-w-7xl">

                {!ticket &&
                    mostrarListado && (
                        <>
                            <div className="mb-2.5 flex items-end justify-between gap-2">
                                <div>
                                    <h2 className="text-base font-black sm:text-lg">
                                        Elegí tu ticket
                                    </h2>

                                    <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                                        Tocá un ticket para ver sus reglas y comprarlo.
                                    </p>
                                </div>

                                <div className="hidden rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-slate-400 sm:block">
                                    Nivel:{" "}
                                    <span className="text-yellow-300">
                                        {
                                            configTarjeta.nombre
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                {TIPOS_TICKET.map(
                                    (tipo) => {
                                        const esSeleccionado =
                                            tipo.id ===
                                            tipoTicketSeleccionado;

                                        const costo =
                                            obtenerCostoTicket(
                                                configTarjeta,
                                                tipo,
                                            );

                                        const premioMaximo =
                                            obtenerPremioMaximo(
                                                configTarjeta,
                                                tipo,
                                            );

                                        return (
                                            <button
                                                key={
                                                    tipo.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    seleccionarTipoTicket(
                                                        tipo,
                                                    )
                                                }
                                                className={`group relative overflow-hidden rounded-xl border text-left transition duration-200 hover:-translate-y-0.5 ${
                                                    esSeleccionado
                                                        ? "border-yellow-400/60 bg-slate-900 shadow-xl shadow-yellow-500/10"
                                                        : "border-slate-800 bg-slate-900/80 hover:border-slate-700"
                                                }`}
                                            >
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${tipo.colorClase} opacity-70`}
                                                />

                                                <div className="relative p-2.5">
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/70 text-lg">
                                                                {
                                                                    tipo.icono
                                                                }
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center gap-1">
                                                                    <h3 className="text-xs font-black">
                                                                        {
                                                                            tipo.nombre
                                                                        }
                                                                    </h3>

                                                                    {esSeleccionado && (
                                                                        <Check className="h-3 w-3 text-yellow-300" />
                                                                    )}
                                                                </div>

                                                                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
                                                                    {
                                                                        tipo.etiqueta
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <span className="rounded-full bg-slate-950/70 px-1.5 py-0.5 text-[8px] font-bold text-slate-400">
                                                            {
                                                                tipo.zonas
                                                            }
                                                        </span>
                                                    </div>

                                                    <p className="mb-2 min-h-[27px] text-[10px] leading-3.5 text-slate-400">
                                                        {
                                                            tipo.descripcion
                                                        }
                                                    </p>

                                                    <div className="mb-2 rounded-lg border border-slate-700/60 bg-slate-950/60 p-1.5">
                                                        <p className="text-[7px] font-bold uppercase tracking-wider text-slate-600">
                                                            Premio máximo
                                                        </p>

                                                        <p className="mt-0.5 text-sm font-black text-yellow-300">
                                                            $
                                                            {premioMaximo.toLocaleString(
                                                                "es-AR",
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <p className="text-[7px] text-slate-600">
                                                                Precio
                                                            </p>

                                                            <p className="text-xs font-black">
                                                                $
                                                                {costo.toLocaleString(
                                                                    "es-AR",
                                                                )}
                                                            </p>
                                                        </div>

                                                        <ArrowLeft className="h-3 w-3 rotate-180 text-slate-500 transition group-hover:text-yellow-300" />
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    },
                                )}
                            </div>

                            <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/60 p-2">
                                <div className="mb-1.5 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xs font-black">
                                            Nivel del ticket
                                        </h2>

                                        <p className="text-[8px] text-slate-500">
                                            Modifica el costo y los premios.
                                        </p>
                                    </div>

                                    <span className="text-[9px] font-bold text-yellow-300">
                                        {
                                            configTarjeta.nombre
                                        }
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
                                    {TARJETAS.map(
                                        (tarjeta) => {
                                            const activa =
                                                tarjeta.id ===
                                                tarjetaSeleccionada;

                                            const premioMaximoNivel =
                                                Math.max(
                                                    ...tarjeta.premios.map(
                                                        (
                                                            premio,
                                                        ) =>
                                                            premio.valor,
                                                    ),
                                                );

                                            return (
                                                <button
                                                    key={
                                                        tarjeta.id
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        setTarjetaSeleccionada(
                                                            tarjeta.id,
                                                        )
                                                    }
                                                    className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition ${
                                                        activa
                                                            ? "border-yellow-400/60 bg-yellow-400/5"
                                                            : "border-slate-800 bg-slate-950 hover:border-slate-700"
                                                    }`}
                                                >
                                                    <span className="text-base">
                                                        {
                                                            tarjeta.icono
                                                        }
                                                    </span>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <p className="text-[10px] font-black">
                                                                {
                                                                    tarjeta.nombre
                                                                }
                                                            </p>

                                                            {activa && (
                                                                <Check className="h-3 w-3 shrink-0 text-yellow-300" />
                                                            )}
                                                        </div>

                                                        <p className="text-[8px] text-slate-500">
                                                            $
                                                            {tarjeta.costo.toLocaleString(
                                                                "es-AR",
                                                            )}{" "}
                                                            · máx. $
                                                            {premioMaximoNivel.toLocaleString(
                                                                "es-AR",
                                                            )}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                {!ticket &&
                    ticketDetalle && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm"
                            onClick={() =>
                                setTicketDetalle(
                                    null,
                                )
                            }
                        >
                            <div
                                className="relative max-h-[96vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black"
                                onClick={(
                                    evento,
                                ) =>
                                    evento.stopPropagation()
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTicketDetalle(
                                            null,
                                        )
                                    }
                                    className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                                    aria-label="Cerrar"
                                >
                                    ×
                                </button>

                                <div
                                    className={`bg-gradient-to-br ${ticketDetalle.colorClase} p-3 sm:p-4`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/70 text-2xl shadow-xl">
                                            {
                                                ticketDetalle.icono
                                            }
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                                {
                                                    ticketDetalle.etiqueta
                                                }
                                            </p>

                                            <h2 className="text-xl font-black">
                                                {
                                                    ticketDetalle.nombre
                                                }
                                            </h2>

                                            <p className="mt-0.5 text-[10px] text-slate-300">
                                                {
                                                    ticketDetalle.descripcion
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-2.5">
                                        <p className="mb-1 text-[8px] font-black uppercase tracking-wider text-slate-400">
                                            Elegí el nivel antes de comprar
                                        </p>

                                        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                                            {TARJETAS.map(
                                                (
                                                    tarjeta,
                                                ) => {
                                                    const activa =
                                                        tarjeta.id ===
                                                        tarjetaSeleccionada;

                                                    return (
                                                        <button
                                                            key={
                                                                tarjeta.id
                                                            }
                                                            type="button"
                                                            onClick={() =>
                                                                cambiarTarjetaAntesDeComprar(
                                                                    tarjeta,
                                                                )
                                                            }
                                                            className={`rounded-lg border p-1.5 text-left transition ${
                                                                activa
                                                                    ? "border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-500/10"
                                                                    : "border-slate-700 bg-slate-950/60 hover:border-slate-500"
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between gap-1">
                                                                <span className="text-base">
                                                                    {
                                                                        tarjeta.icono
                                                                    }
                                                                </span>

                                                                {activa && (
                                                                    <Check className="h-3 w-3 text-yellow-300" />
                                                                )}
                                                            </div>

                                                            <p className="mt-0.5 text-[10px] font-black">
                                                                {
                                                                    tarjeta.nombre
                                                                }
                                                            </p>

                                                            <p className="text-[8px] text-slate-500">
                                                                Base $
                                                                {tarjeta.costo.toLocaleString(
                                                                    "es-AR",
                                                                )}
                                                            </p>
                                                        </button>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                                        <div className="rounded-lg border border-white/10 bg-slate-950/70 p-2">
                                            <p className="text-[7px] font-bold uppercase text-slate-500">
                                                Precio
                                            </p>

                                            <p className="text-base font-black text-yellow-300">
                                                $
                                                {obtenerCostoTicket(
                                                    configTarjeta,
                                                    ticketDetalle,
                                                ).toLocaleString(
                                                    "es-AR",
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-2">
                                            <p className="text-[7px] font-bold uppercase text-yellow-500">
                                                Podés ganar hasta
                                            </p>

                                            <p className="text-base font-black text-yellow-300">
                                                $
                                                {obtenerPremioMaximo(
                                                    configTarjeta,
                                                    ticketDetalle,
                                                ).toLocaleString(
                                                    "es-AR",
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 p-3 sm:p-4">
                                    <div className="grid grid-cols-3 gap-1.5">
                                        <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                                            <p className="text-[7px] text-slate-500">
                                                Casilleros
                                            </p>

                                            <p className="mt-0.5 text-sm font-black">
                                                {
                                                    ticketDetalle.zonas
                                                }
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                                            <p className="text-[7px] text-slate-500">
                                                Nivel
                                            </p>

                                            <p className="mt-0.5 text-sm font-black">
                                                {
                                                    configTarjeta.nombre
                                                }
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-2">
                                            <p className="text-[7px] text-yellow-500">
                                                Máximo
                                            </p>

                                            <p className="mt-0.5 text-sm font-black text-yellow-300">
                                                $
                                                {obtenerPremioMaximo(
                                                    configTarjeta,
                                                    ticketDetalle,
                                                ).toLocaleString(
                                                    "es-AR",
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {ticketDetalle.tipo ===
                                        "simbolos" && (
                                        <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                                            <div className="mb-1.5 flex items-center justify-between gap-2">
                                                <div>
                                                    <h3 className="text-[11px] font-black">
                                                        Premios por símbolo
                                                    </h3>

                                                    <p className="text-[8px] text-slate-500">
                                                        Cada símbolo tiene su propio premio.
                                                    </p>
                                                </div>

                                                <span className="rounded-full bg-yellow-400/10 px-1.5 py-0.5 text-[8px] font-bold text-yellow-300">
                                                    {
                                                        configTarjeta.nombre
                                                    }
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                                                {premiosSimbolos.map(
                                                    ({
                                                        simbolo,
                                                        premioFinal,
                                                        multiplicador,
                                                    }) => (
                                                        <div
                                                            key={
                                                                simbolo
                                                            }
                                                            className="rounded-lg border border-slate-800 bg-slate-900 p-1.5"
                                                        >
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-950 text-base">
                                                                    {
                                                                        simbolo
                                                                    }
                                                                </span>

                                                                <div className="min-w-0">
                                                                    <p className="text-[7px] font-bold uppercase text-slate-500">
                                                                        Símbolo
                                                                    </p>

                                                                    <p className="text-[10px] font-black">
                                                                        {
                                                                            simbolo
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="mt-1">
                                                                <p className="text-[7px] uppercase text-slate-600">
                                                                    Premio
                                                                </p>

                                                                <p className="text-[10px] font-black text-emerald-300">
                                                                    $
                                                                    {premioFinal.toLocaleString(
                                                                        "es-AR",
                                                                    )}
                                                                </p>

                                                                {multiplicador >
                                                                    1 && (
                                                                    <p className="mt-0.5 text-[7px] font-bold text-yellow-500">
                                                                        x
                                                                        {
                                                                            multiplicador
                                                                        }{" "}
                                                                        según la mecánica
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {ticketDetalle.tipo ===
                                        "numeros" && (
                                        <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                                            <h3 className="text-[11px] font-black">
                                                Premios por coincidencia
                                            </h3>

                                            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                                                {[
                                                    {
                                                        titulo: "1 número",
                                                        multiplicador: 1,
                                                    },
                                                    {
                                                        titulo: "2 números",
                                                        multiplicador: 3,
                                                    },
                                                    {
                                                        titulo: "3 números",
                                                        multiplicador: 10,
                                                    },
                                                ].map(
                                                    ({
                                                        titulo,
                                                        multiplicador,
                                                    }) => {
                                                        const maximo =
                                                            Math.max(
                                                                ...configTarjeta.premios.map(
                                                                    (
                                                                        premio,
                                                                    ) =>
                                                                        premio.valor *
                                                                        multiplicador,
                                                                ),
                                                            );

                                                        return (
                                                            <div
                                                                key={
                                                                    titulo
                                                                }
                                                                className="rounded-lg border border-slate-800 bg-slate-900 p-1.5"
                                                            >
                                                                <p className="text-[8px] text-slate-500">
                                                                    {
                                                                        titulo
                                                                    }
                                                                </p>

                                                                <p className="mt-0.5 text-[9px] font-black text-emerald-300">
                                                                    Hasta $
                                                                    {maximo.toLocaleString(
                                                                        "es-AR",
                                                                    )}
                                                                </p>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                                        <div className="mb-1 flex items-center gap-1.5">
                                            <Lock className="h-3.5 w-3.5 text-yellow-300" />

                                            <h3 className="text-[11px] font-black">
                                                Reglas
                                            </h3>
                                        </div>

                                        <p className="text-[9px] leading-4 text-slate-300">
                                            {
                                                ticketDetalle.reglas
                                            }
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            comprarTicket(
                                                configTarjeta,
                                                ticketDetalle,
                                            )
                                        }
                                        disabled={
                                            saldo <
                                            obtenerCostoTicket(
                                                configTarjeta,
                                                ticketDetalle,
                                            )
                                        }
                                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-2.5 text-sm font-black text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                                    >
                                        <ShoppingCart className="h-4 w-4" />

                                        Comprar por $
                                        {obtenerCostoTicket(
                                            configTarjeta,
                                            ticketDetalle,
                                        ).toLocaleString(
                                            "es-AR",
                                        )}
                                    </button>

                                    {saldo <
                                        obtenerCostoTicket(
                                            configTarjeta,
                                            ticketDetalle,
                                        ) && (
                                        <p className="text-center text-[9px] font-bold text-red-400">
                                            No tenés saldo suficiente.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                {mensaje && (
                    <div className="fixed bottom-2 left-1/2 z-[60] -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-center text-[10px] font-bold shadow-2xl">
                        {mensaje}
                    </div>
                )}

                {ticket && (
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-2 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                type="button"
                                onClick={
                                    volverAlListado
                                }
                                disabled={
                                    !ticketTerminado
                                }
                                className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                Volver al listado
                            </button>

                            <div className="flex flex-wrap items-center gap-1.5">
                                <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[8px] font-bold text-slate-300">
                                    {
                                        ticket.tarjetaNombre
                                    }
                                </span>

                                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/5 px-2 py-0.5 text-[8px] font-bold text-yellow-300">
                                    {
                                        ticket.tipoTicketIcono
                                    }{" "}
                                    {
                                        ticket.tipoTicketNombre
                                    }
                                </span>

                                <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[8px] font-bold text-slate-400">
                                    #
                                    {String(
                                        ticket.id,
                                    ).padStart(
                                        3,
                                        "0",
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                            <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-3 sm:p-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-2xl">
                                                {
                                                    ticket.tipoTicketIcono
                                                }
                                            </span>

                                            <div>
                                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                                    Ticket
                                                </p>

                                                <h2 className="text-lg font-black">
                                                    {
                                                        ticket.tipoTicketNombre
                                                    }
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="mt-1 text-[9px] text-slate-500">
                                            {
                                                obtenerTipoTicket(
                                                    ticket.tipoTicketId,
                                                ).reglas
                                            }
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <div className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-center">
                                            <p className="text-[7px] text-slate-500">
                                                Valor
                                            </p>

                                            <p className="text-sm font-black text-yellow-300">
                                                $
                                                {ticket.costo.toLocaleString(
                                                    "es-AR",
                                                )}
                                            </p>
                                        </div>

                                        <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 px-2.5 py-1.5 text-center">
                                            <p className="text-[7px] text-yellow-500">
                                                Máximo
                                            </p>

                                            <p className="text-sm font-black text-yellow-300">
                                                $
                                                {obtenerPremioMaximo(
                                                    configTarjeta,
                                                    obtenerTipoTicket(
                                                        ticket.tipoTicketId,
                                                    ),
                                                ).toLocaleString(
                                                    "es-AR",
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {ticket.tipoTicketId ===
                                "numeros" && (
                                <div className="border-b border-slate-800 p-3 sm:p-4">
                                    <div className="mb-1.5 flex items-center gap-1.5">
                                        <Trophy className="h-3.5 w-3.5 text-yellow-300" />

                                        <h3 className="text-[11px] font-black">
                                            Números ganadores
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-3 gap-1.5">
                                        {ticket.numerosGanadores.map(
                                            (
                                                numero,
                                            ) => {
                                                const coincidencia =
                                                    ticket.coincidencias.includes(
                                                        numero,
                                                    );

                                                return (
                                                    <div
                                                        key={
                                                            numero
                                                        }
                                                        className={`flex h-10 items-center justify-center rounded-lg border text-lg font-black ${
                                                            coincidencia
                                                                ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                                                                : "border-slate-700 bg-slate-950 text-white"
                                                        }`}
                                                    >
                                                        {
                                                            numero
                                                        }
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>

                                    <p className="mt-1 text-center text-[8px] text-slate-500">
                                        Los números amarillos también están entre tus números.
                                    </p>
                                </div>
                            )}

                            <div className="p-3 sm:p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-black">
                                            {ticket.tipoTicketId ===
                                            "numeros"
                                                ? "Tus números"
                                                : "Raspá el ticket"}
                                        </h3>

                                        <p className="text-[8px] text-slate-500">
                                            {revelados.filter(
                                                Boolean,
                                            ).length}{" "}
                                            de{" "}
                                            {
                                                ticket.zonas
                                                    .length
                                            }{" "}
                                            revelados
                                        </p>
                                    </div>

                                    {!ticketTerminado && (
                                        <button
                                            type="button"
                                            onClick={
                                                revelarTodo
                                            }
                                            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-[8px] font-bold text-slate-300 transition hover:border-slate-600 hover:text-white"
                                        >
                                            <RefreshCw className="h-3 w-3" />
                                            Revelar todo
                                        </button>
                                    )}
                                </div>

                                <div
                                    className={`grid ${obtenerGridClass(
                                        ticket.zonas
                                            .length,
                                    )} gap-1.5`}
                                >
                                    {ticket.zonas.map(
                                        (
                                            zona,
                                            index,
                                        ) => {
                                            const revelado =
                                                revelados[
                                                    index
                                                ];

                                            const esNumero =
                                                zona.tipo ===
                                                "numero";

                                            const esBonus =
                                                zona.tipo ===
                                                "bonus";

                                            return (
                                                <div
                                                    key={
                                                        zona.id
                                                    }
                                                    className={`relative aspect-square overflow-hidden rounded-lg border ${
                                                        revelado
                                                            ? esBonus
                                                                ? "border-emerald-400/50 bg-emerald-400/5"
                                                                : "border-slate-700 bg-slate-950"
                                                            : "border-slate-700 bg-slate-950"
                                                    }`}
                                                >
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span
                                                            className={
                                                                esNumero
                                                                    ? "text-xl font-black text-white sm:text-2xl"
                                                                    : "text-2xl sm:text-3xl"
                                                            }
                                                        >
                                                            {
                                                                zona.valor
                                                            }
                                                        </span>
                                                    </div>

                                                    <canvas
                                                        ref={(
                                                            canvas,
                                                        ) => {
                                                            canvasRefs.current[
                                                                index
                                                            ] =
                                                                canvas;
                                                        }}
                                                        width={
                                                            180
                                                        }
                                                        height={
                                                            180
                                                        }
                                                        className={`absolute inset-0 h-full w-full touch-none transition-opacity ${
                                                            revelado
                                                                ? "pointer-events-none opacity-0"
                                                                : "cursor-crosshair opacity-100"
                                                        }`}
                                                        onPointerDown={(
                                                            evento,
                                                        ) =>
                                                            iniciarRaspado(
                                                                evento,
                                                                index,
                                                            )
                                                        }
                                                        onPointerMove={(
                                                            evento,
                                                        ) =>
                                                            continuarRaspando(
                                                                evento,
                                                                index,
                                                            )
                                                        }
                                                        onPointerUp={
                                                            terminarRaspado
                                                        }
                                                        onPointerCancel={
                                                            terminarRaspado
                                                        }
                                                    />

                                                    {revelado && (
                                                        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-1 py-0.5 text-[7px] font-bold uppercase text-white">
                                                            Revelado
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>

                                {ticketTerminado && (
                                    <div
                                        className={`mt-3 overflow-hidden rounded-xl border p-3 ${
                                            ticket.jackpot
                                                ? "border-fuchsia-400/50 bg-fuchsia-400/10"
                                                : ticket.ganado
                                                  ? "border-emerald-400/40 bg-emerald-400/5"
                                                  : "border-slate-700 bg-slate-950"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-1 text-3xl">
                                                {ticket.jackpot
                                                    ? "👑"
                                                    : ticket.bonus
                                                      ? "🎁"
                                                      : ticket.ganado
                                                        ? "🎉"
                                                        : "😔"}
                                            </div>

                                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
                                                Resultado
                                            </p>

                                            <h3 className="mt-0.5 text-base font-black">
                                                {
                                                    ticket.detalleResultado
                                                }
                                            </h3>

                                            {ticket.ganado && (
                                                <p className="mt-1 text-2xl font-black text-yellow-300">
                                                    +$
                                                    {ticket.premio.toLocaleString(
                                                        "es-AR",
                                                    )}
                                                </p>
                                            )}

                                            {ticket.tipoTicketId ===
                                                "numeros" && (
                                                <p className="mt-0.5 text-[9px] text-slate-400">
                                                    {
                                                        ticket.coincidencias
                                                            .length
                                                    }{" "}
                                                    coincidencia
                                                    {ticket.coincidencias
                                                        .length !==
                                                    1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {ticketTerminado && (
                                    <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                                        <button
                                            type="button"
                                            onClick={
                                                comprarOtro
                                            }
                                            className="flex items-center justify-center gap-1.5 rounded-lg bg-yellow-400 px-3 py-2.5 text-sm font-black text-slate-950 transition hover:bg-yellow-300"
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                            Comprar otro
                                        </button>

                                        <button
                                            type="button"
                                            onClick={
                                                volverAlListado
                                            }
                                            className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm font-black text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Volver al listado
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RaspaYGana;
