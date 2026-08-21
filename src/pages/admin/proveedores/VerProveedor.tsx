import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarProveedor,
    actualizarProveedor,
    eliminarProveedor
} from "../../../services/proveedores.service";

import {
    ArrowLeft,
    Truck,
    Mail,
    User,
    FileText,
    Building2,
    MapPin,
    Lock
} from "lucide-react";


const VerProveedor = () => {

    const navigate = useNavigate();

    const { id } = useParams();


    const [
        proveedor,
        setProveedor
    ] = useState<any>(null);


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
    ] = useState({

        name_user: "",

        razon_social: "",

        direccion: "",

        email: "",

        password: "",

        organizacion: "",

        estado_user: "",

        ciudad_user: "",

        provincia_user: "",

        pais_user: ""

    });


    /*
     * ============================
     * CARGAR PROVEEDOR
     * ============================
     */

    useEffect(() => {

        if (!id) return;


        buscarProveedor(Number(id))

            .then((data) => {

                setProveedor(data);


                setForm({

                    name_user:
                        data.name_user || "",

                    razon_social:
                        data.razon_social || "",

                    direccion:
                        data.direccion || "",

                    email:
                        data.email || "",

                    password:
                        "",

                    organizacion:
                        data.organizacion || "",

                    estado_user:
                        data.estado_user || "",

                    ciudad_user:
                        data.ciudad_user || "",

                    provincia_user:
                        data.provincia_user || "",

                    pais_user:
                        data.pais_user || ""

                });

            })

            .catch((error) => {

                console.error(
                    "Error cargando proveedor:",
                    error
                );

                setError(
                    "No se pudo cargar el proveedor."
                );

            });

    }, [id]);


    /*
     * ============================
     * CAMBIAR INPUT
     * ============================
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


    /*
     * ============================
     * ELIMINAR
     * ============================
     */

    const eliminar = async () => {

        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar este proveedor?"
            );


        if (!confirmar) return;


        try {

            await eliminarProveedor(
                Number(id)
            );


            navigate(
                "/admin/proveedores"
            );


        } catch (error: any) {

            console.error(
                "Error eliminando proveedor:",
                error
            );


            setError(
                error?.message ||
                "No se pudo eliminar el proveedor."
            );

        }

    };


    /*
     * ============================
     * GUARDAR CAMBIOS
     * ============================
     */

    const guardarCambios = async () => {

        setError("");

        setGuardando(true);


        try {

            /*
             * No mandamos password si está vacío.
             *
             * Esto evita reemplazar la contraseña
             * actual accidentalmente.
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
                form.password.trim() !== ""
            ) {

                datosActualizar.password =
                    form.password;

            }


            const actualizado =
                await actualizarProveedor(

                    Number(id),

                    datosActualizar

                );


            /*
             * Actualizar información
             * mostrada en pantalla.
             */

            setProveedor(
                actualizado
            );


            /*
             * Limpiar contraseña
             */

            setForm({

                ...form,

                password: ""

            });


            setEditando(false);


        } catch (error: any) {

            console.error(
                "Error actualizando proveedor:",
                error
            );


            setError(
                error?.message ||
                "No se pudo actualizar el proveedor."
            );


        } finally {

            setGuardando(false);

        }

    };


    /*
     * ============================
     * CANCELAR EDICIÓN
     * ============================
     */

    const cancelarEdicion = () => {

        setForm({

            name_user:
                proveedor.name_user || "",

            razon_social:
                proveedor.razon_social || "",

            direccion:
                proveedor.direccion || "",

            email:
                proveedor.email || "",

            password:
                "",

            organizacion:
                proveedor.organizacion || "",

            estado_user:
                proveedor.estado_user || "",

            ciudad_user:
                proveedor.ciudad_user || "",

            provincia_user:
                proveedor.provincia_user || "",

            pais_user:
                proveedor.pais_user || ""

        });


        setError("");

        setEditando(false);

    };


    /*
     * ============================
     * CARGANDO
     * ============================
     */

    if (!proveedor) {

        return (

            <div className="p-8">

                {
                    error
                    ?
                    <p className="text-red-600">
                        {error}
                    </p>
                    :
                    "Cargando proveedor..."
                }

            </div>

        );

    }


    return (

        <div className="mx-auto max-w-5xl">


            {/* ============================
                VOLVER
            ============================ */}

            <button

                onClick={() =>
                    navigate(
                        "/admin/proveedores"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>


            {/* ============================
                CONTENEDOR
            ============================ */}

            <div className="rounded-2xl bg-white p-6 shadow md:p-8">


                {/* ============================
                    CABECERA
                ============================ */}

                <div className="mb-8 flex items-center gap-4">


                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <Truck size={32} />

                    </div>


                    <div className="min-w-0">


                        {
                            editando

                            ?

                            <input

                                name="organizacion"

                                value={
                                    form.organizacion
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none focus:border-cyan-500"

                            />

                            :

                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">

                                {
                                    proveedor.organizacion
                                }

                            </h1>

                        }


                        <p className="text-slate-600">

                            Detalle de proveedor

                        </p>

                    </div>

                </div>


                {/* ============================
                    ERROR
                ============================ */}

                {
                    error && (

                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">

                            {error}

                        </div>

                    )
                }


                {/* ============================
                    DATOS PRINCIPALES
                ============================ */}

                <div className="grid gap-6 md:grid-cols-2">


                    {/* RESPONSABLE */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <User size={20} />

                            Responsable

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="name_user"

                                value={
                                    form.name_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="text-slate-900">

                                {
                                    proveedor.name_user
                                }

                            </p>

                        }

                    </div>


                    {/* EMAIL */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <Mail size={20} />

                            Email

                        </div>


                        {
                            editando

                            ?

                            <input

                                type="email"

                                name="email"

                                value={
                                    form.email
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="break-all text-slate-900">

                                {
                                    proveedor.email
                                }

                            </p>

                        }

                    </div>


                    {/* RAZON SOCIAL */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <Building2 size={20} />

                            Razón social

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="razon_social"

                                value={
                                    form.razon_social
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="text-slate-900">

                                {
                                    proveedor.razon_social
                                }

                            </p>

                        }

                    </div>


                    {/* DIRECCION */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                            <MapPin size={20} />

                            Dirección

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="direccion"

                                value={
                                    form.direccion
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p className="text-slate-900">

                                {
                                    proveedor.direccion
                                }

                            </p>

                        }

                    </div>


                    {/* CIUDAD */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            Ciudad

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="ciudad_user"

                                value={
                                    form.ciudad_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p>

                                {
                                    proveedor.ciudad_user
                                }

                            </p>

                        }

                    </div>


                    {/* PROVINCIA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            Provincia

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="provincia_user"

                                value={
                                    form.provincia_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p>

                                {
                                    proveedor.provincia_user
                                }

                            </p>

                        }

                    </div>


                    {/* ESTADO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            Estado / Región

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="estado_user"

                                value={
                                    form.estado_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p>

                                {
                                    proveedor.estado_user
                                }

                            </p>

                        }

                    </div>


                    {/* PAIS */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            País

                        </div>


                        {
                            editando

                            ?

                            <input

                                name="pais_user"

                                value={
                                    form.pais_user
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />

                            :

                            <p>

                                {
                                    proveedor.pais_user
                                }

                            </p>

                        }

                    </div>


                    {/* ROL */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            Rol

                        </div>


                        <p className="capitalize">

                            {
                                proveedor.rol
                            }

                        </p>

                    </div>


                    {/* ID */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-3 font-semibold text-slate-700">

                            ID Usuario

                        </div>


                        <p>

                            {
                                proveedor.id
                            }

                        </p>

                    </div>


                </div>


                {/* ============================
                    CONTRASEÑA
                ============================ */}

                {
                    editando && (

                        <div className="mt-6 rounded-xl bg-slate-50 p-5">

                            <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">

                                <Lock size={20} />

                                Cambiar contraseña

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

                                className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                            />


                            <p className="mt-2 text-sm text-slate-500">

                                Si no querés cambiar la contraseña,
                                dejá este campo vacío.

                            </p>

                        </div>

                    )
                }


                {/* ============================
                    BOTONES
                ============================ */}

                <div className="mt-8 flex flex-wrap gap-4">


                    {
                        editando

                        ?

                        <>

                            <button

                                onClick={
                                    guardarCambios
                                }

                                disabled={guardando}

                                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"

                            >

                                {
                                    guardando
                                    ?
                                    "Guardando..."
                                    :
                                    "Guardar cambios"
                                }

                            </button>


                            <button

                                onClick={
                                    cancelarEdicion
                                }

                                disabled={guardando}

                                className="rounded-xl border px-6 py-3"

                            >

                                Cancelar

                            </button>

                        </>

                        :

                        <button

                            onClick={() =>
                                setEditando(true)
                            }

                            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                        >

                            Editar proveedor

                        </button>

                    }


                    <button

                        onClick={eliminar}

                        disabled={guardando}

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"

                    >

                        Eliminar proveedor

                    </button>


                </div>


                {/* ============================
                    COTIZACIONES
                ============================ */}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">


                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                        <FileText size={20} />

                        Cotizaciones realizadas

                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        {
                            proveedor.cotizaciones?.length || 0
                        }

                    </p>

                </div>


            </div>

        </div>

    );

};


export default VerProveedor;