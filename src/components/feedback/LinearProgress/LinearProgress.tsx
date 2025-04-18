import './LinearProgress.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { ColorType } from '@/types/color';
import { isNumber } from '@/utils/isNumber';
import { lighten } from '@/utils/colorLuminance';
import { getComputedThickness } from './LinearProgress.utils';
import Label from './Label';

export type ThicknessKeyword = 'sm' | 'md' | 'lg';
export type ThicknessType = ThicknessKeyword | number;
export type LineCapType = 'butt' | 'round';

export type LinearProgressProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    percent?: number;
    thickness?: ThicknessType;
    progressColor?: ColorType;
    trailColor?: ColorType;
    lineCap?: LineCapType;
    speed?: number;
    showLabel?: boolean;
    labelFormat?: (percent: number) => string;
    orientation?: 'horizontal' | 'vertical';
  };

const LinearProgress = <T extends AsType = 'div'>(
  props: LinearProgressProps<T>
) => {
  const {
    percent,
    thickness = 'md',
    progressColor = 'primary',
    trailColor = lighten(progressColor, 0.7),
    lineCap = 'round',
    speed = 2,
    showLabel = false,
    labelFormat = (percent) => `${percent}%`,
    orientation = 'horizontal',
    className,
    style,
    as: Component = 'div',
    ...rest
  } = props;
  const isDeterminate = isNumber(percent);
  const computedThickness = getComputedThickness(thickness);
  const newStyle = useStyle({
    '--thickness': `${computedThickness}px`,
    '--font-size': `${12 + computedThickness * 0.25}px`,
    '--trail-color': trailColor,
    '--progress-color': progressColor,
    '--percent': isNumber(percent) ? `${percent}%` : '50%',
    '--speed': `${speed}s`,
    ...style
  });

  return (
    <Component
      className={cn(
        'JinniLinearProgress',
        isDeterminate ? 'determinate' : 'indeterminate',
        lineCap,
        orientation,
        className
      )}
      style={newStyle}
      {...rest}
    >
      <div className="trail">
        <div className="progress" />
      </div>
      {isDeterminate && showLabel && <Label value={labelFormat(percent)} />}
    </Component>
  );
};

export default LinearProgress;
