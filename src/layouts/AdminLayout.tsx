import {
    LayoutDashboard,
    Building2,
    Truck,
    Package,
    FileText,
    BarChart3,
    Settings,
    LogOut
} from "lucide-react";

import { Link, Outlet, useLocation } from "react-router-dom";



const AdminLayout = () => {


    const location = useLocation();



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


            <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white p-6">


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

                    className="absolute bottom-8 left-6 right-6 flex items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700"

                >

                    <LogOut size={20}/>

                    Cerrar sesión


                </button>




            </aside>







            <main className="ml-72 w-full p-10">


                <Outlet />


            </main>





        </div>

    );

};



export default AdminLayout;