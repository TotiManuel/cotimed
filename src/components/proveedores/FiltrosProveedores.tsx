interface Props {


  busqueda:string;

  setBusqueda:(value:string)=>void;


  provincia:string;

  setProvincia:(value:string)=>void;


  ciudad:string;

  setCiudad:(value:string)=>void;


  estado:string;

  setEstado:(value:string)=>void;


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







const FiltrosProveedores = ({

  busqueda,

  setBusqueda,

  provincia,

  setProvincia,

  ciudad,

  setCiudad,

  estado,

  setEstado


}:Props)=>{



return (


<div className="
mb-6
grid
gap-4
md:grid-cols-4
">







<input

type="text"

placeholder="Buscar proveedor..."

value={busqueda}

onChange={(e)=>

setBusqueda(e.target.value)

}

className="
rounded-xl
border
border-slate-300
p-3
focus:border-blue-500
focus:outline-none
"

/>









<select


value={provincia}


onChange={(e)=>

setProvincia(e.target.value)

}


className="
rounded-xl
border
border-slate-300
p-3
"

>


<option value="">

Todas las provincias

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









<input

type="text"

placeholder="Ciudad..."

value={ciudad}

onChange={(e)=>

setCiudad(e.target.value)

}

className="
rounded-xl
border
border-slate-300
p-3
focus:border-blue-500
focus:outline-none
"

/>









<select


value={estado}


onChange={(e)=>

setEstado(e.target.value)

}


className="
rounded-xl
border
border-slate-300
p-3
"

>


<option value="">

Todos los estados

</option>



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



);



};



export default FiltrosProveedores;