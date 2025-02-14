import './CheckboxLabel.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { CheckboxProps } from '@/components/data-entry/Checkbox';
import { insertProps } from './CheckboxLabel.utils';

export type CheckboxLabelProps<T extends AsType = 'label'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactElement<CheckboxProps>;
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
};

const CheckboxLabel = <T extends AsType = 'label'>(
  props: CheckboxLabelProps<T>
) => {
  const {
    children,
    label,
    required,
    disabled,
    labelPlacement = 'end',
    className,
    style,
    as: Component = 'label',
    ...rest
  } = props;
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniCheckboxLabel', labelPlacement, className)}
      style={newStyle}
      {...rest}
    >
      {insertProps(children, { required, disabled })}
      <span className={cn('JinniCheckboxLabelContent', { disabled })}>
        {label}
        {required && (
          <span className="JinniCheckboxLabelContentAsterisk">*</span>
        )}
      </span>
    </Component>
  );
};

export default CheckboxLabel;
