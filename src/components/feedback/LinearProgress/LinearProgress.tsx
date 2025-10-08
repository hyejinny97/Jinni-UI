import './LinearProgress.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { ColorType } from '@/types/color';
import { isNumber } from '@/utils/isNumber';
import useColor from '@/hooks/useColor';

export type LinearProgressProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    value?: number;
    thickness?: number;
    progressColor?: ColorType;
    trackColor?: ColorType;
    lineCap?: 'butt' | 'round';
    speed?: number;
    orientation?: 'horizontal' | 'vertical';
  };

const LinearProgress = <T extends AsType = 'div'>(
  props: LinearProgressProps<T>
) => {
  const {
    value,
    thickness = 4,
    progressColor = 'primary',
    trackColor = 'gray-200',
    lineCap = 'butt',
    speed = 1.5,
    orientation = 'horizontal',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;

  if (value && !(0 <= value && value <= 100)) {
    throw new Error('LinearProgress value prop은 0~100 사이 숫자여야 합니다.');
  }

  const isDeterminate = isNumber(value);
  const [normalizedProgressColor, normalizedTrackColor] = useColor([
    progressColor,
    trackColor
  ]);
  const newStyle = useStyle({
    '--thickness': `${thickness}px`,
    '--progress-color': normalizedProgressColor,
    '--track-color': normalizedTrackColor,
    '--value': `${value}%`,
    '--speed': `${speed}s`,
    ...style
  });

  return (
    <Component
      className={cn('JinniLinearProgress', orientation, lineCap, className)}
      style={newStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-busy={!isDeterminate}
      {...rest}
    >
      <div className="JinniLinearProgress-track" />
      <div
        className={cn(
          'JinniLinearProgress-progress',
          isDeterminate ? 'determinate' : 'indeterminate',
          orientation
        )}
      />
    </Component>
  );
};

export default LinearProgress;
