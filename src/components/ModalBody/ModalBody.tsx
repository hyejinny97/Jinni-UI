'use client';

import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useModalContext } from '../Modal';

export type ModalBodyProps<T extends AsType = 'div'> = DefaultComponentProps<T>;

const ModalBody = <T extends AsType = 'div'>(props: ModalBodyProps<T>) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const { modalBodyId } = useModalContext();
  const newStyle = useStyle(style);

  return (
    <Component
      id={modalBodyId}
      className={cn('JinniModalBody', className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default ModalBody;
