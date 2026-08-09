import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    listarCotizaciones,
    type Cotizacion
} from "../../services/cotizaciones.service";


const CotizacionesAdmin = () => {


    const navigate = useNavigate();


    const [
        cotizaciones,
        setCotizaciones
    ] = useState<Cotizacion[]>([]);



    /*
     * Cargar cotizaciones
     */

    useEffect(() => {


        listarCotizaciones()

            .then((data) => {

                setCotizaciones(data);

            })

            .catch((error) => {

                console.log(
                    "Error cargando cotizaciones",
                    error
                );

            });


    }, []);



    /*
     * Color según estado
     */

    const colorEstado = (
        estado: string
    ) => {


        switch (estado) {


            case "Pendiente":

                return "bg-amber-100 text-amber-700";


            case "Enviada":

                return "bg-cyan-100 text-cyan-700";


            case "Aceptada":

                return "bg-emerald-100 text-emerald-700";


            case "Rechazada":

                return "bg-red-100 text-red-700";


            case "Cancelada":

                return "bg-slate-200 text-slate-700";


            default:

                return "bg-slate-100 text-slate-700";

        }

    };



    return (

        <>


            {/* ENCABEZADO */}

            <div className="mb-8 flex items-center justify-between">


                <div>


                    <h1 className="text-4xl font-bold text-slate-900">

                        Cotizaciones

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Supervisá todas las cotizaciones recibidas en CotiMed.

                    </p>


                </div>


            </div>



            {/* TABLA */}

            <div className="overflow-hidden rounded-2xl bg-white shadow">


                <table className="w-full">


                    <thead className="bg-slate-100">


                        <tr>


                            {/* CÓDIGO */}

                            <th className="px-6 py-4 text-left">

                                Código

                            </th>


                            {/* PROVEEDOR */}

                            <th className="px-6 py-4 text-left">

                                Proveedor

                            </th>


                            {/* SOLICITUD */}

                            <th className="px-6 py-4 text-left">

                                Solicitud

                            </th>


                            {/* PRECIO */}

                            <th className="px-6 py-4 text-left">

                                Precio total

                            </th>


                            {/* ENTREGA */}

                            <th className="px-6 py-4 text-left">

                                Entrega

                            </th>


                            {/* ESTADO */}

                            <th className="px-6 py-4 text-left">

                                Estado

                            </th>


                            {/* ACCIONES */}

                            <th className="px-6 py-4 text-center">

                                Acciones

                            </th>


                        </tr>


                    </thead>



                    <tbody>


                        {


                            cotizaciones.map(
                                (cotizacion) => (


                                    <tr

                                        key={
                                            cotizacion.id_cotizacion
                                        }

                                        className="border-t"

                                    >


                                        {/* ID */}

                                        <td className="px-6 py-5 font-semibold">

                                            #
                                            {
                                                cotizacion.id_cotizacion
                                            }

                                        </td>



                                        {/* PROVEEDOR */}

                                        <td className="px-6 py-5">

                                            {
                                                cotizacion.nombre_proveedor
                                            }

                                        </td>



                                        {/* SOLICITUD */}

                                        <td className="px-6 py-5">

                                            #
                                            {
                                                cotizacion.id_solicitud
                                            }

                                        </td>



                                        {/* PRECIO */}

                                        <td className="px-6 py-5 font-semibold text-emerald-600">

                                            $

                                            {
                                                Number(
                                                    cotizacion.precio_total_cotizacion
                                                ).toLocaleString(
                                                    "es-AR"
                                                )
                                            }

                                        </td>



                                        {/* PLAZO */}

                                        <td className="px-6 py-5">

                                            {
                                                cotizacion.plazo_entrega_dias_cotizacion
                                            }

                                            {" "}

                                            días

                                        </td>



                                        {/* ESTADO */}

                                        <td className="px-6 py-5">


                                            <span

                                                className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                                                    cotizacion.estado_cotizacion
                                                )}`}

                                            >

                                                {
                                                    cotizacion.estado_cotizacion
                                                }

                                            </span>


                                        </td>



                                        {/* ACCIÓN */}

                                        <td className="px-6 py-5 text-center">


                                            <button

                                                onClick={() =>
                                                    navigate(
                                                        `/admin/VerCotizacion/${cotizacion.id_cotizacion}`
                                                    )
                                                }

                                                className="rounded-lg border px-4 py-2 transition hover:bg-slate-100"

                                            >

                                                Ver

                                            </button>


                                        </td>


                                    </tr>


                                )
                            )

                        }


                    </tbody>


                </table>


            </div>


        </>

    );

};


export default CotizacionesAdmin;