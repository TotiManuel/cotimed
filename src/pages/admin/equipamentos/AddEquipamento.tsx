
import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    crearEquipamiento
} from "../../../services/equipamento.service";

import {
    Package,
    ArrowLeft,
    Save
} from "lucide-react";


const AddEquipamento = () => {


    const navigate = useNavigate();


    const [
        loading,
        setLoading
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    const [
        form,
        setForm
    ] = useState({

        id_proveedor: "",

        nombre_equipamiento: "",

        marca_equipamiento: "",

        modelo_equipamiento: "",

        categoria_equipamiento: "",

        descripcion_equipamiento: "",

        precio_unitario_equipamiento: "",

        plazo_entrega_dias: "",

        garantia_meses: "",

        incluye: "",

        especificaciones_equipamiento: ""

    });



    /*
     * Cambiar campos
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


        setForm({

            ...form,

            [name]: value

        });

    };



    /*
     * Crear equipamiento
     */

    const handleSubmit = async (

        e: React.FormEvent

    ) => {


        e.preventDefault();


        setError("");


        /*
         * Validar proveedor
         */

        if (
            !form.id_proveedor.trim()
        ) {

            setError(
                "El proveedor es obligatorio"
            );

            return;

        }


        /*
         * Validar nombre
         */

        if (
            !form.nombre_equipamiento.trim()
        ) {

            setError(
                "El nombre del equipamiento es obligatorio"
            );

            return;

        }


        /*
         * Validar marca
         */

        if (
            !form.marca_equipamiento.trim()
        ) {

            setError(
                "La marca es obligatoria"
            );

            return;

        }


        /*
         * Validar modelo
         */

        if (
            !form.modelo_equipamiento.trim()
        ) {

            setError(
                "El modelo es obligatorio"
            );

            return;

        }


        /*
         * Validar categoría
         */

        if (
            !form.categoria_equipamiento.trim()
        ) {

            setError(
                "La categoría es obligatoria"
            );

            return;

        }


        /*
         * Validar descripción
         */

        if (
            !form.descripcion_equipamiento.trim()
        ) {

            setError(
                "La descripción es obligatoria"
            );

            return;

        }


        /*
         * Validar precio
         */

        if (
            Number(
                form.precio_unitario_equipamiento
            ) < 0
        ) {

            setError(
                "El precio no puede ser negativo"
            );

            return;

        }


        /*
         * Validar plazo
         */

        if (
            Number(
                form.plazo_entrega_dias
            ) < 0
        ) {

            setError(
                "El plazo de entrega no puede ser negativo"
            );

            return;

        }


        /*
         * Validar garantía
         */

        if (
            Number(
                form.garantia_meses
            ) < 0
        ) {

            setError(
                "La garantía no puede ser negativa"
            );

            return;

        }


        try {


            setLoading(true);


            /*
             * Convertir "incluye"
             *
             * Ejemplo:
             *
             * "Cable, Manual, Sensor"
             *
             * se convierte en:
             *
             * [
             *   "Cable",
             *   "Manual",
             *   "Sensor"
             * ]
             */

            const incluye = form.incluye

                .split(",")

                .map(
                    (item) =>
                        item.trim()
                )

                .filter(
                    (item) =>
                        item.length > 0
                );


            await crearEquipamiento({

                proveedorId:
                    form.id_proveedor,

                nombre:
                    form.nombre_equipamiento.trim(),

                marca:
                    form.marca_equipamiento.trim(),

                modelo:
                    form.modelo_equipamiento.trim(),

                categoria:
                    form.categoria_equipamiento.trim(),

                descripcion:
                    form.descripcion_equipamiento.trim(),

                precioUnitario:
                    Number(
                        form.precio_unitario_equipamiento
                    ),

                plazoEntregaDias:
                    Number(
                        form.plazo_entrega_dias
                    ),

                garantiaMeses:
                    Number(
                        form.garantia_meses
                    ),

                incluye,

                especificaciones:
                    form.especificaciones_equipamiento.trim()

            });


            /*
             * Volver al listado
             */

            navigate(
                "/admin/equipamientos"
            );


        } catch (error: any) {


            console.error(
                "Error creando equipamiento:",
                error
            );


            setError(

                error?.message ||

                "Error al crear el equipamiento"

            );


        } finally {


            setLoading(false);

        }

    };



    return (

        <div className="max-w-2xl mx-auto">


            {/* VOLVER */}

            <button

                onClick={() =>
                    navigate(
                        "/admin/equipamientos"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20}/>

                Volver

            </button>



            {/* TARJETA */}

            <div className="rounded-2xl bg-white p-8 shadow-lg">


                {/* ENCABEZADO */}

                <div className="mb-8">


                    <div className="flex items-center gap-3">


                        <div className="rounded-xl bg-cyan-600 p-3 text-white">

                            <Package size={28}/>

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

                    onSubmit={
                        handleSubmit
                    }

                    className="space-y-6"

                >


                    {/* PROVEEDOR */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            ID del proveedor

                        </label>


                        <input

                            type="number"

                            name="id_proveedor"

                            value={
                                form.id_proveedor
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: 2"

                            min="1"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>



                    {/* NOMBRE */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Nombre del equipamiento

                        </label>


                        <input

                            name="nombre_equipamiento"

                            value={
                                form.nombre_equipamiento
                            }

                            onChange={
                                handleChange
                            }

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

                                name="marca_equipamiento"

                                value={
                                    form.marca_equipamiento
                                }

                                onChange={
                                    handleChange
                                }

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

                                name="modelo_equipamiento"

                                value={
                                    form.modelo_equipamiento
                                }

                                onChange={
                                    handleChange
                                }

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

                            name="categoria_equipamiento"

                            value={
                                form.categoria_equipamiento
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Ej: Monitoreo"

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>



                    {/* DESCRIPCIÓN */}

                    <div>


                        <label className="mb-2 block font-medium text-slate-700">

                            Descripción

                        </label>


                        <textarea

                            name="descripcion_equipamiento"

                            value={
                                form.descripcion_equipamiento
                            }

                            onChange={
                                handleChange
                            }

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

                                type="number"

                                name="precio_unitario_equipamiento"

                                min="0"

                                step="0.01"

                                value={
                                    form.precio_unitario_equipamiento
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="0.00"

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

                                value={
                                    form.plazo_entrega_dias
                                }

                                onChange={
                                    handleChange
                                }

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

                                value={
                                    form.garantia_meses
                                }

                                onChange={
                                    handleChange
                                }

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

                            value={
                                form.incluye
                            }

                            onChange={
                                handleChange
                            }

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

                            name="especificaciones_equipamiento"

                            value={
                                form.especificaciones_equipamiento
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Características técnicas, medidas, requisitos, etc."

                            rows={5}

                            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-cyan-500"

                            required

                        />

                    </div>



                    {/* BOTÓN */}

                    <button

                        type="submit"

                        disabled={
                            loading
                        }

                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-cyan-600 py-3 font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"

                    >

                        <Save size={20}/>


                        {

                            loading

                            ?

                            "Guardando..."

                            :

                            "Crear equipamiento"

                        }


                    </button>


                </form>


            </div>


        </div>

    );

};


export default AddEquipamento;
