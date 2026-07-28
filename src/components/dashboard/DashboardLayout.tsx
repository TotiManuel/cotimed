import type { ReactNode } from "react";

interface DashboardLayoutProps {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}

const DashboardLayout = ({
  titulo,
  subtitulo,
  children,
}: DashboardLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* Encabezado */}

      <section className="border-b bg-white">

        <div className="mx-auto max-w-7xl px-8 py-10">

          <h1 className="text-4xl font-bold text-slate-900">
            {titulo}
          </h1>

          <p className="mt-2 text-lg text-slate-600">
            {subtitulo}
          </p>

        </div>

      </section>

      {/* Contenido */}

      <section className="mx-auto max-w-7xl px-8 py-8">

        {children}

      </section>

    </main>
  );
};

export default DashboardLayout;