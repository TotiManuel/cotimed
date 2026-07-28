import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { usuario, logout } = useAuth();


  const activeClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-slate-600 hover:text-blue-600";



  const cerrarSesion = () => {

    logout();

    navigate("/login");

  };



  const dashboardPath = () => {

    return "/dashboard";

  };



  return (

    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 z-50">


      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">



        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-lg">

            C

          </div>


          <div>

            <h1 className="text-2xl font-bold text-slate-900">

              Coti<span className="text-blue-600">Med</span>

            </h1>


            <p className="text-xs text-slate-500">

              Equipamiento médico B2B

            </p>


          </div>


        </Link>





        {/* Navegación */}

        <nav className="hidden lg:flex items-center gap-8 text-sm">


          <Link
            to="/institucion"
            className={`transition ${activeClass("/institucion")}`}
          >
            Instituciones
          </Link>



          <Link
            to="/proveedor"
            className={`transition ${activeClass("/proveedor")}`}
          >
            Proveedores
          </Link>



          <Link
            to="/equipamiento"
            className={`transition ${activeClass("/equipamiento")}`}
          >
            Equipamiento
          </Link>



          <Link
            to="/solicitud"
            className={`transition ${activeClass("/solicitudes")}`}
          >
            Solicitudes
          </Link>



        </nav>





        {/* Usuario */}

        <div className="flex items-center gap-5">


          {usuario ? (

            <>



              <Link
                to={dashboardPath()}
                className="hidden md:block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >

                Dashboard

              </Link>




              <Link
                to="/configuracion"
                className="hidden md:block rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >

                Configuración

              </Link>





              <Link
                to="/perfil"
                className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100 transition"
              >


                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">

                  {usuario.nombre.charAt(0)}

                </div>



                <div className="hidden lg:block">


                  <p className="text-sm font-semibold text-slate-900">

                    {usuario.nombre}

                  </p>


                  <p className="text-xs text-slate-500">

                    {usuario.rol}

                  </p>


                </div>



              </Link>





              <button
                onClick={cerrarSesion}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
              >

                Salir

              </button>



            </>


          ) : (


            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
            >

              Iniciar sesión

            </Link>


          )}



        </div>


      </div>


    </header>

  );

};


export default Header;