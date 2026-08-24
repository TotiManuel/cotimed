import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerEquipamentoPorId,
    actualizarEquipamento,
    eliminarEquipamento,
    type Equipamento
} from "../../../services/equipamento.service";

import {
    ArrowLeft,
    Package,
    Tag,
    Layers,
    DollarSign,
    Calendar,
    ShieldCheck,
    Truck,
    ClipboardList
} from "lucide-react";


/*
 * =========================================================
 * FORMULARIO
 * =========================================================
 */

interface FormEquipamiento {

    nombre: string;

    marca: string;

    modelo: string;

    descripcion: string;

    especificaciones: string;

    precio_unitario: number;

    plazo_entrega_dias: number;

    garantia_meses: number;

    incluye: string[];

}


/*
 * =========================================================
 * FUNCIONES AUXILIARES
 * =========================================================
 */

/*
 * Convierte valores unknown a texto seguro para React.
 *
 * Esto evita errores como:
 *
 * "El tipo 'unknown' no se puede asignar al tipo 'ReactNode'"
 */

const obtenerTexto = (
    valor: unknown
): string => {

    if (
        valor === null ||
        valor === undefined
    ) {

        return "";

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


    try {

        return JSON.stringify(
            valor
        );

    } catch {

        return "";

    }

};


/*
 * Convierte "incluye" que viene del backend
 * en un array seguro de strings.
 */

const obtenerIncluye = (
    valor: unknown
): string[] => {

    if (
        Array.isArray(valor)
    ) {

        return valor
            .map(
                item =>
                    obtenerTexto(item)
            )
            .filter(
                item =>
                    item.trim().length > 0
            );

    }


    if (
        typeof valor === "string"
    ) {

        return valor
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(
                item =>
                    item.length > 0
            );

    }


    return [];

};


/*
 * =========================================================
 * COMPONENTE
 * =========================================================
 */

const VerEquipamento = () => {

    const navigate =
        useNavigate();


    const {
        id
    } = useParams<{
        id: string;
    }>();


    /*
     * =====================================================
     * ESTADOS
     * =====================================================
     */

    const [
        equipamento,
        setEquipamento
    ] = useState<Equipamento | null>(
        null
    );


    const [
        editando,
        setEditando
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        guardando,
        setGuardando
    ] = useState(false);


    const [
        cargando,
        setCargando
    ] = useState(true);


    /*
     * =====================================================
     * FORMULARIO
     * =====================================================
     */

    const [
        form,
        setForm
    ] = useState<FormEquipamiento>({

        nombre: "",

        marca: "",

        modelo: "",

        descripcion: "",

        especificaciones: "",

        precio_unitario: 0,

        plazo_entrega_dias: 0,

        garantia_meses: 0,

        incluye: []

    });


    /*
     * =========================================================
     * CARGAR EQUIPAMIENTO
     * =========================================================
     */

    useEffect(() => {

        if (!id) {

            setError(
                "No se recibió el ID del equipamiento."
            );

            setCargando(false);

            return;

        }


        const idNumero =
            Number(id);


        if (
            !Number.isInteger(idNumero) ||
            idNumero <= 0
        ) {

            setError(
                "El ID del equipamiento no es válido."
            );

            setCargando(false);

            return;

        }


        const cargarEquipamento =
            async () => {

                try {

                    setCargando(true);

                    setError("");


                    const data =
                        await obtenerEquipamentoPorId(
                            idNumero
                        );


                    setEquipamento(
                        data
                    );


                    setForm({

                        nombre:
                            data.nombre || "",

                        marca:
                            data.marca || "",

                        modelo:
                            data.modelo || "",

                        descripcion:
                            data.descripcion || "",

                        especificaciones:
                            data.especificaciones || "",

                        precio_unitario:
                            Number(
                                data.precio_unitario
                            ) || 0,

                        plazo_entrega_dias:
                            Number(
                                data.plazo_entrega_dias
                            ) || 0,

                        garantia_meses:
                            Number(
                                data.garantia_meses
                            ) || 0,

                        incluye:
                            obtenerIncluye(
                                data.incluye
                            )

                    });


                } catch (
                    error: unknown
                ) {

                    console.error(
                        "Error cargando equipamiento:",
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
                            "No se pudo cargar el equipamiento."
                        );

                    }

                } finally {

                    setCargando(false);

                }

            };


        cargarEquipamento();

    }, [id]);


    /*
     * =========================================================
     * CAMBIAR CAMPOS DE TEXTO
     * =========================================================
     */

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
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

    };


    /*
     * =========================================================
     * CAMBIAR CAMPOS NUMÉRICOS
     * =========================================================
     */

    const handleNumberChange = (
        e: React.ChangeEvent<
            HTMLInputElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;


        const numero =
            value === ""
                ? 0
                : Number(value);


        setForm(
            previous => ({

                ...previous,

                [name]:
                    Number.isFinite(numero)
                        ? numero
                        : 0

            })
        );

    };


    /*
     * =========================================================
     * CAMBIAR "INCLUYE"
     * =========================================================
     */

    const handleIncluyeChange = (
        e: React.ChangeEvent<
            HTMLTextAreaElement
        >
    ) => {

        const valores =
            e.target.value
                .split("\n")
                .map(
                    item =>
                        item.trim()
                )
                .filter(
                    item =>
                        item.length > 0
                );


        setForm(
            previous => ({

                ...previous,

                incluye:
                    valores

            })
        );

    };


    /*
     * =========================================================
     * ELIMINAR
     * =========================================================
     */

    const eliminar = async () => {

        if (!id) {

            setError(
                "No se encontró el ID del equipamiento."
            );

            return;

        }


        const idNumero =
            Number(id);


        if (
            !Number.isInteger(idNumero) ||
            idNumero <= 0
        ) {

            setError(
                "El ID del equipamiento no es válido."
            );

            return;

        }


        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar este equipamiento?"
            );


        if (!confirmar) {

            return;

        }


        try {

            setError("");


            await eliminarEquipamento(
                idNumero
            );


            navigate(
                "/admin/equipamientos"
            );

        } catch (
            error: unknown
        ) {

            console.error(
                "Error eliminando equipamiento:",
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
                    "No se pudo eliminar el equipamiento."
                );

            }

        }

    };


    /*
     * =========================================================
     * GUARDAR CAMBIOS
     * =========================================================
     */

    const guardarCambios =
        async () => {

            if (!id) {

                setError(
                    "No se encontró el ID del equipamiento."
                );

                return;

            }


            const idNumero =
                Number(id);


            if (
                !Number.isInteger(idNumero) ||
                idNumero <= 0
            ) {

                setError(
                    "El ID del equipamiento no es válido."
                );

                return;

            }


            /*
             * VALIDACIONES
             */

            if (
                !form.nombre.trim()
            ) {

                setError(
                    "El nombre del equipamiento es obligatorio."
                );

                return;

            }


            if (
                form.precio_unitario < 0 ||
                !Number.isFinite(
                    form.precio_unitario
                )
            ) {

                setError(
                    "El precio unitario no es válido."
                );

                return;

            }


            if (
                form.plazo_entrega_dias < 0 ||
                !Number.isInteger(
                    form.plazo_entrega_dias
                )
            ) {

                setError(
                    "El plazo de entrega no es válido."
                );

                return;

            }


            if (
                form.garantia_meses < 0 ||
                !Number.isInteger(
                    form.garantia_meses
                )
            ) {

                setError(
                    "La garantía no es válida."
                );

                return;

            }


            try {

                setGuardando(true);

                setError("");


                /*
                 * IMPORTANTE:
                 *
                 * Se utilizan los nombres EXACTOS
                 * definidos por equipamento.service.ts.
                 */

                const actualizado =
                    await actualizarEquipamento(

                        idNumero,

                        {

                            nombre:
                                form.nombre.trim(),

                            marca:
                                form.marca.trim()
                                    || null,

                            modelo:
                                form.modelo.trim()
                                    || null,

                            descripcion:
                                form.descripcion.trim(),

                            especificaciones:
                                form.especificaciones.trim()
                                    || null,

                            precio_unitario:
                                Number(
                                    form.precio_unitario
                                ),

                            plazo_entrega_dias:
                                Number(
                                    form.plazo_entrega_dias
                                ),

                            garantia_meses:
                                Number(
                                    form.garantia_meses
                                ),

                            incluye:
                                form.incluye

                        }

                    );


                /*
                 * ACTUALIZAR DATOS
                 */

                setEquipamento(
                    actualizado
                );


                /*
                 * ACTUALIZAR FORMULARIO
                 */

                setForm({

                    nombre:
                        actualizado.nombre || "",

                    marca:
                        actualizado.marca || "",

                    modelo:
                        actualizado.modelo || "",

                    descripcion:
                        actualizado.descripcion || "",

                    especificaciones:
                        actualizado.especificaciones || "",

                    precio_unitario:
                        Number(
                            actualizado.precio_unitario
                        ) || 0,

                    plazo_entrega_dias:
                        Number(
                            actualizado.plazo_entrega_dias
                        ) || 0,

                    garantia_meses:
                        Number(
                            actualizado.garantia_meses
                        ) || 0,

                    incluye:
                        obtenerIncluye(
                            actualizado.incluye
                        )

                });


                setEditando(
                    false
                );


            } catch (
                error: unknown
            ) {

                console.error(
                    "Error actualizando equipamiento:",
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
                        "No se pudo actualizar el equipamiento."
                    );

                }

            } finally {

                setGuardando(
                    false
                );

            }

        };


    /*
     * =========================================================
     * CARGANDO
     * =========================================================
     */

    if (cargando) {

        return (

            <div className="mx-auto max-w-4xl">

                <div className="rounded-2xl bg-white p-8 text-center shadow">

                    <p className="text-slate-600">

                        Cargando equipamiento...

                    </p>

                </div>

            </div>

        );

    }


    /*
     * =========================================================
     * ERROR SIN EQUIPAMIENTO
     * =========================================================
     */

    if (!equipamento) {

        return (

            <div className="mx-auto max-w-4xl">

                <button

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


                <div className="rounded-2xl bg-white p-8 shadow">

                    <p className="text-red-600">

                        {
                            error ||
                            "No se pudo encontrar el equipamiento."
                        }

                    </p>

                </div>

            </div>

        );

    }


    /*
     * =========================================================
     * VISTA
     * =========================================================
     */

    return (

        <div className="mx-auto max-w-5xl">

            {/* VOLVER */}

            <button

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

                <div className="mb-8 flex items-center gap-4">

                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <Package size={32} />

                    </div>


                    <div className="flex-1">

                        {

                            editando

                                ?

                                (

                                    <input

                                        name="nombre"

                                        value={
                                            form.nombre
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 text-2xl font-bold outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <h1 className="text-3xl font-bold text-slate-900">

                                        {
                                            equipamento.nombre
                                        }

                                    </h1>

                                )

                        }


                        <p className="text-slate-600">

                            Equipamiento #

                            {
                                equipamento.id
                            }

                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {

                    error && (

                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">

                            {
                                error
                            }

                        </div>

                    )

                }


                {/* INFORMACIÓN */}

                <div className="grid gap-6 md:grid-cols-2">


                    {/* MARCA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Tag size={20} />

                            Marca

                        </div>


                        {

                            editando

                                ?

                                (

                                    <input

                                        name="marca"

                                        value={
                                            form.marca
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p className="text-lg">

                                        {
                                            equipamento.marca ||
                                            "No especificada"
                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* MODELO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Package size={20} />

                            Modelo

                        </div>


                        {

                            editando

                                ?

                                (

                                    <input

                                        name="modelo"

                                        value={
                                            form.modelo
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p className="text-lg">

                                        {
                                            equipamento.modelo ||
                                            "No especificado"
                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* CATEGORÍA ID */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Layers size={20} />

                            Categoría

                        </div>


                        <p className="text-lg">

                            #

                            {
                                equipamento.categoria_id
                            }

                        </p>

                        <p className="mt-1 text-sm text-slate-500">

                            ID de categoría

                        </p>

                    </div>


                    {/* PRECIO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <DollarSign size={20} />

                            Precio unitario

                        </div>


                        {

                            editando

                                ?

                                (

                                    <input

                                        type="number"

                                        name="precio_unitario"

                                        min="0"

                                        step="0.01"

                                        value={
                                            form.precio_unitario
                                        }

                                        onChange={
                                            handleNumberChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p className="text-lg font-semibold text-cyan-600">

                                        {

                                            Number(
                                                equipamento.precio_unitario
                                            ).toLocaleString(
                                                "es-AR",
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }
                                            )

                                        }

                                        {

                                            equipamento.moneda !== null &&
                                            equipamento.moneda !== undefined

                                                ?

                                                ` ${obtenerTexto(equipamento.moneda)}`

                                                :

                                                ""

                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* PLAZO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Truck size={20} />

                            Plazo de entrega

                        </div>


                        {

                            editando

                                ?

                                (

                                    <input

                                        type="number"

                                        name="plazo_entrega_dias"

                                        min="0"

                                        step="1"

                                        value={
                                            form.plazo_entrega_dias
                                        }

                                        onChange={
                                            handleNumberChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p>

                                        {
                                            equipamento.plazo_entrega_dias ??
                                            "No especificado"
                                        }

                                        {

                                            equipamento.plazo_entrega_dias !== null

                                                ?

                                                " días"

                                                :

                                                ""

                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* GARANTÍA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ShieldCheck size={20} />

                            Garantía

                        </div>


                        {

                            editando

                                ?

                                (

                                    <input

                                        type="number"

                                        name="garantia_meses"

                                        min="0"

                                        step="1"

                                        value={
                                            form.garantia_meses
                                        }

                                        onChange={
                                            handleNumberChange
                                        }

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p>

                                        {
                                            equipamento.garantia_meses ??
                                            "No especificada"
                                        }

                                        {

                                            equipamento.garantia_meses !== null

                                                ?

                                                " meses"

                                                :

                                                ""

                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* DESCRIPCIÓN */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20} />

                            Descripción

                        </div>


                        {

                            editando

                                ?

                                (

                                    <textarea

                                        name="descripcion"

                                        value={
                                            form.descripcion
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        rows={5}

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p className="whitespace-pre-wrap text-slate-700">

                                        {
                                            equipamento.descripcion ||
                                            "No especificada"
                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* ESPECIFICACIONES */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20} />

                            Especificaciones

                        </div>


                        {

                            editando

                                ?

                                (

                                    <textarea

                                        name="especificaciones"

                                        value={
                                            form.especificaciones
                                        }

                                        onChange={
                                            handleChange
                                        }

                                        rows={5}

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    <p className="whitespace-pre-wrap text-slate-700">

                                        {
                                            equipamento.especificaciones ||
                                            "No especificadas"
                                        }

                                    </p>

                                )

                        }

                    </div>


                    {/* INCLUYE */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ClipboardList size={20} />

                            Incluye

                        </div>


                        {

                            editando

                                ?

                                (

                                    <textarea

                                        value={
                                            form.incluye.join("\n")
                                        }

                                        onChange={
                                            handleIncluyeChange
                                        }

                                        rows={5}

                                        placeholder="Un elemento por línea"

                                        className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                    />

                                )

                                :

                                (

                                    form.incluye.length > 0

                                        ?

                                        form.incluye.map(

                                            (
                                                item,
                                                index
                                            ) => (

                                                <div

                                                    key={index}

                                                    className="mb-2 rounded-lg bg-white px-4 py-2"

                                                >

                                                    {
                                                        item
                                                    }

                                                </div>

                                            )

                                        )

                                        :

                                        (

                                            <p className="text-slate-500">

                                                No especificado

                                            </p>

                                        )

                                )

                        }

                    </div>


                    {/* ESTADO */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <ShieldCheck size={20} />

                            Estado

                        </div>


                        <p className="text-lg">

                            {
                                obtenerTexto(
                                    equipamento.estado
                                ) ||
                                "No especificado"
                            }

                        </p>

                    </div>


                    {/* STOCK */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Package size={20} />

                            Stock

                        </div>


                        <p className="text-lg">

                            {
                                equipamento.stock ??
                                "No especificado"
                            }

                        </p>

                    </div>


                    {/* DISPONIBILIDAD */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Truck size={20} />

                            Disponibilidad

                        </div>


                        <p className="text-lg">

                            {
                                equipamento.disponible
                                    ? "Disponible"
                                    : "No disponible"
                            }

                        </p>

                    </div>


                    {/* FECHA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20} />

                            Fecha de registro

                        </div>


                        <p>

                            {

                                equipamento.fecha_creacion

                                    ?

                                    new Date(
                                        equipamento.fecha_creacion
                                    ).toLocaleString(
                                        "es-AR"
                                    )

                                    :

                                    "No disponible"

                            }

                        </p>

                    </div>

                </div>


                {/* BOTONES */}

                <div className="mt-8 flex flex-wrap gap-4">


                    {

                        editando

                            ?

                            (

                                <button

                                    onClick={
                                        guardarCambios
                                    }

                                    disabled={
                                        guardando
                                    }

                                    className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"

                                >

                                    {

                                        guardando

                                            ?

                                            "Guardando..."

                                            :

                                            "Guardar cambios"

                                    }

                                </button>

                            )

                            :

                            (

                                <button

                                    onClick={() =>
                                        setEditando(
                                            true
                                        )
                                    }

                                    className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                                >

                                    Editar equipamiento

                                </button>

                            )

                    }


                    <button

                        onClick={
                            eliminar
                        }

                        disabled={
                            guardando
                        }

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"

                    >

                        Eliminar equipamiento

                    </button>


                    {

                        editando && (

                            <button

                                onClick={() =>
                                    setEditando(
                                        false
                                    )
                                }

                                disabled={
                                    guardando
                                }

                                className="rounded-xl border px-6 py-3 hover:bg-slate-50 disabled:opacity-50"

                            >

                                Cancelar

                            </button>

                        )

                    }

                </div>


                {/* ID */}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">

                    <div className="mb-2 font-semibold text-slate-700">

                        ID de equipamiento

                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        #

                        {
                            equipamento.id
                        }

                    </p>

                </div>

            </div>

        </div>

    );

};


export default VerEquipamento;