import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { obtenerDashboardInstitucion } from "../../service/dashboardInstitucion.service";


const DashboardInstitucion = () => {


  const { usuario } = useAuth();


  const [datos,setDatos] = useState<any>(null);


  useEffect(() => {

    obtenerDashboardInstitucion()
      .then(setDatos)
      .catch(error => {
        console.error(error);
      });

  }, []);



  if(!datos){

    return (

      <main className="min-h-screen bg-slate-50 px-6 py-10">

        <p className="text-slate-500">

          Cargando panel...

        </p>

      </main>

    );

  }




  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <section className="mx-auto max-w-7xl">


        {/* Encabezado */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-900">

            Panel de Institución

          </h1>

          <p className="mt-2 text-slate-600">

            Bienvenido, {usuario?.nombre}

          </p>

        </div>





        {/* Resumen */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Solicitudes activas

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.solicitudesActivas}

            </h2>

          </div>





          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Cotizaciones recibidas

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.cotizacionesRecibidas}

            </h2>

          </div>





          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Compras realizadas

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.comprasRealizadas}

            </h2>

          </div>





          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Proveedores contactados

            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.proveedoresContactados}

            </h2>

          </div>


        </div>





        {/* Acciones principales */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">

            Gestión de equipamiento

          </h2>



          <div className="grid gap-4 md:grid-cols-3">


            <button className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">

              Nueva solicitud

            </button>



            <button className="rounded-lg bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">

              Comparar cotizaciones

            </button>



            <button className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-100">

              Ver catálogo

            </button>


          </div>


        </section>





        {/* Solicitudes recientes */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <div className="mb-6 flex items-center justify-between">


            <h2 className="text-2xl font-bold text-slate-900">

              Solicitudes recientes

            </h2>


            <button className="text-sm text-blue-600 hover:underline">

              Ver todas

            </button>


          </div>





          <div className="space-y-4">


            {
              datos.solicitudes.map((solicitud:any)=>(


                <div
                  key={solicitud.id}
                  className="flex items-center justify-between border-b pb-4"
                >

                  <div>

                    <h3 className="font-semibold text-slate-900">

                      {solicitud.titulo}

                    </h3>


                    <p className="text-sm text-slate-500">

                      {solicitud.descripcion}

                    </p>


                  </div>



                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                    {solicitud.estado}

                  </span>


                </div>


              ))
            }


          </div>


        </section>






        {/* Cotizaciones destacadas */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">

            Últimas cotizaciones

          </h2>




          <div className="overflow-x-auto">


            <table className="w-full text-left">


              <thead>

                <tr className="border-b text-sm text-slate-500">


                  <th className="pb-3">

                    Producto

                  </th>


                  <th className="pb-3">

                    Proveedor

                  </th>


                  <th className="pb-3">

                    Estado

                  </th>


                  <th className="pb-3">

                    Fecha

                  </th>


                </tr>


              </thead>



              <tbody>


                {
                  datos.cotizaciones.map((cotizacion:any)=>(


                    <tr
                      key={cotizacion.id}
                      className="border-b"
                    >


                      <td className="py-4">

                        {cotizacion.solicitud.titulo}

                      </td>


                      <td>

                        {cotizacion.proveedor.nombreEmpresa}

                      </td>


                      <td>

                        {cotizacion.estado}

                      </td>


                      <td>

                        {
                          new Date(
                            cotizacion.fechaCreacion
                          ).toLocaleDateString()
                        }

                      </td>


                    </tr>


                  ))
                }


              </tbody>


            </table>


          </div>


        </section>


      </section>


    </main>
  );
};


export default DashboardInstitucion;