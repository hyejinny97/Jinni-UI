import './RgbInput.scss';
import { Stack } from '@/components/layout/Stack';
import { NumberInput, ValueType } from '@/components/data-entry/NumberInput';
import { useColorBoxContext } from '../ColorBox.hooks';
import { hsbObjToRgbObj, rgbObjToHsbObj } from '../../ColorPicker.utils';

type ChannelType = 'r' | 'g' | 'b' | 'a';

const RgbInput = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const rgbObj = hsbObjToRgbObj(colorValue);
  const { r, g, b, a } = rgbObj;

  const handleInputChange =
    (channel: ChannelType) =>
    (event: React.SyntheticEvent | Event, value: ValueType) => {
      const valueNm = Number(value);
      const newValue = channel === 'a' ? valueNm / 100 : valueNm;
      const hsbObj = rgbObjToHsbObj(
        { ...rgbObj, [channel]: newValue },
        colorValue.h
      );
      changeColorValue(event, hsbObj);
    };

  return (
    <Stack
      className="JinniColorBoxRgbInput"
      direction="row"
      spacing={5}
      style={{ alignItems: 'center' }}
    >
      <Stack direction="row" style={{ alignItems: 'center' }}>
        <NumberInput
          className="red"
          value={r}
          onChange={handleInputChange('r')}
          min={0}
          max={255}
          size="sm"
          endAdornment={null}
          disableFocusEffect
          disableHoverEffect
          style={{ '--label': `'R'` }}
        />
        <NumberInput
          className="green"
          value={g}
          onChange={handleInputChange('g')}
          min={0}
          max={255}
          size="sm"
          endAdornment={null}
          disableFocusEffect
          disableHoverEffect
          style={{ '--label': `'G'` }}
        />
        <NumberInput
          className="blue"
          value={b}
          onChange={handleInputChange('b')}
          min={0}
          max={255}
          size="sm"
          endAdornment={null}
          disableFocusEffect
          disableHoverEffect
          style={{ '--label': `'B'` }}
        />
      </Stack>
      <NumberInput
        className="alpha"
        value={a !== undefined ? Math.round(a * 100) : 100}
        onChange={handleInputChange('a')}
        min={0}
        max={100}
        size="sm"
        endAdornment={null}
        disableFocusEffect
        disableHoverEffect
        style={{ '--label': `'Alpha'` }}
      />
    </Stack>
  );
};

export default RgbInput;
