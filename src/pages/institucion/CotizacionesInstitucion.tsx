import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    listarCotizacionesPorSolicitud,
    type Cotizacion
} from "../../services/cotizaciones.service";

import {
    obtener,
    type Solicitud
} from "../../services/solicitud.service";


const CotizacionesInstitucion = () => {

    const navigate = useNavigate();


    /*
     * ==========================================
     * ESTADOS
     * ==========================================
     */

    const [
        cotizaciones,
        setCotizaciones
    ] = useState<Cotizacion[]>([]);


    const [
        solicitudes,
        setSolicitudes
    ] = useState<Solicitud[]>([]);


    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


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
        usuario?.institucion_id ??
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
                 * Obtener todas las solicitudes
                 */

                const todasLasSolicitudes =
                    await obtener();


                /*
                 * Filtrar las solicitudes
                 * pertenecientes a la institución actual.
                 */

                const solicitudesData =
                    todasLasSolicitudes.filter(
                        (solicitud) =>
                            Number(
                                solicitud.institucion_id
                            ) === idInstitucion
                    );


                setSolicitudes(
                    solicitudesData
                );


                /*
                 * Obtener cotizaciones
                 * de cada solicitud.
                 */

                const resultados =
                    await Promise.all(

                        solicitudesData.map(
                            (solicitud) =>
                                listarCotizacionesPorSolicitud(
                                    solicitud.id
                                )
                        )

                    );


                /*
                 * Unificar cotizaciones.
                 */

                setCotizaciones(
                    resultados.flat()
                );


            } catch (err: any) {

                console.error(
                    "Error cargando cotizaciones:",
                    err
                );


                setError(
                    err?.message ||
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

        const mapa =
            new Map<number, Solicitud>();


        solicitudes.forEach(
            (solicitud) => {

                mapa.set(
                    solicitud.id,
                    solicitud
                );

            }
        );


        return mapa;

    }, [solicitudes]);


    /*
     * ==========================================
     * COLOR DEL ESTADO
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
        ).format(
            Number(precio) || 0
        );

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


    /*
     * ==========================================
     * RENDER
     * ==========================================
     */

    return (

        <>

            {/* ==================================
                ENCABEZADO
            ================================== */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Cotizaciones recibidas

                </h1>


                <p className="mt-2 text-slate-600">

                    Revisá las propuestas enviadas por
                    los proveedores.

                </p>

            </div>


            {/* ==================================
                SIN COTIZACIONES
            ================================== */}

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

                            /*
                             * La cotización debe tener
                             * el ID de la solicitud.
                             *
                             * Si tu Cotizacion actual
                             * todavía usa otro nombre,
                             * habrá que corregir también
                             * cotizaciones.service.ts.
                             */

                            const idSolicitud =
                                Number(
                                    cotizacion.id_solicitud
                                );


                            const solicitud =
                                solicitudesMap.get(
                                    idSolicitud
                                );


                            return (

                                <div
                                    key={
                                        cotizacion.id_cotizacion
                                    }
                                    className="rounded-2xl bg-white p-8 shadow"
                                >

                                    {/* ==============================
                                        INFORMACIÓN PRINCIPAL
                                    ============================== */}

                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                        {/* PROVEEDOR */}

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

                                                    {
                                                        solicitud?.titulo ||
                                                        `Solicitud #${idSolicitud}`
                                                    }

                                                </strong>

                                            </p>


                                            {solicitud?.descripcion && (

                                                <p className="mt-1 text-sm text-slate-500">

                                                    {
                                                        solicitud.descripcion
                                                    }

                                                </p>

                                            )}

                                        </div>


                                        {/* DATOS */}

                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">


                                            {/* PRECIO UNITARIO */}

                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Precio unitario

                                                </p>


                                                <p className="mt-2 font-bold text-cyan-600">

                                                    {
                                                        formatearPrecio(
                                                            Number(
                                                                cotizacion.precio_unitario_cotizacion
                                                            ) || 0
                                                        )
                                                    }

                                                </p>

                                            </div>


                                            {/* PRECIO TOTAL */}

                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Precio total

                                                </p>


                                                <p className="mt-2 font-bold text-slate-900">

                                                    {
                                                        formatearPrecio(
                                                            Number(
                                                                cotizacion.precio_total_cotizacion
                                                            ) || 0
                                                        )
                                                    }

                                                </p>

                                            </div>


                                            {/* ENTREGA */}

                                            <div className="text-center">

                                                <p className="text-sm text-slate-500">

                                                    Entrega

                                                </p>


                                                <p className="mt-2 font-bold text-slate-900">

                                                    {
                                                        cotizacion.plazo_entrega_dias_cotizacion
                                                    }{" "}

                                                    {
                                                        Number(
                                                            cotizacion.plazo_entrega_dias_cotizacion
                                                        ) === 1
                                                            ? "día"
                                                            : "días"
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ==================================
                                        INFORMACIÓN ADICIONAL
                                    ================================== */}

                                    <div className="mt-6 border-t pt-6">

                                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">


                                            {/* GARANTÍA */}

                                            <p>

                                                Garantía:{" "}

                                                <strong className="text-slate-900">

                                                    {
                                                        cotizacion.garantia_meses_cotizacion
                                                    }{" "}

                                                    {
                                                        Number(
                                                            cotizacion.garantia_meses_cotizacion
                                                        ) === 1
                                                            ? "mes"
                                                            : "meses"
                                                    }

                                                </strong>

                                            </p>


                                            {/* FECHA */}

                                            <p>

                                                Enviada:{" "}

                                                <strong className="text-slate-900">

                                                    {
                                                        cotizacion.fecha_envio_cotizacion

                                                            ? new Date(
                                                                cotizacion.fecha_envio_cotizacion
                                                            ).toLocaleDateString(
                                                                "es-AR"
                                                            )

                                                            : "Sin fecha"
                                                    }

                                                </strong>

                                            </p>

                                        </div>


                                        {/* DESCRIPCIÓN */}

                                        {cotizacion.descripcion_cotizacion && (

                                            <p className="mt-4 text-sm leading-6 text-slate-600">

                                                {
                                                    cotizacion.descripcion_cotizacion
                                                }

                                            </p>

                                        )}

                                    </div>


                                    {/* ==================================
                                        ACCIONES
                                    ================================== */}

                                    <div className="mt-8 flex flex-wrap gap-4">


                                        {/* VER DETALLE */}

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


                                        {/* COMPARAR */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/institucion/comparador?solicitud=${idSolicitud}`
                                                )
                                            }
                                            className="rounded-xl border px-5 py-3 font-semibold transition hover:bg-slate-100"
                                        >

                                            Comparar

                                        </button>


                                        {/* SELECCIONAR */}

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