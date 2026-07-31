const CotizacionesInstitucion = () => {


    const cotizaciones = [

        {
            proveedor: "Philips Healthcare",
            solicitud: "Tomógrafo Computado Multicorte",
            precio: "USD 285.000",
            entrega: "60 días",
            garantia: "3 años",
            estado: "Recibida"
        },


        {
            proveedor: "GE HealthCare",
            solicitud: "Tomógrafo Computado Multicorte",
            precio: "USD 292.000",
            entrega: "45 días",
            garantia: "2 años",
            estado: "Recibida"
        },


        {
            proveedor: "Siemens Healthineers",
            solicitud: "Tomógrafo Computado Multicorte",
            precio: "USD 310.000",
            entrega: "30 días",
            garantia: "5 años",
            estado: "Destacada"
        },


        {
            proveedor: "MedTech Argentina",
            solicitud: "Monitor Multiparamétrico",
            precio: "USD 3.200",
            entrega: "15 días",
            garantia: "1 año",
            estado: "Pendiente"
        }

    ];



    const colorEstado = (estado:string)=>{


        switch(estado){


            case "Destacada":
                return "bg-emerald-100 text-emerald-700";


            case "Recibida":
                return "bg-blue-100 text-blue-700";


            case "Pendiente":
                return "bg-amber-100 text-amber-700";


            default:
                return "bg-slate-100 text-slate-700";


        }


    };



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Cotizaciones recibidas

                </h1>


                <p className="mt-2 text-slate-600">

                    Revisá las propuestas enviadas por los proveedores.

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

                                            {cotizacion.proveedor}

                                        </h2>


                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(cotizacion.estado)}`}
                                        >

                                            {cotizacion.estado}

                                        </span>


                                    </div>



                                    <p className="mt-4 text-slate-600">

                                        Equipamiento:

                                        <strong className="ml-2">

                                            {cotizacion.solicitud}

                                        </strong>

                                    </p>



                                </div>




                                <div className="grid grid-cols-3 gap-8 text-center">


                                    <div>


                                        <p className="text-sm text-slate-500">

                                            Precio

                                        </p>


                                        <p className="mt-2 font-bold text-cyan-600">

                                            {cotizacion.precio}

                                        </p>


                                    </div>



                                    <div>


                                        <p className="text-sm text-slate-500">

                                            Entrega

                                        </p>


                                        <p className="mt-2 font-bold">

                                            {cotizacion.entrega}

                                        </p>


                                    </div>



                                    <div>


                                        <p className="text-sm text-slate-500">

                                            Garantía

                                        </p>


                                        <p className="mt-2 font-bold">

                                            {cotizacion.garantia}

                                        </p>


                                    </div>



                                </div>



                            </div>





                            <div className="mt-8 flex flex-wrap gap-4">


                                <button
                                    className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"
                                >

                                    Ver detalle

                                </button>



                                <button
                                    className="rounded-xl border px-5 py-3 font-semibold hover:bg-slate-100"
                                >

                                    Comparar

                                </button>



                                <button
                                    className="rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
                                >

                                    Seleccionar propuesta

                                </button>


                            </div>



                        </div>


                    ))

                }


            </div>



        </>

    );

};


export default CotizacionesInstitucion;