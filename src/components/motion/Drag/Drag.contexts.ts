import { createContext } from 'react';

export type DestinationType = {
  signedDestination: number | null;
  speed?: number;
  acceleration?: number;
  onDestinationArrived?: () => void;
};

type DragContextProps = {
  targetElRef: React.MutableRefObject<HTMLElement | null>;
  containerElRef: React.MutableRefObject<HTMLElement | null>;
  triggerElRef: React.MutableRefObject<HTMLElement | null>;
  changeDestination: (props: DestinationType) => void;
};

export const DragContext = createContext<DragContextProps | null>(null);
