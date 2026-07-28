import {
  useEffect,
  useState
} from "react";

import type { Usuario } from "../../types/Usuario";
import {
 obtenerProveedores
} from "../../service/proveedor.service";
import {
 obtenerInstituciones
} from "../../service/institucion.service";

interface Props {

  usuario?: Usuario | null;

  onGuardar: (
    usuario: Partial<Usuario> & {
      password?: string;
    }
  ) => void;

  onCancelar:()=>void;

}
const formularioInicial = {

  nombre:"",

  apellido:"",

  email:"",

  telefono:"",

  password:"",

  rol:"EMPLEADO" as const,

  estado:"PENDIENTE" as const,

  institucionId: undefined as number | undefined,

  proveedorId: undefined as number | undefined

};

const FormUsuario = ({

  usuario,

  onGuardar,

  onCancelar

}:Props)=>{


const [form,setForm] = useState<{

  nombre:string;

  apellido:string;

  email:string;

  telefono:string;

  password:string;

  rol:Usuario["rol"];

  estado:Usuario["estado"];

  institucionId?: number;

  proveedorId?: number;

}>(formularioInicial); 

  const [instituciones,setInstituciones] =
    useState<{
      id:number;
      nombre:string;
    }[]>([]);
    const [proveedores,setProveedores] =
      useState<any[]>([]);

  useEffect(()=>{

const cargarDatos = async()=>{

const instituciones =
await obtenerInstituciones();

setInstituciones(instituciones);


const proveedores =
await obtenerProveedores();

setProveedores(proveedores);


};


cargarDatos();


},[]);
  useEffect(()=>{


    if(usuario){

      setForm({

        nombre: usuario.nombre,

        apellido: usuario.apellido,

        email: usuario.email,

        telefono: usuario.telefono ?? "",

        password:"",

        rol: usuario.rol,

        estado: usuario.estado,

        institucionId: usuario.institucionId ?? undefined,

        proveedorId: usuario.proveedor?.id ?? undefined

      });
    }else{


      setForm(
        formularioInicial
      );


    }


  },[usuario]);

  const cambiar = (
    e:React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  )=>{

    setForm({

      ...form,

      [e.target.name]:
        (
        e.target.name === "institucionId" ||
        e.target.name === "proveedorId"
        )
        ?
        Number(e.target.value)
        :
        e.target.value

    });

  };
  const enviar=(

    e:React.FormEvent

  )=>{


    e.preventDefault();


    onGuardar(form);


  };

  return(


<form

onSubmit={enviar}

className="space-y-5"

>



<div className="grid gap-4 md:grid-cols-2">



<input

name="nombre"

value={form.nombre}

onChange={cambiar}

placeholder="Nombre"

required

className="
rounded-xl
border
p-3
"

/>



<input

name="apellido"

value={form.apellido}

onChange={cambiar}

placeholder="Apellido"

required

className="
rounded-xl
border
p-3
"

/>



</div>





<input

name="email"

type="email"

value={form.email}

onChange={cambiar}

placeholder="Correo electrónico"

required

className="
w-full
rounded-xl
border
p-3
"

/>





<input

name="telefono"

value={form.telefono}

onChange={cambiar}

placeholder="Teléfono"

className="
w-full
rounded-xl
border
p-3
"

/>





{
!usuario &&

(

<input

name="password"

type="password"

value={form.password}

onChange={cambiar}

placeholder="Contraseña"

required

className="
w-full
rounded-xl
border
p-3
"

/>

)

}





<div className="grid gap-4 md:grid-cols-2">





<select

name="rol"

value={form.rol}

onChange={cambiar}

className="
rounded-xl
border
p-3
"

>


<option value="ADMIN">

Administrador

</option>


<option value="INSTITUCION">

Institución

</option>


<option value="PROVEEDOR">

Proveedor

</option>


<option value="EMPLEADO">

Empleado

</option>



</select>

{
form.rol === "EMPLEADO" && (

<select

name="institucionId"

value={form.institucionId ?? ""}

onChange={cambiar}
className="
rounded-xl
border
p-3
"

>

<option value="">
Seleccionar institución
</option>

{
instituciones.map((inst)=>(
<option
key={inst.id}
value={inst.id}
>

{inst.nombre}

</option>
))
}

</select>
)
}

{
form.rol === "EMPLEADO" && (

<select

name="proveedorId"

value={form.proveedorId ?? ""}

onChange={cambiar}

className="
rounded-xl
border
p-3
"

>

<option value="">
Seleccionar proveedor
</option>


{
proveedores.map((prov)=>(
<option
key={prov.id}
value={prov.id}
>

{prov.nombreEmpresa}

</option>
))
}


</select>

)
}


<select

name="estado"

value={form.estado}

onChange={cambiar}

className="
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
">



<button

type="button"

onClick={onCancelar}

className="
rounded-xl
border
px-5
py-2
"

>

Cancelar

</button>





<button

type="submit"

className="
rounded-xl
bg-blue-600
px-5
py-2
text-white
hover:bg-blue-700
"

>

Guardar

</button>



</div>





</form>


  );

};


export default FormUsuario;