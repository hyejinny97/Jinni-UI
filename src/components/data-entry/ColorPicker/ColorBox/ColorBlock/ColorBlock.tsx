import './ColorBlock.scss';
import { Mosaic } from '@/components/_share/Mosaic';
import { useColorBoxContext } from '../ColorBox.hooks';
import { hsbObjToRgbObj, rgbObjToRgbCss } from '../../ColorPicker.utils';

const ColorBlock = () => {
  const { colorValue } = useColorBoxContext();
  const rgbObj = hsbObjToRgbObj(colorValue);
  const rgbCss = rgbObjToRgbCss(rgbObj);

  return (
    <Mosaic className="JinniColorBoxColorBlock">
      <div style={{ backgroundColor: rgbCss }} />
    </Mosaic>
  );
};

export default ColorBlock;
