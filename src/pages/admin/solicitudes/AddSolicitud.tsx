import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    listarSolicitudes,
    eliminarSolicitud,
    type Solicitud
} from "../../../services/solicitud.service";

import {
    FileText,
    Plus,
    Eye,
    Trash2,
    RefreshCw
} from "lucide-react";


const AddSolicitud = () => {


    const navigate = useNavigate();


    const [
        solicitudes,
        setSolicitudes
    ] = useState<Solicitud[]>([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");



    const cargarSolicitudes = async () => {


        try {

            setLoading(true);

            setError("");


            const data =
                await listarSolicitudes();


            setSolicitudes(data);


        } catch (error: any) {

            console.error(
                "Error cargando solicitudes:",
                error
            );


            setError(
                error?.message ||
                "No se pudieron cargar las solicitudes"
            );


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        cargarSolicitudes();

    }, []);



    const eliminar = async (
        id: number
    ) => {


        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar esta solicitud?"
            );


        if (!confirmar) return;


        try {


            await eliminarSolicitud(id);


            setSolicitudes(
                solicitudes.filter(
                    (solicitud) =>
                        solicitud.id_solicitud !== id
                )
            );


        } catch (error: any) {


            console.error(
                "Error eliminando solicitud:",
                error
            );


            alert(
                error?.message ||
                "No se pudo eliminar la solicitud"
            );

        }

    };



    const obtenerEstadoClase = (
        estado: string
    ) => {


        switch (
            estado.toLowerCase()
        ) {


            case "pendiente":

                return "bg-amber-100 text-amber-700";


            case "publicada":

                return "bg-cyan-100 text-cyan-700";


            case "en proceso":

                return "bg-blue-100 text-blue-700";


            case "cotizada":

                return "bg-purple-100 text-purple-700";


            case "completada":

                return "bg-emerald-100 text-emerald-700";


            case "cancelada":

                return "bg-red-100 text-red-700";


            default:

                return "bg-slate-100 text-slate-700";

        }

    };



    return (

        <div className="max-w-7xl mx-auto">


            {/* ENCABEZADO */}

            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                <div className="flex items-center gap-3">


                    <div className="rounded-xl bg-cyan-600 p-3 text-white">

                        <FileText size={28}/>

                    </div>


                    <div>


                        <h1 className="text-3xl font-bold text-slate-900">

                            Solicitudes

                        </h1>


                        <p className="text-slate-600">

                            Gestioná las solicitudes de equipamiento de CotiMed

                        </p>


                    </div>


                </div>



                <div className="flex gap-3">


                    <button

                        onClick={cargarSolicitudes}

                        disabled={loading}

                        className="flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"

                    >

                        <RefreshCw size={18}/>

                        Actualizar

                    </button>


                    <button

                        onClick={() =>
                            navigate(
                                "/admin/solicitudes/nueva"
                            )
                        }

                        className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"

                    >

                        <Plus size={20}/>

                        Nueva solicitud

                    </button>


                </div>


            </div>



            {/* ERROR */}

            {
                error && (

                    <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">

                        {error}

                    </div>

                )
            }



            {/* TARJETA */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">


                {/* CABECERA */}

                <div className="border-b px-6 py-5">


                    <div className="flex items-center justify-between">


                        <div>

                            <h2 className="text-xl font-bold text-slate-900">

                                Solicitudes registradas

                            </h2>


                            <p className="text-sm text-slate-500">

                                {solicitudes.length} solicitud
                                {solicitudes.length !== 1 && "es"}

                            </p>

                        </div>


                    </div>


                </div>



                {/* LOADING */}

                {
                    loading ? (

                        <div className="flex items-center justify-center p-16">

                            <div className="text-center">

                                <RefreshCw
                                    size={32}
                                    className="mx-auto mb-3 animate-spin text-cyan-600"
                                />

                                <p className="text-slate-600">

                                    Cargando solicitudes...

                                </p>

                            </div>

                        </div>

                    ) : solicitudes.length === 0 ? (


                        /* SIN SOLICITUDES */

                        <div className="p-16 text-center">


                            <FileText
                                size={48}
                                className="mx-auto mb-4 text-slate-300"
                            />


                            <h3 className="mb-2 text-xl font-semibold text-slate-700">

                                No hay solicitudes

                            </h3>


                            <p className="mb-6 text-slate-500">

                                Todavía no se registraron solicitudes en CotiMed.

                            </p>


                            <button

                                onClick={() =>
                                    navigate(
                                        "/admin/solicitudes/nueva"
                                    )
                                }

                                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"

                            >

                                <Plus size={20}/>

                                Crear solicitud

                            </button>


                        </div>


                    ) : (


                        /* TABLA */

                        <div className="overflow-x-auto">


                            <table className="w-full">


                                <thead>

                                    <tr className="bg-slate-50 text-left text-sm text-slate-600">


                                        <th className="px-6 py-4 font-semibold">

                                            Solicitud

                                        </th>


                                        <th className="px-6 py-4 font-semibold">

                                            Institución

                                        </th>


                                        <th className="px-6 py-4 font-semibold">

                                            Equipamiento

                                        </th>


                                        <th className="px-6 py-4 text-center font-semibold">

                                            Cantidad

                                        </th>


                                        <th className="px-6 py-4 text-center font-semibold">

                                            Urgencia

                                        </th>


                                        <th className="px-6 py-4 text-center font-semibold">

                                            Estado

                                        </th>


                                        <th className="px-6 py-4 text-center font-semibold">

                                            Cotizaciones

                                        </th>


                                        <th className="px-6 py-4 text-center font-semibold">

                                            Acción

                                        </th>


                                    </tr>

                                </thead>



                                <tbody>


                                    {

                                        solicitudes.map(
                                            (solicitud) => (

                                                <tr

                                                    key={
                                                        solicitud.id_solicitud
                                                    }

                                                    className="border-t transition hover:bg-slate-50"

                                                >


                                                    {/* SOLICITUD */}

                                                    <td className="px-6 py-5">


                                                        <div>

                                                            <p className="font-semibold text-slate-900">

                                                                {
                                                                    solicitud.titulo_solicitud
                                                                }

                                                            </p>


                                                            <p className="mt-1 text-sm text-slate-500">

                                                                #
                                                                {
                                                                    solicitud.id_solicitud
                                                                }

                                                            </p>

                                                        </div>


                                                    </td>



                                                    {/* INSTITUCIÓN */}

                                                    <td className="px-6 py-5">


                                                        <p className="font-medium text-slate-800">

                                                            {
                                                                solicitud.nombre_institucion
                                                            }

                                                        </p>


                                                    </td>



                                                    {/* EQUIPAMIENTO */}

                                                    <td className="px-6 py-5">


                                                        <p className="text-slate-700">

                                                            {
                                                                solicitud.equipamiento_solicitud
                                                            }

                                                        </p>


                                                    </td>



                                                    {/* CANTIDAD */}

                                                    <td className="px-6 py-5 text-center">


                                                        <span className="font-semibold text-slate-700">

                                                            {
                                                                solicitud.cantidad_solicitud
                                                            }

                                                        </span>


                                                    </td>



                                                    {/* URGENCIA */}

                                                    <td className="px-6 py-5 text-center">


                                                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">

                                                            {
                                                                solicitud.urgencia_solicitud
                                                            }

                                                        </span>


                                                    </td>



                                                    {/* ESTADO */}

                                                    <td className="px-6 py-5 text-center">


                                                        <span

                                                            className={`rounded-full px-3 py-1 text-sm font-semibold ${obtenerEstadoClase(
                                                                solicitud.estado_solicitud
                                                            )}`}

                                                        >

                                                            {
                                                                solicitud.estado_solicitud
                                                            }

                                                        </span>


                                                    </td>



                                                    {/* COTIZACIONES */}

                                                    <td className="px-6 py-5 text-center">


                                                        <span className="font-semibold text-cyan-600">

                                                            {
                                                                solicitud.cotizaciones?.length || 0
                                                            }

                                                        </span>


                                                    </td>



                                                    {/* ACCIONES */}

                                                    <td className="px-6 py-5">


                                                        <div className="flex justify-center gap-2">


                                                            <button

                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/solicitudes/${solicitud.id_solicitud}`
                                                                    )
                                                                }

                                                                className="flex items-center gap-2 rounded-lg border px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"

                                                            >

                                                                <Eye size={17}/>

                                                                Ver

                                                            </button>


                                                            <button

                                                                onClick={() =>
                                                                    eliminar(
                                                                        solicitud.id_solicitud
                                                                    )
                                                                }

                                                                className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50"

                                                            >

                                                                <Trash2 size={18}/>

                                                            </button>


                                                        </div>


                                                    </td>


                                                </tr>

                                            )
                                        )

                                    }


                                </tbody>


                            </table>


                        </div>

                    )

                }


            </div>


        </div>

    );

};


export default AddSolicitud;