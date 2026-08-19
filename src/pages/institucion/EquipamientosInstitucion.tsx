import {
    Search,
    Package,
    Star
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    listarEquipamentos,
    type EquipoCatalogo
} from "../../services/equipamento.service";

import {
    listarProveedores,
    type Proveedor
} from "../../services/proveedores.service";


const EquipamientosInstitucion = () => {

    const navigate = useNavigate();

    const [equipos, setEquipos] = useState<EquipoCatalogo[]>([]);
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);

    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");


    /*
     * ==========================================
     * CARGAR EQUIPAMIENTOS Y PROVEEDORES
     * ==========================================
     */

    useEffect(() => {

        const cargarDatos = async () => {

            try {

                setCargando(true);
                setError("");

                const [
                    equiposData,
                    proveedoresData
                ] = await Promise.all([

                    listarEquipamentos(),

                    listarProveedores()

                ]);

                setEquipos(equiposData);
                setProveedores(proveedoresData);

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


    /*
     * ==========================================
     * BUSCAR PROVEEDOR
     * ==========================================
     */

    const obtenerProveedor = (
        proveedorId: string
    ): Proveedor | undefined => {

        return proveedores.find(
            (proveedor) =>
                String(proveedor.id) ===
                String(proveedorId)
        );

    };


    /*
     * ==========================================
     * CATEGORÍAS
     * ==========================================
     */

    const categorias = useMemo(() => {

        return Array.from(

            new Set(

                equipos

                    .map(
                        (equipo) =>
                            equipo.categoria
                    )

                    .filter(Boolean)

            )

        );

    }, [equipos]);


    /*
     * ==========================================
     * FILTRAR EQUIPAMIENTOS
     * ==========================================
     */

    const equiposFiltrados = useMemo(() => {

        const texto =
            busqueda.trim().toLowerCase();


        return equipos.filter((equipo) => {

            const coincideBusqueda =

                !texto ||

                equipo.nombre
                    .toLowerCase()
                    .includes(texto) ||

                equipo.marca
                    .toLowerCase()
                    .includes(texto) ||

                equipo.modelo
                    .toLowerCase()
                    .includes(texto) ||

                equipo.categoria
                    .toLowerCase()
                    .includes(texto) ||

                equipo.descripcion
                    .toLowerCase()
                    .includes(texto);


            const coincideCategoria =

                !categoria ||

                equipo.categoria === categoria;


            return (
                coincideBusqueda &&
                coincideCategoria
            );

        });

    }, [
        equipos,
        busqueda,
        categoria
    ]);


    /*
     * ==========================================
     * FORMATEAR PRECIO
     * ==========================================
     */

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
        ).format(precio);

    };


    /*
     * ==========================================
     * CARGANDO
     * ==========================================
     */

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


    /*
     * ==========================================
     * ERROR
     * ==========================================
     */

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


    return (

        <>

            {/* ================================== */}
            {/* ENCABEZADO */}
            {/* ================================== */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-slate-900">

                    Equipamientos

                </h1>

                <p className="mt-2 text-slate-600">

                    Explorá equipos médicos disponibles
                    de proveedores.

                </p>

            </div>


            {/* ================================== */}
            {/* BUSCADOR */}
            {/* ================================== */}

            <div className="mb-8 rounded-2xl bg-white p-6 shadow">

                <div className="flex flex-col gap-4 md:flex-row">

                    <div className="relative flex-1">

                        <Search
                            size={20}
                            className="absolute left-4 top-3.5 text-slate-400"
                        />

                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) =>
                                setBusqueda(
                                    e.target.value
                                )
                            }
                            placeholder="Buscar equipamiento..."
                            className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                        />

                    </div>


                    <select
                        value={categoria}
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
                            (item) => (

                                <option
                                    key={item}
                                    value={item}
                                >

                                    {item}

                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>


            {/* ================================== */}
            {/* RESULTADOS */}
            {/* ================================== */}

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
                                    equipo.proveedorId
                                );


                            return (

                                <div
                                    key={equipo.id}
                                    className="rounded-2xl bg-white p-8 shadow transition hover:shadow-lg"
                                >

                                    {/* ============================== */}
                                    {/* CABECERA */}
                                    {/* ============================== */}

                                    <div className="flex items-start gap-4">

                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">

                                            <Package
                                                size={28}
                                            />

                                        </div>


                                        <div className="min-w-0">

                                            <h2 className="text-xl font-bold text-slate-900">

                                                {equipo.nombre}

                                            </h2>

                                            <p className="mt-1 text-slate-500">

                                                {equipo.categoria}

                                            </p>

                                            {(equipo.marca ||
                                                equipo.modelo) && (

                                                <p className="mt-1 text-sm text-slate-400">

                                                    {equipo.marca}

                                                    {equipo.marca &&
                                                        equipo.modelo
                                                        ? " · "
                                                        : ""}

                                                    {equipo.modelo}

                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    {/* ============================== */}
                                    {/* INFORMACIÓN */}
                                    {/* ============================== */}

                                    <div className="mt-6 space-y-3">

                                        <p className="text-slate-700">

                                            Proveedor:

                                            <strong className="ml-2">

                                                {proveedor?.organizacion ??
                                                    proveedor?.name_user ??
                                                    `Proveedor #${equipo.proveedorId}`}

                                            </strong>

                                        </p>


                                        <div className="flex items-center gap-2 text-slate-600">

                                            <span className="font-medium">

                                                Entrega:

                                            </span>

                                            {equipo.plazoEntregaDias}{" "}

                                            {equipo.plazoEntregaDias === 1
                                                ? "día"
                                                : "días"}

                                        </div>


                                        <div className="flex items-center gap-2 text-slate-600">

                                            <span className="font-medium">

                                                Garantía:

                                            </span>

                                            {equipo.garantiaMeses}{" "}

                                            {equipo.garantiaMeses === 1
                                                ? "mes"
                                                : "meses"}

                                        </div>


                                        {equipo.descripcion && (

                                            <p className="pt-2 text-sm leading-6 text-slate-500">

                                                {equipo.descripcion}

                                            </p>

                                        )}

                                    </div>


                                    {/* ============================== */}
                                    {/* INCLUYE */}
                                    {/* ============================== */}

                                    {equipo.incluye.length > 0 && (

                                        <div className="mt-6">

                                            <p className="mb-2 text-sm font-semibold text-slate-700">

                                                Incluye

                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {equipo.incluye
                                                    .slice(0, 5)
                                                    .map(
                                                        (item, index) => (

                                                            <span
                                                                key={`${equipo.id}-${index}`}
                                                                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                                                            >

                                                                {item}

                                                            </span>

                                                        )
                                                    )}

                                            </div>

                                        </div>

                                    )}


                                    {/* ============================== */}
                                    {/* PRECIO + ACCIÓN */}
                                    {/* ============================== */}

                                    <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">

                                        <div>

                                            <p className="text-sm text-slate-500">

                                                Precio unitario

                                            </p>

                                            <p className="text-2xl font-bold text-cyan-600">

                                                {formatearPrecio(
                                                    equipo.precioUnitario
                                                )}

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