import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  CartesianGrid,

  Tooltip,

  ResponsiveContainer

} from "recharts";


interface Props {

  titulo: string;

  datos: {

    nombre: string;

    cantidad: number;

  }[];

}



const GraficoReporte = ({

  titulo,

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


      <h2

        className="
        mb-6
        text-xl
        font-bold
        text-slate-900
        "

      >

        {titulo}

      </h2>



      <div

        className="
        h-72
        w-full
        "

      >


        <ResponsiveContainer

          width="100%"

          height="100%"

        >


          <BarChart

            data={datos}

          >


            <CartesianGrid

              strokeDasharray="3 3"

            />


            <XAxis

              dataKey="nombre"

            />


            <YAxis />


            <Tooltip />



            <Bar

              dataKey="cantidad"

            />



          </BarChart>


        </ResponsiveContainer>


      </div>


    </section>


  );


};


export default GraficoReporte;