const Equipamiento = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Encabezado */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Equipamiento médico
        </h1>

        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Explora las categorías de equipamiento disponibles y crea solicitudes
          de cotización dirigidas a proveedores especializados.
        </p>
      </section>

      {/* Buscador y filtros */}
      <section className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row">

        <input
          type="text"
          placeholder="Buscar equipamiento..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <select className="rounded-xl border border-slate-300 px-4 py-3">
          <option>Todas las categorías</option>
          <option>Diagnóstico</option>
          <option>Monitoreo</option>
          <option>Quirófano</option>
          <option>Laboratorio</option>
          <option>Imágenes</option>
          <option>Mobiliario</option>
        </select>

      </section>

      {/* Categorías */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {[
          {
            nombre: "Monitores Multiparamétricos",
            descripcion:
              "Equipos para el monitoreo continuo de signos vitales."
          },
          {
            nombre: "Respiradores",
            descripcion:
              "Ventiladores mecánicos para terapia intensiva."
          },
          {
            nombre: "Bombas de Infusión",
            descripcion:
              "Administración precisa y controlada de medicamentos."
          },
          {
            nombre: "Ecógrafos",
            descripcion:
              "Equipos de diagnóstico por ultrasonido."
          },
          {
            nombre: "Electrocardiógrafos",
            descripcion:
              "Registro y análisis de la actividad eléctrica cardíaca."
          },
          {
            nombre: "Equipamiento de Laboratorio",
            descripcion:
              "Analizadores, centrífugas e instrumental especializado."
          },
        ].map((item) => (
          <article
            key={item.nombre}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-3xl">
              🏥
            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              {item.nombre}
            </h2>

            <p className="mt-3 text-slate-600">
              {item.descripcion}
            </p>

            <button className="mt-6 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
              Solicitar cotización
            </button>
          </article>
        ))}

      </section>

    </main>
  );
};

export default Equipamiento;