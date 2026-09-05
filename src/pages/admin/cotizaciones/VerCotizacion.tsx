import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarCotizacion,
    actualizarCotizacion,
    eliminarCotizacion
} from "../../../services/cotizaciones.service";

import {
    ArrowLeft,
    FileText,
    Building2,
    DollarSign,
    Calendar,
    Clock,
    ShieldCheck,
    Package,
    ClipboardList,
    CheckCircle
} from "lucide-react";


const VerCotizacion = () => {


    const navigate = useNavigate();


    const {
        id
    } = useParams();



    /*
     * Cotización
     */

    const [
        cotizacion,
        setCotizacion
    ] = useState<any>(null);



    /*
     * Estado de edición
     */

    const [
        editando,
        setEditando
    ] = useState(false);



    /*
     * Error
     */

    const [
        error,
        setError
    ] = useState("");



    /*
     * Guardando
     */

    const [
        guardando,
        setGuardando
    ] = useState(false);



    /*
     * Formulario
     */

    const [
        form,
        setForm
    ] = useState({

        nombre_proveedor: "",

        precio_unitario_cotizacion: 0,

        precio_total_cotizacion: 0,

        plazo_entrega_dias_cotizacion: 0,

        garantia_meses_cotizacion: 0,

        descripcion_cotizacion: "",

        estado_cotizacion: ""

    });



    /*
     * Cargar cotización
     */

    useEffect(() => {


        if (!id) return;


        const cargarCotizacion = async () => {


            try {


                const data =
                    await buscarCotizacion(
                        Number(id)
                    );


                setCotizacion(data);


                setForm({

                    nombre_proveedor:
                        data.nombre_proveedor || "",

                    precio_unitario_cotizacion:
                        data.precio_unitario_cotizacion || 0,

                    precio_total_cotizacion:
                        data.precio_total_cotizacion || 0,

                    plazo_entrega_dias_cotizacion:
                        data.plazo_entrega_dias_cotizacion || 0,

                    garantia_meses_cotizacion:
                        data.garantia_meses_cotizacion || 0,

                    descripcion_cotizacion:
                        data.descripcion_cotizacion || "",

                    estado_cotizacion:
                        data.estado_cotizacion || ""

                });


            } catch (error: any) {


                console.error(
                    "Error cargando cotización:",
                    error
                );


                setError(
                    error?.message ||
                    "No se pudo cargar la cotización"
                );

            }

        };


        cargarCotizacion();


    }, [id]);



    /*
     * Cambio de campos
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


        setForm({

            ...form,

            [name]: value

        });

    };



    /*
     * Eliminar cotización
     */

    const eliminar = async () => {


        const confirmar =
            window.confirm(

                "¿Seguro que querés eliminar esta cotización?"

            );


        if (!confirmar) return;


        try {


            await eliminarCotizacion(
                Number(id)
            );


            navigate(
                "/admin/cotizaciones"
            );


        } catch (error: any) {


            console.error(
                "Error eliminando cotización:",
                error
            );


            setError(
                error?.message ||
                "No se pudo eliminar la cotización"
            );

        }

    };



    /*
     * Guardar cambios
     */

    const guardarCambios = async () => {


        try {


            setGuardando(true);

            setError("");


            /*
             * Validaciones
             */

            if (
                !form.nombre_proveedor.trim()
            ) {

                setError(
                    "El nombre del proveedor es obligatorio"
                );

                setGuardando(false);

                return;

            }


            if (
                Number(
                    form.precio_unitario_cotizacion
                ) < 0
            ) {

                setError(
                    "El precio unitario no puede ser negativo"
                );

                setGuardando(false);

                return;

            }


            if (
                Number(
                    form.precio_total_cotizacion
                ) < 0
            ) {

                setError(
                    "El precio total no puede ser negativo"
                );

                setGuardando(false);

                return;

            }


            if (
                Number(
                    form.plazo_entrega_dias_cotizacion
                ) < 0
            ) {

                setError(
                    "El plazo de entrega no puede ser negativo"
                );

                setGuardando(false);

                return;

            }


            if (
                Number(
                    form.garantia_meses_cotizacion
                ) < 0
            ) {

                setError(
                    "La garantía no puede ser negativa"
                );

                setGuardando(false);

                return;

            }



            /*
             * Actualizar
             */

            const actualizado =
                await actualizarCotizacion(

                    Number(id),

                    {

                        nombre_proveedor:
                            form.nombre_proveedor.trim(),

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
                            form.estado_cotizacion

                    }

                );



            /*
             * Actualizar cotización mostrada
             */

            setCotizacion(
                actualizado
            );



            /*
             * Actualizar formulario
             */

            setForm({

                nombre_proveedor:
                    actualizado.nombre_proveedor || "",

                precio_unitario_cotizacion:
                    actualizado.precio_unitario_cotizacion || 0,

                precio_total_cotizacion:
                    actualizado.precio_total_cotizacion || 0,

                plazo_entrega_dias_cotizacion:
                    actualizado.plazo_entrega_dias_cotizacion || 0,

                garantia_meses_cotizacion:
                    actualizado.garantia_meses_cotizacion || 0,

                descripcion_cotizacion:
                    actualizado.descripcion_cotizacion || "",

                estado_cotizacion:
                    actualizado.estado_cotizacion || ""

            });


            setEditando(false);


        } catch (error: any) {


            console.error(
                "Error actualizando cotización:",
                error
            );


            setError(
                error?.message ||
                "No se pudo actualizar la cotización"
            );


        } finally {


            setGuardando(false);

        }

    };



    /*
     * Cargando
     */

    if (!cotizacion) {


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

                            Cargando cotización...

                        </p>
                    }


                </div>


            </div>

        );

    }



    return (

        <div className="mx-auto max-w-5xl">


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

                <div className="mb-8 flex items-center gap-4">


                    <div className="rounded-xl bg-emerald-600 p-4 text-white">

                        <FileText size={32}/>

                    </div>


                    <div className="flex-1">


                        <h1 className="text-3xl font-bold text-slate-900">

                            {
                                editando

                                ?

                                <input

                                    name="nombre_proveedor"

                                    value={
                                        form.nombre_proveedor
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none focus:border-emerald-500"

                                />

                                :

                                `Cotización de ${cotizacion.nombre_proveedor}`

                            }

                        </h1>


                        <p className="text-slate-600">

                            Cotización #{cotizacion.id_cotizacion}

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



                    {/* PROVEEDOR */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Building2 size={20}/>

                            Proveedor

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="nombre_proveedor"

                                value={
                                    form.nombre_proveedor
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="text-lg">

                                {
                                    cotizacion.nombre_proveedor
                                }

                            </p>

                        }


                    </div>



                    {/* ID SOLICITUD */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20}/>

                            Solicitud

                        </div>


                        <p className="text-lg font-semibold">

                            #{cotizacion.id_solicitud}

                        </p>


                    </div>



                    {/* PRECIO UNITARIO */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <DollarSign size={20}/>

                            Precio unitario

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="text-lg font-semibold text-emerald-600">

                                $

                                {
                                    Number(
                                        cotizacion.precio_unitario_cotizacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )
                                }

                            </p>

                        }


                    </div>



                    {/* PRECIO TOTAL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <DollarSign size={20}/>

                            Precio total

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="text-2xl font-bold text-emerald-600">

                                $

                                {
                                    Number(
                                        cotizacion.precio_total_cotizacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )
                                }

                            </p>

                        }


                    </div>



                    {/* PLAZO DE ENTREGA */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Clock size={20}/>

                            Plazo de entrega

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="text-lg font-semibold">

                                {
                                    cotizacion.plazo_entrega_dias_cotizacion
                                }

                                {" "}

                                días

                            </p>

                        }


                    </div>



                    {/* GARANTÍA */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ShieldCheck size={20}/>

                            Garantía

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="text-lg font-semibold">

                                {
                                    cotizacion.garantia_meses_cotizacion
                                }

                                {" "}

                                meses

                            </p>

                        }


                    </div>



                    {/* ESTADO */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <CheckCircle size={20}/>

                            Estado

                        </div>


                        {
                            editando

                            ?

                            <select

                                name="estado_cotizacion"

                                value={
                                    form.estado_cotizacion
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            >

                                <option value="pendiente">

                                    Pendiente

                                </option>

                                <option value="enviada">

                                    Enviada

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

                            :

                            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">

                                {
                                    cotizacion.estado_cotizacion
                                }

                            </span>

                        }


                    </div>



                    {/* DESCRIPCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <FileText size={20}/>

                            Descripción

                        </div>


                        {
                            editando

                            ?

                            <textarea

                                name="descripcion_cotizacion"

                                value={
                                    form.descripcion_cotizacion
                                }

                                onChange={
                                    handleChange
                                }

                                rows={5}

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-emerald-500"

                            />

                            :

                            <p className="whitespace-pre-wrap text-slate-700">

                                {
                                    cotizacion.descripcion_cotizacion
                                }

                            </p>

                        }


                    </div>



                    {/* INCLUYE */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-4 flex items-center gap-2 font-semibold text-slate-700">

                            <Package size={20}/>

                            Incluye

                        </div>


                        {
                            cotizacion.incluye_cotizacion &&
                            cotizacion.incluye_cotizacion.length > 0

                            ?

                            <div className="space-y-3">


                                {
                                    cotizacion.incluye_cotizacion.map(
                                        (
                                            item: any
                                        ) => (

                                            <div

                                                key={
                                                    item.id
                                                }

                                                className="rounded-lg bg-white p-4 shadow-sm"

                                            >

                                                {item.descripcion}

                                            </div>

                                        )
                                    )
                                }


                            </div>

                            :

                            <p className="text-slate-500">

                                Esta cotización no especifica elementos incluidos.

                            </p>

                        }


                    </div>



                    {/* FECHA */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20}/>

                            Fecha de envío

                        </div>


                        <p>

                            {
                                new Date(
                                    cotizacion.fecha_envio_cotizacion
                                ).toLocaleString(
                                    "es-AR"
                                )
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

                            onClick={() =>
                                setEditando(true)
                            }

                            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"

                        >

                            Editar cotización

                        </button>

                    }



                    <button

                        onClick={
                            eliminar
                        }

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"

                    >

                        Eliminar cotización

                    </button>



                    {
                        editando && (

                            <button

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

                <div className="mt-8 grid gap-4 md:grid-cols-2">


                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            ID de cotización

                        </div>


                        <p className="text-3xl font-bold text-emerald-600">

                            #{cotizacion.id_cotizacion}

                        </p>


                    </div>


                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            ID de proveedor

                        </div>


                        <p className="text-3xl font-bold text-slate-700">

                            #{cotizacion.id_proveedor}

                        </p>


                    </div>


                </div>


            </div>


        </div>

    );

};


export default VerCotizacion;