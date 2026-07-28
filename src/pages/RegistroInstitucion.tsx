import { useState } from "react";

const RegistroInstitucion = () => {
  const [form, setForm] = useState({
    razonSocial: "",
    nombreComercial: "",
    tipoInstitucion: "",
    cuit: "",
    email: "",
    telefono: "",
    pais: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    responsableNombre: "",
    responsableCargo: "",
    responsableEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    console.log("Institución registrada:", form);
    // Aquí luego conectás con la API
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">

      <h1 className="text-4xl font-bold text-slate-900">
        Registro de Institución
      </h1>

      <p className="mt-3 text-slate-600">
        Registra tu institución para comenzar a solicitar cotizaciones de
        equipamiento médico a múltiples proveedores.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >

        {/* Institución */}
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

        {/* Tipo */}
        <select
          name="tipoInstitucion"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
          onChange={handleChange}
          required
        >
          <option value="">Tipo de institución</option>
          <option value="hospital">Hospital</option>
          <option value="clinica">Clínica</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="consultorio">Consultorio</option>
          <option value="centro_medico">Centro Médico</option>
        </select>

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
            placeholder="Email institucional"
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

        {/* Responsable */}
        <h2 className="text-lg font-semibold text-slate-800 pt-4">
          Responsable de compras
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          <input
            name="responsableNombre"
            placeholder="Nombre completo"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="responsableCargo"
            placeholder="Cargo (Ej: Director de compras)"
            className="rounded-xl border border-slate-300 px-4 py-3"
            onChange={handleChange}
            required
          />

        </div>

        <input
          name="responsableEmail"
          type="email"
          placeholder="Email del responsable"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          onChange={handleChange}
          required
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
          Registrar institución
        </button>

      </form>
    </main>
  );
};

export default RegistroInstitucion;