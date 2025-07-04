import { useState, useContext } from 'react';
import { DigitalClockProps } from './DigitalClock';
import DigitalClockContext, {
  DigitalClockContextType
} from './DigitalClock.contexts';
import {
  TimeMode,
  isTimeStepManualType
} from '@/components/data-entry/TimeField';
import { isNumber } from '@/utils/isNumber';

export const useDigitalClock = <Mode extends TimeMode>(
  currentMode: Mode
): DigitalClockContextType<Mode> => {
  const value = useContext(DigitalClockContext);
  if (!value) throw new Error('DigitalClockContext value is null');
  const { timeStep } = value;
  if (currentMode === 'preset') {
    if (!isNumber(timeStep))
      throw new Error(
        `'preset' mode에서 timeStep prop은 number 타입이어야 합니다.`
      );
  } else if (currentMode === 'manual') {
    if (!isTimeStepManualType(timeStep))
      throw new Error(
        `'manual' mode에서 timeStep prop은 { hour: number; minute: number; second: number; } 타입이어야 합니다.`
      );
  }
  return value;
};

export const useSelectedTime = ({
  defaultValue,
  value,
  onChange,
  readOnly,
  disabled
}: Pick<
  DigitalClockProps,
  'defaultValue' | 'value' | 'onChange' | 'readOnly' | 'disabled'
>) => {
  const isControlled = value !== undefined;
  const [uncontrolledTime, setUncontrolledTime] = useState<Date | undefined>(
    defaultValue
  );

  const handleChange = (newTime: Date) => {
    if (readOnly || disabled) return;
    if (!isControlled) setUncontrolledTime(newTime);
    if (onChange) onChange(newTime);
  };

  return {
    selectedTime: isControlled ? value : uncontrolledTime,
    handleChange
  };
};
