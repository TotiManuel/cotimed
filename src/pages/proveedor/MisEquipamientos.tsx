import {
    Package,
    Plus,
    Edit,
    Trash2,
    CheckCircle
} from "lucide-react";


const MisEquipamientos = () => {


    const equipos = [

        {
            nombre: "Monitor Multiparamétrico",
            categoria: "Monitoreo",
            marca: "Philips",
            modelo: "IntelliVue MX450",
            precio: "USD 3.200",
            estado: "Publicado"
        },


        {
            nombre: "Ecógrafo Doppler Color",
            categoria: "Diagnóstico por imágenes",
            marca: "Siemens",
            modelo: "Acuson X300",
            precio: "USD 42.000",
            estado: "Publicado"
        },


        {
            nombre: "Respirador Mecánico",
            categoria: "Terapia Intensiva",
            marca: "Dräger",
            modelo: "Evita V800",
            precio: "USD 18.500",
            estado: "Pausado"
        }

    ];



    return (

        <>


            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">


                <div>


                    <h1 className="text-4xl font-bold text-slate-900">

                        Mis equipamientos

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Administrá los equipos médicos publicados en CotiMed.

                    </p>


                </div>




                <button

                    className="flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                >

                    <Plus size={20}/>

                    Agregar equipamiento

                </button>


            </div>





            <div className="grid gap-6">


                {

                    equipos.map((equipo)=>(


                        <div

                            key={equipo.nombre}

                            className="rounded-2xl bg-white p-8 shadow"

                        >



                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                <div className="flex gap-5">


                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                                        <Package size={32}/>


                                    </div>




                                    <div>


                                        <div className="flex items-center gap-3">


                                            <h2 className="text-2xl font-bold">

                                                {equipo.nombre}

                                            </h2>


                                            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">


                                                <CheckCircle size={15}/>

                                                {equipo.estado}


                                            </span>


                                        </div>




                                        <p className="mt-2 text-slate-600">

                                            {equipo.categoria}

                                        </p>



                                        <p className="mt-1 text-slate-500">

                                            {equipo.marca} - {equipo.modelo}

                                        </p>


                                    </div>


                                </div>





                                <div className="text-right">


                                    <p className="text-sm text-slate-500">

                                        Precio estimado

                                    </p>


                                    <p className="mt-2 text-2xl font-bold text-cyan-600">

                                        {equipo.precio}

                                    </p>


                                </div>


                            </div>






                            <div className="mt-8 flex flex-wrap gap-4">


                                <button

                                    className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-slate-100"

                                >

                                    <Edit size={18}/>

                                    Editar

                                </button>





                                <button

                                    className="flex items-center gap-2 rounded-xl border border-red-300 px-5 py-3 font-semibold text-red-600 hover:bg-red-50"

                                >

                                    <Trash2 size={18}/>

                                    Eliminar

                                </button>


                            </div>



                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default MisEquipamientos;