import { useEffect, useState } from "react";

import type {
  Institucion,
  InstitucionForm
} from "../../types/Institucion";



interface Props {


  institucion?: Institucion | null;


  onGuardar:(data:InstitucionForm)=>void;


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






const formularioInicial:InstitucionForm = {


  nombre:"",

  nombreComercial:"",

  cuit:"",

  telefono:"",

  direccion:"",

  ciudad:"",

  provincia:""


};

const FormInstitucion = ({

  institucion,

  onGuardar,

  onCancelar


}:Props)=>{



const [form,setForm] =

useState<InstitucionForm>(

  formularioInicial

);








useEffect(()=>{


if(institucion){



setForm({

  nombre:
    institucion.nombre ?? "",


  nombreComercial:
    institucion.nombreComercial ?? "",


  cuit:
    institucion.cuit ?? "",


  telefono:
    institucion.telefono ?? "",


  direccion:
    institucion.direccion ?? "",


  ciudad:
    institucion.ciudad ?? "",


  provincia:
    institucion.provincia ?? ""


});



}else{


setForm(formularioInicial);


}



},[institucion]);








const cambiar = (

e:React.ChangeEvent<

HTMLInputElement | HTMLSelectElement

>

)=>{


setForm({

...form,


[e.target.name]:

e.target.value


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

className="
space-y-5
"

>





<div className="
grid
gap-4
md:grid-cols-2
">



<div>

<label className="mb-2 block font-medium">

Nombre institución

</label>


<input

name="nombre"

value={form.nombre}

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

Nombre comercial

</label>


<input

name="nombreComercial"

value={form.nombreComercial}

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

Guardar institución

</button>



</div>






</form>


);


};




export default FormInstitucion;