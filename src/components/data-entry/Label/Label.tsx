import './Label.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import LabelContext from './Label.contexts';

export type LabelProps<T extends AsType = 'label'> = Omit<
  DefaultComponentProps<T>,
  'children' | 'content'
> & {
  content: React.ReactNode;
  children?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | string;
};

const Label = <T extends AsType = 'label'>(props: LabelProps<T>) => {
  const {
    children,
    content,
    required,
    disabled,
    labelPlacement = 'end',
    size = 'md',
    className,
    style,
    as: Component = 'label',
    ...rest
  } = props;
  const isKeywordSize = ['sm', 'md', 'lg'].includes(size);
  const newStyle = useStyle({
    ...(!isKeywordSize && { '--size': size }),
    ...style
  });

  return (
    <LabelContext.Provider value={{ required, disabled, size }}>
      <Component
        className={cn('JinniLabel', labelPlacement, className)}
        style={newStyle}
        {...rest}
      >
        {children}
        <span
          className={cn('JinniLabelContent', {
            [size]: isKeywordSize,
            disabled
          })}
        >
          {content}
          {required && (
            <span className="JinniLabelContentAsterisk">&nbsp;*</span>
          )}
        </span>
      </Component>
    </LabelContext.Provider>
  );
};

export default Label;
