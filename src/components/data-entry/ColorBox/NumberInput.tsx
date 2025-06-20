import { Input } from '@/components/data-entry/Input';

type NumberInputProp = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  min: number;
  max: number;
  className?: string;
};

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  className
}: NumberInputProp) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (min > newValue || max < newValue) return;
    onChange(e, newValue);
  };

  return (
    <Input
      className={className}
      type="number"
      size="sm"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      disableFocusEffect
      disableHoverEffect
    />
  );
};

export default NumberInput;
