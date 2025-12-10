import { createContext } from 'react';
import { ValueType, TabListOrientation } from './Tabs.types';
import { ButtonProps } from '@/components/general/Button';

type TabsContextProps = {
  tabsId: string;
  selectedValue: ValueType | null;
  handleChange: (event: React.SyntheticEvent, value: ValueType) => void;
  tabListOrientation: TabListOrientation;
  tabSize: NonNullable<ButtonProps['size']>;
  slidePrevTab: () => void;
  slideNextTab: () => void;
  noPrevTab: boolean;
  noNextTab: boolean;
};

const TabsContext = createContext<TabsContextProps | null>(null);

export default TabsContext;
