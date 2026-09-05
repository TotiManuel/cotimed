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


/*
 * =========================================================
 * TIPOS
 * =========================================================
 */

interface Proveedor {

    id: number;

    organizacion?: string;

    name_user?: string;

}


/*
 * =========================================================
 * FORMULARIO
 * =========================================================
 */

interface FormEquipamento {

    proveedor_id: string;

    categoria_id: string;

    nombre: string;

    marca: string;

    modelo: string;

    descripcion: string;

    especificaciones: string;

    estado: string;

    precio_unitario: string;

    tipo_precio: string;

    moneda: string;

    stock: string;

    stock_minimo: string;

    plazo_entrega_dias: string;

    garantia_meses: string;

    disponible: boolean;

    fabricante: string;

    origen: string;

    registro_sanitario: string;

    vida_util_anios: string;

    requiere_instalacion: boolean;

    requiere_capacitacion: boolean;

    incluye: string;

}


/*
 * =========================================================
 * COMPONENTE
 * =========================================================
 */

const AddEquipamento = () => {

    const navigate = useNavigate();


    /*
     * =====================================================
     * ESTADOS
     * =====================================================
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
    ] = useState<Proveedor[]>([]);


    const [
        cargandoProveedores,
        setCargandoProveedores
    ] = useState(true);


    /*
     * =====================================================
     * FORMULARIO
     * =====================================================
     */

    const [
        form,
        setForm
    ] = useState<FormEquipamento>({

        proveedor_id: "",

        categoria_id: "",

        nombre: "",

        marca: "",

        modelo: "",

        descripcion: "",

        especificaciones: "",

        estado: "activo",

        precio_unitario: "",

        tipo_precio: "unitario",

        moneda: "ARS",

        stock: "",

        stock_minimo: "",

        plazo_entrega_dias: "",

        garantia_meses: "",

        disponible: true,

        fabricante: "",

        origen: "",

        registro_sanitario: "",

        vida_util_anios: "",

        requiere_instalacion: false,

        requiere_capacitacion: false,

        incluye: ""

    });


    /*
     * =====================================================
     * CARGAR PROVEEDORES
     * =====================================================
     */

    useEffect(() => {

        let cancelado = false;


        const cargarProveedores = async () => {

            try {

                setCargandoProveedores(true);

                setError("");


                const data =
                    await listarProveedores();


                if (
                    cancelado
                ) {
                    return;
                }


                setProveedores(
                    data
                );

            } catch (error: unknown) {

                console.error(
                    "Error cargando proveedores:",
                    error
                );


                if (
                    cancelado
                ) {
                    return;
                }


                if (
                    error instanceof Error
                ) {

                    setError(
                        error.message ||
                        "No se pudieron cargar los proveedores."
                    );

                } else {

                    setError(
                        "No se pudieron cargar los proveedores."
                    );

                }

            } finally {

                if (
                    !cancelado
                ) {

                    setCargandoProveedores(
                        false
                    );

                }

            }

        };


        cargarProveedores();


        return () => {

            cancelado = true;

        };

    }, []);


    /*
     * =====================================================
     * CAMBIAR CAMPOS DE TEXTO
     * =====================================================
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


        setForm(
            previous => ({

                ...previous,

                [name]:
                    value

            })
        );


        /*
         * Limpiamos el error mientras
         * el usuario modifica el formulario.
         */

        if (
            error
        ) {

            setError("");

        }

    };


    /*
     * =====================================================
     * CAMBIAR CHECKBOX
     * =====================================================
     */

    const handleCheckboxChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {

        const {
            name,
            checked
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]:
                    checked

            })
        );


        if (
            error
        ) {

            setError("");

        }

    };


    /*
     * =====================================================
     * CONVERTIR NÚMERO
     * =====================================================
     */

    const convertirNumero = (
        valor: string
    ): number | null => {

        if (
            valor.trim() === ""
        ) {

            return null;

        }


        const numero =
            Number(valor);


        if (
            !Number.isFinite(numero)
        ) {

            return null;

        }


        return numero;

    };


    /*
     * =====================================================
     * VALIDAR NÚMERO
     * =====================================================
     */

    const numeroValido = (
        valor: string,
        permitirCero = true
    ): boolean => {

        if (
            valor.trim() === ""
        ) {

            return true;

        }


        const numero =
            Number(valor);


        if (
            !Number.isFinite(numero)
        ) {

            return false;

        }


        if (
            permitirCero
        ) {

            return numero >= 0;

        }


        return numero > 0;

    };


    /*
     * =====================================================
     * CREAR EQUIPAMIENTO
     * =====================================================
     */

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        if (
            loading
        ) {
            return;
        }


        setError("");


        /*
         * =================================================
         * VALIDACIONES
         * =================================================
         */

        if (
            !form.proveedor_id.trim()
        ) {

            setError(
                "El proveedor es obligatorio."
            );

            return;

        }


        if (
            !form.categoria_id.trim()
        ) {

            setError(
                "La categoría es obligatoria."
            );

            return;

        }


        if (
            !form.nombre.trim()
        ) {

            setError(
                "El nombre del equipamiento es obligatorio."
            );

            return;

        }


        if (
            !form.descripcion.trim()
        ) {

            setError(
                "La descripción es obligatoria."
            );

            return;

        }


        if (
            !form.precio_unitario.trim()
        ) {

            setError(
                "El precio unitario es obligatorio."
            );

            return;

        }


        /*
         * =================================================
         * CONVERTIR IDs
         * =================================================
         */

        const proveedorId =
            Number(
                form.proveedor_id
            );


        const categoriaId =
            Number(
                form.categoria_id
            );


        if (
            !Number.isInteger(
                proveedorId
            ) ||
            proveedorId <= 0
        ) {

            setError(
                "El proveedor seleccionado no es válido."
            );

            return;

        }


        if (
            !Number.isInteger(
                categoriaId
            ) ||
            categoriaId <= 0
        ) {

            setError(
                "La categoría debe ser un ID numérico válido."
            );

            return;

        }


        /*
         * =================================================
         * VALIDAR NÚMEROS
         * =================================================
         */

        if (
            !numeroValido(
                form.precio_unitario,
                true
            )
        ) {

            setError(
                "El precio unitario no es válido."
            );

            return;

        }


        if (
            !numeroValido(
                form.stock,
                true
            )
        ) {

            setError(
                "El stock no es válido."
            );

            return;

        }


        if (
            !numeroValido(
                form.stock_minimo,
                true
            )
        ) {

            setError(
                "El stock mínimo no es válido."
            );

            return;

        }


        if (
            !numeroValido(
                form.plazo_entrega_dias,
                true
            )
        ) {

            setError(
                "El plazo de entrega no es válido."
            );

            return;

        }


        if (
            !numeroValido(
                form.garantia_meses,
                true
            )
        ) {

            setError(
                "La garantía no es válida."
            );

            return;

        }


        if (
            !numeroValido(
                form.vida_util_anios,
                true
            )
        ) {

            setError(
                "La vida útil no es válida."
            );

            return;

        }


        /*
         * =================================================
         * CONVERTIR VALORES NUMÉRICOS
         * =================================================
         */

        const precio =
            Number(
                form.precio_unitario
            );


        if (
            !Number.isFinite(
                precio
            ) ||
            precio < 0
        ) {

            setError(
                "El precio unitario no es válido."
            );

            return;

        }


        const stock =
            convertirNumero(
                form.stock
            );


        const stockMinimo =
            convertirNumero(
                form.stock_minimo
            );


        const plazoEntregaDias =
            convertirNumero(
                form.plazo_entrega_dias
            );


        const garantiaMeses =
            convertirNumero(
                form.garantia_meses
            );


        const vidaUtilAnios =
            convertirNumero(
                form.vida_util_anios
            );


        /*
         * =================================================
         * CONVERTIR "INCLUYE"
         *
         * Ejemplo:
         *
         * Cable, Manual, Sensor
         *
         * =>
         *
         * ["Cable", "Manual", "Sensor"]
         * =================================================
         */

        const incluye =
            form.incluye
                .split(",")
                .map(
                    item =>
                        item.trim()
                )
                .filter(
                    item =>
                        item.length > 0
                );


        /*
         * =================================================
         * CREAR OBJETO PARA EL BACKEND
         *
         * IMPORTANTE:
         *
         * Los nombres coinciden con
         * CrearEquipamentoData.
         * =================================================
         */

        try {

            setLoading(true);


            await crearEquipamento({

                proveedor_id:
                    proveedorId,

                categoria_id:
                    categoriaId,

                nombre:
                    form.nombre.trim(),

                marca:
                    form.marca.trim() || null,

                modelo:
                    form.modelo.trim() || null,

                numero_parte:
                    null,

                codigo_interno:
                    null,

                tipo:
                    "equipamiento",

                descripcion:
                    form.descripcion.trim(),

                especificaciones:
                    form.especificaciones.trim() || null,

                estado:
                    form.estado.trim(),

                precio_unitario:
                    precio,

                tipo_precio:
                    form.tipo_precio.trim() ||
                    "unitario",

                moneda:
                    form.moneda.trim() ||
                    "ARS",

                stock:
                    stock,

                stock_minimo:
                    stockMinimo,

                plazo_entrega_dias:
                    plazoEntregaDias,

                garantia_meses:
                    garantiaMeses,

                disponible:
                    form.disponible,

                fabricante:
                    form.fabricante.trim() ||
                    null,

                origen:
                    form.origen.trim() ||
                    null,

                registro_sanitario:
                    form.registro_sanitario.trim() ||
                    null,

                vida_util_anios:
                    vidaUtilAnios,

                requiere_instalacion:
                    form.requiere_instalacion,

                requiere_capacitacion:
                    form.requiere_capacitacion,

                incluye:
                    incluye.length > 0
                        ? incluye
                        : null,

                accesorios:
                    null,

                caracteristicas:
                    null,

                imagen_principal:
                    null,

                imagenes:
                    [],

                favoritos:
                    [],

                items_solicitud:
                    [],

                items_cotizacion:
                    [],

                /*
                 * Estos campos son exigidos por
                 * CrearEquipamentoData.
                 *
                 * El backend debería ignorarlos,
                 * generarles sus propios valores,
                 * o eventualmente conviene hacer
                 * opcionales estos campos en el servicio.
                 */

                fecha_creacion:
                    new Date().toISOString(),

                fecha_actualizacion:
                    new Date().toISOString(),

                eliminado:
                    false

            });


            /*
             * =================================================
             * ÉXITO
             * =================================================
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
                    error.message ||
                    "Error al crear el equipamiento."
                );

            } else {

                setError(
                    "Error al crear el equipamiento."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    /*
     * =====================================================
     * VISTA
     * =====================================================
     */

    return (

        <div className="mx-auto max-w-3xl">


            {/* =================================================
                VOLVER
            ================================================= */}

            <button

                type="button"

                onClick={() =>
                    navigate(
                        "/admin/equipamientos"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-cyan-600"

            >

                <ArrowLeft size={20} />

                Volver

            </button>


            {/* =================================================
                TARJETA
            ================================================= */}

            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">


                {/* =================================================
                    ENCABEZADO
                ================================================= */}

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

                                Registrar un equipamiento en CotiMed.

                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {

                    error && (

                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">

                            {error}

                        </div>

                    )

                }


                {/* =================================================
                    FORMULARIO
                ================================================= */}

                <form

                    onSubmit={
                        handleSubmit
                    }

                    className="space-y-6"

                >


                    {/* =================================================
                        PROVEEDOR
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Proveedor

                        </label>


                        <select

                            name="proveedor_id"

                            value={
                                form.proveedor_id
                            }

                            onChange={
                                handleChange
                            }

                            disabled={
                                cargandoProveedores ||
                                loading
                            }

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500 disabled:bg-slate-100"

                            required

                        >

                            <option value="">

                                {

                                    cargandoProveedores

                                        ?

                                        "Cargando proveedores..."

                                        :

                                        "Seleccioná un proveedor"

                                }

                            </option>


                            {

                                proveedores.map(
                                    proveedor => (

                                        <option

                                            key={
                                                proveedor.id
                                            }

                                            value={
                                                proveedor.id
                                            }

                                        >

                                            {

                                                proveedor.organizacion ||

                                                proveedor.name_user ||

                                                `Proveedor #${proveedor.id}`

                                            }

                                        </option>

                                    )
                                )

                            }

                        </select>

                    </div>


                    {/* =================================================
                        CATEGORÍA
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            ID de categoría

                        </label>


                        <input

                            type="number"

                            name="categoria_id"

                            value={
                                form.categoria_id
                            }

                            onChange={
                                handleChange
                            }

                            min="1"

                            step="1"

                            placeholder="Ej: 1"

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            required

                        />


                        <p className="mt-1 text-sm text-slate-500">

                            Ingresá el ID de la categoría existente en el sistema.

                        </p>

                    </div>


                    {/* =================================================
                        NOMBRE
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre del equipamiento

                        </label>


                        <input

                            type="text"

                            name="nombre"

                            value={
                                form.nombre
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: Monitor multiparamétrico"

                            maxLength={255}

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            required

                        />

                    </div>


                    {/* =================================================
                        MARCA + MODELO
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">


                        {/* MARCA */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Marca

                            </label>


                            <input

                                type="text"

                                name="marca"

                                value={
                                    form.marca
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Ej: Philips"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>


                        {/* MODELO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Modelo

                            </label>


                            <input

                                type="text"

                                name="modelo"

                                value={
                                    form.modelo
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Ej: MX450"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>

                    </div>


                    {/* =================================================
                        ESTADO + DISPONIBILIDAD
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">


                        {/* ESTADO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Estado

                            </label>


                            <select

                                name="estado"

                                value={
                                    form.estado
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

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


                        {/* DISPONIBLE */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Disponibilidad

                            </label>


                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 px-4 py-3">

                                <input

                                    type="checkbox"

                                    name="disponible"

                                    checked={
                                        form.disponible
                                    }

                                    onChange={
                                        handleCheckboxChange
                                    }

                                    className="h-5 w-5"

                                />


                                <span>

                                    Disponible para cotización

                                </span>

                            </label>

                        </div>

                    </div>


                    {/* =================================================
                        DESCRIPCIÓN
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Descripción

                        </label>


                        <textarea

                            name="descripcion"

                            value={
                                form.descripcion
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Describí el equipamiento..."

                            rows={5}

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            required

                        />

                    </div>


                    {/* =================================================
                        PRECIO + MONEDA + TIPO
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-3">


                        {/* PRECIO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Precio unitario

                            </label>


                            <input

                                type="number"

                                name="precio_unitario"

                                min="0"

                                step="0.01"

                                value={
                                    form.precio_unitario
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="0.00"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                                required

                            />

                        </div>


                        {/* MONEDA */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Moneda

                            </label>


                            <select

                                name="moneda"

                                value={
                                    form.moneda
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            >

                                <option value="ARS">

                                    ARS

                                </option>


                                <option value="USD">

                                    USD

                                </option>


                                <option value="EUR">

                                    EUR

                                </option>

                            </select>

                        </div>


                        {/* TIPO PRECIO */}

                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Tipo de precio

                            </label>


                            <select

                                name="tipo_precio"

                                value={
                                    form.tipo_precio
                                }

                                onChange={
                                    handleChange
                                }

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            >

                                <option value="unitario">

                                    Unitario

                                </option>


                                <option value="estimado">

                                    Estimado

                                </option>


                                <option value="consultar">

                                    Consultar

                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        STOCK
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Stock

                            </label>


                            <input

                                type="number"

                                name="stock"

                                min="0"

                                step="1"

                                value={
                                    form.stock
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Opcional"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Stock mínimo

                            </label>


                            <input

                                type="number"

                                name="stock_minimo"

                                min="0"

                                step="1"

                                value={
                                    form.stock_minimo
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Opcional"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>

                    </div>


                    {/* =================================================
                        PLAZO + GARANTÍA + VIDA ÚTIL
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-3">


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Plazo de entrega

                            </label>


                            <input

                                type="number"

                                name="plazo_entrega_dias"

                                min="0"

                                step="1"

                                value={
                                    form.plazo_entrega_dias
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Días"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

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

                                value={
                                    form.garantia_meses
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Meses"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Vida útil

                            </label>


                            <input

                                type="number"

                                name="vida_util_anios"

                                min="0"

                                step="1"

                                value={
                                    form.vida_util_anios
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Años"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>

                    </div>


                    {/* =================================================
                        FABRICANTE + ORIGEN
                    ================================================= */}

                    <div className="grid gap-6 md:grid-cols-2">


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Fabricante

                            </label>


                            <input

                                type="text"

                                name="fabricante"

                                value={
                                    form.fabricante
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Ej: Philips Medical"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>


                        <div>

                            <label className="mb-2 block font-medium text-slate-700">

                                Origen

                            </label>


                            <input

                                type="text"

                                name="origen"

                                value={
                                    form.origen
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Ej: Argentina"

                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                            />

                        </div>

                    </div>


                    {/* =================================================
                        REGISTRO SANITARIO
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Registro sanitario

                        </label>


                        <input

                            type="text"

                            name="registro_sanitario"

                            value={
                                form.registro_sanitario
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Opcional"

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                        />

                    </div>


                    {/* =================================================
                        REQUISITOS
                    ================================================= */}

                    <div className="grid gap-4 md:grid-cols-2">


                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                            <input

                                type="checkbox"

                                name="requiere_instalacion"

                                checked={
                                    form.requiere_instalacion
                                }

                                onChange={
                                    handleCheckboxChange
                                }

                                className="h-5 w-5"

                            />


                            <span className="font-medium text-slate-700">

                                Requiere instalación

                            </span>

                        </label>


                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

                            <input

                                type="checkbox"

                                name="requiere_capacitacion"

                                checked={
                                    form.requiere_capacitacion
                                }

                                onChange={
                                    handleCheckboxChange
                                }

                                className="h-5 w-5"

                            />


                            <span className="font-medium text-slate-700">

                                Requiere capacitación

                            </span>

                        </label>

                    </div>


                    {/* =================================================
                        INCLUYE
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Incluye

                        </label>


                        <input

                            type="text"

                            name="incluye"

                            value={
                                form.incluye
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: Cable de alimentación, Manual, Sensor"

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                        />


                        <p className="mt-1 text-sm text-slate-500">

                            Separá cada elemento con una coma.

                        </p>

                    </div>


                    {/* =================================================
                        ESPECIFICACIONES
                    ================================================= */}

                    <div>

                        <label className="mb-2 block font-medium text-slate-700">

                            Especificaciones

                        </label>


                        <textarea

                            name="especificaciones"

                            value={
                                form.especificaciones
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Características técnicas, medidas, requisitos, etc."

                            rows={6}

                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-500"

                        />

                    </div>


                    {/* =================================================
                        BOTONES
                    ================================================= */}

                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">


                        <button

                            type="submit"

                            disabled={
                                loading ||
                                cargandoProveedores
                            }

                            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"

                        >

                            <Save size={20} />

                            {

                                loading

                                    ?

                                    "Guardando..."

                                    :

                                    "Crear equipamiento"

                            }

                        </button>


                        <button

                            type="button"

                            onClick={() =>
                                navigate(
                                    "/admin/equipamientos"
                                )
                            }

                            disabled={
                                loading
                            }

                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"

                        >

                            Cancelar

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default AddEquipamento;