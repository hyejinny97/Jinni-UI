import './DragContext.scss';
import { useRef } from 'react';
import useDrag, { DragProps } from '@/hooks/useDrag';
import { DragContext, DestinationType } from './Drag.contexts';

const DragProvider = (
  props: Omit<DragProps, 'onMoveEnd'> & { children?: React.ReactNode }
) => {
  const { children, ...dragProps } = props;
  const destinationRef = useRef<DestinationType>({ signedDestination: null });
  const { targetElRef, triggerElRef, containerElRef, moveToDestination } =
    useDrag({
      ...dragProps,
      onMoveEnd: () => {
        const { signedDestination, speed, acceleration, onDestinationArrived } =
          destinationRef.current;
        if (signedDestination !== null)
          moveToDestination({
            signedDestination,
            speed,
            acceleration,
            onComplete: onDestinationArrived
          });
      }
    });

  const changeDestination = (props: DestinationType) => {
    destinationRef.current = props;
  };

  return (
    <DragContext.Provider
      value={{
        targetElRef,
        triggerElRef,
        containerElRef,
        changeDestination
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export default DragProvider;
