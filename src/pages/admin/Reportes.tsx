import CardReporte from "../../components/reportes/CardReporte";
import TablaReporte from "../../components/reportes/TablaReporte";
import GraficoReporte from "../../components/reportes/GraficoReporte";

import { useReportes } from "../../hooks/useReportes";


const Reportes = () => {


  const {

    reportes,

    cargando,

    error

  } = useReportes();





  if (cargando) {

    return (

      <main className="mx-auto max-w-7xl px-6 py-10">

        <p className="text-slate-500">

          Cargando reportes...

        </p>

      </main>

    );

  }





  if (error) {

    return (

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div
          className="
          rounded-xl
          border
          bg-red-50
          p-6
          text-red-700
          "
        >

          {error}

        </div>

      </main>

    );

  }





  if (!reportes) {

    return null;

  }





  return (

    <main className="mx-auto max-w-7xl px-6 py-10">



      {/* Encabezado */}

      <section className="mb-10">

        <h1
          className="
          text-4xl
          font-bold
          text-slate-900
          "
        >

          Reportes

        </h1>


        <p
          className="
          mt-2
          text-slate-600
          "
        >

          Estadísticas generales de la plataforma Cotimed.

        </p>


      </section>







      {/* Resumen */}

      <section

        className="
        grid
        gap-6
        md:grid-cols-2
        lg:grid-cols-4
        mb-10
        "

      >


        <CardReporte

          titulo="Instituciones"

          valor={reportes.resumen.instituciones}

          descripcion="Instituciones registradas"

          icono="🏥"

        />



        <CardReporte

          titulo="Proveedores"

          valor={reportes.resumen.proveedores}

          descripcion="Proveedores activos"

          icono="🏢"

        />



        <CardReporte

          titulo="Equipamientos"

          valor={reportes.resumen.equipamientos}

          descripcion="Equipamientos disponibles"

          icono="🩺"

        />



        <CardReporte

          titulo="Solicitudes"

          valor={reportes.resumen.solicitudes}

          descripcion="Solicitudes creadas"

          icono="📋"

        />


      </section>








      {/* Gráficos */}

      <section

        className="
        grid
        gap-6
        lg:grid-cols-2
        mb-10
        "

      >


        <GraficoReporte

          titulo="Solicitudes por estado"

          datos={

            reportes.solicitudesEstado.map((item)=>({

              nombre:item.estado,

              cantidad:item.cantidad

            }))

          }

        />




        <GraficoReporte

          titulo="Cotizaciones por estado"

          datos={

            reportes.cotizacionesEstado.map((item)=>({

              nombre:item.estado,

              cantidad:item.cantidad

            }))

          }

        />



      </section>









      {/* Tablas */}

      <section

        className="
        grid
        gap-6
        lg:grid-cols-2
        "

      >



        <TablaReporte

          titulo="Equipamiento por categoría"

          columnas={[

            {

              titulo:"Categoría",

              campo:"categoria"

            },

            {

              titulo:"Cantidad",

              campo:"cantidad"

            }

          ]}

          datos={

            reportes.equipamientosCategoria

          }

        />







        <TablaReporte

          titulo="Proveedores más activos"

          columnas={[

            {

              titulo:"Proveedor",

              campo:"nombreEmpresa"

            },

            {

              titulo:"Cotizaciones",

              campo:"cantidadCotizaciones"

            }

          ]}

          datos={

            reportes.proveedoresRanking

          }

        />




      </section>



    </main>

  );


};


export default Reportes;