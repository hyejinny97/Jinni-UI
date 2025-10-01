import './Divider.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';
import { validatePositiveInteger } from '@/utils/isNumber';

export type DividerProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children?: React.ReactNode;
    variant?: 'solid' | 'dotted' | 'dashed';
    orientation?: 'horizontal' | 'vertical';
    contentAlign?: 'start' | 'center' | 'end';
    thickness?: number;
    color?: ColorType;
  };

const Divider = <T extends AsType = 'div'>(props: DividerProps<T>) => {
  const {
    children,
    variant = 'solid',
    orientation = 'horizontal',
    contentAlign = 'center',
    thickness = 1,
    color = 'outline-variant',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const normalizedColor = useColor(color);
  const newStyle = useStyle({
    '--border-style': variant,
    '--color': normalizedColor,
    '--thickness': `${validatePositiveInteger({ value: thickness })}px`,
    ...style
  });

  return (
    <Component
      className={cn(
        'JinniDivider',
        { hasContent: !!children },
        orientation,
        contentAlign,
        className
      )}
      style={newStyle}
      role="separator"
      aria-orientation={orientation}
      {...rest}
    >
      {children && <span className="JinniDividerContent">{children}</span>}
    </Component>
  );
};

export default Divider;
