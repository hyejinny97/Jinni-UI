import cn from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import Label from './Label';
import { HEX } from '@/types/color';
import { Input } from '@/components/data-entry/Input';

type HexInputsProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  hexValue: HEX;
  handleHexChange: (event: Event | React.SyntheticEvent, newHex: HEX) => void;
};

const HexInput = <T extends AsType = 'div'>(props: HexInputsProps<T>) => {
  const {
    hexValue,
    handleHexChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const isTypingRef = useRef<boolean>(false);
  const hex = hexValue.slice(1).toUpperCase();
  const [value, setValue] = useState<string>(hex);
  const newStyle = useStyle(style);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    const newValue = e.target.value.toUpperCase();
    if (newValue.length > 8) return;
    if (/^[0-9a-f]*$/i.test(newValue)) {
      setValue(newValue);
      handleHexChange(
        e,
        `#${newValue.length <= 6 ? newValue.padEnd(6, '0') : newValue.padEnd(8, 'f')}`
      );
    }
  };

  const handleBlur = () => {
    isTypingRef.current = false;
    setValue(hex);
  };

  useEffect(() => {
    if (isTypingRef.current) return;
    setValue(hex);
  }, [hex]);

  return (
    <Component
      className={cn('JinniHexInput', className)}
      style={newStyle}
      onBlur={handleBlur}
      {...rest}
    >
      <Label value="HEX">
        <Input
          value={value}
          onChange={handleChange}
          size="sm"
          disableFocusEffect
          disableHoverEffect
          startAdornment="#"
        />
      </Label>
    </Component>
  );
};

export default HexInput;
