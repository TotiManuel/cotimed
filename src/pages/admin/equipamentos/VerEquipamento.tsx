import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarEquipamento,
    actualizarEquipamento,
    eliminarEquipamento,
    type EquipoCatalogo
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
 * ================================
 * FORMULARIO
 * ================================
 */

interface FormEquipamiento {
    nombre: string;
    marca: string;
    modelo: string;
    categoria: string;
    descripcion: string;
    precioUnitario: number;
    plazoEntregaDias: number;
    garantiaMeses: number;
    incluye: string[];
    especificaciones: string;
}


/*
 * ================================
 * COMPONENTE
 * ================================
 */

const VerEquipamento = () => {

    const navigate = useNavigate();

    const { id } = useParams<{
        id: string;
    }>();


    /*
     * ================================
     * ESTADOS
     * ================================
     */

    const [
        equipamento,
        setEquipamento
    ] = useState<EquipoCatalogo | null>(null);


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


    /*
     * ================================
     * FORMULARIO
     * ================================
     */

    const [
        form,
        setForm
    ] = useState<FormEquipamiento>({

        nombre: "",

        marca: "",

        modelo: "",

        categoria: "",

        descripcion: "",

        precioUnitario: 0,

        plazoEntregaDias: 0,

        garantiaMeses: 0,

        incluye: [],

        especificaciones: ""

    });


    /*
     * ================================
     * CARGAR EQUIPAMIENTO
     * ================================
     */

    useEffect(() => {

        if (!id) {
            setError(
                "No se recibió el ID del equipamiento"
            );

            return;
        }


        const cargarEquipamento = async () => {

            try {

                setError("");


                const data =
                    await buscarEquipamento(id);


                setEquipamento(data);


                setForm({

                    nombre:
                        data.nombre || "",

                    marca:
                        data.marca || "",

                    modelo:
                        data.modelo || "",

                    categoria:
                        data.categoria || "",

                    descripcion:
                        data.descripcion || "",

                    precioUnitario:
                        Number(
                            data.precioUnitario
                        ) || 0,

                    plazoEntregaDias:
                        Number(
                            data.plazoEntregaDias
                        ) || 0,

                    garantiaMeses:
                        Number(
                            data.garantiaMeses
                        ) || 0,

                    incluye:
                        Array.isArray(
                            data.incluye
                        )
                            ? data.incluye
                            : [],

                    especificaciones:
                        data.especificaciones || ""

                });

            } catch (error: unknown) {

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
                        "No se pudo cargar el equipamiento"
                    );

                }

            }

        };


        cargarEquipamento();

    }, [id]);


    /*
     * ================================
     * CAMBIAR CAMPOS
     * ================================
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
     * ================================
     * CAMBIAR CAMPOS NUMÉRICOS
     * ================================
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


        setForm(
            previous => ({

                ...previous,

                [name]:
                    value === ""
                        ? 0
                        : Number(value)

            })
        );

    };


    /*
     * ================================
     * CAMBIAR "INCLUYE"
     * ================================
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
     * ================================
     * ELIMINAR
     * ================================
     */

    const eliminar = async () => {

        if (!id) {

            setError(
                "No se encontró el ID del equipamiento"
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


            await eliminarEquipamento(id);


            navigate(
                "/admin/equipamentos"
            );

        } catch (error: unknown) {

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
                    "No se pudo eliminar el equipamiento"
                );

            }

        }

    };


    /*
     * ================================
     * GUARDAR CAMBIOS
     * ================================
     */

    const guardarCambios = async () => {

        if (!id) {

            setError(
                "No se encontró el ID del equipamiento"
            );

            return;

        }


        try {

            setGuardando(true);

            setError("");


            /*
             * VALIDACIONES
             */

            if (
                !form.nombre.trim()
            ) {

                setError(
                    "El nombre del equipamiento es obligatorio"
                );

                return;

            }


            if (
                !form.marca.trim()
            ) {

                setError(
                    "La marca es obligatoria"
                );

                return;

            }


            if (
                form.precioUnitario < 0
            ) {

                setError(
                    "El precio no puede ser negativo"
                );

                return;

            }


            if (
                form.plazoEntregaDias < 0
            ) {

                setError(
                    "El plazo de entrega no puede ser negativo"
                );

                return;

            }


            if (
                form.garantiaMeses < 0
            ) {

                setError(
                    "La garantía no puede ser negativa"
                );

                return;

            }


            /*
             * ACTUALIZAR
             */

            const actualizado =
                await actualizarEquipamento(

                    id,

                    {

                        nombre:
                            form.nombre.trim(),

                        marca:
                            form.marca.trim(),

                        modelo:
                            form.modelo.trim(),

                        categoria:
                            form.categoria.trim(),

                        descripcion:
                            form.descripcion.trim(),

                        precioUnitario:
                            Number(
                                form.precioUnitario
                            ),

                        plazoEntregaDias:
                            Number(
                                form.plazoEntregaDias
                            ),

                        garantiaMeses:
                            Number(
                                form.garantiaMeses
                            ),

                        incluye:
                            form.incluye,

                        especificaciones:
                            form.especificaciones.trim()

                    }

                );


            /*
             * ACTUALIZAR EQUIPAMIENTO
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

                categoria:
                    actualizado.categoria || "",

                descripcion:
                    actualizado.descripcion || "",

                precioUnitario:
                    Number(
                        actualizado.precioUnitario
                    ) || 0,

                plazoEntregaDias:
                    Number(
                        actualizado.plazoEntregaDias
                    ) || 0,

                garantiaMeses:
                    Number(
                        actualizado.garantiaMeses
                    ) || 0,

                incluye:
                    Array.isArray(
                        actualizado.incluye
                    )
                        ? actualizado.incluye
                        : [],

                especificaciones:
                    actualizado.especificaciones || ""

            });


            setEditando(false);

        } catch (error: unknown) {

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
                    "No se pudo actualizar el equipamiento"
                );

            }

        } finally {

            setGuardando(false);

        }

    };


    /*
     * ================================
     * CARGANDO
     * ================================
     */

    if (!equipamento) {

        return (

            <div className="max-w-4xl mx-auto">

                <div className="rounded-2xl bg-white p-8 shadow">

                    {
                        error

                            ?

                            <p className="text-red-600">
                                {error}
                            </p>

                            :

                            <p className="text-slate-600">
                                Cargando equipamiento...
                            </p>
                    }

                </div>

            </div>

        );

    }


    /*
     * ================================
     * VISTA
     * ================================
     */

    return (

        <div className="max-w-5xl mx-auto">

            {/* VOLVER */}

            <button

                onClick={() =>
                    navigate(
                        "/admin/equipamentos"
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

                        <h1 className="text-3xl font-bold text-slate-900">

                            {

                                editando

                                    ?

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

                                    :

                                    equipamento.nombre

                            }

                        </h1>


                        <p className="text-slate-600">

                            Equipamiento #{equipamento.id}

                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {

                    error && (

                        <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-red-600">

                            {error}

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

                                :

                                <p className="text-lg">

                                    {equipamento.marca}

                                </p>

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

                                :

                                <p className="text-lg">

                                    {equipamento.modelo}

                                </p>

                        }

                    </div>


                    {/* CATEGORÍA */}

                    <div className="rounded-xl bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Layers size={20} />

                            Categoría

                        </div>


                        {

                            editando

                                ?

                                <input

                                    name="categoria"

                                    value={
                                        form.categoria
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p>

                                    {equipamento.categoria}

                                </p>

                        }

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

                                <input

                                    type="number"

                                    name="precioUnitario"

                                    min="0"

                                    step="0.01"

                                    value={
                                        form.precioUnitario
                                    }

                                    onChange={
                                        handleNumberChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p className="text-lg font-semibold text-cyan-600">

                                    $

                                    {
                                        Number(
                                            equipamento.precioUnitario
                                        ).toLocaleString(
                                            "es-AR"
                                        )
                                    }

                                </p>

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

                                <input

                                    type="number"

                                    name="plazoEntregaDias"

                                    min="0"

                                    value={
                                        form.plazoEntregaDias
                                    }

                                    onChange={
                                        handleNumberChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p>

                                    {
                                        equipamento.plazoEntregaDias
                                    }

                                    {" días"}

                                </p>

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

                                <input

                                    type="number"

                                    name="garantiaMeses"

                                    min="0"

                                    value={
                                        form.garantiaMeses
                                    }

                                    onChange={
                                        handleNumberChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:border-cyan-500"

                                />

                                :

                                <p>

                                    {
                                        equipamento.garantiaMeses
                                    }

                                    {" meses"}

                                </p>

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

                                :

                                <p className="whitespace-pre-wrap text-slate-700">

                                    {
                                        equipamento.descripcion
                                    }

                                </p>

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

                                :

                                <p className="whitespace-pre-wrap text-slate-700">

                                    {
                                        equipamento.especificaciones
                                    }

                                </p>

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

                                :

                                (

                                    Array.isArray(
                                        equipamento.incluye
                                    )

                                        ?

                                        equipamento.incluye.map(

                                            (
                                                item,
                                                index
                                            ) => (

                                                <div

                                                    key={index}

                                                    className="mb-2 rounded-lg bg-white px-4 py-2"

                                                >

                                                    {item}

                                                </div>

                                            )

                                        )

                                        :

                                        <p className="text-slate-500">

                                            No especificado

                                        </p>

                                )

                        }

                    </div>


                    {/* FECHA */}

                    <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">

                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Calendar size={20} />

                            Fecha de registro

                        </div>


                        <p>

                            {

                                equipamento.createdAt

                                    ?

                                    new Date(
                                        equipamento.createdAt
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

                            :

                            <button

                                onClick={() =>
                                    setEditando(true)
                                }

                                className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                            >

                                Editar equipamiento

                            </button>

                    }


                    <button

                        onClick={
                            eliminar
                        }

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"

                    >

                        Eliminar equipamiento

                    </button>


                    {

                        editando && (

                            <button

                                onClick={() =>
                                    setEditando(false)
                                }

                                disabled={
                                    guardando
                                }

                                className="rounded-xl border px-6 py-3 hover:bg-slate-50"

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

                        #{equipamento.id}

                    </p>

                </div>

            </div>

        </div>

    );

};


export default VerEquipamento;
