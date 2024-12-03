import { ColorType } from '@/types/color';
import { editColor } from '@/utils/color';
import { isNumber } from '@/utils/isNumber';
import { LineCapType } from './CircularProgress';

interface ProgressProps {
  percent?: number;
  thickness: number;
  progressColor: ColorType;
  lineCap: LineCapType;
  speed: number;
}

const CIRCLE_SIZE = 44;

const Progress = (props: ProgressProps) => {
  const { percent, thickness, progressColor, lineCap, speed } = props;
  const radius = (CIRCLE_SIZE - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let circleStyle = {};
  let svgStyle = {};
  if (isNumber(percent)) {
    const progress = circumference * (percent / 100);
    circleStyle = {
      ...circleStyle,
      strokeDasharray: `${circumference}`,
      strokeDashoffset: `${circumference - progress}px`,
      transition: 'stroke-dashoffset 0.5s ease-in-out'
    };
  }
  if (speed) {
    circleStyle = {
      ...circleStyle,
      animationDuration: `${speed}s`
    };
    svgStyle = {
      ...svgStyle,
      animationDuration: `${speed}s`
    };
  }

  return (
    <svg className="progress" viewBox="22 22 44 44" style={svgStyle}>
      <circle
        cx={CIRCLE_SIZE}
        cy={CIRCLE_SIZE}
        r={radius}
        fill="none"
        stroke={editColor(progressColor)}
        strokeWidth={thickness}
        strokeLinecap={lineCap}
        style={circleStyle}
      />
    </svg>
  );
};

export default Progress;
