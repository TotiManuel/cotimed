import type { Institucion } from "../../types/Institucion";


interface Props {


  instituciones: Institucion[];


  onEditar:(institucion:Institucion)=>void;


  onEliminar:(id:number)=>void;


}



const TablaInstituciones = ({

  instituciones,

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

Nombre

</th>


<th className="p-4">

CUIT

</th>


<th className="p-4">

Ciudad

</th>


<th className="p-4">

Provincia

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

instituciones.length === 0 ? (


<tr>

<td

colSpan={6}

className="
p-8
text-center
text-slate-500
"

>

No hay instituciones registradas

</td>

</tr>



)

:

(


instituciones.map((institucion)=>(



<tr

key={institucion.id}

className="
border-b
hover:bg-slate-50
"

>



<td className="p-4">


<div className="font-medium">


{institucion.nombre}


</div>


{

institucion.nombreComercial &&

(

<p className="
text-sm
text-slate-500
">

{institucion.nombreComercial}

</p>


)

}


</td>





<td className="p-4">

{institucion.cuit || "-"}

</td>





<td className="p-4">

{institucion.ciudad || "-"}

</td>





<td className="p-4">

{institucion.provincia || "-"}

</td>





<td className="p-4">


<span

className={`

rounded-full

px-3

py-1

text-sm

${

institucion.estado === "ACTIVO"

?

"bg-green-100 text-green-700"

:

institucion.estado === "PENDIENTE"

?

"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}

`}

>


{institucion.estado || "SIN ESTADO"}


</span>


</td>







<td className="
p-4
">


<div className="
flex
gap-2
">


<button

onClick={()=>onEditar(institucion)}

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

onClick={()=>onEliminar(institucion.id)}

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


)


}



</tbody>



</table>


</div>


);


};



export default TablaInstituciones;