import {
    Star,
    Building2,
    Package,
    Trash2
} from "lucide-react";


const FavoritosInstitucion = () => {


    const favoritos = [

        {
            tipo: "Proveedor",
            nombre: "Philips Healthcare",
            detalle: "Diagnóstico por imágenes",
            icono: "empresa"
        },


        {
            tipo: "Proveedor",
            nombre: "Siemens Healthineers",
            detalle: "Equipamiento hospitalario",
            icono: "empresa"
        },


        {
            tipo: "Equipamiento",
            nombre: "Monitor Multiparamétrico",
            detalle: "Monitoreo de pacientes",
            icono: "equipo"
        },


        {
            tipo: "Equipamiento",
            nombre: "Ecógrafo Doppler Color",
            detalle: "Diagnóstico por imágenes",
            icono: "equipo"
        }

    ];



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Favoritos

                </h1>


                <p className="mt-2 text-slate-600">

                    Accedé rápidamente a proveedores y equipamientos guardados.

                </p>


            </div>





            <div className="grid gap-6 lg:grid-cols-2">


                {

                    favoritos.map((item,index)=>(


                        <div

                            key={index}

                            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"

                        >


                            <div className="flex items-center justify-between">


                                <div className="flex items-center gap-4">


                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">


                                        {
                                            item.icono === "empresa"

                                            ?

                                            <Building2 size={28}/>

                                            :

                                            <Package size={28}/>

                                        }


                                    </div>




                                    <div>


                                        <div className="flex items-center gap-2">


                                            <h2 className="text-xl font-bold">

                                                {item.nombre}

                                            </h2>


                                            <Star

                                                size={18}

                                                className="fill-yellow-400 text-yellow-400"

                                            />


                                        </div>



                                        <p className="mt-1 text-sm text-slate-500">

                                            {item.tipo}

                                        </p>


                                    </div>


                                </div>



                                <button

                                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"

                                >

                                    <Trash2 size={20}/>

                                </button>


                            </div>





                            <p className="mt-6 text-slate-600">

                                {item.detalle}

                            </p>





                            <div className="mt-6">


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


export default FavoritosInstitucion;