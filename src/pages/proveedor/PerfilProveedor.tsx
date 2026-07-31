import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Save,
    Upload,
    Tag
} from "lucide-react";


const PerfilProveedor = () => {


    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Perfil del proveedor

                </h1>


                <p className="mt-2 text-slate-600">

                    Administrá la información comercial de tu empresa.

                </p>


            </div>






            <div className="grid gap-8 lg:grid-cols-3">



                <div className="rounded-2xl bg-white p-8 shadow">


                    <div className="flex flex-col items-center text-center">


                        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">


                            <Building2 size={55}/>


                        </div>




                        <h2 className="mt-5 text-xl font-bold">

                            MedTech Argentina S.A.

                        </h2>




                        <p className="mt-2 text-slate-500">

                            Equipamiento médico

                        </p>





                        <button

                            className="mt-6 flex items-center gap-2 rounded-xl border px-5 py-3 hover:bg-slate-100"

                        >

                            <Upload size={18}/>

                            Cambiar logo


                        </button>



                    </div>


                </div>







                <div className="rounded-2xl bg-white p-8 shadow lg:col-span-2">


                    <h2 className="mb-8 text-2xl font-bold">

                        Información empresarial

                    </h2>





                    <div className="grid gap-6 md:grid-cols-2">



                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Nombre empresa

                            </label>


                            <input

                                defaultValue="MedTech Argentina S.A."

                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                            />


                        </div>





                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Razón social

                            </label>


                            <input

                                defaultValue="MedTech Argentina Sociedad Anónima"

                                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                            />


                        </div>







                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Email

                            </label>


                            <div className="relative">


                                <Mail

                                    size={18}

                                    className="absolute left-3 top-3.5 text-slate-400"

                                />


                                <input

                                    defaultValue="ventas@medtech.com"

                                    className="w-full rounded-xl border py-3 pl-10 pr-4"

                                />


                            </div>


                        </div>







                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Teléfono

                            </label>


                            <div className="relative">


                                <Phone

                                    size={18}

                                    className="absolute left-3 top-3.5 text-slate-400"

                                />


                                <input

                                    defaultValue="+54 11 4000 0000"

                                    className="w-full rounded-xl border py-3 pl-10 pr-4"

                                />


                            </div>


                        </div>






                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Ciudad

                            </label>


                            <div className="relative">


                                <MapPin

                                    size={18}

                                    className="absolute left-3 top-3.5 text-slate-400"

                                />


                                <input

                                    defaultValue="Buenos Aires"

                                    className="w-full rounded-xl border py-3 pl-10 pr-4"

                                />


                            </div>


                        </div>







                        <div>


                            <label className="mb-2 block font-medium text-slate-700">

                                Categoría principal

                            </label>


                            <div className="relative">


                                <Tag

                                    size={18}

                                    className="absolute left-3 top-3.5 text-slate-400"

                                />


                                <input

                                    defaultValue="Diagnóstico por imágenes"

                                    className="w-full rounded-xl border py-3 pl-10 pr-4"

                                />


                            </div>


                        </div>



                    </div>







                    <div className="mt-6">


                        <label className="mb-2 block font-medium text-slate-700">

                            Dirección comercial

                        </label>


                        <input

                            defaultValue="Av. Industrial 850"

                            className="w-full rounded-xl border px-4 py-3"

                        />


                    </div>








                    <button

                        className="mt-8 flex items-center gap-3 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"

                    >

                        <Save size={20}/>

                        Guardar cambios


                    </button>



                </div>


            </div>


        </>

    );

};


export default PerfilProveedor;