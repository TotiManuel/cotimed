import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    obtener,
    type Solicitud
} from "../../services/solicitud.service";


const MisSolicitudes = () => {

    const navigate = useNavigate();


    const [solicitudes, setSolicitudes] =
        useState<Solicitud[]>([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    /*
     * ==========================================
     * OBTENER SOLICITUDES
     * ==========================================
     */

    useEffect(() => {

        const cargarSolicitudes = async () => {

            try {

                setCargando(true);
                setError("");


                /*
                 * Obtener usuario guardado
                 */

                const usuarioGuardado =
                    localStorage.getItem("user");


                if (!usuarioGuardado) {

                    throw new Error(
                        "No se encontró la información de la institución."
                    );

                }


                const usuario =
                    JSON.parse(
                        usuarioGuardado
                    );


                /*
                 * Obtener ID de institución
                 */

                const idInstitucion =
                    Number(
                        usuario?.id_institucion ??
                        usuario?.institucion_id ??
                        usuario?.id ??
                        0
                    );


                if (!idInstitucion) {

                    throw new Error(
                        "No se pudo identificar la institución."
                    );

                }


                /*
                 * Obtener TODAS las solicitudes
                 */

                const todasLasSolicitudes =
                    await obtener();


                /*
                 * Filtrar las solicitudes
                 * correspondientes a la institución.
                 */

                const solicitudesInstitucion =
                    todasLasSolicitudes.filter(
                        (solicitud) =>
                            Number(
                                solicitud.institucion_id
                            ) === idInstitucion
                    );


                setSolicitudes(
                    solicitudesInstitucion
                );


            } catch (err) {

                console.error(
                    "Error cargando solicitudes:",
                    err
                );


                setError(
                    err instanceof Error
                        ? err.message
                        : "No se pudieron cargar las solicitudes."
                );


            } finally {

                setCargando(false);

            }

        };


        cargarSolicitudes();

    }, []);


    /*
     * ==========================================
     * COLOR DEL ESTADO
     * ==========================================
     */

    const colorEstado = (
        estado: unknown
    ) => {

        const estadoNormalizado =
            String(
                estado ?? ""
            ).toLowerCase();


        switch (estadoNormalizado) {

            case "abierta":

                return "bg-blue-100 text-blue-700";


            case "publicada":

                return "bg-blue-100 text-blue-700";


            case "cotizando":

                return "bg-amber-100 text-amber-700";


            case "finalizada":

                return "bg-emerald-100 text-emerald-700";


            case "cerrada":

                return "bg-emerald-100 text-emerald-700";


            case "borrador":

                return "bg-slate-200 text-slate-700";


            case "pendiente":

                return "bg-amber-100 text-amber-700";


            case "cancelada":

                return "bg-red-100 text-red-700";


            default:

                return "bg-slate-100 text-slate-700";

        }

    };


    /*
     * ==========================================
     * FORMATEAR FECHA
     * ==========================================
     */

    const formatearFecha = (
        fecha: string | null
    ) => {

        if (!fecha) {

            return "-";

        }


        const fechaObj =
            new Date(fecha);


        if (
            isNaN(
                fechaObj.getTime()
            )
        ) {

            return fecha;

        }


        return fechaObj.toLocaleDateString(
            "es-AR"
        );

    };


    /*
     * ==========================================
     * FORMATEAR MONEDA
     * ==========================================
     */

    const formatearPresupuesto = (
        presupuesto: number | null,
        moneda: unknown
    ) => {

        if (
            presupuesto === null ||
            presupuesto === undefined
        ) {

            return "-";

        }


        const monedaNormalizada =
            String(
                moneda ?? "USD"
            ).toUpperCase();


        const monedaValida =
            monedaNormalizada === "ARS" ||
            monedaNormalizada === "USD" ||
            monedaNormalizada === "EUR"
                ? monedaNormalizada
                : "USD";


        return new Intl.NumberFormat(
            "es-AR",
            {
                style: "currency",
                currency: monedaValida,
                maximumFractionDigits: 2
            }
        ).format(
            Number(presupuesto) || 0
        );

    };


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
     */

    if (cargando) {

        return (

            <div className="flex min-h-[300px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />

                    <p className="mt-4 text-slate-500">

                        Cargando solicitudes...

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

            <div className="rounded-2xl border border-red-200 bg-red-50 p-8">

                <h2 className="text-xl font-bold text-red-700">

                    No se pudieron cargar las solicitudes

                </h2>


                <p className="mt-2 text-red-600">

                    {error}

                </p>

            </div>

        );

    }


    /*
     * ==========================================
     * VISTA
     * ==========================================
     */

    return (

        <>

            {/* ==================================
                ENCABEZADO
            ================================== */}

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Mis solicitudes

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Administrá todas las solicitudes
                        realizadas por tu institución.

                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/institucion/solicitudes/nueva"
                        )
                    }
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >

                    Nueva solicitud

                </button>

            </div>


            {/* ==================================
                SIN SOLICITUDES
            ================================== */}

            {
                solicitudes.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow">

                        <h2 className="text-2xl font-bold text-slate-900">

                            No hay solicitudes

                        </h2>


                        <p className="mt-2 text-slate-500">

                            Tu institución todavía no realizó
                            ninguna solicitud.

                        </p>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/institucion/solicitudes/nueva"
                                )
                            }
                            className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                        >

                            Crear primera solicitud

                        </button>

                    </div>

                ) : (

                    <div className="grid gap-6">

                        {
                            solicitudes.map(
                                (solicitud) => (

                                    <div
                                        key={
                                            solicitud.id
                                        }
                                        className="rounded-2xl bg-white p-8 shadow"
                                    >

                                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                            {/* ==============================
                                                INFORMACIÓN
                                            ============================== */}

                                            <div className="min-w-0">

                                                <div className="flex flex-wrap items-center gap-3">

                                                    <h2 className="text-2xl font-bold text-slate-900">

                                                        {
                                                            solicitud.titulo ||
                                                            "Solicitud sin título"
                                                        }

                                                    </h2>


                                                    <span
                                                        className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                                                            solicitud.estado
                                                        )}`}
                                                    >

                                                        {
                                                            String(
                                                                solicitud.estado ??
                                                                "Sin estado"
                                                            )
                                                        }

                                                    </span>

                                                </div>


                                                {/* NÚMERO */}

                                                <p className="mt-3 text-slate-600">

                                                    Código:

                                                    <strong className="ml-2 text-slate-900">

                                                        {
                                                            solicitud.numero ||
                                                            `SOL-${String(
                                                                solicitud.id
                                                            ).padStart(
                                                                5,
                                                                "0"
                                                            )}`
                                                        }

                                                    </strong>

                                                </p>


                                                {/* DESCRIPCIÓN */}

                                                {solicitud.descripcion && (

                                                    <p className="mt-3 max-w-3xl leading-6 text-slate-600">

                                                        {
                                                            solicitud.descripcion
                                                        }

                                                    </p>

                                                )}


                                                {/* URGENCIA */}

                                                <p className="mt-3 text-slate-600">

                                                    Urgencia:

                                                    <strong className="ml-2 text-slate-900">

                                                        {
                                                            String(
                                                                solicitud.urgencia ??
                                                                "-"
                                                            )
                                                        }

                                                    </strong>

                                                </p>


                                                {/* FECHA CREACIÓN */}

                                                <p className="mt-1 text-slate-600">

                                                    Creada:

                                                    <span className="ml-2">

                                                        {
                                                            formatearFecha(
                                                                solicitud.fecha_creacion
                                                            )
                                                        }

                                                    </span>

                                                </p>


                                                {/* FECHA LÍMITE */}

                                                {
                                                    solicitud.fecha_limite_cotizacion && (

                                                        <p className="mt-1 text-slate-600">

                                                            Límite para cotizar:

                                                            <span className="ml-2">

                                                                {
                                                                    formatearFecha(
                                                                        solicitud.fecha_limite_cotizacion
                                                                    )
                                                                }

                                                            </span>

                                                        </p>

                                                    )
                                                }

                                            </div>


                                            {/* ==============================
                                                RESUMEN
                                            ============================== */}

                                            <div className="grid grid-cols-2 gap-8 text-center">


                                                {/* ITEMS */}

                                                <div>

                                                    <p className="text-slate-500">

                                                        Ítems

                                                    </p>


                                                    <h3 className="mt-2 text-4xl font-bold text-cyan-600">

                                                        {
                                                            Array.isArray(
                                                                solicitud.items
                                                            )
                                                                ? solicitud.items.length
                                                                : 0
                                                        }

                                                    </h3>

                                                </div>


                                                {/* PRESUPUESTO */}

                                                <div>

                                                    <p className="text-slate-500">

                                                        Presupuesto

                                                    </p>


                                                    <h3 className="mt-2 text-xl font-bold text-slate-900">

                                                        {
                                                            formatearPresupuesto(
                                                                solicitud.presupuesto_estimado,
                                                                solicitud.moneda
                                                            )
                                                        }

                                                    </h3>

                                                </div>

                                            </div>

                                        </div>


                                        {/* ==================================
                                            ACCIONES
                                        ================================== */}

                                        <div className="mt-8 flex flex-wrap gap-4">


                                            {/* VER DETALLES */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/institucion/solicitudes/${solicitud.id}`
                                                    )
                                                }
                                                className="rounded-lg border px-5 py-2 font-semibold transition hover:bg-slate-100"
                                            >

                                                Ver detalles

                                            </button>


                                            {/* EDITAR */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/institucion/solicitudes/${solicitud.id}/editar`
                                                    )
                                                }
                                                className="rounded-lg border px-5 py-2 font-semibold transition hover:bg-slate-100"
                                            >

                                                Editar

                                            </button>


                                            {/* VER COTIZACIONES */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/institucion/comparador?solicitud=${solicitud.id}`
                                                    )
                                                }
                                                className="rounded-lg border border-cyan-300 px-5 py-2 font-semibold text-cyan-700 transition hover:bg-cyan-50"
                                            >

                                                Ver cotizaciones

                                            </button>


                                            {/* ELIMINAR */}

                                            <button
                                                type="button"
                                                className="rounded-lg border border-red-300 px-5 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                                            >

                                                Eliminar

                                            </button>

                                        </div>

                                    </div>

                                )
                            )
                        }

                    </div>

                )
            }

        </>

    );

};


export default MisSolicitudes;