import { Building2, Clock3, FileText, ShieldCheck, Search, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Institucion = () => {
    return (
        <main className="bg-white">

            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto max-w-7xl px-6 py-24">

                    <div className="max-w-3xl">

                        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
                            Plataforma para instituciones de salud
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-tight">
                            Conseguí múltiples cotizaciones
                            para equipamiento médico
                            en un solo lugar.
                        </h1>

                        <p className="mt-8 text-xl text-slate-300 leading-8">

                            Publicá una solicitud y recibí propuestas de
                            proveedores verificados.
                            Compará precios, tiempos de entrega,
                            garantías y elegí la mejor opción
                            para tu institución.

                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/registro/institucion"
                                className="rounded-lg bg-cyan-500 px-8 py-4 font-semibold hover:bg-cyan-400 transition"
                            >
                                Registrar institución
                            </Link>

                            <Link
                                to="/contacto"
                                className="rounded-lg border border-slate-600 px-8 py-4 hover:bg-slate-800 transition"
                            >
                                Solicitar una demostración
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* PROBLEMAS */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-4xl font-bold text-center">
                        Comprar equipamiento médico no debería ser complicado
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">

                        <div className="rounded-xl border p-8">

                            <Clock3 className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Mucho tiempo perdido
                            </h3>

                            <p className="mt-4 text-slate-600">

                                Contactar proveedores uno por uno consume días
                                de trabajo administrativo.

                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <Search className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Difícil comparar opciones
                            </h3>

                            <p className="mt-4 text-slate-600">

                                Cada proveedor responde por distintos medios,
                                con formatos diferentes y poca organización.

                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <FileText className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Información dispersa
                            </h3>

                            <p className="mt-4 text-slate-600">

                                Correos, llamadas y archivos terminan
                                distribuidos entre distintas personas.

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* COMO FUNCIONA */}

            <section className="bg-slate-50 py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-4xl font-bold text-center">
                        Cómo funciona
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">

                        {[
                            "Registrá tu institución",
                            "Publicá una solicitud",
                            "Recibí cotizaciones",
                            "Elegí la mejor propuesta",
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="rounded-xl bg-white p-8 shadow"
                            >

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">
                                    {index + 1}
                                </div>

                                <p className="text-lg font-semibold">
                                    {item}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* BENEFICIOS */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-4xl font-bold text-center">
                        Beneficios para tu institución
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">

                        {[
                            "Mayor competencia entre proveedores.",
                            "Mejores oportunidades de ahorro.",
                            "Proceso de compra más transparente.",
                            "Historial completo de solicitudes.",
                            "Comparación simple de cotizaciones.",
                            "Toda la información centralizada.",
                            "Menos llamadas y correos electrónicos.",
                            "Comunicación organizada."
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-4 rounded-xl border p-6"
                            >

                                <CheckCircle2 className="text-green-600" />

                                <p>{item}</p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* SEGURIDAD */}

            <section className="bg-slate-900 py-24 text-white">

                <div className="mx-auto max-w-5xl px-6 text-center">

                    <ShieldCheck className="mx-auto h-16 w-16 text-cyan-400" />

                    <h2 className="mt-8 text-4xl font-bold">

                        Pensado para instituciones de salud

                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-slate-300 text-lg leading-8">

                        CotiMed organiza las solicitudes y las cotizaciones
                        en un entorno diseñado específicamente para el sector
                        sanitario, facilitando la gestión y el seguimiento
                        del proceso de compra.

                    </p>

                </div>

            </section>

            {/* CTA */}

            <section className="py-24">

                <div className="mx-auto max-w-4xl rounded-3xl bg-cyan-600 p-12 text-center text-white">

                    <Building2 className="mx-auto h-16 w-16" />

                    <h2 className="mt-8 text-4xl font-bold">

                        Empezá a recibir mejores cotizaciones

                    </h2>

                    <p className="mt-6 text-lg">

                        Registrá tu institución gratuitamente y comenzá
                        a gestionar solicitudes de equipamiento médico
                        de forma más simple.

                    </p>

                    <Link
                        to="/registro/institucion"
                        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-cyan-700 hover:bg-slate-100 transition"
                    >
                        Crear cuenta
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Institucion;