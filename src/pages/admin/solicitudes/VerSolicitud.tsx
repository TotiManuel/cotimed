import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerSolicitudPorId,
    actualizarSolicitud,
    eliminarSolicitud,
    type Solicitud
} from "../../../services/solicitud.service";

import {
    ArrowLeft,
    FileText,
    Building2,
    Calendar,
    DollarSign,
    AlertCircle,
    Hash,
    MapPin,
    Wrench,
    GraduationCap
} from "lucide-react";


interface FormSolicitud {
    numero: string;
    titulo: string;
    descripcion: string;
    institucion_id: number;
    creado_por_id: number;
    estado: unknown;
    urgencia: unknown;
    fecha_publicacion: string | null;
    fecha_limite_cotizacion: string | null;
    fecha_cierre: string | null;
    presupuesto_estimado: number | null;
    moneda: unknown;
    condiciones: string;
    observaciones: string;
    lugar_entrega: string;
    requiere_instalacion: boolean;
    requiere_capacitacion: boolean;
    items: unknown[];
    mensajes: unknown[];
    archivos: unknown[];
    adjudicacion: unknown | null;
    fecha_creacion: string;
    fecha_actualizacion: string;
    eliminado: boolean;
}


const VerSolicitud = () => {

    const navigate = useNavigate();

    const {
        id
    } = useParams<{
        id: string;
    }>();


    const [
        solicitud,
        setSolicitud
    ] = useState<Solicitud | null>(null);


    const [
        editando,
        setEditando
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        guardando,
        setGuardando
    ] = useState(false);


    const [
        form,
        setForm
    ] = useState<FormSolicitud>({

        numero: "",

        titulo: "",

        descripcion: "",

        institucion_id: 0,

        creado_por_id: 0,

        estado: "",

        urgencia: "",

        fecha_publicacion: null,

        fecha_limite_cotizacion: null,

        fecha_cierre: null,

        presupuesto_estimado: null,

        moneda: "",

        condiciones: "",

        observaciones: "",

        lugar_entrega: "",

        requiere_instalacion: false,

        requiere_capacitacion: false,

        items: [],

        mensajes: [],

        archivos: [],

        adjudicacion: null,

        fecha_creacion: "",

        fecha_actualizacion: "",

        eliminado: false

    });


    /*
     * ================================
     * CARGAR SOLICITUD
     * ================================
     */

    useEffect(() => {

        if (!id) {

            setError(
                "No se recibió el ID de la solicitud"
            );

            return;

        }


        const cargarSolicitud = async () => {

            try {

                setError("");


                const data =
                    await obtenerSolicitudPorId(
                        Number(id)
                    );


                setSolicitud(data);


                setForm({

                    numero:
                        data.numero || "",

                    titulo:
                        data.titulo || "",

                    descripcion:
                        data.descripcion || "",

                    institucion_id:
                        Number(
                            data.institucion_id
                        ) || 0,

                    creado_por_id:
                        Number(
                            data.creado_por_id
                        ) || 0,

                    estado:
                        data.estado ?? "",

                    urgencia:
                        data.urgencia ?? "",

                    fecha_publicacion:
                        data.fecha_publicacion,

                    fecha_limite_cotizacion:
                        data.fecha_limite_cotizacion,

                    fecha_cierre:
                        data.fecha_cierre,

                    presupuesto_estimado:
                        data.presupuesto_estimado !== null
                            ? Number(
                                data.presupuesto_estimado
                            )
                            : null,

                    moneda:
                        data.moneda ?? "",

                    condiciones:
                        data.condiciones || "",

                    observaciones:
                        data.observaciones || "",

                    lugar_entrega:
                        data.lugar_entrega || "",

                    requiere_instalacion:
                        Boolean(
                            data.requiere_instalacion
                        ),

                    requiere_capacitacion:
                        Boolean(
                            data.requiere_capacitacion
                        ),

                    items:
                        Array.isArray(data.items)
                            ? data.items
                            : [],

                    mensajes:
                        Array.isArray(data.mensajes)
                            ? data.mensajes
                            : [],

                    archivos:
                        Array.isArray(data.archivos)
                            ? data.archivos
                            : [],

                    adjudicacion:
                        data.adjudicacion,

                    fecha_creacion:
                        data.fecha_creacion || "",

                    fecha_actualizacion:
                        data.fecha_actualizacion || "",

                    eliminado:
                        Boolean(
                            data.eliminado
                        )

                });


            } catch (error: unknown) {

                console.error(
                    "Error cargando solicitud:",
                    error
                );


                if (
                    error instanceof Error
                ) {

                    setError(
                        error.message
                    );

                } else {

                    setError(
                        "No se pudo cargar la solicitud"
                    );

                }

            }

        };


        cargarSolicitud();

    }, [id]);


    /*
     * ================================
     * CAMBIAR CAMPOS
     * ================================
     */

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]:
                    value

            })
        );

    };


    /*
     * ================================
     * CAMPOS NUMÉRICOS
     * ================================
     */

    const handleNumberChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]:
                    value === ""
                        ? null
                        : Number(value)

            })
        );

    };


    /*
     * ================================
     * CAMPOS BOOLEANOS
     * ================================
     */

    const handleBooleanChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {

        const {
            name,
            checked
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]:
                    checked

            })
        );

    };


    /*
     * ================================
     * ELIMINAR
     * ================================
     */

    const eliminar = async () => {

        if (!id) {

            setError(
                "No se encontró el ID de la solicitud"
            );

            return;

        }


        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar esta solicitud?"
            );


        if (!confirmar) {
            return;
        }


        try {

            setError("");


            await eliminarSolicitud(
                Number(id)
            );


            navigate(
                "/admin/solicitudes"
            );


        } catch (error: unknown) {

            console.error(
                "Error eliminando solicitud:",
                error
            );


            if (
                error instanceof Error
            ) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "No se pudo eliminar la solicitud"
                );

            }

        }

    };


    /*
     * ================================
     * GUARDAR CAMBIOS
     * ================================
     */

    const guardarCambios = async () => {

        if (!id) {

            setError(
                "No se encontró el ID de la solicitud"
            );

            return;

        }


        try {

            setGuardando(true);

            setError("");


            if (
                !form.titulo.trim()
            ) {

                setError(
                    "El título de la solicitud es obligatorio"
                );

                return;

            }


            if (
                !form.descripcion.trim()
            ) {

                setError(
                    "La descripción es obligatoria"
                );

                return;

            }


            if (
                form.presupuesto_estimado !== null &&
                form.presupuesto_estimado < 0
            ) {

                setError(
                    "El presupuesto no puede ser negativo"
                );

                return;

            }


            const actualizado =
                await actualizarSolicitud(

                    Number(id),

                    {

                        numero:
                            form.numero.trim(),

                        titulo:
                            form.titulo.trim(),

                        descripcion:
                            form.descripcion.trim(),

                        institucion_id:
                            Number(
                                form.institucion_id
                            ),

                        creado_por_id:
                            Number(
                                form.creado_por_id
                            ),

                        estado:
                            form.estado,

                        urgencia:
                            form.urgencia,

                        fecha_publicacion:
                            form.fecha_publicacion,

                        fecha_limite_cotizacion:
                            form.fecha_limite_cotizacion,

                        fecha_cierre:
                            form.fecha_cierre,

                        presupuesto_estimado:
                            form.presupuesto_estimado,

                        moneda:
                            form.moneda,

                        condiciones:
                            form.condiciones.trim(),

                        observaciones:
                            form.observaciones.trim(),

                        lugar_entrega:
                            form.lugar_entrega.trim(),

                        requiere_instalacion:
                            form.requiere_instalacion,

                        requiere_capacitacion:
                            form.requiere_capacitacion,

                        items:
                            form.items,

                        mensajes:
                            form.mensajes,

                        archivos:
                            form.archivos,

                        adjudicacion:
                            form.adjudicacion,

                        eliminado:
                            form.eliminado

                    }

                );


            setSolicitud(
                actualizado
            );


            setForm({

                numero:
                    actualizado.numero || "",

                titulo:
                    actualizado.titulo || "",

                descripcion:
                    actualizado.descripcion || "",

                institucion_id:
                    Number(
                        actualizado.institucion_id
                    ) || 0,

                creado_por_id:
                    Number(
                        actualizado.creado_por_id
                    ) || 0,

                estado:
                    actualizado.estado ?? "",

                urgencia:
                    actualizado.urgencia ?? "",

                fecha_publicacion:
                    actualizado.fecha_publicacion,

                fecha_limite_cotizacion:
                    actualizado.fecha_limite_cotizacion,

                fecha_cierre:
                    actualizado.fecha_cierre,

                presupuesto_estimado:
                    actualizado.presupuesto_estimado !== null
                        ? Number(
                            actualizado.presupuesto_estimado
                        )
                        : null,

                moneda:
                    actualizado.moneda ?? "",

                condiciones:
                    actualizado.condiciones || "",

                observaciones:
                    actualizado.observaciones || "",

                lugar_entrega:
                    actualizado.lugar_entrega || "",

                requiere_instalacion:
                    Boolean(
                        actualizado.requiere_instalacion
                    ),

                requiere_capacitacion:
                    Boolean(
                        actualizado.requiere_capacitacion
                    ),

                items:
                    Array.isArray(
                        actualizado.items
                    )
                        ? actualizado.items
                        : [],

                mensajes:
                    Array.isArray(
                        actualizado.mensajes
                    )
                        ? actualizado.mensajes
                        : [],

                archivos:
                    Array.isArray(
                        actualizado.archivos
                    )
                        ? actualizado.archivos
                        : [],

                adjudicacion:
                    actualizado.adjudicacion,

                fecha_creacion:
                    actualizado.fecha_creacion || "",

                fecha_actualizacion:
                    actualizado.fecha_actualizacion || "",

                eliminado:
                    Boolean(
                        actualizado.eliminado
                    )

            });


            setEditando(false);


        } catch (error: unknown) {

            console.error(
                "Error actualizando solicitud:",
                error
            );


            if (
                error instanceof Error
            ) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "No se pudo actualizar la solicitud"
                );

            }

        } finally {

            setGuardando(false);

        }

    };


    /*
     * ================================
     * CARGANDO
     * ================================
     */

    if (!solicitud) {

        return (

            <div className="mx-auto max-w-4xl">

                <div className="rounded-2xl bg-white p-8 shadow">

                    {
                        error

                            ?

                            <p className="text-red-600">

                                {error}

                            </p>

                            :

                            <p className="text-slate-600">

                                Cargando solicitud...

                            </p>
                    }

                </div>

            </div>

        );

    }


    /*
     * ================================
     * VISTA
     * ================================
     */

    return (

        <div className="mx-auto max-w-5xl">


            {/* VOLVER */}

            <button

                type="button"

                onClick={() =>
                    navigate(
                        "/admin/solicitudes"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>


            {/* TARJETA */}

            <div className="rounded-2xl bg-white p-8 shadow-lg">


                {/* ENCABEZADO */}

                <div className="mb-8 flex items-center gap-4">

                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <FileText size={32} />

                    </div>


                    <div className="flex-1">

                        <h1 className="text-3xl font-bold text-slate-900">

                            {
                                editando

                                    ?

                                    <input

                                        name="titulo"

                                        value={
                                            form.titulo
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none focus:border-cyan-500"

                                    />

                                    :

                                    solicitud.titulo

                            }

                        </h1>


                        <p className="text-slate-600">

                            Solicitud #{solicitud.numero}

                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {
                    error && (

                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">

                            {error}

                        </div>

                    )
                }


                {/* INFORMACIÓN */}

                <div className="grid gap-6 md:grid-cols-2">


                    {/* NÚMERO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Hash size={20} />

                            Número

                        </div>


                        {
                            editando

                                ?

                                <input

                                    name="numero"

                                    value={
                                        form.numero
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="text-lg">

                                    {solicitud.numero}

                                </p>

                        }

                    </div>


                    {/* INSTITUCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Building2 size={20} />

                            ID institución

                        </div>


                        {
                            editando

                                ?

                                <input

                                    type="number"

                                    name="institucion_id"

                                    min="1"

                                    value={
                                        form.institucion_id
                                    }

                                    onChange={
                                        handleNumberChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="text-lg">

                                    #{solicitud.institucion_id}

                                </p>

                        }

                    </div>


                    {/* EQUIPAMIENTO / DESCRIPCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <FileText size={20} />

                            Descripción

                        </div>


                        {
                            editando

                                ?

                                <textarea

                                    name="descripcion"

                                    value={
                                        form.descripcion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    rows={5}

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="whitespace-pre-wrap text-slate-700">

                                    {
                                        solicitud.descripcion
                                    }

                                </p>

                        }

                    </div>


                    {/* PRESUPUESTO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <DollarSign size={20} />

                            Presupuesto estimado

                        </div>


                        {
                            editando

                                ?

                                <input

                                    type="number"

                                    name="presupuesto_estimado"

                                    min="0"

                                    step="0.01"

                                    value={
                                        form.presupuesto_estimado ?? ""
                                    }

                                    onChange={
                                        handleNumberChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="text-lg font-semibold text-cyan-600">

                                    {
                                        solicitud.presupuesto_estimado !== null

                                            ?

                                            `$${Number(
                                                solicitud.presupuesto_estimado
                                            ).toLocaleString(
                                                "es-AR"
                                            )}`

                                            :

                                            "No especificado"

                                    }

                                </p>

                        }

                    </div>


                    {/* URGENCIA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <AlertCircle size={20} />

                            Urgencia

                        </div>


                        {
                            editando

                                ?

                                <input

                                    name="urgencia"

                                    value={
                                        String(
                                            form.urgencia
                                        )
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="capitalize">

                                    {
                                        String(
                                            solicitud.urgencia
                                        )
                                    }

                                </p>

                        }

                    </div>


                    {/* ESTADO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Estado

                        </div>


                        {
                            editando

                                ?

                                <input

                                    name="estado"

                                    value={
                                        String(
                                            form.estado
                                        )
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold capitalize text-cyan-700">

                                    {
                                        String(
                                            solicitud.estado
                                        )
                                    }

                                </span>

                        }

                    </div>


                    {/* CONDICIONES */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Condiciones

                        </div>


                        {
                            editando

                                ?

                                <textarea

                                    name="condiciones"

                                    value={
                                        form.condiciones
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    rows={4}

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="whitespace-pre-wrap text-slate-700">

                                    {
                                        solicitud.condiciones ||
                                        "No especificadas"
                                    }

                                </p>

                        }

                    </div>


                    {/* OBSERVACIONES */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Observaciones

                        </div>


                        {
                            editando

                                ?

                                <textarea

                                    name="observaciones"

                                    value={
                                        form.observaciones
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    rows={4}

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="whitespace-pre-wrap text-slate-700">

                                    {
                                        solicitud.observaciones ||
                                        "Sin observaciones"
                                    }

                                </p>

                        }

                    </div>


                    {/* LUGAR DE ENTREGA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <MapPin size={20} />

                            Lugar de entrega

                        </div>


                        {
                            editando

                                ?

                                <input

                                    name="lugar_entrega"

                                    value={
                                        form.lugar_entrega
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p>

                                    {
                                        solicitud.lugar_entrega ||
                                        "No especificado"
                                    }

                                </p>

                        }

                    </div>


                    {/* REQUIERE INSTALACIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Wrench size={20} />

                            Requiere instalación

                        </div>


                        {
                            editando

                                ?

                                <label className="flex cursor-pointer items-center gap-3">

                                    <input

                                        type="checkbox"

                                        name="requiere_instalacion"

                                        checked={
                                            form.requiere_instalacion
                                        }

                                        onChange={
                                            handleBooleanChange
                                        }

                                        className="h-5 w-5"

                                    />

                                    <span>

                                        {
                                            form.requiere_instalacion
                                                ? "Sí"
                                                : "No"
                                        }

                                    </span>

                                </label>

                                :

                                <p>

                                    {
                                        solicitud.requiere_instalacion
                                            ? "Sí"
                                            : "No"
                                    }

                                </p>

                        }

                    </div>


                    {/* REQUIERE CAPACITACIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <GraduationCap size={20} />

                            Requiere capacitación

                        </div>


                        {
                            editando

                                ?

                                <label className="flex cursor-pointer items-center gap-3">

                                    <input

                                        type="checkbox"

                                        name="requiere_capacitacion"

                                        checked={
                                            form.requiere_capacitacion
                                        }

                                        onChange={
                                            handleBooleanChange
                                        }

                                        className="h-5 w-5"

                                    />

                                    <span>

                                        {
                                            form.requiere_capacitacion
                                                ? "Sí"
                                                : "No"
                                        }

                                    </span>

                                </label>

                                :

                                <p>

                                    {
                                        solicitud.requiere_capacitacion
                                            ? "Sí"
                                            : "No"
                                    }

                                </p>

                        }

                    </div>


                    {/* FECHA DE CREACIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20} />

                            Fecha de creación

                        </div>


                        <p>

                            {
                                solicitud.fecha_creacion

                                    ?

                                    new Date(
                                        solicitud.fecha_creacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No disponible"

                            }

                        </p>

                    </div>


                    {/* FECHA DE ACTUALIZACIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20} />

                            Última actualización

                        </div>


                        <p>

                            {
                                solicitud.fecha_actualizacion

                                    ?

                                    new Date(
                                        solicitud.fecha_actualizacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No disponible"

                            }

                        </p>

                    </div>


                    {/* FECHA PUBLICACIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Fecha de publicación

                        </div>


                        <p>

                            {
                                solicitud.fecha_publicacion

                                    ?

                                    new Date(
                                        solicitud.fecha_publicacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No publicada"

                            }

                        </p>

                    </div>


                    {/* FECHA LÍMITE */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Fecha límite de cotización

                        </div>


                        <p>

                            {
                                solicitud.fecha_limite_cotizacion

                                    ?

                                    new Date(
                                        solicitud.fecha_limite_cotizacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No especificada"

                            }

                        </p>

                    </div>


                    {/* FECHA CIERRE */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 font-semibold text-slate-700">

                            Fecha de cierre

                        </div>


                        <p>

                            {
                                solicitud.fecha_cierre

                                    ?

                                    new Date(
                                        solicitud.fecha_cierre
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No cerrada"

                            }

                        </p>

                    </div>

                </div>


                {/* BOTONES */}

                <div className="mt-8 flex flex-wrap gap-4">


                    {
                        editando

                            ?

                            <button

                                type="button"

                                onClick={
                                    guardarCambios
                                }

                                disabled={
                                    guardando
                                }

                                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"

                            >

                                {
                                    guardando
                                        ?
                                        "Guardando..."
                                        :
                                        "Guardar cambios"
                                }

                            </button>

                            :

                            <button

                                type="button"

                                onClick={() =>
                                    setEditando(true)
                                }

                                className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                            >

                                Editar solicitud

                            </button>
                    }


                    <button

                        type="button"

                        onClick={
                            eliminar
                        }

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"

                    >

                        Eliminar solicitud

                    </button>


                    {
                        editando && (

                            <button

                                type="button"

                                onClick={() =>
                                    setEditando(false)
                                }

                                disabled={
                                    guardando
                                }

                                className="rounded-xl border px-6 py-3 hover:bg-slate-50"

                            >

                                Cancelar

                            </button>

                        )
                    }

                </div>


                {/* ID */}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">

                    <div className="mb-2 font-semibold text-slate-700">

                        ID de solicitud

                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        #{solicitud.id}

                    </p>

                </div>


            </div>

        </div>

    );

};


export default VerSolicitud;