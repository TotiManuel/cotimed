import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarCotizaciones,
    type Cotizacion
} from "../../services/cotizaciones.service";
import {
    listarCotizacionesPorSolicitud
} from "../../services/cotizaciones.service";
import {
    listarSolicitudesPorInstitucion,
    type Solicitud
} from "../../services/solicitud.service";


const CotizacionesInstitucion = () => {

    const navigate = useNavigate();

    const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    /*
     * ==========================================
     * OBTENER INSTITUCIÓN ACTUAL
     * ==========================================
     */

    const usuarioGuardado =
        localStorage.getItem("user");

    const usuario = usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;

    const idInstitucion = Number(
        usuario?.id_institucion ??
        usuario?.id ??
        0
    );


    /*
     * ==========================================
     * CARGAR DATOS
     * ==========================================
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
                 * Obtener solicitudes de la institución.
                 */

                const solicitudesData =
                    await listarSolicitudesPorInstitucion(
                        idInstitucion
                    );

                setSolicitudes(
                    solicitudesData
                );


                /*
                 * Obtener todas las cotizaciones
                 * relacionadas con esas solicitudes.
                 */

                const resultados =
                    await Promise.all(

                        solicitudesData.map(
                            (solicitud) =>
                                listarCotizacionesPorSolicitud(
                                    solicitud.id_solicitud
                                )
                        )

                    );

                setCotizaciones(
                    resultados.flat()
                );

            } catch (err) {

                console.error(
                    "Error cargando cotizaciones:",
                    err
                );

                setError(
                    "No se pudieron cargar las cotizaciones."
                );

            } finally {

                setCargando(false);

            }

        };

        cargarDatos();

    }, [idInstitucion]);


    /*
     * ==========================================
     * MAPA DE SOLICITUDES
     * ==========================================
     */

    const solicitudesMap = useMemo(() => {

        const mapa = new Map<
            number,
            Solicitud
        >();

        solicitudes.forEach(
            (solicitud) => {

                mapa.set(
                    solicitud.id_solicitud,
                    solicitud
                );

            }
        );

        return mapa;

    }, [solicitudes]);


    /*
     * ==========================================
     * ESTADO
     * ==========================================
     */

    const colorEstado = (
        estado: string
    ) => {

        switch (
            estado?.toLowerCase()
        ) {

            case "destacada":
                return "bg-emerald-100 text-emerald-700";

            case "recibida":
                return "bg-blue-100 text-blue-700";

            case "pendiente":
                return "bg-amber-100 text-amber-700";

            case "aceptada":
                return "bg-emerald-100 text-emerald-700";

            case "rechazada":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-700";

        }

    };


    /*
     * ==========================================
     * FORMATEAR PRECIO
     * ==========================================
     */

    const formatearPrecio = (
        precio: number
    ) => {

        return new Intl.NumberFormat(
            "es-AR",
            {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2
            }
        ).format(precio);

    };


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
     */

    if (cargando) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />

                    <p className="mt-4 text-slate-500">

                        Cargando cotizaciones...

                    </p>

                </div>

            </div>

        );

    }


    /*
     * ==========================================
     * ERROR
     * ==========================================
     */

    if (error) {

        return (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h2 className="font-bold text-red-700">

                    Error

                </h2>

                <p className="mt-2 text-red-600">

                    {error}

                </p>

            </div>

        );

    }


    return (

        <>

            {/* ================================== */}
            {/* ENCABEZADO */}
            {/* ================================== */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Cotizaciones recibidas

                </h1>

                <p className="mt-2 text-slate-600">

                    Revisá las propuestas enviadas por
                    los proveedores.

                </p>

            </div>


            {/* ================================== */}
            {/* SIN COTIZACIONES */}
            {/* ================================== */}

            {cotizaciones.length === 0 ? (

                <div className="rounded-2xl bg-white p-12 text-center shadow">

                    <h2 className="text-xl font-bold text-slate-800">

                        Todavía no recibiste cotizaciones

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Las cotizaciones enviadas por los
                        proveedores aparecerán acá.

                    </p>

                </div>

            ) : (

                <div className="grid gap-6">

                    {cotizaciones.map(
                        (cotizacion) => {

                            const solicitud =
                                solicitudesMap.get(
                                    cotizacion.id_solicitud
                                );


                            return (

                                <div
                                    key={
                                        cotizacion.id_cotizacion
                                    }
                                    className="rounded-2xl bg-white p-8 shadow"
                                >

                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                        {/* ============================== */}
                                        {/* PROVEEDOR */}
                                        {/* ============================== */}

                                        <div className="min-w-0">

                                            <div className="flex flex-wrap items-center gap-3">

                                                <h2 className="text-2xl font-bold text-slate-900">

                                                    {
                                                        cotizacion.nombre_proveedor ||
                                                        cotizacion.proveedor?.organizacion ||
                                                        cotizacion.proveedor?.name_user ||
                                                        `Proveedor #${cotizacion.id_proveedor}`
                                                    }

                                                </h2>


                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                                                        cotizacion.estado_cotizacion
                                                    )}`}
                                                >

                                                    {
                                                        cotizacion.estado_cotizacion ||
                                                        "Recibida"
                                                    }

                                                </span>

                                            </div>


                                            <p className="mt-4 text-slate-600">

                                                Solicitud:

                                                <strong className="ml-2 text-slate-800">

                                                    {solicitud?.titulo_solicitud ||
                                                        solicitud?.equipamiento_solicitud ||
                                                        `Solicitud #${cotizacion.id_solicitud}`}

                                                </strong>

                                            </p>


                                            {solicitud?.equipamiento_solicitud && (

                                                <p className="mt-1 text-sm text-slate-500">

                                                    Equipamiento:{" "}

                                                    {solicitud.equipamiento_solicitud}

                                                </p>

                                            )}

                                        </div>


                                        {/* ============================== */}
                                        {/* DATOS */}
                                        {/* ============================== */}

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">

                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Precio unitario

                                                </p>

                                                <p className="mt-2 font-bold text-cyan-600">

                                                    {formatearPrecio(
                                                        Number(
                                                            cotizacion.precio_unitario_cotizacion
                                                        ) || 0
                                                    )}

                                                </p>

                                            </div>


                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Precio total

                                                </p>

                                                <p className="mt-2 font-bold text-slate-900">

                                                    {formatearPrecio(
                                                        Number(
                                                            cotizacion.precio_total_cotizacion
                                                        ) || 0
                                                    )}

                                                </p>

                                            </div>


                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Entrega

                                                </p>

                                                <p className="mt-2 font-bold text-slate-900">

                                                    {
                                                        cotizacion.plazo_entrega_dias_cotizacion
                                                    }{" "}

                                                    {cotizacion.plazo_entrega_dias_cotizacion === 1
                                                        ? "día"
                                                        : "días"}

                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ============================== */}
                                    {/* GARANTÍA */}
                                    {/* ============================== */}

                                    <div className="mt-6 border-t pt-6">

                                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">

                                            <p>

                                                Garantía:{" "}

                                                <strong className="text-slate-900">

                                                    {
                                                        cotizacion.garantia_meses_cotizacion
                                                    }{" "}

                                                    {cotizacion.garantia_meses_cotizacion === 1
                                                        ? "mes"
                                                        : "meses"}

                                                </strong>

                                            </p>


                                            <p>

                                                Enviada:{" "}

                                                <strong className="text-slate-900">

                                                    {cotizacion.fecha_envio_cotizacion
                                                        ? new Date(
                                                            cotizacion.fecha_envio_cotizacion
                                                        ).toLocaleDateString(
                                                            "es-AR"
                                                        )
                                                        : "Sin fecha"}

                                                </strong>

                                            </p>

                                        </div>


                                        {cotizacion.descripcion_cotizacion && (

                                            <p className="mt-4 text-sm leading-6 text-slate-600">

                                                {cotizacion.descripcion_cotizacion}

                                            </p>

                                        )}

                                    </div>


                                    {/* ============================== */}
                                    {/* ACCIONES */}
                                    {/* ============================== */}

                                    <div className="mt-8 flex flex-wrap gap-4">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/institucion/cotizaciones/${cotizacion.id_cotizacion}`
                                                )
                                            }
                                            className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
                                        >

                                            Ver detalle

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/institucion/comparador?solicitud=${cotizacion.id_solicitud}`
                                                )
                                            }
                                            className="rounded-xl border px-5 py-3 font-semibold transition hover:bg-slate-100"
                                        >

                                            Comparar

                                        </button>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/institucion/cotizaciones/${cotizacion.id_cotizacion}`
                                                )
                                            }
                                            className="rounded-xl border border-emerald-300 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
                                        >

                                            Seleccionar propuesta

                                        </button>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </>

    );

};
export default CotizacionesInstitucion;