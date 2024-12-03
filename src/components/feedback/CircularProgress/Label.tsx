interface LabelProps {
  value: string;
}

const Label = ({ value }: LabelProps) => <span className="label">{value}</span>;

export default Label;
