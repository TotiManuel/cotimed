import FormUsuario from "./FormUsuario";

import type { Usuario } from "../../types/Usuario";


interface Props {

  abierto:boolean;

  usuario:Usuario | null;

  onCerrar:()=>void;

  onGuardar:(usuario:Partial<Usuario>)=>void;

}


const ModalUsuario = ({

  abierto,

  usuario,

  onCerrar,

  onGuardar

}:Props)=>{


  if(!abierto){

    return null;

  }


  return(

    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      p-4
      "
    >


      <div
        className="
        w-full
        max-w-2xl
        rounded-2xl
        bg-white
        shadow-2xl
        "
      >


        <div
          className="
          flex
          items-center
          justify-between
          border-b
          p-6
          "
        >


          <h2
            className="
            text-2xl
            font-bold
            text-slate-900
            "
          >

            {
              usuario
              ?
              "Editar usuario"
              :
              "Nuevo usuario"
            }


          </h2>



          <button

            onClick={onCerrar}

            className="
            text-2xl
            text-slate-500
            hover:text-slate-800
            "

          >

            ×

          </button>


        </div>




        <div className="p-6">


          <FormUsuario

            usuario={usuario}

            onGuardar={onGuardar}

            onCancelar={onCerrar}

          />


        </div>


      </div>


    </div>

  );

};


export default ModalUsuario;