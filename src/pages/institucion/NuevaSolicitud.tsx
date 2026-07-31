import { useState } from "react";

const NuevaSolicitud = () => {

    const [categoria, setCategoria] = useState("");

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

            <form className="space-y-8">

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Información general

                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">

                                Nombre del equipamiento

                            </label>

                            <input
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                                placeholder="Ej: Tomógrafo Computado"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Categoría

                            </label>

                            <select
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"
                            >

                                <option value="">

                                    Seleccionar

                                </option>

                                <option>

                                    Diagnóstico por imágenes

                                </option>

                                <option>

                                    Monitoreo

                                </option>

                                <option>

                                    Laboratorio

                                </option>

                                <option>

                                    Terapia Intensiva

                                </option>

                                <option>

                                    Quirófano

                                </option>

                                <option>

                                    Mobiliario Médico

                                </option>

                            </select>

                        </div>

                    </div>

                </section>

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Especificaciones

                    </h2>

                    <textarea
                        rows={8}
                        className="w-full rounded-xl border p-4 outline-none focus:border-cyan-600"
                        placeholder="Describí todas las características técnicas requeridas..."
                    />

                </section>

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Presupuesto

                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">

                        <div>

                            <label className="mb-2 block font-medium">

                                Moneda

                            </label>

                            <select className="w-full rounded-xl border px-4 py-3">

                                <option>

                                    USD

                                </option>

                                <option>

                                    ARS

                                </option>

                                <option>

                                    EUR

                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Presupuesto estimado

                            </label>

                            <input
                                type="number"
                                className="w-full rounded-xl border px-4 py-3"
                                placeholder="50000"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Fecha límite

                            </label>

                            <input
                                type="date"
                                className="w-full rounded-xl border px-4 py-3"
                            />

                        </div>

                    </div>

                </section>

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

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        Opciones de publicación

                    </h2>

                    <div className="space-y-5">

                        <label className="flex items-center gap-3">

                            <input type="checkbox" />

                            Mostrar el nombre de la institución.

                        </label>

                        <label className="flex items-center gap-3">

                            <input type="checkbox" defaultChecked />

                            Permitir preguntas de proveedores.

                        </label>

                        <label className="flex items-center gap-3">

                            <input type="checkbox" defaultChecked />

                            Notificar nuevas cotizaciones por email.

                        </label>

                    </div>

                </section>

                <div className="flex justify-end gap-4">

                    <button
                        type="button"
                        className="rounded-xl border px-8 py-4 font-semibold"
                    >

                        Guardar borrador

                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white hover:bg-cyan-700"
                    >

                        Publicar solicitud

                    </button>

                </div>

            </form>

        </>

    );

};

export default NuevaSolicitud;