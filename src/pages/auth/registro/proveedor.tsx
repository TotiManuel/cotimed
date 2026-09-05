import { useState } from "react";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";


const RegistroProveedor = () => {


    const navigate = useNavigate();


    const [form,setForm] = useState({

        nombreEmpresa:"",
        razonSocial:"",
        email:"",
        password:""

    });



    const [mensaje,setMensaje] = useState("");




    const handleChange = (

        e: React.ChangeEvent<HTMLInputElement>

    ) => {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    };




    const handleSubmit = async (

        e:React.FormEvent

    )=>{


        e.preventDefault();


        try{


            await api.post(

                "/auth/register/proveedor",

                {

                    method:"POST",

                    body:JSON.stringify(form)

                }

            );



            setMensaje(
                "Proveedor creado correctamente"
            );


            setTimeout(()=>{

                navigate("/login");

            },1500);



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

                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"

            >


                <h1 className="text-3xl font-bold mb-6">

                    Registrar Proveedor

                </h1>



                <input

                    name="nombreEmpresa"

                    placeholder="Nombre empresa"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 border rounded-xl"

                />



                <input

                    name="razonSocial"

                    placeholder="Razón social"

                    onChange={handleChange}

                    className="w-full mb-4 p-3 border rounded-xl"

                />



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

                    Crear cuenta

                </button>



                <p className="mt-4 text-center">

                    {mensaje}

                </p>


            </form>


        </div>

    );


};


export default RegistroProveedor;