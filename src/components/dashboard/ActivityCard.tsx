interface Props {
  titulo: string;
  fecha: string;
}

const ActivityCard = ({
  titulo,
  fecha,
}: Props) => {
  return (
    <div className="rounded-xl border bg-white p-4">

      <h4 className="font-semibold text-slate-800">
        {titulo}
      </h4>

      <p className="mt-1 text-sm text-slate-500">
        {fecha}
      </p>

    </div>
  );
};

export default ActivityCard;