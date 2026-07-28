import type { Cotizacion } from "../../types/Cotizacion";

interface Props {

  cotizacion: Cotizacion;

  onEdit: (cotizacion: Cotizacion) => void;

  onDelete: (id: number) => void;

}

const CardCotizaciones = ({

  cotizacion,

  onEdit,

  onDelete

}: Props) => {


  const precio =

    `${cotizacion.moneda} ${Number(cotizacion.precio).toLocaleString("es-AR")}`;


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

            Cotización #{cotizacion.id}

          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Solicitud ID: {cotizacion.solicitudId}

          </p>

        </div>


        <span
          className={`
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${
            cotizacion.estado === "ENVIADA"
              ? "bg-blue-100 text-blue-700"
              : cotizacion.estado === "ACEPTADA"
              ? "bg-green-100 text-green-700"
              : cotizacion.estado === "RECHAZADA"
              ? "bg-red-100 text-red-700"
              : "bg-slate-100 text-slate-700"
          }
          `}
        >

          {cotizacion.estado}

        </span>


      </div>


      <div className="space-y-2 text-sm text-slate-700">


        <p>

          <span className="font-semibold">

            Proveedor ID:

          </span>{" "}

          {cotizacion.proveedorId}

        </p>



        <p>

          <span className="font-semibold">

            Precio:

          </span>{" "}

          {precio}

        </p>



        {cotizacion.tiempoEntrega && (

          <p>

            <span className="font-semibold">

              Entrega:

            </span>{" "}

            {cotizacion.tiempoEntrega}

          </p>

        )}



        {cotizacion.garantia && (

          <p>

            <span className="font-semibold">

              Garantía:

            </span>{" "}

            {cotizacion.garantia}

          </p>

        )}



        <p>

          <span className="font-semibold">

            Incluye envío:

          </span>{" "}

          {cotizacion.incluyeEnvio
            ? "Sí"
            : "No"}

        </p>



        {cotizacion.observaciones && (

          <div>

            <p className="font-semibold mb-1">

              Observaciones

            </p>


            <p className="text-slate-600 whitespace-pre-wrap">

              {cotizacion.observaciones}

            </p>


          </div>

        )}



      </div>



      <div className="mt-6 flex gap-3">


        <button

          onClick={() => onEdit(cotizacion)}

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

          onClick={() => onDelete(cotizacion.id)}

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


export default CardCotizaciones;