import { createContext } from 'react';
import { TabListProps } from './TabList';

type TabListContextProps = Pick<
  TabListProps,
  | 'disabled'
  | 'overlayColor'
  | 'disableOverlay'
  | 'rippleColor'
  | 'rippleStartLocation'
  | 'disableRipple'
  | 'color'
  | 'fullWidth'
> &
  Required<Pick<TabListProps, 'variant'>>;

const TabListContext = createContext<TabListContextProps | null>(null);

export default TabListContext;
