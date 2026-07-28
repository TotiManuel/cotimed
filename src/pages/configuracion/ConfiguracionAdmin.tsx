import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const ConfiguracionAdmin = () => {

    const {usuario}=useAuth();
    if(!usuario){
        return <Navigate to="/login" />;
    }


return (

<main className="mx-auto max-w-6xl px-6 py-10">


<h1 className="text-4xl font-bold text-slate-900">
Configuración Administrador
</h1>


<div className="mt-8 grid gap-6 md:grid-cols-2">


<div className="rounded-xl border bg-white p-6 shadow">

<h2 className="text-xl font-bold">
Sistema
</h2>

<p className="mt-3 text-slate-600">
Gestionar configuración general de CotiMed
</p>


<button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
Configurar sistema
</button>

</div>



<div className="rounded-xl border bg-white p-6 shadow">

<h2 className="text-xl font-bold">
Usuarios
</h2>

<p className="mt-3 text-slate-600">
Crear, editar y administrar usuarios
</p>


<button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
Gestionar usuarios
</button>

</div>



<div className="rounded-xl border bg-white p-6 shadow">

<h2 className="text-xl font-bold">
Roles y permisos
</h2>

<p className="mt-3 text-slate-600">
Control de accesos
</p>


<button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
Administrar permisos
</button>

</div>



<div className="rounded-xl border bg-white p-6 shadow">

<h2 className="text-xl font-bold">
Auditoría
</h2>

<p>
Usuario: {usuario.nombre}
</p>


<button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white">
Ver registros
</button>

</div>


</div>


</main>

);

};


export default ConfiguracionAdmin;