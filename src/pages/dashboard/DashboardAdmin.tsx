import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickAction from "../../components/dashboard/QuickAction";
import ActivityCard from "../../components/dashboard/ActivityCard";
import { obtenerDashboardAdmin } from "../../service/admin.service";

interface DashboardData {

  usuarios:number;
  instituciones:number;
  proveedores:number;
  solicitudes:number;
  cotizaciones:number;
  equipamientos:number;

  actividad:{
    titulo:string;
    fecha:string;
  }[];

}



const DashboardAdmin = () => {


  const [datos,setDatos] = useState<DashboardData | null>(null);

  const [cargando,setCargando] = useState(true);



  useEffect(()=>{


    const cargarDatos = async()=>{

      try {

        const data = await obtenerDashboardAdmin();

        setDatos(data);

      } catch(error){

        console.error(error);

      } finally {

        setCargando(false);

      }

    };


    cargarDatos();


  },[]);



  if(cargando){

    return (

      <DashboardLayout
        titulo="Panel de Administración"
        subtitulo="Gestiona usuarios, instituciones, proveedores y supervisa toda la plataforma."
      >

        <p className="text-slate-600">
          Cargando información...
        </p>


      </DashboardLayout>

    );

  }



  return (

    <DashboardLayout
      titulo="Panel de Administración"
      subtitulo="Gestiona usuarios, instituciones, proveedores y supervisa toda la plataforma."
    >


      {/* Estadísticas */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


        <StatCard
          titulo="Usuarios"
          valor={datos?.usuarios ?? 0}
          descripcion="Usuarios registrados"
        />


        <StatCard
          titulo="Instituciones"
          valor={datos?.instituciones ?? 0}
          descripcion="Instituciones activas"
        />


        <StatCard
          titulo="Proveedores"
          valor={datos?.proveedores ?? 0}
          descripcion="Proveedores aprobados"
        />


        <StatCard
          titulo="Solicitudes"
          valor={datos?.solicitudes ?? 0}
          descripcion="Solicitudes activas"
        />


        <StatCard
          titulo="Cotizaciones"
          valor={datos?.cotizaciones ?? 0}
          descripcion="Cotizaciones enviadas"
        />


        <StatCard
          titulo="Equipamientos"
          valor={datos?.equipamientos ?? 0}
          descripcion="Productos publicados"
        />


      </section>




      {/* Acciones rápidas */}

      <section className="mt-12">


        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Acciones rápidas
        </h2>



        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">


          <QuickAction
            titulo="Usuarios"
            descripcion="Administrar usuarios."
            ruta="/usuarios"
          />


          <QuickAction
            titulo="Instituciones"
            descripcion="Administrar instituciones."
            ruta="/instituciones"
          />

          <QuickAction
            titulo="Proveedores"
            descripcion="Administrar proveedores."
            ruta="/proveedores"
          />


          <QuickAction
            titulo="Equipamientos"
            descripcion="Administrar catálogo."
            ruta="/equipamientos"
          />


          <QuickAction
            titulo="Solicitudes"
            descripcion="Ver solicitudes."
            ruta="/solicitudes"
          />


          <QuickAction
            titulo="Cotizaciones"
            descripcion="Ver cotizaciones."
            ruta="/cotizaciones"
          />


          <QuickAction
            titulo="Reportes"
            descripcion="Generar reportes."
            ruta="/reportes"
          />


          <QuickAction
            titulo="Configuración"
            descripcion="Configurar plataforma."
            ruta="/configuracion"
          />


        </div>


      </section>





      {/* Actividad reciente */}


      <section className="mt-12">


        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Actividad reciente
        </h2>



        <div className="space-y-4">


          {
            datos?.actividad.map((item,index)=>(

              <ActivityCard

                key={index}

                titulo={item.titulo}

                fecha={item.fecha}

              />

            ))
          }



        </div>


      </section>






      {/* Resumen */}


      <section className="mt-12">


        <div className="rounded-2xl border bg-white p-8 shadow-sm">


          <h2 className="text-2xl font-bold text-slate-900">
            Resumen general
          </h2>


          <p className="mt-4 text-slate-600 leading-7">

            Desde este panel podrás administrar todos los módulos
            de Cotimed: usuarios, instituciones, proveedores,
            solicitudes, cotizaciones y equipamiento.

          </p>


        </div>


      </section>



    </DashboardLayout>

  );

};


export default DashboardAdmin;