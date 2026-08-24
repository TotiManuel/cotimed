import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    useSearchParams
} from "react-router-dom";

import {
    listarCotizacionesPorSolicitud,
    type Cotizacion
} from "../../services/cotizaciones.service";

import {
    obtenerSolicitudPorId,
    type Solicitud
} from "../../services/solicitud.service";


const ComparadorCotizaciones = () => {

    const [
        searchParams
    ] = useSearchParams();


    const idSolicitud =
        Number(
            searchParams.get("solicitud")
        );


    const [
        solicitud,
        setSolicitud
    ] = useState<Solicitud | null>(null);


    const [
        cotizaciones,
        setCotizaciones
    ] = useState<Cotizacion[]>([]);


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
     * CARGAR SOLICITUD Y COTIZACIONES
     * ==========================================
     */

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                setCargando(true);

                setError("");


                if (!idSolicitud) {

                    throw new Error(
                        "No se especificó una solicitud."
                    );

                }


                const [
                    solicitudData,
                    cotizacionesData
                ] = await Promise.all([

                    obtenerSolicitudPorId(
                        idSolicitud
                    ),

                    listarCotizacionesPorSolicitud(
                        idSolicitud
                    )

                ]);


                setSolicitud(
                    solicitudData
                );


                setCotizaciones(
                    cotizacionesData
                );


            } catch (err) {

                console.error(
                    "Error cargando comparador:",
                    err
                );


                setError(
                    err instanceof Error
                        ? err.message
                        : "No se pudieron cargar los datos de la comparación."
                );


            } finally {

                setCargando(false);

            }

        };


        cargarDatos();

    }, [idSolicitud]);


    /*
     * ==========================================
     * CALCULAR PUNTAJES
     * ==========================================
     *
     * Precio       = 40%
     * Entrega      = 30%
     * Garantía     = 30%
     */

    const puntajes = useMemo(() => {

        if (!cotizaciones.length) {

            return new Map<number, number>();

        }


        const precios =
            cotizaciones.map(
                (cotizacion) =>
                    Number(
                        cotizacion.precio_total_cotizacion
                    ) || 0
            );


        const entregas =
            cotizaciones.map(
                (cotizacion) =>
                    Number(
                        cotizacion.plazo_entrega_dias_cotizacion
                    ) || 0
            );


        const garantias =
            cotizaciones.map(
                (cotizacion) =>
                    Number(
                        cotizacion.garantia_meses_cotizacion
                    ) || 0
            );


        const precioMin =
            Math.min(
                ...precios
            );


        const precioMax =
            Math.max(
                ...precios
            );


        const entregaMin =
            Math.min(
                ...entregas
            );


        const entregaMax =
            Math.max(
                ...entregas
            );


        const garantiaMin =
            Math.min(
                ...garantias
            );


        const garantiaMax =
            Math.max(
                ...garantias
            );


        const resultado =
            new Map<number, number>();


        cotizaciones.forEach(
            (cotizacion) => {

                const precio =
                    Number(
                        cotizacion.precio_total_cotizacion
                    ) || 0;


                const entrega =
                    Number(
                        cotizacion.plazo_entrega_dias_cotizacion
                    ) || 0;


                const garantia =
                    Number(
                        cotizacion.garantia_meses_cotizacion
                    ) || 0;


                /*
                 * PRECIO
                 *
                 * Menor precio = mejor
                 */

                const precioScore =
                    precioMax === precioMin
                        ? 100
                        : (
                            (
                                precioMax -
                                precio
                            ) /
                            (
                                precioMax -
                                precioMin
                            )
                        ) * 100;


                /*
                 * ENTREGA
                 *
                 * Menor plazo = mejor
                 */

                const entregaScore =
                    entregaMax === entregaMin
                        ? 100
                        : (
                            (
                                entregaMax -
                                entrega
                            ) /
                            (
                                entregaMax -
                                entregaMin
                            )
                        ) * 100;


                /*
                 * GARANTÍA
                 *
                 * Mayor garantía = mejor
                 */

                const garantiaScore =
                    garantiaMax === garantiaMin
                        ? 100
                        : (
                            (
                                garantia -
                                garantiaMin
                            ) /
                            (
                                garantiaMax -
                                garantiaMin
                            )
                        ) * 100;


                /*
                 * PUNTAJE FINAL
                 */

                const puntaje =
                    Math.round(

                        precioScore * 0.40 +

                        entregaScore * 0.30 +

                        garantiaScore * 0.30

                    );


                resultado.set(
                    cotizacion.id_cotizacion,
                    puntaje
                );

            }
        );


        return resultado;

    }, [
        cotizaciones
    ]);


    /*
     * ==========================================
     * MEJOR COTIZACIÓN
     * ==========================================
     */

    const mejorCotizacion =
        useMemo(() => {

            if (!cotizaciones.length) {

                return null;

            }


            return cotizaciones.reduce(
                (
                    mejor,
                    actual
                ) => {

                    const puntajeMejor =
                        puntajes.get(
                            mejor.id_cotizacion
                        ) || 0;


                    const puntajeActual =
                        puntajes.get(
                            actual.id_cotizacion
                        ) || 0;


                    return puntajeActual >
                        puntajeMejor
                        ? actual
                        : mejor;

                }
            );

        }, [
            cotizaciones,
            puntajes
        ]);


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
     * OBTENER NOMBRE DEL PROVEEDOR
     * ==========================================
     */

    const obtenerNombreProveedor = (
        cotizacion: Cotizacion
    ) => {

        return (
            cotizacion.nombre_proveedor ||
            cotizacion.proveedor?.organizacion ||
            cotizacion.proveedor?.name_user ||
            `Proveedor #${cotizacion.id_proveedor}`
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

                        Cargando comparación...

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
     * SIN COTIZACIONES
     * ==========================================
     */

    if (!cotizaciones.length) {

        return (

            <div>

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-slate-900">

                        Comparador de cotizaciones

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Compará las propuestas recibidas
                        para esta solicitud.

                    </p>

                </div>


                <div className="rounded-2xl bg-white p-12 text-center shadow">

                    <h2 className="text-xl font-bold text-slate-800">

                        No hay cotizaciones disponibles

                    </h2>


                    <p className="mt-2 text-slate-500">

                        Todavía no se recibieron propuestas
                        para esta solicitud.

                    </p>

                </div>

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

            {/* ENCABEZADO */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Comparador de cotizaciones

                </h1>


                <p className="mt-2 text-slate-600">

                    Compará las propuestas recibidas y
                    elegí la mejor opción para tu institución.

                </p>

            </div>


            {/* COMPARADOR */}

            <div className="rounded-2xl bg-white p-8 shadow">


                {/* INFORMACIÓN DE LA SOLICITUD */}

                <div className="mb-8">

                    <h2 className="text-2xl font-bold">

                        {
                            solicitud?.titulo ||
                            "Solicitud"
                        }

                    </h2>


                    <p className="mt-2 text-slate-500">

                        Solicitud #

                        {
                            solicitud?.numero ||
                            solicitud?.id ||
                            idSolicitud
                        }

                    </p>


                    {
                        solicitud?.descripcion && (

                            <p className="mt-3 max-w-3xl text-sm text-slate-600">

                                {
                                    solicitud.descripcion
                                }

                            </p>

                        )
                    }


                    {
                        solicitud?.presupuesto_estimado !== null &&
                        solicitud?.presupuesto_estimado !== undefined && (

                            <p className="mt-3 text-sm text-slate-600">

                                Presupuesto estimado:{" "}

                                <strong>

                                    {
                                        formatearPrecio(
                                            solicitud.presupuesto_estimado
                                        )
                                    }

                                </strong>

                            </p>

                        )
                    }

                </div>


                {/* TABLA */}

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[800px]">

                        <thead>

                            <tr className="border-b bg-slate-50">

                                <th className="px-6 py-5 text-left">

                                    Característica

                                </th>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => (

                                            <th
                                                key={
                                                    cotizacion.id_cotizacion
                                                }
                                                className="px-6 py-5 text-center"
                                            >

                                                <div>

                                                    {
                                                        obtenerNombreProveedor(
                                                            cotizacion
                                                        )
                                                    }

                                                </div>


                                                {
                                                    mejorCotizacion?.id_cotizacion ===
                                                    cotizacion.id_cotizacion && (

                                                        <span className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">

                                                            Mejor propuesta

                                                        </span>

                                                    )
                                                }

                                            </th>

                                        )
                                    )}

                            </tr>

                        </thead>


                        <tbody>


                            {/* PRECIO TOTAL */}

                            <tr className="border-b">

                                <td className="px-6 py-5 font-semibold">

                                    Precio total

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => (

                                            <td
                                                key={
                                                    cotizacion.id_cotizacion
                                                }
                                                className="px-6 py-5 text-center font-bold text-cyan-600"
                                            >

                                                {
                                                    formatearPrecio(
                                                        cotizacion.precio_total_cotizacion
                                                    )
                                                }

                                            </td>

                                        )
                                    )}

                            </tr>


                            {/* PRECIO UNITARIO */}

                            <tr className="border-b">

                                <td className="px-6 py-5 font-semibold">

                                    Precio unitario

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => (

                                            <td
                                                key={
                                                    cotizacion.id_cotizacion
                                                }
                                                className="px-6 py-5 text-center"
                                            >

                                                {
                                                    formatearPrecio(
                                                        cotizacion.precio_unitario_cotizacion
                                                    )
                                                }

                                            </td>

                                        )
                                    )}

                            </tr>


                            {/* ENTREGA */}

                            <tr className="border-b">

                                <td className="px-6 py-5 font-semibold">

                                    Tiempo de entrega

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => {

                                            const dias =
                                                Number(
                                                    cotizacion.plazo_entrega_dias_cotizacion
                                                ) || 0;


                                            return (

                                                <td
                                                    key={
                                                        cotizacion.id_cotizacion
                                                    }
                                                    className="px-6 py-5 text-center"
                                                >

                                                    {dias}{" "}

                                                    {
                                                        dias === 1
                                                            ? "día"
                                                            : "días"
                                                    }

                                                </td>

                                            );

                                        }
                                    )}

                            </tr>


                            {/* GARANTÍA */}

                            <tr className="border-b">

                                <td className="px-6 py-5 font-semibold">

                                    Garantía

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => {

                                            const garantia =
                                                Number(
                                                    cotizacion.garantia_meses_cotizacion
                                                ) || 0;


                                            return (

                                                <td
                                                    key={
                                                        cotizacion.id_cotizacion
                                                    }
                                                    className="px-6 py-5 text-center"
                                                >

                                                    {garantia}{" "}

                                                    {
                                                        garantia === 1
                                                            ? "mes"
                                                            : "meses"
                                                    }

                                                </td>

                                            );

                                        }
                                    )}

                            </tr>


                            {/* DESCRIPCIÓN */}

                            <tr className="border-b">

                                <td className="px-6 py-5 font-semibold">

                                    Descripción

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => (

                                            <td
                                                key={
                                                    cotizacion.id_cotizacion
                                                }
                                                className="px-6 py-5 text-center text-sm text-slate-600"
                                            >

                                                {
                                                    cotizacion.descripcion_cotizacion ||
                                                    "Sin descripción"
                                                }

                                            </td>

                                        )
                                    )}

                            </tr>


                            {/* PUNTAJE */}

                            <tr>

                                <td className="px-6 py-5 font-semibold">

                                    Puntaje CotiMed

                                </td>


                                {
                                    cotizaciones.map(
                                        (cotizacion) => {

                                            const puntaje =
                                                puntajes.get(
                                                    cotizacion.id_cotizacion
                                                ) || 0;


                                            return (

                                                <td
                                                    key={
                                                        cotizacion.id_cotizacion
                                                    }
                                                    className="px-6 py-5 text-center"
                                                >

                                                    <div className="mx-auto w-24 rounded-full bg-emerald-100 px-3 py-2 font-bold text-emerald-700">

                                                        {puntaje}/100

                                                    </div>

                                                </td>

                                            );

                                        }
                                    )}

                            </tr>


                        </tbody>

                    </table>

                </div>


                {/* RECOMENDACIÓN */}

                {
                    mejorCotizacion && (

                        <div className="mt-10 rounded-xl bg-cyan-50 p-6">

                            <h3 className="text-xl font-bold text-cyan-900">

                                Recomendación CotiMed

                            </h3>


                            <p className="mt-3 text-cyan-800">

                                Según precio, tiempo de entrega
                                y garantía,{" "}

                                <strong>

                                    {
                                        obtenerNombreProveedor(
                                            mejorCotizacion
                                        )
                                    }

                                </strong>{" "}

                                presenta la propuesta con el
                                mejor puntaje entre las cotizaciones
                                disponibles.

                            </p>


                            <p className="mt-3 text-sm text-cyan-700">

                                Puntaje obtenido:{" "}

                                <strong>

                                    {
                                        puntajes.get(
                                            mejorCotizacion.id_cotizacion
                                        ) || 0
                                    }/100

                                </strong>

                            </p>

                        </div>

                    )
                }


            </div>

        </>

    );

};


export default ComparadorCotizaciones;