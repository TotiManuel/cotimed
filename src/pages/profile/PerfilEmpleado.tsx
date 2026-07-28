import { useAuth } from "../../context/AuthContext";


const PerfilEmpleado = () => {

const {usuario}=useAuth();


return (

<main className="mx-auto max-w-5xl px-6 py-10">


<h1 className="text-4xl font-bold text-slate-900">
Perfil Empleado
</h1>


<div className="mt-8 rounded-xl bg-white p-8 shadow border">


<h2 className="text-xl font-bold">
Datos personales
</h2>


<p className="mt-4">
Nombre:
{usuario?.nombre}
</p>


<p>
Área:
Compras
</p>


<p>
Solicitudes gestionadas:
45
</p>


<p>
Último acceso:
Hoy
</p>


<button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white">
Actualizar datos
</button>


</div>


</main>

);

};


export default PerfilEmpleado;