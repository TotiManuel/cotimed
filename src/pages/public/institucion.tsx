import { useEffect, useState } from "react";

import { api } from "../../api/api";


interface Institucion {

    IDInstitucion:string;

    NombreInstitucion:string;

    NombreComercial:string;

    TipoInstitucion:string;

    Pais:string;

    Ciudad:string;

    Estado:string;

    Verificada:boolean;

    FotoPerfilInstitucion?:string;

}



const Institucion = () => {


    const [instituciones,setInstituciones] =
        useState<Institucion[]>([]);


    const [busqueda,setBusqueda] =
        useState("");


    const [tipo,setTipo] =
        useState("");



    const [cargando,setCargando] =
        useState(true);




    useEffect(()=>{


        const cargarInstituciones = async()=>{


            try{


                const data =
                    await api("/instituciones");


                setInstituciones(data);



            }catch(error){


                console.error(
                    "Error cargando instituciones",
                    error
                );


            }finally{


                setCargando(false);


            }


        };



        cargarInstituciones();


    },[]);






    const filtradas =
        instituciones.filter((institucion)=>{


            const texto =

            `${institucion.NombreInstitucion}
             ${institucion.NombreComercial}
             ${institucion.Ciudad}`

            .toLowerCase();



            const coincideBusqueda =

                texto.includes(
                    busqueda.toLowerCase()
                );



            const coincideTipo =

                tipo === ""

                ||

                institucion.TipoInstitucion === tipo;



            return (

                coincideBusqueda &&

                coincideTipo

            );


        });







return (

<main className="mx-auto max-w-7xl px-6 py-10">



<section className="mb-10">


<h1 className="text-4xl font-bold text-slate-900">

Instituciones de Salud

</h1>


<p className="mt-3 max-w-3xl text-lg text-slate-600">

Instituciones registradas en la plataforma.

</p>


</section>





<section className="
mb-10
flex
flex-col
gap-4
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
md:flex-row
">


<input

type="text"

placeholder="Buscar institución..."

value={busqueda}

onChange={(e)=>
setBusqueda(e.target.value)
}

className="
flex-1
rounded-xl
border
border-slate-300
px-4
py-3
focus:border-blue-600
focus:outline-none
"

/>





<select

value={tipo}

onChange={(e)=>
setTipo(e.target.value)
}

className="
rounded-xl
border
border-slate-300
px-4
py-3
"

>

<option value="">

Todos los tipos

</option>


<option value="Hospital">

Hospital

</option>


<option value="Clinica">

Clínica

</option>


<option value="Laboratorio">

Laboratorio

</option>


<option value="Universidad">

Universidad

</option>


</select>


</section>








<section className="
grid
gap-6
lg:grid-cols-2
">


{

cargando

?

(

<p>

Cargando instituciones...

</p>

)


:

filtradas.map((institucion)=>(



<article

key={institucion.IDInstitucion}

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

{

institucion.NombreComercial ||

institucion.NombreInstitucion

}

</h2>



<p className="mt-2 text-slate-600">

{

institucion.TipoInstitucion

}

</p>



<p className="
mt-1
text-sm
text-slate-500
">

📍 {institucion.Ciudad}

</p>


</div>





<span

className="
rounded-full
bg-blue-100
px-3
py-1
text-sm
font-medium
text-blue-700
"

>

{

institucion.Estado

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



</div>



</article>



))


}



</section>



</main>

);


};



export default Institucion;