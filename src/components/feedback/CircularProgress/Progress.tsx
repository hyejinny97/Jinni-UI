import cn from 'classnames';
import { useMemo } from 'react';
import { isNumber } from '@/utils/isNumber';
import { CircularProgressProps, VIEW_BOX_SIZE } from './CircularProgress';
import useColor from '@/hooks/useColor';

type ProgressProps = Pick<CircularProgressProps, 'value'> &
  Required<
    Pick<
      CircularProgressProps,
      'thickness' | 'progressColor' | 'lineCap' | 'disableShrink'
    >
  >;

const Progress = (props: ProgressProps) => {
  const { value, thickness, progressColor, lineCap, disableShrink } = props;
  const normalizedProgressColor = useColor(progressColor);
  const isDeterminate = isNumber(value);
  const radius = (VIEW_BOX_SIZE - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const style = useMemo<{ [key: string]: string } | undefined>(() => {
    if (isDeterminate) {
      const progress = circumference * (value / 100);
      return {
        '--stroke-dasharray': `${circumference}px`,
        '--stroke-dashoffset': `${circumference - progress}px`
      };
    }
  }, [isDeterminate, value, circumference]);

  return (
    <svg
      className={cn(
        'JinniCircularProgress-progress',
        isDeterminate ? 'determinate' : 'indeterminate'
      )}
      viewBox={`22 22 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
      style={style}
    >
      <circle
        className={cn({ disableShrink })}
        cx={22 + VIEW_BOX_SIZE / 2}
        cy={22 + VIEW_BOX_SIZE / 2}
        r={radius}
        fill="none"
        stroke={normalizedProgressColor}
        strokeWidth={thickness}
        strokeLinecap={lineCap}
      />
    </svg>
  );
};

export default Progress;
