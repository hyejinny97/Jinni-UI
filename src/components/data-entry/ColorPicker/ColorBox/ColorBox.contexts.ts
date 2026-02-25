import { createContext } from 'react';
import { HSBObject } from '../ColorPicker.types';

type ColorBoxContextProps = {
  colorValue: HSBObject;
  changeColorValue: (
    event: Event | React.SyntheticEvent,
    newValue: HSBObject
  ) => void;
};

const ColorBoxContext = createContext<ColorBoxContextProps | null>(null);

export default ColorBoxContext;
