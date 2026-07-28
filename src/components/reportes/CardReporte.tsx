interface Props {

  titulo: string;

  valor: number;

  descripcion?: string;

  icono?: string;

}



const CardReporte = ({

  titulo,

  valor,

  descripcion,

  icono

}: Props) => {


  return (

    <article

      className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      transition
      hover:shadow-md
      "

    >


      <div className="flex items-center justify-between">


        <div>


          <p className="
          text-sm
          font-medium
          text-slate-500
          ">

            {titulo}

          </p>



          <h2 className="
          mt-2
          text-4xl
          font-bold
          text-slate-900
          ">

            {valor}

          </h2>



          {descripcion && (

            <p className="
            mt-2
            text-sm
            text-slate-600
            ">

              {descripcion}

            </p>

          )}


        </div>



        {icono && (

          <div className="
          text-4xl
          ">

            {icono}

          </div>

        )}


      </div>


    </article>

  );


};


export default CardReporte;