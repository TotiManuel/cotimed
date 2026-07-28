import { useAuth } from "../../context/AuthContext";

const DashboardEmpleado = () => {

  const { usuario } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">

      <section className="mx-auto max-w-7xl">

        {/* Encabezado */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-900">
            Panel de Empleado
          </h1>

          <p className="mt-2 text-slate-600">
            Bienvenido, {usuario?.nombre}
          </p>

        </div>


        {/* Tarjetas */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">


          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">

            <h2 className="text-sm font-medium text-slate-500">
              Solicitudes pendientes
            </h2>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              12
            </p>

          </div>



          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">

            <h2 className="text-sm font-medium text-slate-500">
              Cotizaciones en revisión
            </h2>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              5
            </p>

          </div>



          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">

            <h2 className="text-sm font-medium text-slate-500">
              Proveedores activos
            </h2>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              34
            </p>

          </div>



          <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">

            <h2 className="text-sm font-medium text-slate-500">
              Tareas asignadas
            </h2>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              8
            </p>

          </div>


        </div>



        {/* Acciones rápidas */}
        <section className="mt-10 rounded-xl bg-white p-8 shadow-sm border border-slate-200">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Acciones rápidas
          </h2>


          <div className="grid gap-4 md:grid-cols-3">


            <button className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">

              Crear solicitud

            </button>



            <button className="rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-slate-800">

              Revisar cotizaciones

            </button>



            <button className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-100">

              Ver proveedores

            </button>


          </div>


        </section>



        {/* Actividad reciente */}
        <section className="mt-10 rounded-xl bg-white p-8 shadow-sm border border-slate-200">


          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Actividad reciente
          </h2>


          <div className="space-y-4">


            <div className="flex justify-between border-b pb-3">

              <span>
                Solicitud de equipamiento médico creada
              </span>

              <span className="text-sm text-slate-500">
                Hace 2 horas
              </span>

            </div>



            <div className="flex justify-between border-b pb-3">

              <span>
                Cotización aprobada
              </span>

              <span className="text-sm text-slate-500">
                Ayer
              </span>

            </div>



            <div className="flex justify-between">

              <span>
                Nuevo proveedor registrado
              </span>

              <span className="text-sm text-slate-500">
                Hace 3 días
              </span>

            </div>


          </div>


        </section>


      </section>


    </main>
  );
};


export default DashboardEmpleado;