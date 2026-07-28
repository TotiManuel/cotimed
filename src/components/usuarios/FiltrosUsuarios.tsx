interface Props {

  busqueda: string;
  setBusqueda: (value: string) => void;

  rol: string;
  setRol: (value: string) => void;

  estado: string;
  setEstado: (value: string) => void;

}

const FiltrosUsuarios = ({

  busqueda,
  setBusqueda,

  rol,
  setRol,

  estado,
  setEstado

}: Props) => {

  return (

    <div className="mb-6 grid gap-4 md:grid-cols-3">

      <input

        type="text"

        placeholder="Buscar por nombre o email..."

        value={busqueda}

        onChange={(e)=>setBusqueda(e.target.value)}

        className="rounded-xl border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"

      />



      <select

        value={rol}

        onChange={(e)=>setRol(e.target.value)}

        className="rounded-xl border border-slate-300 p-3"

      >

        <option value="">Todos los roles</option>

        <option value="ADMIN">Administrador</option>

        <option value="INSTITUCION">Institución</option>

        <option value="PROVEEDOR">Proveedor</option>

        <option value="EMPLEADO">Empleado</option>

      </select>



      <select

        value={estado}

        onChange={(e)=>setEstado(e.target.value)}

        className="rounded-xl border border-slate-300 p-3"

      >

        <option value="">Todos los estados</option>

        <option value="ACTIVO">Activo</option>

        <option value="PENDIENTE">Pendiente</option>

        <option value="SUSPENDIDO">Suspendido</option>

      </select>

    </div>

  );

};

export default FiltrosUsuarios;