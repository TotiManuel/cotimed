import {
    useEffect,
    useState
} from "react";

import {
    listarInstituciones
} from "../../services/instituciones.service";

const DashboardAdmin = () => {

    const [cantidadInstituciones, setCantidadInstituciones] = useState(0);


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

    const estadisticas = [

        {
            titulo: "Instituciones",
            valor: cantidadInstituciones.toString(),
            color: "bg-cyan-500"
        },

        {
            titulo: "Proveedores",
            valor: "321",
            color: "bg-emerald-500"
        },

        {
            titulo: "Solicitudes",
            valor: "847",
            color: "bg-amber-500"
        },

        {
            titulo: "Equipamientos",
            valor: "12.583",
            color: "bg-violet-500"
        }

    ];

    const solicitudes = [

        {
            institucion: "Hospital Central",
            equipo: "Tomógrafo",
            estado: "Abierta"
        },

        {
            institucion: "Clínica Norte",
            equipo: "Monitor Multiparamétrico",
            estado: "Cotizando"
        },

        {
            institucion: "Sanatorio Sur",
            equipo: "Ecógrafo",
            estado: "Finalizada"
        },

        {
            institucion: "Hospital Municipal",
            equipo: "Respirador",
            estado: "Abierta"
        }

    ];

    const actividad = [

        "Nuevo proveedor registrado.",

        "Nueva institución creada.",

        "Solicitud publicada.",

        "Cotización enviada.",

        "Equipamiento agregado al catálogo."

    ];

    return (

        <main className="min-h-screen bg-slate-100 p-4 md:p-8">

            <div className="mx-auto max-w-7xl">

                <div className="mb-10">

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">

                        Dashboard Administrador

                    </h1>

                    <p className="mt-2 text-slate-600">

                        Panel general de administración de CotiMed.

                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {

                        estadisticas.map((item) => (

                            <div

                                key={item.titulo}

                                className="rounded-2xl bg-white p-6 shadow"

                            >

                                <div

                                    className={`mb-4 h-3 w-20 rounded-full ${item.color}`}

                                />

                                <p className="text-slate-500">

                                    {item.titulo}

                                </p>

                                <h2 className="mt-2 text-4xl font-bold text-slate-900">

                                    {item.valor}

                                </h2>

                            </div>

                        ))

                    }

                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-3">

                    <section className="rounded-2xl bg-white p-6 shadow lg:col-span-2">

                        <h2 className="mb-6 text-2xl font-bold">

                            Solicitudes recientes

                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[650px]">

                                <thead>

                                    <tr className="border-b">

                                        <th className="py-3 text-left">

                                            Institución

                                        </th>

                                        <th className="py-3 text-left">

                                            Equipo

                                        </th>

                                        <th className="py-3 text-left">

                                            Estado

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        solicitudes.map((item) => (

                                            <tr

                                                key={item.institucion + item.equipo}

                                                className="border-b last:border-none"

                                            >

                                                <td className="py-4">

                                                    {item.institucion}

                                                </td>

                                                <td>

                                                    {item.equipo}

                                                </td>

                                                <td>

                                                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">

                                                        {item.estado}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                    </section>

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold">

                            Actividad reciente

                        </h2>

                        <div className="space-y-4">

                            {

                                actividad.map((item) => (

                                    <div

                                        key={item}

                                        className="rounded-xl bg-slate-50 p-4"

                                    >

                                        {item}

                                    </div>

                                ))

                            }

                        </div>

                    </section>

                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold">

                            Crecimiento de la plataforma

                        </h2>

                        <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-center text-slate-400">

                            Próximamente gráfico de estadísticas

                        </div>

                    </section>

                    <section className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-2xl font-bold">

                            Accesos rápidos

                        </h2>

                        <div className="grid gap-4">

                            <button className="rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700">

                                Gestionar Instituciones

                            </button>

                            <button className="rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700">

                                Gestionar Proveedores

                            </button>

                            <button className="rounded-xl bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600">

                                Ver Solicitudes

                            </button>

                            <button className="rounded-xl bg-slate-800 py-3 font-semibold text-white transition hover:bg-slate-900">

                                Configuración

                            </button>

                        </div>

                    </section>

                </div>

            </div>

        </main>

    );

};

export default DashboardAdmin;