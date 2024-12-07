import './LinearProgress.scss';
import cn from 'classnames';
import useStyle from '@/hooks/useStyle';
import { DefaultComponentProps } from '@/types/default-component-props';
import { ColorType } from '@/types/color';
import { isNumber } from '@/utils/isNumber';
import { lighten } from '@/utils/colorLuminance';
import { editColor } from '@/utils/color';
import { getComputedThickness } from './LinearProgress.utils';
import Progress from './Progress';
import Label from './Label';

export type ThicknessKeyword = 'sm' | 'md' | 'lg';
export type ThicknessType = ThicknessKeyword | number;
export type LineCapType = 'butt' | 'round';

export interface LinearProgressProps
  extends DefaultComponentProps<HTMLDivElement> {
  percent?: number;
  thickness?: ThicknessType;
  progressColor?: ColorType;
  trailColor?: ColorType;
  lineCap?: LineCapType;
  speed?: number;
  showLabel?: boolean;
  labelFormat?: (percent: number) => string;
}

const LinearProgress = (props: LinearProgressProps) => {
  const {
    percent,
    thickness = 'md',
    progressColor = 'primary',
    trailColor = lighten(progressColor, 0.7),
    lineCap = 'round',
    speed = 2,
    showLabel = false,
    labelFormat = (percent) => `${percent}%`,
    className,
    style,
    ...rest
  } = props;
  const computedThickness = getComputedThickness(thickness);
  const thicknessStyle = { height: `${computedThickness}px` };
  const fontSizeStyle = { fontSize: `${12 + computedThickness * 0.25}px` };
  const newStyle = useStyle({ ...thicknessStyle, ...fontSizeStyle, ...style });
  const isDeterminate = isNumber(percent);

  return (
    <div
      className={cn(
        'JinniLinearProgress',
        isDeterminate ? 'determinate' : 'indeterminate',
        lineCap,
        className
      )}
      style={newStyle}
      {...rest}
    >
      <div className="trail" style={{ backgroundColor: editColor(trailColor) }}>
        <Progress
          percent={percent}
          progressColor={progressColor}
          speed={speed}
        />
      </div>
      {isDeterminate && showLabel && <Label value={labelFormat(percent)} />}
    </div>
  );
};

export default LinearProgress;
