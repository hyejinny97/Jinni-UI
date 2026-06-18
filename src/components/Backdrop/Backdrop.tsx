import './Backdrop.scss';
import cn from 'classnames';
import React from 'react';
import { createPortal } from 'react-dom';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useWindowScroll } from './Backdrop.hooks';
import { mergeRefs } from '@/utils/mergeRefs';

type BackdropProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children?: React.ReactNode;
  invisible?: boolean;
  disableScroll?: boolean;
  disablePortal?: boolean;
};

const Backdrop = <T extends AsType = 'div'>({
  ref,
  ...props
}: BackdropProps<T>) => {
  const {
    children,
    onClick,
    invisible,
    disableScroll,
    disablePortal,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const backdropElRef = useWindowScroll({ disableScroll });
  const newStyle = useStyle(style);

  const handleBackdropClick = (e: React.MouseEvent) => {
    const { target, currentTarget } = e;
    if (target !== currentTarget || !onClick) return;
    onClick(e);
  };

  const content = (
    <Component
      ref={mergeRefs(ref as React.Ref<HTMLElement>, backdropElRef)}
      className={cn('JinniBackdrop', { invisible }, className)}
      onClick={handleBackdropClick}
      style={newStyle}
      data-disable-scroll={disableScroll}
      {...rest}
    >
      {children}
    </Component>
  );

  return <>{disablePortal ? content : createPortal(content, document.body)}</>;
};

export default Backdrop;
