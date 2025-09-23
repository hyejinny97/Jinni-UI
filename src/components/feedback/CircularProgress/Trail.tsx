import { ColorType } from '@/types/color';
import useColor from '@/hooks/useColor';

interface TrailProps {
  thickness: number;
  trailColor: ColorType;
}

const Trail = ({ thickness, trailColor }: TrailProps) => {
  const normalizedTrailColor = useColor(trailColor);

  return (
    <svg className="trail" viewBox="22 22 44 44">
      <circle
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        stroke={normalizedTrailColor}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export default Trail;
