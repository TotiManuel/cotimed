import { useState } from "react";

import {
    crearSolicitud,
    type CrearSolicitudData
} from "../../services/solicitud.service";


const NuevaSolicitud = () => {

    const [formulario, setFormulario] = useState({

        titulo_solicitud: "",

        equipamiento_solicitud: "",

        descripcion_solicitud: "",

        cantidad_solicitud: 1,

        urgencia_solicitud: "normal",

        especificaciones_solicitud: "",

        presupuesto_estimado_solicitud: 0,

        categoria: "",

        moneda: "USD"

    });


    const [cargando, setCargando] = useState(false);

    const [mensaje, setMensaje] = useState("");

    const [error, setError] = useState("");


    /*
     * ==========================================
     * ACTUALIZAR CAMPOS
     * ==========================================
     */

    const actualizarCampo = (
        campo: string,
        valor: string | number
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
             * Obtener usuario/institución
             */

            const usuarioGuardado =
                localStorage.getItem("user");


            if (!usuarioGuardado) {

                throw new Error(
                    "No se encontró la información de la institución."
                );

            }


            const usuario =
                JSON.parse(usuarioGuardado);


            const idInstitucion =
                Number(
                    usuario.id_institucion ??
                    usuario.id
                );


            if (!idInstitucion) {

                throw new Error(
                    "No se pudo identificar la institución."
                );

            }


            /*
             * Nombre de la institución
             */

            const nombreInstitucion =
                usuario.organizacion ??
                usuario.nombre_institucion ??
                "";


            /*
             * Datos enviados al backend
             *
             * Estos nombres corresponden
             * exactamente a CrearSolicitudData.
             */

            const data: CrearSolicitudData = {

                titulo_solicitud:
                    formulario.titulo_solicitud ||
                    formulario.equipamiento_solicitud,

                equipamiento_solicitud:
                    formulario.equipamiento_solicitud,

                descripcion_solicitud:
                    formulario.descripcion_solicitud,

                cantidad_solicitud:
                    Number(
                        formulario.cantidad_solicitud
                    ),

                urgencia_solicitud:
                    formulario.urgencia_solicitud,

                id_institucion:
                    idInstitucion,

                nombre_institucion:
                    nombreInstitucion,

                especificaciones_solicitud:
                    formulario.especificaciones_solicitud,

                presupuesto_estimado_solicitud:
                    Number(
                        formulario.presupuesto_estimado_solicitud
                    )

            };


            /*
             * Crear solicitud mediante el service.
             */

            await crearSolicitud(data);


            setMensaje(
                "La solicitud fue publicada correctamente."
            );


            /*
             * Limpiar formulario.
             */

            setFormulario({

                titulo_solicitud: "",

                equipamiento_solicitud: "",

                descripcion_solicitud: "",

                cantidad_solicitud: 1,

                urgencia_solicitud: "normal",

                especificaciones_solicitud: "",

                presupuesto_estimado_solicitud: 0,

                categoria: "",

                moneda: "USD"

            });


        } catch (error) {

            console.error(
                "Error creando solicitud:",
                error
            );


            setError(
                error instanceof Error
                    ? error.message
                    : "No se pudo crear la solicitud."
            );


        } finally {

            setCargando(false);

        }

    };


    return (

        <>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Nueva solicitud

                </h1>

                <p className="mt-2 text-slate-600">

                    Publicá una solicitud para recibir cotizaciones de proveedores de todo el país.

                </p>

            </div>


            {/* MENSAJES */}

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


            <form
                onSubmit={manejarSubmit}
                className="space-y-8"
            >


                {/* ==========================================
                    INFORMACIÓN GENERAL
                ========================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Información general

                    </h2>


                    <div className="grid gap-6 md:grid-cols-2">


                        {/* EQUIPAMIENTO */}

                        <div>

                            <label className="mb-2 block font-medium">

                                Nombre del equipamiento

                            </label>

                            <input
                                value={
                                    formulario.equipamiento_solicitud
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "equipamiento_solicitud",
                                        e.target.value
                                    )
                                }
                                required
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                                placeholder="Ej: Tomógrafo Computado"
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


                        {/* TÍTULO */}

                        <div className="md:col-span-2">

                            <label className="mb-2 block font-medium">

                                Título de la solicitud

                            </label>

                            <input
                                value={
                                    formulario.titulo_solicitud
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "titulo_solicitud",
                                        e.target.value
                                    )
                                }
                                required
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                                placeholder="Ej: Compra de tomógrafo para diagnóstico"
                            />

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
                                    formulario.cantidad_solicitud
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "cantidad_solicitud",
                                        Number(e.target.value)
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
                                    formulario.urgencia_solicitud
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "urgencia_solicitud",
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            >

                                <option value="baja">

                                    Baja

                                </option>

                                <option value="normal">

                                    Normal

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

                </section>


                {/* ==========================================
                    ESPECIFICACIONES
                ========================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Especificaciones

                    </h2>


                    <textarea
                        rows={8}
                        value={
                            formulario.especificaciones_solicitud
                        }
                        onChange={(e) =>
                            actualizarCampo(
                                "especificaciones_solicitud",
                                e.target.value
                            )
                        }
                        required
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Describí todas las características técnicas requeridas..."
                    />

                </section>


                {/* ==========================================
                    DESCRIPCIÓN
                ========================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Descripción

                    </h2>


                    <textarea
                        rows={6}
                        value={
                            formulario.descripcion_solicitud
                        }
                        onChange={(e) =>
                            actualizarCampo(
                                "descripcion_solicitud",
                                e.target.value
                            )
                        }
                        required
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Explicá qué necesita tu institución y para qué será utilizado..."
                    />

                </section>


                {/* ==========================================
                    PRESUPUESTO
                ========================================== */}

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
                                className="w-full rounded-xl border px-4 py-3"
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
                                value={
                                    formulario.presupuesto_estimado_solicitud
                                }
                                onChange={(e) =>
                                    actualizarCampo(
                                        "presupuesto_estimado_solicitud",
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full rounded-xl border px-4 py-3"
                                placeholder="50000"
                            />

                        </div>

                    </div>

                </section>


                {/* ==========================================
                    ARCHIVOS
                ========================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Archivos adjuntos

                    </h2>


                    <div className="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">

                        <p className="text-lg font-semibold">

                            Arrastrá archivos aquí

                        </p>

                        <p className="mt-2 text-slate-500">

                            PDF, Word, Excel, imágenes o fichas técnicas.

                        </p>

                        <button
                            type="button"
                            className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
                        >

                            Seleccionar archivos

                        </button>

                    </div>

                </section>


                {/* ==========================================
                    OPCIONES
                ========================================== */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Opciones de publicación

                    </h2>


                    <div className="space-y-5">

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                            />

                            Mostrar el nombre de la institución.

                        </label>


                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            Permitir preguntas de proveedores.

                        </label>


                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            Notificar nuevas cotizaciones por email.

                        </label>

                    </div>

                </section>


                {/* ==========================================
                    BOTONES
                ========================================== */}

                <div className="flex flex-col justify-end gap-4 sm:flex-row">

                    <button
                        type="button"
                        disabled={cargando}
                        className="rounded-xl border px-8 py-4 font-semibold transition hover:bg-slate-100 disabled:opacity-50"
                    >

                        Guardar borrador

                    </button>


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