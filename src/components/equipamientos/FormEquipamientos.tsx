import { useEffect, useState } from "react";

import type {
  Equipamiento,
  FormEquipamiento
} from "../../types/Equipamiento";

interface Props {
  equipamiento?: Equipamiento | null;
  onGuardar: (data: FormEquipamiento) => Promise<void>;
  onCancelar: () => void;
}

const monedas = [
  "ARS",
  "USD",
  "EUR"
];

const FormEquipamientos = ({

  equipamiento,

  onGuardar,

  onCancelar

}: Props) => {

  const [form, setForm] = useState<FormEquipamiento>({

    proveedorId: 0,

    nombre: "",

    descripcion: "",

    categoria: "",

    marca: "",

    modelo: "",

    precio: undefined,

    moneda: "ARS",

    stock: 0,

    imagen: "",

    activo: true

  });


  useEffect(() => {

    if (equipamiento) {

      setForm({

        proveedorId: equipamiento.proveedorId,

        nombre: equipamiento.nombre,

        descripcion: equipamiento.descripcion ?? "",

        categoria: equipamiento.categoria,

        marca: equipamiento.marca ?? "",

        modelo: equipamiento.modelo ?? "",

        precio: equipamiento.precio,

        moneda: equipamiento.moneda,

        stock: equipamiento.stock,

        imagen: equipamiento.imagen ?? "",

        activo: equipamiento.activo

      });

    } else {

      setForm({

        proveedorId: 0,

        nombre: "",

        descripcion: "",

        categoria: "",

        marca: "",

        modelo: "",

        precio: undefined,

        moneda: "ARS",

        stock: 0,

        imagen: "",

        activo: true

      });

    }

  }, [equipamiento]);


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

    if (name === "proveedorId") {

      setForm({
        ...form,
        proveedorId: Number(value)
      });

      return;
    }

    if (name === "precio") {

      setForm({
        ...form,
        precio: value === "" ? undefined : Number(value)
      });

      return;
    }

    if (name === "stock") {

      setForm({
        ...form,
        stock: Number(value)
      });

      return;
    }

    setForm({

      ...form,

      [name]: value

    });

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

        <div>

          <label className="mb-2 block font-medium">
            Nombre
          </label>

          <input
            name="nombre"
            value={form.nombre}
            onChange={cambiar}
            required
            className="w-full rounded-xl border p-3"
          />

        </div>

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

      <div className="grid gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Marca
          </label>

          <input
            name="marca"
            value={form.marca}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Modelo
          </label>

          <input
            name="modelo"
            value={form.modelo}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        <div>

          <label className="mb-2 block font-medium">
            Precio
          </label>

          <input
            type="number"
            step="0.01"
            name="precio"
            value={form.precio ?? ""}
            onChange={cambiar}
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

            {monedas.map((m) => (

              <option
                key={m}
                value={m}
              >
                {m}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={cambiar}
            className="w-full rounded-xl border p-3"
          />

        </div>

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Imagen (URL)
        </label>

        <input
          name="imagen"
          value={form.imagen}
          onChange={cambiar}
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
          className="w-full rounded-xl border p-3"
        />

      </div>

      <label className="flex items-center gap-2">

        <input
          type="checkbox"
          name="activo"
          checked={form.activo}
          onChange={cambiar}
        />

        Activo

      </label>

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
          Guardar equipamiento
        </button>

      </div>

    </form>

  );

};

export default FormEquipamientos;