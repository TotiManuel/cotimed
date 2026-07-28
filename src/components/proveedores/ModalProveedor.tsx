import type { Proveedor } from "../../types/Proveedor";

import FormProveedor from "./FormProveedor";



interface Props {


  abierto:boolean;


  proveedor:Proveedor | null;

  onGuardar:(data:Omit<Proveedor,"id">)=>void;

  onCerrar:()=>void;


}





const ModalProveedor = ({

  abierto,

  proveedor,

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
px-4
"


>





<div

className="
max-h-[90vh]
w-full
max-w-3xl
overflow-y-auto
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
">


{

proveedor

?

"Editar proveedor"

:

"Nuevo proveedor"

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









<FormProveedor


proveedor={proveedor}


onGuardar={onGuardar}


onCancelar={onCerrar}


/>









</div>





</div>



);



};



export default ModalProveedor;