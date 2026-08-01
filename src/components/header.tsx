import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {

    const location = useLocation();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const activeClass = (path: string) =>

        location.pathname === path

            ? "text-blue-600 font-semibold"

            : "text-slate-600 hover:text-blue-600";



    return (

        <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 z-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-lg">

                        C

                    </div>

                    <div>

                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">

                            Coti<span className="text-blue-600">Med</span>

                        </h1>

                        <p className="hidden sm:block text-xs text-slate-500">

                            Equipamiento médico B2B

                        </p>

                    </div>

                </Link>





                {/* Navegación escritorio */}

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
                        to="/solicitudes"
                        className={`transition ${activeClass("/solicitudes")}`}
                    >
                        Solicitudes
                    </Link>

                    <Link
                        to="/login"
                        className={`transition ${activeClass("/login")}`}
                    >
                        Iniciar Sesión
                    </Link>

                </nav>





                {/* Botón móvil */}

                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                >

                    {

                        menuAbierto

                            ? <X size={26}/>

                            : <Menu size={26}/>

                    }

                </button>

            </div>





            {/* Menú móvil */}

            {

                menuAbierto && (

                    <nav className="lg:hidden border-t border-slate-200 bg-white">

                        <div className="flex flex-col px-6 py-4 space-y-4">

                            <Link
                                to="/institucion"
                                onClick={() => setMenuAbierto(false)}
                                className={activeClass("/institucion")}
                            >
                                Instituciones
                            </Link>

                            <Link
                                to="/proveedor"
                                onClick={() => setMenuAbierto(false)}
                                className={activeClass("/proveedor")}
                            >
                                Proveedores
                            </Link>

                            <Link
                                to="/equipamiento"
                                onClick={() => setMenuAbierto(false)}
                                className={activeClass("/equipamiento")}
                            >
                                Equipamiento
                            </Link>

                            <Link
                                to="/solicitudes"
                                onClick={() => setMenuAbierto(false)}
                                className={activeClass("/solicitudes")}
                            >
                                Solicitudes
                            </Link>

                            <Link
                                to="/login"
                                onClick={() => setMenuAbierto(false)}
                                className={activeClass("/login")}
                            >
                                Iniciar Sesión
                            </Link>

                        </div>

                    </nav>

                )

            }

        </header>

    );

};

export default Header;