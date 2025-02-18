import './FormControlLabel.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { insertProps } from './FormControlLabel.utils';

export type FormControlLabelProps<P, T extends AsType = 'label'> = Omit<
  DefaultComponentProps<T>,
  'children'
> & {
  children: React.ReactElement<P>;
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
};

const FormControlLabel = <P, T extends AsType = 'label'>(
  props: FormControlLabelProps<P, T>
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
      className={cn('JinniFormControlLabel', labelPlacement, className)}
      style={newStyle}
      {...rest}
    >
      {insertProps(children, { required, disabled })}
      <span className={cn('JinniFormControlLabelContent', { disabled })}>
        {label}
        {required && (
          <span className="JinniFormControlLabelContentAsterisk">*</span>
        )}
      </span>
    </Component>
  );
};

export default FormControlLabel;
