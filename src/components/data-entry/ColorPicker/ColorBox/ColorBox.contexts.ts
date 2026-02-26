import { createContext } from 'react';
import { HSBObject } from '../ColorPicker.types';
import { FORMAT } from './ColorBox.constants';

type ColorBoxContextProps = {
  colorValue: HSBObject;
  format: (typeof FORMAT)[number];
  changeColorValue: (
    event: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => void;
  changeFormat: (newFormat: (typeof FORMAT)[number]) => void;
};

const ColorBoxContext = createContext<ColorBoxContextProps | null>(null);

export default ColorBoxContext;
