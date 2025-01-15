import './ToastContent.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';

export type ToastContentProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    message: React.ReactNode;
    action?: React.ReactNode;
  };

const ToastContent = <T extends AsType = 'div'>(
  props: ToastContentProps<T>
) => {
  const {
    message,
    action,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniToastContent', className)}
      style={newStyle}
      {...rest}
    >
      <div className="JinniToastContentMessage">{message}</div>
      <div className="JinniToastContentAction">{action}</div>
    </Component>
  );
};

export default ToastContent;
