import useColor from '@/hooks/useColor';
import { CircularProgressProps, VIEW_BOX_SIZE } from './CircularProgress';

type TrackProps = Required<
  Pick<CircularProgressProps, 'thickness' | 'trackColor'>
>;

const Track = ({ thickness, trackColor }: TrackProps) => {
  const normalizedTrackColor = useColor(trackColor);

  return (
    <svg
      className="JinniCircularProgress-track"
      viewBox={`22 22 ${VIEW_BOX_SIZE} ${VIEW_BOX_SIZE}`}
    >
      <circle
        cx={22 + VIEW_BOX_SIZE / 2}
        cy={22 + VIEW_BOX_SIZE / 2}
        r={(VIEW_BOX_SIZE - thickness) / 2}
        fill="none"
        stroke={normalizedTrackColor}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export default Track;
