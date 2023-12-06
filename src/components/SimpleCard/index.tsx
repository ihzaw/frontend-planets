type SimpleCardProps = {
  label: string;
  description: string;
};

const SimpleCard = (props: SimpleCardProps) => {
  const { label, description } = props;

  return (
    <div className="rounded-lg p-4 bg-slate-800 border-2 border-slate-300 text-white">
      <div className="font-medium text-base mb-4 border-b-2 border-white">{label}</div>
      <div className="text-xl">{description}</div>
    </div>
  );
};

export default SimpleCard;
