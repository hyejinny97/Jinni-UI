import { useState } from 'react';
import { TimePickerProps } from './TimePicker';
import { useIsControlled } from '@/hooks/useIsControlled';

type UseTimeProps = Pick<
  TimePickerProps,
  'defaultValue' | 'value' | 'onChange'
>;

export const useTime = ({ defaultValue, value, onChange }: UseTimeProps) => {
  const isControlled = useIsControlled(value);
  const [uncontrolledTime, setUncontrolledTime] = useState<Date | null>(
    defaultValue || null
  );
  const time: Date | null = isControlled ? value : uncontrolledTime;

  const handleChange = (newValue: Date | null) => {
    if (!isControlled) setUncontrolledTime(newValue);
    if (onChange) onChange(newValue);
  };

  return {
    time,
    handleChange
  };
};
