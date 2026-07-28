import type { Proveedor } from "../../types/Proveedor";



interface Props {


  proveedores: Proveedor[];


  onEditar:(proveedor:Proveedor)=>void;


  onEliminar:(id:number)=>void;


}





const TablaProveedores = ({

  proveedores,

  onEditar,

  onEliminar


}:Props)=>{



return (


<div className="
overflow-x-auto
rounded-2xl
bg-white
shadow
">


<table className="
w-full
text-left
">


<thead className="
border-b
bg-slate-50
">


<tr>


<th className="p-4">

Empresa

</th>


<th className="p-4">

CUIT

</th>


<th className="p-4">

Ubicación

</th>


<th className="p-4">

Estado

</th>


<th className="p-4">

Acciones

</th>


</tr>


</thead>





<tbody>



{


proveedores.length === 0

?

(


<tr>

<td

colSpan={5}

className="
p-8
text-center
text-slate-500
"

>

No hay proveedores registrados

</td>

</tr>


)


:


proveedores.map((proveedor)=>(


<tr

key={proveedor.id}

className="
border-b
hover:bg-slate-50
"


>


<td className="p-4">


<div className="font-semibold">

{proveedor.nombreEmpresa}

</div>



{

proveedor.email &&

<p className="text-sm text-slate-500">

{proveedor.email}

</p>

}


</td>









<td className="p-4">

{proveedor.cuit ?? "-"}

</td>









<td className="p-4">


<p>

{proveedor.ciudad ?? "-"}

</p>


<p className="text-sm text-slate-500">

{proveedor.provincia ?? "-"}

</p>


</td>









<td className="p-4">


<span

className={`

rounded-full

px-3

py-1

text-sm

font-medium


${

proveedor.estado === "ACTIVO"

?

"bg-green-100 text-green-700"

:

proveedor.estado === "PENDIENTE"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}

>


{proveedor.estado ?? "ACTIVO"}


</span>


</td>









<td className="p-4">


<div className="
flex
gap-2
">


<button


onClick={()=>onEditar(proveedor)}


className="
rounded-lg
bg-blue-600
px-3
py-2
text-sm
text-white
hover:bg-blue-700
"


>


Editar


</button>





<button


onClick={()=>onEliminar(proveedor.id)}


className="
rounded-lg
bg-red-600
px-3
py-2
text-sm
text-white
hover:bg-red-700
"


>


Eliminar


</button>



</div>


</td>






</tr>


))


}





</tbody>



</table>


</div>


);



};



export default TablaProveedores;