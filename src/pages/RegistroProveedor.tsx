import { useState } from "react";

const RegistroProveedor = () => {
  const [form, setForm] = useState({
    razonSocial: "",
    nombreComercial: "",
    cuit: "",
    email: "",
    telefono: "",
    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    sitioWeb: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Proveedor registrado:", form);
    // Aquí luego llamás a tu API
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">

      <h1 className="text-4xl font-bold text-slate-900">
        Registro de Proveedor
      </h1>

      <p className="mt-3 text-slate-600">
        Registra tu empresa para comenzar a recibir solicitudes de cotización
        de instituciones de salud.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >

        {/* Empresa */}
        <div className="grid gap-4 md:grid-cols-2">

          <input
            name="razonSocial"
            placeholder="Razón social"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="nombreComercial"
            placeholder="Nombre comercial"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            required
          />

        </div>

        {/* CUIT */}
        <input
          name="cuit"
          placeholder="CUIT"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          onChange={handleChange}
          required
        />

        {/* Contacto */}
        <div className="grid gap-4 md:grid-cols-2">

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
            onChange={handleChange}
            required
          />

        </div>

        {/* Ubicación */}
        <div className="grid gap-4 md:grid-cols-3">

          <input
            name="pais"
            placeholder="País"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="provincia"
            placeholder="Provincia"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="ciudad"
            placeholder="Ciudad"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

        </div>

        <input
          name="direccion"
          placeholder="Dirección"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          onChange={handleChange}
        />

        {/* Web */}
        <input
          name="sitioWeb"
          placeholder="Sitio web (opcional)"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          onChange={handleChange}
        />

        {/* Password */}
        <div className="grid gap-4 md:grid-cols-2">

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Registrar proveedor
        </button>

      </form>
    </main>
  );
};

export default RegistroProveedor;