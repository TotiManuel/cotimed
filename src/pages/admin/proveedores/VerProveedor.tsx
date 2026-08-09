
import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarProveedor,
    actualizarProveedor,
    eliminarProveedor
} from "../../../services/proveedores.service";

import {
    ArrowLeft,
    Truck,
    Mail,
    User,
    FileText
} from "lucide-react";


const VerProveedor = () => {


    const navigate = useNavigate();

    const {
        id
    } = useParams();


    const [
        proveedor,
        setProveedor
    ] = useState<any>(null);


    const [
        editando,
        setEditando
    ] = useState(false);


    const [
        form,
        setForm
    ] = useState({

        name_user: "",

        email: "",

        organizacion: ""

    });



    useEffect(() => {


        if (!id) return;


        buscarProveedor(
            Number(id)
        )

        .then((data) => {


            setProveedor(data);


            setForm({

                name_user:
                    data.name_user,

                email:
                    data.email,

                organizacion:
                    data.organizacion

            });


        })

        .catch((error) => {


            console.log(
                "Error cargando proveedor",
                error
            );


        });


    }, [id]);





    if (!proveedor) {


        return (

            <div className="p-8">

                Cargando proveedor...

            </div>

        );

    }



    const handleChange = (

        e: React.ChangeEvent<HTMLInputElement>

    ) => {


        setForm({

            ...form,

            [e.target.name]:
                e.target.value

        });

    };



    const eliminar = async () => {


        const confirmar =
            window.confirm(
                "¿Seguro que querés eliminar este proveedor?"
            );


        if (!confirmar) return;


        try {


            await eliminarProveedor(
                Number(id)
            );


            navigate(
                "/admin/proveedores"
            );


        } catch (error) {


            console.log(
                "Error eliminando proveedor",
                error
            );

        }

    };



    const guardarCambios = async () => {


        try {


            const actualizado =
                await actualizarProveedor(

                    Number(id),

                    form

                );


            setProveedor(
                actualizado
            );


            setEditando(false);


        } catch (error) {


            console.log(
                "Error actualizando proveedor",
                error
            );

        }

    };



    return (

        <div className="max-w-4xl mx-auto">


            <button

                onClick={() =>
                    navigate(
                        "/admin/proveedores"
                    )
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20}/>

                Volver

            </button>





            <div className="rounded-2xl bg-white p-8 shadow">


                <div className="mb-8 flex items-center gap-4">


                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <Truck size={32}/>

                    </div>


                    <div>


                        <h1 className="text-3xl font-bold text-slate-900">


                            {
                                editando

                                ?

                                <input

                                    name="organizacion"

                                    value={
                                        form.organizacion
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="rounded-lg border px-3 py-2"

                                />

                                :

                                proveedor.organizacion
                            }


                        </h1>


                        <p className="text-slate-600">

                            Detalle de proveedor

                        </p>


                    </div>


                </div>





                <div className="grid gap-6 md:grid-cols-2">



                    {/* RESPONSABLE */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <User size={20}/>

                            Responsable

                        </div>


                        <p>


                            {
                                editando

                                ?

                                <input

                                    name="name_user"

                                    value={
                                        form.name_user
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2"

                                />

                                :

                                proveedor.name_user
                            }


                        </p>


                    </div>





                    {/* EMAIL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Mail size={20}/>

                            Email

                        </div>


                        <p>


                            {
                                editando

                                ?

                                <input

                                    type="email"

                                    name="email"

                                    value={
                                        form.email
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    className="w-full rounded-lg border px-3 py-2"

                                />

                                :

                                proveedor.email
                            }


                        </p>


                    </div>





                    {/* ROL */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            Rol

                        </div>


                        <p className="capitalize">

                            {proveedor.rol}

                        </p>


                    </div>





                    {/* ID */}

                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            ID Usuario

                        </div>


                        <p>

                            {proveedor.id}

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

                            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"

                        >

                            Guardar cambios

                        </button>

                        :

                        <button

                            onClick={() =>
                                setEditando(true)
                            }

                            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                        >

                            Editar proveedor

                        </button>

                    }



                    <button

                        onClick={eliminar}

                        className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"

                    >

                        Eliminar proveedor

                    </button>



                    {
                        editando &&

                        <button

                            onClick={() =>
                                setEditando(false)
                            }

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancelar

                        </button>
                    }


                </div>





                {/* COTIZACIONES */}

                <div className="mt-8 rounded-xl bg-slate-50 p-5">


                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">


                        <FileText size={20}/>

                        Cotizaciones realizadas


                    </div>


                    <p className="text-3xl font-bold text-cyan-600">


                        {
                            proveedor.cotizaciones?.length || 0
                        }


                    </p>


                </div>


            </div>


        </div>

    );

};


export default VerProveedor;

