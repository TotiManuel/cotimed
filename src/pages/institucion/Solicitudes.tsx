import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import {
  obtenerSolicitudes,
  eliminarSolicitud
} from "../../service/solicitud.service";

import type {
  Solicitud
} from "../../types/Solicitud";



const SolicitudesInstitucion = () => {


  const navigate = useNavigate();


  const [solicitudes,setSolicitudes] =
    useState<Solicitud[]>([]);


  const [cargando,setCargando] =
    useState(true);



  const cargarSolicitudes = async()=>{


    try{


      const data =
        await obtenerSolicitudes();


      setSolicitudes(data);


    }catch(error){


      console.error(
        "Error cargando solicitudes",
        error
      );


    }finally{


      setCargando(false);


    }


  };




  useEffect(()=>{


    cargarSolicitudes();


  },[]);






  const eliminar = async(id:number)=>{


    const confirmar =
      window.confirm(
        "¿Eliminar esta solicitud?"
      );


    if(!confirmar)
      return;



    try{


      await eliminarSolicitud(id);


      cargarSolicitudes();



    }catch(error){


      console.error(
        "Error eliminando solicitud",
        error
      );


    }


  };






  if(cargando){


    return (

      <DashboardLayout

        titulo="Solicitudes"

        subtitulo="Gestiona las solicitudes de tu institución."

      >

        <p className="text-slate-600">

          Cargando solicitudes...

        </p>


      </DashboardLayout>

    );


  }







  return (


    <DashboardLayout

      titulo="Solicitudes"

      subtitulo="Gestiona las solicitudes de tu institución."

    >



      <div className="mb-6">


        <button

          onClick={()=>navigate(
            "/institucion/solicitudes/nueva"
          )}

          className="rounded-lg bg-blue-600 px-5 py-3 text-white"

        >

          Nueva solicitud

        </button>


      </div>







      <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">



        <table className="w-full text-left">


          <thead className="border-b bg-slate-50">


            <tr>


              <th className="p-4">

                Título

              </th>


              <th className="p-4">

                Categoría

              </th>


              <th className="p-4">

                Cantidad

              </th>


              <th className="p-4">

                Estado

              </th>


              <th className="p-4">

                Fecha

              </th>


              <th className="p-4">

                Acciones

              </th>


            </tr>


          </thead>





          <tbody>


          {
            solicitudes.map((solicitud)=>(


              <tr

                key={solicitud.id}

                className="border-b"

              >



                <td className="p-4">

                  {solicitud.titulo}

                </td>



                <td className="p-4">

                  {solicitud.categoria}

                </td>



                <td className="p-4">

                  {solicitud.cantidad}

                </td>




                <td className="p-4">

                  {solicitud.estado}

                </td>




                <td className="p-4">

                  {
                    new Date(
                      solicitud.fechaCreacion
                    ).toLocaleDateString()
                  }

                </td>




                <td className="p-4">


                  <div className="flex gap-3">



                    <button

                      className="rounded-lg border px-3 py-2"

                    >

                      Ver

                    </button>




                    <button

                      onClick={()=>eliminar(
                        solicitud.id
                      )}

                      className="rounded-lg bg-red-600 px-3 py-2 text-white"

                    >

                      Eliminar

                    </button>



                  </div>


                </td>



              </tr>


            ))
          }


          </tbody>



        </table>



      </div>





      {
        solicitudes.length === 0 && (

          <p className="mt-6 text-slate-600">

            No hay solicitudes creadas.

          </p>

        )
      }




    </DashboardLayout>


  );


};



export default SolicitudesInstitucion;