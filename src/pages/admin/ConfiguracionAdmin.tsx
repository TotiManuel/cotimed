const ConfiguracionAdmin = () => {

    return (

        <>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Configuración

                </h1>

                <p className="mt-2 text-slate-600">

                    Administrá la configuración general de la plataforma CotiMed.

                </p>

            </div>

            <div className="space-y-8">

                {/* Plataforma */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="text-2xl font-bold text-slate-900">

                        Información de la plataforma

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Datos generales visibles para los usuarios.

                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium">

                                Nombre

                            </label>

                            <input
                                defaultValue="CotiMed"
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-500"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-medium">

                                Email de contacto

                            </label>

                            <input
                                defaultValue="contacto@cotimed.com"
                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-500"
                            />

                        </div>

                    </div>

                </section>

                {/* Seguridad */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="text-2xl font-bold">

                        Seguridad

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Configuración relacionada con el acceso al sistema.

                    </p>

                    <div className="mt-8 space-y-6">

                        <div className="flex items-center justify-between rounded-xl border p-5">

                            <div>

                                <h3 className="font-semibold">

                                    Autenticación de dos factores

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Requerir 2FA para administradores.

                                </p>

                            </div>

                            <input
                                type="checkbox"
                                className="h-5 w-5"
                            />

                        </div>

                        <div className="flex items-center justify-between rounded-xl border p-5">

                            <div>

                                <h3 className="font-semibold">

                                    Registro de auditoría

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Guardar todas las acciones realizadas.

                                </p>

                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                            />

                        </div>

                    </div>

                </section>

                {/* Notificaciones */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="text-2xl font-bold">

                        Notificaciones

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Configurá los avisos enviados por la plataforma.

                    </p>

                    <div className="mt-8 space-y-6">

                        <div className="flex items-center justify-between rounded-xl border p-5">

                            <span>

                                Nuevas instituciones

                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                            />

                        </div>

                        <div className="flex items-center justify-between rounded-xl border p-5">

                            <span>

                                Nuevos proveedores

                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                            />

                        </div>

                        <div className="flex items-center justify-between rounded-xl border p-5">

                            <span>

                                Nuevas solicitudes

                            </span>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5"
                            />

                        </div>

                    </div>

                </section>

                {/* Mantenimiento */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="text-2xl font-bold text-red-600">

                        Zona de mantenimiento

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Acciones críticas para la administración del sistema.

                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <button className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600">

                            Modo mantenimiento

                        </button>

                        <button className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">

                            Exportar datos

                        </button>

                        <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">

                            Reiniciar sistema

                        </button>

                    </div>

                </section>

                <div className="flex justify-end">

                    <button className="rounded-xl bg-cyan-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-cyan-700">

                        Guardar cambios

                    </button>

                </div>

            </div>

        </>

    );

};

export default ConfiguracionAdmin;