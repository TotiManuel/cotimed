import { Link } from "react-router-dom";
import {
    Building2,
    Truck,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

const SeleccionarRol = () => {

    return (

        <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

            <div className="w-full max-w-6xl">

                <div className="text-center mb-14">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg">

                        <ShieldCheck size={40} />

                    </div>

                    <h1 className="mt-8 text-5xl font-bold text-slate-900">

                        ¿Cómo querés ingresar?

                    </h1>

                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">

                        Seleccioná el tipo de cuenta con el que deseás acceder.
                        Más adelante esta selección será automática según tu usuario.

                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-3">

                    {/* ADMIN */}

                    <Link
                        to="/admin/dashboard"
                        className="group rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">

                            <ShieldCheck size={34} />

                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-slate-900">

                            Administrador

                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">

                            Gestioná instituciones, proveedores, solicitudes,
                            estadísticas y el funcionamiento completo de CotiMed.

                        </p>

                        <div className="mt-10 flex items-center gap-2 font-semibold text-red-600">

                            Ir al Dashboard

                            <ArrowRight
                                size={20}
                                className="transition group-hover:translate-x-2"
                            />

                        </div>

                    </Link>

                    {/* INSTITUCION */}

                    <Link
                        to="/institucion/dashboard"
                        className="group rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">

                            <Building2 size={34} />

                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-slate-900">

                            Institución

                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">

                            Publicá solicitudes de equipamiento médico,
                            compará cotizaciones y elegí la mejor propuesta.

                        </p>

                        <div className="mt-10 flex items-center gap-2 font-semibold text-cyan-600">

                            Ir al Dashboard

                            <ArrowRight
                                size={20}
                                className="transition group-hover:translate-x-2"
                            />

                        </div>

                    </Link>

                    {/* PROVEEDOR */}

                    <Link
                        to="/proveedor/dashboard"
                        className="group rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">

                            <Truck size={34} />

                        </div>

                        <h2 className="mt-8 text-3xl font-bold text-slate-900">

                            Proveedor

                        </h2>

                        <p className="mt-4 text-slate-600 leading-relaxed">

                            Encontrá oportunidades de negocio, enviá
                            cotizaciones y administrá tu catálogo.

                        </p>

                        <div className="mt-10 flex items-center gap-2 font-semibold text-emerald-600">

                            Ir al Dashboard

                            <ArrowRight
                                size={20}
                                className="transition group-hover:translate-x-2"
                            />

                        </div>

                    </Link>

                </div>

            </div>

        </main>

    );

};

export default SeleccionarRol;