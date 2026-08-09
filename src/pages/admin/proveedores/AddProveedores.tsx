import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearProveedor
} from "../../../services/proveedores.service";

import {
    Truck,
    Mail,
    Lock,
    UserPlus,
    ArrowLeft
} from "lucide-react";


const AddProveedor = () => {


    const navigate = useNavigate();


    const [form, setForm] = useState({

        name_user: "",

        email: "",

        password: "",

        organizacion: ""

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

        setLoading(true);


        try {


            await crearProveedor(

                form

            );


            navigate(
                "/admin/proveedores"
            );


        } catch (error: any) {


            setError(

                error.message ||
                "Error al crear proveedor"

            );


        } finally {


            setLoading(false);

        }

    };


    return (

        <div className="max-w-2xl mx-auto">


            <button

                onClick={() =>
                    navigate("/admin/proveedores")
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20}/>

                Volver

            </button>


            <div className="rounded-2xl bg-white p-8 shadow-lg">


                <div className="mb-8">


                    <div className="flex items-center gap-3">


                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <Truck size={28}/>

                        </div>


                        <div>

                            <h1 className="text-3xl font-bold text-slate-900">

                                Nuevo proveedor

                            </h1>


                            <p className="text-slate-600">

                                Registrar un proveedor en CotiMed

                            </p>

                        </div>

                    </div>

                </div>


                <form

                    onSubmit={handleSubmit}

                    className="space-y-6"

                >


                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre del contacto

                        </label>


                        <input

                            name="name_user"

                            value={form.name_user}

                            onChange={handleChange}

                            placeholder="Juan Pérez"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Organización / Empresa

                        </label>


                        <input

                            name="organizacion"

                            value={form.organizacion}

                            onChange={handleChange}

                            placeholder="MedEquip S.A."

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>


                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

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

                                placeholder="proveedor@email.com"

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"

                                required

                            />

                        </div>

                    </div>


                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Contraseña inicial

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


                    {
                        error && (

                            <p className="text-center text-sm text-red-600">

                                {error}

                            </p>

                        )
                    }


                    <button

                        type="submit"

                        disabled={loading}

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >

                        <UserPlus size={20}/>


                        {
                            loading
                            ?
                            "Guardando..."
                            :
                            "Crear proveedor"
                        }

                    </button>


                </form>


            </div>

        </div>

    );

};


export default AddProveedor;
