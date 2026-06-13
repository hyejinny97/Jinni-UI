import './HsbInput.scss';
import { Stack } from '@/components/layout/Stack';
import { NumberInput, ValueType } from '@/components/data-entry/NumberInput';
import { useColorBoxContext } from '../ColorBox.hooks';

type ChannelType = 'h' | 's' | 'b' | 'a';

const HsbInput = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const { h, s, b, a } = colorValue;

  const handleInputChange =
    (channel: ChannelType) =>
    (event: React.SyntheticEvent | Event, value: ValueType) => {
      const valueNm = Number(value);
      const newValue = channel === 'a' ? valueNm / 100 : valueNm;
      changeColorValue(event, { ...colorValue, [channel]: newValue });
    };

  return (
    <Stack
      className="JinniColorBoxHsbInput"
      direction="row"
      spacing={5}
      style={{ alignItems: 'center' }}
    >
      <Stack direction="row" style={{ alignItems: 'center' }}>
        <NumberInput
          className="hue"
          value={Math.round(h)}
          onChange={handleInputChange('h')}
          min={0}
          max={360}
          size="sm"
          endAdornment={null}
          disableFocusEffect
          disableHoverEffect
          style={{ '--label': `'H'` }}
        />
        <NumberInput
          className="saturation"
          value={Math.round(s)}
          onChange={handleInputChange('s')}
          min={0}
          max={100}
          size="sm"
          endAdornment={null}
          disableFocusEffect
          disableHoverEffect
          style={{ '--label': `'S'` }}
        />
        <NumberInput
          className="brightness"
          value={Math.round(b)}
          onChange={handleInputChange('b')}
          min={0}
          max={100}
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

export default HsbInput;
