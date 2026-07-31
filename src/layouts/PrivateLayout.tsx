import { Outlet, Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    Building2,
    Truck,
    Package,
    ClipboardList,
    BarChart3,
    Settings,
    Bell,
    Search,
    LogOut,
    ShieldCheck
} from "lucide-react";

const PrivateLayout = () => {

    const location = useLocation();

    const menu = [

        {
            nombre: "Dashboard",
            ruta: "/admin/dashboard",
            icono: LayoutDashboard
        },

        {
            nombre: "Instituciones",
            ruta: "/admin/instituciones",
            icono: Building2
        },

        {
            nombre: "Proveedores",
            ruta: "/admin/proveedores",
            icono: Truck
        },

        {
            nombre: "Equipamientos",
            ruta: "/admin/equipamientos",
            icono: Package
        },

        {
            nombre: "Solicitudes",
            ruta: "/admin/solicitudes",
            icono: ClipboardList
        },

        {
            nombre: "Estadísticas",
            ruta: "/admin/estadisticas",
            icono: BarChart3
        },

        {
            nombre: "Configuración",
            ruta: "/admin/configuracion",
            icono: Settings
        }

    ];

    return (

        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}

            <aside className="w-72 bg-slate-900 text-white flex flex-col">

                <div className="border-b border-slate-800 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600">

                            <ShieldCheck size={28} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold">

                                CotiMed

                            </h1>

                            <p className="text-xs text-slate-400">

                                Panel Administrador

                            </p>

                        </div>

                    </div>

                </div>

                <nav className="flex-1 p-5">

                    <ul className="space-y-2">

                        {

                            menu.map((item) => {

                                const Icon = item.icono;

                                const activo =

                                    location.pathname === item.ruta;

                                return (

                                    <li key={item.nombre}>

                                        <Link
                                            to={item.ruta}
                                            className={`flex items-center gap-4 rounded-xl px-4 py-3 transition ${
                                                activo
                                                    ? "bg-cyan-600"
                                                    : "hover:bg-slate-800"
                                            }`}
                                        >

                                            <Icon size={20} />

                                            {item.nombre}

                                        </Link>

                                    </li>

                                );

                            })

                        }

                    </ul>

                </nav>

                <div className="border-t border-slate-800 p-5">

                    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-800">

                        <LogOut size={20} />

                        Cerrar sesión

                    </button>

                </div>

            </aside>

            {/* Contenido */}

            <div className="flex flex-1 flex-col">

                {/* Topbar */}

                <header className="flex items-center justify-between border-b bg-white px-8 py-5">

                    <h2 className="text-2xl font-bold text-slate-900">

                        Administración

                    </h2>

                    <div className="flex items-center gap-6">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                        <button className="rounded-full bg-slate-100 p-3 hover:bg-slate-200">

                            <Bell size={20} />

                        </button>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">

                                A

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Administrador

                                </p>

                                <p className="text-sm text-slate-500">

                                    admin@cotimed.com

                                </p>

                            </div>

                        </div>

                    </div>

                </header>

                {/* Página */}

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default PrivateLayout;