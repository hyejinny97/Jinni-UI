import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { useModalContext } from './Modal.hooks';

export type ModalContentPartProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    partName?: 'Header' | 'Body' | 'Footer';
    children: React.ReactNode;
  };

const ModalContentPart = <T extends AsType = 'div'>(
  props: ModalContentPartProps<T>
) => {
  const {
    partName,
    children,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const { modalHeaderId, modalBodyId } = useModalContext();
  const newStyle = useStyle(style);

  let id = undefined;
  switch (partName) {
    case 'Header':
      id = modalHeaderId;
      break;
    case 'Body':
      id = modalBodyId;
  }

  return (
    <Component
      id={id}
      className={cn(`JinniModal${partName}`, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const ModalHeader = (props: ModalContentPartProps) =>
  ModalContentPart({ partName: 'Header', ...props });

export const ModalBody = (props: ModalContentPartProps) =>
  ModalContentPart({ partName: 'Body', ...props });

export const ModalFooter = (props: ModalContentPartProps) =>
  ModalContentPart({ partName: 'Footer', ...props });
