const ComparadorCotizaciones = () => {


    const propuestas = [

        {
            proveedor: "Philips Healthcare",
            precio: "USD 285.000",
            entrega: "60 días",
            garantia: "3 años",
            experiencia: "Excelente",
            puntaje: 92
        },

        {
            proveedor: "GE HealthCare",
            precio: "USD 292.000",
            entrega: "45 días",
            garantia: "2 años",
            experiencia: "Muy buena",
            puntaje: 88
        },

        {
            proveedor: "Siemens Healthineers",
            precio: "USD 310.000",
            entrega: "30 días",
            garantia: "5 años",
            experiencia: "Excelente",
            puntaje: 96
        }

    ];



    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Comparador de cotizaciones

                </h1>


                <p className="mt-2 text-slate-600">

                    Compará las propuestas recibidas y elegí la mejor opción para tu institución.

                </p>


            </div>



            <div className="rounded-2xl bg-white p-8 shadow">


                <div className="mb-8 flex items-center justify-between">


                    <div>

                        <h2 className="text-2xl font-bold">

                            Tomógrafo Computado Multicorte

                        </h2>


                        <p className="mt-2 text-slate-500">

                            Solicitud SOL-00125

                        </p>


                    </div>


                    <button
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
                    >

                        Exportar comparación

                    </button>


                </div>




                <div className="overflow-x-auto">


                    <table className="w-full">


                        <thead>


                            <tr className="border-b bg-slate-50">


                                <th className="px-6 py-5 text-left">

                                    Característica

                                </th>


                                {

                                    propuestas.map((item)=>(

                                        <th
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center"
                                        >

                                            {item.proveedor}

                                        </th>

                                    ))

                                }


                            </tr>


                        </thead>



                        <tbody>



                            <tr className="border-b">


                                <td className="px-6 py-5 font-semibold">

                                    Precio

                                </td>


                                {

                                    propuestas.map((item)=>(

                                        <td
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center font-bold text-cyan-600"
                                        >

                                            {item.precio}

                                        </td>

                                    ))

                                }


                            </tr>





                            <tr className="border-b">


                                <td className="px-6 py-5 font-semibold">

                                    Tiempo de entrega

                                </td>


                                {

                                    propuestas.map((item)=>(

                                        <td
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center"
                                        >

                                            {item.entrega}

                                        </td>

                                    ))

                                }


                            </tr>





                            <tr className="border-b">


                                <td className="px-6 py-5 font-semibold">

                                    Garantía

                                </td>


                                {

                                    propuestas.map((item)=>(

                                        <td
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center"
                                        >

                                            {item.garantia}

                                        </td>

                                    ))

                                }


                            </tr>





                            <tr className="border-b">


                                <td className="px-6 py-5 font-semibold">

                                    Experiencia

                                </td>


                                {

                                    propuestas.map((item)=>(

                                        <td
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center"
                                        >

                                            {item.experiencia}

                                        </td>

                                    ))

                                }


                            </tr>





                            <tr>


                                <td className="px-6 py-5 font-semibold">

                                    Puntaje CotiMed

                                </td>


                                {

                                    propuestas.map((item)=>(

                                        <td
                                            key={item.proveedor}
                                            className="px-6 py-5 text-center"
                                        >


                                            <div className="mx-auto w-24 rounded-full bg-emerald-100 px-3 py-2 font-bold text-emerald-700">

                                                {item.puntaje}/100

                                            </div>


                                        </td>

                                    ))

                                }


                            </tr>



                        </tbody>



                    </table>


                </div>



                <div className="mt-10 rounded-xl bg-cyan-50 p-6">


                    <h3 className="text-xl font-bold text-cyan-900">

                        Recomendación CotiMed

                    </h3>


                    <p className="mt-3 text-cyan-800">

                        Según precio, tiempo de entrega, garantía y reputación del proveedor,
                        Siemens Healthineers presenta la propuesta más conveniente.

                    </p>


                </div>



            </div>


        </>

    );

};


export default ComparadorCotizaciones;