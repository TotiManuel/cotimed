const MisSolicitudes = () => {

    const solicitudes = [

        {
            id: "SOL-00125",
            equipo: "Tomógrafo Computado Multicorte",
            categoria: "Diagnóstico por imágenes",
            estado: "Cotizando",
            cotizaciones: 7,
            fecha: "18/07/2026"
        },

        {
            id: "SOL-00126",
            equipo: "Ecógrafo Doppler Color",
            categoria: "Diagnóstico por imágenes",
            estado: "Abierta",
            cotizaciones: 2,
            fecha: "22/07/2026"
        },

        {
            id: "SOL-00127",
            equipo: "Respirador Mecánico",
            categoria: "Terapia Intensiva",
            estado: "Finalizada",
            cotizaciones: 11,
            fecha: "04/07/2026"
        },

        {
            id: "SOL-00128",
            equipo: "Monitor Multiparamétrico",
            categoria: "Monitoreo",
            estado: "Borrador",
            cotizaciones: 0,
            fecha: "Hoy"
        }

    ];

    const colorEstado = (estado: string) => {

        switch (estado) {

            case "Abierta":
                return "bg-blue-100 text-blue-700";

            case "Cotizando":
                return "bg-amber-100 text-amber-700";

            case "Finalizada":
                return "bg-emerald-100 text-emerald-700";

            case "Borrador":
                return "bg-slate-200 text-slate-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };

    return (

        <>

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Mis solicitudes

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Administrá todas las solicitudes realizadas por tu institución.

                    </p>

                </div>

                <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">

                    Nueva solicitud

                </button>

            </div>

            <div className="grid gap-6">

                {

                    solicitudes.map((solicitud) => (

                        <div
                            key={solicitud.id}
                            className="rounded-2xl bg-white p-8 shadow"
                        >

                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-2xl font-bold">

                                            {solicitud.equipo}

                                        </h2>

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(solicitud.estado)}`}
                                        >
                                            {solicitud.estado}
                                        </span>

                                    </div>

                                    <p className="mt-3 text-slate-600">

                                        Código: <strong>{solicitud.id}</strong>

                                    </p>

                                    <p className="mt-1 text-slate-600">

                                        Categoría: {solicitud.categoria}

                                    </p>

                                    <p className="mt-1 text-slate-600">

                                        Publicada: {solicitud.fecha}

                                    </p>

                                </div>

                                <div className="grid grid-cols-2 gap-8 text-center">

                                    <div>

                                        <p className="text-slate-500">

                                            Cotizaciones

                                        </p>

                                        <h3 className="mt-2 text-4xl font-bold text-cyan-600">

                                            {solicitud.cotizaciones}

                                        </h3>

                                    </div>

                                    <div>

                                        <p className="text-slate-500">

                                            Estado

                                        </p>

                                        <h3 className="mt-2 text-xl font-bold">

                                            {solicitud.estado}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <button className="rounded-lg border px-5 py-2 transition hover:bg-slate-100">

                                    Ver detalles

                                </button>

                                <button className="rounded-lg border px-5 py-2 transition hover:bg-slate-100">

                                    Editar

                                </button>

                                <button className="rounded-lg border px-5 py-2 transition hover:bg-slate-100">

                                    Ver cotizaciones

                                </button>

                                <button className="rounded-lg border border-red-300 px-5 py-2 text-red-600 transition hover:bg-red-50">

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

export default MisSolicitudes;