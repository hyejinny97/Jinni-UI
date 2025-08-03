import './TourStep.scss';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { Box, BoxProps } from '@/components/layout/Box';
import { OriginType } from '@/types/popper';
import { useTour, useTourStepPosition } from './Tour.hooks';
import Mask from './Mask';

export type TourStepProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    anchorEl: HTMLElement;
    value: number | string;
    anchorOrigin?: OriginType;
    tourStepOrigin?: OriginType;
    maskHolePadding?: number;
    TourStepContentProps?: BoxProps;
  };

const DEFAULT_ANCHOR_ORIGIN: OriginType = {
  horizontal: 'left',
  vertical: 'bottom'
};
const DEFAULT_TOUR_STEP_ORIGIN: OriginType = {
  horizontal: 'left',
  vertical: 'top'
};

const TourStep = <T extends AsType = 'div'>(props: TourStepProps<T>) => {
  const {
    children,
    anchorEl,
    value,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    tourStepOrigin = DEFAULT_TOUR_STEP_ORIGIN,
    maskHolePadding = 5,
    TourStepContentProps,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { tourValue, onClose } = useTour();
  const show = tourValue === value;
  const { tourStepElRef } = useTourStepPosition({
    anchorEl,
    anchorOrigin,
    tourStepOrigin,
    maskHolePadding,
    show
  });
  const newStyle = useStyle({
    transformOrigin: `${tourStepOrigin.vertical} ${tourStepOrigin.horizontal}`,
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
            className="JinniTourStepContent"
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
