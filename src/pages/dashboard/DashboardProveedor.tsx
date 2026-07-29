import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickAction from "../../components/dashboard/QuickAction";
import ActivityCard from "../../components/dashboard/ActivityCard";

import { obtenerDashboardProveedor } from "../../service/dashboardProveedor.service";

interface DashboardProveedorData {
  solicitudesRecibidas: number;
  cotizacionesEnviadas: number;
  cotizacionesAprobadas: number;
  productosPublicados: number;
  tasaAprobacion: number;
  tiempoRespuesta: string;
  valoracion: string;

  actividad: {
    titulo: string;
    fecha: string;
  }[];
}

const DashboardProveedor = () => {

  const [datos, setDatos] =
    useState<DashboardProveedorData | null>(null);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const data =
          await obtenerDashboardProveedor();

        setDatos(data);

      } catch (error) {

        console.error(error);

      } finally {

        setCargando(false);

      }

    };

    cargarDatos();

  }, []);

  if (cargando) {

    return (

      <DashboardLayout
        titulo="Panel del proveedor"
        subtitulo="Administra tus productos, cotizaciones y solicitudes."
      >

        <p className="text-slate-600">

          Cargando información...

        </p>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout
      titulo="Panel del proveedor"
      subtitulo="Administra tus productos, cotizaciones y solicitudes."
    >

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">

        <StatCard
          titulo="Solicitudes"
          valor={datos?.solicitudesRecibidas ?? 0}
          descripcion="Solicitudes recibidas"
        />

        <StatCard
          titulo="Cotizaciones"
          valor={datos?.cotizacionesEnviadas ?? 0}
          descripcion="Cotizaciones enviadas"
        />

        <StatCard
          titulo="Aprobadas"
          valor={datos?.cotizacionesAprobadas ?? 0}
          descripcion="Cotizaciones aceptadas"
        />

        <StatCard
          titulo="Equipamientos"
          valor={datos?.productosPublicados ?? 0}
          descripcion="Productos publicados"
        />

      </section>

      <section className="mt-12">

        <h2 className="mb-6 text-2xl font-bold">

          Acciones rápidas

        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <QuickAction
            titulo="Solicitudes"
            descripcion="Ver solicitudes disponibles."
            ruta="/solicitudes"
          />

          <QuickAction
            titulo="Cotizaciones"
            descripcion="Administrar cotizaciones."
            ruta="/cotizaciones"
          />

          <QuickAction
            titulo="Equipamientos"
            descripcion="Administrar productos."
            ruta="/equipamientos"
          />

          <QuickAction
            titulo="Perfil"
            descripcion="Editar perfil."
            ruta="/perfil"
          />

        </div>

      </section>

      <section className="mt-12">

        <h2 className="mb-6 text-2xl font-bold">

          Actividad reciente

        </h2>

        <div className="space-y-4">

          {datos?.actividad.map((item, index) => (

            <ActivityCard
              key={index}
              titulo={item.titulo}
              fecha={item.fecha}
            />

          ))}

        </div>

      </section>

      <section className="mt-12">

        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">

            Resumen

          </h2>

          <p className="mt-4 leading-7 text-slate-600">

            Desde este panel podrás gestionar tus solicitudes,
            cotizaciones y equipamientos publicados en CotiMed.

          </p>

        </div>

      </section>

    </DashboardLayout>

  );

};

export default DashboardProveedor;