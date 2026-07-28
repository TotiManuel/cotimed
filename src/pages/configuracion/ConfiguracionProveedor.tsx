import { useAuth } from "../../context/AuthContext";


const ConfiguracionProveedor = () => {

  const { usuario } = useAuth();


  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <h1 className="text-4xl font-bold text-slate-900">
        Configuración Proveedor
      </h1>


      <p className="mt-2 text-slate-600">
        Administración comercial del proveedor.
      </p>



      <div className="mt-8 grid gap-6 md:grid-cols-2">



        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Empresa
          </h2>


          <p className="mt-3">
            Usuario:
            {usuario?.nombre}
          </p>


          <ul className="mt-4 space-y-2 text-slate-600">

            <li>
              Razón social
            </li>

            <li>
              CUIT
            </li>

            <li>
              Dirección comercial
            </li>

            <li>
              Contacto
            </li>


          </ul>


          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
            Editar empresa
          </button>


        </div>





        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Catálogo
          </h2>


          <p className="mt-3 text-slate-600">
            Administrar productos publicados.
          </p>


          <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
            Gestionar catálogo
          </button>


        </div>





        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Ventas
          </h2>


          <div className="mt-4 space-y-3">


            <label className="flex gap-2">

              <input type="checkbox" />

              Mostrar precios públicos

            </label>


            <label className="flex gap-2">

              <input type="checkbox" defaultChecked />

              Aceptar solicitudes nuevas

            </label>


          </div>


        </div>





        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-bold">
            Cotizaciones
          </h2>


          <p className="mt-3 text-slate-600">
            Configurar duración y condiciones.
          </p>


          <select className="mt-4 rounded border p-2">

            <option>
              15 días
            </option>

            <option>
              30 días
            </option>

            <option>
              60 días
            </option>

          </select>


        </div>



      </div>


    </main>

  );

};


export default ConfiguracionProveedor;