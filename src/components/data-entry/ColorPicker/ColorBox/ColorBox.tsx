import './ColorBox.scss';
import { useState } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import { RgbaObject } from '@/utils/colorFormat';
import { useColorValue, usePalette } from './ColorBox.hooks';
import { Slider } from '@/components/data-entry/Slider';
import { Mosaic } from '@/components/_share/Mosaic';
import { isNumber } from '@/utils/isNumber';
import { Select, Option } from '@/components/data-entry/Select';
import RgbaInputs from './RgbaInputs';
import HslInputs from './HslInputs';
import HexInput from './HexInput';

export type ColorBoxProps<T extends AsType = 'div'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> & {
  defaultValue?: ColorType;
  value?: ColorType;
  onChange?: (event: Event | React.SyntheticEvent, value: RgbaObject) => void;
};

const FORMAT = ['RGB', 'HSL', 'HEX'] as const;

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
  const {
    rgbaValue,
    hslaValue,
    hexValue,
    handleRgbaChange,
    handleHslaChange,
    handleHexChange
  } = useColorValue({
    defaultValue,
    value,
    onChange
  });
  const {
    svCanvasElRef,
    paletteThumbElRef,
    handlePaletteMouseDown,
    handlePaletteMouseUp,
    handlePaletteMouseLeave,
    handlePaletteMouseMove,
    handlePaletteThumbKeyDown
  } = usePalette({
    hslaValue,
    handleHslaChange
  });
  const [format, setFormat] = useState<(typeof FORMAT)[number]>('RGB');
  const newStyle = useStyle({
    '--hue': hslaValue.h,
    '--hsl': `hsl(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%)`,
    '--hsla': `hsla(${hslaValue.h}, ${hslaValue.s}%, ${hslaValue.l}%, ${hslaValue.a})`,
    ...style
  });

  return (
    <Component
      className={cn('JinniColorBox', className)}
      style={newStyle}
      {...rest}
    >
      <div
        className="JinniColorBoxPalette"
        onMouseDown={handlePaletteMouseDown}
        onMouseUp={handlePaletteMouseUp}
        onMouseLeave={handlePaletteMouseLeave}
        onMouseMove={handlePaletteMouseMove}
        role="button"
        tabIndex={0}
      >
        <canvas ref={svCanvasElRef} width={240} height={170} />
        <span
          ref={paletteThumbElRef}
          className="JinniColorBoxPaletteThumb"
          onKeyDown={handlePaletteThumbKeyDown}
          role="button"
          tabIndex={0}
        />
      </div>
      <div className="JinniColorBoxControl">
        <div className="JinniColorBoxControlTop">
          <Mosaic>
            <div
              className="JinniColorBoxColorPreview"
              style={{ backgroundColor: hexValue }}
            />
          </Mosaic>
          <div className="JinniColorBoxSliderContainer">
            <Mosaic>
              <Slider
                className="JinniColorBoxHueSlider"
                value={hslaValue.h}
                onChange={(e, val) =>
                  isNumber(val) && handleHslaChange(e, { h: val })
                }
                min={0}
                max={360}
                TooltipProps={{ open: false }}
              />
            </Mosaic>
            <Mosaic style={{ backgroundSize: '3% 50%' }}>
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
          </div>
        </div>
        <div className="JinniColorBoxControlBottom">
          <Select
            value={format}
            onChange={(_, value) => setFormat(value as (typeof FORMAT)[number])}
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
        </div>
      </div>
    </Component>
  );
};

export default ColorBox;
