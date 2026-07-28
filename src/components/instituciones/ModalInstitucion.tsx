import type { Institucion } from "../../types/Institucion";

import FormInstitucion from "./FormInstitucion";

import type {
  InstitucionForm
} from "../../types/Institucion";



interface Props {


  abierto:boolean;


  institucion:Institucion | null;


  onCerrar:()=>void;


  onGuardar:(data:InstitucionForm)=>void;


}





const ModalInstitucion = ({

  abierto,

  institucion,

  onCerrar,

  onGuardar


}:Props)=>{



if(!abierto){

  return null;

}







return (


<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
p-4
"

>



<div

className="
w-full
max-w-3xl
rounded-2xl
bg-white
p-8
shadow-xl
"

>



<div className="
mb-6
flex
items-center
justify-between
"

>


<h2 className="
text-2xl
font-bold
text-slate-900
"

>


{

institucion

?

"Editar institución"

:

"Nueva institución"

}


</h2>




<button

onClick={onCerrar}

className="
text-xl
text-slate-500
hover:text-slate-900
"

>

✕


</button>



</div>








<FormInstitucion


institucion={institucion}


onGuardar={onGuardar}


onCancelar={onCerrar}



/>





</div>



</div>



);



};



export default ModalInstitucion;