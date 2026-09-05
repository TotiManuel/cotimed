import {
    ArrowRight,
    Building2,
    CheckCircle2,
    ClipboardList,
    Globe,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

const Proveedor = () => {
    return (
        <main className="bg-white">

            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto max-w-7xl px-6 py-24">

                    <div className="max-w-3xl">

                        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
                            Plataforma para proveedores
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-tight">
                            Llegá a instituciones de salud que realmente están buscando comprar.
                        </h1>

                        <p className="mt-8 text-xl leading-8 text-slate-300">
                            Recibí solicitudes de hospitales, clínicas,
                            sanatorios y centros médicos.
                            Enviá tus cotizaciones desde un único lugar
                            y aumentá tus oportunidades de venta.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/registro/proveedor"
                                className="rounded-lg bg-cyan-500 px-8 py-4 font-semibold transition hover:bg-cyan-400"
                            >
                                Registrar empresa
                            </Link>

                            <Link
                                to="/contacto"
                                className="rounded-lg border border-slate-600 px-8 py-4 transition hover:bg-slate-800"
                            >
                                Solicitar información
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* BENEFICIOS */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Más oportunidades de negocio
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">

                        <div className="rounded-xl border p-8">

                            <TrendingUp className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Más ventas
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Accedé a solicitudes reales de compra publicadas
                                por instituciones de salud.
                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <Building2 className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Nuevos clientes
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Conectate con hospitales, clínicas,
                                consultorios y otras organizaciones del
                                sector sanitario.
                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <ClipboardList className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Todo organizado
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Gestioná tus cotizaciones desde un único panel,
                                sin depender de llamadas o cadenas de correos.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CÓMO FUNCIONA */}

            <section className="bg-slate-50 py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Cómo funciona
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">

                        {[
                            "Registrá tu empresa",
                            "Recibí solicitudes",
                            "Enviá tu cotización",
                            "Conseguí nuevos clientes"
                        ].map((paso, index) => (

                            <div
                                key={paso}
                                className="rounded-xl bg-white p-8 shadow"
                            >

                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
                                    {index + 1}
                                </div>

                                <p className="text-lg font-semibold">
                                    {paso}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* VENTAJAS */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        ¿Por qué formar parte de CotiMed?
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">

                        {[
                            "Recibí solicitudes de compra en un solo lugar.",
                            "Ahorrá tiempo en la gestión comercial.",
                            "Respondé rápidamente a nuevas oportunidades.",
                            "Aumentá la visibilidad de tu empresa.",
                            "Gestioná todas tus cotizaciones online.",
                            "Llegá a nuevos clientes del sector salud.",
                            "Historial completo de propuestas enviadas.",
                            "Proceso simple y transparente."
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

            {/* CONFIANZA */}

            <section className="bg-slate-900 py-24 text-white">

                <div className="mx-auto max-w-5xl px-6 text-center">

                    <ShieldCheck className="mx-auto h-16 w-16 text-cyan-400" />

                    <h2 className="mt-8 text-4xl font-bold">
                        Diseñado para el sector de la salud
                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                        CotiMed busca facilitar la conexión entre instituciones
                        y proveedores mediante un proceso claro, organizado y
                        enfocado exclusivamente en equipamiento e insumos médicos.
                    </p>

                </div>

            </section>

            {/* CTA */}

            <section className="py-24">

                <div className="mx-auto max-w-4xl rounded-3xl bg-cyan-600 p-12 text-center text-white">

                    <Globe className="mx-auto h-16 w-16" />

                    <h2 className="mt-8 text-4xl font-bold">
                        Hacé crecer tu negocio
                    </h2>

                    <p className="mt-6 text-lg">
                        Registrá tu empresa y empezá a recibir solicitudes de
                        instituciones de salud desde una única plataforma.
                    </p>

                    <Link
                        to="/registro/proveedor"
                        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-cyan-700 transition hover:bg-slate-100"
                    >
                        Crear cuenta
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Proveedor;