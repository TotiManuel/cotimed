import {
    useState
} from "react";

import {
    crearSolicitud,
    type CrearSolicitudData
} from "../../services/solicitud.service";


const NuevaSolicitud = () => {

    /*
     * ==========================================
     * FORMULARIO
     * ==========================================
     */

    const [formulario, setFormulario] = useState({

        numero: "",

        titulo: "",

        descripcion: "",

        categoria: "",

        cantidad: 1,

        urgencia: "NORMAL",

        presupuesto_estimado: 0,

        moneda: "USD",

        condiciones: "",

        observaciones: "",

        lugar_entrega: "",

        requiere_instalacion: false,

        requiere_capacitacion: false,

        fecha_limite_cotizacion: "",

    });


    const [cargando, setCargando] =
        useState(false);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");


    /*
     * ==========================================
     * ACTUALIZAR CAMPO
     * ==========================================
     */

    const actualizarCampo = (
        campo: string,
        valor: string | number | boolean
    ) => {

        setFormulario((prev) => ({

            ...prev,

            [campo]: valor

        }));

    };


    /*
     * ==========================================
     * PUBLICAR SOLICITUD
     * ==========================================
     */

    const manejarSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setMensaje("");

        setError("");


        try {

            setCargando(true);


            /*
             * ==================================
             * USUARIO ACTUAL
             * ==================================
             */

            const usuarioGuardado =
                localStorage.getItem("user");


            if (!usuarioGuardado) {

                throw new Error(
                    "No se encontró la información del usuario."
                );

            }


            const usuario =
                JSON.parse(usuarioGuardado);


            /*
             * ==================================
             * INSTITUCIÓN
             * ==================================
             */

            const institucionId =
                Number(
                    usuario.institucion_id ??
                    usuario.id_institucion ??
                    usuario.id
                );


            if (!institucionId) {

                throw new Error(
                    "No se pudo identificar la institución."
                );

            }


            /*
             * ==================================
             * USUARIO CREADOR
             * ==================================
             */

            const creadoPorId =
                Number(
                    usuario.id_usuario ??
                    usuario.usuario_id ??
                    usuario.id
                );


            if (!creadoPorId) {

                throw new Error(
                    "No se pudo identificar el usuario que crea la solicitud."
                );

            }


            /*
             * ==================================
             * FECHAS
             * ==================================
             */

            const ahora =
                new Date();


            const fechaCreacion =
                ahora.toISOString();


            const fechaActualizacion =
                ahora.toISOString();


            /*
             * ==================================
             * NÚMERO DE SOLICITUD
             * ==================================
             *
             * Si el backend genera el número,
             * puede utilizarse un valor temporal.
             */

            const numero =
                formulario.numero.trim() ||
                `SOL-${Date.now()}`;


            /*
             * ==================================
             * FECHA LÍMITE
             * ==================================
             */

            const fechaLimite =
                formulario.fecha_limite_cotizacion
                    ? new Date(
                        formulario.fecha_limite_cotizacion
                    ).toISOString()
                    : null;


            /*
             * ==================================
             * DATOS
             * ==================================
             */

            const data: CrearSolicitudData = {

                numero,

                titulo:
                    formulario.titulo.trim(),

                descripcion:
                    formulario.descripcion.trim(),

                institucion_id:
                    institucionId,

                creado_por_id:
                    creadoPorId,

                estado:
                    "PENDIENTE",

                urgencia:
                    formulario.urgencia,

                fecha_publicacion:
                    fechaCreacion,

                fecha_limite_cotizacion:
                    fechaLimite,

                fecha_cierre:
                    null,

                presupuesto_estimado:
                    Number(
                        formulario.presupuesto_estimado
                    ) || 0,

                moneda:
                    formulario.moneda,

                condiciones:
                    formulario.condiciones.trim(),

                observaciones:
                    formulario.observaciones.trim(),

                lugar_entrega:
                    formulario.lugar_entrega.trim(),

                requiere_instalacion:
                    formulario.requiere_instalacion,

                requiere_capacitacion:
                    formulario.requiere_capacitacion,

                /*
                 * Items de la solicitud.
                 *
                 * Se guarda la información del
                 * equipamiento solicitado dentro
                 * del array esperado por el backend.
                 */

                items: [

                    {
                        nombre:
                            formulario.titulo.trim(),

                        categoria:
                            formulario.categoria,

                        cantidad:
                            Number(
                                formulario.cantidad
                            ) || 1
                    }

                ],

                mensajes: [],

                archivos: [],

                adjudicacion:
                    null,

                fecha_creacion:
                    fechaCreacion,

                fecha_actualizacion:
                    fechaActualizacion,

                eliminado:
                    false

            };


            /*
             * ==================================
             * CREAR
             * ==================================
             */

            await crearSolicitud(data);


            setMensaje(
                "La solicitud fue publicada correctamente."
            );


            /*
             * ==================================
             * LIMPIAR
             * ==================================
             */

            setFormulario({

                numero: "",

                titulo: "",

                descripcion: "",

                categoria: "",

                cantidad: 1,

                urgencia: "NORMAL",

                presupuesto_estimado: 0,

                moneda: "USD",

                condiciones: "",

                observaciones: "",

                lugar_entrega: "",

                requiere_instalacion: false,

                requiere_capacitacion: false,

                fecha_limite_cotizacion: "",

            });


        } catch (err) {

            console.error(
                "Error creando solicitud:",
                err
            );


            setError(

                err instanceof Error
                    ? err.message
                    : "No se pudo crear la solicitud."

            );


        } finally {

            setCargando(false);

        }

    };


    /*
     * ==========================================
     * RENDER
     * ==========================================
     */

    return (

        <>

            {/* ==================================
                ENCABEZADO
            ================================== */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Nueva solicitud

                </h1>

                <p className="mt-2 text-slate-600">

                    Publicá una solicitud para recibir
                    cotizaciones de proveedores.

                </p>

            </div>


            {/* ==================================
                MENSAJES
            ================================== */}

            {mensaje && (

                <div className="mb-6 rounded-xl bg-emerald-50 p-4 font-medium text-emerald-700">

                    {mensaje}

                </div>

            )}


            {error && (

                <div className="mb-6 rounded-xl bg-red-50 p-4 font-medium text-red-700">

                    {error}

                </div>

            )}


            {/* ==================================
                FORMULARIO
            ================================== */}

            <form
                onSubmit={manejarSubmit}
                className="space-y-8"
            >


                {/* ==================================
                    INFORMACIÓN GENERAL
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Información general

                    </h2>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* TÍTULO */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block font-medium">

                                Título de la solicitud

                            </label>

                            <input
                                type="text"
                                value={
                                    formulario.titulo
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "titulo",
                                        e.target.value
                                    )
                                }
                                required
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                                placeholder="Ej: Compra de tomógrafo"
                            />

                        </div>


                        {/* CATEGORÍA */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Categoría

                            </label>

                            <select
                                value={
                                    formulario.categoria
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "categoria",
                                        e.target.value
                                    )
                                }
                                required
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            >

                                <option value="">

                                    Seleccionar

                                </option>

                                <option value="Diagnóstico por imágenes">

                                    Diagnóstico por imágenes

                                </option>

                                <option value="Monitoreo">

                                    Monitoreo

                                </option>

                                <option value="Laboratorio">

                                    Laboratorio

                                </option>

                                <option value="Terapia Intensiva">

                                    Terapia Intensiva

                                </option>

                                <option value="Quirófano">

                                    Quirófano

                                </option>

                                <option value="Mobiliario Médico">

                                    Mobiliario Médico

                                </option>

                            </select>

                        </div>


                        {/* CANTIDAD */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Cantidad

                            </label>

                            <input
                                type="number"
                                min="1"
                                value={
                                    formulario.cantidad
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "cantidad",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                required
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            />

                        </div>


                        {/* URGENCIA */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Urgencia

                            </label>

                            <select
                                value={
                                    formulario.urgencia
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "urgencia",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            >

                                <option value="BAJA">

                                    Baja

                                </option>

                                <option value="NORMAL">

                                    Normal

                                </option>

                                <option value="ALTA">

                                    Alta

                                </option>

                                <option value="URGENTE">

                                    Urgente

                                </option>

                            </select>

                        </div>


                        {/* FECHA LÍMITE */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Fecha límite para cotizar

                            </label>

                            <input
                                type="date"
                                value={
                                    formulario.fecha_limite_cotizacion
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "fecha_limite_cotizacion",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            />

                        </div>

                    </div>

                </section>


                {/* ==================================
                    DESCRIPCIÓN
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Descripción

                    </h2>

                    <textarea
                        rows={7}
                        value={
                            formulario.descripcion
                        }
                        onChange={(e) =>
                            actualizarCampo(
                                "descripcion",
                                e.target.value
                            )
                        }
                        required
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Explicá qué necesita tu institución y para qué será utilizado..."
                    />

                </section>


                {/* ==================================
                    PRESUPUESTO
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Presupuesto

                    </h2>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* MONEDA */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Moneda

                            </label>

                            <select
                                value={
                                    formulario.moneda
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "moneda",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            >

                                <option value="USD">
                                    USD
                                </option>

                                <option value="ARS">
                                    ARS
                                </option>

                                <option value="EUR">
                                    EUR
                                </option>

                            </select>

                        </div>


                        {/* PRESUPUESTO */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Presupuesto estimado

                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    formulario.presupuesto_estimado
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "presupuesto_estimado",
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                                placeholder="50000"
                            />

                        </div>

                    </div>

                </section>


                {/* ==================================
                    CONDICIONES
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Condiciones de la solicitud

                    </h2>


                    <textarea
                        rows={5}
                        value={
                            formulario.condiciones
                        }
                        onChange={(e) =>
                            actualizarCampo(
                                "condiciones",
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Indicá condiciones comerciales, técnicas o administrativas..."
                    />

                </section>


                {/* ==================================
                    ENTREGA
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Entrega

                    </h2>


                    <div>

                        <label className="mb-2 block font-medium">

                            Lugar de entrega

                        </label>

                        <input
                            type="text"
                            value={
                                formulario.lugar_entrega
                            }
                            onChange={(e) =>
                                actualizarCampo(
                                    "lugar_entrega",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            placeholder="Ej: Villa María, Córdoba"
                        />

                    </div>

                </section>


                {/* ==================================
                    REQUERIMIENTOS
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Requerimientos adicionales

                    </h2>


                    <div className="space-y-5">


                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={
                                    formulario.requiere_instalacion
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "requiere_instalacion",
                                        e.target.checked
                                    )
                                }
                            />

                            Requiere instalación.

                        </label>


                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                checked={
                                    formulario.requiere_capacitacion
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "requiere_capacitacion",
                                        e.target.checked
                                    )
                                }
                            />

                            Requiere capacitación.

                        </label>

                    </div>

                </section>


                {/* ==================================
                    OBSERVACIONES
                ================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Observaciones

                    </h2>


                    <textarea
                        rows={5}
                        value={
                            formulario.observaciones
                        }
                        onChange={(e) =>
                            actualizarCampo(
                                "observaciones",
                                e.target.value
                            )
                        }
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Agregá cualquier información adicional..."
                    />

                </section>


                {/* ==================================
                    BOTONES
                ================================== */}

                <div className="flex justify-end">

                    <button
                        type="submit"
                        disabled={cargando}
                        className="rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                        {cargando
                            ? "Publicando..."
                            : "Publicar solicitud"
                        }

                    </button>

                </div>

            </form>

        </>

    );

};


export default NuevaSolicitud;