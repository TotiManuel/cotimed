import { useEffect, useState } from "react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import QuickAction from "../../components/dashboard/QuickAction";
import ActivityCard from "../../components/dashboard/ActivityCard";

import { obtenerDashboardInstitucion } from "../../service/dashboardInstitucion.service";

interface DashboardInstitucionData {

  solicitudes: number;
  solicitudesAbiertas: number;
  solicitudesCerradas: number;
  cotizaciones: number;
  cotizacionesAceptadas: number;
  proveedoresInvitados: number;

  actividad: {
    titulo: string;
    fecha: string;
  }[];

}

const DashboardInstitucion = () => {

  const [datos, setDatos] =
    useState<DashboardInstitucionData | null>(null);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const data =
          await obtenerDashboardInstitucion();

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
        titulo="Panel de la institución"
        subtitulo="Gestiona solicitudes, cotizaciones y proveedores."
      >

        <p className="text-slate-600">
          Cargando información...
        </p>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout
      titulo="Panel de la institución"
      subtitulo="Gestiona solicitudes, cotizaciones y proveedores."
    >

      {/* Estadísticas */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <StatCard
          titulo="Solicitudes"
          valor={datos?.solicitudes ?? 0}
          descripcion="Solicitudes creadas"
        />

        <StatCard
          titulo="Abiertas"
          valor={datos?.solicitudesAbiertas ?? 0}
          descripcion="Solicitudes activas"
        />

        <StatCard
          titulo="Cerradas"
          valor={datos?.solicitudesCerradas ?? 0}
          descripcion="Solicitudes finalizadas"
        />

        <StatCard
          titulo="Cotizaciones"
          valor={datos?.cotizaciones ?? 0}
          descripcion="Cotizaciones recibidas"
        />

        <StatCard
          titulo="Aceptadas"
          valor={datos?.cotizacionesAceptadas ?? 0}
          descripcion="Cotizaciones aprobadas"
        />

        <StatCard
          titulo="Proveedores"
          valor={datos?.proveedoresInvitados ?? 0}
          descripcion="Proveedores invitados"
        />

      </section>

      {/* Acciones rápidas */}

      <section className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Acciones rápidas
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <QuickAction
            titulo="Solicitudes"
            descripcion="Administrar solicitudes."
            ruta="/institucion/solicitudes"
          />

          <QuickAction
            titulo="Cotizaciones"
            descripcion="Comparar cotizaciones."
            ruta="/institucion/cotizaciones"
          />

          <QuickAction
            titulo="Proveedores"
            descripcion="Buscar proveedores."
            ruta="/institucion/proveedores"
          />

          <QuickAction
            titulo="Equipamientos"
            descripcion="Explorar equipamientos."
            ruta="/institucion/equipamientos"
          />

          <QuickAction
            titulo="Reportes"
            descripcion="Ver reportes."
            ruta="/institucion/reportes"
          />

          <QuickAction
            titulo="Perfil"
            descripcion="Editar perfil."
            ruta="/institucion/perfil"
          />

          <QuickAction
            titulo="Configuración"
            descripcion="Configurar la cuenta."
            ruta="/institucion/configuracion"
          />

        </div>

      </section>

      {/* Actividad reciente */}

      <section className="mt-12">

        <h2 className="mb-6 text-2xl font-bold text-slate-900">
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

      {/* Resumen */}

      <section className="mt-12">

        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold text-slate-900">
            Resumen
          </h2>

          <p className="mt-4 leading-7 text-slate-600">

            Desde este panel podrás administrar las solicitudes
            de compra, comparar cotizaciones de proveedores y
            gestionar el equipamiento de tu institución.

          </p>

        </div>

      </section>

    </DashboardLayout>

  );

};

export default DashboardInstitucion;