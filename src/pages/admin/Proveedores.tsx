import { useState } from "react";
import { useProveedores } from "../../hooks/useProveedores";
import FormProveedor from "../../components/proveedores/FormProveedor";
import CardProveedor from "../../components/proveedores/CardProveedor";
import type { Proveedor } from "../../types/Proveedor";
import type { FormProveedor as ProveedorFormType } from "../../types/Proveedor";


const Proveedores = () => {
  const {
    proveedores,
    cargando,
    crear,
    actualizar,
    eliminar
  } = useProveedores();



  const [mostrarFormulario, setMostrarFormulario] =

    useState(false);



  const [proveedorEditar, setProveedorEditar] =

    useState<Proveedor | null>(null);

  const nuevoProveedor = () => {

    setProveedorEditar(null);

    setMostrarFormulario(true);

  };

  const editarProveedor = (

    proveedor: Proveedor

  ) => {


    setProveedorEditar(proveedor);

    setMostrarFormulario(true);


  };

  const cancelar = () => {


    setProveedorEditar(null);

    setMostrarFormulario(false);


  };

  const guardar = async (

    datos: ProveedorFormType

  ) => {



    if (proveedorEditar) {


      await actualizar(

        proveedorEditar.id,

        datos

      );


    } else {


      await crear(datos);


    }




    cancelar();


  };

  const borrar = async (

    id:number

  ) => {


    const confirmar = window.confirm(

      "¿Seguro que desea eliminar este proveedor?"

    );

    if(!confirmar) return;

    await eliminar(id);

  };

  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      {/* TITULO */}

      <section className="
      mb-10
      flex
      flex-col
      gap-4
      md:flex-row
      md:items-center
      md:justify-between
      ">


        <div>


          <h1 className="
          text-4xl
          font-bold
          text-slate-900
          ">

            Proveedores

          </h1>



          <p className="
          mt-2
          text-slate-600
          ">

            Administración de proveedores de equipamiento médico.

          </p>


        </div>





        <button

          onClick={nuevoProveedor}

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

          + Nuevo proveedor

        </button>



      </section>









      {/* FORMULARIO */}

      {
        mostrarFormulario && (

          <section className="
          mb-10
          rounded-2xl
          border
          bg-white
          p-6
          shadow
          ">

 
            <FormProveedor

              proveedor={proveedorEditar}

              onGuardar={guardar}

              onCancelar={cancelar}

            />


          </section>


        )
      }
      {/* LISTADO */}
      {
        cargando ? (


          <p className="text-slate-500">

            Cargando proveedores...

          </p>



        ) : proveedores.length === 0 ? (


          <div className="
          rounded-xl
          border
          bg-slate-50
          p-10
          text-center
          text-slate-500
          ">


            No hay proveedores registrados.


          </div>




        ) : (



          <section className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          ">


            {
              proveedores.map((proveedor)=>(


                <CardProveedor

                  key={proveedor.id}

                  proveedor={proveedor}

                  onEdit={editarProveedor}

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


export default Proveedores;