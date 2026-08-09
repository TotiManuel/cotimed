import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearCotizacion
} from "../../../services/cotizaciones.service";

import {
    listarSolicitudes,
    type Solicitud
} from "../../../services/solicitud.service";

import {
    listarProveedores,
    type Proveedor
} from "../../../services/proveedores.service";

import {
    FileText,
    Building2,
    ArrowLeft,
    Send,
    DollarSign,
    Calendar,
    ShieldCheck,
    Plus,
    Trash2
} from "lucide-react";


const AddCotizacion = () => {


    const navigate = useNavigate();


    const [
        solicitudes,
        setSolicitudes
    ] = useState<Solicitud[]>([]);


    const [
        proveedores,
        setProveedores
    ] = useState<Proveedor[]>([]);


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        loadingDatos,
        setLoadingDatos
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        incluye,
        setIncluye
    ] = useState<string[]>([]);


    const [
        nuevoIncluye,
        setNuevoIncluye
    ] = useState("");


    const [
        form,
        setForm
    ] = useState({

        id_solicitud: "",

        id_proveedor: "",

        nombre_proveedor: "",

        precio_unitario_cotizacion: "",

        precio_total_cotizacion: "",

        plazo_entrega_dias_cotizacion: "",

        garantia_meses_cotizacion: "",

        descripcion_cotizacion: "",

        estado_cotizacion: "enviada"

    });



    /*
     * ==========================================
     * CARGAR SOLICITUDES Y PROVEEDORES
     * ==========================================
     */

    useEffect(() => {


        const cargarDatos = async () => {

            try {

                setLoadingDatos(true);

                const [
                    solicitudesData,
                    proveedoresData
                ] = await Promise.all([

                    listarSolicitudes(),

                    listarProveedores()

                ]);


                setSolicitudes(
                    solicitudesData
                );


                setProveedores(
                    proveedoresData
                );


            } catch (error: any) {

                console.error(
                    "Error cargando datos:",
                    error
                );


                setError(
                    error?.message ||
                    "No se pudieron cargar las solicitudes y proveedores"
                );


            } finally {

                setLoadingDatos(false);

            }

        };


        cargarDatos();


    }, []);



    /*
     * ==========================================
     * CAMBIAR CAMPOS
     * ==========================================
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
         * Proveedor
         */

        if (
            name === "id_proveedor"
        ) {


            const proveedor =
                proveedores.find(

                    (item) =>
                        item.id === Number(value)

                );


            setForm({

                ...form,

                id_proveedor: value,

                nombre_proveedor:
                    proveedor?.organizacion ||
                    proveedor?.name_user ||
                    ""

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
     * ==========================================
     * AGREGAR ELEMENTO INCLUIDO
     * ==========================================
     */

    const agregarIncluye = () => {


        const descripcion =
            nuevoIncluye.trim();


        if (!descripcion) return;


        setIncluye([

            ...incluye,

            descripcion

        ]);


        setNuevoIncluye("");

    };



    /*
     * ==========================================
     * ELIMINAR ELEMENTO INCLUIDO
     * ==========================================
     */

    const eliminarIncluye = (
        index: number
    ) => {


        setIncluye(

            incluye.filter(
                (_, i) =>
                    i !== index
            )

        );

    };



    /*
     * ==========================================
     * CREAR COTIZACIÓN
     * ==========================================
     */

    const handleSubmit = async (

        e: React.FormEvent

    ) => {


        e.preventDefault();


        setError("");



        /*
         * Validar solicitud
         */

        if (
            !form.id_solicitud
        ) {

            setError(
                "Debés seleccionar una solicitud"
            );

            return;

        }



        /*
         * Validar proveedor
         */

        if (
            !form.id_proveedor
        ) {

            setError(
                "Debés seleccionar un proveedor"
            );

            return;

        }



        /*
         * Validar precio unitario
         */

        if (
            Number(
                form.precio_unitario_cotizacion
            ) <= 0
        ) {

            setError(
                "El precio unitario debe ser mayor a cero"
            );

            return;

        }



        /*
         * Validar precio total
         */

        if (
            Number(
                form.precio_total_cotizacion
            ) <= 0
        ) {

            setError(
                "El precio total debe ser mayor a cero"
            );

            return;

        }



        /*
         * Validar plazo
         */

        if (
            Number(
                form.plazo_entrega_dias_cotizacion
            ) < 0
        ) {

            setError(
                "El plazo de entrega no puede ser negativo"
            );

            return;

        }



        /*
         * Validar garantía
         */

        if (
            Number(
                form.garantia_meses_cotizacion
            ) < 0
        ) {

            setError(
                "La garantía no puede ser negativa"
            );

            return;

        }



        /*
         * Validar descripción
         */

        if (
            !form.descripcion_cotizacion.trim()
        ) {

            setError(
                "La descripción de la cotización es obligatoria"
            );

            return;

        }



        try {


            setLoading(true);



            await crearCotizacion({

                id_solicitud:
                    Number(
                        form.id_solicitud
                    ),

                id_proveedor:
                    Number(
                        form.id_proveedor
                    ),

                nombre_proveedor:
                    form.nombre_proveedor,

                precio_unitario_cotizacion:
                    Number(
                        form.precio_unitario_cotizacion
                    ),

                precio_total_cotizacion:
                    Number(
                        form.precio_total_cotizacion
                    ),

                plazo_entrega_dias_cotizacion:
                    Number(
                        form.plazo_entrega_dias_cotizacion
                    ),

                garantia_meses_cotizacion:
                    Number(
                        form.garantia_meses_cotizacion
                    ),

                descripcion_cotizacion:
                    form.descripcion_cotizacion.trim(),

                estado_cotizacion:
                    form.estado_cotizacion,

                incluye_cotizacion:

                    incluye.map(
                        (descripcion) => ({

                            descripcion

                        })
                    )

            });



            /*
             * Volver al listado
             */

            navigate(
                "/admin/cotizaciones"
            );


        } catch (error: any) {


            console.error(
                "Error creando cotización:",
                error
            );


            setError(

                error?.message ||
                "Error al crear la cotización"

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
                        "/admin/cotizaciones"
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

                                Nueva cotización

                            </h1>


                            <p className="text-slate-600">

                                Registrar una cotización en CotiMed

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


                    {/* SOLICITUD */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Solicitud

                        </label>


                        <div className="relative">


                            <FileText

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <select

                                name="id_solicitud"

                                value={
                                    form.id_solicitud
                                }

                                onChange={
                                    handleChange
                                }

                                disabled={
                                    loadingDatos
                                }

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500 disabled:bg-slate-100"

                                required

                            >

                                <option value="">

                                    {
                                        loadingDatos

                                        ?

                                        "Cargando solicitudes..."

                                        :

                                        "Seleccionar solicitud"

                                    }

                                </option>


                                {
                                    solicitudes.map(
                                        (solicitud) => (

                                            <option

                                                key={
                                                    solicitud.id_solicitud
                                                }

                                                value={
                                                    solicitud.id_solicitud
                                                }

                                            >

                                                #
                                                {
                                                    solicitud.id_solicitud
                                                }

                                                {" - "}

                                                {
                                                    solicitud.titulo_solicitud
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>


                        </div>


                    </div>



                    {/* PROVEEDOR */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Proveedor

                        </label>


                        <div className="relative">


                            <Building2

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <select

                                name="id_proveedor"

                                value={
                                    form.id_proveedor
                                }

                                onChange={
                                    handleChange
                                }

                                disabled={
                                    loadingDatos
                                }

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500 disabled:bg-slate-100"

                                required

                            >

                                <option value="">

                                    {
                                        loadingDatos

                                        ?

                                        "Cargando proveedores..."

                                        :

                                        "Seleccionar proveedor"

                                    }

                                </option>


                                {
                                    proveedores.map(
                                        (proveedor) => (

                                            <option

                                                key={
                                                    proveedor.id
                                                }

                                                value={
                                                    proveedor.id
                                                }

                                            >

                                                {
                                                    proveedor.organizacion ||
                                                    proveedor.name_user
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>


                        </div>


                    </div>



                    {/* PRECIO UNITARIO + TOTAL */}

                    <div className="grid gap-6 md:grid-cols-2">


                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Precio unitario

                            </label>


                            <div className="relative">


                                <DollarSign

                                    size={20}

                                    className="absolute left-3 top-3 text-slate-400"

                                />


                                <input

                                    type="number"

                                    name="precio_unitario_cotizacion"

                                    min="0"

                                    step="0.01"

                                    value={
                                        form.precio_unitario_cotizacion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="0.00"

                                    className="w-full rounded-lg border px-4 py-3 pl-10 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                        </div>



                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Precio total

                            </label>


                            <div className="relative">


                                <DollarSign

                                    size={20}

                                    className="absolute left-3 top-3 text-slate-400"

                                />


                                <input

                                    type="number"

                                    name="precio_total_cotizacion"

                                    min="0"

                                    step="0.01"

                                    value={
                                        form.precio_total_cotizacion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="0.00"

                                    className="w-full rounded-lg border px-4 py-3 pl-10 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                        </div>


                    </div>



                    {/* PLAZO + GARANTÍA */}

                    <div className="grid gap-6 md:grid-cols-2">


                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Plazo de entrega (días)

                            </label>


                            <div className="relative">


                                <Calendar

                                    size={20}

                                    className="absolute left-3 top-3 text-slate-400"

                                />


                                <input

                                    type="number"

                                    name="plazo_entrega_dias_cotizacion"

                                    min="0"

                                    value={
                                        form.plazo_entrega_dias_cotizacion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="Ej: 15"

                                    className="w-full rounded-lg border px-4 py-3 pl-10 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                        </div>



                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Garantía (meses)

                            </label>


                            <div className="relative">


                                <ShieldCheck

                                    size={20}

                                    className="absolute left-3 top-3 text-slate-400"

                                />


                                <input

                                    type="number"

                                    name="garantia_meses_cotizacion"

                                    min="0"

                                    value={
                                        form.garantia_meses_cotizacion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    placeholder="Ej: 12"

                                    className="w-full rounded-lg border px-4 py-3 pl-10 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                        </div>


                    </div>



                    {/* ESTADO */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Estado

                        </label>


                        <select

                            name="estado_cotizacion"

                            value={
                                form.estado_cotizacion
                            }

                            onChange={
                                handleChange
                            }

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                        >

                            <option value="enviada">

                                Enviada

                            </option>


                            <option value="pendiente">

                                Pendiente

                            </option>


                            <option value="aceptada">

                                Aceptada

                            </option>


                            <option value="rechazada">

                                Rechazada

                            </option>


                            <option value="cancelada">

                                Cancelada

                            </option>

                        </select>


                    </div>



                    {/* DESCRIPCIÓN */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Descripción

                        </label>


                        <textarea

                            name="descripcion_cotizacion"

                            value={
                                form.descripcion_cotizacion
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Describí la cotización, condiciones, características, etc."

                            rows={4}

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />


                    </div>



                    {/* INCLUYE */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Incluye la cotización

                        </label>


                        <div className="flex gap-2">


                            <input

                                type="text"

                                value={
                                    nuevoIncluye
                                }

                                onChange={(e) =>
                                    setNuevoIncluye(
                                        e.target.value
                                    )
                                }

                                onKeyDown={(e) => {

                                    if (
                                        e.key === "Enter"
                                    ) {

                                        e.preventDefault();

                                        agregarIncluye();

                                    }

                                }}

                                placeholder="Ej: Instalación"

                                className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            />


                            <button

                                type="button"

                                onClick={
                                    agregarIncluye
                                }

                                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-3 font-semibold text-white hover:bg-slate-900"

                            >

                                <Plus size={20}/>

                                Agregar

                            </button>


                        </div>



                        {
                            incluye.length > 0 && (

                                <div className="mt-4 space-y-2">


                                    {
                                        incluye.map(
                                            (
                                                item,
                                                index
                                            ) => (

                                                <div

                                                    key={
                                                        index
                                                    }

                                                    className="flex items-center justify-between rounded-lg bg-slate-50 p-3"

                                                >

                                                    <span>

                                                        {item}

                                                    </span>


                                                    <button

                                                        type="button"

                                                        onClick={() =>
                                                            eliminarIncluye(
                                                                index
                                                            )
                                                        }

                                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"

                                                    >

                                                        <Trash2
                                                            size={18}
                                                        />

                                                    </button>

                                                </div>

                                            )
                                        )
                                    }


                                </div>

                            )
                        }


                    </div>



                    {/* BOTÓN */}

                    <button

                        type="submit"

                        disabled={
                            loading ||
                            loadingDatos
                        }

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >

                        <Send size={20}/>


                        {

                            loading

                            ?

                            "Guardando..."

                            :

                            "Crear cotización"

                        }

                    </button>


                </form>


            </div>


        </div>

    );

};


export default AddCotizacion;
