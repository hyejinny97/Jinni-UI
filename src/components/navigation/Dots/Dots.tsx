import './Dots.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { DotProps, DotValueType } from './Dot';
import { useSelectedValue, useMaxDots } from './Dots.hooks';
import DotsContext from './Dots.contexts';

export type SomeDotProps = Pick<
  DotProps,
  | 'size'
  | 'color'
  | 'overlayColor'
  | 'disableOverlay'
  | 'rippleColor'
  | 'disableRipple'
  | 'rippleStartLocation'
  | 'elevation'
  | 'disabled'
>;

export type DotsProps<T extends AsType = 'ol'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  SomeDotProps & {
    defaultValue?: DotValueType | null;
    value?: DotValueType;
    onChange?: (
      event: Event | React.SyntheticEvent,
      value: DotValueType
    ) => void;
    max?: number;
    orientation?: 'horizontal' | 'vertical';
  };

const Dots = <T extends AsType = 'ol'>(props: DotsProps<T>) => {
  const {
    children,
    defaultValue = null,
    value,
    onChange,
    max,
    orientation = 'horizontal',
    size = 'md',
    color,
    overlayColor,
    disableOverlay,
    rippleColor,
    rippleStartLocation,
    disableRipple,
    elevation,
    disabled,
    className,
    style,
    as: Component = 'ol',
    ...rest
  } = props;
  const { selectedValue, handleChange } = useSelectedValue({
    defaultValue,
    value,
    onChange
  });
  const { dotsContainerElRef, dotsElRef } = useMaxDots({
    max,
    orientation,
    selectedValue
  });
  const newStyle = useStyle(style);

  return (
    <DotsContext.Provider
      value={{
        selectedValue,
        handleChange,
        size,
        color,
        overlayColor,
        disableOverlay,
        rippleColor,
        rippleStartLocation,
        disableRipple,
        elevation,
        disabled
      }}
    >
      <div
        ref={dotsContainerElRef}
        className={cn('JinniDotsContainer', className)}
      >
        <Component
          ref={dotsElRef}
          role="navigation"
          aria-label="dot navigation"
          className={cn('JinniDots', size, orientation)}
          style={newStyle}
          {...rest}
        >
          {children}
        </Component>
      </div>
    </DotsContext.Provider>
  );
};

export default Dots;
