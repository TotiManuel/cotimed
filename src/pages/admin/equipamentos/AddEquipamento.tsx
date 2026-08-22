import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearEquipamento
} from "../../../services/equipamento.service";

import {
    Package,
    ArrowLeft,
    Save
} from "lucide-react";

import {
    listarProveedores
} from "../../../services/proveedores.service";


const AddEquipamento = () => {

    const navigate = useNavigate();


    /*
     * ================================
     * ESTADOS
     * ================================
     */

    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        proveedores,
        setProveedores
    ] = useState<any[]>([]);


    /*
     * ================================
     * CARGAR PROVEEDORES
     * ================================
     */

    useEffect(() => {

        const cargarProveedores = async () => {

            try {

                setError("");

                const data =
                    await listarProveedores();

                console.log(
                    "PROVEEDORES RECIBIDOS:",
                    data
                );

                setProveedores(data);

            } catch (error) {

                console.error(
                    "Error cargando proveedores:",
                    error
                );

                setError(
                    "No se pudieron cargar los proveedores"
                );

            }

        };

        cargarProveedores();

    }, []);


    /*
     * ================================
     * FORMULARIO
     * ================================
     */

    const [
        form,
        setForm
    ] = useState({

        id_proveedor: "",

        nombre_equipamento: "",

        marca_equipamento: "",

        modelo_equipamento: "",

        categoria_equipamento: "",

        estado_equipamento: "activo",

        descripcion_equipamento: "",

        precio_unitario_equipamento: "",

        plazo_entrega_dias: "",

        garantia_meses: "",

        incluye: "",

        especificaciones_equipamento: ""

    });


    /*
     * ================================
     * CAMBIAR CAMPOS
     * ================================
     */

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));

    };


    /*
     * ================================
     * CREAR EQUIPAMIENTO
     * ================================
     */

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");


        /*
         * ================================
         * VALIDACIONES DE TEXTO
         * ================================
         */

        if (!form.id_proveedor.trim()) {

            setError(
                "El proveedor es obligatorio"
            );

            return;

        }


        if (!form.nombre_equipamento.trim()) {

            setError(
                "El nombre del equipamiento es obligatorio"
            );

            return;

        }


        if (!form.marca_equipamento.trim()) {

            setError(
                "La marca es obligatoria"
            );

            return;

        }


        if (!form.modelo_equipamento.trim()) {

            setError(
                "El modelo es obligatorio"
            );

            return;

        }


        if (!form.categoria_equipamento.trim()) {

            setError(
                "La categoría es obligatoria"
            );

            return;

        }


        if (!form.estado_equipamento.trim()) {

            setError(
                "El estado del equipamiento es obligatorio"
            );

            return;

        }


        if (!form.descripcion_equipamento.trim()) {

            setError(
                "La descripción es obligatoria"
            );

            return;

        }


        if (!form.especificaciones_equipamento.trim()) {

            setError(
                "Las especificaciones son obligatorias"
            );

            return;

        }


        /*
         * ================================
         * CONVERTIR NÚMEROS
         * ================================
         */

        const precioTexto =
            form.precio_unitario_equipamento.trim();

        const plazoTexto =
            form.plazo_entrega_dias.trim();

        const garantiaTexto =
            form.garantia_meses.trim();


        if (!precioTexto) {

            setError(
                "El precio unitario es obligatorio"
            );

            return;

        }


        if (!plazoTexto) {

            setError(
                "El plazo de entrega es obligatorio"
            );

            return;

        }


        if (!garantiaTexto) {

            setError(
                "La garantía es obligatoria"
            );

            return;

        }


        /*
         * Aceptar tanto:
         *
         * 1000
         * 1000.50
         * 1000,50
         *
         * y convertir la coma decimal
         * en punto.
         */

        const precio =
            Number(
                precioTexto.replace(",", ".")
            );


        const plazo =
            Number(plazoTexto);


        const garantia =
            Number(garantiaTexto);


        if (
            !Number.isFinite(precio) ||
            precio < 0
        ) {

            setError(
                "El precio unitario no es válido"
            );

            return;

        }


        if (
            !Number.isInteger(plazo) ||
            plazo < 0
        ) {

            setError(
                "El plazo de entrega no es válido"
            );

            return;

        }


        if (
            !Number.isInteger(garantia) ||
            garantia < 0
        ) {

            setError(
                "La garantía no es válida"
            );

            return;

        }


        try {

            setLoading(true);


            /*
             * ================================
             * CONVERTIR INCLUYE
             * ================================
             */

            const incluye =
                form.incluye
                    .split(",")
                    .map(item => item.trim())
                    .filter(item => item.length > 0);


            /*
             * ================================
             * CREAR EQUIPAMIENTO
             * ================================
             *
             * Los nombres deben coincidir
             * exactamente con CrearEquipamentoData
             * del backend.
             */

            await crearEquipamento({

                proveedorId:
                    form.id_proveedor,

                nombre:
                    form.nombre_equipamento.trim(),

                marca:
                    form.marca_equipamento.trim(),

                modelo:
                    form.modelo_equipamento.trim(),

                categoria:
                    form.categoria_equipamento.trim(),

                estado:
                    form.estado_equipamento.trim(),

                descripcion:
                    form.descripcion_equipamento.trim(),

                precioUnitario:
                    precio,

                plazoEntregaDias:
                    plazo,

                garantiaMeses:
                    garantia,

                incluye,

                especificaciones:
                    form.especificaciones_equipamento.trim()

            });


            /*
             * ================================
             * VOLVER AL LISTADO
             * ================================
             */

            navigate(
                "/admin/equipamientos"
            );


        } catch (error: unknown) {

            console.error(
                "Error creando equipamiento:",
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
                    "Error al crear el equipamiento"
                );

            }

        } finally {

            setLoading(false);

        }

    };


    /*
     * ================================
     * VISTA
     * ================================
     */

    return (

        <div className="max-w-2xl mx-auto">


            {/* VOLVER */}

            <button
                type="button"
                onClick={() =>
                    navigate(
                        "/admin/equipamientos"
                    )
                }
                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"
            >

                <ArrowLeft size={20} />

                Volver

            </button>


            {/* TARJETA */}

            <div className="rounded-2xl bg-white p-8 shadow-lg">


                {/* ENCABEZADO */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <Package size={28} />

                        </div>


                        <div>

                            <h1 className="text-3xl font-bold text-slate-900">

                                Nuevo equipamiento

                            </h1>


                            <p className="text-slate-600">

                                Registrar un equipamiento en CotiMed

                            </p>

                        </div>

                    </div>

                </div>


                {/* ERROR */}

                {
                    error && (

                        <div className="mb-6 rounded-lg bg-red-50 p-4 text-center text-sm text-red-600">

                            {error}

                        </div>

                    )
                }


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >


                    {/* PROVEEDOR */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Proveedor

                        </label>


                        <select
                            name="id_proveedor"
                            value={form.id_proveedor}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        >

                            <option value="">

                                Seleccioná un proveedor

                            </option>


                            {
                                proveedores.map(
                                    proveedor => (

                                        <option
                                            key={proveedor.id}
                                            value={proveedor.id}
                                        >

                                            {
                                                proveedor.organizacion
                                            }

                                            {" - "}

                                            {
                                                proveedor.name_user
                                            }

                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>


                    {/* NOMBRE */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre del equipamiento

                        </label>


                        <input
                            name="nombre_equipamento"
                            value={form.nombre_equipamento}
                            onChange={handleChange}
                            placeholder="Ej: Monitor multiparamétrico"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        />

                    </div>


                    {/* MARCA + MODELO */}

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Marca

                            </label>


                            <input
                                name="marca_equipamento"
                                value={form.marca_equipamento}
                                onChange={handleChange}
                                placeholder="Ej: Philips"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Modelo

                            </label>


                            <input
                                name="modelo_equipamento"
                                value={form.modelo_equipamento}
                                onChange={handleChange}
                                placeholder="Ej: MX450"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>

                    </div>


                    {/* CATEGORÍA */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Categoría

                        </label>


                        <input
                            name="categoria_equipamento"
                            value={form.categoria_equipamento}
                            onChange={handleChange}
                            placeholder="Ej: Monitoreo"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        />

                    </div>


                    {/* ESTADO */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Estado

                        </label>


                        <select
                            name="estado_equipamento"
                            value={form.estado_equipamento}
                            onChange={handleChange}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        >

                            <option value="activo">
                                Activo
                            </option>

                            <option value="inactivo">
                                Inactivo
                            </option>

                            <option value="agotado">
                                Agotado
                            </option>

                        </select>

                    </div>


                    {/* DESCRIPCIÓN */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Descripción

                        </label>


                        <textarea
                            name="descripcion_equipamento"
                            value={form.descripcion_equipamento}
                            onChange={handleChange}
                            placeholder="Describí el equipamiento..."
                            rows={4}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        />

                    </div>


                    {/* PRECIO + PLAZO + GARANTÍA */}

                    <div className="grid gap-6 md:grid-cols-3">

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Precio unitario

                            </label>


                            <input
                                type="text"
                                inputMode="decimal"
                                name="precio_unitario_equipamento"
                                value={form.precio_unitario_equipamento}
                                onChange={handleChange}
                                placeholder="Ej: 150000,50"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Plazo de entrega

                            </label>


                            <input
                                type="number"
                                name="plazo_entrega_dias"
                                min="0"
                                step="1"
                                value={form.plazo_entrega_dias}
                                onChange={handleChange}
                                placeholder="Días"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Garantía

                            </label>


                            <input
                                type="number"
                                name="garantia_meses"
                                min="0"
                                step="1"
                                value={form.garantia_meses}
                                onChange={handleChange}
                                placeholder="Meses"
                                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                                required
                            />

                        </div>

                    </div>


                    {/* INCLUYE */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Incluye

                        </label>


                        <input
                            name="incluye"
                            value={form.incluye}
                            onChange={handleChange}
                            placeholder="Ej: Cable de alimentación, Manual, Sensor"
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                        />


                        <p className="mt-1 text-sm text-slate-500">

                            Separá cada elemento con una coma.

                        </p>

                    </div>


                    {/* ESPECIFICACIONES */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Especificaciones

                        </label>


                        <textarea
                            name="especificaciones_equipamento"
                            value={form.especificaciones_equipamento}
                            onChange={handleChange}
                            placeholder="Características técnicas, medidas, requisitos, etc."
                            rows={5}
                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"
                            required
                        />

                    </div>


                    {/* BOTÓN */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
                    >

                        <Save size={20} />

                        {
                            loading
                                ? "Guardando..."
                                : "Crear equipamiento"
                        }

                    </button>


                </form>

            </div>

        </div>

    );

};


export default AddEquipamento;