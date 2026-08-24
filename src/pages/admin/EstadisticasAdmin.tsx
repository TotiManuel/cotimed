import { obtenerInstituciones } from "../../services/instituciones.service";
import { listarProveedores } from "../../services/proveedores.service";
import { obtener } from "../../services/solicitud.service";
import { listarCotizaciones } from "../../services/cotizaciones.service";

import {
    useEffect,
    useState
} from "react";


const EstadisticasAdmin = () => {

    const [
        cantidadInstituciones,
        setCantidadInstituciones
    ] = useState(0);


    const [
        cantidadProveedores,
        setCantidadProveedores
    ] = useState(0);


    const [
        cantidadSolicitudes,
        setCantidadSolicitudes
    ] = useState(0);


    const [
        cantidadCotizaciones,
        setCantidadCotizaciones
    ] = useState(0);


    /*
     * CARGAR INSTITUCIONES
     */

    useEffect(() => {

        obtenerInstituciones()

            .then((data) => {

                setCantidadInstituciones(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo instituciones",
                    error
                );

            });

    }, []);


    /*
     * CARGAR PROVEEDORES
     */

    useEffect(() => {

        listarProveedores()

            .then((data) => {

                setCantidadProveedores(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo proveedores",
                    error
                );

            });

    }, []);


    /*
     * CARGAR SOLICITUDES
     */

    useEffect(() => {

        obtener()

            .then((data) => {

                setCantidadSolicitudes(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo solicitudes",
                    error
                );

            });

    }, []);


    /*
     * CARGAR COTIZACIONES
     */

    useEffect(() => {

        listarCotizaciones()

            .then((data) => {

                setCantidadCotizaciones(
                    data.length
                );

            })

            .catch((error) => {

                console.log(
                    "Error obteniendo cotizaciones",
                    error
                );

            });

    }, []);


    /*
     * RESUMEN
     */

    const resumen = [

        {
            titulo: "Instituciones",
            valor: cantidadInstituciones.toString()
        },

        {
            titulo: "Proveedores",
            valor: cantidadProveedores.toString()
        },

        {
            titulo: "Solicitudes",
            valor: cantidadSolicitudes.toString()
        },

        {
            titulo: "Cotizaciones",
            valor: cantidadCotizaciones.toString()
        }

    ];


    /*
     * CATEGORÍAS
     *
     * Datos de ejemplo.
     */

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

            {/* ENCABEZADO */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Estadísticas

                </h1>

                <p className="mt-2 text-slate-600">

                    Métricas generales de la plataforma CotiMed.

                </p>

            </div>


            {/* RESUMEN */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {resumen.map((item) => (

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

                    </div>

                ))}

            </div>


            {/* CATEGORÍAS + ACTIVIDAD */}

            <div className="mt-10 grid gap-8 lg:grid-cols-2">


                {/* CATEGORÍAS */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Categorías más solicitadas

                    </h2>

                    <div className="space-y-6">

                        {categorias.map((categoria) => (

                            <div
                                key={categoria.nombre}
                            >

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
                                            width:
                                                `${categoria.cantidad / 3}%`
                                        }}
                                    />

                                </div>

                            </div>

                        ))}

                    </div>

                </section>


                {/* ACTIVIDAD */}

                <section className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-8 text-2xl font-bold">

                        Actividad del sistema

                    </h2>

                    <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 text-center text-slate-400">

                        Próximamente se mostrará un gráfico interactivo con Recharts.

                    </div>

                </section>

            </div>


            {/* RESUMEN GENERAL */}

            <div className="mt-10 rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    Resumen general

                </h2>

                <div className="grid gap-6 md:grid-cols-3">


                    {/* TIEMPO DE RESPUESTA */}

                    <div className="rounded-xl bg-slate-100 p-6">

                        <p className="text-slate-500">

                            Tiempo promedio de respuesta

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            18 hs

                        </h3>

                    </div>


                    {/* COTIZACIONES POR SOLICITUD */}

                    <div className="rounded-xl bg-slate-100 p-6">

                        <p className="text-slate-500">

                            Cotizaciones por solicitud

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            {cantidadSolicitudes > 0

                                ? (

                                    cantidadCotizaciones /
                                    cantidadSolicitudes

                                ).toFixed(1)

                                : "0"

                            }

                        </h3>

                    </div>


                    {/* TASA DE ADJUDICACIÓN */}

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