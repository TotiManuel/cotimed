import {
  useEffect,
  useState
} from "react";

import { api } from "../../api/api";


interface Proveedor {

  IDProveedor:string;

  NombreComercial:string;

  RazonSocial:string;

  Pais:string;

  Ciudad:string;

  TipoProveedor:string;

  Verificado:boolean;

}



const Proveedor = () => {


  const [proveedores,setProveedores] =
    useState<Proveedor[]>([]);


  const [busqueda,setBusqueda] =
    useState("");



  useEffect(()=>{


    const cargar = async()=>{


      try{


        const data =
          await api("/proveedores");


        setProveedores(data);


      }catch(error){


        console.error(
          "Error cargando proveedores",
          error
        );


      }


    };


    cargar();


  },[]);




  const proveedoresFiltrados =
    proveedores.filter((proveedor)=>{


      return (

        proveedor.NombreComercial
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

        ||

        proveedor.Ciudad
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )

      );


    });




return (

<main className="mx-auto max-w-7xl px-6 py-10">


<section className="mb-10">

<h1 className="text-4xl font-bold text-slate-900">
Proveedores
</h1>


<p className="mt-3 max-w-3xl text-lg text-slate-600">
Encuentra proveedores especializados en equipamiento médico.
</p>


</section>




<section className="
mb-10
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<input

type="text"

placeholder="Buscar proveedor..."

value={busqueda}

onChange={(e)=>
setBusqueda(e.target.value)
}

className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
focus:border-blue-600
focus:outline-none
"

/>


</section>





<section className="
grid
gap-6
lg:grid-cols-2
">


{

proveedoresFiltrados.map((proveedor)=>(


<article

key={proveedor.IDProveedor}

className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
transition
hover:shadow-lg
"

>


<div className="flex items-start justify-between">


<div>


<h2 className="
text-2xl
font-semibold
text-slate-900
">

{proveedor.NombreComercial}

</h2>



<p className="mt-2 text-slate-600">

{proveedor.TipoProveedor}

</p>



<p className="mt-1 text-sm text-slate-500">

📍 {proveedor.Ciudad}, {proveedor.Pais}

</p>


</div>



<span
className="
rounded-full
bg-green-100
px-3
py-1
text-sm
font-medium
text-green-700
"
>

{

proveedor.Verificado

?

"Verificado"

:

"Pendiente"

}

</span>



</div>





<div className="mt-6 flex gap-3">


<button

className="
rounded-lg
bg-blue-600
px-5
py-2
font-medium
text-white
hover:bg-blue-700
"

>

Ver perfil

</button>



<button

className="
rounded-lg
border
border-slate-300
px-5
py-2
font-medium
text-slate-700
hover:bg-slate-100
"

>

Solicitar cotización

</button>



</div>



</article>


))


}



</section>


</main>

);


};


export default Proveedor;