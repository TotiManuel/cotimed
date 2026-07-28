import { Link } from "react-router-dom";

interface Props {
  titulo: string;
  descripcion: string;
  ruta: string;
}

const QuickAction = ({
  titulo,
  descripcion,
  ruta,
}: Props) => {
  return (
    <Link
      to={ruta}
      className="rounded-2xl border bg-white p-6 shadow-sm transition hover:border-blue-500 hover:shadow-lg"
    >
      <h3 className="text-xl font-semibold text-slate-900">
        {titulo}
      </h3>

      <p className="mt-2 text-slate-600">
        {descripcion}
      </p>
    </Link>
  );
};

export default QuickAction;