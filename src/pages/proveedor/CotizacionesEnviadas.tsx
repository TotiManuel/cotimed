import {
    Building2,
    Package,
    Calendar,
    Edit,
    Eye,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";


const CotizacionesEnviadas = () => {


    const cotizaciones = [

        {
            institucion: "Hospital Regional Córdoba",
            equipo: "Respirador Mecánico",
            precio: "USD 185.000",
            fecha: "20/07/2026",
            estado: "En revisión"
        },


        {
            institucion: "Clínica San Martín",
            equipo: "Monitor Multiparamétrico",
            precio: "USD 48.000",
            fecha: "15/07/2026",
            estado: "Aceptada"
        },


        {
            institucion: "Centro Médico Norte",
            equipo: "Ecógrafo Doppler Color",
            precio: "USD 42.000",
            fecha: "10/07/2026",
            estado: "Rechazada"
        }


    ];




    const estadoColor = (estado:string)=>{


        switch(estado){


            case "Aceptada":

                return "bg-emerald-100 text-emerald-700";


            case "Rechazada":

                return "bg-red-100 text-red-700";


            default:

                return "bg-amber-100 text-amber-700";


        }

    };




    const estadoIcon = (estado:string)=>{


        switch(estado){


            case "Aceptada":

                return <CheckCircle size={16}/>;


            case "Rechazada":

                return <XCircle size={16}/>;


            default:

                return <Clock size={16}/>;


        }

    };




    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Cotizaciones enviadas

                </h1>


                <p className="mt-2 text-slate-600">

                    Seguimiento de propuestas comerciales enviadas a instituciones.

                </p>


            </div>





            <div className="grid gap-6">


                {

                    cotizaciones.map((cotizacion,index)=>(


                        <div

                            key={index}

                            className="rounded-2xl bg-white p-8 shadow"

                        >


                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                <div>


                                    <div className="flex items-center gap-3">


                                        <h2 className="text-2xl font-bold">

                                            {cotizacion.equipo}

                                        </h2>



                                        <span

                                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${estadoColor(cotizacion.estado)}`}

                                        >

                                            {estadoIcon(cotizacion.estado)}

                                            {cotizacion.estado}

                                        </span>


                                    </div>





                                    <div className="mt-4 space-y-2 text-slate-600">


                                        <p className="flex items-center gap-2">


                                            <Building2 size={18}/>

                                            {cotizacion.institucion}


                                        </p>




                                        <p className="flex items-center gap-2">


                                            <Package size={18}/>

                                            Equipamiento médico


                                        </p>




                                        <p className="flex items-center gap-2">


                                            <Calendar size={18}/>

                                            Enviada: {cotizacion.fecha}


                                        </p>


                                    </div>


                                </div>





                                <div className="text-right">


                                    <p className="text-sm text-slate-500">

                                        Oferta enviada

                                    </p>


                                    <p className="mt-2 text-3xl font-bold text-cyan-600">

                                        {cotizacion.precio}

                                    </p>


                                </div>


                            </div>





                            <div className="mt-8 flex flex-wrap gap-4">


                                <button

                                    className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-slate-100"

                                >

                                    <Eye size={18}/>

                                    Ver detalle


                                </button>





                                {

                                    cotizacion.estado === "En revisión" && (

                                        <button

                                            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"

                                        >

                                            <Edit size={18}/>

                                            Modificar propuesta


                                        </button>

                                    )

                                }


                            </div>



                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default CotizacionesEnviadas;