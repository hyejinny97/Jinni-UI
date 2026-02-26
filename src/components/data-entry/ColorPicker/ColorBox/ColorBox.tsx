import './ColorBox.scss';
// import { useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useColorValue, useFormat } from './ColorBox.hooks';
// import { Slider } from '@/components/data-entry/Slider';
// import { Mosaic } from '@/components/_share/Mosaic';
// import { isNumber } from '@/utils/isNumber';
// import { Select, Option } from '@/components/data-entry/Select';
// import RgbaInputs from './RgbaInputs';
// import HslInputs from './HslInputs';
// import HexInput from './HexInput';
import { ColorValueType, HSBObject } from '../ColorPicker.types';
import ColorBoxContext from './ColorBox.contexts';
import { Palette } from './Palette';
import { ColorBlock } from './ColorBlock';
import { HueSlider } from './HueSlider';
import { AlphaSlider } from './AlphaSlider';
import { FormatSelect } from './FormatSelect';
import { RgbInput } from './RgbInput';

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
  const newStyle = useStyle({
    // '--hue': hslaValue.h,
    // '--hsl': `hsl(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%)`,
    // '--hsla': `hsla(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%, ${hslaValue.a})`,
    ...style
  });

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
        <div className="JinniColorBoxControl">
          <div className="JinniColorBoxControlTop">
            <ColorBlock />
            <div className="JinniColorBoxSliderContainer">
              <HueSlider />
              <AlphaSlider />
            </div>
          </div>
          <div className="JinniColorBoxControlBottom">
            <FormatSelect />
            {format === 'RGB' && <RgbInput />}
            {/*{format === 'HSL' && (
              <HslInputs
                hslaObject={hslaValue}
                handleHslaChange={handleHslaChange}
              />
            )}
            {format === 'HEX' && (
              <HexInput hexValue={hexValue} handleHexChange={handleHexChange} />
            )}*/}
          </div>
        </div>
      </Component>
    </ColorBoxContext.Provider>
  );
};

export default ColorBox;
