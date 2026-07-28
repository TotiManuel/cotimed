interface Props {
  titulo: string;
  valor: string | number;
  descripcion: string;
}

const StatCard = ({
  titulo,
  valor,
  descripcion,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {titulo}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        {valor}
      </h2>

      <p className="mt-2 text-slate-500">
        {descripcion}
      </p>

    </div>
  );
};

export default StatCard;