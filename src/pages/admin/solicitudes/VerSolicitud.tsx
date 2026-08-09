
import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarSolicitud,
    actualizarSolicitud,
    eliminarSolicitud
} from "../../../services/solicitud.service";

import {
    listarInstituciones,
    type Institucion
} from "../../../services/instituciones.service";

import {
    ArrowLeft,
    FileText,
    Building2,
    Package,
    Calendar,
    DollarSign,
    AlertCircle,
    ClipboardList
} from "lucide-react";


const VerSolicitud = () => {


    const navigate = useNavigate();


    const {
        id
    } = useParams();



    /*
     * Solicitud
     */

    const [
        solicitud,
        setSolicitud
    ] = useState<any>(null);



    /*
     * Instituciones
     */

    const [
        instituciones,
        setInstituciones
    ] = useState<Institucion[]>([]);


    const [
        loadingInstituciones,
        setLoadingInstituciones
    ] = useState(true);



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

        titulo_solicitud: "",

        equipamiento_solicitud: "",

        descripcion_solicitud: "",

        cantidad_solicitud: 1,

        urgencia_solicitud: "",

        estado_solicitud: "",

        id_institucion: "",

        nombre_institucion: "",

        especificaciones_solicitud: "",

        presupuesto_estimado_solicitud: 0

    });



    /*
     * Cargar solicitud
     */

    useEffect(() => {

        if (!id) return;


        const cargarSolicitud = async () => {

            try {

                const data =
                    await buscarSolicitud(
                        Number(id)
                    );


                setSolicitud(data);


                setForm({

                    titulo_solicitud:
                        data.titulo_solicitud || "",

                    equipamiento_solicitud:
                        data.equipamiento_solicitud || "",

                    descripcion_solicitud:
                        data.descripcion_solicitud || "",

                    cantidad_solicitud:
                        data.cantidad_solicitud || 1,

                    urgencia_solicitud:
                        data.urgencia_solicitud || "",

                    estado_solicitud:
                        data.estado_solicitud || "",

                    id_institucion:
                        String(
                            data.id_institucion || ""
                        ),

                    nombre_institucion:
                        data.nombre_institucion || "",

                    especificaciones_solicitud:
                        data.especificaciones_solicitud || "",

                    presupuesto_estimado_solicitud:
                        data.presupuesto_estimado_solicitud || 0

                });


            } catch (error: any) {

                console.error(
                    "Error cargando solicitud:",
                    error
                );


                setError(
                    error?.message ||
                    "No se pudo cargar la solicitud"
                );

            }

        };


        cargarSolicitud();


    }, [id]);



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

                id_institucion:
                    value,

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

            [name]:
                value

        });

    };



    /*
     * Eliminar solicitud
     */

    const eliminar = async () => {


        const confirmar =
            window.confirm(

                "¿Seguro que querés eliminar esta solicitud?"

            );


        if (!confirmar) return;


        try {


            await eliminarSolicitud(
                Number(id)
            );


            navigate(
                "/admin/solicitudes"
            );


        } catch (error: any) {


            console.error(
                "Error eliminando solicitud:",
                error
            );


            setError(
                error?.message ||
                "No se pudo eliminar la solicitud"
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
             * Validar institución
             */

            if (
                !form.id_institucion
            ) {

                setError(
                    "Debés seleccionar una institución"
                );

                setGuardando(false);

                return;

            }



            /*
             * Actualizar
             */

            const actualizado =
                await actualizarSolicitud(

                    Number(id),

                    {

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

                    }

                );



            /*
             * Actualizar solicitud mostrada
             */

            setSolicitud(
                actualizado
            );



            /*
             * Actualizar formulario
             */

            setForm({

                titulo_solicitud:
                    actualizado.titulo_solicitud || "",

                equipamiento_solicitud:
                    actualizado.equipamiento_solicitud || "",

                descripcion_solicitud:
                    actualizado.descripcion_solicitud || "",

                cantidad_solicitud:
                    actualizado.cantidad_solicitud || 1,

                urgencia_solicitud:
                    actualizado.urgencia_solicitud || "",

                estado_solicitud:
                    actualizado.estado_solicitud || "",

                id_institucion:
                    String(
                        actualizado.id_institucion || ""
                    ),

                nombre_institucion:
                    actualizado.nombre_institucion || "",

                especificaciones_solicitud:
                    actualizado.especificaciones_solicitud || "",

                presupuesto_estimado_solicitud:
                    actualizado.presupuesto_estimado_solicitud || 0

            });


            setEditando(false);


        } catch (error: any) {


            console.error(
                "Error actualizando solicitud:",
                error
            );


            setError(
                error?.message ||
                "No se pudo actualizar la solicitud"
            );


        } finally {


            setGuardando(false);

        }

    };



    /*
     * Cargando
     */

    if (!solicitud) {


        return (

            <div className="max-w-4xl mx-auto">


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



    return (

        <div className="max-w-5xl mx-auto">


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

                <div className="mb-8 flex items-center gap-4">


                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <FileText size={32}/>

                    </div>


                    <div className="flex-1">


                        <h1 className="text-3xl font-bold text-slate-900">


                            {
                                editando

                                ?

                                <input

                                    name="titulo_solicitud"

                                    value={
                                        form.titulo_solicitud
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none focus:border-cyan-500"

                                />

                                :

                                solicitud.titulo_solicitud

                            }


                        </h1>


                        <p className="text-slate-600">

                            Solicitud #{solicitud.id_solicitud}

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


                    {/* INSTITUCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Building2 size={20}/>

                            Institución

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500 disabled:bg-slate-100"

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

                            :

                            <p className="text-lg">

                                {
                                    solicitud.nombre_institucion
                                }

                            </p>

                        }


                    </div>



                    {/* EQUIPAMIENTO */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Package size={20}/>

                            Equipamiento

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="equipamiento_solicitud"

                                value={
                                    form.equipamiento_solicitud
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p>

                                {
                                    solicitud.equipamiento_solicitud
                                }

                            </p>

                        }


                    </div>



                    {/* CANTIDAD */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20}/>

                            Cantidad

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="text-lg font-semibold">

                                {
                                    solicitud.cantidad_solicitud
                                }

                            </p>

                        }


                    </div>



                    {/* PRESUPUESTO */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <DollarSign size={20}/>

                            Presupuesto estimado

                        </div>


                        {
                            editando

                            ?

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="text-lg font-semibold text-cyan-600">

                                $

                                {
                                    Number(
                                        solicitud.presupuesto_estimado_solicitud
                                    ).toLocaleString(
                                        "es-AR"
                                    )
                                }

                            </p>

                        }


                    </div>



                    {/* URGENCIA */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <AlertCircle size={20}/>

                            Urgencia

                        </div>


                        {
                            editando

                            ?

                            <select

                                name="urgencia_solicitud"

                                value={
                                    form.urgencia_solicitud
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

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

                            :

                            <p className="capitalize">

                                {
                                    solicitud.urgencia_solicitud
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

                            <select

                                name="estado_solicitud"

                                value={
                                    form.estado_solicitud
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            >

                                <option value="pendiente">

                                    Pendiente

                                </option>

                                <option value="publicada">

                                    Publicada

                                </option>

                                <option value="en proceso">

                                    En proceso

                                </option>

                                <option value="cotizada">

                                    Cotizada

                                </option>

                                <option value="completada">

                                    Completada

                                </option>

                                <option value="cancelada">

                                    Cancelada

                                </option>

                            </select>

                            :

                            <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold capitalize text-cyan-700">

                                {
                                    solicitud.estado_solicitud
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

                                name="descripcion_solicitud"

                                value={
                                    form.descripcion_solicitud
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
                                    solicitud.descripcion_solicitud
                                }

                            </p>

                        }


                    </div>



                    {/* ESPECIFICACIONES */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20}/>

                            Especificaciones

                        </div>


                        {
                            editando

                            ?

                            <textarea

                                name="especificaciones_solicitud"

                                value={
                                    form.especificaciones_solicitud
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
                                    solicitud.especificaciones_solicitud
                                }

                            </p>

                        }


                    </div>



                    {/* FECHA */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20}/>

                            Fecha de creación

                        </div>


                        <p>

                            {
                                new Date(
                                    solicitud.fecha_creacion_solicitud
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
                                guardando ||
                                loadingInstituciones
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

                            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                        >

                            Editar solicitud

                        </button>

                    }



                    <button

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

                        #{solicitud.id_solicitud}

                    </p>


                </div>


            </div>


        </div>

    );

};


export default VerSolicitud;
