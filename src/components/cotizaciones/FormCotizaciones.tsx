import { useEffect, useState } from "react";

import type {
  Cotizacion,
  FormCotizacion,
  EstadoCotizacion
} from "../../types/Cotizacion";

interface Props {
  cotizacion?: Cotizacion | null;
  onGuardar: (data: FormCotizacion) => Promise<void>;
  onCancelar: () => void;
}

const estados: EstadoCotizacion[] = [
  "ENVIADA",
  "ACEPTADA",
  "RECHAZADA",
  "CANCELADA"
];

const monedas = [
  "ARS",
  "USD",
  "EUR"
];

const FormCotizaciones = ({
  cotizacion,
  onGuardar,
  onCancelar
}: Props) => {

  const [form, setForm] = useState<FormCotizacion>({
    solicitudId: 0,
    proveedorId: 0,
    precio: 0,
    moneda: "ARS",
    tiempoEntrega: "",
    garantia: "",
    observaciones: "",
    incluyeEnvio: false,
    estado: "ENVIADA"
  });

  useEffect(() => {

    if (cotizacion) {

      setForm({

        solicitudId: cotizacion.solicitudId,

        proveedorId: cotizacion.proveedorId,

        precio: cotizacion.precio,

        moneda: cotizacion.moneda,

        tiempoEntrega: cotizacion.tiempoEntrega ?? "",

        garantia: cotizacion.garantia ?? "",

        observaciones: cotizacion.observaciones ?? "",

        incluyeEnvio: cotizacion.incluyeEnvio,

        estado: cotizacion.estado

      });

    } else {

      setForm({

        solicitudId: 0,

        proveedorId: 0,

        precio: 0,

        moneda: "ARS",

        tiempoEntrega: "",

        garantia: "",

        observaciones: "",

        incluyeEnvio: false,

        estado: "ENVIADA"

      });

    }

  }, [cotizacion]);

  const cambiar = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value, type } = e.target;

    if (type === "checkbox") {

      const checked = (e.target as HTMLInputElement).checked;

      setForm({
        ...form,
        [name]: checked
      });

      return;

    }

    switch (name) {

      case "solicitudId":
      case "proveedorId":
      case "precio":

        setForm({
          ...form,
          [name]: Number(value)
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
            Solicitud ID
          </label>

          <input
            type="number"
            name="solicitudId"
            value={form.solicitudId}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Proveedor ID
          </label>

          <input
            type="number"
            name="proveedorId"
            value={form.proveedorId}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Precio
          </label>

          <input
            type="number"
            step="0.01"
            name="precio"
            value={form.precio}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Moneda
          </label>

          <select
            name="moneda"
            value={form.moneda}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          >

            {monedas.map((moneda) => (

              <option
                key={moneda}
                value={moneda}
              >
                {moneda}
              </option>

            ))}

          </select>

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Tiempo de entrega
          </label>

          <input
            name="tiempoEntrega"
            value={form.tiempoEntrega}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Garantía
          </label>

          <input
            name="garantia"
            value={form.garantia}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Observaciones
        </label>

        <textarea
          name="observaciones"
          value={form.observaciones}
          onChange={cambiar}
          rows={4}
          className="w-full rounded-xl border p-3"
        />

      </div>

      <div className="flex items-center gap-3">

        <input
          id="incluyeEnvio"
          type="checkbox"
          name="incluyeEnvio"
          checked={form.incluyeEnvio}
          onChange={cambiar}
        />

        <label htmlFor="incluyeEnvio">
          Incluye envío
        </label>

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
          Guardar cotización
        </button>

      </div>

    </form>

  );

};

export default FormCotizaciones;