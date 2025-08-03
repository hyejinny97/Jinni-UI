import './TourStep.scss';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Box, BoxProps } from '@/components/layout/Box';
import { useTour } from '../Tour.hooks';
import { usePlacement, useScrollToAnchor } from './TourStep.hooks';
import { Mask } from '../Mask';
import { PlacementType } from '@/types/popper';

export type TourStepProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    anchorEl: HTMLElement;
    value: number | string;
    placement?: PlacementType;
    offset?: number;
    maskHolePadding?: number;
    TourStepContentProps?: BoxProps;
  };

const TourStep = <T extends AsType = 'div'>(props: TourStepProps<T>) => {
  const {
    children,
    anchorEl,
    value,
    placement = 'bottom-start',
    offset = 10,
    maskHolePadding = 5,
    TourStepContentProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const tourStepElRef = useRef<HTMLElement>(null);
  const { tourValue, onClose } = useTour();
  const show = tourValue === value;
  usePlacement({
    tourStepElRef,
    anchorEl,
    placement,
    show
  });
  useScrollToAnchor({ tourStepElRef, anchorEl, show });
  const newStyle = useStyle({
    '--maskHolePadding': `${maskHolePadding}px`,
    '--offset': `${offset}px`,
    ...style
  });

  if (!show) return;
  return (
    <>
      <Mask
        excludeEl={anchorEl}
        maskHolePadding={maskHolePadding}
        onClick={(event) => onClose && onClose(event, 'backdropClick')}
      />
      {createPortal(
        <Component
          ref={tourStepElRef}
          className={cn('JinniTourStep', className)}
          style={newStyle}
          {...rest}
        >
          <Box
            className={cn('JinniTourStepContent', placement)}
            elevation={5}
            round={4}
            {...TourStepContentProps}
          >
            {children}
          </Box>
        </Component>,
        document.body
      )}
    </>
  );
};

export default TourStep;
