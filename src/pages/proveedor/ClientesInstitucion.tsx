import {
    Building2,
    Package,
    Calendar,
    Eye,
    Users,
    TrendingUp
} from "lucide-react";


const ClientesInstitucion = () => {


    const clientes = [

        {
            nombre: "Hospital Regional Córdoba",
            ciudad: "Córdoba",
            equipos: 12,
            ultimaCompra: "Respirador Mecánico",
            fecha: "15/07/2026",
            estado: "Cliente activo"
        },


        {
            nombre: "Clínica San Martín",
            ciudad: "Villa María",
            equipos: 5,
            ultimaCompra: "Monitor Multiparamétrico",
            fecha: "02/06/2026",
            estado: "Cliente activo"
        },


        {
            nombre: "Centro Médico Norte",
            ciudad: "Rosario",
            equipos: 2,
            ultimaCompra: "Ecógrafo Doppler",
            fecha: "20/04/2026",
            estado: "Contacto reciente"
        }

    ];




    return (

        <>


            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Instituciones clientes

                </h1>


                <p className="mt-2 text-slate-600">

                    Administrá las instituciones con las que tu empresa trabaja.

                </p>


            </div>





            <div className="mb-8 grid gap-6 md:grid-cols-3">


                <div className="rounded-2xl bg-white p-6 shadow">


                    <div className="flex items-center gap-3">


                        <Users className="text-cyan-600"/>


                        <p className="font-medium text-slate-600">

                            Clientes registrados

                        </p>


                    </div>


                    <h2 className="mt-4 text-4xl font-bold">

                        24

                    </h2>


                </div>





                <div className="rounded-2xl bg-white p-6 shadow">


                    <div className="flex items-center gap-3">


                        <Package className="text-cyan-600"/>


                        <p className="font-medium text-slate-600">

                            Equipos vendidos

                        </p>


                    </div>


                    <h2 className="mt-4 text-4xl font-bold">

                        86

                    </h2>


                </div>





                <div className="rounded-2xl bg-white p-6 shadow">


                    <div className="flex items-center gap-3">


                        <TrendingUp className="text-cyan-600"/>


                        <p className="font-medium text-slate-600">

                            Crecimiento

                        </p>


                    </div>


                    <h2 className="mt-4 text-4xl font-bold">

                        +18%

                    </h2>


                </div>


            </div>






            <div className="grid gap-6">


                {

                    clientes.map((cliente)=>(


                        <div

                            key={cliente.nombre}

                            className="rounded-2xl bg-white p-8 shadow"

                        >


                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                <div>


                                    <div className="flex items-center gap-3">


                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                                            <Building2 size={28}/>


                                        </div>



                                        <div>


                                            <h2 className="text-2xl font-bold">

                                                {cliente.nombre}

                                            </h2>


                                            <p className="text-slate-500">

                                                {cliente.ciudad}

                                            </p>


                                        </div>


                                    </div>





                                    <div className="mt-6 space-y-2 text-slate-600">


                                        <p className="flex items-center gap-2">


                                            <Package size={18}/>

                                            Equipos adquiridos: {cliente.equipos}


                                        </p>




                                        <p className="flex items-center gap-2">


                                            <Calendar size={18}/>

                                            Última operación: {cliente.fecha}


                                        </p>



                                        <p>

                                            Último equipo: {cliente.ultimaCompra}

                                        </p>


                                    </div>


                                </div>






                                <div className="flex flex-col items-end gap-4">


                                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                                        {cliente.estado}

                                    </span>




                                    <button

                                        className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-slate-100"

                                    >

                                        <Eye size={18}/>

                                        Ver cliente


                                    </button>


                                </div>


                            </div>


                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default ClientesInstitucion;