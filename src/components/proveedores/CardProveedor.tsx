import type { Proveedor } from "../../types/Proveedor";


interface Props {

  proveedor: Proveedor;

  onEdit: (proveedor: Proveedor) => void;

  onDelete: (id: number) => void;

}



const CardProveedor = ({

  proveedor,

  onEdit,

  onDelete

}: Props) => {


  return (

    <article className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      transition
      hover:shadow-md
    ">


      {/* Nombre */}

      <div className="mb-4">


        <h2 className="
          text-xl
          font-bold
          text-slate-900
        ">

          {proveedor.nombreEmpresa}

        </h2>



        {
          proveedor.cuit && (

            <p className="
              text-sm
              text-slate-500
            ">

              CUIT: {proveedor.cuit}

            </p>

          )
        }


      </div>







      {/* Datos */}

      <div className="
        space-y-2
        text-sm
        text-slate-700
      ">


        {
          proveedor.email && (

            <p>

              <span className="font-semibold">
                Email:
              </span>{" "}

              {proveedor.email}

            </p>

          )
        }






        {
          proveedor.telefono && (

            <p>

              <span className="font-semibold">
                Teléfono:
              </span>{" "}

              {proveedor.telefono}

            </p>

          )
        }






        {
          proveedor.direccion && (

            <p>

              <span className="font-semibold">
                Dirección:
              </span>{" "}

              {proveedor.direccion}

            </p>

          )
        }




      </div>









      {/* Acciones */}

      <div className="
        mt-6
        flex
        gap-3
      ">


        <button

          onClick={() => onEdit(proveedor)}

          className="
            flex-1
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-blue-700
          "

        >

          Editar

        </button>






        <button

          onClick={() => onDelete(proveedor.id)}

          className="
            flex-1
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-red-700
          "

        >

          Eliminar

        </button>



      </div>



    </article>

  );


};


export default CardProveedor;