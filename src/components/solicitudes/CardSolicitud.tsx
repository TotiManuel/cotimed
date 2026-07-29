import type { Solicitud } from "../../types/Solicitud";


interface Props {

  solicitud: Solicitud;

  onEdit: (solicitud: Solicitud) => void;

  onDelete: (id:number) => void;

}



const CardSolicitud = ({

  solicitud,

  onEdit,

  onDelete

}:Props)=>{



  const presupuesto =

    solicitud.presupuestoMax == null

      ? "Sin presupuesto"

      : `$ ${Number(
          solicitud.presupuestoMax
        ).toLocaleString("es-AR")}`;



  const estadoColor = ()=>{


    switch(solicitud.estado){


      case "PENDIENTE":

        return "bg-yellow-100 text-yellow-700";



      case "ENVIADA":

        return "bg-blue-100 text-blue-700";



      case "RECIBIENDO_COTIZACIONES":

        return "bg-purple-100 text-purple-700";



      case "CERRADA":

        return "bg-green-100 text-green-700";



      case "CANCELADA":

        return "bg-red-100 text-red-700";



      default:

        return "bg-gray-100 text-gray-700";


    }


  };




  return (


    <article

      className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      transition
      hover:shadow-md
      "

    >



      <div className="mb-4 flex items-start justify-between">


        <div>


          <h2 className="text-xl font-bold text-slate-900">

            {solicitud.titulo}

          </h2>



          <p className="mt-1 text-sm text-slate-500">

            {solicitud.categoria}

          </p>


        </div>





        <span

          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${estadoColor()}
          `}

        >

          {solicitud.estado}


        </span>



      </div>







      <div className="space-y-2 text-sm text-slate-700">





        <p>

          <span className="font-semibold">

            Cantidad:

          </span>{" "}

          {solicitud.cantidad}


        </p>





        <p>

          <span className="font-semibold">

            Presupuesto:

          </span>{" "}

          {presupuesto}


        </p>





        {
          solicitud.marcaPreferida && (

            <p>

              <span className="font-semibold">

                Marca preferida:

              </span>{" "}

              {solicitud.marcaPreferida}

            </p>

          )
        }





        {
          solicitud.modeloPreferido && (

            <p>

              <span className="font-semibold">

                Modelo preferido:

              </span>{" "}

              {solicitud.modeloPreferido}

            </p>

          )
        }






        {
          solicitud.fechaNecesidad && (

            <p>

              <span className="font-semibold">

                Fecha necesidad:

              </span>{" "}


              {
                new Date(
                  solicitud.fechaNecesidad
                ).toLocaleDateString(
                  "es-AR"
                )
              }


            </p>


          )
        }







        <div>


          <p className="mb-1 font-semibold">

            Descripción

          </p>



          <p className="whitespace-pre-wrap text-slate-600">

            {solicitud.descripcion}

          </p>


        </div>






        {
          solicitud.archivoAdjunto && (


            <a

              href={
                solicitud.archivoAdjunto
              }

              target="_blank"

              rel="noreferrer"

              className="
              inline-block
              text-blue-600
              hover:underline
              "

            >

              Ver archivo adjunto


            </a>


          )
        }





      </div>







      <div className="mt-6 flex gap-3">



        <button

          onClick={()=>
            onEdit(solicitud)
          }

          className="
          flex-1
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          hover:bg-blue-700
          "

        >

          Editar


        </button>





        <button

          onClick={()=>
            onDelete(
              solicitud.id
            )
          }

          className="
          flex-1
          rounded-lg
          bg-red-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          hover:bg-red-700
          "

        >

          Eliminar


        </button>



      </div>





    </article>


  );


};



export default CardSolicitud;