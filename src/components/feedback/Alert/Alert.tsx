import './Alert.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { getDefaultIconBySeverity } from './Alert.utills';

export type SeverityType = 'success' | 'info' | 'warning' | 'error';

type AlertProps<T extends AsType = 'div'> = DefaultComponentProps<T> & {
  children: React.ReactNode;
  severity?: SeverityType;
  variant?: 'subtle-filled' | 'filled' | 'outlined';
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
  title?: React.ReactNode;
};

const Alert = <T extends AsType = 'div'>(props: AlertProps<T>) => {
  const {
    children,
    severity = 'success',
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
  const isDefaultIcon = !icon && hasIcon;
  const computedIcon = isDefaultIcon
    ? getDefaultIconBySeverity({ severity })
    : icon;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniAlert', severity, variant, className)}
      style={newStyle}
      {...rest}
    >
      {hasIcon && (
        <div className={cn('JinniAlertIcon', { isDefaultIcon })}>
          {computedIcon}
        </div>
      )}
      <div className="JinniAlertMessage">
        {hasTitle && <div className="JinniAlertMessageTitle">{title}</div>}
        {children}
      </div>
      <div className="JinniAlertAction">{action}</div>
    </Component>
  );
};

export default Alert;
