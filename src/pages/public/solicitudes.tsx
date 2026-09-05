import {
    ArrowRight,
    ClipboardList,
    FileSearch,
    Send,
    CheckCircle2,
    Clock3,
    Building2,
    ShieldCheck,
    TrendingDown,
} from "lucide-react";

import { Link } from "react-router-dom";


const pasos = [
    {
        icon: ClipboardList,
        titulo: "Crear una solicitud",
        descripcion:
            "Indicá qué equipamiento o insumo necesita tu institución, cantidades, especificaciones y fechas requeridas.",
    },
    {
        icon: FileSearch,
        titulo: "Recibir propuestas",
        descripcion:
            "Los proveedores especializados reciben la solicitud y envían sus cotizaciones.",
    },
    {
        icon: Send,
        titulo: "Comparar opciones",
        descripcion:
            "Analizá precios, tiempos de entrega, garantías y condiciones desde un solo lugar.",
    },
    {
        icon: CheckCircle2,
        titulo: "Elegir la mejor alternativa",
        descripcion:
            "Seleccioná la propuesta que mejor se adapte a las necesidades de tu institución.",
    },
];


const Solicitudes = () => {

    return (

        <main className="bg-white">


            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto max-w-7xl px-6 py-24">

                    <div className="max-w-3xl">


                        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300">
                            Solicitudes de cotización
                        </span>


                        <h1 className="mt-8 text-5xl font-bold leading-tight">

                            Pedí equipamiento médico
                            y recibí propuestas de proveedores.

                        </h1>


                        <p className="mt-8 text-xl leading-8 text-slate-300">

                            CotiMed conecta instituciones de salud con
                            proveedores especializados mediante un proceso
                            simple, transparente y organizado.

                        </p>


                        <div className="mt-10 flex flex-wrap gap-4">


                            <Link
                                to="/registro/institucion"
                                className="rounded-lg bg-cyan-500 px-8 py-4 font-semibold hover:bg-cyan-400 transition"
                            >
                                Crear solicitud
                            </Link>


                            <Link
                                to="/equipamiento"
                                className="rounded-lg border border-slate-600 px-8 py-4 hover:bg-slate-800 transition"
                            >
                                Ver equipamiento
                            </Link>


                        </div>


                    </div>

                </div>

            </section>



            {/* COMO FUNCIONA */}

            <section className="py-24">

                <div className="mx-auto max-w-7xl px-6">


                    <h2 className="text-center text-4xl font-bold">

                        ¿Cómo funciona una solicitud?

                    </h2>


                    <p className="mx-auto mt-6 max-w-3xl text-center text-slate-600">

                        Transformamos un proceso tradicional lleno de
                        llamadas y correos en una gestión digital organizada.

                    </p>



                    <div className="mt-16 grid gap-8 md:grid-cols-4">


                        {pasos.map((paso, index) => {

                            const Icon = paso.icon;


                            return (

                                <div
                                    key={paso.titulo}
                                    className="rounded-xl border p-8"
                                >

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-white font-bold">

                                        {index + 1}

                                    </div>


                                    <Icon className="mt-8 h-10 w-10 text-cyan-600" />


                                    <h3 className="mt-6 text-xl font-bold">

                                        {paso.titulo}

                                    </h3>


                                    <p className="mt-4 text-slate-600">

                                        {paso.descripcion}

                                    </p>


                                </div>

                            );

                        })}


                    </div>


                </div>

            </section>



            {/* BENEFICIOS INSTITUCIONES */}

            <section className="bg-slate-50 py-24">


                <div className="mx-auto max-w-7xl px-6">


                    <h2 className="text-center text-4xl font-bold">

                        Beneficios para instituciones

                    </h2>



                    <div className="mt-16 grid gap-8 md:grid-cols-3">


                        <div className="rounded-xl bg-white p-8 shadow-sm">


                            <Clock3 className="h-12 w-12 text-cyan-600" />


                            <h3 className="mt-6 text-xl font-bold">

                                Menos tiempo administrativo

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Evitá contactar proveedores uno por uno.
                                Centralizá todo el proceso.

                            </p>


                        </div>



                        <div className="rounded-xl bg-white p-8 shadow-sm">


                            <TrendingDown className="h-12 w-12 text-cyan-600" />


                            <h3 className="mt-6 text-xl font-bold">

                                Mejores oportunidades

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Al recibir varias propuestas podés comparar
                                alternativas y tomar mejores decisiones.

                            </p>


                        </div>



                        <div className="rounded-xl bg-white p-8 shadow-sm">


                            <ShieldCheck className="h-12 w-12 text-cyan-600" />


                            <h3 className="mt-6 text-xl font-bold">

                                Proceso transparente

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Conservá un historial de solicitudes,
                                cotizaciones y decisiones.

                            </p>


                        </div>


                    </div>


                </div>


            </section>



            {/* TIPOS DE SOLICITUDES */}

            <section className="py-24">


                <div className="mx-auto max-w-7xl px-6">


                    <h2 className="text-center text-4xl font-bold">

                        ¿Qué podés solicitar?

                    </h2>



                    <div className="mt-16 grid gap-6 md:grid-cols-3">


                        {[
                            "Equipamiento médico nuevo",
                            "Reposición de equipos",
                            "Ampliación de servicios",
                            "Insumos hospitalarios",
                            "Equipamiento para nuevas áreas",
                            "Repuestos y accesorios",
                            "Mantenimiento especializado",
                            "Tecnología médica",
                            "Mobiliario sanitario",
                        ].map((item) => (


                            <div
                                key={item}
                                className="flex items-center gap-4 rounded-xl border p-6"
                            >

                                <CheckCircle2 className="text-green-600"/>

                                <p className="font-medium">
                                    {item}
                                </p>

                            </div>


                        ))}


                    </div>


                </div>


            </section>



            {/* PARA PROVEEDORES */}

            <section className="bg-slate-900 py-24 text-white">


                <div className="mx-auto max-w-5xl px-6 text-center">


                    <Building2 className="mx-auto h-16 w-16 text-cyan-400"/>


                    <h2 className="mt-8 text-4xl font-bold">

                        ¿Sos proveedor?

                    </h2>


                    <p className="mt-6 text-lg text-slate-300">

                        Recibí solicitudes de instituciones que necesitan
                        tus productos y servicios.

                    </p>


                    <Link
                        to="/registro/proveedor"
                        className="mt-8 inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-bold hover:bg-cyan-400"
                    >

                        Registrarme como proveedor

                        <ArrowRight size={20}/>

                    </Link>


                </div>


            </section>



            {/* CTA FINAL */}


            <section className="py-24">


                <div className="mx-auto max-w-4xl rounded-3xl bg-cyan-600 p-12 text-center text-white">


                    <h2 className="text-4xl font-bold">

                        Simplificá la compra de equipamiento médico

                    </h2>


                    <p className="mt-6 text-lg">

                        Creá tu solicitud y empezá a recibir propuestas
                        de proveedores especializados.

                    </p>


                    <Link
                        to="/registro/institucion"
                        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-cyan-700"
                    >

                        Crear solicitud

                        <ArrowRight size={20}/>

                    </Link>


                </div>


            </section>



        </main>

    );
};


export default Solicitudes;