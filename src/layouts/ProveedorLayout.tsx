import {
    LayoutDashboard,
    Package,
    PackagePlus,
    Search,
    FileText,
    Building2,
    User,
    LogOut
} from "lucide-react";

import {
    Link,
    Outlet,
    useLocation
} from "react-router-dom";


const ProveedorLayout = () => {


    const location = useLocation();




    const menu = [

        {
            nombre:"Dashboard",
            ruta:"/proveedor/dashboard",
            icono:LayoutDashboard
        },


        {
            nombre:"Mis equipamientos",
            ruta:"/proveedor/equipamientos",
            icono:Package
        },


        {
            nombre:"Agregar equipamiento",
            ruta:"/proveedor/agregar-equipamiento",
            icono:PackagePlus
        },


        {
            nombre:"Solicitudes disponibles",
            ruta:"/proveedor/solicitudes",
            icono:Search
        },


        {
            nombre:"Cotizaciones enviadas",
            ruta:"/proveedor/cotizaciones",
            icono:FileText
        },


        {
            nombre:"Clientes",
            ruta:"/proveedor/clientes",
            icono:Building2
        },


        {
            nombre:"Perfil",
            ruta:"/proveedor/perfil",
            icono:User
        }

    ];





    return (

        <div className="min-h-screen bg-slate-100 flex">





            <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 p-6">





                <div className="mb-10">


                    <h1 className="text-3xl font-bold text-slate-900">

                        Coti<span className="text-cyan-600">Med</span>

                    </h1>



                    <p className="mt-2 text-sm text-slate-500">

                        Panel proveedor

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









            <main className="ml-72 w-full p-10">


                <Outlet />


            </main>





        </div>

    );

};


export default ProveedorLayout;