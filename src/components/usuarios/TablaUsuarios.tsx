import type { Usuario } from "../../types/Usuario";

import EstadoBadge from "./EstadoBadge";

interface Props {

  usuarios: Usuario[];

  onEditar: (usuario: Usuario) => void;

  onEliminar: (id: number) => void;

  onVer:(usuario:Usuario)=>void;

}

const TablaUsuarios = ({

  usuarios,

  onEditar,

  onEliminar,

  onVer

  
}: Props) => {

  return (

    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-5 py-4 text-left">
              Nombre
            </th>

            <th className="px-5 py-4 text-left">
              Email
            </th>

            <th className="px-5 py-4 text-left">
              Teléfono
            </th>

            <th className="px-5 py-4 text-left">
              Rol
            </th>

            <th className="px-5 py-4 text-left">
              Estado
            </th>

            <th className="px-5 py-4 text-center">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {

            usuarios.map((usuario)=>(

              <tr

                key={usuario.id}

                className="border-t hover:bg-slate-50"

              >

                <td className="px-5 py-4">

                  {usuario.nombre} {usuario.apellido}

                </td>

                <td className="px-5 py-4">

                  {usuario.email}

                </td>

                <td className="px-5 py-4">

                  {usuario.telefono ?? "-"}

                </td>

                <td className="px-5 py-4">

                  {usuario.rol}

                </td>

                <td className="px-5 py-4">

                  <EstadoBadge

                    estado={usuario.estado}

                  />

                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-2">

                    <button

                      onClick={()=>onVer(usuario)}

                      className="
                      rounded-lg
                      bg-green-600
                      px-3
                      py-2
                      text-white
                      hover:bg-green-700
                      "

                      >

                      Ver

                      </button>

                    <button

                      onClick={()=>onEditar(usuario)}

                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                    >

                      Editar

                    </button>

                    <button

                      onClick={()=>onEliminar(usuario.id)}

                      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"

                    >

                      Eliminar

                    </button>

                  </div>

                </td>

              </tr>

            ))

          }

          {

            usuarios.length===0 && (

              <tr>

                <td

                  colSpan={6}

                  className="py-8 text-center text-slate-500"

                >

                  No hay usuarios.

                </td>

              </tr>

            )

          }

        </tbody>

      </table>

    </div>

  );

};

export default TablaUsuarios;