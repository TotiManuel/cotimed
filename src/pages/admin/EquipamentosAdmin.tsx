import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    obtener,
    type Equipamento
} from "../../services/equipamento.service";

import {
    buscarProveedor
} from "../../services/proveedores.service";


const EquipamentosAdmin = () => {

    const navigate = useNavigate();


    /*
     * =========================================================
     * ESTADOS
     * =========================================================
     */

    const [
        equipamientos,
        setEquipamientos
    ] = useState<Equipamento[]>([]);


    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        nombresProveedores,
        setNombresProveedores
    ] = useState<Record<number, string>>({});


    /*
     * =========================================================
     * CARGAR EQUIPAMIENTOS
     * =========================================================
     */

    useEffect(() => {

        const cargarEquipamientos = async () => {

            try {

                setCargando(true);

                setError("");


                const data =
                    await obtener();


                setEquipamientos(data);


                /*
                 * Obtener nombres de proveedores
                 */

                const proveedores =
                    await Promise.all(

                        data.map(
                            async (equipo) => {

                                try {

                                    const proveedor =
                                        await buscarProveedor(
                                            Number(
                                                equipo.proveedor_id
                                            )
                                        );


                                    return {

                                        id:
                                            equipo.proveedor_id,

                                        nombre:
                                            proveedor?.organizacion ||
                                            proveedor?.name_user ||
                                            "Proveedor no encontrado"

                                    };

                                } catch (error) {

                                    console.error(
                                        `Error obteniendo proveedor ${equipo.proveedor_id}:`,
                                        error
                                    );


                                    return {

                                        id:
                                            equipo.proveedor_id,

                                        nombre:
                                            "Proveedor no encontrado"

                                    };

                                }

                            }
                        )

                    );


                /*
                 * Convertir proveedores
                 * a objeto para búsqueda rápida
                 */

                const nombres:
                    Record<number, string> = {};


                proveedores.forEach(
                    (proveedor) => {

                        nombres[
                            proveedor.id
                        ] =
                            proveedor.nombre;

                    }
                );


                setNombresProveedores(
                    nombres
                );


            } catch (error: unknown) {

                console.error(
                    "Error cargando equipamientos:",
                    error
                );


                if (
                    error instanceof Error
                ) {

                    setError(
                        error.message
                    );

                } else {

                    setError(
                        "No se pudieron cargar los equipamientos."
                    );

                }

            } finally {

                setCargando(false);

            }

        };


        cargarEquipamientos();

    }, []);


    /*
     * =========================================================
     * FORMATEAR PRECIO
     * =========================================================
     */

    const formatearPrecio = (
        precio: number
    ): string => {

        return precio.toLocaleString(
            "es-AR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    };


    /*
     * =========================================================
     * FORMATEAR VALORES UNKNOWN
     * =========================================================
     *
     * Como el service generado utiliza "unknown" para algunos
     * campos, nunca los renderizamos directamente.
     *
     * Esta función convierte cualquier valor a texto seguro.
     */

    const mostrarValor = (
        valor: unknown,
        valorPorDefecto = "—"
    ): string => {

        if (
            valor === null ||
            valor === undefined
        ) {

            return valorPorDefecto;

        }


        if (
            typeof valor === "string"
        ) {

            return valor;

        }


        if (
            typeof valor === "number" ||
            typeof valor === "boolean"
        ) {

            return String(valor);

        }


        /*
         * Si es un objeto o array,
         * intentamos convertirlo a JSON.
         */

        try {

            return JSON.stringify(
                valor
            );

        } catch {

            return valorPorDefecto;

        }

    };


    /*
     * =========================================================
     * VISTA
     * =========================================================
     */

    return (

        <>

            {/* =================================================
                ENCABEZADO
            ================================================= */}

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-slate-900">

                        Equipamientos

                    </h1>


                    <p className="mt-2 text-slate-600">

                        Gestioná todos los equipos publicados
                        por los proveedores.

                    </p>

                </div>


                <button

                    onClick={() =>
                        navigate(
                            "/admin/AddEquipamento"
                        )
                    }

                    className="
                        rounded-xl
                        bg-violet-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-violet-700
                    "

                >

                    Agregar equipamiento

                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {
                error && (

                    <div
                        className="
                            mb-6
                            rounded-xl
                            bg-red-50
                            p-4
                            text-red-600
                        "
                    >

                        {error}

                    </div>

                )
            }


            {/* =================================================
                CARGANDO
            ================================================= */}

            {
                cargando

                    ?

                    (

                        <div
                            className="
                                rounded-2xl
                                bg-white
                                p-8
                                text-center
                                shadow
                            "
                        >

                            <p className="text-slate-600">

                                Cargando equipamientos...

                            </p>

                        </div>

                    )

                    :

                    (

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                bg-white
                                shadow
                            "
                        >

                            {/* =================================
                                SIN EQUIPAMIENTOS
                            ================================= */}

                            {
                                equipamientos.length === 0

                                    ?

                                    (

                                        <div className="p-10 text-center">

                                            <p
                                                className="
                                                    text-lg
                                                    font-semibold
                                                    text-slate-700
                                                "
                                            >

                                                No hay equipamientos
                                                registrados.

                                            </p>


                                            <p className="mt-2 text-slate-500">

                                                Todavía no se ha agregado
                                                ningún equipamiento.

                                            </p>

                                        </div>

                                    )

                                    :

                                    (

                                        /* =============================
                                           TABLA
                                        ============================= */

                                        <div className="overflow-x-auto">

                                            <table className="w-full">

                                                <thead
                                                    className="
                                                        bg-slate-100
                                                    "
                                                >

                                                    <tr>

                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-left
                                                            "
                                                        >

                                                            Equipo

                                                        </th>


                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-left
                                                            "
                                                        >

                                                            Categoría

                                                        </th>


                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-left
                                                            "
                                                        >

                                                            Proveedor

                                                        </th>


                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-left
                                                            "
                                                        >

                                                            Precio

                                                        </th>


                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-center
                                                            "
                                                        >

                                                            Estado

                                                        </th>


                                                        <th
                                                            className="
                                                                px-6
                                                                py-4
                                                                text-center
                                                            "
                                                        >

                                                            Acciones

                                                        </th>

                                                    </tr>

                                                </thead>


                                                <tbody>

                                                    {
                                                        equipamientos.map(
                                                            (
                                                                equipo
                                                            ) => (

                                                                <tr

                                                                    key={
                                                                        equipo.id
                                                                    }

                                                                    className="
                                                                        border-t
                                                                        transition
                                                                        hover:bg-slate-50
                                                                    "

                                                                >

                                                                    {/* =================
                                                                        EQUIPO
                                                                    ================= */}

                                                                    <td className="px-6 py-5">

                                                                        <div>

                                                                            <p
                                                                                className="
                                                                                    font-semibold
                                                                                    text-slate-900
                                                                                "
                                                                            >

                                                                                {
                                                                                    equipo.nombre
                                                                                }

                                                                            </p>


                                                                            <p
                                                                                className="
                                                                                    mt-1
                                                                                    text-sm
                                                                                    text-slate-500
                                                                                "
                                                                            >

                                                                                {
                                                                                    equipo.marca ||
                                                                                    "Sin marca"
                                                                                }


                                                                                {

                                                                                    equipo.modelo

                                                                                        ?

                                                                                        ` ${equipo.modelo}`

                                                                                        :

                                                                                        ""

                                                                                }

                                                                            </p>

                                                                        </div>

                                                                    </td>


                                                                    {/* =================
                                                                        CATEGORÍA
                                                                    ================= */}

                                                                    <td className="px-6 py-5">

                                                                        <span className="text-slate-700">

                                                                            Categoría #

                                                                            {
                                                                                equipo.categoria_id
                                                                            }

                                                                        </span>

                                                                    </td>


                                                                    {/* =================
                                                                        PROVEEDOR
                                                                    ================= */}

                                                                    <td className="px-6 py-5">

                                                                        <span className="text-slate-700">

                                                                            {
                                                                                nombresProveedores[
                                                                                    equipo.proveedor_id
                                                                                ] ||
                                                                                "Cargando proveedor..."
                                                                            }

                                                                        </span>

                                                                    </td>


                                                                    {/* =================
                                                                        PRECIO
                                                                    ================= */}

                                                                    <td className="px-6 py-5">

                                                                        <span
                                                                            className="
                                                                                font-semibold
                                                                                text-cyan-600
                                                                            "
                                                                        >

                                                                            $

                                                                            {
                                                                                formatearPrecio(
                                                                                    equipo.precio_unitario
                                                                                )
                                                                            }

                                                                        </span>

                                                                    </td>


                                                                    {/* =================
                                                                        ESTADO
                                                                    ================= */}

                                                                    <td className="px-6 py-5 text-center">

                                                                        <span
                                                                            className="
                                                                                rounded-full
                                                                                bg-violet-100
                                                                                px-3
                                                                                py-1
                                                                                text-sm
                                                                                font-semibold
                                                                                text-violet-700
                                                                            "
                                                                        >

                                                                            {
                                                                                mostrarValor(
                                                                                    equipo.estado,
                                                                                    "Sin estado"
                                                                                )
                                                                            }

                                                                        </span>

                                                                    </td>


                                                                    {/* =================
                                                                        ACCIONES
                                                                    ================= */}

                                                                    <td className="px-6 py-5 text-center">

                                                                        <button

                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/admin/VerEquipamento/${equipo.id}`
                                                                                )
                                                                            }

                                                                            className="
                                                                                rounded-lg
                                                                                border
                                                                                px-4
                                                                                py-2
                                                                                transition
                                                                                hover:bg-slate-100
                                                                            "

                                                                        >

                                                                            Ver

                                                                        </button>

                                                                    </td>

                                                                </tr>

                                                            )

                                                        )

                                                    }

                                                </tbody>

                                            </table>

                                        </div>

                                    )

                            }

                        </div>

                    )

            }

        </>

    );

};


export default EquipamentosAdmin;