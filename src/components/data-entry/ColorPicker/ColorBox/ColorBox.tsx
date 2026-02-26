import './ColorBox.scss';
// import { useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { useColorValue } from './ColorBox.hooks';
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

export type ColorBoxProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: ColorValueType;
  value?: ColorValueType;
  onChange?: (event: Event | React.SyntheticEvent, value: HSBObject) => void;
};

// const FORMAT = ['RGB', 'HSL', 'HEX'] as const;

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
  // const [format, setFormat] = useState<(typeof FORMAT)[number]>('RGB');
  const newStyle = useStyle({
    // '--hue': hslaValue.h,
    // '--hsl': `hsl(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%)`,
    // '--hsla': `hsla(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%, ${hslaValue.a})`,
    ...style
  });

  return (
    <ColorBoxContext.Provider value={{ colorValue, changeColorValue }}>
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
              {/*  <Mosaic style={{ backgroundSize: '3% 50%' }}>
                <Slider
                  className="JinniColorBoxAlphaSlider"
                  value={Math.round(hslaValue.a * 100)}
                  onChange={(e, val) =>
                    isNumber(val) && handleHslaChange(e, { a: val / 100 })
                  }
                  min={0}
                  max={100}
                  TooltipProps={{ open: false }}
                />
              </Mosaic>
             
              </div> */}
            </div>
          </div>
          {/* <div className="JinniColorBoxControlBottom">
            <Select
              value={format}
              onChange={(_, value) =>
                setFormat(value as (typeof FORMAT)[number])
              }
              size="sm"
              variant="borderless"
              MenuProps={{
                MenuListProps: { dense: true },
                style: { minWidth: 'auto' }
              }}
            >
              {FORMAT.map((val) => (
                <Option key={val} value={val} style={{ textAlign: 'center' }}>
                  {val}
                </Option>
              ))}
            </Select>
            {format === 'RGB' && (
              <RgbaInputs
                rgbaObject={rgbaValue}
                handleRgbaChange={handleRgbaChange}
              />
            )}
            {format === 'HSL' && (
              <HslInputs
                hslaObject={hslaValue}
                handleHslaChange={handleHslaChange}
              />
            )}
            {format === 'HEX' && (
              <HexInput hexValue={hexValue} handleHexChange={handleHexChange} />
            )}
          </div>*/}
        </div>
      </Component>
    </ColorBoxContext.Provider>
  );
};

export default ColorBox;
