import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { obtenerDashboardProveedor } from "../../service/dashboardProveedor.service";



const DashboardProveedor = () => {


  const { usuario } = useAuth();


  const [datos,setDatos] = useState<any>(null);



  useEffect(()=>{


    if(usuario?.id){


      obtenerDashboardProveedor()

      .then(setDatos)

      .catch(error =>

        console.error(

          "Error cargando dashboard proveedor:",

          error

        )

      );


    }


  },[usuario]);







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

            Panel de Proveedor

          </h1>



          <p className="mt-2 text-slate-600">

            Bienvenido, {usuario?.nombre}

          </p>


        </div>







        {/* Estadísticas */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">



          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Solicitudes recibidas

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.solicitudesRecibidas}

            </h2>


          </div>






          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm font-medium text-slate-500">

              Cotizaciones enviadas

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.cotizacionesEnviadas}

            </h2>


          </div>







          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


            <p className="text-sm font-medium text-slate-500">

              Cotizaciones aprobadas

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.cotizacionesAprobadas}

            </h2>


          </div>







          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">


            <p className="text-sm font-medium text-slate-500">

              Productos publicados

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900">

              {datos.productosPublicados}

            </h2>


          </div>



        </div>









        {/* Acciones rápidas */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">

            Acciones rápidas

          </h2>





          <div className="grid gap-4 md:grid-cols-4">


            <button className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">

              Nueva cotización

            </button>




            <button className="rounded-lg bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-800">

              Gestionar productos

            </button>




            <button className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-100">

              Ver solicitudes

            </button>




            <button className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-100">

              Editar perfil

            </button>


          </div>


        </section>









        {/* Solicitudes disponibles */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <div className="mb-6 flex items-center justify-between">


            <h2 className="text-2xl font-bold text-slate-900">

              Solicitudes disponibles

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

                  className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between"

                >


                  <div>


                    <h3 className="font-semibold text-slate-900">

                      {solicitud.titulo}

                    </h3>



                    <p className="text-sm text-slate-500">

                      {solicitud.descripcion}

                    </p>


                  </div>




                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">

                    Cotizar

                  </button>


                </div>


              ))
            }


          </div>


        </section>









        {/* Mis cotizaciones */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">

            Mis cotizaciones recientes

          </h2>





          <div className="overflow-x-auto">


            <table className="w-full text-left">


              <thead>


                <tr className="border-b text-sm text-slate-500">


                  <th className="pb-3">

                    Producto

                  </th>


                  <th className="pb-3">

                    Institución

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

                        {
                          cotizacion.solicitud.institucion.nombre
                        }

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









        {/* Rendimiento */}

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">

            Rendimiento del proveedor

          </h2>





          <div className="grid gap-6 md:grid-cols-3">


            <div>


              <p className="text-sm text-slate-500">

                Tasa de aprobación

              </p>


              <p className="mt-2 text-3xl font-bold">

                {datos.tasaAprobacion}%

              </p>


            </div>





            <div>


              <p className="text-sm text-slate-500">

                Tiempo promedio de respuesta

              </p>


              <p className="mt-2 text-3xl font-bold">

                {datos.tiempoRespuesta}

              </p>


            </div>





            <div>


              <p className="text-sm text-slate-500">

                Valoraciones

              </p>


              <p className="mt-2 text-3xl font-bold">

                ★ {datos.valoracion}

              </p>


            </div>



          </div>


        </section>



      </section>


    </main>
  );
};



export default DashboardProveedor;