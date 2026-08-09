
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
    listarInstituciones,
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


    const [
        form,
        setForm
    ] = useState({

        titulo_solicitud: "",

        equipamiento_solicitud: "",

        descripcion_solicitud: "",

        cantidad_solicitud: 1,

        urgencia_solicitud: "media",

        estado_solicitud: "pendiente",

        id_institucion: "",

        nombre_institucion: "",

        especificaciones_solicitud: "",

        presupuesto_estimado_solicitud: ""

    });



    /*
     * Cargar instituciones
     */

    useEffect(() => {


        const cargarInstituciones = async () => {


            try {


                setLoadingInstituciones(true);


                const data =
                    await listarInstituciones();


                setInstituciones(data);


            } catch (error: any) {


                console.error(
                    "Error cargando instituciones:",
                    error
                );


                setError(
                    error?.message ||
                    "No se pudieron cargar las instituciones"
                );


            } finally {


                setLoadingInstituciones(false);

            }

        };


        cargarInstituciones();


    }, []);



    /*
     * Cambiar campos
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


        /*
         * Institución
         */

        if (
            name === "id_institucion"
        ) {


            const institucion =
                instituciones.find(

                    (item) =>
                        item.id === Number(value)

                );


            setForm({

                ...form,

                id_institucion: value,

                nombre_institucion:
                    institucion?.organizacion || ""

            });


            return;

        }


        /*
         * Resto de campos
         */

        setForm({

            ...form,

            [name]: value

        });

    };



    /*
     * Crear solicitud
     */

    const handleSubmit = async (

        e: React.FormEvent

    ) => {


        e.preventDefault();


        setError("");


        /*
         * Validar institución
         */

        if (
            !form.id_institucion
        ) {

            setError(
                "Debés seleccionar una institución"
            );

            return;

        }


        /*
         * Validar título
         */

        if (
            !form.titulo_solicitud.trim()
        ) {

            setError(
                "El título de la solicitud es obligatorio"
            );

            return;

        }


        /*
         * Validar equipamiento
         */

        if (
            !form.equipamiento_solicitud.trim()
        ) {

            setError(
                "El equipamiento es obligatorio"
            );

            return;

        }


        /*
         * Validar descripción
         */

        if (
            !form.descripcion_solicitud.trim()
        ) {

            setError(
                "La descripción es obligatoria"
            );

            return;

        }


        /*
         * Validar cantidad
         */

        if (
            Number(
                form.cantidad_solicitud
            ) <= 0
        ) {

            setError(
                "La cantidad debe ser mayor a cero"
            );

            return;

        }


        /*
         * Validar presupuesto
         */

        if (
            Number(
                form.presupuesto_estimado_solicitud
            ) < 0
        ) {

            setError(
                "El presupuesto no puede ser negativo"
            );

            return;

        }


        try {


            setLoading(true);


            await crearSolicitud({

                titulo_solicitud:
                    form.titulo_solicitud.trim(),

                equipamiento_solicitud:
                    form.equipamiento_solicitud.trim(),

                descripcion_solicitud:
                    form.descripcion_solicitud.trim(),

                cantidad_solicitud:
                    Number(
                        form.cantidad_solicitud
                    ),

                urgencia_solicitud:
                    form.urgencia_solicitud,

                estado_solicitud:
                    form.estado_solicitud,

                id_institucion:
                    Number(
                        form.id_institucion
                    ),

                nombre_institucion:
                    form.nombre_institucion,

                especificaciones_solicitud:
                    form.especificaciones_solicitud.trim(),

                presupuesto_estimado_solicitud:
                    Number(
                        form.presupuesto_estimado_solicitud
                    )

            });


            /*
             * Volver al listado
             */

            navigate(
                "/admin/solicitudes"
            );


        } catch (error: any) {


            console.error(
                "Error creando solicitud:",
                error
            );


            setError(

                error?.message ||
                "Error al crear la solicitud"

            );


        } finally {


            setLoading(false);

        }

    };



    return (

        <div className="max-w-2xl mx-auto">


            {/* VOLVER */}

            <button

                onClick={() =>
                    navigate(
                        "/admin/solicitudes"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20}/>

                Volver

            </button>



            {/* TARJETA */}

            <div className="rounded-2xl bg-white p-8 shadow-lg">


                {/* ENCABEZADO */}

                <div className="mb-8">


                    <div className="flex items-center gap-3">


                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <FileText size={28}/>

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

                                name="id_institucion"

                                value={
                                    form.id_institucion
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
                                        (institucion) => (

                                            <option

                                                key={
                                                    institucion.id
                                                }

                                                value={
                                                    institucion.id
                                                }

                                            >

                                                {
                                                    institucion.organizacion
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

                            name="titulo_solicitud"

                            value={
                                form.titulo_solicitud
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

                            name="equipamiento_solicitud"

                            value={
                                form.equipamiento_solicitud
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

                                name="cantidad_solicitud"

                                min="1"

                                value={
                                    form.cantidad_solicitud
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

                                name="urgencia_solicitud"

                                value={
                                    form.urgencia_solicitud
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

                            name="descripcion_solicitud"

                            value={
                                form.descripcion_solicitud
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

                            name="especificaciones_solicitud"

                            value={
                                form.especificaciones_solicitud
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Características técnicas, medidas, requisitos, etc."

                            rows={4}

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />


                    </div>



                    {/* PRESUPUESTO */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Presupuesto estimado

                        </label>


                        <input

                            type="number"

                            name="presupuesto_estimado_solicitud"

                            min="0"

                            step="0.01"

                            value={
                                form.presupuesto_estimado_solicitud
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="0.00"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

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

                        <Send size={20}/>


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
