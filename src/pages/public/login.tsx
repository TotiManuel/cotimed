import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Lock,
    Mail,
    LogIn,
    ShieldCheck
} from "lucide-react";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();


        console.log({
            email,
            password
        });


        // Próximamente:
        // axios.post("/auth/login", {
        //     email,
        //     password
        // })

    };


    return (

        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">


            <div className="w-full max-w-md">


                {/* LOGO / TITULO */}

                <div className="text-center mb-10">


                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white">

                        <ShieldCheck size={32}/>

                    </div>


                    <h1 className="mt-6 text-4xl font-bold text-slate-900">

                        Bienvenido a CotiMed

                    </h1>


                    <p className="mt-3 text-slate-600">

                        Ingresá a tu cuenta para continuar

                    </p>


                </div>



                {/* FORMULARIO */}


                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-8 shadow-lg"
                >



                    {/* EMAIL */}


                    <div className="mb-6">


                        <label className="mb-2 block font-medium text-slate-700">

                            Email

                        </label>


                        <div className="relative">


                            <Mail
                                className="absolute left-3 top-3 text-slate-400"
                                size={20}
                            />


                            <input
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className="
                                w-full rounded-lg border
                                py-3 pl-10 pr-4
                                outline-none
                                focus:border-cyan-500
                                "
                                required
                            />


                        </div>


                    </div>




                    {/* PASSWORD */}


                    <div className="mb-8">


                        <label className="mb-2 block font-medium text-slate-700">

                            Contraseña

                        </label>


                        <div className="relative">


                            <Lock
                                className="absolute left-3 top-3 text-slate-400"
                                size={20}
                            />


                            <input
                                type="password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="********"
                                className="
                                w-full rounded-lg border
                                py-3 pl-10 pr-4
                                outline-none
                                focus:border-cyan-500
                                "
                                required
                            />


                        </div>


                    </div>




                    {/* BOTON */}


                    <button
                        type="submit"
                        className="
                        flex w-full items-center justify-center gap-3
                        rounded-lg bg-cyan-600
                        py-3 font-semibold text-white
                        transition
                        hover:bg-cyan-700
                        "
                    >

                        <LogIn size={20}/>

                        Ingresar

                    </button>




                    {/* LINKS */}


                    <div className="mt-6 text-center text-sm">


                        <Link
                            to="/recuperar-password"
                            className="text-cyan-600 hover:underline"
                        >

                            ¿Olvidaste tu contraseña?

                        </Link>


                    </div>



                    <div className="mt-6 border-t pt-6 text-center">


                        <p className="text-slate-600">

                            ¿Todavía no tenés cuenta?

                        </p>


                        <div className="mt-3 flex justify-center gap-4">


                            <Link
                                to="/registro/institucion"
                                className="font-semibold text-cyan-600 hover:underline"
                            >

                                Institución

                            </Link>



                            <span className="text-slate-400">
                                |
                            </span>



                            <Link
                                to="/registro/proveedor"
                                className="font-semibold text-cyan-600 hover:underline"
                            >

                                Proveedor

                            </Link>


                        </div>


                    </div>


                </form>


            </div>


        </main>

    );
};


export default Login;