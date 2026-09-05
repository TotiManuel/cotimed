import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Handshake,
    Search,
    ShieldCheck
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="w-full overflow-x-hidden">

            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

                    <div className="max-w-4xl">

                        <span className="inline-block rounded-full bg-blue-500/20 px-4 py-2 text-xs font-medium text-blue-300 sm:text-sm">

                            Plataforma B2B de equipamiento médico

                        </span>

                        <h1 className="mt-6 text-3xl font-bold leading-tight sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl">

                            Conectamos instituciones de salud con proveedores médicos.

                        </h1>

                        <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl">

                            CotiMed simplifica la búsqueda, solicitud y comparación
                            de cotizaciones de equipamiento médico entre hospitales,
                            clínicas y proveedores especializados.

                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">

                            <Link
                                to="/registro/institucion"
                                className="w-full rounded-lg bg-blue-600 px-6 py-4 text-center font-semibold transition hover:bg-blue-700 sm:w-auto sm:px-8"
                            >

                                Soy institución

                            </Link>

                            <Link
                                to="/registro/proveedor"
                                className="w-full rounded-lg border border-slate-600 px-6 py-4 text-center font-semibold transition hover:bg-slate-800 sm:w-auto sm:px-8"
                            >

                                Soy proveedor

                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* PROPUESTA DE VALOR */}

            <section className="py-12 sm:py-16 lg:py-24">

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                    <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">

                        Una forma más simple de gestionar compras médicas

                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">

                        <div className="h-full rounded-xl border border-slate-200 p-6 sm:p-8">

                            <Search className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12" />

                            <h3 className="mt-5 text-xl font-bold">

                                Encontrá proveedores

                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Accedé a empresas especializadas en equipamiento
                                e insumos médicos.

                            </p>

                        </div>

                        <div className="h-full rounded-xl border border-slate-200 p-6 sm:p-8">

                            <Handshake className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12" />

                            <h3 className="mt-5 text-xl font-bold">

                                Compará propuestas

                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Recibí diferentes cotizaciones y elegí la mejor
                                alternativa para tu institución.

                            </p>

                        </div>

                        <div className="h-full rounded-xl border border-slate-200 p-6 sm:p-8">

                            <ShieldCheck className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12" />

                            <h3 className="mt-5 text-xl font-bold">

                                Compras organizadas

                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">

                                Centralizá solicitudes, proveedores y cotizaciones
                                en un solo lugar.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* COMO FUNCIONA */}

            <section className="bg-slate-50 py-12 sm:py-16 lg:py-24">

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                    <h2 className="text-center text-3xl font-bold leading-tight sm:text-4xl">

                        ¿Cómo funciona CotiMed?

                    </h2>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">

                        {[
                            "La institución crea una solicitud",
                            "Los proveedores reciben el pedido",
                            "Se envían cotizaciones",
                            "La institución compara y decide"
                        ].map((item, index) => (

                            <div
                                key={item}
                                className="h-full rounded-xl bg-white p-6 shadow-sm sm:p-8"
                            >

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                                    {index + 1}

                                </div>

                                <p className="mt-5 leading-7 font-semibold">

                                    {item}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* PARA QUIEN */}

            <section className="py-12 sm:py-16 lg:py-24">

                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">

                        <div className="flex h-full flex-col rounded-2xl bg-blue-600 p-6 text-white sm:p-8 lg:p-10">

                            <Building2
                                size={48}
                                className="h-10 w-10 sm:h-12 sm:w-12"
                            />

                            <h2 className="mt-5 text-2xl font-bold sm:mt-6 sm:text-3xl">

                                Instituciones

                            </h2>

                            <p className="mt-3 leading-7 sm:mt-4">

                                Solicitá equipamiento, recibí propuestas y
                                optimizá tus compras médicas.

                            </p>

                            <Link
                                to="/institucion"
                                className="mt-6 inline-flex w-fit items-center gap-2 font-semibold sm:mt-8"
                            >

                                Conocer más

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                        <div className="flex h-full flex-col rounded-2xl bg-slate-900 p-6 text-white sm:p-8 lg:p-10">

                            <Handshake
                                size={48}
                                className="h-10 w-10 sm:h-12 sm:w-12"
                            />

                            <h2 className="mt-5 text-2xl font-bold sm:mt-6 sm:text-3xl">

                                Proveedores

                            </h2>

                            <p className="mt-3 leading-7 sm:mt-4">

                                Mostrá tus productos y conectá con instituciones
                                que necesitan tus soluciones.

                            </p>

                            <Link
                                to="/proveedor"
                                className="mt-6 inline-flex w-fit items-center gap-2 font-semibold sm:mt-8"
                            >

                                Conocer más

                                <ArrowRight size={20} />

                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA FINAL */}

            <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">

                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-blue-600 p-6 text-center text-white sm:rounded-3xl sm:p-10 lg:p-12">

                    <CheckCircle2 className="mx-auto h-12 w-12 sm:h-16 sm:w-16" />

                    <h2 className="mx-auto mt-6 max-w-3xl text-2xl font-bold leading-tight sm:mt-8 sm:text-3xl lg:text-4xl">

                        El futuro de las compras médicas comienza acá

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 sm:mt-6 sm:text-lg">

                        Unimos la necesidad de las instituciones con
                        proveedores especializados.

                    </p>

                    <Link
                        to="/registro/institucion"
                        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-bold text-blue-700 transition hover:bg-slate-100 sm:mt-10 sm:w-auto sm:px-8"
                    >

                        Crear cuenta

                        <ArrowRight size={20} />

                    </Link>

                </div>

            </section>

        </main>
    );
};

export default Home;