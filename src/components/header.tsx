import { Link, useLocation } from "react-router-dom";


const Header = () => {

  const location = useLocation();


  const activeClass = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-slate-600 hover:text-blue-600";

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
            to="/"
            className={`transition ${activeClass("/")}`}
          >
            Solicitudes
          </Link>

          <Link
            to="/"
            className={`transition ${activeClass("/")}`}
          >
            Iniciar Sesión
          </Link>



        </nav>
      </div>
    </header>

  );

};


export default Header;