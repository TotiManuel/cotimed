import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearInstitucion
} from "../../../services/instituciones.service";

import {
    Building2,
    Mail,
    Lock,
    UserPlus,
    ArrowLeft,
    MapPin,
    Globe,
    User
} from "lucide-react";


const AddInstitucion = () => {

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


    /**
     * CAMBIAR INPUT
     */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };


    /**
     * ENVIAR FORMULARIO
     */
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            await crearInstitucion(
                form
            );


            navigate(
                "/admin/instituciones"
            );


        } catch (error: unknown) {

            console.error(
                "Error creando institución:",
                error
            );


            if (error instanceof Error) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "Error al crear institución"
                );

            }


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="mx-auto max-w-3xl">


            {/* VOLVER */}

            <button

                type="button"

                onClick={() =>
                    navigate(
                        "/admin/instituciones"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>



            {/* CONTENEDOR */}

            <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">


                {/* CABECERA */}

                <div className="mb-8">


                    <div className="flex items-center gap-3">


                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <Building2 size={28} />

                        </div>


                        <div>

                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">

                                Nueva institución

                            </h1>


                            <p className="text-sm text-slate-600 sm:text-base">

                                Registrar una institución en CotiMed

                            </p>

                        </div>

                    </div>

                </div>



                {/* FORMULARIO */}

                <form

                    onSubmit={handleSubmit}

                    className="space-y-6"

                >


                    {/* CONTACTO */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre del contacto

                        </label>


                        <div className="relative">

                            <User

                                size={20}

                                className="absolute left-3 top-3 text-slate-400"

                            />


                            <input

                                name="name_user"

                                value={form.name_user}

                                onChange={handleChange}

                                placeholder="Juan Pérez"

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>

                    </div>



                    {/* RAZÓN SOCIAL */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Razón social

                        </label>


                        <input

                            name="razon_social"

                            value={form.razon_social}

                            onChange={handleChange}

                            placeholder="Hospital Central S.A."

                            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500"

                            required

                        />

                    </div>



                    {/* ORGANIZACIÓN */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Organización

                        </label>


                        <input

                            name="organizacion"

                            value={form.organizacion}

                            onChange={handleChange}

                            placeholder="Hospital Central"

                            className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500"

                            required

                        />

                    </div>



                    {/* DIRECCIÓN */}

                    <div>

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

                                placeholder="Av. Principal 123"

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>

                    </div>



                    {/* UBICACIÓN */}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">


                        {/* PAÍS */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                País

                            </label>


                            <div className="relative">

                                <Globe

                                    size={20}

                                    className="absolute left-3 top-3 text-slate-400"

                                />


                                <input

                                    name="pais_user"

                                    value={form.pais_user}

                                    onChange={handleChange}

                                    placeholder="Argentina"

                                    className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500"

                                    required

                                />

                            </div>

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

                                className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>



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

                                className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>



                        {/* ESTADO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Estado

                            </label>


                            <input

                                name="estado_user"

                                value={form.estado_user}

                                onChange={handleChange}

                                placeholder="Activo"

                                className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>

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

                                placeholder="institucion@email.com"

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>

                    </div>



                    {/* CONTRASEÑA */}

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

                                className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none transition focus:border-cyan-500"

                                required

                                minLength={6}

                            />

                        </div>


                        <p className="mt-1 text-xs text-slate-500">

                            Mínimo 6 caracteres.

                        </p>

                    </div>



                    {/* ERROR */}

                    {error && (

                        <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">

                            {error}

                        </div>

                    )}



                    {/* BOTÓN */}

                    <button

                        type="submit"

                        disabled={loading}

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"

                    >

                        <UserPlus size={20} />


                        {loading

                            ? "Guardando..."

                            : "Crear institución"

                        }

                    </button>


                </form>


            </div>

        </div>

    );

};


export default AddInstitucion;