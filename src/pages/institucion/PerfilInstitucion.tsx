import {
    Building2,
    Mail,
    Save
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    obtenerInstitucionPorId,
    actualizarInstitucion,
    type Institucion,
    type ActualizarInstitucionData
} from "../../services/instituciones.service";


const PerfilInstitucion = () => {

    const [
        institucion,
        setInstitucion
    ] = useState<Institucion | null>(null);


    const [
        nameUser,
        setNameUser
    ] = useState("");


    const [
        email,
        setEmail
    ] = useState("");


    const [
        organizacion,
        setOrganizacion
    ] = useState("");


    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        guardando,
        setGuardando
    ] = useState(false);


    const [
        mensaje,
        setMensaje
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    /*
     * ==========================================
     * OBTENER ID DE LA INSTITUCIÓN
     * ==========================================
     */

    const obtenerIdInstitucion = (): number | null => {

        try {

            const usuarioGuardado =
                localStorage.getItem("user");


            if (!usuarioGuardado) {

                return null;

            }


            const usuario =
                JSON.parse(usuarioGuardado);


            if (usuario?.id) {

                return Number(
                    usuario.id
                );

            }


            return null;


        } catch {

            return null;

        }

    };


    /*
     * ==========================================
     * CARGAR INSTITUCIÓN
     * ==========================================
     */

    useEffect(() => {

        const cargarInstitucion = async () => {

            try {

                setCargando(true);

                setError("");


                const id =
                    obtenerIdInstitucion();


                if (!id) {

                    setError(
                        "No se pudo identificar la institución."
                    );

                    return;

                }


                const datos =
                    await obtenerInstitucionPorId(
                        id
                    );


                setInstitucion(
                    datos
                );


                setNameUser(
                    datos.name_user ?? ""
                );


                setEmail(
                    datos.email ?? ""
                );


                setOrganizacion(
                    datos.organizacion ?? ""
                );


            } catch (error) {

                console.error(
                    "Error al cargar institución:",
                    error
                );


                setError(
                    "No se pudieron cargar los datos de la institución."
                );


            } finally {

                setCargando(false);

            }

        };


        cargarInstitucion();

    }, []);


    /*
     * ==========================================
     * GUARDAR CAMBIOS
     * ==========================================
     */

    const guardarCambios = async () => {

        if (!institucion) {

            return;

        }


        try {

            setGuardando(true);

            setMensaje("");

            setError("");


            const datos: ActualizarInstitucionData = {

                name_user:
                    nameUser.trim(),

                email:
                    email.trim(),

                organizacion:
                    organizacion.trim()

            };


            const actualizada =
                await actualizarInstitucion(

                    institucion.id,

                    datos

                );


            setInstitucion(
                actualizada
            );


            setNameUser(
                actualizada.name_user ?? ""
            );


            setEmail(
                actualizada.email ?? ""
            );


            setOrganizacion(
                actualizada.organizacion ?? ""
            );


            /*
             * Actualizar usuario almacenado
             * en localStorage.
             */

            try {

                const usuarioGuardado =
                    localStorage.getItem("user");


                if (usuarioGuardado) {

                    const usuario =
                        JSON.parse(
                            usuarioGuardado
                        );


                    const usuarioActualizado = {

                        ...usuario,

                        id:
                            actualizada.id,

                        name_user:
                            actualizada.name_user,

                        email:
                            actualizada.email,

                        organizacion:
                            actualizada.organizacion

                    };


                    localStorage.setItem(

                        "user",

                        JSON.stringify(
                            usuarioActualizado
                        )

                    );

                }

            } catch (error) {

                console.error(
                    "No se pudo actualizar el usuario local:",
                    error
                );

            }


            setMensaje(
                "Los datos fueron actualizados correctamente."
            );


        } catch (error) {

            console.error(
                "Error al actualizar institución:",
                error
            );


            setError(
                "No se pudieron guardar los cambios."
            );


        } finally {

            setGuardando(false);

        }

    };


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
     */

    if (cargando) {

        return (

            <div className="flex min-h-64 items-center justify-center">

                <p className="text-slate-500">

                    Cargando información de la institución...

                </p>

            </div>

        );

    }


    /*
     * ==========================================
     * ERROR
     * ==========================================
     */

    if (error && !institucion) {

        return (

            <div className="rounded-2xl bg-white p-8 shadow">

                <p className="font-semibold text-red-600">

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

            {/* ENCABEZADO */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Perfil de institución

                </h1>


                <p className="mt-2 text-slate-600">

                    Administrá los datos de tu institución.

                </p>

            </div>


            <div className="grid gap-8 lg:grid-cols-3">


                {/* ==================================
                    TARJETA DE PERFIL
                ================================== */}

                <div className="rounded-2xl bg-white p-8 shadow">

                    <div className="flex flex-col items-center text-center">


                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">

                            <Building2 size={55} />

                        </div>


                        <h2 className="mt-5 text-xl font-bold">

                            {
                                organizacion ||
                                "Institución"
                            }

                        </h2>


                        <p className="mt-2 text-slate-500">

                            Institución médica

                        </p>


                        <div className="mt-6 rounded-xl bg-slate-50 px-5 py-3">

                            <p className="text-sm text-slate-500">

                                ID de institución

                            </p>


                            <p className="mt-1 font-semibold text-slate-900">

                                #{institucion?.id}

                            </p>

                        </div>


                    </div>

                </div>


                {/* ==================================
                    INFORMACIÓN GENERAL
                ================================== */}

                <div className="rounded-2xl bg-white p-8 shadow lg:col-span-2">


                    <h2 className="mb-8 text-2xl font-bold">

                        Información general

                    </h2>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* NOMBRE DE USUARIO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Nombre de usuario

                            </label>


                            <input

                                value={
                                    nameUser
                                }

                                onChange={(e) =>
                                    setNameUser(
                                        e.target.value
                                    )
                                }

                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                            />

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Email

                            </label>


                            <div className="relative">

                                <Mail

                                    size={18}

                                    className="absolute left-3 top-3.5 text-slate-400"

                                />


                                <input

                                    type="email"

                                    value={
                                        email
                                    }

                                    onChange={(e) =>
                                        setEmail(
                                            e.target.value
                                        )
                                    }

                                    className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-cyan-600"

                                />

                            </div>

                        </div>


                    </div>


                    {/* ORGANIZACIÓN */}

                    <div className="mt-6">

                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre de la institución

                        </label>


                        <input

                            value={
                                organizacion
                            }

                            onChange={(e) =>
                                setOrganizacion(
                                    e.target.value
                                )
                            }

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                        />

                    </div>


                    {/* RAZÓN SOCIAL */}

                    <div className="mt-6">

                        <label className="mb-2 block font-medium text-slate-700">

                            Razón social

                        </label>


                        <input

                            value={
                                institucion?.razon_social ?? ""
                            }

                            disabled

                            className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                        />

                    </div>


                    {/* DIRECCIÓN */}

                    <div className="mt-6">

                        <label className="mb-2 block font-medium text-slate-700">

                            Dirección

                        </label>


                        <input

                            value={
                                institucion?.direccion ?? ""
                            }

                            disabled

                            className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                        />

                    </div>


                    {/* UBICACIÓN */}

                    <div className="mt-6 grid gap-6 md:grid-cols-3">


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Ciudad

                            </label>


                            <input

                                value={
                                    institucion?.ciudad_user ?? ""
                                }

                                disabled

                                className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Provincia

                            </label>


                            <input

                                value={
                                    institucion?.provincia_user ?? ""
                                }

                                disabled

                                className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                País

                            </label>


                            <input

                                value={
                                    institucion?.pais_user ?? ""
                                }

                                disabled

                                className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                            />

                        </div>


                    </div>


                    {/* ESTADO */}

                    <div className="mt-6">

                        <label className="mb-2 block font-medium text-slate-700">

                            Estado

                        </label>


                        <input

                            value={
                                institucion?.estado_user ?? ""
                            }

                            disabled

                            className="w-full cursor-not-allowed rounded-xl border bg-slate-100 px-4 py-3 text-slate-500"

                        />

                    </div>


                    {/* MENSAJES */}

                    {
                        mensaje && (

                            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-700">

                                {mensaje}

                            </div>

                        )
                    }


                    {
                        error && (

                            <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">

                                {error}

                            </div>

                        )
                    }


                    {/* GUARDAR */}

                    <button

                        type="button"

                        onClick={
                            guardarCambios
                        }

                        disabled={
                            guardando
                        }

                        className="mt-8 flex items-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"

                    >

                        <Save size={20} />

                        {
                            guardando
                            ?
                            "Guardando..."
                            :
                            "Guardar cambios"
                        }

                    </button>


                </div>


            </div>

        </>

    );

};


export default PerfilInstitucion;