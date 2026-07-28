import { useMemo, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import FiltrosInstituciones from "../../components/instituciones/FiltrosInstituciones";

import TablaInstituciones from "../../components/instituciones/TablaInstituciones";

import ModalInstitucion from "../../components/instituciones/ModalInstitucion";

import { useInstituciones } from "../../hooks/useInstituciones";

import type {
  Institucion,
  InstitucionForm
} from "../../types/Institucion";





const Instituciones = () => {



const {


  instituciones,

  cargando,

  crear,

  actualizar,

  eliminar


}=useInstituciones();

const [busqueda,setBusqueda]=

useState("");

const [provincia,setProvincia]=

useState("");

const [ciudad,setCiudad]=

useState("");

const [estado,setEstado]=

useState("");

const [modalAbierto,setModalAbierto]=

useState(false);

const [

institucionSeleccionada,

setInstitucionSeleccionada

]=useState<Institucion|null>(null);

const guardar = async(

datos:InstitucionForm

)=>{

try{

if(institucionSeleccionada){

await actualizar(

institucionSeleccionada.id,

datos

);

}else{

await crear(datos);

}

setModalAbierto(false);
setInstitucionSeleccionada(null);

}catch(error){

console.error(error);

alert(
"No se pudo guardar la institución"
);


}



};

const editar=(

institucion:Institucion

)=>{

setInstitucionSeleccionada(institucion);

setModalAbierto(true);

};

const nueva=()=>{


setInstitucionSeleccionada(null);


setModalAbierto(true);



};

const borrar=async(

id:number

)=>{


if(!confirm(
"¿Eliminar institución?"
)){

return;

}



try{


await eliminar(id);



}catch(error){


console.error(error);


alert(
"No se pudo eliminar"
);


}



};









const filtradas = useMemo(()=>{


return instituciones.filter((i)=>{


const texto=

busqueda.toLowerCase();




const coincideBusqueda=

i.nombre

.toLowerCase()

.includes(texto)

||

(i.nombreComercial ?? "")

.toLowerCase()

.includes(texto);





const coincideProvincia=

provincia === ""

||

i.provincia === provincia;





const coincideCiudad=

ciudad === ""

||

(i.ciudad ?? "")

.toLowerCase()

.includes(

ciudad.toLowerCase()

);





const coincideEstado=

estado === ""

||

i.estado === estado;





return (

coincideBusqueda

&&

coincideProvincia

&&

coincideCiudad

&&

coincideEstado

);



});



},[


instituciones,

busqueda,

provincia,

ciudad,

estado


]);










return (



<DashboardLayout


titulo="Instituciones"


subtitulo="Administración de instituciones registradas"



>





<div className="
mb-8
flex
items-center
justify-between
"


>


<div>


<h1 className="
text-3xl
font-bold
"

>

Instituciones

</h1>



<p className="
text-slate-600
"

>

Total:
{" "}
{instituciones.length}

</p>



</div>






<button

onClick={nueva}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
hover:bg-blue-700
"

>


+ Nueva institución


</button>



</div>









<FiltrosInstituciones


busqueda={busqueda}


setBusqueda={setBusqueda}


provincia={provincia}


setProvincia={setProvincia}


ciudad={ciudad}


setCiudad={setCiudad}


estado={estado}


setEstado={setEstado}


/>









{

cargando ? (


<div className="
rounded-xl
bg-white
p-10
text-center
shadow
"

>

Cargando instituciones...

</div>


)

:

(



<TablaInstituciones


instituciones={filtradas}


onEditar={editar}


onEliminar={borrar}


/>


)



}









<ModalInstitucion


abierto={modalAbierto}


institucion={institucionSeleccionada}


onCerrar={()=>{


setModalAbierto(false);


setInstitucionSeleccionada(null);



}}


onGuardar={guardar}



/>






</DashboardLayout>



);



};





export default Instituciones;