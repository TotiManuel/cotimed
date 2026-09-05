import { useNavigate } from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import {
    obtenerInstituciones
} from "../../services/instituciones.service";

import {
    listarProveedores
} from "../../services/proveedores.service";

import {
    obtener,
    type Solicitud
} from "../../services/solicitud.service";

import {
    listarCotizaciones
} from "../../services/cotizaciones.service";


// =========================================================
// COMPONENTE
// =========================================================

const DashboardAdmin = () => {

    const navigate = useNavigate();


    // =====================================================
    // ESTADÍSTICAS
    // =====================================================

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


    const [
        cantidadCotizaciones,
        setCantidadCotizaciones
    ] = useState(0);


    // =====================================================
    // SOLICITUDES RECIENTES
    // =====================================================

    const [
        solicitudes,
        setSolicitudes
    ] = useState<Solicitud[]>([]);


    // =====================================================
    // ESTADO DE CARGA
    // =====================================================

    const [
        cargando,
        setCargando
    ] = useState(true);


    // =====================================================
    // CARGAR DATOS DEL DASHBOARD
    // =====================================================

    useEffect(() => {

        const cargarDashboard = async () => {

            setCargando(true);

            try {

                const [
                    instituciones,
                    proveedores,
                    solicitudesData,
                    cotizaciones
                ] = await Promise.all([

                    obtenerInstituciones(),

                    listarProveedores(),

                    obtener(),

                    listarCotizaciones()

                ]);


                // =============================================
                // INSTITUCIONES
                // =============================================

                setCantidadInstituciones(
                    Array.isArray(instituciones)
                        ? instituciones.length
                        : 0
                );


                // =============================================
                // PROVEEDORES
                // =============================================

                setCantidadProveedores(
                    Array.isArray(proveedores)
                        ? proveedores.length
                        : 0
                );


                // =============================================
                // SOLICITUDES
                // =============================================

                const solicitudesArray =
                    Array.isArray(solicitudesData)
                        ? solicitudesData
                        : [];


                setCantidadSolicitudes(
                    solicitudesArray.length
                );


                // =============================================
                // SOLICITUDES RECIENTES
                // =============================================

                const recientes = [
                    ...solicitudesArray
                ]
                    .sort(
                        (
                            a,
                            b
                        ) => {

                            const fechaA =
                                a.fecha_creacion
                                    ? new Date(
                                        a.fecha_creacion
                                    ).getTime()
                                    : 0;


                            const fechaB =
                                b.fecha_creacion
                                    ? new Date(
                                        b.fecha_creacion
                                    ).getTime()
                                    : 0;


                            return fechaB - fechaA;

                        }
                    )
                    .slice(
                        0,
                        5
                    );


                setSolicitudes(
                    recientes
                );


                // =============================================
                // COTIZACIONES
                // =============================================

                const cotizacionesArray =
                    Array.isArray(cotizaciones)
                        ? cotizaciones
                        : [];


                setCantidadCotizaciones(
                    cotizacionesArray.length
                );

            }

            catch (error) {

                console.error(
                    "Error cargando el dashboard:",
                    error
                );


                // =============================================
                // DEJAR ESTADÍSTICAS EN 0 SI HAY ERROR
                // =============================================

                setCantidadInstituciones(0);

                setCantidadProveedores(0);

                setCantidadSolicitudes(0);

                setCantidadCotizaciones(0);

                setSolicitudes([]);

            }

            finally {

                setCargando(false);

            }

        };


        cargarDashboard();

    }, []);


    // =====================================================
    // ESTADÍSTICAS
    // =====================================================

    const estadisticas = [

        {
            titulo:
                "Instituciones",

            valor:
                cantidadInstituciones,

            color:
                "bg-cyan-500"
        },

        {
            titulo:
                "Proveedores",

            valor:
                cantidadProveedores,

            color:
                "bg-emerald-500"
        },

        {
            titulo:
                "Solicitudes",

            valor:
                cantidadSolicitudes,

            color:
                "bg-amber-500"
        },

        {
            titulo:
                "Cotizaciones",

            valor:
                cantidadCotizaciones,

            color:
                "bg-violet-500"
        }

    ];


    // =====================================================
    // ACTIVIDAD
    // =====================================================

    const actividad = [

        "Nuevo proveedor registrado.",

        "Nueva institución creada.",

        "Solicitud publicada.",

        "Cotización enviada.",

        "Equipamiento agregado al catálogo."

    ];


    // =====================================================
    // OBTENER TEXTO DE ITEMS
    // =====================================================

    const obtenerCantidadItems = (
        solicitud: Solicitud
    ): string => {

        if (
            !Array.isArray(
                solicitud.items
            )
        ) {

            return "Sin items";

        }


        const cantidad =
            solicitud.items.length;


        if (cantidad === 0) {

            return "Sin items";

        }


        if (cantidad === 1) {

            return "1 item";

        }


        return `${cantidad} items`;

    };


    // =====================================================
    // FORMATEAR ESTADO
    // =====================================================

    const formatearEstado = (
        estado: unknown
    ): string => {

        if (
            estado === null ||
            estado === undefined
        ) {

            return "Sin estado";

        }


        if (
            typeof estado === "string"
        ) {

            return estado;

        }


        if (
            typeof estado === "object"
        ) {

            return "Estado";

        }


        return String(
            estado
        );

    };


    // =====================================================
    // FORMATEAR FECHA
    // =====================================================

    const formatearFecha = (
        fecha: string | null | undefined
    ): string => {

        if (!fecha) {

            return "-";

        }


        const date =
            new Date(
                fecha
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return date.toLocaleDateString(
            "es-AR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <main className="min-h-screen bg-slate-100 p-4 md:p-8">

            <div className="mx-auto max-w-7xl">


                {/* =================================================
                    ENCABEZADO
                ================================================= */}

                <div className="mb-10">

                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">

                        Dashboard Administrador

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Panel general de administración de CotiMed.

                    </p>

                </div>


                {/* =================================================
                    ESTADÍSTICAS
                ================================================= */}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {
                        estadisticas.map(
                            (
                                item
                            ) => (

                                <div

                                    key={
                                        item.titulo
                                    }

                                    className="rounded-2xl bg-white p-6 shadow"

                                >

                                    <div

                                        className={`
                                            mb-4
                                            h-3
                                            w-20
                                            rounded-full
                                            ${item.color}
                                        `}

                                    />


                                    <p className="text-slate-500">

                                        {
                                            item.titulo
                                        }

                                    </p>


                                    <h2 className="mt-2 text-4xl font-bold text-slate-900">

                                        {
                                            cargando
                                                ? "..."
                                                : item.valor
                                        }

                                    </h2>

                                </div>

                            )
                        )
                    }

                </div>


                {/* =================================================
                    SOLICITUDES + ACTIVIDAD
                ================================================= */}

                <div className="mt-10 grid gap-8 lg:grid-cols-3">


                    {/* =================================================
                        SOLICITUDES
                    ================================================= */}

                    <section className="rounded-2xl bg-white p-6 shadow lg:col-span-2">


                        {/* ENCABEZADO */}

                        <div className="mb-6 flex items-center justify-between gap-4">

                            <h2 className="text-2xl font-bold text-slate-900">

                                Solicitudes recientes

                            </h2>


                            <button

                                type="button"

                                onClick={() =>
                                    navigate(
                                        "/admin/solicitudes"
                                    )
                                }

                                className="text-sm font-semibold text-cyan-600 transition hover:text-cyan-700"

                            >

                                Ver todas

                            </button>

                        </div>


                        {/* TABLA */}

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px]">

                                <thead>

                                    <tr className="border-b border-slate-200">

                                        <th className="py-3 text-left text-sm font-semibold text-slate-600">

                                            Solicitud

                                        </th>


                                        <th className="py-3 text-left text-sm font-semibold text-slate-600">

                                            Institución

                                        </th>


                                        <th className="py-3 text-left text-sm font-semibold text-slate-600">

                                            Items

                                        </th>


                                        <th className="py-3 text-left text-sm font-semibold text-slate-600">

                                            Estado

                                        </th>


                                        <th className="py-3 text-left text-sm font-semibold text-slate-600">

                                            Acción

                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {/* =================================
                                        CARGANDO
                                    ================================= */}

                                    {
                                        cargando

                                            ?

                                            (

                                                <tr>

                                                    <td

                                                        colSpan={5}

                                                        className="py-10 text-center text-slate-500"

                                                    >

                                                        Cargando solicitudes...

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            /* =============================
                                               SIN SOLICITUDES
                                            ============================= */

                                            solicitudes.length === 0

                                                ?

                                                (

                                                    <tr>

                                                        <td

                                                            colSpan={5}

                                                            className="py-10 text-center text-slate-500"

                                                        >

                                                            No hay solicitudes registradas.

                                                        </td>

                                                    </tr>

                                                )

                                                :

                                                /* =============================
                                                   SOLICITUDES
                                                ============================= */

                                                (

                                                    solicitudes.map(
                                                        (
                                                            item
                                                        ) => (

                                                            <tr

                                                                key={
                                                                    item.id
                                                                }

                                                                className="border-b border-slate-100 last:border-none"

                                                            >

                                                                {/* SOLICITUD */}

                                                                <td className="py-4">

                                                                    <div>

                                                                        <p className="font-semibold text-slate-900">

                                                                            {
                                                                                item.titulo ||
                                                                                item.numero ||
                                                                                `Solicitud #${item.id}`
                                                                            }

                                                                        </p>


                                                                        {
                                                                            item.numero
                                                                                &&

                                                                                (

                                                                                    <p className="text-xs text-slate-500">

                                                                                        {
                                                                                            item.numero
                                                                                        }

                                                                                    </p>

                                                                                )
                                                                        }

                                                                    </div>

                                                                </td>


                                                                {/* INSTITUCIÓN */}

                                                                <td className="py-4">

                                                                    <span className="font-medium text-slate-700">

                                                                        Institución #

                                                                        {
                                                                            item.institucion_id
                                                                        }

                                                                    </span>

                                                                </td>


                                                                {/* ITEMS */}

                                                                <td className="py-4">

                                                                    <span className="text-slate-600">

                                                                        {
                                                                            obtenerCantidadItems(
                                                                                item
                                                                            )
                                                                        }

                                                                    </span>

                                                                </td>


                                                                {/* ESTADO */}

                                                                <td className="py-4">

                                                                    <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold capitalize text-cyan-700">

                                                                        {
                                                                            formatearEstado(
                                                                                item.estado
                                                                            )
                                                                        }

                                                                    </span>

                                                                </td>


                                                                {/* ACCIÓN */}

                                                                <td className="py-4">

                                                                    <button

                                                                        type="button"

                                                                        onClick={() =>
                                                                            navigate(
                                                                                `/admin/VerSolicitud/${item.id}`
                                                                            )
                                                                        }

                                                                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"

                                                                    >

                                                                        Ver

                                                                    </button>

                                                                </td>

                                                            </tr>

                                                        )
                                                    )

                                                )

                                    }

                                </tbody>

                            </table>

                        </div>

                    </section>


                    {/* =================================================
                        ACTIVIDAD
                    ================================================= */}

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold text-slate-900">

                            Actividad reciente

                        </h2>


                        <div className="space-y-4">

                            {
                                actividad.map(
                                    (
                                        item
                                    ) => (

                                        <div

                                            key={
                                                item
                                            }

                                            className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700"

                                        >

                                            {
                                                item
                                            }

                                        </div>

                                    )
                                )
                            }

                        </div>

                    </section>

                </div>


                {/* =================================================
                    GRÁFICO + ACCESOS
                ================================================= */}

                <div className="mt-10 grid gap-8 lg:grid-cols-2">


                    {/* =================================================
                        GRÁFICO
                    ================================================= */}

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold text-slate-900">

                            Crecimiento de la plataforma

                        </h2>


                        <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-center text-slate-400">

                            Próximamente gráfico de estadísticas

                        </div>

                    </section>


                    {/* =================================================
                        ACCESOS RÁPIDOS
                    ================================================= */}

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold text-slate-900">

                            Accesos rápidos

                        </h2>


                        <div className="grid gap-4">


                            {/* INSTITUCIONES */}

                            <button

                                type="button"

                                className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"

                                onClick={() =>
                                    navigate(
                                        "/admin/Instituciones"
                                    )
                                }

                            >

                                Gestionar Instituciones

                            </button>


                            {/* PROVEEDORES */}

                            <button

                                type="button"

                                className="rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"

                                onClick={() =>
                                    navigate(
                                        "/admin/Proveedores"
                                    )
                                }

                            >

                                Gestionar Proveedores

                            </button>


                            {/* SOLICITUDES */}

                            <button

                                type="button"

                                className="rounded-xl bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600"

                                onClick={() =>
                                    navigate(
                                        "/admin/solicitudes"
                                    )
                                }

                            >

                                Ver Solicitudes

                            </button>


                            {/* CONFIGURACIÓN */}

                            <button

                                type="button"

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


                {/* =================================================
                    INFORMACIÓN ADICIONAL
                ================================================= */}

                {
                    !cargando &&
                    solicitudes.length > 0 &&

                    (

                        <section className="mt-10 rounded-2xl bg-white p-6 shadow">

                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">

                                        Última actualización

                                    </h2>


                                    <p className="text-sm text-slate-500">

                                        Última solicitud registrada:

                                    </p>

                                </div>


                                <p className="font-semibold text-slate-700">

                                    {
                                        formatearFecha(
                                            solicitudes[0].fecha_creacion
                                        )
                                    }

                                </p>

                            </div>

                        </section>

                    )

                }

            </div>

        </main>

    );

};


export default DashboardAdmin;