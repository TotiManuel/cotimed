import { useNavigate } from "react-router-dom";

const ProveedoresAdmin = () => {

    const navigate = useNavigate();

    const proveedores = [

        {
            empresa: "Philips Healthcare",
            ciudad: "Buenos Aires",
            equipos: 132,
            estado: "Activo"
        },

        {
            empresa: "GE HealthCare",
            ciudad: "Córdoba",
            equipos: 96,
            estado: "Activo"
        },

        {
            empresa: "Siemens Healthineers",
            ciudad: "Rosario",
            equipos: 184,
            estado: "Activo"
        },

        {
            empresa: "MedTech Argentina",
            ciudad: "Mendoza",
            equipos: 41,
            estado: "Pendiente"
        }

    ];

    return (

        <>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Proveedores

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Administrá los proveedores registrados en CotiMed.

                    </p>

                </div>

                <button className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
                    onClick={() => navigate("/admin/AddProveedor")}
                >

                    Nuevo proveedor

                </button>

            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Empresa

                            </th>

                            <th className="px-6 py-4 text-left">

                                Ciudad

                            </th>

                            <th className="px-6 py-4 text-left">

                                Equipamientos

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

                            proveedores.map((proveedor) => (

                                <tr
                                    key={proveedor.empresa}
                                    className="border-t"
                                >

                                    <td className="px-6 py-5 font-semibold">

                                        {proveedor.empresa}

                                    </td>

                                    <td className="px-6 py-5">

                                        {proveedor.ciudad}

                                    </td>

                                    <td className="px-6 py-5">

                                        {proveedor.equipos}

                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">

                                            {proveedor.estado}

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

export default ProveedoresAdmin;