'use client';

import './AlphaSlider.scss';
import { useRef, useCallback, memo, useLayoutEffect } from 'react';
import Mosaic from '@/components/Mosaic';
import Slider, { SliderValueType } from '@/components/Slider';
import { useColorBoxContext } from '../ColorBox.hooks';
import { hsbObjToRgbObj } from '@/components/ColorPicker';

const AlphaSlider = memo(() => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const colorValueRef = useRef(colorValue);
  const changeColorValueRef = useRef(changeColorValue);
  const rgbObj = hsbObjToRgbObj(colorValue);
  const { r, g, b, a = 1 } = rgbObj;
  const rgbCss = `rgb(${r},${g},${b})`;
  const rgbaCss = `rgba(${r},${g},${b},${a})`;

  useLayoutEffect(() => {
    colorValueRef.current = colorValue;
    changeColorValueRef.current = changeColorValue;
  }, [colorValue, changeColorValue]);

  const handleAlphaChange = useCallback(
    (event: React.SyntheticEvent | Event, newAlpha: SliderValueType) => {
      changeColorValueRef.current(event, {
        ...colorValueRef.current,
        a: (newAlpha as number) / 100
      });
    },
    []
  );

  return (
    <Mosaic className="JinniColorBoxAlphaSlider">
      <Slider
        value={colorValue.a !== undefined ? colorValue.a * 100 : 100}
        onChange={handleAlphaChange}
        min={0}
        max={100}
        TooltipProps={{ open: false }}
        style={{ '--rgb': rgbCss, '--rgba': rgbaCss }}
      />
    </Mosaic>
  );
});

AlphaSlider.displayName = 'AlphaSlider';

export default AlphaSlider;
