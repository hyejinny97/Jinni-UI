import './Alert.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { getDefaultIconByStatus } from './Alert.utils';

export type AlertProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  status?: 'success' | 'info' | 'warning' | 'error';
  variant?: 'subtle-filled' | 'filled' | 'outlined';
  icon?: React.ReactNode | false;
};

const Alert = <T extends AsType = 'div'>(props: AlertProps<T>) => {
  const {
    children,
    status = 'success',
    variant = 'subtle-filled',
    icon,
    action,
    title,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const hasTitle = !!title;
  const hasIcon = icon !== false;
  const statusIcon =
    icon === undefined ? getDefaultIconByStatus({ status }) : icon;
  const newStyle = useStyle(style);

  return (
    <Component
      role="alert"
      className={cn('JinniAlert', { hasTitle }, status, variant, className)}
      style={newStyle}
      {...rest}
    >
      {hasIcon && <div className={cn('JinniAlertIcon')}>{statusIcon}</div>}
      <div className="JinniAlertMessage">
        {hasTitle && <div className="JinniAlertMessageTitle">{title}</div>}
        {children}
      </div>
      <div className="JinniAlertAction">{action}</div>
    </Component>
  );
};

export default Alert;
