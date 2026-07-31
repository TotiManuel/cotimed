import { Outlet, Link, useLocation } from "react-router-dom";

import {
    LayoutDashboard,
    ClipboardPlus,
    ClipboardList,
    FileSpreadsheet,
    Scale,
    Package,
    Truck,
    Heart,
    User,
    Settings,
    Bell,
    Search,
    LogOut,
    Building2
} from "lucide-react";

const InstitucionLayout = () => {

    const location = useLocation();

    const menu = [

        {
            nombre: "Dashboard",
            ruta: "/institucion/dashboard",
            icono: LayoutDashboard
        },

        {
            nombre: "Nueva Solicitud",
            ruta: "/institucion/nueva-solicitud",
            icono: ClipboardPlus
        },

        {
            nombre: "Mis Solicitudes",
            ruta: "/institucion/solicitudes",
            icono: ClipboardList
        },

        {
            nombre: "Cotizaciones",
            ruta: "/institucion/cotizaciones",
            icono: FileSpreadsheet
        },

        {
            nombre: "Comparador",
            ruta: "/institucion/comparador",
            icono: Scale
        },

        {
            nombre: "Equipamientos",
            ruta: "/institucion/equipamientos",
            icono: Package
        },

        {
            nombre: "Proveedores",
            ruta: "/institucion/proveedores",
            icono: Truck
        },

        {
            nombre: "Favoritos",
            ruta: "/institucion/favoritos",
            icono: Heart
        },

        {
            nombre: "Perfil",
            ruta: "/institucion/perfil",
            icono: User
        },

        {
            nombre: "Configuración",
            ruta: "/institucion/configuracion",
            icono: Settings
        }

    ];

    return (

        <div className="flex min-h-screen bg-slate-100">

            <aside className="flex w-72 flex-col bg-slate-900 text-white">

                <div className="border-b border-slate-800 p-6">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600">

                            <Building2 size={28} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold">

                                CotiMed

                            </h1>

                            <p className="text-xs text-slate-400">

                                Panel Institución

                            </p>

                        </div>

                    </div>

                </div>

                <nav className="flex-1 p-5">

                    <ul className="space-y-2">

                        {

                            menu.map((item) => {

                                const Icon = item.icono;

                                const activo = location.pathname === item.ruta;

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

            <div className="flex flex-1 flex-col">

                <header className="flex items-center justify-between border-b bg-white px-8 py-5">

                    <h2 className="text-2xl font-bold text-slate-900">

                        Institución

                    </h2>

                    <div className="flex items-center gap-6">

                        <div className="relative">

                            <Search
                                size={18}
                                className="absolute left-3 top-3 text-slate-400"
                            />

                            <input
                                placeholder="Buscar..."
                                className="rounded-lg border py-2 pl-10 pr-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                        <button className="rounded-full bg-slate-100 p-3 hover:bg-slate-200">

                            <Bell size={20} />

                        </button>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 font-bold text-white">

                                H

                            </div>

                            <div>

                                <p className="font-semibold">

                                    Hospital Central

                                </p>

                                <p className="text-sm text-slate-500">

                                    Institución

                                </p>

                            </div>

                        </div>

                    </div>

                </header>

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default InstitucionLayout;