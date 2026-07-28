import { useState } from "react";

import { useEquipamientos } from "../../hooks/useEquipamientos";

import CardEquipamientos from "../../components/equipamientos/CardEquipamientos";
import FormEquipamientos from "../../components/equipamientos/FormEquipamientos";

import type {
  Equipamiento,
  FormEquipamiento,
} from "../../types/Equipamiento";

const Equipamientos = () => {
  const {
    equipamientos,
    cargando,
    crear,
    actualizar,
    eliminar,
  } = useEquipamientos();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [equipamientoEditar, setEquipamientoEditar] =
    useState<Equipamiento | null>(null);

  const nuevoEquipamiento = () => {
    setEquipamientoEditar(null);
    setMostrarFormulario(true);
  };

  const editarEquipamiento = (equipamiento: Equipamiento) => {
    setEquipamientoEditar(equipamiento);
    setMostrarFormulario(true);
  };

  const cancelar = () => {
    setEquipamientoEditar(null);
    setMostrarFormulario(false);
  };

  const guardar = async (datos: FormEquipamiento) => {
    if (equipamientoEditar) {
      await actualizar(equipamientoEditar.id, datos);
    } else {
      await crear(datos);
    }

    cancelar();
  };

  const borrar = async (id: number) => {
    const confirmar = window.confirm(
      "¿Seguro que desea eliminar este equipamiento?"
    );

    if (!confirmar) return;

    await eliminar(id);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Título */}
      <section className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Equipamientos
          </h1>

          <p className="mt-2 text-slate-600">
            Administración del equipamiento médico.
          </p>
        </div>

        <button
          onClick={nuevoEquipamiento}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Nuevo equipamiento
        </button>
      </section>

      {/* Formulario */}
      {mostrarFormulario && (
        <section className="mb-10 rounded-2xl border bg-white p-6 shadow">
          <FormEquipamientos
            equipamiento={equipamientoEditar}
            onGuardar={guardar}
            onCancelar={cancelar}
          />
        </section>
      )}

      {/* Listado */}
      {cargando ? (
        <p className="text-slate-500">
          Cargando equipamientos...
        </p>
      ) : equipamientos.length === 0 ? (
        <div className="rounded-xl border bg-slate-50 p-10 text-center text-slate-500">
          No hay equipamientos registrados.
        </div>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipamientos.map((equipamiento) => (
            <CardEquipamientos
              key={equipamiento.id}
              equipamiento={equipamiento}
              onEdit={editarEquipamiento}
              onDelete={borrar}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default Equipamientos;