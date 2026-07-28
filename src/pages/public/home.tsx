const Home = () => {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">

      {/* Hero */}
      <section className="text-center">
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          Plataforma B2B para el sector salud
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
          Centraliza la compra de equipamiento médico
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Conectamos hospitales, clínicas, laboratorios y consultorios con
          proveedores especializados mediante un proceso organizado de
          solicitud, recepción y comparación de cotizaciones.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Crear solicitud
          </button>

          <button className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
            Conocer más
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="mt-24 grid gap-8 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-5 text-4xl">📄</div>

          <h3 className="mb-3 text-xl font-semibold text-slate-900">
            Solicitudes
          </h3>

          <p className="text-slate-600">
            Crea solicitudes de cotización de forma rápida y envíalas a los
            proveedores adecuados.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-5 text-4xl">📨</div>

          <h3 className="mb-3 text-xl font-semibold text-slate-900">
            Cotizaciones
          </h3>

          <p className="text-slate-600">
            Recibe múltiples propuestas comerciales desde un único lugar.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-5 text-4xl">📊</div>

          <h3 className="mb-3 text-xl font-semibold text-slate-900">
            Comparación
          </h3>

          <p className="text-slate-600">
            Analiza precios, disponibilidad y condiciones comerciales para
            tomar mejores decisiones.
          </p>
        </div>

      </section>

      {/* Flujo */}
      <section className="mt-28">

        <h2 className="text-center text-3xl font-bold text-slate-900">
          ¿Cómo funciona?
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-4">

          {[
            {
              n: "1",
              title: "Crear solicitud",
              text: "Describe el equipamiento médico que necesitas."
            },
            {
              n: "2",
              title: "Enviar",
              text: "Los proveedores reciben automáticamente la solicitud."
            },
            {
              n: "3",
              title: "Comparar",
              text: "Analiza todas las cotizaciones desde un mismo lugar."
            },
            {
              n: "4",
              title: "Decidir",
              text: "Selecciona la propuesta más conveniente."
            }
          ].map((step) => (
            <div key={step.n} className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {step.n}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {step.text}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="mt-28 rounded-3xl bg-slate-50 px-8 py-16 text-center">

        <h2 className="text-3xl font-bold text-slate-900">
          Optimiza el proceso de compra de tu institución
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Gestiona solicitudes, recibe cotizaciones y compara propuestas de
          forma centralizada para tomar decisiones más rápidas, eficientes y
          transparentes.
        </p>

        <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
          Comenzar ahora
        </button>

      </section>

    </main>
  );
};

export default Home;