import './TourStep.scss';
import { useMemo } from 'react';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Mask, MaskOptionalProps } from '../Mask';
import { Box, BoxProps } from '@/components/layout/Box';
import { Popper } from '@/components/_share/Popper';
import { PlacementType } from '@/types/popper';
import {
  placementToAnchorOrigin,
  placementToPopperOrigin
} from '@/utils/popper';
import { useTour } from '../Tour.hooks';
import { useScrollToAnchor } from './TourStep.hooks';

export type TourStepOptionalProps = {
  placement?: PlacementType;
  offset?: number;
  BoxProps?: BoxProps;
};

export type TourStepProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  MaskOptionalProps &
  TourStepOptionalProps & {
    children: React.ReactNode;
    anchorElRef: React.RefObject<HTMLElement>;
    value: number | string;
  };

const TourStep = <T extends AsType = 'div'>(props: TourStepProps<T>) => {
  const { tourValue, onClose, ...restTourProps } = useTour();
  const {
    children,
    anchorElRef,
    value,
    placement = 'bottom-start',
    offset = 10,
    BoxProps,
    spotlightPadding = 5,
    spotlightShape,
    maskColor,
    className,
    style,
    ...rest
  } = { ...restTourProps, ...props };
  const show = tourValue === value;
  const anchorOrigin = useMemo(
    () => placementToAnchorOrigin(placement),
    [placement]
  );
  const popperOrigin = useMemo(
    () => placementToPopperOrigin(placement),
    [placement]
  );
  const { tourStepElRef } = useScrollToAnchor({ anchorElRef, show });

  const handleMaskClick = (event: React.MouseEvent) => {
    onClose?.(event, 'backdropClick');
  };

  return (
    <>
      {show && (
        <>
          <Mask
            spotlightElRef={anchorElRef}
            onClick={handleMaskClick}
            spotlightPadding={spotlightPadding}
            spotlightShape={spotlightShape}
            maskColor={maskColor}
          />
          <Popper
            ref={tourStepElRef}
            className={cn('JinniTourStep', className)}
            anchorReference="anchorEl"
            anchorElRef={anchorElRef}
            anchorOrigin={anchorOrigin}
            popperOrigin={popperOrigin}
            style={{
              '--spotlightPadding': `${spotlightPadding}px`,
              '--offset': `${offset}px`,
              ...style
            }}
            {...rest}
          >
            <Box
              className={cn('JinniTourStepContent', placement)}
              elevation={5}
              round={4}
              {...BoxProps}
            >
              {children}
            </Box>
          </Popper>
        </>
      )}
    </>
  );
};

export default TourStep;
