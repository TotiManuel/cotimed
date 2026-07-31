import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";


const Login = () => {


    const navigate = useNavigate();



    const [form,setForm] = useState({

        email:"",
        password:""

    });



    const [mensaje,setMensaje] = useState("");




    const handleChange = (

        e:React.ChangeEvent<HTMLInputElement>

    )=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };




    const handleSubmit = async (

        e:React.FormEvent

    )=>{


        e.preventDefault();



        try{


            const data = await api(

                "/auth/login",

                {

                    method:"POST",

                    body:JSON.stringify(form)

                }

            );



            localStorage.setItem(

                "token",

                data.token

            );



            localStorage.setItem(

                "rol",

                data.rol

            );





            if(data.rol === "INSTITUCION"){


                navigate("/institucion/dashboard");


            }else if(data.rol === "PROVEEDOR"){


                navigate("/proveedor/dashboard");


            }





        }catch(error:any){


            setMensaje(
                error.message
            );


        }


    };




    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">


            <form

                onSubmit={handleSubmit}

                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"

            >


                <h1 className="text-3xl font-bold mb-6">

                    Iniciar sesión

                </h1>



                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 border rounded-xl"

                />



                <input

                    name="password"

                    type="password"

                    placeholder="Contraseña"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 border rounded-xl"

                />



                <button

                    className="w-full bg-blue-600 text-white p-3 rounded-xl"

                >

                    Entrar

                </button>



                <p className="mt-4 text-center text-red-600">

                    {mensaje}

                </p>


            </form>


        </div>

    );


};


export default Login;