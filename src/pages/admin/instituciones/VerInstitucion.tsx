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



    useEffect(()=>{


        if(!id) return;


        buscarInstitucion(
            Number(id)
        )
        .then((data)=>{


            setInstitucion(
                data
            );


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

                            {institucion.organizacion}

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

                            {institucion.name_user}

                        </p>


                    </div>





                    <div className="rounded-xl bg-slate-50 p-5">


                        <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

                            <Mail size={20}/>

                            Email

                        </div>


                        <p>

                            {institucion.email}

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