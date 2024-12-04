import { ColorType } from '@/types/color';
import { editColor } from '@/utils/color';
import { isNumber } from '@/utils/isNumber';

interface ProgressProps {
  percent?: number;
  progressColor: ColorType;
  speed: number;
}

const Progress = ({ percent, progressColor, speed }: ProgressProps) => {
  const width = isNumber(percent) ? `${percent}%` : '50%';

  return (
    <div
      className="progress"
      style={{
        width,
        background: editColor(progressColor),
        animationDuration: `${speed}s`
      }}
    />
  );
};

export default Progress;
