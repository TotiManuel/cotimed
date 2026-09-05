import {
    Search,
    Building2,
    Star,
    Package,
    CheckCircle
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    listarProveedores,
    type Proveedor
} from "../../services/proveedores.service";


const ProveedoresInstitucion = () => {

    const [proveedores, setProveedores] = useState<Proveedor[]>([]);

    const [busqueda, setBusqueda] = useState("");

    const [cargando, setCargando] = useState(true);

    const [error, setError] = useState("");


    /*
     * ==========================================
     * CARGAR PROVEEDORES
     * ==========================================
     */

    useEffect(() => {

        const cargarProveedores = async () => {

            try {

                setCargando(true);
                setError("");

                const datos =
                    await listarProveedores();

                setProveedores(datos);

            } catch (error) {

                console.error(
                    "Error al cargar proveedores:",
                    error
                );

                setError(
                    "No se pudieron cargar los proveedores."
                );

            } finally {

                setCargando(false);

            }

        };


        cargarProveedores();

    }, []);


    /*
     * ==========================================
     * FILTRAR PROVEEDORES
     * ==========================================
     */

    const proveedoresFiltrados =
        proveedores.filter((proveedor) => {

            const texto =
                busqueda.toLowerCase().trim();

            if (!texto) {
                return true;
            }

            return (

                proveedor.name_user
                    ?.toLowerCase()
                    .includes(texto)

                ||

                proveedor.organizacion
                    ?.toLowerCase()
                    .includes(texto)

                ||

                proveedor.email
                    ?.toLowerCase()
                    .includes(texto)

            );

        });


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
     */

    if (cargando) {

        return (

            <div className="flex min-h-64 items-center justify-center">

                <p className="text-slate-500">

                    Cargando proveedores...

                </p>

            </div>

        );

    }


    /*
     * ==========================================
     * VISTA
     * ==========================================
     */

    return (

        <>

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Proveedores

                </h1>


                <p className="mt-2 text-slate-600">

                    Encontrá proveedores médicos registrados dentro de CotiMed.

                </p>

            </div>


            {/* ==================================
                BUSCADOR
            ================================== */}

            <div className="mb-8 rounded-2xl bg-white p-6 shadow">

                <div className="relative">

                    <Search

                        size={20}

                        className="absolute left-4 top-3.5 text-slate-400"

                    />


                    <input

                        value={busqueda}

                        onChange={(e) =>
                            setBusqueda(
                                e.target.value
                            )
                        }

                        placeholder="Buscar proveedor, organización o email..."

                        className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-cyan-600"

                    />

                </div>

            </div>


            {/* ==================================
                ERROR
            ================================== */}

            {error && (

                <div className="mb-8 rounded-xl bg-red-50 p-4 text-red-700">

                    {error}

                </div>

            )}


            {/* ==================================
                SIN RESULTADOS
            ================================== */}

            {proveedoresFiltrados.length === 0 && (

                <div className="rounded-2xl bg-white p-12 text-center shadow">

                    <Building2
                        size={48}
                        className="mx-auto text-slate-400"
                    />

                    <h2 className="mt-5 text-xl font-bold">

                        No se encontraron proveedores

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Probá con otro nombre de proveedor u organización.

                    </p>

                </div>

            )}


            {/* ==================================
                PROVEEDORES
            ================================== */}

            <div className="grid gap-6 lg:grid-cols-2">

                {

                    proveedoresFiltrados.map((proveedor) => (

                        <div

                            key={proveedor.id}

                            className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"

                        >

                            <div className="flex items-start justify-between">

                                <div className="flex gap-4">


                                    {/* ICONO */}

                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">

                                        <Building2 size={32} />

                                    </div>


                                    {/* INFORMACIÓN */}

                                    <div>

                                        <div className="flex flex-wrap items-center gap-2">

                                            <h2 className="text-2xl font-bold">

                                                {proveedor.organizacion}

                                            </h2>


                                            <CheckCircle

                                                size={20}

                                                className="text-emerald-600"

                                                aria-label="Proveedor registrado"

                                            />

                                        </div>


                                        <p className="mt-2 text-slate-500">

                                            {proveedor.name_user}

                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================
                                DATOS
                            ================================== */}

                            <div className="mt-6 space-y-4">


                                {/* EMAIL */}

                                <div className="flex items-center gap-3 text-slate-600">

                                    <span className="font-medium">

                                        Email:

                                    </span>

                                    <span>

                                        {proveedor.email}

                                    </span>

                                </div>


                                {/* ID */}

                                <div className="flex items-center gap-3 text-slate-600">

                                    <Package size={18} />

                                    <span>

                                        Proveedor #{proveedor.id}

                                    </span>

                                </div>


                                {/* ROL */}

                                <div className="flex items-center gap-3">

                                    <Star

                                        size={18}

                                        className="fill-yellow-400 text-yellow-400"

                                    />

                                    <span className="font-semibold">

                                        {proveedor.rol}

                                    </span>

                                    <span className="text-slate-500">

                                        registrado en CotiMed

                                    </span>

                                </div>


                            </div>


                            {/* ==================================
                                BOTONES
                            ================================== */}

                            <div className="mt-8 flex gap-4">

                                <button

                                    type="button"

                                    className="flex-1 rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700"

                                >

                                    Ver perfil

                                </button>


                                <button

                                    type="button"

                                    className="flex-1 rounded-xl border py-3 font-semibold transition hover:bg-slate-100"

                                >

                                    Solicitar cotización

                                </button>

                            </div>


                        </div>

                    ))

                }

            </div>

        </>

    );

};


export default ProveedoresInstitucion;