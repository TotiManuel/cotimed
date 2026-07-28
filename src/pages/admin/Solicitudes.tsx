import { useState } from "react";

import { useSolicitudes } from "../../hooks/useSolicitudes";

import FormSolicitudes from "../../components/solicitudes/FormSolicitudes";
import CardSolicitud from "../../components/solicitudes/CardSolicitud";

import type {
  Solicitud,
  FormSolicitud
} from "../../types/Solicitud";

const Solicitudes = () => {

  const {

    solicitudes,

    cargando,

    crear,

    actualizar,

    eliminar

  } = useSolicitudes();

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [solicitudEditar, setSolicitudEditar] =
    useState<Solicitud | null>(null);

  const nuevaSolicitud = () => {

    setSolicitudEditar(null);

    setMostrarFormulario(true);

  };

  const editarSolicitud = (

    solicitud: Solicitud

  ) => {

    setSolicitudEditar(solicitud);

    setMostrarFormulario(true);

  };

  const cancelar = () => {

    setSolicitudEditar(null);

    setMostrarFormulario(false);

  };

  const guardar = async (

    datos: FormSolicitud

  ) => {

    if (solicitudEditar) {

      await actualizar(

        solicitudEditar.id,

        datos

      );

    } else {

      await crear(datos);

    }

    cancelar();

  };

  const borrar = async (

    id: number

  ) => {

    const confirmar = window.confirm(

      "¿Seguro que desea eliminar esta solicitud?"

    );

    if (!confirmar) return;

    await eliminar(id);

  };

  return (

    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Encabezado */}

      <section className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">

            Solicitudes

          </h1>

          <p className="mt-2 text-slate-600">

            Administración de solicitudes de compra.

          </p>

        </div>

        <button

          onClick={nuevaSolicitud}

          className="
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-semibold
            text-white
            hover:bg-blue-700
          "

        >

          + Nueva solicitud

        </button>

      </section>

      {/* Formulario */}

      {

        mostrarFormulario && (

          <section
            className="
              mb-10
              rounded-2xl
              border
              bg-white
              p-6
              shadow
            "
          >

            <FormSolicitudes

              solicitud={solicitudEditar}

              onGuardar={guardar}

              onCancelar={cancelar}

            />

          </section>

        )

      }

      {/* Listado */}

      {

        cargando ? (

          <p className="text-slate-500">

            Cargando solicitudes...

          </p>

        ) : solicitudes.length === 0 ? (

          <div
            className="
              rounded-xl
              border
              bg-slate-50
              p-10
              text-center
              text-slate-500
            "
          >

            No hay solicitudes registradas.

          </div>

        ) : (

          <section
            className="
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >

            {

              solicitudes.map((solicitud) => (

                <CardSolicitud

                  key={solicitud.id}

                  solicitud={solicitud}

                  onEdit={editarSolicitud}

                  onDelete={borrar}

                />

              ))

            }

          </section>

        )

      }

    </main>

  );

};

export default Solicitudes;