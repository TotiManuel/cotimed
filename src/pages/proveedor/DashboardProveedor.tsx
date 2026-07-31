import {
    Package,
    FileText,
    Building2,
    TrendingUp,
    Clock,
    CheckCircle
} from "lucide-react";


const DashboardProveedor = () => {


    const estadisticas = [

        {
            titulo: "Equipamientos publicados",
            valor: "48",
            icono: Package
        },

        {
            titulo: "Solicitudes recibidas",
            valor: "23",
            icono: FileText
        },

        {
            titulo: "Instituciones contactadas",
            valor: "15",
            icono: Building2
        },

        {
            titulo: "Cotizaciones aceptadas",
            valor: "8",
            icono: TrendingUp
        }

    ];




    const solicitudes = [

        {
            institucion: "Hospital Regional Córdoba",
            equipo: "Respirador Mecánico",
            fecha: "Hoy",
            estado: "Nueva"
        },


        {
            institucion: "Clínica San Martín",
            equipo: "Monitor Multiparamétrico",
            fecha: "Ayer",
            estado: "Cotizando"
        },


        {
            institucion: "Centro Médico Norte",
            equipo: "Ecógrafo Doppler",
            fecha: "Hace 3 días",
            estado: "Respondida"
        }

    ];




    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Dashboard proveedor

                </h1>


                <p className="mt-2 text-slate-600">

                    Gestioná tus equipos, solicitudes y oportunidades comerciales.

                </p>


            </div>





            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


                {

                    estadisticas.map((item)=>(


                        <div

                            key={item.titulo}

                            className="rounded-2xl bg-white p-6 shadow"

                        >


                            <div className="flex items-center justify-between">


                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                                    <item.icono size={25}/>


                                </div>


                            </div>




                            <p className="mt-6 text-slate-500">

                                {item.titulo}

                            </p>


                            <h2 className="mt-2 text-4xl font-bold text-slate-900">

                                {item.valor}

                            </h2>


                        </div>


                    ))

                }


            </div>






            <div className="mt-10 rounded-2xl bg-white p-8 shadow">


                <div className="mb-8 flex items-center justify-between">


                    <div>


                        <h2 className="text-2xl font-bold">

                            Solicitudes recientes

                        </h2>


                        <p className="mt-1 text-slate-500">

                            Instituciones buscando equipamiento.

                        </p>


                    </div>



                    <button

                        className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"

                    >

                        Ver solicitudes


                    </button>


                </div>





                <div className="space-y-5">


                    {

                        solicitudes.map((solicitud)=>(


                            <div

                                key={solicitud.institucion}

                                className="flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between"

                            >


                                <div>


                                    <h3 className="text-lg font-bold">

                                        {solicitud.equipo}

                                    </h3>


                                    <p className="text-slate-600">

                                        {solicitud.institucion}

                                    </p>


                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">


                                        <Clock size={16}/>

                                        {solicitud.fecha}


                                    </div>


                                </div>





                                <div className="flex items-center gap-4">


                                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                        {solicitud.estado}

                                    </span>


                                    <button

                                        className="rounded-lg border px-4 py-2 font-semibold hover:bg-slate-100"

                                    >

                                        Ver


                                    </button>


                                </div>



                            </div>


                        ))

                    }


                </div>


            </div>





            <div className="mt-10 rounded-2xl bg-emerald-50 p-8">


                <div className="flex items-center gap-4">


                    <CheckCircle

                        size={35}

                        className="text-emerald-600"

                    />


                    <div>


                        <h3 className="text-xl font-bold text-emerald-900">

                            Perfil verificado

                        </h3>


                        <p className="text-emerald-800">

                            Tu empresa aparece como proveedor confiable dentro de CotiMed.

                        </p>


                    </div>


                </div>


            </div>



        </>

    );

};


export default DashboardProveedor;