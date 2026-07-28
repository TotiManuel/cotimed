import { useState } from "react";
import { Link } from "react-router-dom";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Aquí luego irá la llamada a la API
    setEnviado(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-center text-3xl font-bold text-slate-900">
          Recuperar contraseña
        </h1>

        <p className="mb-8 text-center text-slate-600">
          Ingresa tu correo electrónico y te enviaremos las instrucciones para
          restablecer tu contraseña.
        </p>

        {!enviado ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>

              <label className="mb-2 block font-medium text-slate-700">
                Correo electrónico
              </label>

              <input
                type="email"
                placeholder="correo@empresa.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Enviar instrucciones
            </button>
          </form>
        ) : (
          <div className="rounded-xl bg-green-100 p-4 text-center text-green-700">
            Si existe una cuenta asociada a ese correo, recibirás las
            instrucciones para restablecer la contraseña.
          </div>
        )}

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Volver al inicio de sesión
          </Link>

        </div>

      </div>

    </main>
  );
};

export default RecuperarPassword;