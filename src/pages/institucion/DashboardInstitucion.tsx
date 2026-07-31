const DashboardInstitucion = () => {

    const resumen = [

        {
            titulo: "Solicitudes activas",
            valor: 12,
            color: "bg-cyan-600"
        },

        {
            titulo: "Cotizaciones recibidas",
            valor: 48,
            color: "bg-emerald-600"
        },

        {
            titulo: "Proveedores favoritos",
            valor: 18,
            color: "bg-violet-600"
        },

        {
            titulo: "Solicitudes finalizadas",
            valor: 94,
            color: "bg-amber-500"
        }

    ];

    const solicitudes = [

        {
            codigo: "SOL-00125",
            equipo: "Tomógrafo Computado",
            estado: "Cotizando",
            respuestas: 7
        },

        {
            codigo: "SOL-00126",
            equipo: "Monitor Multiparamétrico",
            estado: "Abierta",
            respuestas: 2
        },

        {
            codigo: "SOL-00127",
            equipo: "Ecógrafo",
            estado: "Finalizada",
            respuestas: 9
        }

    ];

    return (

        <>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Dashboard

                </h1>

                <p className="mt-2 text-slate-600">

                    Bienvenido nuevamente. Este es el resumen de la actividad de tu institución.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    resumen.map((card) => (

                        <div
                            key={card.titulo}
                            className="rounded-2xl bg-white p-6 shadow"
                        >

                            <div className={`mb-5 h-3 w-20 rounded-full ${card.color}`} />

                            <p className="text-slate-500">

                                {card.titulo}

                            </p>

                            <h2 className="mt-3 text-5xl font-bold text-slate-900">

                                {card.valor}

                            </h2>

                        </div>

                    ))

                }

            </div>

            <div className="mt-10 grid gap-8 xl:grid-cols-3">

                <section className="xl:col-span-2 rounded-2xl bg-white p-8 shadow">

                    <div className="mb-8 flex items-center justify-between">

                        <h2 className="text-2xl font-bold">

                            Últimas solicitudes

                        </h2>

                        <button className="rounded-lg bg-cyan-600 px-5 py-2 font-semibold text-white hover:bg-cyan-700">

                            Nueva solicitud

                        </button>

                    </div>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="py-4 text-left">

                                    Código

                                </th>

                                <th className="py-4 text-left">

                                    Equipamiento

                                </th>

                                <th className="py-4 text-left">

                                    Estado

                                </th>

                                <th className="py-4 text-left">

                                    Cotizaciones

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                solicitudes.map((item) => (

                                    <tr
                                        key={item.codigo}
                                        className="border-b"
                                    >

                                        <td className="py-5 font-semibold">

                                            {item.codigo}

                                        </td>

                                        <td>

                                            {item.equipo}

                                        </td>

                                        <td>

                                            {item.estado}

                                        </td>

                                        <td>

                                            {item.respuestas}

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </section>

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Actividad reciente

                    </h2>

                    <div className="space-y-6">

                        <div className="rounded-xl border p-4">

                            <p className="font-semibold">

                                Nueva cotización recibida

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                                Philips Healthcare respondió una solicitud.

                            </p>

                        </div>

                        <div className="rounded-xl border p-4">

                            <p className="font-semibold">

                                Solicitud publicada

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                                Ecógrafo de alta resolución.

                            </p>

                        </div>

                        <div className="rounded-xl border p-4">

                            <p className="font-semibold">

                                Comparación completada

                            </p>

                            <p className="mt-1 text-sm text-slate-500">

                                Se compararon 8 cotizaciones.

                            </p>

                        </div>

                    </div>

                </section>

            </div>

        </>

    );

};

export default DashboardInstitucion;