import { useAuth } from "../../context/AuthContext";


const PerfilProveedor = () => {

const {usuario}=useAuth();


return (

<main className="mx-auto max-w-5xl px-6 py-10">


<h1 className="text-4xl font-bold text-slate-900">
Perfil Proveedor
</h1>


<div className="mt-8 rounded-xl bg-white p-8 shadow border">


<h2 className="text-xl font-bold">
Información comercial
</h2>


<p className="mt-4">
Usuario: {usuario?.nombre}
</p>


<p>
Productos publicados:
132
</p>


<p>
Cotizaciones enviadas:
56
</p>


<p>
Valoración:
⭐ 4.8
</p>


<button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white">
Editar empresa
</button>


</div>


</main>

);

};


export default PerfilProveedor;