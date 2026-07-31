import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Building2,
    Mail,
    Lock,
    Phone,
    UserPlus
} from "lucide-react";


const RegistroInstitucion = () => {

    const [form, setForm] = useState({
        nombreInstitucion: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: ""
    });


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        console.log(form);


        // Próximo paso:
        // axios.post("/auth/register/institucion", form)

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

                        Creá tu cuenta para solicitar cotizaciones médicas.

                    </p>


                </div>




                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-8 shadow-lg"
                >



                    <div className="mb-5">

                        <label className="mb-2 block font-medium text-slate-700">
                            Nombre de la institución
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
                                placeholder="Hospital, clínica, sanatorio..."
                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>

                    </div>




                    <div className="mb-5">

                        <label className="mb-2 block font-medium text-slate-700">
                            Email institucional
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
                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>

                    </div>




                    <div className="mb-5">

                        <label className="mb-2 block font-medium text-slate-700">
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
                                placeholder="+54 0000 000000"
                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                    </div>




                    <div className="mb-5">

                        <label className="mb-2 block font-medium text-slate-700">
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
                                placeholder="********"
                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>

                    </div>




                    <div className="mb-8">

                        <label className="mb-2 block font-medium text-slate-700">
                            Confirmar contraseña
                        </label>


                        <input
                            type="password"
                            name="confirmarPassword"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full rounded-lg border py-3 px-4 outline-none focus:border-cyan-500"
                            required
                        />

                    </div>




                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"
                    >

                        <UserPlus size={20}/>

                        Crear cuenta

                    </button>



                    <p className="mt-6 text-center text-sm text-slate-600">

                        ¿Ya tenés cuenta?

                        <Link
                            to="/login"
                            className="ml-2 font-semibold text-cyan-600 hover:underline"
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