import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    buscarInstitucion
} from "../../../services/instituciones.service";
import {
    actualizarInstitucion
} from "../../../services/instituciones.service";
import {
    ArrowLeft,
    Building2,
    Mail,
    User,
    FileText
} from "lucide-react";


const VerInstitucion = () => {


    const navigate = useNavigate();

    const {
        id
    } = useParams();



    const [institucion,setInstitucion] = useState<any>(null);
    const [editando,setEditando] = useState(false);

    const [form,setForm] = useState({
        name_user:"",
        email:"",
        organizacion:""
    });



    useEffect(()=>{


        if(!id) return;


        buscarInstitucion(
            Number(id)
        )
        .then((data)=>{


            setInstitucion(data);

            setForm({

                name_user:data.name_user,

                email:data.email,

                organizacion:data.organizacion

            });


        })
        .catch((error)=>{


            console.log(
                "Error cargando institución",
                error
            );


        });


    },[id]);





    if(!institucion){

        return (

            <div className="p-8">

                Cargando institución...

            </div>

        );

    }

const handleChange = (
    e:React.ChangeEvent<HTMLInputElement>
)=>{

    setForm({

        ...form,

        [e.target.name]:e.target.value

    });

};





    const guardarCambios = async()=>{

        try{

            const actualizado = await actualizarInstitucion(

                Number(id),

                form

            );


            setInstitucion(
                actualizado
            );


            setEditando(false);


        }catch(error){

            console.log(
                "Error actualizando institución",
                error
            );

        }

    };



    return (

        <div className="max-w-4xl mx-auto">


            <button

                onClick={() =>
                    navigate("/admin/instituciones")
                }

                className="mb-6 flex items-center gap-2 text-slate-600 hover:text-cyan-600"

            >

                <ArrowLeft size={20}/>

                Volver

            </button>





            <div className="rounded-2xl bg-white p-8 shadow">


                <div className="mb-8 flex items-center gap-4">


                    <div className="rounded-xl bg-cyan-600 p-4 text-white">

                        <Building2 size={32}/>

                    </div>


                    <div>


                        <h1 className="text-3xl font-bold text-slate-900">

                            {
                            editando
                            ?
                            <input
                                name="organizacion"
                                value={form.organizacion}
                                onChange={handleChange}
                                className="rounded-lg border px-3 py-2"
                            />
                            :
                            institucion.organizacion
                            }

                        </h1>


                        <p className="text-slate-600">

                            Detalle de institución

                        </p>


                    </div>


                </div>





                <div className="grid gap-6 md:grid-cols-2">



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
                                value={form.name_user}
                                onChange={handleChange}
                                className="rounded-lg border px-3 py-2"
                            />
                            :
                            institucion.name_user
                            }

                        </p>


                    </div>





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
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="rounded-lg border px-3 py-2"
                            />
                            :
                            institucion.email
                            }

                        </p>


                    </div>





                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            Rol

                        </div>


                        <p className="capitalize">

                            {institucion.rol}

                        </p>


                    </div>





                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 font-semibold text-slate-700">

                            ID Usuario

                        </div>


                        <p>

                            {institucion.id}

                        </p>


                    </div>


                </div>

                <div className="mt-8 flex gap-4">
                    {
                    editando
                    ?

                    <button
                        onClick={guardarCambios}
                        className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                    >

                        Guardar cambios

                    </button>

                    :

                    <button
                        onClick={() => setEditando(true)}
                        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
                    >

                        Editar institución

                    </button>

                    }


                    {
                    editando &&

                    <button
                        onClick={() => setEditando(false)}
                        className="rounded-xl border px-6 py-3"
                    >

                        Cancelar

                    </button>

                    }


                    </div>

                <div className="mt-8 rounded-xl bg-slate-50 p-5">


                    <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">


                        <FileText size={20}/>

                        Solicitudes creadas


                    </div>


                    <p className="text-3xl font-bold text-cyan-600">

                        {
                            institucion.solicitudes?.length || 0
                        }

                    </p>


                </div>





            </div>


        </div>

    );

};


export default VerInstitucion;