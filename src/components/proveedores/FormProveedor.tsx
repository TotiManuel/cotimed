import { useEffect, useState } from "react";

import type { Proveedor } from "../../types/Proveedor";



type FormProveedor = Omit<Proveedor, "id">;



interface Props {
  proveedor?: Proveedor | null;
  onGuardar:(data:FormProveedor)=>Promise<void>;
  onCancelar:()=>void;
}

const provincias = [

  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Ciudad Autónoma de Buenos Aires",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán"

];

const FormProveedor = ({

  proveedor,

  onGuardar,

  onCancelar


}:Props)=>{



const [form,setForm] = useState<FormProveedor>({


  nombreEmpresa:"",

  cuit:"",

  telefono:"",

  direccion:"",

  ciudad:"",

  provincia:"",

  descripcion:"",

  email:"",

  estado:"ACTIVO"


});
useEffect(()=>{


if(proveedor){


setForm({


nombreEmpresa:

proveedor.nombreEmpresa ?? "",


cuit:

proveedor.cuit ?? "",


telefono:

proveedor.telefono ?? "",


direccion:

proveedor.direccion ?? "",


ciudad:

proveedor.ciudad ?? "",


provincia:

proveedor.provincia ?? "",


descripcion:

proveedor.descripcion ?? "",


email:

proveedor.email ?? "",


estado:

proveedor.estado ?? "ACTIVO"


});

}
else{


setForm({

nombreEmpresa:"",

cuit:"",

telefono:"",

direccion:"",

ciudad:"",

provincia:"",

descripcion:"",

email:"",

estado:"ACTIVO"


});


}

},[proveedor]);

const cambiar=(

e:React.ChangeEvent<
HTMLInputElement |
HTMLSelectElement |
HTMLTextAreaElement
>

)=>{


setForm({

...form,

[e.target.name]:e.target.value


});

};
const enviar=(

e:React.FormEvent

)=>{


e.preventDefault();


onGuardar(form);


};

return (

<form

onSubmit={enviar}

className="space-y-5"

>



<div className="
grid
gap-4
md:grid-cols-2
">





<div>


<label className="mb-2 block font-medium">

Nombre empresa

</label>



<input


name="nombreEmpresa"


value={form.nombreEmpresa}


onChange={cambiar}


required


className="
w-full
rounded-xl
border
p-3
"


/>


</div>







<div>


<label className="mb-2 block font-medium">

Email

</label>



<input


name="email"


value={form.email}


onChange={cambiar}


type="email"


className="
w-full
rounded-xl
border
p-3
"


/>


</div>





</div>









<div className="
grid
gap-4
md:grid-cols-2
">



<div>


<label className="mb-2 block font-medium">

CUIT

</label>


<input


name="cuit"


value={form.cuit}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>





<div>


<label className="mb-2 block font-medium">

Teléfono

</label>


<input


name="telefono"


value={form.telefono}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>



</div>









<div>


<label className="mb-2 block font-medium">

Dirección

</label>


<input


name="direccion"


value={form.direccion}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>









<div className="
grid
gap-4
md:grid-cols-2
">


<div>


<label className="mb-2 block font-medium">

Ciudad

</label>



<input


name="ciudad"


value={form.ciudad}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>






<div>


<label className="mb-2 block font-medium">

Provincia

</label>



<select


name="provincia"


value={form.provincia}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


>


<option value="">

Seleccionar...

</option>



{

provincias.map((p)=>(


<option

key={p}

value={p}

>

{p}

</option>


))


}



</select>



</div>



</div>









<div>


<label className="mb-2 block font-medium">

Descripción

</label>


<textarea


name="descripcion"


value={form.descripcion}


onChange={cambiar}


rows={4}


className="
w-full
rounded-xl
border
p-3
"


/>


</div>









<div>


<label className="mb-2 block font-medium">

Estado

</label>


<select


name="estado"


value={form.estado}


onChange={cambiar}


className="
w-full
rounded-xl
border
p-3
"


>


<option value="ACTIVO">

Activo

</option>


<option value="PENDIENTE">

Pendiente

</option>


<option value="SUSPENDIDO">

Suspendido

</option>


</select>


</div>









<div className="
flex
justify-end
gap-3
pt-4
">



<button


type="button"


onClick={onCancelar}


className="
rounded-xl
border
px-6
py-3
"


>


Cancelar


</button>






<button


type="submit"


className="
rounded-xl
bg-blue-600
px-6
py-3
text-white
hover:bg-blue-700
"


>


Guardar proveedor


</button>



</div>







</form>



);



};



export default FormProveedor;