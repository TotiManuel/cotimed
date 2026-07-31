import {
    Search,
    Building2,
    MapPin,
    Star,
    Package,
    CheckCircle
} from "lucide-react";


const ProveedoresInstitucion = () => {


    const proveedores = [

        {
            empresa: "Philips Healthcare",
            ubicacion: "Buenos Aires",
            especialidad: "Diagnóstico por imágenes",
            equipos: 132,
            rating: 4.9,
            verificado: true
        },


        {
            empresa: "GE HealthCare",
            ubicacion: "Córdoba",
            especialidad: "Monitoreo y terapia intensiva",
            equipos: 96,
            rating: 4.8,
            verificado: true
        },


        {
            empresa: "Siemens Healthineers",
            ubicacion: "Rosario",
            especialidad: "Equipamiento hospitalario",
            equipos: 184,
            rating: 4.9,
            verificado: true
        },


        {
            empresa: "MedTech Argentina",
            ubicacion: "Mendoza",
            especialidad: "Instrumental médico",
            equipos: 41,
            rating: 4.6,
            verificado: true
        }

    ];



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Proveedores

                </h1>


                <p className="mt-2 text-slate-600">

                    Encontrá proveedores médicos verificados dentro de CotiMed.

                </p>


            </div>





            <div className="mb-8 rounded-2xl bg-white p-6 shadow">


                <div className="relative">


                    <Search

                        size={20}

                        className="absolute left-4 top-3.5 text-slate-400"

                    />



                    <input

                        placeholder="Buscar proveedor o especialidad..."

                        className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-cyan-600"

                    />


                </div>


            </div>





            <div className="grid gap-6 lg:grid-cols-2">


                {

                    proveedores.map((proveedor)=>(


                        <div

                            key={proveedor.empresa}

                            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"

                        >


                            <div className="flex items-start justify-between">


                                <div className="flex gap-4">


                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                                        <Building2 size={32}/>


                                    </div>


                                    <div>


                                        <div className="flex items-center gap-2">


                                            <h2 className="text-2xl font-bold">

                                                {proveedor.empresa}

                                            </h2>


                                            {
                                                proveedor.verificado && (

                                                    <CheckCircle

                                                        size={20}

                                                        className="text-emerald-600"

                                                    />

                                                )
                                            }


                                        </div>


                                        <p className="mt-2 text-slate-500">

                                            {proveedor.especialidad}

                                        </p>


                                    </div>


                                </div>


                            </div>





                            <div className="mt-6 space-y-4">


                                <div className="flex items-center gap-3 text-slate-600">


                                    <MapPin size={18}/>

                                    {proveedor.ubicacion}


                                </div>




                                <div className="flex items-center gap-3 text-slate-600">


                                    <Package size={18}/>


                                    {proveedor.equipos} equipos disponibles


                                </div>





                                <div className="flex items-center gap-3">


                                    <Star

                                        size={18}

                                        className="fill-yellow-400 text-yellow-400"

                                    />


                                    <span className="font-semibold">

                                        {proveedor.rating}

                                    </span>


                                    <span className="text-slate-500">

                                        reputación

                                    </span>


                                </div>


                            </div>





                            <div className="mt-8 flex gap-4">


                                <button

                                    className="flex-1 rounded-xl bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700"

                                >

                                    Ver perfil


                                </button>



                                <button

                                    className="flex-1 rounded-xl border py-3 font-semibold hover:bg-slate-100"

                                >

                                    Solicitar cotización


                                </button>


                            </div>


                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default ProveedoresInstitucion;