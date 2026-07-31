import {
    PackagePlus,
    Upload,
    Save
} from "lucide-react";


const AgregarEquipamiento = () => {


    return (

        <>

            <div className="mb-10">


                <h1 className="text-4xl font-bold text-slate-900">

                    Agregar equipamiento

                </h1>


                <p className="mt-2 text-slate-600">

                    Publicá un nuevo equipo médico para que las instituciones puedan solicitar cotizaciones.

                </p>


            </div>





            <div className="rounded-2xl bg-white p-8 shadow">


                <div className="mb-8 flex items-center gap-4">


                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">


                        <PackagePlus size={30}/>


                    </div>



                    <div>


                        <h2 className="text-2xl font-bold">

                            Información del equipo

                        </h2>


                        <p className="text-slate-500">

                            Completá los datos técnicos.

                        </p>


                    </div>


                </div>





                <div className="grid gap-6 md:grid-cols-2">



                    <div>


                        <label className="mb-2 block font-medium">

                            Nombre del equipo

                        </label>


                        <input

                            placeholder="Ej: Tomógrafo Computado"

                            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                        />


                    </div>





                    <div>


                        <label className="mb-2 block font-medium">

                            Categoría

                        </label>


                        <select

                            className="w-full rounded-xl border px-4 py-3"

                        >

                            <option>

                                Seleccionar categoría

                            </option>


                            <option>

                                Diagnóstico por imágenes

                            </option>


                            <option>

                                Terapia Intensiva

                            </option>


                            <option>

                                Monitoreo

                            </option>


                            <option>

                                Quirófano

                            </option>


                        </select>


                    </div>





                    <div>


                        <label className="mb-2 block font-medium">

                            Marca

                        </label>


                        <input

                            placeholder="Ej: Siemens"

                            className="w-full rounded-xl border px-4 py-3"

                        />


                    </div>





                    <div>


                        <label className="mb-2 block font-medium">

                            Modelo

                        </label>


                        <input

                            placeholder="Ej: SOMATOM X.cite"

                            className="w-full rounded-xl border px-4 py-3"

                        />


                    </div>





                    <div>


                        <label className="mb-2 block font-medium">

                            Precio estimado

                        </label>


                        <input

                            placeholder="USD 50.000"

                            className="w-full rounded-xl border px-4 py-3"

                        />


                    </div>





                    <div>


                        <label className="mb-2 block font-medium">

                            Disponibilidad

                        </label>


                        <select

                            className="w-full rounded-xl border px-4 py-3"

                        >

                            <option>

                                Disponible

                            </option>


                            <option>

                                Bajo pedido

                            </option>


                            <option>

                                Próximamente

                            </option>


                        </select>


                    </div>


                </div>






                <div className="mt-6">


                    <label className="mb-2 block font-medium">

                        Descripción técnica

                    </label>


                    <textarea

                        rows={5}

                        placeholder="Características, especificaciones, accesorios incluidos..."

                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-cyan-600"

                    />


                </div>







                <div className="mt-6">


                    <label className="mb-3 block font-medium">

                        Imagen del equipo

                    </label>


                    <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed">


                        <div className="text-center text-slate-500">


                            <Upload

                                size={35}

                                className="mx-auto mb-3"

                            />


                            <p>

                                Subir imagen

                            </p>


                        </div>


                    </div>


                </div>







                <button

                    className="mt-8 flex items-center gap-3 rounded-xl bg-cyan-600 px-7 py-3 font-semibold text-white hover:bg-cyan-700"

                >

                    <Save size={20}/>

                    Publicar equipamiento


                </button>



            </div>


        </>

    );

};


export default AgregarEquipamiento;