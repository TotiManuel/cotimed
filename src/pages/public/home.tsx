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

        <main>


            {/* HERO */}

            <section className="bg-slate-900 text-white">

                <div className="mx-auto max-w-7xl px-6 py-24">


                    <div className="max-w-4xl">


                        <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">

                            Plataforma B2B de equipamiento médico

                        </span>



                        <h1 className="mt-8 text-5xl font-bold leading-tight">

                            Conectamos instituciones de salud con proveedores médicos.

                        </h1>



                        <p className="mt-8 text-xl leading-8 text-slate-300">

                            CotiMed simplifica la búsqueda, solicitud y comparación
                            de cotizaciones de equipamiento médico entre hospitales,
                            clínicas y proveedores especializados.

                        </p>



                        <div className="mt-10 flex flex-wrap gap-4">


                            <Link
                                to="/registro/institucion"
                                className="rounded-lg bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
                            >

                                Soy institución

                            </Link>



                            <Link
                                to="/registro/proveedor"
                                className="rounded-lg border border-slate-600 px-8 py-4 font-semibold transition hover:bg-slate-800"
                            >

                                Soy proveedor

                            </Link>


                        </div>


                    </div>


                </div>


            </section>




            {/* PROPUESTA DE VALOR */}


            <section className="py-24">


                <div className="mx-auto max-w-7xl px-6">


                    <h2 className="text-center text-4xl font-bold text-slate-900">

                        Una forma más simple de gestionar compras médicas

                    </h2>



                    <div className="mt-16 grid gap-8 md:grid-cols-3">


                        <div className="rounded-xl border p-8">


                            <Search className="h-12 w-12 text-blue-600"/>


                            <h3 className="mt-6 text-xl font-bold">

                                Encontrá proveedores

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Accedé a empresas especializadas en equipamiento
                                e insumos médicos.

                            </p>


                        </div>




                        <div className="rounded-xl border p-8">


                            <Handshake className="h-12 w-12 text-blue-600"/>


                            <h3 className="mt-6 text-xl font-bold">

                                Compará propuestas

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Recibí diferentes cotizaciones y elegí la mejor
                                alternativa para tu institución.

                            </p>


                        </div>




                        <div className="rounded-xl border p-8">


                            <ShieldCheck className="h-12 w-12 text-blue-600"/>


                            <h3 className="mt-6 text-xl font-bold">

                                Compras organizadas

                            </h3>


                            <p className="mt-4 text-slate-600">

                                Centralizá solicitudes, proveedores y cotizaciones
                                en un solo lugar.

                            </p>


                        </div>


                    </div>


                </div>


            </section>





            {/* COMO FUNCIONA */}


            <section className="bg-slate-50 py-24">


                <div className="mx-auto max-w-7xl px-6">


                    <h2 className="text-center text-4xl font-bold">

                        ¿Cómo funciona CotiMed?

                    </h2>



                    <div className="mt-16 grid gap-8 md:grid-cols-4">


                        {[
                            "La institución crea una solicitud",
                            "Los proveedores reciben el pedido",
                            "Se envían cotizaciones",
                            "La institución compara y decide"
                        ].map((item, index)=>(


                            <div
                                key={item}
                                className="rounded-xl bg-white p-8 shadow-sm"
                            >


                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">

                                    {index + 1}

                                </div>



                                <p className="mt-6 font-semibold">

                                    {item}

                                </p>


                            </div>


                        ))}


                    </div>


                </div>


            </section>





            {/* PARA QUIEN */}


            <section className="py-24">


                <div className="mx-auto max-w-7xl px-6">


                    <div className="grid gap-8 md:grid-cols-2">


                        <div className="rounded-2xl bg-blue-600 p-10 text-white">


                            <Building2 size={48}/>


                            <h2 className="mt-6 text-3xl font-bold">

                                Instituciones

                            </h2>


                            <p className="mt-4">

                                Solicitá equipamiento, recibí propuestas y
                                optimizá tus compras médicas.

                            </p>



                            <Link
                                to="/institucion"
                                className="mt-8 inline-flex items-center gap-2 font-semibold"
                            >

                                Conocer más

                                <ArrowRight size={20}/>

                            </Link>


                        </div>





                        <div className="rounded-2xl bg-slate-900 p-10 text-white">


                            <Handshake size={48}/>


                            <h2 className="mt-6 text-3xl font-bold">

                                Proveedores

                            </h2>


                            <p className="mt-4">

                                Mostrá tus productos y conectá con instituciones
                                que necesitan tus soluciones.

                            </p>



                            <Link
                                to="/proveedor"
                                className="mt-8 inline-flex items-center gap-2 font-semibold"
                            >

                                Conocer más

                                <ArrowRight size={20}/>

                            </Link>


                        </div>


                    </div>


                </div>


            </section>





            {/* CTA FINAL */}


            <section className="py-24">


                <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 p-12 text-center text-white">


                    <CheckCircle2 className="mx-auto h-16 w-16"/>


                    <h2 className="mt-8 text-4xl font-bold">

                        El futuro de las compras médicas comienza acá

                    </h2>


                    <p className="mt-6 text-lg">

                        Unimos la necesidad de las instituciones con
                        proveedores especializados.

                    </p>


                    <Link
                        to="/registro/institucion"
                        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-blue-700"
                    >

                        Crear cuenta

                        <ArrowRight size={20}/>

                    </Link>


                </div>


            </section>


        </main>

    );

};


export default Home;