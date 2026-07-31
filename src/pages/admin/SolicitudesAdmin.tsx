const SolicitudesAdmin = () => {

    const solicitudes = [

        {
            codigo: "SOL-0001",
            institucion: "Hospital Central",
            equipamiento: "Tomógrafo Computado",
            presupuesto: "USD 350.000",
            estado: "Abierta"
        },

        {
            codigo: "SOL-0002",
            institucion: "Clínica Norte",
            equipamiento: "Monitor Multiparamétrico",
            presupuesto: "USD 45.000",
            estado: "Cotizando"
        },

        {
            codigo: "SOL-0003",
            institucion: "Sanatorio Sur",
            equipamiento: "Ecógrafo",
            presupuesto: "USD 60.000",
            estado: "Finalizada"
        },

        {
            codigo: "SOL-0004",
            institucion: "Hospital Municipal",
            equipamiento: "Respirador Mecánico",
            presupuesto: "USD 120.000",
            estado: "Abierta"
        }

    ];

    const colorEstado = (estado: string) => {

        switch (estado) {

            case "Abierta":
                return "bg-emerald-100 text-emerald-700";

            case "Cotizando":
                return "bg-amber-100 text-amber-700";

            case "Finalizada":
                return "bg-slate-200 text-slate-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    return (

        <>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Solicitudes

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Supervisá todas las solicitudes publicadas por las instituciones.

                    </p>

                </div>

                <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">

                    Nueva solicitud

                </button>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Código

                            </th>

                            <th className="px-6 py-4 text-left">

                                Institución

                            </th>

                            <th className="px-6 py-4 text-left">

                                Equipamiento

                            </th>

                            <th className="px-6 py-4 text-left">

                                Presupuesto

                            </th>

                            <th className="px-6 py-4 text-left">

                                Estado

                            </th>

                            <th className="px-6 py-4 text-center">

                                Acciones

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            solicitudes.map((solicitud) => (

                                <tr
                                    key={solicitud.codigo}
                                    className="border-t"
                                >

                                    <td className="px-6 py-5 font-semibold">

                                        {solicitud.codigo}

                                    </td>

                                    <td className="px-6 py-5">

                                        {solicitud.institucion}

                                    </td>

                                    <td className="px-6 py-5">

                                        {solicitud.equipamiento}

                                    </td>

                                    <td className="px-6 py-5">

                                        {solicitud.presupuesto}

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(solicitud.estado)}`}
                                        >

                                            {solicitud.estado}

                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-center">

                                        <button className="rounded-lg border px-4 py-2 transition hover:bg-slate-100">

                                            Ver

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

};

export default SolicitudesAdmin;