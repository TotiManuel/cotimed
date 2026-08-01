import {
    LayoutDashboard,
    FilePlus,
    FileText,
    GitCompare,
    Package,
    Truck,
    Star,
    User,
    LogOut,
    Menu,
    X
} from "lucide-react";

import {
    Link,
    Outlet,
    useLocation
} from "react-router-dom";

import { useState } from "react";

const InstitucionLayout = () => {

    const location = useLocation();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const menu = [

        {
            nombre:"Dashboard",
            ruta:"/institucion/dashboard",
            icono:LayoutDashboard
        },

        {
            nombre:"Mis solicitudes",
            ruta:"/institucion/solicitudes",
            icono:FilePlus
        },

        {
            nombre:"Cotizaciones recibidas",
            ruta:"/institucion/cotizaciones",
            icono:FileText
        },

        {
            nombre:"Comparador",
            ruta:"/institucion/comparador",
            icono:GitCompare
        },

        {
            nombre:"Equipamientos",
            ruta:"/institucion/equipamientos",
            icono:Package
        },

        {
            nombre:"Proveedores",
            ruta:"/institucion/proveedores",
            icono:Truck
        },

        {
            nombre:"Favoritos",
            ruta:"/institucion/favoritos",
            icono:Star
        },

        {
            nombre:"Perfil",
            ruta:"/institucion/perfil",
            icono:User
        }

    ];

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Botón hamburguesa */}
            <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="fixed top-4 left-4 z-50 rounded-lg bg-white border border-slate-200 p-2 text-slate-900 shadow lg:hidden"
            >
                {menuAbierto ? <X size={24}/> : <Menu size={24}/>}
            </button>

            <aside
                className={`
                    fixed left-0 top-0 z-40 h-screen w-72 bg-white border-r border-slate-200 p-6
                    transform transition-transform duration-300
                    ${menuAbierto ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >

                <div className="mb-10">

                    <h1 className="text-3xl font-bold text-slate-900">

                        Coti<span className="text-cyan-600">Med</span>

                    </h1>

                    <p className="mt-2 text-sm text-slate-500">

                        Panel institución

                    </p>

                </div>

                <nav className="space-y-2">

                    {

                        menu.map((item)=>{

                            const Icon = item.icono;

                            const activo = location.pathname === item.ruta;

                            return (

                                <Link

                                    key={item.ruta}

                                    to={item.ruta}

                                    onClick={() => setMenuAbierto(false)}

                                    className={`

                                    flex items-center gap-3 rounded-xl px-4 py-3 transition

                                    ${
                                        activo
                                        ?
                                        "bg-cyan-600 text-white"
                                        :
                                        "text-slate-600 hover:bg-slate-100"
                                    }

                                    `}

                                >

                                    <Icon size={20}/>

                                    {item.nombre}

                                </Link>

                            );

                        })

                    }

                </nav>

                <button

                    className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"

                >

                    <LogOut size={20}/>

                    Cerrar sesión

                </button>

            </aside>

            {/* Fondo oscuro */}
            {menuAbierto && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    onClick={() => setMenuAbierto(false)}
                />
            )}

            <main className="w-full p-6 lg:ml-72 lg:p-10">

                <Outlet />

            </main>

        </div>

    );

};

export default InstitucionLayout;