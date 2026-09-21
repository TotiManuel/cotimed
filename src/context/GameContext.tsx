import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { useAuth } from "./AuthContext";

/* =========================================================
   TIPOS
========================================================= */

export type ResultadoPartida =
    | "GANADA"
    | "PERDIDA"
    | "EMPATE";

export type TipoMovimiento =
    | "BONO"
    | "APUESTA"
    | "PREMIO"
    | "REEMBOLSO"
    | "AJUSTE"
    | "MISION"
    | "LOGRO"
    | "OTRO";

export interface GameRecord {
    id: string;
    juegoId: string;
    juegoNombre: string;
    resultado: ResultadoPartida;

    /**
     * Cantidad apostada.
     */
    apuesta: number;

    /**
     * Premio recibido.
     */
    premio: number;

    /**
     * Saldo antes de acreditar el premio.
     *
     * Importante:
     * La apuesta ya fue descontada mediante spendBalance().
     */
    saldoAntes: number;

    /**
     * Saldo después de acreditar el premio.
     */
    saldoDespues: number;

    /**
     * XP obtenida.
     */
    xpGanada: number;

    /**
     * Fecha ISO.
     */
    fecha: string;
}

export interface BalanceMovement {
    id: string;
    tipo: TipoMovimiento;
    concepto: string;
    cantidad: number;
    saldoAntes: number;
    saldoDespues: number;
    fecha: string;
}

export interface GameStats {
    partidas: number;
    victorias: number;
    derrotas: number;
    empates: number;

    rachaActual: number;
    mejorRacha: number;

    xp: number;

    /**
     * Total de créditos obtenidos
     * mediante premios.
     */
    totalGanado: number;

    /**
     * Total de créditos apostados.
     */
    totalApostado: number;

    /**
     * Partidas jugadas durante el día actual.
     */
    partidasHoy: number;

    /**
     * Victorias durante el día actual.
     */
    victoriasHoy: number;
}

export interface Achievement {
    id: string;
    titulo: string;
    descripcion: string;
    icono: string;

    desbloqueado: boolean;

    fechaDesbloqueo?: string;
}

export interface DailyMission {
    id: string;
    titulo: string;
    descripcion: string;

    objetivo: number;

    progreso: number;

    recompensa: number;

    /**
     * La misión llegó al objetivo.
     */
    completada: boolean;

    /**
     * La recompensa ya fue cobrada.
     */
    reclamada: boolean;
}

interface StoredGameData {
    saldo: number;
    stats: GameStats;
    history: GameRecord[];
    movements: BalanceMovement[];
    achievements: Achievement[];
    missions: DailyMission[];
    lastDailyBonus: string | null;
    lastMissionDate: string | null;
}

interface RecordGameData {
    juegoId: string;
    juegoNombre: string;
    resultado: ResultadoPartida;
    apuesta?: number;
    premio?: number;
}

interface GameContextType {
    /* =====================================================
       SALDO
    ===================================================== */

    saldo: number;

    addBalance: (
        amount: number,
        tipo?: TipoMovimiento,
        concepto?: string
    ) => void;

    spendBalance: (
        amount: number,
        concepto?: string
    ) => boolean;

    setBalance: (
        amount: number,
        concepto?: string
    ) => void;

    /* =====================================================
       ESTADÍSTICAS
    ===================================================== */

    stats: GameStats;

    nivel: number;

    xpActualNivel: number;

    xpParaSiguienteNivel: number;

    progresoNivel: number;

    porcentajeVictorias: number;

    /* =====================================================
       PARTIDAS
    ===================================================== */

    history: GameRecord[];

    recordGame: (
        data: RecordGameData
    ) => void;

    /* =====================================================
       MOVIMIENTOS
    ===================================================== */

    movements: BalanceMovement[];

    /* =====================================================
       BONO DIARIO
    ===================================================== */

    canClaimDailyBonus: boolean;

    dailyBonusAmount: number;

    claimDailyBonus: () => boolean;

    /* =====================================================
       MISIONES
    ===================================================== */

    missions: DailyMission[];

    claimMissionReward: (
        missionId: string
    ) => boolean;

    /* =====================================================
       LOGROS
    ===================================================== */

    achievements: Achievement[];

    /* =====================================================
       UTILIDADES
    ===================================================== */

    refreshGameData: () => void;

    resetGameData: () => void;
}

/* =========================================================
   CONTEXT
========================================================= */

const GameContext =
    createContext<GameContextType>(
        {} as GameContextType
    );

/* =========================================================
   CONSTANTES
========================================================= */

const STORAGE_PREFIX =
    "sala_juegos_data";

const XP_PER_LEVEL = 500;

const DAILY_BONUS = 250;

const MAX_HISTORY = 100;

const MAX_MOVEMENTS = 150;

/* =========================================================
   HELPERS
========================================================= */

const getTodayKey = (): string => {
    const date = new Date();

    const year =
        date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const generateId = (
    prefix: string
): string => {
    return `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 10)}`;
};

/* =========================================================
   ESTADÍSTICAS POR DEFECTO
========================================================= */

const createDefaultStats =
    (): GameStats => ({
        partidas: 0,
        victorias: 0,
        derrotas: 0,
        empates: 0,

        rachaActual: 0,
        mejorRacha: 0,

        xp: 0,

        totalGanado: 0,
        totalApostado: 0,

        partidasHoy: 0,
        victoriasHoy: 0,
    });

/* =========================================================
   LOGROS POR DEFECTO
========================================================= */

const createDefaultAchievements =
    (): Achievement[] => [
        {
            id: "primer-paso",
            titulo: "Primer paso",
            descripcion:
                "Jugá tu primera partida.",
            icono: "🎮",
            desbloqueado: false,
        },

        {
            id: "primera-victoria",
            titulo: "Primera victoria",
            descripcion:
                "Conseguí tu primera victoria.",
            icono: "🏆",
            desbloqueado: false,
        },

        {
            id: "cinco-partidas",
            titulo: "Jugador frecuente",
            descripcion:
                "Jugá 5 partidas.",
            icono: "🎯",
            desbloqueado: false,
        },

        {
            id: "diez-partidas",
            titulo: "Jugador habitual",
            descripcion:
                "Jugá 10 partidas.",
            icono: "🔥",
            desbloqueado: false,
        },

        {
            id: "racha-3",
            titulo: "En racha",
            descripcion:
                "Conseguí una racha de 3 victorias.",
            icono: "⚡",
            desbloqueado: false,
        },

        {
            id: "racha-5",
            titulo: "Imparable",
            descripcion:
                "Conseguí una racha de 5 victorias.",
            icono: "🚀",
            desbloqueado: false,
        },

        {
            id: "mil-ganados",
            titulo: "Primeros 1.000",
            descripcion:
                "Ganales 1.000 créditos a los juegos.",
            icono: "💰",
            desbloqueado: false,
        },

        {
            id: "nivel-5",
            titulo: "Nivel 5",
            descripcion:
                "Alcanzá el nivel 5.",
            icono: "⭐",
            desbloqueado: false,
        },

        {
            id: "nivel-10",
            titulo: "Nivel 10",
            descripcion:
                "Alcanzá el nivel 10.",
            icono: "👑",
            desbloqueado: false,
        },
    ];

/* =========================================================
   MISIONES POR DEFECTO
========================================================= */

const createDefaultMissions =
    (): DailyMission[] => [
        {
            id: "jugar-3",
            titulo: "Tres partidas",
            descripcion:
                "Jugá 3 partidas hoy.",
            objetivo: 3,
            progreso: 0,
            recompensa: 100,
            completada: false,
            reclamada: false,
        },

        {
            id: "ganar-2",
            titulo: "Dos victorias",
            descripcion:
                "Conseguí 2 victorias hoy.",
            objetivo: 2,
            progreso: 0,
            recompensa: 150,
            completada: false,
            reclamada: false,
        },

        {
            id: "jugar-5",
            titulo: "Jugador activo",
            descripcion:
                "Jugá 5 partidas hoy.",
            objetivo: 5,
            progreso: 0,
            recompensa: 250,
            completada: false,
            reclamada: false,
        },
    ];

/* =========================================================
   STORAGE
========================================================= */

const getStorageKey = (
    userId: number
): string => {
    return `${STORAGE_PREFIX}_${userId}`;
};

const createDefaultData = (
    initialBalance = 1000
): StoredGameData => ({
    saldo: initialBalance,

    stats: createDefaultStats(),

    history: [],

    movements: [],

    achievements:
        createDefaultAchievements(),

    missions:
        createDefaultMissions(),

    lastDailyBonus: null,

    lastMissionDate:
        getTodayKey(),
});

/* =========================================================
   CARGAR DATOS
========================================================= */

const loadGameData = (
    userId: number,
    initialBalance: number
): StoredGameData => {
    const key =
        getStorageKey(userId);

    const saved =
        localStorage.getItem(key);

    if (!saved) {
        return createDefaultData(
            initialBalance
        );
    }

    try {
        const parsed =
            JSON.parse(saved) as Partial<StoredGameData>;

        const defaultStats =
            createDefaultStats();

        const defaultAchievements =
            createDefaultAchievements();

        const defaultMissions =
            createDefaultMissions();

        return {
            saldo:
                typeof parsed.saldo ===
                "number"
                    ? Math.max(
                          0,
                          parsed.saldo
                      )
                    : initialBalance,

            stats: {
                ...defaultStats,
                ...(parsed.stats ?? {}),
            },

            history:
                Array.isArray(
                    parsed.history
                )
                    ? parsed.history
                    : [],

            movements:
                Array.isArray(
                    parsed.movements
                )
                    ? parsed.movements
                    : [],

            achievements:
                Array.isArray(
                    parsed.achievements
                ) &&
                parsed.achievements
                    .length > 0
                    ? parsed.achievements
                    : defaultAchievements,

            missions:
                Array.isArray(
                    parsed.missions
                ) &&
                parsed.missions.length > 0
                    ? parsed.missions
                    : defaultMissions,

            lastDailyBonus:
                typeof parsed.lastDailyBonus ===
                "string"
                    ? parsed.lastDailyBonus
                    : null,

            lastMissionDate:
                typeof parsed.lastMissionDate ===
                "string"
                    ? parsed.lastMissionDate
                    : getTodayKey(),
        };
    } catch {
        return createDefaultData(
            initialBalance
        );
    }
};

/* =========================================================
   PROVIDER
========================================================= */

export const GameProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { user } = useAuth();

    const userId =
        user?.id ?? null;

    const [gameData, setGameData] =
        useState<StoredGameData | null>(
            null
        );

    /* =====================================================
       CARGAR DATOS DEL USUARIO
    ===================================================== */

    const refreshGameData =
        useCallback(() => {
            if (!userId || !user) {
                setGameData(null);
                return;
            }

            const initialBalance =
                typeof user.saldo ===
                "number"
                    ? user.saldo
                    : 1000;

            const loadedData =
                loadGameData(
                    userId,
                    initialBalance
                );

            setGameData(
                loadedData
            );
        }, [userId, user]);

    useEffect(() => {
        refreshGameData();
    }, [refreshGameData]);

    /* =====================================================
       GUARDAR AUTOMÁTICAMENTE
    ===================================================== */

    useEffect(() => {
        if (
            !userId ||
            !gameData
        ) {
            return;
        }

        localStorage.setItem(
            getStorageKey(userId),
            JSON.stringify(
                gameData
            )
        );
    }, [
        userId,
        gameData,
    ]);

    /* =====================================================
       DATOS DISPONIBLES
    ===================================================== */

    const data =
        gameData ??
        createDefaultData(
            typeof user?.saldo ===
                "number"
                ? user.saldo
                : 1000
        );

    /* =====================================================
       AGREGAR SALDO
    ===================================================== */

    const addBalance =
        useCallback(
            (
                amount: number,
                tipo: TipoMovimiento =
                    "OTRO",
                concepto =
                    "Créditos agregados"
            ) => {
                if (
                    !Number.isFinite(
                        amount
                    ) ||
                    amount <= 0
                ) {
                    return;
                }

                setGameData(
                    (current) => {
                        if (!current) {
                            return current;
                        }

                        const saldoAntes =
                            current.saldo;

                        const saldoDespues =
                            saldoAntes +
                            amount;

                        const movement: BalanceMovement =
                            {
                                id: generateId(
                                    "mov"
                                ),
                                tipo,
                                concepto,
                                cantidad:
                                    amount,
                                saldoAntes,
                                saldoDespues,
                                fecha: new Date().toISOString(),
                            };

                        return {
                            ...current,

                            saldo:
                                saldoDespues,

                            movements: [
                                movement,
                                ...current.movements,
                            ].slice(
                                0,
                                MAX_MOVEMENTS
                            ),
                        };
                    }
                );
            },
            []
        );

    /* =====================================================
       GASTAR SALDO
       
       IMPORTANTE:
       Se calcula usando gameData actual para que
       la función pueda devolver correctamente true/false.
    ===================================================== */

    const spendBalance =
        useCallback(
            (
                amount: number,
                concepto =
                    "Apuesta"
            ): boolean => {
                if (
                    !Number.isFinite(
                        amount
                    ) ||
                    amount <= 0
                ) {
                    return false;
                }

                if (!gameData) {
                    return false;
                }

                if (
                    gameData.saldo <
                    amount
                ) {
                    return false;
                }

                const saldoAntes =
                    gameData.saldo;

                const saldoDespues =
                    saldoAntes -
                    amount;

                const movement: BalanceMovement =
                    {
                        id: generateId(
                            "mov"
                        ),
                        tipo: "APUESTA",
                        concepto,
                        cantidad:
                            -amount,
                        saldoAntes,
                        saldoDespues,
                        fecha: new Date().toISOString(),
                    };

                setGameData(
                    (current) => {
                        if (!current) {
                            return current;
                        }

                        /*
                         * Volvemos a comprobar el saldo
                         * por seguridad.
                         */
                        if (
                            current.saldo <
                            amount
                        ) {
                            return current;
                        }

                        const actualSaldoAntes =
                            current.saldo;

                        const actualSaldoDespues =
                            actualSaldoAntes -
                            amount;

                        const actualMovement: BalanceMovement =
                            {
                                ...movement,
                                saldoAntes:
                                    actualSaldoAntes,
                                saldoDespues:
                                    actualSaldoDespues,
                            };

                        return {
                            ...current,

                            saldo:
                                actualSaldoDespues,

                            movements: [
                                actualMovement,
                                ...current.movements,
                            ].slice(
                                0,
                                MAX_MOVEMENTS
                            ),
                        };
                    }
                );

                return true;
            },
            [gameData]
        );

    /* =====================================================
       SET BALANCE
    ===================================================== */

    const setBalance =
        useCallback(
            (
                amount: number,
                concepto =
                    "Ajuste de saldo"
            ) => {
                if (
                    !Number.isFinite(
                        amount
                    ) ||
                    amount < 0
                ) {
                    return;
                }

                setGameData(
                    (current) => {
                        if (!current) {
                            return current;
                        }

                        const saldoAntes =
                            current.saldo;

                        const diferencia =
                            amount -
                            saldoAntes;

                        if (
                            diferencia ===
                            0
                        ) {
                            return current;
                        }

                        const movement: BalanceMovement =
                            {
                                id: generateId(
                                    "mov"
                                ),
                                tipo: "AJUSTE",
                                concepto,
                                cantidad:
                                    diferencia,
                                saldoAntes,
                                saldoDespues:
                                    amount,
                                fecha: new Date().toISOString(),
                            };

                        return {
                            ...current,

                            saldo: amount,

                            movements: [
                                movement,
                                ...current.movements,
                            ].slice(
                                0,
                                MAX_MOVEMENTS
                            ),
                        };
                    }
                );
            },
            []
        );

    /* =====================================================
       REGISTRAR PARTIDA
       
       La apuesta ya fue descontada mediante
       spendBalance().
       
       Acá acreditamos el premio.
    ===================================================== */

    const recordGame =
        useCallback(
            ({
                juegoId,
                juegoNombre,
                resultado,
                apuesta = 0,
                premio = 0,
            }: RecordGameData) => {
                setGameData(
                    (current) => {
                        if (!current) {
                            return current;
                        }

                        const premioSeguro =
                            Number.isFinite(
                                premio
                            ) &&
                            premio > 0
                                ? premio
                                : 0;

                        const apuestaSegura =
                            Number.isFinite(
                                apuesta
                            ) &&
                            apuesta > 0
                                ? apuesta
                                : 0;

                        /*
                         * El saldo actual ya tiene descontada
                         * la apuesta.
                         *
                         * Ahora agregamos el premio.
                         */
                        const saldoAntes =
                            current.saldo;

                        const saldoDespues =
                            saldoAntes +
                            premioSeguro;

                        let xpGanada = 10;

                        if (
                            resultado ===
                            "GANADA"
                        ) {
                            xpGanada =
                                50;
                        } else if (
                            resultado ===
                            "EMPATE"
                        ) {
                            xpGanada =
                                25;
                        }

                        const newRecord: GameRecord =
                            {
                                id: generateId(
                                    "game"
                                ),

                                juegoId,

                                juegoNombre,

                                resultado,

                                apuesta:
                                    apuestaSegura,

                                premio:
                                    premioSeguro,

                                saldoAntes,

                                saldoDespues,

                                xpGanada,

                                fecha: new Date().toISOString(),
                            };

                        const oldStats =
                            current.stats;

                        /* =================================
                           RACHA
                        ================================= */

                        let rachaActual =
                            oldStats.rachaActual;

                        if (
                            resultado ===
                            "GANADA"
                        ) {
                            rachaActual +=
                                1;
                        } else if (
                            resultado ===
                            "PERDIDA"
                        ) {
                            rachaActual = 0;
                        }

                        const mejorRacha =
                            Math.max(
                                oldStats.mejorRacha,
                                rachaActual
                            );

                        /* =================================
                           ESTADÍSTICAS DIARIAS
                        ================================= */

                        const partidasHoy =
                            oldStats.partidasHoy +
                            1;

                        const victoriasHoy =
                            oldStats.victoriasHoy +
                            (resultado ===
                            "GANADA"
                                ? 1
                                : 0);

                        /* =================================
                           NUEVAS ESTADÍSTICAS
                        ================================= */

                        const newStats: GameStats =
                            {
                                ...oldStats,

                                partidas:
                                    oldStats.partidas +
                                    1,

                                victorias:
                                    oldStats.victorias +
                                    (resultado ===
                                    "GANADA"
                                        ? 1
                                        : 0),

                                derrotas:
                                    oldStats.derrotas +
                                    (resultado ===
                                    "PERDIDA"
                                        ? 1
                                        : 0),

                                empates:
                                    oldStats.empates +
                                    (resultado ===
                                    "EMPATE"
                                        ? 1
                                        : 0),

                                rachaActual,

                                mejorRacha,

                                xp:
                                    oldStats.xp +
                                    xpGanada,

                                totalGanado:
                                    oldStats.totalGanado +
                                    premioSeguro,

                                totalApostado:
                                    oldStats.totalApostado +
                                    apuestaSegura,

                                partidasHoy,

                                victoriasHoy,
                            };

                        /* =================================
                           MOVIMIENTO DEL PREMIO
                        ================================= */

                        const movements =
                            [
                                ...current.movements,
                            ];

                        if (
                            premioSeguro >
                            0
                        ) {
                            movements.unshift(
                                {
                                    id: generateId(
                                        "premio"
                                    ),

                                    tipo: "PREMIO",

                                    concepto:
                                        `Premio: ${juegoNombre}`,

                                    cantidad:
                                        premioSeguro,

                                    saldoAntes,

                                    saldoDespues,

                                    fecha: new Date().toISOString(),
                                }
                            );
                        }

                        /* =================================
                           LOGROS
                        ================================= */

                        const achievements =
                            current.achievements.map(
                                (
                                    achievement
                                ) => {
                                    if (
                                        achievement.desbloqueado
                                    ) {
                                        return achievement;
                                    }

                                    let unlocked =
                                        false;

                                    switch (
                                        achievement.id
                                    ) {
                                        case "primer-paso":
                                            unlocked =
                                                newStats.partidas >=
                                                1;
                                            break;

                                        case "primera-victoria":
                                            unlocked =
                                                newStats.victorias >=
                                                1;
                                            break;

                                        case "cinco-partidas":
                                            unlocked =
                                                newStats.partidas >=
                                                5;
                                            break;

                                        case "diez-partidas":
                                            unlocked =
                                                newStats.partidas >=
                                                10;
                                            break;

                                        case "racha-3":
                                            unlocked =
                                                newStats.mejorRacha >=
                                                3;
                                            break;

                                        case "racha-5":
                                            unlocked =
                                                newStats.mejorRacha >=
                                                5;
                                            break;

                                        case "mil-ganados":
                                            unlocked =
                                                newStats.totalGanado >=
                                                1000;
                                            break;

                                        case "nivel-5":
                                            unlocked =
                                                Math.floor(
                                                    newStats.xp /
                                                        XP_PER_LEVEL
                                                ) +
                                                    1 >=
                                                5;
                                            break;

                                        case "nivel-10":
                                            unlocked =
                                                Math.floor(
                                                    newStats.xp /
                                                        XP_PER_LEVEL
                                                ) +
                                                    1 >=
                                                10;
                                            break;

                                        default:
                                            break;
                                    }

                                    if (
                                        unlocked
                                    ) {
                                        return {
                                            ...achievement,

                                            desbloqueado:
                                                true,

                                            fechaDesbloqueo:
                                                new Date().toISOString(),
                                        };
                                    }

                                    return achievement;
                                }
                            );

                        /* =================================
                           MISIONES
                        ================================= */

                        const missions =
                            current.missions.map(
                                (
                                    mission
                                ) => {
                                    let progreso =
                                        mission.progreso;

                                    if (
                                        mission.id ===
                                        "jugar-3"
                                    ) {
                                        progreso =
                                            newStats.partidasHoy;
                                    }

                                    if (
                                        mission.id ===
                                        "ganar-2"
                                    ) {
                                        progreso =
                                            newStats.victoriasHoy;
                                    }

                                    if (
                                        mission.id ===
                                        "jugar-5"
                                    ) {
                                        progreso =
                                            newStats.partidasHoy;
                                    }

                                    progreso =
                                        Math.min(
                                            progreso,
                                            mission.objetivo
                                        );

                                    return {
                                        ...mission,

                                        progreso,

                                        completada:
                                            progreso >=
                                            mission.objetivo,
                                    };
                                }
                            );

                        return {
                            ...current,

                            /*
                             * ACÁ está la corrección importante:
                             * el premio sí entra al saldo.
                             */
                            saldo:
                                saldoDespues,

                            stats:
                                newStats,

                            history: [
                                newRecord,
                                ...current.history,
                            ].slice(
                                0,
                                MAX_HISTORY
                            ),

                            movements:
                                movements.slice(
                                    0,
                                    MAX_MOVEMENTS
                                ),

                            achievements,

                            missions,
                        };
                    }
                );
            },
            []
        );

    /* =====================================================
       BONO DIARIO
    ===================================================== */

    const canClaimDailyBonus =
        data.lastDailyBonus !==
        getTodayKey();

    const claimDailyBonus =
        useCallback((): boolean => {
            if (
                !gameData ||
                !canClaimDailyBonus
            ) {
                return false;
            }

            const today =
                getTodayKey();

            if (
                gameData.lastDailyBonus ===
                today
            ) {
                return false;
            }

            setGameData(
                (current) => {
                    if (!current) {
                        return current;
                    }

                    if (
                        current.lastDailyBonus ===
                        today
                    ) {
                        return current;
                    }

                    const saldoAntes =
                        current.saldo;

                    const saldoDespues =
                        saldoAntes +
                        DAILY_BONUS;

                    const movement: BalanceMovement =
                        {
                            id: generateId(
                                "bonus"
                            ),

                            tipo: "BONO",

                            concepto:
                                "Bono diario",

                            cantidad:
                                DAILY_BONUS,

                            saldoAntes,

                            saldoDespues,

                            fecha: new Date().toISOString(),
                        };

                    return {
                        ...current,

                        saldo:
                            saldoDespues,

                        lastDailyBonus:
                            today,

                        movements: [
                            movement,
                            ...current.movements,
                        ].slice(
                            0,
                            MAX_MOVEMENTS
                        ),
                    };
                }
            );

            return true;
        }, [
            gameData,
            canClaimDailyBonus,
        ]);

    /* =====================================================
       REINICIAR ESTADÍSTICAS DIARIAS
    ===================================================== */

    useEffect(() => {
        if (!gameData) {
            return;
        }

        const today =
            getTodayKey();

        if (
            gameData.lastMissionDate ===
            today
        ) {
            return;
        }

        setGameData(
            (current) => {
                if (!current) {
                    return current;
                }

                return {
                    ...current,

                    lastMissionDate:
                        today,

                    missions:
                        createDefaultMissions(),

                    stats: {
                        ...current.stats,

                        partidasHoy:
                            0,

                        victoriasHoy:
                            0,
                    },
                };
            }
        );
    }, [gameData]);

    /* =====================================================
       RECLAMAR RECOMPENSA DE MISIÓN
    ===================================================== */

    const claimMissionReward =
        useCallback(
            (
                missionId: string
            ): boolean => {
                if (!gameData) {
                    return false;
                }

                const mission =
                    gameData.missions.find(
                        (item) =>
                            item.id ===
                            missionId
                    );

                if (
                    !mission ||
                    !mission.completada ||
                    mission.reclamada
                ) {
                    return false;
                }

                setGameData(
                    (current) => {
                        if (!current) {
                            return current;
                        }

                        const currentMission =
                            current.missions.find(
                                (item) =>
                                    item.id ===
                                    missionId
                            );

                        if (
                            !currentMission ||
                            !currentMission.completada ||
                            currentMission.reclamada
                        ) {
                            return current;
                        }

                        const saldoAntes =
                            current.saldo;

                        const saldoDespues =
                            saldoAntes +
                            currentMission.recompensa;

                        const movement: BalanceMovement =
                            {
                                id: generateId(
                                    "mission"
                                ),

                                tipo: "MISION",

                                concepto:
                                    `Misión: ${currentMission.titulo}`,

                                cantidad:
                                    currentMission.recompensa,

                                saldoAntes,

                                saldoDespues,

                                fecha: new Date().toISOString(),
                            };

                        const missions =
                            current.missions.map(
                                (
                                    item
                                ) =>
                                    item.id ===
                                    missionId
                                        ? {
                                              ...item,
                                              reclamada:
                                                  true,
                                          }
                                        : item
                            );

                        return {
                            ...current,

                            saldo:
                                saldoDespues,

                            missions,

                            movements: [
                                movement,
                                ...current.movements,
                            ].slice(
                                0,
                                MAX_MOVEMENTS
                            ),
                        };
                    }
                );

                return true;
            },
            [gameData]
        );

    /* =====================================================
       RESET COMPLETO
    ===================================================== */

    const resetGameData =
        useCallback(() => {
            if (!userId) {
                return;
            }

            const initialBalance =
                typeof user?.saldo ===
                "number"
                    ? user.saldo
                    : 1000;

            const freshData =
                createDefaultData(
                    initialBalance
                );

            localStorage.setItem(
                getStorageKey(
                    userId
                ),
                JSON.stringify(
                    freshData
                )
            );

            setGameData(
                freshData
            );
        }, [
            userId,
            user,
        ]);

    /* =====================================================
       CÁLCULOS
    ===================================================== */

    const nivel =
        Math.floor(
            data.stats.xp /
                XP_PER_LEVEL
        ) + 1;

    const xpActualNivel =
        data.stats.xp %
        XP_PER_LEVEL;

    const xpParaSiguienteNivel =
        XP_PER_LEVEL -
        xpActualNivel;

    const progresoNivel =
        (xpActualNivel /
            XP_PER_LEVEL) *
        100;

    const porcentajeVictorias =
        data.stats.partidas >
        0
            ? Math.round(
                  (data.stats.victorias /
                      data.stats.partidas) *
                      100
              )
            : 0;

    /* =====================================================
       VALUE
    ===================================================== */

    const value =
        useMemo<GameContextType>(
            () => ({
                /* SALDO */

                saldo: data.saldo,

                addBalance,

                spendBalance,

                setBalance,

                /* ESTADÍSTICAS */

                stats: data.stats,

                nivel,

                xpActualNivel,

                xpParaSiguienteNivel,

                progresoNivel,

                porcentajeVictorias,

                /* PARTIDAS */

                history:
                    data.history,

                recordGame,

                /* MOVIMIENTOS */

                movements:
                    data.movements,

                /* BONO */

                canClaimDailyBonus,

                dailyBonusAmount:
                    DAILY_BONUS,

                claimDailyBonus,

                /* MISIONES */

                missions:
                    data.missions,

                claimMissionReward,

                /* LOGROS */

                achievements:
                    data.achievements,

                /* UTILIDADES */

                refreshGameData,

                resetGameData,
            }),
            [
                data,

                addBalance,

                spendBalance,

                setBalance,

                nivel,

                xpActualNivel,

                xpParaSiguienteNivel,

                progresoNivel,

                porcentajeVictorias,

                recordGame,

                canClaimDailyBonus,

                claimDailyBonus,

                claimMissionReward,

                refreshGameData,

                resetGameData,
            ]
        );

    /* =====================================================
       PROVIDER
    ===================================================== */

    return (
        <GameContext.Provider
            value={value}
        >
            {children}
        </GameContext.Provider>
    );
};

/* =========================================================
   HOOK
========================================================= */

export const useGame = () => {
    const context =
        useContext(
            GameContext
        );

    if (!context) {
        throw new Error(
            "useGame debe utilizarse dentro de <GameProvider>."
        );
    }

    return context;
};

export default GameContext; 