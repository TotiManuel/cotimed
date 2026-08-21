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
    ArrowLeft,
    Building2,
    MapPin
} from "lucide-react";


const AddProveedor = () => {

    const navigate = useNavigate();


    const [form, setForm] = useState({

        name_user: "",

        razon_social: "",

        direccion: "",

        email: "",

        password: "",

        organizacion: "",

        estado_user: "",

        ciudad_user: "",

        provincia_user: "",

        pais_user: "Argentina"

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

            await crearProveedor(form);

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

        <div className="mx-auto max-w-3xl">

            {/* VOLVER */}

            <button

                onClick={() =>
                    navigate("/admin/proveedores")
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>


            {/* CONTENEDOR */}

            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">


                {/* TITULO */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <Truck size={28} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">

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
                    className="space-y-8"
                >


                    {/* =========================
                        DATOS DEL CONTACTO
                    ========================= */}

                    <div>

                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">

                            <UserPlus size={20} />

                            Datos del contacto

                        </h2>


                        <div className="grid gap-5 md:grid-cols-2">


                            {/* NOMBRE */}

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


                            {/* EMAIL */}

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


                            {/* CONTRASEÑA */}

                            <div className="md:col-span-2">

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

                        </div>

                    </div>


                    {/* =========================
                        DATOS DE LA EMPRESA
                    ========================= */}

                    <div>

                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">

                            <Building2 size={20} />

                            Datos de la empresa

                        </h2>


                        <div className="grid gap-5 md:grid-cols-2">


                            {/* ORGANIZACION */}

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


                            {/* RAZON SOCIAL */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Razón social

                                </label>


                                <input

                                    name="razon_social"

                                    value={form.razon_social}

                                    onChange={handleChange}

                                    placeholder="MedEquip Sociedad Anónima"

                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                            {/* DIRECCION */}

                            <div className="md:col-span-2">

                                <label className="mb-2 block font-medium text-slate-700">

                                    Dirección

                                </label>


                                <div className="relative">

                                    <MapPin
                                        size={20}
                                        className="absolute left-3 top-3 text-slate-400"
                                    />


                                    <input

                                        name="direccion"

                                        value={form.direccion}

                                        onChange={handleChange}

                                        placeholder="Av. San Martín 1234"

                                        className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-cyan-500"

                                        required

                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        UBICACION
                    ========================= */}

                    <div>

                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">

                            <MapPin size={20} />

                            Ubicación

                        </h2>


                        <div className="grid gap-5 md:grid-cols-2">


                            {/* CIUDAD */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Ciudad

                                </label>


                                <input

                                    name="ciudad_user"

                                    value={form.ciudad_user}

                                    onChange={handleChange}

                                    placeholder="Villa María"

                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                            {/* PROVINCIA */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Provincia

                                </label>


                                <input

                                    name="provincia_user"

                                    value={form.provincia_user}

                                    onChange={handleChange}

                                    placeholder="Córdoba"

                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                            {/* ESTADO */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Estado / Región

                                </label>


                                <input

                                    name="estado_user"

                                    value={form.estado_user}

                                    onChange={handleChange}

                                    placeholder="Córdoba"

                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>


                            {/* PAIS */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    País

                                </label>


                                <input

                                    name="pais_user"

                                    value={form.pais_user}

                                    onChange={handleChange}

                                    placeholder="Argentina"

                                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                                    required

                                />

                            </div>

                        </div>

                    </div>


                    {/* ERROR */}

                    {
                        error && (

                            <div className="rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">

                                {error}

                            </div>

                        )
                    }


                    {/* BOTON */}

                    <button

                        type="submit"

                        disabled={loading}

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"

                    >

                        <UserPlus size={20} />

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