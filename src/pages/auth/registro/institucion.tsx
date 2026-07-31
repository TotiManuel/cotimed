import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Building2,
    Mail,
    Lock,
    Phone,
    UserPlus
} from "lucide-react";

import { registrarInstitucion } from "../../../services/auth.service";


const RegistroInstitucion = () => {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        nombreInstitucion: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: ""

    });



    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);




    const handleChange = (

        e: React.ChangeEvent<HTMLInputElement>

    ) => {


        setForm({

            ...form,

            [e.target.name]: e.target.value

        });


    };






    const handleSubmit = async (

        e: React.FormEvent

    ) => {


        e.preventDefault();


        setError("");



        if(form.password !== form.confirmarPassword){

            setError(
                "Las contraseñas no coinciden"
            );

            return;

        }




        try {


            setLoading(true);



            await registrarInstitucion({

                nombreInstitucion: form.nombreInstitucion,

                email: form.email,

                telefono: form.telefono,

                password: form.password

            });



            navigate("/login");



        } catch(err:any){


            setError(

                err.message || 
                "Error al registrar institución"

            );


        } finally {


            setLoading(false);


        }


    };






    return (

        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">


            <div className="w-full max-w-lg">



                <div className="mb-10 text-center">


                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white">


                        <Building2 size={32}/>


                    </div>



                    <h1 className="mt-6 text-4xl font-bold text-slate-900">

                        Registrar institución

                    </h1>



                    <p className="mt-3 text-slate-600">

                        Creá tu cuenta para solicitar cotizaciones.

                    </p>


                </div>





                <form

                    onSubmit={handleSubmit}

                    className="rounded-2xl bg-white p-8 shadow-lg"

                >



                    {error && (

                        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">

                            {error}

                        </div>

                    )}






                    <div className="mb-5">


                        <label className="mb-2 block font-medium">

                            Nombre institución

                        </label>



                        <div className="relative">


                            <Building2

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <input

                                name="nombreInstitucion"

                                value={form.nombreInstitucion}

                                onChange={handleChange}

                                placeholder="Hospital, clínica..."

                                className="w-full rounded-lg border py-3 pl-10 pr-4"

                                required

                            />


                        </div>


                    </div>







                    <div className="mb-5">


                        <label className="mb-2 block font-medium">

                            Email

                        </label>



                        <div className="relative">


                            <Mail

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <input

                                type="email"

                                name="email"

                                value={form.email}

                                onChange={handleChange}

                                placeholder="contacto@institucion.com"

                                className="w-full rounded-lg border py-3 pl-10 pr-4"

                                required

                            />


                        </div>


                    </div>







                    <div className="mb-5">


                        <label className="mb-2 block font-medium">

                            Teléfono

                        </label>



                        <div className="relative">


                            <Phone

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <input

                                name="telefono"

                                value={form.telefono}

                                onChange={handleChange}

                                placeholder="+54..."

                                className="w-full rounded-lg border py-3 pl-10 pr-4"

                            />


                        </div>


                    </div>







                    <div className="mb-5">


                        <label className="mb-2 block font-medium">

                            Contraseña

                        </label>



                        <div className="relative">


                            <Lock

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <input

                                type="password"

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                                className="w-full rounded-lg border py-3 pl-10 pr-4"

                                required

                            />


                        </div>


                    </div>






                    <div className="mb-8">


                        <label className="mb-2 block font-medium">

                            Confirmar contraseña

                        </label>



                        <input

                            type="password"

                            name="confirmarPassword"

                            value={form.confirmarPassword}

                            onChange={handleChange}

                            className="w-full rounded-lg border py-3 px-4"

                            required

                        />


                    </div>







                    <button

                        disabled={loading}

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >


                        <UserPlus size={20}/>


                        {loading
                            ? "Creando cuenta..."
                            : "Crear cuenta"
                        }


                    </button>





                    <p className="mt-6 text-center text-sm">


                        ¿Ya tenés cuenta?


                        <Link

                            to="/login"

                            className="ml-2 text-cyan-600 font-semibold"

                        >

                            Ingresar

                        </Link>


                    </p>



                </form>


            </div>


        </main>

    );

};


export default RegistroInstitucion;