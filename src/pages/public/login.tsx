
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Login = () => {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setError("");

  setCargando(true);


  try {

    await login(
      email,
      password
    );


    navigate("/dashboard");


  } catch(error) {


    setError(
      "Email o contraseña incorrectos."
    );


  } finally {

    setCargando(false);

  }

};
  return (

    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">


      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">


        <div className="mb-8 text-center">


          <h1 className="text-3xl font-bold text-slate-900">
            Iniciar sesión
          </h1>


          <p className="mt-2 text-slate-600">
            Plataforma B2B de Equipamiento Médico
          </p>


        </div>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >



          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Email
            </label>


            <input

              type="email"

              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

              placeholder="correo@empresa.com"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              required

            />


          </div>




          <div>


            <label className="mb-2 block font-medium text-slate-700">
              Contraseña
            </label>


            <input

              type="password"

              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"

              placeholder="********"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

              required

            />


          </div>




          {error && (

            <div className="rounded-xl bg-red-100 p-3 text-red-700">

              {error}

            </div>

          )}






          <button

            type="submit"

            disabled={cargando}

            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"

          >

            {cargando ? "Ingresando..." : "Ingresar"}

          </button>




          <div className="text-center">

            <Link

              to="/recuperar-password"

              className="text-sm text-blue-600 hover:underline"

            >

              ¿Olvidaste tu contraseña?

            </Link>


          </div>



        </form>



        <div className="mt-8 border-t pt-6">


          <h3 className="mb-3 font-semibold text-slate-800">

            Usuarios de prueba

          </h3>



          <div className="space-y-2 text-sm text-slate-600">


            <p>
              <strong>Administrador</strong><br />
              admin@cotimed.com<br />
              123456
            </p>


            <p>
              <strong>Institución</strong><br />
              institucion@cotimed.com<br />
              123456
            </p>


            <p>
              <strong>Proveedor</strong><br />
              proveedor@cotimed.com<br />
              123456
            </p>


            <p>
              <strong>Empleado</strong><br />
              empleado@cotimed.com<br />
              123456
            </p>


          </div>


        </div>



      </div>


    </main>

  );

};


export default Login;