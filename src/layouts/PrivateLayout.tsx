import { Outlet, Link } from "react-router-dom";

import Header from "../components/header";

import { useAuth } from "../context/AuthContext";



const PrivateLayout = () => {


    const { usuario } = useAuth();



    if(!usuario){

        return null;

    }



    return (

        <>


            <Header />



            <div className="flex pt-20">



                <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">


                    <h2 className="text-xl font-bold mb-6">

                        MedicalLink

                    </h2>




                    {
                    usuario.Rol === "ADMIN" &&

                    <nav className="space-y-3">


                        <Link to="/admin/usuarios">
                            Usuarios
                        </Link>


                        <Link to="/admin/instituciones">
                            Instituciones
                        </Link>


                        <Link to="/admin/proveedores">
                            Proveedores
                        </Link>


                        <Link to="/admin/equipamientos">
                            Equipamientos
                        </Link>


                        <Link to="/admin/solicitudes">
                            Solicitudes
                        </Link>


                        <Link to="/admin/cotizaciones">
                            Cotizaciones
                        </Link>


                        <Link to="/admin/reportes">
                            Reportes
                        </Link>


                    </nav>

                    }





                    {
                    usuario.Rol === "INSTITUCION" &&


                    <nav className="space-y-3">


                        <Link to="/institucion/solicitudes/nueva">
                            Nueva solicitud
                        </Link>


                        <Link to="/institucion/solicitudes">
                            Mis solicitudes
                        </Link>


                        <Link to="/institucion/cotizaciones">
                            Cotizaciones
                        </Link>


                        <Link to="/institucion/proveedores">
                            Proveedores
                        </Link>


                        <Link to="/institucion/equipamientos">
                            Equipamientos
                        </Link>


                        <Link to="/institucion/reportes">
                            Reportes
                        </Link>


                    </nav>


                    }






                    {
                    usuario.Rol === "PROVEEDOR" &&


                    <nav className="space-y-3">


                        <Link to="/proveedor/solicitudes">

                            Solicitudes disponibles

                        </Link>



                        <Link to="/proveedor/cotizaciones">

                            Mis cotizaciones

                        </Link>



                        <Link to="/proveedor/catalogo">

                            Mi catálogo

                        </Link>



                    </nav>


                    }






                </aside>





                <main className="flex-1 p-8">


                    <Outlet />


                </main>





            </div>


        </>

    );


};



export default PrivateLayout;