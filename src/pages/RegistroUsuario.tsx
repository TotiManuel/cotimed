import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;



const RegistroUsuario = () => {


  const navigate = useNavigate();


  const [formulario, setFormulario] = useState({

    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
    rol: "INSTITUCION"

  });



  const [mensaje, setMensaje] = useState("");

  const [error, setError] = useState("");

  const [cargando, setCargando] = useState(false);




  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    setFormulario({

      ...formulario,

      [e.target.name]: e.target.value

    });

  };





  const handleSubmit = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    setMensaje("");

    setError("");



    if(
      formulario.password !== formulario.confirmarPassword
    ){

      setError(
        "Las contraseñas no coinciden"
      );

      return;

    }




    try {


      setCargando(true);



      const response = await fetch(
        `${API_URL}/auth/register`,
        {

          method:"POST",

          headers:{

            "Content-Type":"application/json"

          },


          body: JSON.stringify({

            nombre: formulario.nombre,

            apellido: formulario.apellido,

            email: formulario.email,

            password: formulario.password,

            rol: formulario.rol

          })

        }

      );




      const data = await response.json();




      if(!response.ok){

        throw new Error(
          data.message || "Error al registrar usuario"
        );

      }



      setMensaje(
        "Usuario registrado correctamente"
      );



      setTimeout(()=>{

        navigate("/login");

      },1500);




    } catch(err:any){


      setError(
        err.message
      );


    } finally {


      setCargando(false);


    }


  };






  return (

    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">


      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">


        <h1 className="text-3xl font-bold text-slate-900 text-center">

          Crear cuenta

        </h1>



        <p className="mt-2 text-center text-slate-600">

          Regístrate en Cotimed

        </p>





        {
          mensaje && (

            <div className="mt-5 rounded-lg bg-green-100 p-3 text-green-700">

              {mensaje}

            </div>

          )
        }



        {
          error && (

            <div className="mt-5 rounded-lg bg-red-100 p-3 text-red-700">

              {error}

            </div>

          )
        }





        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >



          <input

            type="text"

            name="nombre"

            placeholder="Nombre"

            value={formulario.nombre}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

            required

          />




          <input

            type="text"

            name="apellido"

            placeholder="Apellido"

            value={formulario.apellido}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

            required

          />





          <input

            type="email"

            name="email"

            placeholder="Correo electrónico"

            value={formulario.email}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

            required

          />





          <input

            type="password"

            name="password"

            placeholder="Contraseña"

            value={formulario.password}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

            required

          />





          <input

            type="password"

            name="confirmarPassword"

            placeholder="Confirmar contraseña"

            value={formulario.confirmarPassword}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

            required

          />





          <select

            name="rol"

            value={formulario.rol}

            onChange={handleChange}

            className="w-full rounded-lg border p-3"

          >

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






          <button

            disabled={cargando}

            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

          >

            {
              cargando
              ? "Registrando..."
              : "Registrarse"
            }


          </button>





        </form>





      </section>



    </main>

  );

};



export default RegistroUsuario;