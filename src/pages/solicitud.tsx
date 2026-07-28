const Solicitud = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Encabezado */}
      <section className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Solicitudes
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Administra las solicitudes de compra generadas por las instituciones,
            realiza su seguimiento y consulta su estado antes de iniciar el
            proceso de cotización.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
          Nueva solicitud
        </button>
      </section>

      {/* Estadísticas */}
      <section className="mb-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Solicitudes</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">24</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Nuevas</p>
          <h2 className="mt-2 text-3xl font-bold text-blue-600">9</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">En revisión</p>
          <h2 className="mt-2 text-3xl font-bold text-amber-500">10</h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Aprobadas</p>
          <h2 className="mt-2 text-3xl font-bold text-green-600">5</h2>
        </div>

      </section>

      {/* Tabla */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-6 py-4">Solicitud</th>
              <th className="px-6 py-4">Institución</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4">Prioridad</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>

            {[
              {
                id: "SOL-0001",
                institucion: "Hospital Central",
                fecha: "10/07/2026",
                prioridad: "Alta",
                estado: "Nueva"
              },
              {
                id: "SOL-0002",
                institucion: "Clínica San Martín",
                fecha: "08/07/2026",
                prioridad: "Media",
                estado: "En revisión"
              },
              {
                id: "SOL-0003",
                institucion: "Laboratorio BioLab",
                fecha: "05/07/2026",
                prioridad: "Baja",
                estado: "Aprobada"
              }

            ].map((item) => (

              <tr
                key={item.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-6 py-5 font-medium">
                  {item.id}
                </td>

                <td className="px-6 py-5">
                  {item.institucion}
                </td>

                <td className="px-6 py-5">
                  {item.fecha}
                </td>

                <td className="px-6 py-5">
                  {item.prioridad}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
                      ${
                        item.estado === "Nueva"
                          ? "bg-blue-100 text-blue-700"
                          : item.estado === "En revisión"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {item.estado}
                  </span>

                </td>

                <td className="px-6 py-5 text-right">

                  <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100">
                    Ver detalle
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>

    </main>
  );
};

export default Solicitud;