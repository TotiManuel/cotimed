import type { Equipamiento } from "../../types/Equipamiento";

interface Props {

  equipamiento: Equipamiento;

  onEdit: (equipamiento: Equipamiento) => void;

  onDelete: (id: number) => void;

}

const CardEquipamientos = ({

  equipamiento,

  onEdit,

  onDelete

}: Props) => {

  const precio =

    equipamiento.precio == null

      ? "Sin precio"

      : `${equipamiento.moneda} ${Number(equipamiento.precio).toLocaleString("es-AR")}`;

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

      <div className="mb-4">

        <div className="flex items-start justify-between">

          <h2 className="text-xl font-bold text-slate-900">

            {equipamiento.nombre}

          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              equipamiento.activo
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {equipamiento.activo ? "Activo" : "Inactivo"}
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-500">

          {equipamiento.categoria}

        </p>

      </div>

      <div className="space-y-2 text-sm text-slate-700">

        {equipamiento.marca && (

          <p>

            <span className="font-semibold">

              Marca:

            </span>{" "}

            {equipamiento.marca}

          </p>

        )}

        {equipamiento.modelo && (

          <p>

            <span className="font-semibold">

              Modelo:

            </span>{" "}

            {equipamiento.modelo}

          </p>

        )}

        <p>

          <span className="font-semibold">

            Precio:

          </span>{" "}

          {precio}

        </p>

        <p>

          <span className="font-semibold">

            Stock:

          </span>{" "}

          {equipamiento.stock}

        </p>

        <p>

          <span className="font-semibold">

            Proveedor ID:

          </span>{" "}

          {equipamiento.proveedorId}

        </p>

        {equipamiento.descripcion && (

          <div>

            <p className="font-semibold mb-1">

              Descripción

            </p>

            <p className="text-slate-600">

              {equipamiento.descripcion}

            </p>

          </div>

        )}

        {equipamiento.imagen && (

          <img

            src={equipamiento.imagen}

            alt={equipamiento.nombre}

            className="
            mt-3
            h-40
            w-full
            rounded-xl
            border
            object-cover
            "

          />

        )}

      </div>

      <div className="mt-6 flex gap-3">

        <button

          onClick={() => onEdit(equipamiento)}

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

          onClick={() => onDelete(equipamiento.id)}

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

export default CardEquipamientos;