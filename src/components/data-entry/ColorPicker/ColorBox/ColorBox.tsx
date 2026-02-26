import './ColorBox.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useColorValue, useFormat } from './ColorBox.hooks';
import { ColorValueType, HSBObject } from '../ColorPicker.types';
import ColorBoxContext from './ColorBox.contexts';
import { Palette } from './Palette';
import { ColorBlock } from './ColorBlock';
import { HueSlider } from './HueSlider';
import { AlphaSlider } from './AlphaSlider';
import { FormatSelect } from './FormatSelect';
import { RgbInput } from './RgbInput';
import { HsbInput } from './HsbInput';
import { HexInput } from './HexInput';
import { Stack } from '@/components/layout/Stack';

export type ColorBoxProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: ColorValueType;
  value?: ColorValueType;
  onChange?: (event: Event | React.SyntheticEvent, value: HSBObject) => void;
};

const ColorBox = <T extends AsType = 'div'>(props: ColorBoxProps<T>) => {
  const {
    defaultValue = 'primary',
    value,
    onChange,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { colorValue, changeColorValue } = useColorValue({
    defaultValue,
    value,
    onChange
  });
  const { format, changeFormat } = useFormat();
  const newStyle = useStyle(style);

  return (
    <ColorBoxContext.Provider
      value={{ colorValue, format, changeColorValue, changeFormat }}
    >
      <Component
        className={cn('JinniColorBox', className)}
        style={newStyle}
        {...rest}
      >
        <Palette />
        <Stack className="JinniColorBoxControl" spacing={8}>
          <Stack direction="row" spacing={8}>
            <ColorBlock />
            <Stack spacing={8} style={{ flex: 1 }}>
              <HueSlider />
              <AlphaSlider />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={5} style={{ alignItems: 'end' }}>
            <FormatSelect />
            {format === 'RGB' && <RgbInput />}
            {format === 'HSB' && <HsbInput />}
            {format === 'HEX' && <HexInput />}
          </Stack>
        </Stack>
      </Component>
    </ColorBoxContext.Provider>
  );
};

export default ColorBox;
