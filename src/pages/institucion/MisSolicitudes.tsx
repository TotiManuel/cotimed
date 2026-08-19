import { useEffect, useState } from "react";

import {
    listarSolicitudesPorInstitucion,
    type Solicitud
} from "../../services/solicitud.service";


const MisSolicitudes = () => {

    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

    const [cargando, setCargando] = useState(true);

    const [error, setError] = useState("");


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
                 * Intentamos obtener el usuario
                 * almacenado durante el login.
                 */

                const usuarioGuardado =
                    localStorage.getItem("user");

                if (!usuarioGuardado) {

                    setError(
                        "No se encontró la información de la institución."
                    );

                    return;
                }


                const usuario = JSON.parse(
                    usuarioGuardado
                );


                /*
                 * ID de la institución.
                 *
                 * Dependiendo de cómo esté guardado
                 * el usuario, aceptamos diferentes nombres.
                 */

                const idInstitucion =
                    Number(
                        usuario.id_institucion ??
                        usuario.id
                    );


                if (!idInstitucion) {

                    setError(
                        "No se pudo identificar la institución."
                    );

                    return;
                }


                /*
                 * Obtener solicitudes desde el service.
                 */

                const datos =
                    await listarSolicitudesPorInstitucion(
                        idInstitucion
                    );


                setSolicitudes(datos);


            } catch (error) {

                console.error(
                    "Error cargando solicitudes:",
                    error
                );

                setError(
                    "No se pudieron cargar las solicitudes."
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
        estado: string
    ) => {

        switch (estado?.toLowerCase()) {

            case "abierta":
                return "bg-blue-100 text-blue-700";

            case "cotizando":
                return "bg-amber-100 text-amber-700";

            case "finalizada":
                return "bg-emerald-100 text-emerald-700";

            case "borrador":
                return "bg-slate-200 text-slate-700";

            case "pendiente":
                return "bg-amber-100 text-amber-700";

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
        fecha: string
    ) => {

        if (!fecha) {
            return "-";
        }

        const fechaObj = new Date(fecha);

        if (isNaN(fechaObj.getTime())) {
            return fecha;
        }

        return fechaObj.toLocaleDateString(
            "es-AR"
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

                <p className="text-slate-500">

                    Cargando solicitudes...

                </p>

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

            <div className="rounded-2xl bg-red-50 p-8 text-red-700">

                <h2 className="text-xl font-bold">

                    No se pudieron cargar las solicitudes

                </h2>

                <p className="mt-2">

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

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Mis solicitudes

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Administrá todas las solicitudes realizadas por tu institución.

                    </p>

                </div>


                <button
                    className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
                >

                    Nueva solicitud

                </button>

            </div>


            {
                solicitudes.length === 0 ? (

                    <div className="rounded-2xl bg-white p-10 text-center shadow">

                        <h2 className="text-2xl font-bold text-slate-900">

                            No hay solicitudes

                        </h2>

                        <p className="mt-2 text-slate-500">

                            Tu institución todavía no realizó ninguna solicitud.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6">

                        {

                            solicitudes.map((solicitud) => (

                                <div
                                    key={solicitud.id_solicitud}
                                    className="rounded-2xl bg-white p-8 shadow"
                                >

                                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


                                        {/* INFORMACIÓN */}

                                        <div>

                                            <div className="flex flex-wrap items-center gap-3">

                                                <h2 className="text-2xl font-bold">

                                                    {
                                                        solicitud.titulo_solicitud ||
                                                        solicitud.equipamiento_solicitud
                                                    }

                                                </h2>


                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                                                        solicitud.estado_solicitud
                                                    )}`}
                                                >

                                                    {
                                                        solicitud.estado_solicitud
                                                    }

                                                </span>

                                            </div>


                                            <p className="mt-3 text-slate-600">

                                                Código:

                                                <strong className="ml-1">

                                                    SOL-{String(
                                                        solicitud.id_solicitud
                                                    ).padStart(5, "0")}

                                                </strong>

                                            </p>


                                            <p className="mt-1 text-slate-600">

                                                Equipamiento:

                                                <span className="ml-1">

                                                    {
                                                        solicitud.equipamiento_solicitud
                                                    }

                                                </span>

                                            </p>


                                            <p className="mt-1 text-slate-600">

                                                Cantidad:

                                                <span className="ml-1">

                                                    {
                                                        solicitud.cantidad_solicitud
                                                    }

                                                </span>

                                            </p>


                                            <p className="mt-1 text-slate-600">

                                                Urgencia:

                                                <span className="ml-1">

                                                    {
                                                        solicitud.urgencia_solicitud
                                                    }

                                                </span>

                                            </p>


                                            <p className="mt-1 text-slate-600">

                                                Creada:

                                                <span className="ml-1">

                                                    {
                                                        formatearFecha(
                                                            solicitud.fecha_creacion_solicitud
                                                        )
                                                    }

                                                </span>

                                            </p>

                                        </div>


                                        {/* RESUMEN */}

                                        <div className="grid grid-cols-2 gap-8 text-center">

                                            <div>

                                                <p className="text-slate-500">

                                                    Cotizaciones

                                                </p>

                                                <h3 className="mt-2 text-4xl font-bold text-cyan-600">

                                                    {
                                                        solicitud.cotizaciones?.length ?? 0
                                                    }

                                                </h3>

                                            </div>


                                            <div>

                                                <p className="text-slate-500">

                                                    Cantidad

                                                </p>

                                                <h3 className="mt-2 text-4xl font-bold text-slate-900">

                                                    {
                                                        solicitud.cantidad_solicitud
                                                    }

                                                </h3>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ACCIONES */}

                                    <div className="mt-8 flex flex-wrap gap-4">

                                        <button
                                            className="rounded-lg border px-5 py-2 transition hover:bg-slate-100"
                                        >

                                            Ver detalles

                                        </button>


                                        <button
                                            className="rounded-lg border px-5 py-2 transition hover:bg-slate-100"
                                        >

                                            Editar

                                        </button>


                                        <button
                                            className="rounded-lg border px-5 py-2 transition hover:bg-slate-100"
                                        >

                                            Ver cotizaciones

                                        </button>


                                        <button
                                            className="rounded-lg border border-red-300 px-5 py-2 text-red-600 transition hover:bg-red-50"
                                        >

                                            Eliminar

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </>

    );

};


export default MisSolicitudes;