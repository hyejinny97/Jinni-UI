import './CircularProgress.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { ColorType } from '@/types/color';
import { isNumber } from '@/utils/isNumber';
import Progress from './Progress';
import Track from './Track';

export type CircularProgressProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    value?: number;
    thickness?: number;
    progressColor?: ColorType;
    trackColor?: ColorType;
    size?: 'sm' | 'md' | 'lg' | number;
    lineCap?: 'butt' | 'round';
    disableShrink?: boolean;
    speed?: number;
  };

export const VIEW_BOX_SIZE = 44;

const CircularProgress = <T extends AsType = 'div'>(
  props: CircularProgressProps<T>
) => {
  const {
    value,
    thickness = 4,
    progressColor = 'primary',
    trackColor = 'transparent',
    size = 'md',
    lineCap = 'round',
    disableShrink = false,
    speed = 1.5,
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;

  if (value && !(0 <= value && value <= 100)) {
    throw new Error(
      'CircularProgress value prop은 0~100 사이 숫자여야 합니다.'
    );
  }

  const isNumberSize = isNumber(size);
  const newStyle = useStyle({
    ...(isNumberSize && { '--size': `${size}px` }),
    '--speed': `${speed}s`,
    ...style
  });

  return (
    <Component
      className={cn(
        'JinniCircularProgress',
        isNumberSize ? 'isNumberSize' : size,
        className
      )}
      style={newStyle}
      {...rest}
    >
      <Track thickness={thickness} trackColor={trackColor} />
      <Progress
        value={value}
        thickness={thickness}
        progressColor={progressColor}
        lineCap={lineCap}
        disableShrink={disableShrink}
      />
    </Component>
  );
};

export default CircularProgress;
