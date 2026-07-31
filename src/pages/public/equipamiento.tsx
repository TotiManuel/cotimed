import {
    Activity,
    Ambulance,
    ArrowRight,
    Bed,
    Building2,
    HeartPulse,
    Microscope,
    Monitor,
    ShieldCheck,
    Stethoscope,
    Syringe,
    Truck,
} from "lucide-react";

import { Link } from "react-router-dom";

const categorias = [
    {
        icon: Monitor,
        titulo: "Monitoreo",
        descripcion:
            "Monitores multiparamétricos, ECG, oximetría, presión arterial y más.",
    },
    {
        icon: HeartPulse,
        titulo: "Cardiología",
        descripcion:
            "Desfibriladores, electrocardiógrafos y equipamiento cardiovascular.",
    },
    {
        icon: Microscope,
        titulo: "Laboratorio",
        descripcion:
            "Microscopios, analizadores, centrífugas y equipos de diagnóstico.",
    },
    {
        icon: Bed,
        titulo: "Internación",
        descripcion:
            "Camas hospitalarias, colchones, mesas de luz y mobiliario médico.",
    },
    {
        icon: Ambulance,
        titulo: "Emergencias",
        descripcion:
            "Equipamiento para ambulancias y servicios de urgencias.",
    },
    {
        icon: Syringe,
        titulo: "Insumos",
        descripcion:
            "Material descartable, instrumental y productos médicos.",
    },
];

const Equipamiento = () => {
    return (
        <main className="bg-white">

            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto max-w-7xl px-6 py-24">

                    <div className="max-w-3xl">

                        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
                            Equipamiento e insumos médicos
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-tight">
                            Encontrá proveedores para todo tipo de equipamiento médico.
                        </h1>

                        <p className="mt-8 text-xl leading-8 text-slate-300">
                            Desde pequeños insumos hasta equipamiento de alta
                            complejidad. Publicá una solicitud y recibí
                            cotizaciones de proveedores especializados.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/registro/institucion"
                                className="rounded-lg bg-cyan-500 px-8 py-4 font-semibold transition hover:bg-cyan-400"
                            >
                                Solicitar cotización
                            </Link>

                            <Link
                                to="/proveedor"
                                className="rounded-lg border border-slate-600 px-8 py-4 transition hover:bg-slate-800"
                            >
                                Soy proveedor
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* CATEGORÍAS */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Categorías disponibles
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {categorias.map((categoria) => {

                            const Icon = categoria.icon;

                            return (

                                <div
                                    key={categoria.titulo}
                                    className="rounded-xl border p-8 transition hover:shadow-lg"
                                >

                                    <Icon className="mb-6 h-12 w-12 text-cyan-600" />

                                    <h3 className="text-2xl font-bold">
                                        {categoria.titulo}
                                    </h3>

                                    <p className="mt-4 text-slate-600">
                                        {categoria.descripcion}
                                    </p>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>

            {/* QUÉ PODÉS SOLICITAR */}

            <section className="bg-slate-50 py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Podés solicitar cotizaciones para...
                    </h2>

                    <div className="mt-16 grid gap-6 md:grid-cols-2">

                        {[
                            "Equipamiento médico.",
                            "Equipamiento hospitalario.",
                            "Insumos descartables.",
                            "Instrumental quirúrgico.",
                            "Equipos de laboratorio.",
                            "Mobiliario hospitalario.",
                            "Tecnología para diagnóstico.",
                            "Repuestos y accesorios.",
                        ].map((item) => (

                            <div
                                key={item}
                                className="flex items-center gap-4 rounded-xl border bg-white p-6"
                            >

                                <Activity className="text-cyan-600" />

                                <p>{item}</p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* POR QUÉ USAR COTIMED */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Una forma más eficiente de comprar
                    </h2>

                    <div className="mt-16 grid gap-8 md:grid-cols-3">

                        <div className="rounded-xl border p-8">

                            <Building2 className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Más proveedores
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Llegá a múltiples empresas mediante una única solicitud.
                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <Truck className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Compará propuestas
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Evaluá precios, tiempos de entrega y garantías.
                            </p>

                        </div>

                        <div className="rounded-xl border p-8">

                            <ShieldCheck className="mb-6 h-12 w-12 text-cyan-600" />

                            <h3 className="text-xl font-bold">
                                Todo organizado
                            </h3>

                            <p className="mt-4 text-slate-600">
                                Gestioná cada solicitud desde un único panel.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="py-24">

                <div className="mx-auto max-w-4xl rounded-3xl bg-cyan-600 p-12 text-center text-white">

                    <Stethoscope className="mx-auto h-16 w-16" />

                    <h2 className="mt-8 text-4xl font-bold">
                        ¿Necesitás equipamiento médico?
                    </h2>

                    <p className="mt-6 text-lg">
                        Publicá tu solicitud y recibí cotizaciones de distintos
                        proveedores para comparar y elegir la mejor opción.
                    </p>

                    <Link
                        to="/registro/institucion"
                        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-cyan-700 transition hover:bg-slate-100"
                    >
                        Solicitar cotización
                        <ArrowRight size={20} />
                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Equipamiento;