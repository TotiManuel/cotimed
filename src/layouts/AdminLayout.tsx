import {
    LayoutDashboard,
    Building2,
    Truck,
    Package,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {

    const location = useLocation();
    const {
        logout
    } = useAuth();
    const navigate = useNavigate();

    const [menuAbierto, setMenuAbierto] = useState(false);

    const menu = [

        {
            nombre:"Dashboard",
            ruta:"/admin/dashboard",
            icono:LayoutDashboard
        },

        {
            nombre:"Instituciones",
            ruta:"/admin/instituciones",
            icono:Building2
        },

        {
            nombre:"Proveedores",
            ruta:"/admin/proveedores",
            icono:Truck
        },

        {
            nombre:"Equipamientos",
            ruta:"/admin/equipamientos",
            icono:Package
        },

        {
            nombre:"Solicitudes",
            ruta:"/admin/solicitudes",
            icono:FileText
        },

        {
            nombre:"Estadísticas",
            ruta:"/admin/estadisticas",
            icono:BarChart3
        },

        {
            nombre:"Configuración",
            ruta:"/admin/configuracion",
            icono:Settings
        }

    ];

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Botón hamburguesa */}
            <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="fixed top-4 left-4 z-50 rounded-lg bg-slate-900 p-2 text-white lg:hidden"
            >
                {menuAbierto ? <X size={24}/> : <Menu size={24}/>}
            </button>

            <aside
                className={`
                    fixed left-0 top-0 z-40 h-screen w-72 bg-slate-900 text-white p-6
                    transform transition-transform duration-300
                    ${menuAbierto ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >

                <div className="mb-10">

                    <h1 className="text-3xl font-bold">

                        Coti<span className="text-cyan-400">Med</span>

                    </h1>

                    <p className="mt-2 text-sm text-slate-400">

                        Panel administrador

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
                                        "text-slate-300 hover:bg-slate-800"
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

                    onClick={() => {
                        logout();
                        navigate("/login");
                    }}

                    className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700"

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

export default AdminLayout;