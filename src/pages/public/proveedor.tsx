const Proveedor = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Encabezado */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">
          Proveedores
        </h1>

        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          Encuentra proveedores especializados en equipamiento médico y envía
          solicitudes de cotización de manera rápida y organizada.
        </p>
      </section>

      {/* Buscador */}
      <section className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row">

        <input
          type="text"
          placeholder="Buscar proveedor..."
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
        />

        <select className="rounded-xl border border-slate-300 px-4 py-3">
          <option>Todas las categorías</option>
          <option>Diagnóstico</option>
          <option>Laboratorio</option>
          <option>Monitoreo</option>
          <option>Quirófano</option>
          <option>Imágenes</option>
        </select>

      </section>

      {/* Lista */}
      <section className="grid gap-6 lg:grid-cols-2">

        {[
          {
            nombre: "Medical Solutions",
            categoria: "Diagnóstico por imágenes",
            ciudad: "Buenos Aires",
          },
          {
            nombre: "BioTech Equipamientos",
            categoria: "Laboratorio",
            ciudad: "Córdoba",
          },
          {
            nombre: "Hospital Supply",
            categoria: "Monitoreo y UTI",
            ciudad: "Rosario",
          },
          {
            nombre: "MedTech Argentina",
            categoria: "Quirófano",
            ciudad: "Mendoza",
          },
        ].map((proveedor) => (
          <article
            key={proveedor.nombre}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {proveedor.nombre}
                </h2>

                <p className="mt-2 text-slate-600">
                  {proveedor.categoria}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  📍 {proveedor.ciudad}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Disponible
              </span>

            </div>

            <div className="mt-6 flex gap-3">

              <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                Ver perfil
              </button>

              <button className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100">
                Solicitar cotización
              </button>

            </div>

          </article>
        ))}

      </section>

    </main>
  );
};

export default Proveedor;