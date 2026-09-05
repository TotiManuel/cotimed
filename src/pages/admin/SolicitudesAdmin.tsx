import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtener } from "../../services/solicitud.service";

const SolicitudesAdmin = () => {

    const navigate = useNavigate();

    const [solicitudes, setSolicitudes] = useState<any[]>([]);

    useEffect(() => {

        obtener()
            .then((data) => {

                setSolicitudes(data);

            })
            .catch((error) => {

                console.log(
                    "Error cargando solicitudes",
                    error
                );

            });

    }, []);


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

                <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    onClick={() => navigate("/admin/AddSolicitud")}
                >

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
                                    key={solicitud.id_solicitud}
                                    className="border-t"
                                >

                                    {/* ID */}

                                    <td className="px-6 py-5 font-semibold">

                                        #{solicitud.id_solicitud}

                                    </td>


                                    {/* INSTITUCIÓN */}

                                    <td className="px-6 py-5">

                                        {solicitud.nombre_institucion}

                                    </td>


                                    {/* EQUIPAMIENTO */}

                                    <td className="px-6 py-5">

                                        {solicitud.equipamiento_solicitud}

                                    </td>


                                    {/* PRESUPUESTO */}

                                    <td className="px-6 py-5">

                                        $
                                        {solicitud.presupuesto_estimado_solicitud.toLocaleString(
                                            "es-AR"
                                        )}

                                    </td>


                                    {/* ESTADO */}

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                                                solicitud.estado_solicitud
                                            )}`}
                                        >

                                            {solicitud.estado_solicitud}

                                        </span>

                                    </td>


                                    {/* ACCIÓN */}

                                    <td className="px-6 py-5 text-center">

                                        <button
                                            onClick={() =>
                                                navigate(`/admin/VerSolicitud/${solicitud.id_solicitud}`
                                                )
                                            }
                                            className="rounded-lg border px-4 py-2 transition hover:bg-slate-100"
                                        >

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