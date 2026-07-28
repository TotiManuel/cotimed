const Institucion = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Encabezado */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Instituciones de Salud
        </h1>

        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Explora hospitales, clínicas, consultorios, laboratorios y demás
          organizaciones registradas en la plataforma que gestionan sus
          procesos de adquisición de equipamiento médico.
        </p>
      </section>

      {/* Buscador */}
      <section className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row">

        <input
          type="text"
          placeholder="Buscar institución..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
        />

        <select className="rounded-xl border border-slate-300 px-4 py-3">
          <option>Todos los tipos</option>
          <option>Hospital</option>
          <option>Clínica</option>
          <option>Consultorio</option>
          <option>Laboratorio</option>
          <option>Centro Médico</option>
        </select>

      </section>

      {/* Instituciones */}
      <section className="grid gap-6 lg:grid-cols-2">

        {[
          {
            nombre: "Hospital Central",
            tipo: "Hospital",
            ciudad: "Buenos Aires",
          },
          {
            nombre: "Clínica San Martín",
            tipo: "Clínica",
            ciudad: "Córdoba",
          },
          {
            nombre: "Laboratorio BioLab",
            tipo: "Laboratorio",
            ciudad: "Rosario",
          },
          {
            nombre: "Centro Médico Norte",
            tipo: "Centro Médico",
            ciudad: "Mendoza",
          },
        ].map((institucion) => (
          <article
            key={institucion.nombre}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {institucion.nombre}
                </h2>

                <p className="mt-2 text-slate-600">
                  {institucion.tipo}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📍 {institucion.ciudad}
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                Activa
              </span>

            </div>

            <div className="mt-6 flex gap-3">

              <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                Ver perfil
              </button>

              <button className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
                Ver solicitudes
              </button>

            </div>

          </article>
        ))}

      </section>

    </main>
  );
};

export default Institucion;