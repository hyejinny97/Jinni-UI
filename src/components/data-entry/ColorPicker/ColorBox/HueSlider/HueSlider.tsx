import './HueSlider.scss';
import { Mosaic } from '@/components/_share/Mosaic';
import { Slider, SliderValueType } from '@/components/data-entry/Slider';
import { useColorBoxContext } from '../ColorBox.hooks';

const HueSlider = () => {
  const { colorValue, changeColorValue } = useColorBoxContext();

  const handleHueChange = (
    event: React.SyntheticEvent | Event,
    newHue: SliderValueType
  ) => {
    changeColorValue(event, { ...colorValue, h: newHue as number });
  };

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
};

export default HueSlider;
