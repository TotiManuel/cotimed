import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarSolicitudesPorInstitucion,
    type Solicitud
} from "../../services/solicitud.service";

import {
    listarCotizacionesPorSolicitud,
    type Cotizacion
} from "../../services/cotizaciones.service";


const DashboardInstitucion = () => {

    const navigate = useNavigate();


    const [solicitudes, setSolicitudes] =
        useState<Solicitud[]>([]);

    const [cotizaciones, setCotizaciones] =
        useState<Cotizacion[]>([]);


    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     * ================================
     * ID DE LA INSTITUCIÓN
     * ================================
     */

    const usuarioGuardado =
        localStorage.getItem("user");

    const usuario =
        usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;


    const idInstitucion = Number(
        usuario?.id_institucion ??
        usuario?.id ??
        0
    );


    /*
     * ================================
     * CARGAR DATOS
     * ================================
     */

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                setCargando(true);

                setError("");


                if (!idInstitucion) {

                    throw new Error(
                        "No se pudo identificar la institución."
                    );

                }


                /*
                 * SOLICITUDES
                 */

                const solicitudesData =
                    await listarSolicitudesPorInstitucion(
                        idInstitucion
                    );


                setSolicitudes(
                    solicitudesData
                );


                /*
                 * COTIZACIONES
                 */

                const cotizacionesPorSolicitud =
                    await Promise.all(

                        solicitudesData.map(
                            (solicitud) =>
                                listarCotizacionesPorSolicitud(
                                    solicitud.id_solicitud
                                )
                        )

                    );


                setCotizaciones(
                    cotizacionesPorSolicitud.flat()
                );


            } catch (err) {

                console.error(
                    "Error cargando dashboard:",
                    err
                );


                setError(
                    "No se pudo cargar la información del dashboard."
                );


            } finally {

                setCargando(false);

            }

        };


        cargarDatos();

    }, [idInstitucion]);


    /*
     * ================================
     * RESUMEN
     * ================================
     */

    const resumen = useMemo(() => {

        const solicitudesActivas =
            solicitudes.filter(
                (solicitud) =>
                    solicitud.estado_solicitud
                        ?.toLowerCase() !==
                    "finalizada"
            ).length;


        const solicitudesFinalizadas =
            solicitudes.filter(
                (solicitud) =>
                    solicitud.estado_solicitud
                        ?.toLowerCase() ===
                    "finalizada"
            ).length;


        const proveedores =
            new Set(

                cotizaciones.map(
                    (cotizacion) =>
                        cotizacion.id_proveedor
                )

            );


        return [

            {
                titulo: "Solicitudes activas",
                valor: solicitudesActivas,
                color: "bg-cyan-600"
            },

            {
                titulo: "Cotizaciones recibidas",
                valor: cotizaciones.length,
                color: "bg-emerald-600"
            },

            {
                titulo: "Proveedores",
                valor: proveedores.size,
                color: "bg-violet-600"
            },

            {
                titulo: "Solicitudes finalizadas",
                valor: solicitudesFinalizadas,
                color: "bg-amber-500"
            }

        ];

    }, [
        solicitudes,
        cotizaciones
    ]);


    /*
     * ================================
     * ÚLTIMAS SOLICITUDES
     * ================================
     */

    const ultimasSolicitudes =
        useMemo(() => {

            return [...solicitudes]

                .sort(
                    (a, b) =>
                        new Date(
                            b.fecha_creacion_solicitud
                        ).getTime() -
                        new Date(
                            a.fecha_creacion_solicitud
                        ).getTime()
                )

                .slice(0, 5);

        }, [solicitudes]);


    /*
     * ================================
     * ÚLTIMAS COTIZACIONES
     * ================================
     */

    const ultimasCotizaciones =
        useMemo(() => {

            return [...cotizaciones]

                .sort(
                    (a, b) =>
                        new Date(
                            b.fecha_envio_cotizacion
                        ).getTime() -
                        new Date(
                            a.fecha_envio_cotizacion
                        ).getTime()
                )

                .slice(0, 3);

        }, [cotizaciones]);


    /*
     * ================================
     * CANTIDAD DE COTIZACIONES
     * ================================
     */

    const cantidadCotizaciones = (
        idSolicitud: number
    ) => {

        return cotizaciones.filter(
            (cotizacion) =>
                cotizacion.id_solicitud ===
                idSolicitud
        ).length;

    };


    /*
     * ================================
     * ESTADO
     * ================================
     */

    const obtenerEstado = (
        estado: string
    ) => {

        const estadoNormalizado =
            estado?.toLowerCase();


        if (
            estadoNormalizado ===
                "finalizada" ||
            estadoNormalizado ===
                "completada"
        ) {

            return "bg-emerald-100 text-emerald-700";

        }


        if (
            estadoNormalizado ===
            "cotizando"
        ) {

            return "bg-blue-100 text-blue-700";

        }


        if (
            estadoNormalizado ===
            "cancelada"
        ) {

            return "bg-red-100 text-red-700";

        }


        return "bg-amber-100 text-amber-700";

    };


    /*
     * ================================
     * LOADING
     * ================================
     */

    if (cargando) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />

                    <p className="mt-4 text-slate-500">

                        Cargando dashboard...

                    </p>

                </div>

            </div>

        );

    }


    /*
     * ================================
     * ERROR
     * ================================
     */

    if (error) {

        return (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h2 className="font-bold text-red-700">

                    No se pudo cargar el dashboard

                </h2>


                <p className="mt-2 text-red-600">

                    {error}

                </p>

            </div>

        );

    }


    /*
     * ================================
     * RENDER
     * ================================
     */

    return (

        <>

            {/* ================================ */}
            {/* ENCABEZADO */}
            {/* ================================ */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Dashboard

                </h1>


                <p className="mt-2 text-slate-600">

                    Bienvenido nuevamente. Este es el resumen
                    de la actividad de tu institución.

                </p>

            </div>


            {/* ================================ */}
            {/* RESUMEN */}
            {/* ================================ */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {resumen.map((card) => (

                    <div
                        key={card.titulo}
                        className="rounded-2xl bg-white p-6 shadow"
                    >

                        <div
                            className={`mb-5 h-3 w-20 rounded-full ${card.color}`}
                        />


                        <p className="text-slate-500">

                            {card.titulo}

                        </p>


                        <h2 className="mt-3 text-5xl font-bold text-slate-900">

                            {card.valor}

                        </h2>

                    </div>

                ))}

            </div>


            {/* ================================ */}
            {/* SOLICITUDES + ACTIVIDAD */}
            {/* ================================ */}

            <div className="mt-10 grid gap-8 xl:grid-cols-3">


                {/* ================================ */}
                {/* SOLICITUDES */}
                {/* ================================ */}

                <section className="overflow-hidden rounded-2xl bg-white p-8 shadow xl:col-span-2">

                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <h2 className="text-2xl font-bold">

                            Últimas solicitudes

                        </h2>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/institucion/solicitudes/nueva"
                                )
                            }
                            className="rounded-lg bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-700"
                        >

                            Nueva solicitud

                        </button>

                    </div>


                    {ultimasSolicitudes.length === 0 ? (

                        <div className="rounded-xl border border-dashed p-8 text-center">

                            <p className="font-semibold text-slate-700">

                                Todavía no tenés solicitudes.

                            </p>


                            <p className="mt-2 text-sm text-slate-500">

                                Creá una solicitud para comenzar
                                a recibir cotizaciones.

                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[650px]">

                                <thead>

                                    <tr className="border-b">

                                        <th className="py-4 text-left">

                                            Solicitud

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

                                    {ultimasSolicitudes.map(
                                        (solicitud) => (

                                            <tr
                                                key={
                                                    solicitud.id_solicitud
                                                }
                                                className="border-b last:border-0"
                                            >

                                                <td className="py-5">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/institucion/solicitudes/${solicitud.id_solicitud}`
                                                            )
                                                        }
                                                        className="text-left font-semibold text-cyan-700 hover:text-cyan-800"
                                                    >

                                                        SOL-

                                                        {String(
                                                            solicitud.id_solicitud
                                                        ).padStart(
                                                            5,
                                                            "0"
                                                        )}

                                                    </button>

                                                </td>


                                                <td className="py-5">

                                                    <p className="font-medium text-slate-800">

                                                        {
                                                            solicitud.equipamiento_solicitud
                                                        }

                                                    </p>


                                                    <p className="mt-1 text-sm text-slate-500">

                                                        {
                                                            solicitud.titulo_solicitud
                                                        }

                                                    </p>

                                                </td>


                                                <td className="py-5">

                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${obtenerEstado(
                                                            solicitud.estado_solicitud
                                                        )}`}
                                                    >

                                                        {
                                                            solicitud.estado_solicitud
                                                        }

                                                    </span>

                                                </td>


                                                <td className="py-5 font-semibold">

                                                    {
                                                        cantidadCotizaciones(
                                                            solicitud.id_solicitud
                                                        )
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>


                {/* ================================ */}
                {/* ACTIVIDAD */}
                {/* ================================ */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Actividad reciente

                    </h2>


                    {ultimasCotizaciones.length === 0 &&
                    solicitudes.length === 0 ? (

                        <p className="text-slate-500">

                            Todavía no hay actividad.

                        </p>

                    ) : (

                        <div className="space-y-6">


                            {/* COTIZACIONES */}

                            {ultimasCotizaciones.map(
                                (cotizacion) => (

                                    <div
                                        key={
                                            cotizacion.id_cotizacion
                                        }
                                        className="rounded-xl border p-4"
                                    >

                                        <p className="font-semibold">

                                            Nueva cotización recibida

                                        </p>


                                        <p className="mt-1 text-sm text-slate-500">

                                            {
                                                cotizacion.nombre_proveedor
                                            }{" "}

                                            envió una cotización
                                            para una solicitud.

                                        </p>

                                    </div>

                                )
                            )}


                            {/* SOLICITUDES */}

                            {[...solicitudes]

                                .sort(
                                    (a, b) =>
                                        new Date(
                                            b.fecha_creacion_solicitud
                                        ).getTime() -
                                        new Date(
                                            a.fecha_creacion_solicitud
                                        ).getTime()
                                )

                                .slice(0, 3)

                                .map(
                                    (solicitud) => (

                                        <div
                                            key={
                                                `solicitud-${solicitud.id_solicitud}`
                                            }
                                            className="rounded-xl border p-4"
                                        >

                                            <p className="font-semibold">

                                                Solicitud registrada

                                            </p>


                                            <p className="mt-1 text-sm text-slate-500">

                                                {
                                                    solicitud.titulo_solicitud
                                                }

                                            </p>

                                        </div>

                                    )
                                )}

                        </div>

                    )}

                </section>

            </div>

        </>

    );

};


export default DashboardInstitucion;