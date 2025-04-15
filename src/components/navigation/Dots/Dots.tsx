import './Dots.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import Dot, { DotProps } from './Dot';
import { useSelectedValue } from './Dots.hooks';

type SomeDotProps = Pick<
  DotProps,
  | 'size'
  | 'color'
  | 'disabled'
  | 'overlayColor'
  | 'disableOverlay'
  | 'elevation'
  | 'rippleColor'
  | 'disableRipple'
  | 'rippleStartLocation'
>;

export type DotsProps<T extends AsType = 'span'> = Omit<
  DefaultComponentProps<T>,
  'defaultValue' | 'onChange'
> &
  SomeDotProps & {
    count?: number;
    defaultValue?: number;
    value?: number;
    onChange?: (event: Event | React.SyntheticEvent, value: number) => void;
    renderDot?: (dotProps: DotProps) => React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
  };

const Dots = <T extends AsType = 'span'>(props: DotsProps<T>) => {
  const {
    count = 5,
    defaultValue = 0,
    value,
    onChange,
    renderDot = (dotProps: DotProps, key: number) => (
      <Dot key={key} {...dotProps} />
    ),
    size = 'md',
    orientation = 'horizontal',
    className,
    style,
    as: Component = 'span',
    ...rest
  } = props;
  const { selectedValue, handleChange } = useSelectedValue({
    defaultValue,
    value,
    onChange
  });
  const newStyle = useStyle(style);

  return (
    <Component
      className={cn('JinniDots', size, orientation, className)}
      style={newStyle}
      {...rest}
    >
      {Array(count)
        .fill(0)
        .map((_, idx) =>
          renderDot(
            {
              value: idx,
              selected: idx === selectedValue,
              onClick: (event: Event | React.SyntheticEvent) =>
                handleChange(event, idx),
              size,
              ...rest
            },
            idx
          )
        )}
    </Component>
  );
};

export default Dots;
