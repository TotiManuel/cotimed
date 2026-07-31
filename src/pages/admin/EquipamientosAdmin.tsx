const EquipamientosAdmin = () => {

    const equipamientos = [

        {
            nombre: "Tomógrafo Computado",
            categoria: "Diagnóstico por imágenes",
            proveedor: "Philips Healthcare",
            precio: "USD 280.000",
            estado: "Publicado"
        },

        {
            nombre: "Monitor Multiparamétrico",
            categoria: "Monitoreo",
            proveedor: "GE HealthCare",
            precio: "USD 2.850",
            estado: "Publicado"
        },

        {
            nombre: "Respirador Mecánico",
            categoria: "Terapia Intensiva",
            proveedor: "MedTech Argentina",
            precio: "USD 18.500",
            estado: "Pendiente"
        },

        {
            nombre: "Ecógrafo",
            categoria: "Diagnóstico por imágenes",
            proveedor: "Siemens Healthineers",
            precio: "USD 39.900",
            estado: "Publicado"
        }

    ];

    return (

        <>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Equipamientos

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Gestioná todos los equipos publicados por los proveedores.

                    </p>

                </div>

                <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700">

                    Agregar equipamiento

                </button>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Equipo

                            </th>

                            <th className="px-6 py-4 text-left">

                                Categoría

                            </th>

                            <th className="px-6 py-4 text-left">

                                Proveedor

                            </th>

                            <th className="px-6 py-4 text-left">

                                Precio

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

                            equipamientos.map((equipo) => (

                                <tr
                                    key={equipo.nombre}
                                    className="border-t"
                                >

                                    <td className="px-6 py-5 font-semibold">

                                        {equipo.nombre}

                                    </td>

                                    <td className="px-6 py-5">

                                        {equipo.categoria}

                                    </td>

                                    <td className="px-6 py-5">

                                        {equipo.proveedor}

                                    </td>

                                    <td className="px-6 py-5">

                                        {equipo.precio}

                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">

                                            {equipo.estado}

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

export default EquipamientosAdmin;