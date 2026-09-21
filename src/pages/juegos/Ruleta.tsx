import { useCallback, useEffect, useState } from "react";
import { Coins, Flame, RotateCcw } from "lucide-react";
import { useGame } from "../../context/GameContext";

type ColorRuleta = "ROJO" | "NEGRO" | "VERDE";

type TipoApuesta =
  | "ROJO_NEGRO"
  | "PAR_IMPAR"
  | "BAJO_ALTO"
  | "DOCENA"
  | "NUMERO";

type ApuestaSeleccionada = {
  tipo: TipoApuesta;
  valor: string | number;
  etiqueta: string;
  multiplicador: number;
};

const JUEGO_ID = "ruleta";
const JUEGO_NOMBRE = "Ruleta";

const MONTOS = [10, 25, 50, 100, 250];

const ORDEN_RUEDA = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const ROJOS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

const obtenerColor = (numero: number): ColorRuleta =>
  numero === 0 ? "VERDE" : ROJOS.has(numero) ? "ROJO" : "NEGRO";

const obtenerNumeroAleatorio = () => Math.floor(Math.random() * 37);

const formatearSaldo = (valor: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(valor);

const esPar = (n: number) => n !== 0 && n % 2 === 0;
const esBajo = (n: number) => n >= 1 && n <= 18;
const esAlto = (n: number) => n >= 19 && n <= 36;
const obtenerDocena = (n: number) =>
  n >= 1 && n <= 36 ? Math.ceil(n / 12) : 0;

export default function Ruleta() {
  const { saldo, spendBalance, recordGame } = useGame();

  const [apuesta, setApuesta] = useState(25);
  const [seleccion, setSeleccion] =
    useState<ApuestaSeleccionada | null>(null);
  const [girando, setGirando] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState(
    "Elegí una apuesta y girá la ruleta.",
  );
  const [ultimaApuesta, setUltimaApuesta] =
    useState<ApuestaSeleccionada | null>(null);
  const [ultimoMonto, setUltimoMonto] = useState(25);

  const seleccionar = useCallback(
    (
      tipo: TipoApuesta,
      valor: string | number,
      etiqueta: string,
      multiplicador: number,
    ) => {
      if (girando) return;

      setSeleccion({ tipo, valor, etiqueta, multiplicador });
      setMensaje(`Apuesta seleccionada: ${etiqueta}`);
    },
    [girando],
  );

  const seleccionarColor = (color: "ROJO" | "NEGRO") =>
    seleccionar("ROJO_NEGRO", color, color === "ROJO" ? "Rojo" : "Negro", 2);

  const seleccionarParidad = (valor: "PAR" | "IMPAR") =>
    seleccionar(
      "PAR_IMPAR",
      valor,
      valor === "PAR" ? "Par" : "Impar",
      2,
    );

  const seleccionarAltura = (valor: "BAJO" | "ALTO") =>
    seleccionar(
      "BAJO_ALTO",
      valor,
      valor === "BAJO" ? "1 - 18" : "19 - 36",
      2,
    );

  const seleccionarDocena = (docena: number) =>
    seleccionar("DOCENA", docena, `${docena}ª docena`, 3);

  const seleccionarNumero = (numero: number) =>
    seleccionar("NUMERO", numero, `Número ${numero}`, 36);

  const ganoApuesta = useCallback(
    (numero: number, color: ColorRuleta) => {
      if (!seleccion) return false;

      switch (seleccion.tipo) {
        case "ROJO_NEGRO":
          return color === seleccion.valor;

        case "PAR_IMPAR":
          return numero !== 0 &&
            (seleccion.valor === "PAR"
              ? esPar(numero)
              : !esPar(numero));

        case "BAJO_ALTO":
          return seleccion.valor === "BAJO"
            ? esBajo(numero)
            : esAlto(numero);

        case "DOCENA":
          return obtenerDocena(numero) === Number(seleccion.valor);

        case "NUMERO":
          return numero === Number(seleccion.valor);

        default:
          return false;
      }
    },
    [seleccion],
  );

  const girar = useCallback(() => {
    if (girando) return;

    if (!seleccion) {
      setMensaje("Primero seleccioná una apuesta.");
      return;
    }

    if (apuesta <= 0) {
      setMensaje("Ingresá un monto válido.");
      return;
    }

    if (saldo < apuesta) {
      setMensaje("No tenés saldo suficiente.");
      return;
    }

    if (!spendBalance(apuesta, `Apuesta en Ruleta - ${seleccion.etiqueta}`)) {
      setMensaje("No se pudo realizar la apuesta.");
      return;
    }

    const numero = obtenerNumeroAleatorio();
    const color = obtenerColor(numero);

    setGirando(true);
    setResultado(null);
    setUltimaApuesta(seleccion);
    setUltimoMonto(apuesta);
    setMensaje("🎰 La ruleta está girando...");

    setTimeout(() => {
      const gano = ganoApuesta(numero, color);
      const premio = gano ? apuesta * seleccion.multiplicador : 0;

      setResultado(numero);
      setGirando(false);

      setMensaje(
        gano
          ? `🎉 ¡Ganaste! Salió ${numero} ${color.toLowerCase()}. Premio: ${formatearSaldo(premio)}`
          : `😔 Salió ${numero} ${color.toLowerCase()}. Perdiste ${formatearSaldo(apuesta)}.`,
      );

      recordGame({
        juegoId: JUEGO_ID,
        juegoNombre: JUEGO_NOMBRE,
        resultado: gano ? "GANADA" : "PERDIDA",
        apuesta,
        premio,
      });
    }, 2800);
  }, [
    apuesta,
    girando,
    ganoApuesta,
    recordGame,
    saldo,
    seleccion,
    spendBalance,
  ]);

  const repetirApuesta = () => {
    if (!ultimaApuesta || girando) return;

    setSeleccion(ultimaApuesta);
    setApuesta(ultimoMonto);
    setMensaje(`Apuesta repetida: ${ultimaApuesta.etiqueta}`);
  };

  useEffect(() => {
    return () => {};
  }, []);

  const resultadoColor =
    resultado === null ? "bg-emerald-700" : `bg-${
      obtenerColor(resultado) === "ROJO"
        ? "red-600"
        : obtenerColor(resultado) === "NEGRO"
          ? "slate-950"
          : "emerald-500"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_440px]">
          {/* RULETA */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-5 md:p-8">
            <div className="flex flex-col items-center">
              <div className="relative flex h-[350px] w-[350px] items-center justify-center md:h-[460px] md:w-[460px]">
                <div
                  className={`relative h-[310px] w-[310px] rounded-full border-[14px] border-yellow-700 bg-emerald-700 shadow-2xl shadow-black/60 md:h-[400px] md:w-[400px] ${
                    girando ? "animate-spin" : ""
                  }`}
                  style={{
                    animationDuration: girando ? "1s" : undefined,
                  }}
                >
                  {ORDEN_RUEDA.map((numero, index) => {
                    const angulo = (360 / ORDEN_RUEDA.length) * index;
                    const color = obtenerColor(numero);

                    return (
                      <div
                        key={numero}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `rotate(${angulo}deg) translateY(-140px)`,
                          transformOrigin: "0 0",
                        }}
                      >
                        <span
                          className={`flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-black md:h-9 md:w-9 ${
                            color === "ROJO"
                              ? "bg-red-600"
                              : color === "NEGRO"
                                ? "bg-slate-950"
                                : "bg-emerald-500"
                          }`}
                          style={{
                            transform: `rotate(-${angulo}deg)`,
                          }}
                        >
                          {numero}
                        </span>
                      </div>
                    );
                  })}

                  <div className="absolute inset-[25%] flex items-center justify-center rounded-full border-8 border-yellow-600 bg-slate-950 shadow-inner">
                    <div
                      className={`flex h-28 w-28 flex-col items-center justify-center rounded-full shadow-xl transition-all ${resultadoColor}`}
                    >
                      {resultado !== null ? (
                        <>
                          <span className="text-4xl font-black">
                            {resultado}
                          </span>
                          <span className="text-xs font-bold">
                            {obtenerColor(resultado)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl">🎰</span>
                          <span className="mt-1 text-xs font-bold text-slate-300">
                            {girando ? "GIRANDO" : "RULETA"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute -top-1 left-1/2 z-20 -translate-x-1/2">
                  <div className="h-0 w-0 border-l-[13px] border-r-[13px] border-t-[28px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-lg" />
                </div>
              </div>

              <div className="mt-2 min-h-[60px] max-w-xl text-center">
                <p className="text-lg font-bold">{mensaje}</p>

                {seleccion && (
                  <p className="mt-1 text-sm text-slate-500">
                    {seleccion.etiqueta} · {formatearSaldo(apuesta)}
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <button
                  onClick={girar}
                  disabled={girando || !seleccion || saldo < apuesta}
                  className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-black shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Flame size={22} />
                  {girando
                    ? "GIRANDO..."
                    : `GIRAR · ${formatearSaldo(apuesta)}`}
                </button>

                <button
                  onClick={repetirApuesta}
                  disabled={girando || !ultimaApuesta}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-bold text-slate-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RotateCcw size={20} />
                  Repetir
                </button>
              </div>
            </div>
          </section>

          {/* PANEL DERECHO */}
          <aside className="space-y-4">
            {/* MONTO */}
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Coins size={19} className="text-yellow-400" />
                <h2 className="font-bold">Monto de apuesta</h2>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {MONTOS.map((monto) => (
                  <button
                    key={monto}
                    disabled={girando}
                    onClick={() => setApuesta(monto)}
                    className={`rounded-xl px-2 py-3 text-sm font-bold transition ${
                      apuesta === monto
                        ? "bg-emerald-500 text-white"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    ${monto}
                  </button>
                ))}
              </div>

              <input
                type="number"
                min={1}
                value={apuesta}
                disabled={girando}
                onChange={(e) =>
                  setApuesta(Math.max(1, Number(e.target.value) || 0))
                }
                className="mt-3 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </section>

            {/* MESA */}
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-black">Mesa de apuestas</h2>
                  <p className="text-xs text-slate-500">
                    Seleccioná dónde apostar
                  </p>
                </div>

                {seleccion && (
                  <button
                    onClick={() => setSeleccion(null)}
                    disabled={girando}
                    className="text-xs font-semibold text-slate-500 hover:text-white"
                  >
                    Limpiar
                  </button>
                )}
              </div>

              {/* ROJO / NEGRO */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={girando}
                  onClick={() => seleccionarColor("ROJO")}
                  className={`rounded-xl border p-3 font-bold transition ${
                    seleccion?.tipo === "ROJO_NEGRO" &&
                    seleccion.valor === "ROJO"
                      ? "border-yellow-400 ring-2 ring-yellow-400/30"
                      : "border-red-500/20"
                  } bg-red-600 hover:bg-red-500`}
                >
                  Rojo
                  <span className="block text-xs opacity-70">1:1</span>
                </button>

                <button
                  disabled={girando}
                  onClick={() => seleccionarColor("NEGRO")}
                  className={`rounded-xl border p-3 font-bold transition ${
                    seleccion?.tipo === "ROJO_NEGRO" &&
                    seleccion.valor === "NEGRO"
                      ? "border-yellow-400 ring-2 ring-yellow-400/30"
                      : "border-white/10"
                  } bg-slate-950 hover:bg-slate-900`}
                >
                  Negro
                  <span className="block text-xs text-slate-500">1:1</span>
                </button>
              </div>

              {/* PAR / IMPAR / BAJO / ALTO */}
              <div className="mt-2 grid grid-cols-4 gap-2">
                {[
                  ["PAR", "PAR"],
                  ["IMPAR", "IMPAR"],
                  ["BAJO", "1 - 18"],
                  ["ALTO", "19 - 36"],
                ].map(([valor, etiqueta]) => {
                  const tipo =
                    valor === "PAR" || valor === "IMPAR"
                      ? "PAR_IMPAR"
                      : "BAJO_ALTO";

                  const activo =
                    seleccion?.tipo === tipo && seleccion.valor === valor;

                  return (
                    <button
                      key={valor}
                      disabled={girando}
                      onClick={() =>
                        tipo === "PAR_IMPAR"
                          ? seleccionarParidad(
                              valor as "PAR" | "IMPAR",
                            )
                          : seleccionarAltura(
                              valor as "BAJO" | "ALTO",
                            )
                      }
                      className={`rounded-xl border p-3 text-xs font-bold transition ${
                        activo
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-white/10 bg-slate-900 hover:bg-white/10"
                      }`}
                    >
                      {etiqueta}
                      <span className="block text-[10px] text-slate-500">
                        1:1
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* DOCENAS */}
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Docenas
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((docena) => (
                    <button
                      key={docena}
                      disabled={girando}
                      onClick={() => seleccionarDocena(docena)}
                      className={`rounded-xl border p-3 text-sm font-bold transition ${
                        seleccion?.tipo === "DOCENA" &&
                        seleccion.valor === docena
                          ? "border-yellow-400 bg-yellow-400/10"
                          : "border-white/10 bg-slate-900 hover:bg-white/10"
                      }`}
                    >
                      {docena}ª
                      <span className="block text-[10px] text-slate-500">
                        {docena === 1
                          ? "1-12"
                          : docena === 2
                            ? "13-24"
                            : "25-36"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* NÚMEROS */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Números
                  </p>
                  <span className="text-[10px] text-slate-600">
                    Paga 35:1
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
                  {Array.from({ length: 37 }, (_, numero) => {
                    const color = obtenerColor(numero);
                    const activo =
                      seleccion?.tipo === "NUMERO" &&
                      Number(seleccion.valor) === numero;

                    return (
                      <button
                        key={numero}
                        disabled={girando}
                        onClick={() => seleccionarNumero(numero)}
                        className={`aspect-square rounded-lg text-xs font-black transition ${
                          color === "ROJO"
                            ? "bg-red-600 hover:bg-red-500"
                            : color === "NEGRO"
                              ? "bg-slate-950 hover:bg-slate-800"
                              : "bg-emerald-600 hover:bg-emerald-500"
                        } ${
                          activo
                            ? "ring-2 ring-yellow-400 ring-offset-1 ring-offset-slate-950"
                            : ""
                        }`}
                      >
                        {numero}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}