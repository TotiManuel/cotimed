import {
    Search,
    Package,
    MapPin,
    Star
} from "lucide-react";


const EquipamientosInstitucion = () => {


    const equipos = [

        {
            nombre: "Tomógrafo Computado Multicorte",
            categoria: "Diagnóstico por imágenes",
            proveedor: "Philips Healthcare",
            ubicacion: "Buenos Aires",
            precio: "USD 285.000",
            rating: 4.9
        },

        {
            nombre: "Monitor Multiparamétrico",
            categoria: "Monitoreo",
            proveedor: "GE HealthCare",
            ubicacion: "Córdoba",
            precio: "USD 3.200",
            rating: 4.7
        },

        {
            nombre: "Respirador Mecánico",
            categoria: "Terapia Intensiva",
            proveedor: "MedTech Argentina",
            ubicacion: "Rosario",
            precio: "USD 18.500",
            rating: 4.8
        },

        {
            nombre: "Ecógrafo Doppler Color",
            categoria: "Diagnóstico por imágenes",
            proveedor: "Siemens Healthineers",
            ubicacion: "Buenos Aires",
            precio: "USD 42.000",
            rating: 4.9
        }

    ];



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Equipamientos

                </h1>


                <p className="mt-2 text-slate-600">

                    Explorá equipos médicos disponibles de proveedores verificados.

                </p>


            </div>





            <div className="mb-8 rounded-2xl bg-white p-6 shadow">


                <div className="flex flex-col gap-4 md:flex-row">


                    <div className="relative flex-1">


                        <Search
                            size={20}
                            className="absolute left-4 top-3.5 text-slate-400"
                        />


                        <input

                            placeholder="Buscar equipamiento..."

                            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-cyan-600"

                        />


                    </div>



                    <select
                        className="rounded-xl border px-5 py-3"
                    >

                        <option>

                            Todas las categorías

                        </option>

                        <option>

                            Diagnóstico por imágenes

                        </option>

                        <option>

                            Terapia Intensiva

                        </option>

                        <option>

                            Monitoreo

                        </option>

                    </select>


                </div>


            </div>





            <div className="grid gap-6 lg:grid-cols-2">


                {

                    equipos.map((equipo)=>(


                        <div

                            key={equipo.nombre}

                            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"

                        >



                            <div className="flex items-start justify-between">


                                <div className="flex gap-4">


                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                                        <Package size={28}/>


                                    </div>



                                    <div>


                                        <h2 className="text-xl font-bold">

                                            {equipo.nombre}

                                        </h2>


                                        <p className="mt-1 text-slate-500">

                                            {equipo.categoria}

                                        </p>


                                    </div>


                                </div>


                            </div>





                            <div className="mt-6 space-y-3">


                                <p className="text-slate-700">

                                    Proveedor:

                                    <strong className="ml-2">

                                        {equipo.proveedor}

                                    </strong>

                                </p>



                                <div className="flex items-center gap-2 text-slate-600">


                                    <MapPin size={18}/>

                                    {equipo.ubicacion}


                                </div>



                                <div className="flex items-center gap-2">


                                    <Star
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />


                                    <span className="font-semibold">

                                        {equipo.rating}

                                    </span>


                                </div>


                            </div>





                            <div className="mt-8 flex items-center justify-between">


                                <p className="text-2xl font-bold text-cyan-600">

                                    {equipo.precio}

                                </p>



                                <button

                                    className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"

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


export default EquipamientosInstitucion;