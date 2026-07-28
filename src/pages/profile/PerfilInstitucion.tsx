import { useAuth } from "../../context/AuthContext";


const PerfilInstitucion = () => {

const {usuario}=useAuth();


return (

<main className="mx-auto max-w-5xl px-6 py-10">


<h1 className="text-4xl font-bold text-slate-900">
Perfil Institución
</h1>


<div className="mt-8 rounded-xl bg-white p-8 shadow border">


<h2 className="text-xl font-bold">
Datos de la institución
</h2>


<p className="mt-4">
Usuario: {usuario?.nombre}
</p>


<p>
Tipo: Hospital / Clínica / Consultorio
</p>


<p>
Solicitudes realizadas:
24
</p>


<p>
Compras realizadas:
15
</p>


<button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white">
Editar institución
</button>


</div>


</main>

);

};


export default PerfilInstitucion;