import './HexInput.scss';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/data-entry/Input';
import { useColorBoxContext } from '../ColorBox.hooks';
import { hsbObjToHex, hexToHsbObj } from '../../ColorPicker.utils';
import { HEX } from '@/types/color';

const HexInput = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const hex = hsbObjToHex(colorValue);
  const hexWithoutHash = hex.slice(1).toUpperCase();
  const [inputValue, setInputValue] = useState<string>(hexWithoutHash);
  const isTypingRef = useRef<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value.toUpperCase();
    if (newValue.length > 8) return;
    if (/^[0-9a-f]*$/i.test(newValue)) {
      const paddedValue =
        newValue.length <= 6
          ? newValue.padEnd(6, '0')
          : newValue.padEnd(8, 'f');
      const hsbObj = hexToHsbObj(('#' + paddedValue) as HEX);
      setInputValue(newValue);
      changeColorValue(event, hsbObj);
    }
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    isTypingRef.current = true;
    event.currentTarget.select();
  };
  const handleBlur = () => {
    isTypingRef.current = false;
    setInputValue(hexWithoutHash);
  };

  useEffect(() => {
    if (isTypingRef.current) return;
    setInputValue(hexWithoutHash);
  }, [hexWithoutHash]);

  return (
    <Input
      className="JinniColorBoxHexInput"
      value={inputValue}
      onChange={handleInputChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      startAdornment="#"
      size="sm"
      disableFocusEffect
      disableHoverEffect
      style={{ '--label': `'HEX'` }}
    />
  );
};

export default HexInput;
