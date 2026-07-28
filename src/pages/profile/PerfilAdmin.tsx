import { useAuth } from "../../context/AuthContext";


const PerfilAdmin = () => {

const {usuario}=useAuth();


return (

<main className="mx-auto max-w-5xl px-6 py-10">


<h1 className="text-4xl font-bold text-slate-900">
Perfil Administrador
</h1>


<div className="mt-8 rounded-xl bg-white p-8 shadow border">


<p>
Nombre: {usuario?.nombre}
</p>


<p>
Rol: Administrador
</p>


<p>
Permisos: Control total del sistema
</p>


<button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white">
Editar configuración
</button>


</div>


</main>

);

};


export default PerfilAdmin;