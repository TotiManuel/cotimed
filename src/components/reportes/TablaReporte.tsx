interface Columna {

  titulo: string;

  campo: string;

}



interface Props {

  titulo: string;

  columnas: Columna[];

  datos: Record<string, any>[];

}



const TablaReporte = ({

  titulo,

  columnas,

  datos

}: Props) => {


  return (

    <section

      className="
      rounded-2xl
      border
      bg-white
      p-6
      shadow-sm
      "

    >


      <h2 className="
      mb-5
      text-xl
      font-bold
      text-slate-900
      ">

        {titulo}

      </h2>



      {

        datos.length === 0 ? (


          <p className="
          text-slate-500
          ">

            No hay datos disponibles.

          </p>



        ) : (


          <div className="
          overflow-x-auto
          ">


            <table className="
            w-full
            text-left
            "
            >


              <thead>


                <tr className="
                border-b
                text-sm
                text-slate-500
                "
                >


                  {

                    columnas.map((columna) => (


                      <th

                        key={columna.campo}

                        className="
                        px-4
                        py-3
                        font-semibold
                        "

                      >

                        {columna.titulo}

                      </th>


                    ))

                  }


                </tr>


              </thead>



              <tbody>


                {

                  datos.map((fila, index) => (


                    <tr

                      key={index}

                      className="
                      border-b
                      last:border-none
                      "

                    >


                      {

                        columnas.map((columna) => (


                          <td

                            key={columna.campo}

                            className="
                            px-4
                            py-3
                            text-sm
                            text-slate-700
                            "

                          >

                            {fila[columna.campo]}


                          </td>


                        ))


                      }


                    </tr>


                  ))

                }


              </tbody>


            </table>


          </div>


        )

      }


    </section>


  );


};


export default TablaReporte;