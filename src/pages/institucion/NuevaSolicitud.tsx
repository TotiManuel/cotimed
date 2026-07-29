import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import {
  crearSolicitud
} from "../../service/solicitud.service";

import type {
  FormSolicitud
} from "../../types/Solicitud";


const NuevaSolicitud = () => {


  const navigate = useNavigate();


  const [formulario, setFormulario] =
    useState<FormSolicitud>({

      titulo: "",
      descripcion: "",
      categoria: "",
      cantidad: 1,
      marcaPreferida: "",
      modeloPreferido: "",
      presupuestoMax: undefined,
      fechaNecesidad: ""

    });



  const [cargando,setCargando] =
    useState(false);


  const [error,setError] =
    useState("");



  const manejarCambio = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {


    const {name,value} = e.target;


    setFormulario({

      ...formulario,

      [name]:

        name === "cantidad" ||
        name === "presupuestoMax"

          ? Number(value)

          : value

    });


  };





  const enviarFormulario = async(
    e: React.FormEvent
  ) => {


    e.preventDefault();


    try {


      setCargando(true);

      setError("");



      await crearSolicitud(
        formulario
      );



      navigate(
        "/institucion/solicitudes"
      );



    }catch(error){


      console.error(error);


      setError(
        "Error creando solicitud"
      );


    }finally{


      setCargando(false);


    }


  };




  return (


    <DashboardLayout

      titulo="Nueva solicitud"

      subtitulo="Solicita equipamiento médico a proveedores."

    >



      <div className="rounded-2xl border bg-white p-8 shadow-sm">



        <form

          onSubmit={enviarFormulario}

          className="space-y-6"

        >



          <div>


            <label className="block mb-2 font-medium">

              Título

            </label>


            <input

              name="titulo"

              value={formulario.titulo}

              onChange={manejarCambio}

              className="w-full rounded-lg border p-3"

              placeholder="Ej: Monitor multiparamétrico"

              required

            />


          </div>





          <div>


            <label className="block mb-2 font-medium">

              Descripción

            </label>


            <textarea

              name="descripcion"

              value={formulario.descripcion}

              onChange={manejarCambio}

              className="w-full rounded-lg border p-3"

              rows={4}

              placeholder="Detalles del equipamiento requerido"

              required

            />


          </div>





          <div>


            <label className="block mb-2 font-medium">

              Categoría

            </label>


            <input

              name="categoria"

              value={formulario.categoria}

              onChange={manejarCambio}

              className="w-full rounded-lg border p-3"

              placeholder="Ej: Diagnóstico"

              required

            />


          </div>





          <div className="grid md:grid-cols-2 gap-6">


            <div>


              <label className="block mb-2 font-medium">

                Cantidad

              </label>


              <input

                type="number"

                name="cantidad"

                min="1"

                value={formulario.cantidad}

                onChange={manejarCambio}

                className="w-full rounded-lg border p-3"

                required

              />


            </div>




            <div>


              <label className="block mb-2 font-medium">

                Presupuesto máximo

              </label>


              <input

                type="number"

                name="presupuestoMax"

                value={
                  formulario.presupuestoMax ?? ""
                }

                onChange={manejarCambio}

                className="w-full rounded-lg border p-3"

                placeholder="ARS"

              />


            </div>


          </div>





          <div className="grid md:grid-cols-2 gap-6">


            <div>


              <label className="block mb-2 font-medium">

                Marca preferida

              </label>


              <input

                name="marcaPreferida"

                value={
                  formulario.marcaPreferida ?? ""
                }

                onChange={manejarCambio}

                className="w-full rounded-lg border p-3"

              />


            </div>




            <div>


              <label className="block mb-2 font-medium">

                Modelo preferido

              </label>


              <input

                name="modeloPreferido"

                value={
                  formulario.modeloPreferido ?? ""
                }

                onChange={manejarCambio}

                className="w-full rounded-lg border p-3"

              />


            </div>


          </div>





          <div>


            <label className="block mb-2 font-medium">

              Fecha de necesidad

            </label>


            <input

              type="date"

              name="fechaNecesidad"

              value={
                formulario.fechaNecesidad ?? ""
              }

              onChange={manejarCambio}

              className="w-full rounded-lg border p-3"

            />


          </div>





          {
            error && (

              <p className="text-red-600">

                {error}

              </p>

            )
          }





          <button

            disabled={cargando}

            className="rounded-lg bg-blue-600 px-6 py-3 text-white"

          >

            {
              cargando

              ? "Creando..."

              : "Crear solicitud"
            }


          </button>



        </form>



      </div>



    </DashboardLayout>


  );


};



export default NuevaSolicitud;