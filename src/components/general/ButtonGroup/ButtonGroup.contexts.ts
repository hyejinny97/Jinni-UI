import { createContext } from 'react';
import { SomeButtonProps } from './ButtonGroup';

const ButtonGroupContext = createContext<SomeButtonProps | null>(null);

export default ButtonGroupContext;
