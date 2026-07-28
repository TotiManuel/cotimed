import type { Solicitud } from "../../types/Solicitud";

interface Props {

  solicitud: Solicitud;

  onEdit: (solicitud: Solicitud) => void;

  onDelete: (id: number) => void;

}

const CardSolicitud = ({

  solicitud,

  onEdit,

  onDelete

}: Props) => {

  const presupuesto =

    solicitud.presupuestoMax == null

      ? "Sin presupuesto"

      : `$ ${Number(solicitud.presupuestoMax).toLocaleString("es-AR")}`;

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
            ${
              solicitud.estado === "PENDIENTE"
                ? "bg-yellow-100 text-yellow-700"
                : solicitud.estado === "ABIERTA"
                ? "bg-blue-100 text-blue-700"
                : solicitud.estado === "EN_PROCESO"
                ? "bg-orange-100 text-orange-700"
                : solicitud.estado === "COTIZADA"
                ? "bg-purple-100 text-purple-700"
                : solicitud.estado === "FINALIZADA"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >

          {solicitud.estado}

        </span>

      </div>

      <div className="space-y-2 text-sm text-slate-700">

        <p>

          <span className="font-semibold">

            Institución ID:

          </span>{" "}

          {solicitud.institucionId}

        </p>

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

        {solicitud.marcaPreferida && (

          <p>

            <span className="font-semibold">

              Marca preferida:

            </span>{" "}

            {solicitud.marcaPreferida}

          </p>

        )}

        {solicitud.modeloPreferido && (

          <p>

            <span className="font-semibold">

              Modelo preferido:

            </span>{" "}

            {solicitud.modeloPreferido}

          </p>

        )}

        {solicitud.fechaNecesidad && (

          <p>

            <span className="font-semibold">

              Fecha necesidad:

            </span>{" "}

            {new Date(
              solicitud.fechaNecesidad
            ).toLocaleDateString("es-AR")}

          </p>

        )}

        <div>

          <p className="font-semibold mb-1">

            Descripción

          </p>

          <p className="text-slate-600 whitespace-pre-wrap">

            {solicitud.descripcion}

          </p>

        </div>

        {solicitud.archivoAdjunto && (

          <a

            href={solicitud.archivoAdjunto}

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

        )}

      </div>

      <div className="mt-6 flex gap-3">

        <button

          onClick={() => onEdit(solicitud)}

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

          onClick={() => onDelete(solicitud.id)}

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