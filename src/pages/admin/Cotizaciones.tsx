import { useState } from "react";

import { useCotizaciones } from "../../hooks/useCotizaciones";

import FormCotizaciones from "../../components/cotizaciones/FormCotizaciones";
import CardCotizaciones from "../../components/cotizaciones/CardCotizaciones";

import type {
  Cotizacion,
  FormCotizacion
} from "../../types/Cotizacion";


const Cotizaciones = () => {


  const {

    cotizaciones,

    cargando,

    crear,

    actualizar,

    eliminar

  } = useCotizaciones();




  const [mostrarFormulario, setMostrarFormulario] =

    useState(false);




  const [cotizacionEditar, setCotizacionEditar] =

    useState<Cotizacion | null>(null);





  const nuevaCotizacion = () => {


    setCotizacionEditar(null);


    setMostrarFormulario(true);


  };





  const editarCotizacion = (

    cotizacion: Cotizacion

  ) => {


    setCotizacionEditar(cotizacion);


    setMostrarFormulario(true);


  };





  const cancelar = () => {


    setCotizacionEditar(null);


    setMostrarFormulario(false);


  };





  const guardar = async (

    datos: FormCotizacion

  ) => {



    if (cotizacionEditar) {



      await actualizar(

        cotizacionEditar.id,

        datos

      );



    } else {



      await crear(datos);



    }




    cancelar();



  };





  const borrar = async (

    id: number

  ) => {



    const confirmar = window.confirm(

      "¿Seguro que desea eliminar esta cotización?"

    );



    if (!confirmar) return;




    await eliminar(id);



  };





  return (

    <main className="mx-auto max-w-7xl px-6 py-10">



      {/* Encabezado */}



      <section
        className="
        mb-10
        flex
        flex-col
        gap-4
        md:flex-row
        md:items-center
        md:justify-between
        "
      >



        <div>



          <h1
            className="
            text-4xl
            font-bold
            text-slate-900
            "
          >

            Cotizaciones

          </h1>



          <p
            className="
            mt-2
            text-slate-600
            "
          >

            Administración de propuestas económicas.

          </p>



        </div>





        <button

          onClick={nuevaCotizacion}

          className="
          rounded-xl
          bg-blue-600
          px-5
          py-3
          font-semibold
          text-white
          hover:bg-blue-700
          "

        >

          + Nueva cotización

        </button>



      </section>







      {/* Formulario */}



      {

        mostrarFormulario && (



          <section
            className="
            mb-10
            rounded-2xl
            border
            bg-white
            p-6
            shadow
            "
          >



            <FormCotizaciones

              cotizacion={cotizacionEditar}

              onGuardar={guardar}

              onCancelar={cancelar}

            />



          </section>



        )

      }







      {/* Listado */}



      {



        cargando ? (



          <p className="text-slate-500">

            Cargando cotizaciones...

          </p>





        ) : cotizaciones.length === 0 ? (



          <div
            className="
            rounded-xl
            border
            bg-slate-50
            p-10
            text-center
            text-slate-500
            "
          >



            No hay cotizaciones registradas.



          </div>





        ) : (



          <section
            className="
            grid
            gap-6
            md:grid-cols-2
            lg:grid-cols-3
            "
          >



            {

              cotizaciones.map((cotizacion) => (



                <CardCotizaciones



                  key={cotizacion.id}



                  cotizacion={cotizacion}



                  onEdit={editarCotizacion}



                  onDelete={borrar}



                />



              ))

            }



          </section>



        )



      }





    </main>

  );


};


export default Cotizaciones;