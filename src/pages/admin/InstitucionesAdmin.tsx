import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerInstituciones } from "../../services/instituciones.service";

const InstitucionesAdmin = () => {

    const navigate = useNavigate();

    const [instituciones, setInstituciones] = useState<any[]>([]);


    useEffect(() => {

        obtenerInstituciones()
            .then((data) => {

                setInstituciones(data);

            })
            .catch((error) => {

                console.log(
                    "Error cargando instituciones",
                    error
                );

            });

    }, []);


    return (

        <>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Instituciones

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Administrá las instituciones registradas en CotiMed.

                    </p>

                </div>

                <button
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
                    onClick={() => navigate("/admin/AddInstitucion")}
                >
                    Nueva institución
                </button>

            </div>


            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Razón social
                            </th>

                            <th className="px-6 py-4 text-left">
                                Organización
                            </th>

                            <th className="px-6 py-4 text-left">
                                Ciudad
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

                        {instituciones.map((institucion) => (

                            <tr
                                key={institucion.id}
                                className="border-t"
                            >

                                <td className="px-6 py-5 font-semibold">
                                    {institucion.razon_social} 
                                </td>


                                <td className="px-6 py-5">
                                    {institucion.email}
                                </td>


                                <td className="px-6 py-5">
                                    {institucion.ciudad_user}
                                </td>


                                <td className="px-6 py-5">

                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">

                                        {institucion.estado}

                                    </span>

                                </td>


                                <td className="px-6 py-5 text-center">

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/instituciones/${institucion.id}`
                                            )
                                        }
                                        className="rounded-lg border px-4 py-2 hover:bg-slate-100"
                                    >

                                        Ver

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </>

    );

};

export default InstitucionesAdmin;