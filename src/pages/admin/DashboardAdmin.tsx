
import { useNavigate } from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    listarInstituciones
} from "../../services/instituciones.service";

import {
    listarProveedores
} from "../../services/proveedores.service";

import {
    listarSolicitudes,
    type Solicitud
} from "../../services/solicitud.service";
import { 
    listarCotizaciones,
    type Cotizacion
} from "../../services/cotizaciones.service";


const DashboardAdmin = () => {


    const navigate = useNavigate();



    /*
     * Estadísticas
     */

    const [
        cantidadInstituciones,
        setCantidadInstituciones
    ] = useState(0);


    const [
        cantidadProveedores,
        setCantidadProveedores
    ] = useState(0);


    const [
        cantidadSolicitudes,
        setCantidadSolicitudes
    ] = useState(0);



    /*
     * Solicitudes recientes
     */

    const [
        solicitudes,
        setSolicitudes
    ] = useState<Solicitud[]>([]);

    const [
        cotizaciones,
        setCotizaciones
    ] = useState<Cotizacion[]>([]);



    /*
     * Cargar instituciones
     */

    useEffect(() => {


        listarInstituciones()

            .then((data) => {

                setCantidadInstituciones(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo instituciones",
                    error
                );

            });


    }, []);



    /*
     * Cargar proveedores
     */

    useEffect(() => {


        listarProveedores()

            .then((data) => {

                setCantidadProveedores(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo proveedores",
                    error
                );

            });


    }, []);



    /*
     * Cargar solicitudes
     */

    useEffect(() => {


        listarSolicitudes()

            .then((data) => {


                /*
                 * Cantidad total
                 */

                setCantidadSolicitudes(
                    data.length
                );


                /*
                 * Solicitudes recientes
                 *
                 * Mostramos las últimas 5.
                 */

                const recientes =
                    [...data]
                        .sort(
                            (a, b) =>
                                new Date(
                                    b.fecha_creacion_solicitud
                                ).getTime()
                                -
                                new Date(
                                    a.fecha_creacion_solicitud
                                ).getTime()
                        )
                        .slice(0, 5);


                setSolicitudes(
                    recientes
                );


            })

            .catch((error) => {

                console.log(
                    "Error obteniendo solicitudes",
                    error
                );

            });


    }, []);

    useEffect(() => {
        listarCotizaciones()
            .then((data) => {
                setCotizaciones(data);
            })
            .catch((error) => {
                console.log("Error obteniendo cotizaciones", error);
            });
    }, []);

    /*
     * Estadísticas
     */

    const estadisticas = [


        {

            titulo:
                "Instituciones",

            valor:
                cantidadInstituciones.toString(),

            color:
                "bg-cyan-500"

        },


        {

            titulo:
                "Proveedores",

            valor:
                cantidadProveedores.toString(),

            color:
                "bg-emerald-500"

        },


        {

            titulo:
                "Solicitudes",

            valor:
                cantidadSolicitudes.toString(),

            color:
                "bg-amber-500"

        },


        {

            titulo:
                "Cotizaciones",

            valor:
                cotizaciones.length.toString(),

            color:
                "bg-violet-500"

        }

    ];



    /*
     * Actividad
     */

    const actividad = [


        "Nuevo proveedor registrado.",

        "Nueva institución creada.",

        "Solicitud publicada.",

        "Cotización enviada.",

        "Equipamiento agregado al catálogo."

    ];



    return (


        <main className="min-h-screen bg-slate-100 p-4 md:p-8">


            <div className="mx-auto max-w-7xl">


                {/* ENCABEZADO */}

                <div className="mb-10">


                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">

                        Dashboard Administrador

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Panel general de administración de CotiMed.

                    </p>


                </div>



                {/* ESTADÍSTICAS */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


                    {

                        estadisticas.map((item) => (


                            <div

                                key={
                                    item.titulo
                                }

                                className="rounded-2xl bg-white p-6 shadow"

                            >


                                <div

                                    className={`mb-4 h-3 w-20 rounded-full ${item.color}`}

                                />


                                <p className="text-slate-500">

                                    {
                                        item.titulo
                                    }

                                </p>


                                <h2 className="mt-2 text-4xl font-bold text-slate-900">

                                    {
                                        item.valor
                                    }

                                </h2>


                            </div>

                        ))

                    }


                </div>



                {/* SOLICITUDES + ACTIVIDAD */}

                <div className="mt-10 grid gap-8 lg:grid-cols-3">


                    {/* SOLICITUDES */}

                    <section className="rounded-2xl bg-white p-6 shadow lg:col-span-2">


                        <div className="mb-6 flex items-center justify-between gap-4">


                            <h2 className="text-2xl font-bold">

                                Solicitudes recientes

                            </h2>


                            <button

                                onClick={() =>
                                    navigate(
                                        "/admin/solicitudes"
                                    )
                                }

                                className="text-sm font-semibold text-cyan-600 hover:text-cyan-700"

                            >

                                Ver todas

                            </button>


                        </div>



                        <div className="overflow-x-auto">


                            <table className="w-full min-w-[700px]">


                                <thead>


                                    <tr className="border-b">


                                        <th className="py-3 text-left">

                                            Institución

                                        </th>


                                        <th className="py-3 text-left">

                                            Equipo

                                        </th>


                                        <th className="py-3 text-left">

                                            Estado

                                        </th>


                                        <th className="py-3 text-left">

                                            Acción

                                        </th>


                                    </tr>


                                </thead>



                                <tbody>


                                    {

                                        solicitudes.length === 0

                                        ?

                                        (

                                            <tr>

                                                <td

                                                    colSpan={4}

                                                    className="py-8 text-center text-slate-500"

                                                >

                                                    No hay solicitudes registradas.

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            solicitudes.map((item) => (


                                                <tr

                                                    key={
                                                        item.id_solicitud
                                                    }

                                                    className="border-b last:border-none"

                                                >


                                                    <td className="py-4">

                                                        {
                                                            item.nombre_institucion
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            item.equipamiento_solicitud
                                                        }

                                                    </td>


                                                    <td>


                                                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold capitalize text-cyan-700">

                                                            {
                                                                item.estado_solicitud
                                                            }

                                                        </span>


                                                    </td>


                                                    <td>


                                                        <button

                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/VerSolicitud/${item.id_solicitud}`
                                                                )
                                                            }

                                                            className="rounded-lg border px-4 py-2 transition hover:bg-slate-100"

                                                        >

                                                            Ver

                                                        </button>


                                                    </td>


                                                </tr>

                                            ))

                                        )

                                    }


                                </tbody>


                            </table>


                        </div>


                    </section>



                    {/* ACTIVIDAD */}

                    <section className="rounded-2xl bg-white p-6 shadow">


                        <h2 className="mb-6 text-2xl font-bold">

                            Actividad reciente

                        </h2>


                        <div className="space-y-4">


                            {

                                actividad.map((item) => (


                                    <div

                                        key={
                                            item
                                        }

                                        className="rounded-xl bg-slate-50 p-4"

                                    >

                                        {
                                            item
                                        }

                                    </div>

                                ))

                            }


                        </div>


                    </section>


                </div>



                {/* GRÁFICO + ACCESOS */}

                <div className="mt-10 grid gap-8 lg:grid-cols-2">


                    {/* GRÁFICO */}

                    <section className="rounded-2xl bg-white p-6 shadow">


                        <h2 className="mb-6 text-2xl font-bold">

                            Crecimiento de la plataforma

                        </h2>


                        <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-center text-slate-400">

                            Próximamente gráfico de estadísticas

                        </div>


                    </section>



                    {/* ACCESOS RÁPIDOS */}

                    <section className="rounded-2xl bg-white p-6 shadow">


                        <h2 className="mb-6 text-2xl font-bold">

                            Accesos rápidos

                        </h2>


                        <div className="grid gap-4">


                            <button

                                className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"

                                onClick={() =>
                                    navigate(
                                        "/admin/Instituciones"
                                    )
                                }

                            >

                                Gestionar Instituciones

                            </button>


                            <button

                                className="rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"

                                onClick={() =>
                                    navigate(
                                        "/admin/Proveedores"
                                    )
                                }

                            >

                                Gestionar Proveedores

                            </button>


                            <button

                                className="rounded-xl bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600"

                                onClick={() =>
                                    navigate(
                                        "/admin/solicitudes"
                                    )
                                }

                            >

                                Ver Solicitudes

                            </button>


                            <button

                                className="rounded-xl bg-slate-800 py-3 font-semibold text-white transition hover:bg-slate-900"

                                onClick={() =>
                                    navigate(
                                        "/admin/configuracion"
                                    )
                                }

                            >

                                Configuración

                            </button>


                        </div>


                    </section>


                </div>


            </div>


        </main>

    );

};


export default DashboardAdmin;

