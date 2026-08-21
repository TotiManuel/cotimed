import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerInstitucionPorId,
    actualizarInstitucion,
    eliminarInstitucion
} from "../../../services/instituciones.service";

import {
    ArrowLeft,
    Building2,
    Mail,
    User,
    FileText,
    MapPin,
    Globe,
    Save,
    Pencil,
    Trash2,
    X
} from "lucide-react";

interface Institucion {

    id: number;

    name_user: string;

    razon_social: string;

    direccion: string;

    email: string;

    rol?: string;

    organizacion: string;

    estado_user: string;

    ciudad_user: string;

    provincia_user: string;

    pais_user: string;

    solicitudes?: any[];

    cotizaciones?: any[];
}


interface FormInstitucion {

    name_user: string;

    razon_social: string;

    direccion: string;

    email: string;

    organizacion: string;

    estado_user: string;

    ciudad_user: string;

    provincia_user: string;

    pais_user: string;

    password?: string;
}


const VerInstitucion = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    const [
        institucion,
        setInstitucion
    ] = useState<Institucion | null>(null);


    const [
        editando,
        setEditando
    ] = useState(false);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        guardando,
        setGuardando
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        form,
        setForm
    ] = useState<FormInstitucion>({

        name_user: "",

        razon_social: "",

        direccion: "",

        email: "",

        organizacion: "",

        estado_user: "",

        ciudad_user: "",

        provincia_user: "",

        pais_user: "",

        password: ""

    });


    /**
     * CARGAR INSTITUCIÓN
     */
    useEffect(() => {

        if (!id) {

            setError(
                "ID de institución inválido"
            );

            setLoading(false);

            return;
        }


        const cargarInstitucion =
            async () => {

                try {

                    setLoading(true);

                    setError("");


                    const data =
                        await obtenerInstitucionPorId(
                            Number(id)
                        );


                    setInstitucion(data);


                    setForm({

                        name_user:
                            data.name_user || "",

                        razon_social:
                            data.razon_social || "",

                        direccion:
                            data.direccion || "",

                        email:
                            data.email || "",

                        organizacion:
                            data.organizacion || "",

                        estado_user:
                            data.estado_user || "",

                        ciudad_user:
                            data.ciudad_user || "",

                        provincia_user:
                            data.provincia_user || "",

                        pais_user:
                            data.pais_user || "",

                        password: ""

                    });


                } catch (error: unknown) {

                    console.error(
                        "Error cargando institución:",
                        error
                    );


                    if (error instanceof Error) {

                        setError(
                            error.message
                        );

                    } else {

                        setError(
                            "Error cargando institución"
                        );

                    }

                } finally {

                    setLoading(false);

                }

            };


        cargarInstitucion();

    }, [id]);


    /**
     * CAMBIAR INPUT
     */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };


    /**
     * CANCELAR EDICIÓN
     */
    const cancelarEdicion = () => {

        if (!institucion) return;


        setForm({

            name_user:
                institucion.name_user || "",

            razon_social:
                institucion.razon_social || "",

            direccion:
                institucion.direccion || "",

            email:
                institucion.email || "",

            organizacion:
                institucion.organizacion || "",

            estado_user:
                institucion.estado_user || "",

            ciudad_user:
                institucion.ciudad_user || "",

            provincia_user:
                institucion.provincia_user || "",

            pais_user:
                institucion.pais_user || "",

            password: ""

        });


        setError("");

        setEditando(false);

    };


    /**
     * GUARDAR CAMBIOS
     */
    const guardarCambios = async () => {

        if (!id) return;


        try {

            setGuardando(true);

            setError("");


            /**
             * No enviar password vacío.
             */
            const datosActualizar: any = {

                name_user:
                    form.name_user,

                razon_social:
                    form.razon_social,

                direccion:
                    form.direccion,

                email:
                    form.email,

                organizacion:
                    form.organizacion,

                estado_user:
                    form.estado_user,

                ciudad_user:
                    form.ciudad_user,

                provincia_user:
                    form.provincia_user,

                pais_user:
                    form.pais_user

            };


            if (
                form.password &&
                form.password.trim() !== ""
            ) {

                datosActualizar.password =
                    form.password;

            }


            const actualizado =
                await actualizarInstitucion(

                    Number(id),

                    datosActualizar

                );


            setInstitucion(
                actualizado
            );


            setForm({

                name_user:
                    actualizado.name_user || "",

                razon_social:
                    actualizado.razon_social || "",

                direccion:
                    actualizado.direccion || "",

                email:
                    actualizado.email || "",

                organizacion:
                    actualizado.organizacion || "",

                estado_user:
                    actualizado.estado_user || "",

                ciudad_user:
                    actualizado.ciudad_user || "",

                provincia_user:
                    actualizado.provincia_user || "",

                pais_user:
                    actualizado.pais_user || "",

                password: ""

            });


            setEditando(false);


        } catch (error: unknown) {

            console.error(
                "Error actualizando institución:",
                error
            );


            if (error instanceof Error) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "Error actualizando institución"
                );

            }

        } finally {

            setGuardando(false);

        }

    };


    /**
     * ELIMINAR INSTITUCIÓN
     */
    const eliminar = async () => {

        if (!id) return;


        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar esta institución? Esta acción no se puede deshacer."
            );


        if (!confirmar) return;


        try {

            setError("");


            await eliminarInstitucion(
                Number(id)
            );


            navigate(
                "/admin/instituciones"
            );


        } catch (error: unknown) {

            console.error(
                "Error eliminando institución:",
                error
            );


            if (error instanceof Error) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "Error eliminando institución"
                );

            }

        }

    };


    /**
     * LOADING
     */
    if (loading) {

        return (

            <div className="p-8 text-slate-600">

                Cargando institución...

            </div>

        );

    }


    /**
     * ERROR / NO ENCONTRADA
     */
    if (!institucion) {

        return (

            <div className="mx-auto max-w-4xl p-8">


                <button

                    onClick={() =>
                        navigate(
                            "/admin/instituciones"
                        )
                    }

                    className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

                >

                    <ArrowLeft size={20} />

                    Volver

                </button>


                <div className="rounded-xl bg-red-50 p-6 text-red-600">

                    {error ||
                        "Institución no encontrada"}

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
                        "/admin/instituciones"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>



            {/* CONTENEDOR */}

            <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">


                {/* CABECERA */}

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                    <div className="flex items-center gap-4">


                        <div className="rounded-xl bg-cyan-600 p-4 text-white">

                            <Building2 size={32} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">

                                {editando ? (

                                    <input

                                        name="organizacion"

                                        value={
                                            form.organizacion
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="rounded-lg border px-3 py-2 text-xl outline-none focus:border-cyan-500 sm:text-2xl"

                                    />

                                ) : (

                                    institucion.organizacion

                                )}

                            </h1>


                            <p className="text-slate-600">

                                Detalle de institución

                            </p>

                        </div>

                    </div>


                    {/* ESTADO */}

                    <div>

                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

                            {institucion.estado_user}

                        </span>

                    </div>

                </div>



                {/* ERROR */}

                {error && (

                    <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">

                        {error}

                    </div>

                )}



                {/* INFORMACIÓN */}

                <div className="grid gap-6 md:grid-cols-2">


                    {/* RESPONSABLE */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <User size={20} />

                            Responsable

                        </div>


                        {editando ? (

                            <input

                                name="name_user"

                                value={
                                    form.name_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p className="text-slate-900">

                                {institucion.name_user}

                            </p>

                        )}

                    </div>



                    {/* EMAIL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <Mail size={20} />

                            Email

                        </div>


                        {editando ? (

                            <input

                                type="email"

                                name="email"

                                value={
                                    form.email
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p className="break-all text-slate-900">

                                {institucion.email}

                            </p>

                        )}

                    </div>



                    {/* RAZÓN SOCIAL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <Building2 size={20} />

                            Razón social

                        </div>


                        {editando ? (

                            <input

                                name="razon_social"

                                value={
                                    form.razon_social
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.razon_social}

                            </p>

                        )}

                    </div>



                    {/* DIRECCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <MapPin size={20} />

                            Dirección

                        </div>


                        {editando ? (

                            <input

                                name="direccion"

                                value={
                                    form.direccion
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.direccion}

                            </p>

                        )}

                    </div>



                    {/* CIUDAD */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            Ciudad

                        </div>


                        {editando ? (

                            <input

                                name="ciudad_user"

                                value={
                                    form.ciudad_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.ciudad_user}

                            </p>

                        )}

                    </div>



                    {/* PROVINCIA */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            Provincia

                        </div>


                        {editando ? (

                            <input

                                name="provincia_user"

                                value={
                                    form.provincia_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.provincia_user}

                            </p>

                        )}

                    </div>



                    {/* PAÍS */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <Globe size={20} />

                            País

                        </div>


                        {editando ? (

                            <input

                                name="pais_user"

                                value={
                                    form.pais_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.pais_user}

                            </p>

                        )}

                    </div>



                    {/* ESTADO */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            Estado

                        </div>


                        {editando ? (

                            <input

                                name="estado_user"

                                value={
                                    form.estado_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                            />

                        ) : (

                            <p>

                                {institucion.estado_user}

                            </p>

                        )}

                    </div>



                    {/* ROL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            Rol

                        </div>


                        <p className="capitalize">

                            {institucion.rol}

                        </p>

                    </div>



                    {/* ID */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            ID Usuario

                        </div>


                        <p>

                            {institucion.id}

                        </p>

                    </div>

                </div>



                {/* CAMBIAR CONTRASEÑA */}

                {editando && (

                    <div className="mt-6 rounded-xl bg-slate-50 p-5">


                        <div className="mb-3 font-semibold text-slate-700">

                            Nueva contraseña

                        </div>


                        <input

                            type="password"

                            name="password"

                            value={
                                form.password
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Dejar vacío para mantener la actual"

                            className="w-full rounded-lg border bg-white px-3 py-2 outline-none focus:border-cyan-500"

                        />


                        <p className="mt-2 text-xs text-slate-500">

                            Si lo dejás vacío, la contraseña actual no se modifica.

                        </p>

                    </div>

                )}



                {/* BOTONES */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">


                    {editando ? (

                        <>


                            <button

                                onClick={
                                    guardarCambios
                                }

                                disabled={guardando}

                                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"

                            >

                                <Save size={20} />

                                {guardando

                                    ? "Guardando..."

                                    : "Guardar cambios"

                                }

                            </button>


                            <button

                                onClick={
                                    cancelarEdicion
                                }

                                disabled={guardando}

                                className="flex items-center justify-center gap-2 rounded-xl border px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"

                            >

                                <X size={20} />

                                Cancelar

                            </button>


                        </>

                    ) : (

                        <button

                            onClick={() =>
                                setEditando(true)
                            }

                            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"

                        >

                            <Pencil size={20} />

                            Editar institución

                        </button>

                    )}


                    <button

                        onClick={eliminar}

                        disabled={guardando}

                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"

                    >

                        <Trash2 size={20} />

                        Eliminar institución

                    </button>

                </div>



                {/* SOLICITUDES */}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">


                    <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                        <FileText size={20} />

                        Solicitudes creadas

                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        {
                            institucion
                                .solicitudes
                                ?.length || 0
                        }

                    </p>

                </div>



                {/* COTIZACIONES */}

                <div className="mt-6 rounded-xl bg-slate-50 p-5">


                    <div className="mb-3 font-semibold text-slate-700">

                        Cotizaciones

                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        {
                            institucion
                                .cotizaciones
                                ?.length || 0
                        }

                    </p>

                </div>


            </div>

        </div>

    );

};


export default VerInstitucion;