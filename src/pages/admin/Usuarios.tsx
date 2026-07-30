import { useMemo, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import FiltrosUsuarios from "../../components/usuarios/FiltrosUsuarios";
import TablaUsuarios from "../../components/usuarios/TablaUsuarios";
import ModalUsuario from "../../components/usuarios/ModalUsuario";

import { useUsuarios } from "../../hooks/useUsuarios";

import {
  crearUsuario,
  actualizarUsuario
} from "../../service/user.service";

import type { Usuario } from "../../types/Usuario";



const Usuarios = () => {


  const {

    usuarios,

    loading,

    cargarUsuarios,

    borrar

  } = useUsuarios();



  const [busqueda,setBusqueda] =
    useState("");

  const [rol,setRol] =
    useState("");

  const [estado,setEstado] =
    useState("");



  const [modalAbierto,setModalAbierto] =
    useState(false);



  const [usuarioSeleccionado,setUsuarioSeleccionado] =
    useState<Usuario | null>(null);



  const [usuarioVer,setUsuarioVer] =
    useState<Usuario | null>(null);




  const abrirNuevo = () => {

    setUsuarioSeleccionado(null);

    setModalAbierto(true);

  };




  const editar = (
    usuario:Usuario
  )=>{

    setUsuarioSeleccionado(usuario);

    setModalAbierto(true);

  };




  const guardar = async(
    datos:any
  )=>{


    try{


      if(usuarioSeleccionado){


        await actualizarUsuario(

          usuarioSeleccionado.id,

          {

            ...datos,

            password:
              datos.password || undefined

          }

        );


      }else{


        await crearUsuario(datos);


      }



      setModalAbierto(false);

      cargarUsuarios();



    }catch(error){


      console.error(error);

      alert(
        "Error guardando usuario."
      );


    }


  };




  const eliminar = async(
    id:number
  )=>{


    const confirmar =
      window.confirm(
        "¿Eliminar este usuario?"
      );


    if(!confirmar)
      return;


    await borrar(id);


  };





  const usuariosFiltrados = useMemo(()=>{


    return usuarios.filter((u)=>{


      const coincideBusqueda =

        `${u.nombre} ${u.apellido} ${u.email}`

        .toLowerCase()

        .includes(
          busqueda.toLowerCase()
        );



      const coincideRol =

        rol === "" ||

        u.rol === rol;




      const coincideEstado =

        estado === "" ||

        u.estado === estado;



      return (

        coincideBusqueda &&

        coincideRol &&

        coincideEstado

      );


    });


  },[

    usuarios,

    busqueda,

    rol,

    estado

  ]);






return (

<DashboardLayout

titulo="Usuarios"

subtitulo="Administración de usuarios"

>


<div className="mb-8 flex items-center justify-between">


<div>


<h2 className="text-2xl font-bold">

Usuarios

</h2>


<p className="text-slate-600">

Total: {usuarios.length}

</p>


</div>



<button

onClick={abrirNuevo}

className="
rounded-xl
bg-blue-600
px-5
py-3
font-medium
text-white
hover:bg-blue-700
"

>

+ Nuevo usuario

</button>


</div>





<FiltrosUsuarios

busqueda={busqueda}

setBusqueda={setBusqueda}

rol={rol}

setRol={setRol}

estado={estado}

setEstado={setEstado}

/>






{

loading

?

(

<div className="
rounded-xl
bg-white
p-10
text-center
shadow
">

Cargando usuarios...

</div>

)

:

(

<TablaUsuarios

usuarios={usuariosFiltrados}

onEditar={editar}

onEliminar={eliminar}

onVer={(usuario)=>setUsuarioVer(usuario)}

/>

)

}







{

usuarioVer && (


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
overflow-y-auto
"
>


<div
className="
w-full
max-w-xl
max-h-[90vh]
overflow-y-auto
rounded-2xl
bg-white
p-8
shadow-xl
"
>


<h2 className="
mb-6
text-2xl
font-bold
">

Datos del usuario

</h2>



<div className="space-y-3">


<p>
<b>ID:</b> {usuarioVer.id}
</p>


<p>
<b>Nombre:</b> {usuarioVer.nombre}
</p>


<p>
<b>Apellido:</b> {usuarioVer.apellido}
</p>


<p>
<b>Email:</b> {usuarioVer.email}
</p>


<p>
<b>Teléfono:</b>{" "}
{usuarioVer.telefono || "No registrado"}
</p>


<p>
<b>Rol:</b> {usuarioVer.rol}
</p>


<p>
<b>Estado:</b> {usuarioVer.estado}
</p>



<p>

<b>Último acceso:</b>{" "}

{

usuarioVer.ultimoAcceso

?

new Date(
usuarioVer.ultimoAcceso
).toLocaleString()

:

"Nunca"

}

</p>





<p>

<b>Fecha creación:</b>{" "}

{

usuarioVer.fechaCreacion

?

new Date(
usuarioVer.fechaCreacion
).toLocaleString()

:

"No disponible"

}

</p>





<p>

<b>Creado:</b>{" "}

{

usuarioVer.createdAt

?

new Date(
usuarioVer.createdAt
).toLocaleString()

:

"No disponible"

}

</p>





<p>

<b>Actualizado:</b>{" "}

{

usuarioVer.updatedAt

?

new Date(
usuarioVer.updatedAt
).toLocaleString()

:

"No disponible"

}

</p>



<hr/>


<p>

<b>Institución:</b>{" "}

{
usuarioVer.institucion?.nombre ||

"Sin institución"

}

</p>



<p>

<b>Administrador institución:</b>{" "}

{
usuarioVer.institucionAdmin?.nombre ||

"No administra"

}

</p>



<p>

<b>Proveedor:</b>{" "}

{
usuarioVer.proveedor?.nombre ||

"No asociado"

}

</p>




</div>





<button

onClick={()=>
setUsuarioVer(null)
}

className="
mt-6
rounded-xl
bg-slate-900
px-5
py-3
text-white
hover:bg-slate-800
"

>

Cerrar

</button>



</div>


</div>


)

}







<ModalUsuario

abierto={modalAbierto}

usuario={usuarioSeleccionado}

onCerrar={()=>
setModalAbierto(false)
}

onGuardar={guardar}

/>



</DashboardLayout>


);


};



export default Usuarios;