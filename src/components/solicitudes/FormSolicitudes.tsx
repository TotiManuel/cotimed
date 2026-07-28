import { useEffect, useState } from "react";

import type {
  Solicitud,
  FormSolicitud,
  EstadoSolicitud
} from "../../types/Solicitud";

interface Props {
  solicitud?: Solicitud | null;
  onGuardar: (data: FormSolicitud) => Promise<void>;
  onCancelar: () => void;
}

const estados: EstadoSolicitud[] = [
  "PENDIENTE",
  "ABIERTA",
  "EN_PROCESO",
  "COTIZADA",
  "FINALIZADA",
  "CANCELADA"
];

const FormSolicitudes = ({
  solicitud,
  onGuardar,
  onCancelar
}: Props) => {

  const [form, setForm] = useState<FormSolicitud>({

    institucionId: 0,

    titulo: "",

    descripcion: "",

    categoria: "",

    cantidad: 1,

    marcaPreferida: "",

    modeloPreferido: "",

    presupuestoMax: undefined,

    fechaNecesidad: "",

    archivoAdjunto: "",

    estado: "PENDIENTE"

  });

  useEffect(() => {

    if (solicitud) {

      setForm({

        institucionId: solicitud.institucionId,

        titulo: solicitud.titulo,

        descripcion: solicitud.descripcion,

        categoria: solicitud.categoria,

        cantidad: solicitud.cantidad,

        marcaPreferida: solicitud.marcaPreferida ?? "",

        modeloPreferido: solicitud.modeloPreferido ?? "",

        presupuestoMax: solicitud.presupuestoMax,

        fechaNecesidad: solicitud.fechaNecesidad
          ? solicitud.fechaNecesidad.substring(0, 10)
          : "",

        archivoAdjunto: solicitud.archivoAdjunto ?? "",

        estado: solicitud.estado

      });

    } else {

      setForm({

        institucionId: 0,

        titulo: "",

        descripcion: "",

        categoria: "",

        cantidad: 1,

        marcaPreferida: "",

        modeloPreferido: "",

        presupuestoMax: undefined,

        fechaNecesidad: "",

        archivoAdjunto: "",

        estado: "PENDIENTE"

      });

    }

  }, [solicitud]);

  const cambiar = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    switch (name) {

      case "institucionId":
        setForm({
          ...form,
          institucionId: Number(value)
        });
        break;

      case "cantidad":
        setForm({
          ...form,
          cantidad: Number(value)
        });
        break;

      case "presupuestoMax":
        setForm({
          ...form,
          presupuestoMax:
            value === ""
              ? undefined
              : Number(value)
        });
        break;

      default:
        setForm({
          ...form,
          [name]: value
        });

    }

  };

  const enviar = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    await onGuardar(form);

  };

  return (

    <form
      onSubmit={enviar}
      className="space-y-5"
    >

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Institución ID
          </label>

          <input
            type="number"
            name="institucionId"
            value={form.institucionId}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Categoría
          </label>

          <input
            name="categoria"
            value={form.categoria}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Título
        </label>

        <input
          name="titulo"
          value={form.titulo}
          onChange={cambiar}
          required
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Descripción
        </label>

        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={cambiar}
          rows={4}
          required
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Cantidad
          </label>

          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={cambiar}
            min={1}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Presupuesto máximo
          </label>

          <input
            type="number"
            step="0.01"
            name="presupuestoMax"
            value={form.presupuestoMax ?? ""}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Marca preferida
          </label>

          <input
            name="marcaPreferida"
            value={form.marcaPreferida}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Modelo preferido
          </label>

          <input
            name="modeloPreferido"
            value={form.modeloPreferido}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Fecha de necesidad
          </label>

          <input
            type="date"
            name="fechaNecesidad"
            value={form.fechaNecesidad ?? ""}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Archivo adjunto (URL)
          </label>

          <input
            name="archivoAdjunto"
            value={form.archivoAdjunto}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Estado
        </label>

        <select
          name="estado"
          value={form.estado}
          onChange={cambiar}
          className="w-full rounded-xl border p-3"
        >

          {estados.map((estado) => (

            <option
              key={estado}
              value={estado}
            >
              {estado}
            </option>

          ))}

        </select>

      </div>

      <div className="flex justify-end gap-3 pt-4">

        <button
          type="button"
          onClick={onCancelar}
          className="rounded-xl border px-6 py-3"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Guardar solicitud
        </button>

      </div>

    </form>

  );

};

export default FormSolicitudes;