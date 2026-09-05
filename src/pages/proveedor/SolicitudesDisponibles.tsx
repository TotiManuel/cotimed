import {
    Search,
    Building2,
    Calendar,
    Package,
    Send,
    Clock
} from "lucide-react";


const SolicitudesDisponibles = () => {


    const solicitudes = [

        {
            institucion: "Hospital Regional Córdoba",
            equipo: "Respirador Mecánico",
            categoria: "Terapia Intensiva",
            cantidad: 10,
            fecha: "31/08/2026",
            prioridad: "Alta"
        },


        {
            institucion: "Clínica San Martín",
            equipo: "Monitor Multiparamétrico",
            categoria: "Monitoreo",
            cantidad: 15,
            fecha: "15/09/2026",
            prioridad: "Media"
        },


        {
            institucion: "Centro Médico Norte",
            equipo: "Ecógrafo Doppler Color",
            categoria: "Diagnóstico por imágenes",
            cantidad: 3,
            fecha: "20/09/2026",
            prioridad: "Normal"
        }

    ];



    const prioridadColor = (prioridad:string)=>{


        if(prioridad === "Alta"){

            return "bg-red-100 text-red-700";

        }


        if(prioridad === "Media"){

            return "bg-amber-100 text-amber-700";

        }


        return "bg-blue-100 text-blue-700";


    };



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Solicitudes disponibles

                </h1>


                <p className="mt-2 text-slate-600">

                    Encontrá instituciones buscando equipamiento médico.

                </p>


            </div>





            <div className="mb-8 rounded-2xl bg-white p-6 shadow">


                <div className="relative">


                    <Search

                        size={20}

                        className="absolute left-4 top-3.5 text-slate-400"

                    />


                    <input

                        placeholder="Buscar solicitudes..."

                        className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-cyan-600"

                    />


                </div>


            </div>





            <div className="grid gap-6">


                {

                    solicitudes.map((solicitud)=>(


                        <div

                            key={solicitud.institucion}

                            className="rounded-2xl bg-white p-8 shadow"

                        >



                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                <div>


                                    <div className="flex items-center gap-3">


                                        <h2 className="text-2xl font-bold">

                                            {solicitud.equipo}

                                        </h2>



                                        <span

                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${prioridadColor(solicitud.prioridad)}`}

                                        >

                                            Prioridad {solicitud.prioridad}

                                        </span>


                                    </div>




                                    <div className="mt-4 space-y-2 text-slate-600">


                                        <p className="flex items-center gap-2">


                                            <Building2 size={18}/>

                                            {solicitud.institucion}


                                        </p>



                                        <p className="flex items-center gap-2">


                                            <Package size={18}/>

                                            {solicitud.categoria}


                                        </p>



                                        <p className="flex items-center gap-2">


                                            <Clock size={18}/>

                                            Cantidad requerida: {solicitud.cantidad}


                                        </p>



                                        <p className="flex items-center gap-2">


                                            <Calendar size={18}/>

                                            Fecha límite: {solicitud.fecha}


                                        </p>


                                    </div>


                                </div>





                                <button

                                    className="flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                                >

                                    <Send size={20}/>

                                    Enviar cotización


                                </button>



                            </div>



                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default SolicitudesDisponibles;