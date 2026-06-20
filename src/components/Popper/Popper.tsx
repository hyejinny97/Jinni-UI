import './Popper.scss';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { OriginType, PositionType } from './Popper.types';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { usePopperPosition } from './Popper.hooks';
import useStyle from '@/hooks/useStyle';
import { mergeRefs } from '@/utils/mergeRefs';

type AnchorElProps = {
  anchorReference?: 'anchorEl';
  anchorElRef: React.RefObject<HTMLElement | null>;
  anchorOrigin?: OriginType;
  anchorPosition?: never;
};

type AnchorPositionProps = {
  anchorReference: 'anchorPosition';
  anchorPosition: PositionType;
  anchorElRef?: never;
  anchorOrigin?: never;
};

export type PopperProps<T extends AsType = 'div'> = DefaultComponentProps<T> &
  (AnchorElProps | AnchorPositionProps) & {
    popperOrigin?: OriginType;
    positionType?: 'absolute' | 'fixed';
    container?: HTMLElement;
  };

const DEFAULT_POPPER_ORIGIN: OriginType = {
  horizontal: 'left',
  vertical: 'top'
};
const DEFAULT_ANCHOR_ORIGIN: OriginType = {
  horizontal: 'left',
  vertical: 'bottom'
};

const Popper = <T extends AsType = 'div'>({
  ref,
  ...props
}: PopperProps<T>) => {
  const {
    children,
    anchorReference = 'anchorEl',
    anchorElRef,
    anchorOrigin = DEFAULT_ANCHOR_ORIGIN,
    anchorPosition,
    popperOrigin = DEFAULT_POPPER_ORIGIN,
    positionType = 'absolute',
    container = document.body,
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'div') as React.ElementType;
  const { popperRef } = usePopperPosition({
    anchorReference,
    anchorElRef,
    anchorOrigin,
    anchorPosition,
    popperOrigin,
    positionType
  });
  const newStyle = useStyle({ '--position': positionType, ...style });

  return (
    <>
      {createPortal(
        <Component
          role="tooltip"
          ref={mergeRefs(ref as React.Ref<HTMLElement>, popperRef)}
          className={cn('JinniPopper', className)}
          style={newStyle}
          {...rest}
        >
          {children}
        </Component>,
        container
      )}
    </>
  );
};

export default Popper;
