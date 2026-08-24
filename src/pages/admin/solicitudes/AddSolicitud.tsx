import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearSolicitud
} from "../../../services/solicitud.service";

import {
    obtenerInstituciones,
    type Institucion
} from "../../../services/instituciones.service";

import {
    FileText,
    Building2,
    ArrowLeft,
    Send
} from "lucide-react";


const AddSolicitud = () => {

    const navigate = useNavigate();


    /*
     * =========================================================
     * ESTADOS
     * =========================================================
     */

    const [
        instituciones,
        setInstituciones
    ] = useState<Institucion[]>([]);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        loadingInstituciones,
        setLoadingInstituciones
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    /*
     * =========================================================
     * FORMULARIO
     * =========================================================
     */

    const [
        form,
        setForm
    ] = useState({

        titulo: "",

        descripcion: "",

        cantidad: 1,

        equipamiento: "",

        urgencia: "media",

        estado: "pendiente",

        institucion_id: "",

        presupuesto_estimado: "",

        especificaciones: ""

    });


    /*
     * =========================================================
     * CARGAR INSTITUCIONES
     * =========================================================
     */

    useEffect(() => {

        const cargarInstituciones = async () => {

            try {

                setLoadingInstituciones(true);

                setError("");


                const data =
                    await obtenerInstituciones();


                setInstituciones(
                    data
                );


            } catch (error: unknown) {

                console.error(
                    "Error cargando instituciones:",
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
                        "No se pudieron cargar las instituciones"
                    );

                }

            } finally {

                setLoadingInstituciones(false);

            }

        };


        cargarInstituciones();

    }, []);


    /*
     * =========================================================
     * CAMBIAR CAMPOS
     * =========================================================
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
     * =========================================================
     * CREAR NÚMERO DE SOLICITUD
     * =========================================================
     */

    const generarNumeroSolicitud = () => {

        const fecha =
            new Date();


        const año =
            fecha.getFullYear();


        const tiempo =
            Date.now()
                .toString()
                .slice(-6);


        return `SOL-${año}-${tiempo}`;

    };


    /*
     * =========================================================
     * OBTENER ID DEL USUARIO
     * =========================================================
     */

    const obtenerIdUsuario = () => {

        /*
         * Intentamos obtener el ID desde localStorage.
         *
         * Dependiendo de cómo esté implementado AuthContext,
         * puede encontrarse con alguno de estos nombres.
         */

        const posiblesClaves = [

            "usuario_id",

            "user_id",

            "id_usuario",

            "userId"

        ];


        for (
            const clave of posiblesClaves
        ) {

            const valor =
                localStorage.getItem(
                    clave
                );


            if (
                valor &&
                Number(valor) > 0
            ) {

                return Number(valor);

            }

        }


        /*
         * Si no existe el ID, devolvemos 0.
         * El backend podrá rechazarlo si el usuario
         * autenticado es obligatorio.
         */

        return 0;

    };


    /*
     * =========================================================
     * CREAR SOLICITUD
     * =========================================================
     */

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");


        /*
         * =====================================================
         * VALIDAR INSTITUCIÓN
         * =====================================================
         */

        if (
            !form.institucion_id
        ) {

            setError(
                "Debés seleccionar una institución"
            );

            return;

        }


        /*
         * =====================================================
         * VALIDAR TÍTULO
         * =====================================================
         */

        if (
            !form.titulo.trim()
        ) {

            setError(
                "El título de la solicitud es obligatorio"
            );

            return;

        }


        /*
         * =====================================================
         * VALIDAR EQUIPAMIENTO
         * =====================================================
         */

        if (
            !form.equipamiento.trim()
        ) {

            setError(
                "El equipamiento es obligatorio"
            );

            return;

        }


        /*
         * =====================================================
         * VALIDAR DESCRIPCIÓN
         * =====================================================
         */

        if (
            !form.descripcion.trim()
        ) {

            setError(
                "La descripción es obligatoria"
            );

            return;

        }


        /*
         * =====================================================
         * VALIDAR CANTIDAD
         * =====================================================
         */

        const cantidad =
            Number(
                form.cantidad
            );


        if (
            !Number.isFinite(cantidad) ||
            cantidad <= 0
        ) {

            setError(
                "La cantidad debe ser mayor a cero"
            );

            return;

        }


        /*
         * =====================================================
         * VALIDAR PRESUPUESTO
         * =====================================================
         */

        const presupuesto =
            form.presupuesto_estimado === ""

                ? null

                : Number(
                    form.presupuesto_estimado
                );


        if (
            presupuesto !== null &&
            (
                !Number.isFinite(presupuesto) ||
                presupuesto < 0
            )
        ) {

            setError(
                "El presupuesto estimado no es válido"
            );

            return;

        }


        /*
         * =====================================================
         * OBTENER USUARIO
         * =====================================================
         */

        const creadoPorId =
            obtenerIdUsuario();


        if (
            creadoPorId <= 0
        ) {

            setError(
                "No se pudo identificar al usuario que crea la solicitud. Cerrá sesión e iniciá sesión nuevamente."
            );

            return;

        }


        /*
         * =====================================================
         * FECHA ACTUAL
         * =====================================================
         */

        const fechaActual =
            new Date()
                .toISOString();


        /*
         * =====================================================
         * INSTITUCIÓN
         * =====================================================
         */


        /*
         * =====================================================
         * ITEMS
         * =====================================================
         */

        const items = [

            {

                equipamiento:
                    form.equipamiento.trim(),

                cantidad:

                    cantidad,

                especificaciones:

                    form.especificaciones.trim()

            }

        ];


        /*
         * =====================================================
         * CREAR
         * =====================================================
         */

        try {

            setLoading(true);


            await crearSolicitud({

                numero:
                    generarNumeroSolicitud(),

                titulo:
                    form.titulo.trim(),

                descripcion:
                    form.descripcion.trim(),

                institucion_id:
                    Number(
                        form.institucion_id
                    ),

                creado_por_id:
                    creadoPorId,

                estado:
                    form.estado,

                urgencia:
                    form.urgencia,

                fecha_publicacion:
                    fechaActual,

                fecha_limite_cotizacion:
                    null,

                fecha_cierre:
                    null,

                presupuesto_estimado:
                    presupuesto,

                moneda:
                    "ARS",

                condiciones:
                    null,

                observaciones:
                    null,

                lugar_entrega:
                    null,

                requiere_instalacion:
                    false,

                requiere_capacitacion:
                    false,

                items:
                    items,

                mensajes:
                    [],

                archivos:
                    [],

                adjudicacion:
                    null,

                fecha_creacion:
                    fechaActual,

                fecha_actualizacion:
                    fechaActual,

                eliminado:
                    false

            });


            /*
             * =================================================
             * VOLVER AL LISTADO
             * =================================================
             */

            navigate(
                "/admin/solicitudes"
            );


        } catch (error: unknown) {

            console.error(
                "Error creando solicitud:",
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
                    "Error al crear la solicitud"
                );

            }

        } finally {

            setLoading(false);

        }

    };


    /*
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (

        <div className="mx-auto max-w-2xl">


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

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <FileText size={28} />

                        </div>


                        <div>

                            <h1 className="text-3xl font-bold text-slate-900">

                                Nueva solicitud

                            </h1>


                            <p className="text-slate-600">

                                Registrar una solicitud en CotiMed

                            </p>

                        </div>

                    </div>

                </div>


                {/* ERROR */}

                {

                    error && (

                        <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">

                            {error}

                        </div>

                    )

                }


                <form

                    onSubmit={
                        handleSubmit
                    }

                    className="space-y-6"

                >


                    {/* INSTITUCIÓN */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Institución

                        </label>


                        <div className="relative">

                            <Building2

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <select

                                name="institucion_id"

                                value={
                                    form.institucion_id
                                }

                                onChange={
                                    handleChange
                                }

                                disabled={
                                    loadingInstituciones
                                }

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500 disabled:bg-slate-100"

                                required

                            >

                                <option value="">

                                    {

                                        loadingInstituciones

                                            ?

                                            "Cargando instituciones..."

                                            :

                                            "Seleccionar institución"

                                    }

                                </option>


                                {

                                    instituciones.map(

                                        (
                                            institucion
                                        ) => (

                                            <option

                                                key={
                                                    institucion.id
                                                }

                                                value={
                                                    institucion.id
                                                }

                                            >

                                                {

                                                    institucion.organizacion ||

                                                    `Institución #${institucion.id}`

                                                }

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                    </div>


                    {/* TÍTULO */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Título de la solicitud

                        </label>


                        <input

                            name="titulo"

                            value={
                                form.titulo
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: Compra de monitores"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>


                    {/* EQUIPAMIENTO */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Equipamiento

                        </label>


                        <input

                            name="equipamiento"

                            value={
                                form.equipamiento
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: Monitor multiparamétrico"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>


                    {/* CANTIDAD + URGENCIA */}

                    <div className="grid gap-6 md:grid-cols-2">


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Cantidad

                            </label>


                            <input

                                type="number"

                                name="cantidad"

                                min="1"

                                step="1"

                                value={
                                    form.cantidad
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                required

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Urgencia

                            </label>


                            <select

                                name="urgencia"

                                value={
                                    form.urgencia
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            >

                                <option value="baja">

                                    Baja

                                </option>


                                <option value="media">

                                    Media

                                </option>


                                <option value="alta">

                                    Alta

                                </option>


                                <option value="urgente">

                                    Urgente

                                </option>

                            </select>

                        </div>

                    </div>


                    {/* DESCRIPCIÓN */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Descripción

                        </label>


                        <textarea

                            name="descripcion"

                            value={
                                form.descripcion
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Describí qué necesita la institución..."

                            rows={4}

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>


                    {/* ESPECIFICACIONES */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Especificaciones

                        </label>


                        <textarea

                            name="especificaciones"

                            value={
                                form.especificaciones
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Características técnicas, medidas, requisitos, etc."

                            rows={4}

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                        />

                    </div>


                    {/* PRESUPUESTO */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Presupuesto estimado

                        </label>


                        <input

                            type="number"

                            name="presupuesto_estimado"

                            min="0"

                            step="0.01"

                            value={
                                form.presupuesto_estimado
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="0.00"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                        />

                    </div>


                    {/* BOTÓN */}

                    <button

                        type="submit"

                        disabled={
                            loading ||
                            loadingInstituciones
                        }

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >

                        <Send size={20} />

                        {

                            loading

                                ?

                                "Guardando..."

                                :

                                "Crear solicitud"

                        }

                    </button>


                </form>

            </div>

        </div>

    );

};


export default AddSolicitud;