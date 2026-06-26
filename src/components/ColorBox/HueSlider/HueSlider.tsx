'use client';

import './HueSlider.scss';
import { useRef, useCallback, memo, useLayoutEffect } from 'react';
import Mosaic from '@/components/Mosaic';
import Slider, { SliderValueType } from '@/components/Slider';
import { useColorBoxContext } from '../ColorBox.hooks';

const HueSlider = memo(() => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const colorValueRef = useRef(colorValue);
  const changeColorValueRef = useRef(changeColorValue);

  useLayoutEffect(() => {
    colorValueRef.current = colorValue;
    changeColorValueRef.current = changeColorValue;
  }, [colorValue, changeColorValue]);

  const handleHueChange = useCallback(
    (event: React.SyntheticEvent | Event, newHue: SliderValueType) => {
      changeColorValueRef.current(event, {
        ...colorValueRef.current,
        h: newHue as number
      });
    },
    []
  );

  return (
    <Mosaic className="JinniColorBoxHueSlider">
      <Slider
        value={colorValue.h}
        onChange={handleHueChange}
        min={0}
        max={360}
        TooltipProps={{ open: false }}
        style={{ '--hue': colorValue.h }}
      />
    </Mosaic>
  );
});

HueSlider.displayName = 'HueSlider';

export default HueSlider;
