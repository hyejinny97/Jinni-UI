'use client';

import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useModalContext } from '../Modal';

export type ModalHeaderProps<T extends AsType = 'div'> =
  DefaultComponentProps<T>;

const ModalHeader = <T extends AsType = 'div'>(props: ModalHeaderProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { modalHeaderId } = useModalContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={modalHeaderId}
      className={cn('JinniModalHeader', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ModalHeader;
