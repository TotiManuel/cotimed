import { useAuth } from "../../context/AuthContext";


const ConfiguracionInstitucion = () => {

  const { usuario } = useAuth();


  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <h1 className="text-4xl font-bold text-slate-900">
        Configuración Institución
      </h1>


      <p className="mt-2 text-slate-600">
        Configuración de la cuenta institucional
      </p>



      <div className="mt-8 grid gap-6 md:grid-cols-2">



        {/* Datos institucionales */}

        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-slate-900">
            Datos institucionales
          </h2>


          <p className="mt-3 text-slate-600">
            Administrar información del establecimiento.
          </p>


          <ul className="mt-4 space-y-2 text-sm text-slate-700">

            <li>
              Nombre: {usuario?.nombre}
            </li>

            <li>
              Razón social
            </li>

            <li>
              CUIT
            </li>

            <li>
              Dirección
            </li>

            <li>
              Teléfono
            </li>

          </ul>


          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Editar institución
          </button>


        </div>




        {/* Usuarios internos */}

        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-slate-900">
            Usuarios internos
          </h2>


          <p className="mt-3 text-slate-600">
            Administrar empleados y permisos.
          </p>


          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Gestionar usuarios
          </button>


        </div>




        {/* Compras */}

        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-slate-900">
            Preferencias de compra
          </h2>


          <p className="mt-3 text-slate-600">
            Configurar categorías, proveedores y solicitudes.
          </p>


          <div className="mt-4 space-y-2">

            <label className="flex gap-2">

              <input type="checkbox" />

              Solicitar aprobación antes de comprar

            </label>


            <label className="flex gap-2">

              <input type="checkbox" />

              Recibir propuestas automáticamente

            </label>


          </div>


        </div>




        {/* Notificaciones */}

        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold text-slate-900">
            Notificaciones
          </h2>


          <div className="mt-4 space-y-2">


            <label className="flex gap-2">

              <input type="checkbox" defaultChecked />

              Nuevas cotizaciones

            </label>


            <label className="flex gap-2">

              <input type="checkbox" defaultChecked />

              Cambios en solicitudes

            </label>


            <label className="flex gap-2">

              <input type="checkbox" />

              Promociones

            </label>


          </div>


        </div>


      </div>


    </main>

  );

};


export default ConfiguracionInstitucion;