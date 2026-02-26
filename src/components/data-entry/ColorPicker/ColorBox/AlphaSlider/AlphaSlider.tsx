import './AlphaSlider.scss';
import { Mosaic } from '@/components/_share/Mosaic';
import { Slider, SliderValueType } from '@/components/data-entry/Slider';
import { useColorBoxContext } from '../ColorBox.hooks';
import { hsbObjToRgbObj } from '../../ColorPicker.utils';

const AlphaSlider = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();
  const rgbObj = hsbObjToRgbObj(colorValue);
  const { r, g, b, a = 1 } = rgbObj;
  const rgbCss = `rgb(${r},${g},${b})`;
  const rgbaCss = `rgba(${r},${g},${b},${a})`;

  const handleAlphaChange = (
    event: React.SyntheticEvent | Event,
    newAlpha: SliderValueType
  ) => {
    changeColorValue(event, { ...colorValue, a: (newAlpha as number) / 100 });
  };

  return (
    <Mosaic className="JinniColorBoxAlphaSlider">
      <Slider
        value={colorValue.a ? colorValue.a * 100 : 100}
        onChange={handleAlphaChange}
        min={0}
        max={100}
        TooltipProps={{ open: false }}
        style={{ '--rgb': rgbCss, '--rgba': rgbaCss }}
      />
    </Mosaic>
  );
};

export default AlphaSlider;
