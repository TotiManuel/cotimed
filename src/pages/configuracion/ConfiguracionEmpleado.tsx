import { useAuth } from "../../context/AuthContext";


const ConfiguracionEmpleado = () => {

  const { usuario } = useAuth();


  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <h1 className="text-4xl font-bold text-slate-900">
        Configuración Empleado
      </h1>


      <p className="mt-2 text-slate-600">
        Configuración personal y permisos laborales.
      </p>



      <div className="mt-8 grid gap-6 md:grid-cols-2">



        {/* Información personal */}

        <div className="rounded-xl border bg-white p-6 shadow">


          <h2 className="text-xl font-bold text-slate-900">
            Información personal
          </h2>


          <div className="mt-4 space-y-2 text-slate-700">


            <p>
              Nombre:
              {usuario?.nombre}
            </p>


            <p>
              Apellido:
              {usuario?.apellido}
            </p>


            <p>
              Email:
              {usuario?.email}
            </p>


            <p>
              Teléfono:
              {usuario?.telefono}
            </p>


          </div>



          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Editar datos
          </button>


        </div>





        {/* Información laboral */}

        <div className="rounded-xl border bg-white p-6 shadow">


          <h2 className="text-xl font-bold text-slate-900">
            Información laboral
          </h2>


          <div className="mt-4 space-y-3 text-slate-700">


            <p>
              Área:
              Compras
            </p>


            <p>
              Cargo:
              Analista
            </p>


            <p>
              Institución:
              Hospital asociado
            </p>


          </div>



          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Solicitar cambios
          </button>


        </div>





        {/* Permisos */}

        <div className="rounded-xl border bg-white p-6 shadow">


          <h2 className="text-xl font-bold text-slate-900">
            Permisos
          </h2>


          <div className="mt-4 space-y-3">


            <label className="flex gap-2">

              <input 
                type="checkbox"
                defaultChecked
              />

              Crear solicitudes

            </label>



            <label className="flex gap-2">

              <input
                type="checkbox"
                defaultChecked
              />

              Ver cotizaciones

            </label>



            <label className="flex gap-2">

              <input
                type="checkbox"
              />

              Aprobar compras

            </label>



            <label className="flex gap-2">

              <input
                type="checkbox"
              />

              Administrar usuarios

            </label>


          </div>


        </div>





        {/* Preferencias */}

        <div className="rounded-xl border bg-white p-6 shadow">


          <h2 className="text-xl font-bold text-slate-900">
            Preferencias
          </h2>



          <div className="mt-4 space-y-3">


            <label className="flex gap-2">

              <input
                type="checkbox"
                defaultChecked
              />

              Recibir notificaciones

            </label>



            <label className="flex gap-2">

              <input
                type="checkbox"
                defaultChecked
              />

              Alertas de solicitudes

            </label>



            <label className="flex gap-2">

              <input
                type="checkbox"
              />

              Resumen semanal por email

            </label>


          </div>


        </div>



      </div>



    </main>

  );

};


export default ConfiguracionEmpleado;