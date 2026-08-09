import { listarInstituciones } from "../../services/instituciones.service";
import { listarProveedores } from "../../services/proveedores.service";
import { listarSolicitudes } from "../../services/solicitud.service";
import { useEffect, useState } from "react";

const EstadisticasAdmin = () => {

    const [cantidadInstituciones, setCantidadInstituciones] = useState(0);
    const [cantidadProveedores, setCantidadProveedores] = useState(0);
    const [cantidadSolicitudes, setCantidadSolicitudes] = useState(0);


    useEffect(() => {

        listarInstituciones()
            .then((data) => {

                setCantidadInstituciones(
                    data.length
                );

            })
            .catch((error)=>{

                console.log(
                    "Error obteniendo instituciones",
                    error
                );

            });

    }, []);
    useEffect(() => {

        listarProveedores()
            .then((data) => {

                setCantidadProveedores(
                    data.length
                );

            })
            .catch((error)=>{

                console.log(
                    "Error obteniendo proveedores",
                    error
                );

            });

    }, []);
    useEffect(() => {

        listarSolicitudes()
            .then((data) => {
                setCantidadSolicitudes(data.length);
            })
            .catch((error) => {
                console.log("Error obteniendo solicitudes", error);
            });
    }, []);

    const resumen = [

        {
            titulo: "Instituciones",
            valor: cantidadInstituciones.toString(),
            variacion: "+12% este mes"
        },

        {
            titulo: "Proveedores",
            valor: cantidadProveedores.toString(),
            variacion: "+8% este mes"
        },

        {
            titulo: "Solicitudes",
            valor: cantidadSolicitudes.toString(),
            variacion: "+24% este mes"
        },

        {
            titulo: "Cotizaciones",
            valor: "3.428",
            variacion: "+18% este mes"
        }

    ];



    const categorias = [

        {
            nombre: "Diagnóstico por imágenes",
            cantidad: 248
        },

        {
            nombre: "Monitoreo",
            cantidad: 193
        },

        {
            nombre: "Terapia Intensiva",
            cantidad: 167
        },

        {
            nombre: "Laboratorio",
            cantidad: 131
        },

        {
            nombre: "Quirófano",
            cantidad: 102
        }

    ];



    return (

        <>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Estadísticas

                </h1>

                <p className="mt-2 text-slate-600">

                    Métricas generales de la plataforma CotiMed.

                </p>

            </div>



            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {

                    resumen.map((item) => (

                        <div
                            key={item.titulo}
                            className="rounded-2xl bg-white p-6 shadow"
                        >

                            <p className="text-slate-500">

                                {item.titulo}

                            </p>

                            <h2 className="mt-3 text-4xl font-bold text-slate-900">

                                {item.valor}

                            </h2>

                            <p className="mt-4 text-sm font-semibold text-emerald-600">

                                {item.variacion}

                            </p>

                        </div>

                    ))

                }

            </div>



            <div className="mt-10 grid gap-8 lg:grid-cols-2">

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Categorías más solicitadas

                    </h2>

                    <div className="space-y-6">

                        {

                            categorias.map((categoria) => (

                                <div key={categoria.nombre}>

                                    <div className="mb-2 flex justify-between">

                                        <span>

                                            {categoria.nombre}

                                        </span>

                                        <span className="font-semibold">

                                            {categoria.cantidad}

                                        </span>

                                    </div>

                                    <div className="h-3 rounded-full bg-slate-200">

                                        <div
                                            className="h-3 rounded-full bg-cyan-600"
                                            style={{
                                                width: `${categoria.cantidad / 3}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </section>



                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Actividad del sistema

                    </h2>

                    <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 text-slate-400">

                        Próximamente se mostrará un gráfico interactivo con Recharts.

                    </div>

                </section>

            </div>



            <div className="mt-10 rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    Resumen general

                </h2>

                <div className="grid gap-6 md:grid-cols-3">

                    <div className="rounded-xl bg-slate-100 p-6">

                        <p className="text-slate-500">

                            Tiempo promedio de respuesta

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            18 hs

                        </h3>

                    </div>

                    <div className="rounded-xl bg-slate-100 p-6">

                        <p className="text-slate-500">

                            Cotizaciones por solicitud

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            7,4

                        </h3>

                    </div>

                    <div className="rounded-xl bg-slate-100 p-6">

                        <p className="text-slate-500">

                            Tasa de adjudicación

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            82%

                        </h3>

                    </div>

                </div>

            </div>

        </>

    );

};

export default EstadisticasAdmin;