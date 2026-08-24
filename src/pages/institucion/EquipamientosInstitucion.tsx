import {
    Search,
    Package
} from "lucide-react";

import {
    useEffect,
    useMemo,
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
    listarProveedores,
    type Proveedor
} from "../../services/proveedores.service";


const EquipamientosInstitucion = () => {

    const navigate = useNavigate();


    // =========================================================
    // ESTADOS
    // =========================================================

    const [
        equipos,
        setEquipos
    ] = useState<Equipamento[]>([]);


    const [
        proveedores,
        setProveedores
    ] = useState<Proveedor[]>([]);


    const [
        busqueda,
        setBusqueda
    ] = useState("");


    const [
        categoria,
        setCategoria
    ] = useState("");


    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    // =========================================================
    // CARGAR EQUIPAMIENTOS Y PROVEEDORES
    // =========================================================

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                setCargando(true);
                setError("");


                const [
                    equiposData,
                    proveedoresData
                ] = await Promise.all([

                    obtener(),

                    listarProveedores()

                ]);


                setEquipos(
                    equiposData
                );


                setProveedores(
                    proveedoresData
                );


            } catch (err) {

                console.error(
                    "Error cargando equipamientos:",
                    err
                );


                setError(
                    "No se pudieron cargar los equipamientos."
                );


            } finally {

                setCargando(false);

            }

        };


        cargarDatos();

    }, []);


    // =========================================================
    // BUSCAR PROVEEDOR
    // =========================================================

    const obtenerProveedor = (
        proveedorId: number
    ): Proveedor | undefined => {

        return proveedores.find(
            (proveedor) =>
                Number(proveedor.id) ===
                Number(proveedorId)
        );

    };


    // =========================================================
    // CATEGORÍAS
    // =========================================================
    //
    // El servicio actual solamente devuelve categoria_id.
    // Por eso usamos el ID como categoría hasta tener
    // un servicio de categorías.
    //

    const categorias = useMemo(() => {

        return Array.from(

            new Set(

                equipos

                    .map(
                        (equipo) =>
                            equipo.categoria_id
                    )

                    .filter(
                        (id) =>
                            id !== null &&
                            id !== undefined
                    )

            )

        ).sort(
            (a, b) =>
                Number(a) -
                Number(b)
        );

    }, [equipos]);


    // =========================================================
    // FILTRAR EQUIPAMIENTOS
    // =========================================================

    const equiposFiltrados = useMemo(() => {

        const texto =
            busqueda
                .trim()
                .toLowerCase();


        return equipos.filter(
            (equipo) => {

                /*
                 * Evitamos problemas con campos null.
                 */

                const nombre =
                    equipo.nombre
                        ?.toLowerCase() ||
                    "";


                const marca =
                    equipo.marca
                        ?.toLowerCase() ||
                    "";


                const modelo =
                    equipo.modelo
                        ?.toLowerCase() ||
                    "";


                const numeroParte =
                    equipo.numero_parte
                        ?.toLowerCase() ||
                    "";


                const codigoInterno =
                    equipo.codigo_interno
                        ?.toLowerCase() ||
                    "";


                const fabricante =
                    equipo.fabricante
                        ?.toLowerCase() ||
                    "";


                const origen =
                    equipo.origen
                        ?.toLowerCase() ||
                    "";


                const descripcion =
                    equipo.descripcion
                        ?.toLowerCase() ||
                    "";


                const categoriaTexto =
                    String(
                        equipo.categoria_id
                    );


                const coincideBusqueda =

                    !texto ||

                    nombre.includes(texto) ||

                    marca.includes(texto) ||

                    modelo.includes(texto) ||

                    numeroParte.includes(texto) ||

                    codigoInterno.includes(texto) ||

                    fabricante.includes(texto) ||

                    origen.includes(texto) ||

                    descripcion.includes(texto) ||

                    categoriaTexto.includes(texto);


                const coincideCategoria =

                    !categoria ||

                    String(
                        equipo.categoria_id
                    ) === categoria;


                /*
                 * Solo mostramos equipos disponibles
                 * y no eliminados.
                 */

                const disponible =
                    equipo.disponible === true;


                const noEliminado =
                    equipo.eliminado !== true;


                return (

                    coincideBusqueda &&

                    coincideCategoria &&

                    disponible &&

                    noEliminado

                );

            }
        );

    }, [
        equipos,
        busqueda,
        categoria
    ]);


    // =========================================================
    // FORMATEAR PRECIO
    // =========================================================

    const formatearPrecio = (
        precio: number
    ) => {

        return new Intl.NumberFormat(
            "es-AR",
            {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2
            }
        ).format(
            Number(precio) || 0
        );

    };


    // =========================================================
    // OBTENER TEXTO DE MONEDA
    // =========================================================

    const obtenerMoneda = (
        moneda: unknown
    ) => {

        if (
            moneda === null ||
            moneda === undefined
        ) {

            return "USD";

        }


        if (
            typeof moneda === "string"
        ) {

            return moneda;

        }


        if (
            typeof moneda === "object"
        ) {

            const valor =
                moneda as Record<
                    string,
                    unknown
                >;


            if (
                typeof valor.name ===
                "string"
            ) {

                return valor.name;

            }


            if (
                typeof valor.value ===
                "string"
            ) {

                return valor.value;

            }

        }


        return String(
            moneda
        );

    };


    // =========================================================
    // CARGANDO
    // =========================================================

    if (cargando) {

        return (

            <div className="flex min-h-[400px] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />

                    <p className="mt-4 text-slate-500">

                        Cargando equipamientos...

                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // ERROR
    // =========================================================

    if (error) {

        return (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                <h2 className="font-bold text-red-700">

                    Error

                </h2>


                <p className="mt-2 text-red-600">

                    {error}

                </p>

            </div>

        );

    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <>

            {/* =================================================
                ENCABEZADO
            ================================================= */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Equipamientos

                </h1>


                <p className="mt-2 text-slate-600">

                    Explorá los equipos médicos disponibles
                    de nuestros proveedores.

                </p>

            </div>


            {/* =================================================
                BUSCADOR
            ================================================= */}

            <div className="mb-8 rounded-2xl bg-white p-6 shadow">

                <div className="flex flex-col gap-4 md:flex-row">


                    {/* BUSCAR */}

                    <div className="relative flex-1">

                        <Search
                            size={20}
                            className="absolute left-4 top-3.5 text-slate-400"
                        />


                        <input

                            type="text"

                            value={
                                busqueda
                            }

                            onChange={(e) =>
                                setBusqueda(
                                    e.target.value
                                )
                            }

                            placeholder="Buscar equipamiento..."

                            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"

                        />

                    </div>


                    {/* CATEGORÍA */}

                    <select

                        value={
                            categoria
                        }

                        onChange={(e) =>
                            setCategoria(
                                e.target.value
                            )
                        }

                        className="rounded-xl border px-5 py-3 outline-none focus:border-cyan-600"

                    >

                        <option value="">

                            Todas las categorías

                        </option>


                        {categorias.map(
                            (categoriaId) => (

                                <option
                                    key={
                                        categoriaId
                                    }
                                    value={
                                        categoriaId
                                    }
                                >

                                    Categoría #
                                    {categoriaId}

                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>


            {/* =================================================
                RESULTADOS
            ================================================= */}

            {equiposFiltrados.length === 0 ? (

                <div className="rounded-2xl bg-white p-12 text-center shadow">

                    <Package
                        size={48}
                        className="mx-auto text-slate-300"
                    />


                    <h2 className="mt-4 text-xl font-bold text-slate-800">

                        No se encontraron equipamientos

                    </h2>


                    <p className="mt-2 text-slate-500">

                        Probá con otro término de búsqueda
                        o categoría.

                    </p>

                </div>

            ) : (

                <div className="grid gap-6 lg:grid-cols-2">

                    {equiposFiltrados.map(
                        (equipo) => {

                            const proveedor =
                                obtenerProveedor(
                                    equipo.proveedor_id
                                );


                            return (

                                <div

                                    key={
                                        equipo.id
                                    }

                                    className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"

                                >

                                    {/* =================================================
                                        CABECERA
                                    ================================================= */}

                                    <div className="flex items-start gap-4">


                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">

                                            <Package
                                                size={28}
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h2 className="text-xl font-bold text-slate-900">

                                                {
                                                    equipo.nombre
                                                }

                                            </h2>


                                            <p className="mt-1 text-slate-500">

                                                Categoría #
                                                {
                                                    equipo.categoria_id
                                                }

                                            </p>


                                            {(

                                                equipo.marca ||

                                                equipo.modelo

                                            ) && (

                                                <p className="mt-1 text-sm text-slate-400">

                                                    {
                                                        equipo.marca
                                                    }


                                                    {equipo.marca &&
                                                        equipo.modelo &&
                                                        " · "
                                                    }


                                                    {
                                                        equipo.modelo
                                                    }

                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    {/* =================================================
                                        INFORMACIÓN
                                    ================================================= */}

                                    <div className="mt-6 space-y-3">


                                        {/* PROVEEDOR */}

                                        <p className="text-slate-700">

                                            Proveedor:

                                            <strong className="ml-2">

                                                {
                                                    proveedor?.organizacion ??
                                                    proveedor?.name_user ??
                                                    `Proveedor #${equipo.proveedor_id}`
                                                }

                                            </strong>

                                        </p>


                                        {/* FABRICANTE */}

                                        {equipo.fabricante && (

                                            <p className="text-slate-600">

                                                Fabricante:

                                                <strong className="ml-2 text-slate-900">

                                                    {
                                                        equipo.fabricante
                                                    }

                                                </strong>

                                            </p>

                                        )}


                                        {/* ENTREGA */}

                                        {equipo.plazo_entrega_dias !== null && (

                                            <div className="flex items-center gap-2 text-slate-600">

                                                <span className="font-medium">

                                                    Entrega:

                                                </span>


                                                {
                                                    equipo.plazo_entrega_dias
                                                }{" "}


                                                {
                                                    equipo.plazo_entrega_dias === 1
                                                        ? "día"
                                                        : "días"
                                                }

                                            </div>

                                        )}


                                        {/* GARANTÍA */}

                                        {equipo.garantia_meses !== null && (

                                            <div className="flex items-center gap-2 text-slate-600">

                                                <span className="font-medium">

                                                    Garantía:

                                                </span>


                                                {
                                                    equipo.garantia_meses
                                                }{" "}


                                                {
                                                    equipo.garantia_meses === 1
                                                        ? "mes"
                                                        : "meses"
                                                }

                                            </div>

                                        )}


                                        {/* STOCK */}

                                        {equipo.stock !== null && (

                                            <div className="flex items-center gap-2 text-slate-600">

                                                <span className="font-medium">

                                                    Stock:

                                                </span>


                                                {
                                                    equipo.stock
                                                }

                                            </div>

                                        )}


                                        {/* DESCRIPCIÓN */}

                                        {equipo.descripcion && (

                                            <p className="pt-2 text-sm leading-6 text-slate-500">

                                                {
                                                    equipo.descripcion
                                                }

                                            </p>

                                        )}

                                    </div>


                                    {/* =================================================
                                        INCLUYE
                                    ================================================= */}

                                    {Array.isArray(
                                        equipo.incluye
                                    ) &&
                                    equipo.incluye.length > 0 && (

                                        <div className="mt-6">

                                            <p className="mb-2 text-sm font-semibold text-slate-700">

                                                Incluye

                                            </p>


                                            <div className="flex flex-wrap gap-2">

                                                {equipo.incluye
                                                    .slice(0, 5)
                                                    .map(
                                                        (
                                                            item,
                                                            index
                                                        ) => (

                                                            <span

                                                                key={
                                                                    `${equipo.id}-${index}`
                                                                }

                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"

                                                            >

                                                                {
                                                                    typeof item ===
                                                                    "string"
                                                                        ? item
                                                                        : JSON.stringify(
                                                                            item
                                                                        )
                                                                }

                                                            </span>

                                                        )
                                                    )}

                                            </div>

                                        </div>

                                    )}


                                    {/* =================================================
                                        PRECIO + ACCIÓN
                                    ================================================= */}

                                    <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">


                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Precio unitario

                                            </p>


                                            <p className="text-2xl font-bold text-cyan-600">

                                                {
                                                    formatearPrecio(
                                                        equipo.precio_unitario
                                                    )
                                                }

                                            </p>


                                            <p className="mt-1 text-xs text-slate-400">

                                                {
                                                    obtenerMoneda(
                                                        equipo.moneda
                                                    )
                                                }

                                            </p>

                                        </div>


                                        <button

                                            type="button"

                                            onClick={() =>
                                                navigate(
                                                    `/institucion/equipamientos/${equipo.id}`
                                                )
                                            }

                                            className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"

                                        >

                                            Ver equipamiento

                                        </button>

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </>

    );

};


export default EquipamientosInstitucion;