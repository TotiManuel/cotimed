import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Check,
    Crown,
    Minus,
    Plus,
    RotateCcw,
    Sparkles,
    Trophy,
    X,
} from "lucide-react";

import { useGame } from "../../context/GameContext";

type Suit = "♠" | "♥" | "♦" | "♣";

type Rank =
    | "A"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "J"
    | "Q"
    | "K";

type Card = {
    id: string;
    suit: Suit;
    rank: Rank;
    hidden?: boolean;
};

type GameStatus =
    | "ESPERANDO"
    | "JUGANDO"
    | "DEALER"
    | "GANADA"
    | "PERDIDA"
    | "EMPATE"
    | "BLACKJACK"
    | "BUST";

const GAME_ID = "21";
const GAME_NAME = "21";

const MIN_BET = 10;
const BET_STEP = 10;
const MAX_BET = 1000;

const BLACKJACK_MULTIPLIER = 2.5;
const NORMAL_WIN_MULTIPLIER = 2;

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];

const RANKS: Rank[] = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

function formatCredits(value: number) {
    return `${Math.round(value).toLocaleString("es-AR")} créditos`;
}

function isRedSuit(suit: Suit) {
    return suit === "♥" || suit === "♦";
}

function shuffleDeck(cards: Card[]) {
    const deck = [...cards];

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

function createDeck(): Card[] {
    return shuffleDeck(
        SUITS.flatMap((suit) =>
            RANKS.map((rank) => ({
                id: `${suit}-${rank}-${Math.random()
                    .toString(36)
                    .slice(2)}`,
                suit,
                rank,
            })),
        ),
    );
}

function getCardValue(rank: Rank) {
    if (rank === "A") return 11;

    if (["K", "Q", "J"].includes(rank)) {
        return 10;
    }

    return Number(rank);
}

function calculateHand(hand: Card[]) {
    let total = 0;
    let aces = 0;

    for (const card of hand) {
        total += getCardValue(card.rank);

        if (card.rank === "A") {
            aces++;
        }
    }

    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return {
        total,
        soft: aces > 0,
    };
}

function isBlackjack(hand: Card[]) {
    return hand.length === 2 && calculateHand(hand).total === 21;
}

function PlayingCard({
    card,
    index,
}: {
    card: Card;
    index: number;
}) {
    if (card.hidden) {
        return (
            <div
                className="relative flex h-24 w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-white/20 bg-slate-900 shadow-lg sm:h-28 sm:w-20"
                style={{
                    animationDelay: `${index * 60}ms`,
                }}
            >
                <div className="absolute inset-1.5 rounded-md border border-white/10 bg-slate-800" />

                <div className="relative text-xl font-black text-white/20">
                    21
                </div>
            </div>
        );
    }

    const red = isRedSuit(card.suit);

    return (
        <div
            className="card-in relative flex h-24 w-[68px] shrink-0 flex-col justify-between rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg sm:h-28 sm:w-20 sm:p-2"
            style={{
                animationDelay: `${index * 60}ms`,
            }}
        >
            <div
                className={`text-base font-black leading-none sm:text-lg ${
                    red ? "text-red-500" : "text-slate-900"
                }`}
            >
                {card.rank}
            </div>

            <div
                className={`text-center text-2xl leading-none sm:text-3xl ${
                    red ? "text-red-500" : "text-slate-900"
                }`}
            >
                {card.suit}
            </div>

            <div
                className={`rotate-180 text-base font-black leading-none sm:text-lg ${
                    red ? "text-red-500" : "text-slate-900"
                }`}
            >
                {card.rank}
            </div>
        </div>
    );
}

export default function Juego21() {
    const {
        saldo,
        spendBalance,
        recordGame,
    } = useGame();

    const [deck, setDeck] = useState<Card[]>([]);
    const [playerHand, setPlayerHand] = useState<Card[]>([]);
    const [dealerHand, setDealerHand] = useState<Card[]>([]);

    const [bet, setBet] = useState(MIN_BET);

    const [status, setStatus] =
        useState<GameStatus>("ESPERANDO");

    const [message, setMessage] = useState(
        "Elegí tu apuesta y comenzá una partida.",
    );

    const [isResolving, setIsResolving] = useState(false);
    const [lastPrize, setLastPrize] = useState(0);

    const playerResult = useMemo(
        () => calculateHand(playerHand),
        [playerHand],
    );

    const dealerVisibleHand = useMemo(
        () => dealerHand.filter((card) => !card.hidden),
        [dealerHand],
    );

    const dealerResult = useMemo(
        () => calculateHand(dealerVisibleHand),
        [dealerVisibleHand],
    );

    const maximumBet = useMemo(
        () =>
            Math.min(
                MAX_BET,
                Math.floor(saldo / BET_STEP) * BET_STEP,
            ),
        [saldo],
    );

    const isPlaying = status === "JUGANDO";

    const isFinished = [
        "GANADA",
        "PERDIDA",
        "EMPATE",
        "BLACKJACK",
        "BUST",
    ].includes(status);

    useEffect(() => {
        if (isPlaying || status === "DEALER") return;

        if (saldo < bet) {
            setBet(
                Math.max(
                    MIN_BET,
                    Math.min(
                        maximumBet || MIN_BET,
                        MAX_BET,
                    ),
                ),
            );
        }
    }, [
        saldo,
        bet,
        maximumBet,
        isPlaying,
        status,
    ]);

    const decreaseBet = useCallback(() => {
        if (isPlaying || isResolving) return;

        setBet((current) =>
            Math.max(MIN_BET, current - BET_STEP),
        );
    }, [isPlaying, isResolving]);

    const increaseBet = useCallback(() => {
        if (isPlaying || isResolving) return;

        setBet((current) =>
            Math.min(
                MAX_BET,
                maximumBet,
                current + BET_STEP,
            ),
        );
    }, [
        isPlaying,
        isResolving,
        maximumBet,
    ]);

    const maxBet = useCallback(() => {
        if (isPlaying || isResolving) return;

        const available = Math.min(
            MAX_BET,
            Math.floor(saldo / BET_STEP) * BET_STEP,
        );

        if (available >= MIN_BET) {
            setBet(available);
        }
    }, [saldo, isPlaying, isResolving]);

    const registerResult = useCallback(
        (
            result:
                | "GANADA"
                | "PERDIDA"
                | "EMPATE",
            wager: number,
        ) => {
            let prize = 0;
            let finalStatus: GameStatus = result;

            if (result === "GANADA") {
                if (isBlackjack(playerHand)) {
                    prize = Math.round(
                        wager * BLACKJACK_MULTIPLIER,
                    );

                    finalStatus = "BLACKJACK";
                } else {
                    prize = Math.round(
                        wager * NORMAL_WIN_MULTIPLIER,
                    );
                }
            }

            if (result === "EMPATE") {
                prize = wager;
            }

            setLastPrize(prize);
            setStatus(finalStatus);

            if (finalStatus === "BLACKJACK") {
                setMessage("¡Blackjack! 21 natural.");
            } else if (result === "GANADA") {
                setMessage("¡Ganaste la partida!");
            } else if (result === "EMPATE") {
                setMessage(
                    "Empate. Se devuelve tu apuesta.",
                );
            } else {
                setMessage("La casa gana esta mano.");
            }

            /*
             * GameContext no acepta BLACKJACK como
             * ResultadoPartida. Se registra como GANADA,
             * mientras la interfaz mantiene BLACKJACK.
             */
            recordGame({
                juegoId: GAME_ID,
                juegoNombre: GAME_NAME,
                resultado: result,
                apuesta: wager,
                premio: prize,
            });
        },
        [playerHand, recordGame],
    );

    const resolveHands = useCallback(
        (
            currentPlayer: Card[],
            currentDealer: Card[],
            wager: number,
        ) => {
            const player = calculateHand(currentPlayer);
            const dealer = calculateHand(currentDealer);

            if (player.total > 21) {
                setStatus("BUST");
                setMessage("Te pasaste de 21.");
                setLastPrize(0);

                recordGame({
                    juegoId: GAME_ID,
                    juegoNombre: GAME_NAME,
                    resultado: "PERDIDA",
                    apuesta: wager,
                    premio: 0,
                });

                return;
            }

            if (dealer.total > 21) {
                registerResult("GANADA", wager);
                return;
            }

            if (player.total > dealer.total) {
                registerResult("GANADA", wager);
                return;
            }

            if (player.total < dealer.total) {
                registerResult("PERDIDA", wager);
                return;
            }

            registerResult("EMPATE", wager);
        },
        [recordGame, registerResult],
    );

    const playDealerTurn = useCallback(
        (
            initialDeck: Card[],
            initialDealer: Card[],
            currentPlayer: Card[],
            wager: number,
        ) => {
            let workingDeck = [...initialDeck];
            let workingHand = [...initialDealer];

            const drawDealerCard = () => {
                const nextCard = workingDeck.shift();

                if (!nextCard) {
                    resolveHands(
                        currentPlayer,
                        workingHand,
                        wager,
                    );

                    setIsResolving(false);
                    return;
                }

                workingHand = [
                    ...workingHand.map((card) => ({
                        ...card,
                        hidden: false,
                    })),
                    {
                        ...nextCard,
                        hidden: false,
                    },
                ];

                setDealerHand(workingHand);
                setDeck(workingDeck);

                const result =
                    calculateHand(workingHand);

                if (
                    result.total < 17 ||
                    (result.total === 17 &&
                        result.soft)
                ) {
                    setTimeout(drawDealerCard, 500);
                    return;
                }

                setTimeout(() => {
                    resolveHands(
                        currentPlayer,
                        workingHand,
                        wager,
                    );

                    setIsResolving(false);
                }, 500);
            };

            const revealed = workingHand.map(
                (card) => ({
                    ...card,
                    hidden: false,
                }),
            );

            workingHand = revealed;

            setDealerHand(revealed);
            setDeck(workingDeck);

            const result =
                calculateHand(revealed);

            if (
                result.total < 17 ||
                (result.total === 17 &&
                    result.soft)
            ) {
                setTimeout(drawDealerCard, 500);
            } else {
                setTimeout(() => {
                    resolveHands(
                        currentPlayer,
                        revealed,
                        wager,
                    );

                    setIsResolving(false);
                }, 500);
            }
        },
        [resolveHands],
    );

    const stand = useCallback(() => {
        if (!isPlaying || isResolving) return;

        setIsResolving(true);
        setStatus("DEALER");
        setMessage("La casa está jugando...");

        playDealerTurn(
            deck,
            dealerHand,
            playerHand,
            bet,
        );
    }, [
        isPlaying,
        isResolving,
        deck,
        dealerHand,
        playerHand,
        bet,
        playDealerTurn,
    ]);

    const hit = useCallback(() => {
        if (!isPlaying || isResolving) return;

        const nextCard = deck[0];

        if (!nextCard) return;

        const remainingDeck = deck.slice(1);

        const newPlayerHand = [
            ...playerHand,
            {
                ...nextCard,
                hidden: false,
            },
        ];

        setDeck(remainingDeck);
        setPlayerHand(newPlayerHand);

        const result =
            calculateHand(newPlayerHand);

        if (result.total > 21) {
            setStatus("BUST");
            setMessage("Te pasaste de 21.");
            setLastPrize(0);

            recordGame({
                juegoId: GAME_ID,
                juegoNombre: GAME_NAME,
                resultado: "PERDIDA",
                apuesta: bet,
                premio: 0,
            });

            return;
        }

        if (result.total === 21) {
            setIsResolving(true);
            setStatus("DEALER");
            setMessage("21. La casa está jugando...");

            playDealerTurn(
                remainingDeck,
                dealerHand,
                newPlayerHand,
                bet,
            );
        }
    }, [
        isPlaying,
        isResolving,
        deck,
        playerHand,
        dealerHand,
        bet,
        recordGame,
        playDealerTurn,
    ]);

    const startGame = useCallback(() => {
        if (
            isPlaying ||
            isResolving ||
            bet < MIN_BET ||
            bet > saldo
        ) {
            return;
        }

        const newDeck = createDeck();

        const firstPlayer = newDeck[0];
        const firstDealer = newDeck[1];
        const secondPlayer = newDeck[2];
        const secondDealer = newDeck[3];

        if (
            !firstPlayer ||
            !firstDealer ||
            !secondPlayer ||
            !secondDealer
        ) {
            return;
        }

        const remainingDeck = newDeck.slice(4);

        const newPlayerHand = [
            firstPlayer,
            secondPlayer,
        ];

        const newDealerHand = [
            {
                ...firstDealer,
                hidden: false,
            },
            {
                ...secondDealer,
                hidden: true,
            },
        ];

        const spent = spendBalance(
            bet,
            `Apuesta ${GAME_NAME}`,
        );

        if (!spent) return;

        setDeck(remainingDeck);
        setPlayerHand(newPlayerHand);
        setDealerHand(newDealerHand);
        setLastPrize(0);
        setStatus("JUGANDO");
        setMessage("Elegí carta o plantate.");

        if (isBlackjack(newPlayerHand)) {
            const revealedDealer =
                newDealerHand.map((card) => ({
                    ...card,
                    hidden: false,
                }));

            setDealerHand(revealedDealer);
            setIsResolving(true);
            setStatus("DEALER");
            setMessage(
                "Blackjack. Revelando la casa...",
            );

            setTimeout(() => {
                const dealerIsBlackjack =
                    isBlackjack(revealedDealer);

                if (dealerIsBlackjack) {
                    registerResult("EMPATE", bet);
                } else {
                    registerResult("GANADA", bet);
                }

                setIsResolving(false);
            }, 500);
        }
    }, [
        isPlaying,
        isResolving,
        bet,
        saldo,
        spendBalance,
        registerResult,
    ]);

    const newGame = useCallback(() => {
        if (isPlaying || isResolving) return;

        setPlayerHand([]);
        setDealerHand([]);
        setDeck([]);
        setLastPrize(0);
        setStatus("ESPERANDO");
        setMessage(
            "Elegí tu apuesta y comenzá una partida.",
        );
    }, [isPlaying, isResolving]);

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (
                event.target instanceof
                HTMLInputElement
            ) {
                return;
            }

            if (event.key === "Enter") {
                if (!isPlaying && !isFinished) {
                    startGame();
                }
            }

            if (event.code === "Space") {
                event.preventDefault();

                if (isPlaying) {
                    hit();
                }
            }

            if (
                event.key.toLowerCase() === "s" &&
                isPlaying
            ) {
                stand();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
    }, [
        isPlaying,
        isFinished,
        startGame,
        hit,
        stand,
    ]);

    const statusConfig: Record<
        GameStatus,
        {
            label: string;
            className: string;
        }
    > = {
        ESPERANDO: {
            label: "LISTO",
            className:
                "bg-white/10 text-white/70",
        },
        JUGANDO: {
            label: "JUGANDO",
            className:
                "bg-amber-400/15 text-amber-200",
        },
        DEALER: {
            label: "CASA",
            className:
                "bg-blue-400/15 text-blue-200",
        },
        GANADA: {
            label: "GANASTE",
            className:
                "bg-emerald-400/15 text-emerald-200",
        },
        BLACKJACK: {
            label: "BLACKJACK",
            className:
                "bg-yellow-400/15 text-yellow-200",
        },
        PERDIDA: {
            label: "PERDISTE",
            className:
                "bg-red-400/15 text-red-200",
        },
        BUST: {
            label: "BUST",
            className:
                "bg-red-400/15 text-red-200",
        },
        EMPATE: {
            label: "EMPATE",
            className:
                "bg-white/10 text-white/80",
        },
    };

    const currentStatus =
        statusConfig[status];

    return (
        <div className="w-full">
            
            {/* Main */}
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
                {/* Mesa */}
                <div className="overflow-hidden rounded-xl border border-emerald-300/10 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 shadow-xl">
                    <div className="relative p-3 sm:p-4">
                        {/* Dealer */}
                        <div className="mb-3">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest text-white/40">
                                        Casa
                                    </span>

                                    <span className="text-xs font-bold text-white">
                                        Dealer
                                    </span>
                                </div>

                                {dealerHand.length >
                                    0 && (
                                    <span className="rounded-md bg-black/15 px-2 py-0.5 text-[10px] font-bold text-white/50">
                                        {dealerResult.total}
                                    </span>
                                )}
                            </div>

                            <div className="flex min-h-[108px] items-center justify-center">
                                {dealerHand.length >
                                0 ? (
                                    <div className="flex items-center justify-center -space-x-2">
                                        {dealerHand.map(
                                            (
                                                card,
                                                index,
                                            ) => (
                                                <PlayingCard
                                                    key={
                                                        card.id
                                                    }
                                                    card={
                                                        card
                                                    }
                                                    index={
                                                        index
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-[11px] text-white/20">
                                        Esperando partida...
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Separador */}
                        <div className="flex items-center gap-2">
                            <div className="h-px flex-1 bg-white/10" />

                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/10 text-[10px] font-black text-white/25">
                                21
                            </div>

                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        {/* Jugador */}
                        <div className="mt-3">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white">
                                        Jugador
                                    </span>

                                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/25">
                                        Tus cartas
                                    </span>
                                </div>

                                {playerHand.length >
                                    0 && (
                                    <span
                                        className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                                            playerResult.total >
                                            21
                                                ? "bg-red-400/15 text-red-200"
                                                : playerResult.total ===
                                                    21
                                                  ? "bg-yellow-400/15 text-yellow-200"
                                                  : "bg-white/10 text-white/60"
                                        }`}
                                    >
                                        {playerResult.total}
                                    </span>
                                )}
                            </div>

                            <div className="flex min-h-[108px] items-center justify-center">
                                {playerHand.length >
                                0 ? (
                                    <div className="flex items-center justify-center -space-x-2">
                                        {playerHand.map(
                                            (
                                                card,
                                                index,
                                            ) => (
                                                <PlayingCard
                                                    key={
                                                        card.id
                                                    }
                                                    card={
                                                        card
                                                    }
                                                    index={
                                                        index
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-[11px] text-white/20">
                                        Tus cartas aparecerán
                                        acá
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="mt-3 flex flex-col items-center gap-1.5 border-t border-white/10 pt-3">
                            <span
                                className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest ${currentStatus.className}`}
                            >
                                {currentStatus.label}
                            </span>

                            <p className="text-center text-[11px] font-medium text-white/45">
                                {message}
                            </p>

                            {lastPrize > 0 &&
                                isFinished && (
                                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-300">
                                        <Trophy className="h-3 w-3" />
                                        +
                                        {formatCredits(
                                            lastPrize,
                                        )}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                {/* Controles */}
                <aside className="h-fit rounded-xl border border-white/10 bg-white/[0.035] p-3">
                    <div className="mb-3">
                        <div className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-white/25">
                            Apuesta
                        </div>

                        <div className="text-xl font-black text-white">
                            {formatCredits(bet)}
                        </div>
                    </div>

                    <div className="mb-2 grid grid-cols-3 gap-1.5">
                        <button
                            type="button"
                            onClick={decreaseBet}
                            disabled={
                                isPlaying ||
                                isResolving ||
                                bet <= MIN_BET
                            }
                            className="flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <Minus className="h-3.5 w-3.5" />
                        </button>

                        <button
                            type="button"
                            onClick={maxBet}
                            disabled={
                                isPlaying ||
                                isResolving ||
                                maximumBet < MIN_BET
                            }
                            className="h-9 rounded-lg border border-amber-300/10 bg-amber-300/5 text-[9px] font-black uppercase tracking-wider text-amber-200 transition hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            Máx.
                        </button>

                        <button
                            type="button"
                            onClick={increaseBet}
                            disabled={
                                isPlaying ||
                                isResolving ||
                                bet >=
                                    Math.min(
                                        MAX_BET,
                                        maximumBet,
                                    )
                            }
                            className="flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <Plus className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <div className="mb-3 text-center text-[9px] text-white/20">
                        Mín. {MIN_BET} · Máx.{" "}
                        {maximumBet > 0
                            ? maximumBet
                            : MAX_BET}
                    </div>

                    <div className="space-y-1.5">
                        {!isPlaying &&
                        !isFinished &&
                        status !== "DEALER" ? (
                            <button
                                type="button"
                                onClick={startGame}
                                disabled={
                                    bet < MIN_BET ||
                                    bet > saldo ||
                                    saldo < MIN_BET
                                }
                                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 text-xs font-black text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                Comenzar
                            </button>
                        ) : null}

                        {isPlaying && (
                            <div className="grid grid-cols-2 gap-1.5">
                                <button
                                    type="button"
                                    onClick={hit}
                                    disabled={isResolving}
                                    className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-white px-2 text-xs font-black text-emerald-950 transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                    Carta
                                </button>

                                <button
                                    type="button"
                                    onClick={stand}
                                    disabled={isResolving}
                                    className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2 text-xs font-black text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <Check className="h-3.5 w-3.5" />
                                    Plantarse
                                </button>
                            </div>
                        )}

                        {isFinished && (
                            <button
                                type="button"
                                onClick={newGame}
                                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 text-xs font-black text-white transition hover:bg-white/15"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Nueva partida
                            </button>
                        )}
                    </div>

                    {isFinished && (
                        <div className="mt-3 rounded-lg border border-white/5 bg-black/10 p-2.5">
                            <div className="flex items-center justify-between">
                                <span className="text-[8px] font-bold uppercase tracking-wider text-white/25">
                                    Resultado
                                </span>

                                {status ===
                                "BLACKJACK" ? (
                                    <Crown className="h-3.5 w-3.5 text-yellow-300" />
                                ) : status ===
                                  "GANADA" ? (
                                    <Trophy className="h-3.5 w-3.5 text-emerald-300" />
                                ) : status ===
                                  "EMPATE" ? (
                                    <Check className="h-3.5 w-3.5 text-white/50" />
                                ) : (
                                    <X className="h-3.5 w-3.5 text-red-300" />
                                )}
                            </div>

                            <div className="mt-0.5 text-xs font-black text-white">
                                {status === "BLACKJACK"
                                    ? "Blackjack"
                                    : status ===
                                        "GANADA"
                                      ? "Victoria"
                                      : status ===
                                          "EMPATE"
                                        ? "Empate"
                                        : "Derrota"}
                            </div>
                        </div>
                    )}

                    <div className="mt-3 flex justify-center gap-1.5 text-[8px] text-white/15">
                        <span>Enter comenzar</span>
                        <span>·</span>
                        <span>Espacio carta</span>
                        <span>·</span>
                        <span>S plantarse</span>
                    </div>
                </aside>
            </div>

            <style>{`
                @keyframes cardIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px) scale(.94);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                .card-in {
                    animation: cardIn .25s ease-out both;
                }
            `}</style>
        </div>
    );
}