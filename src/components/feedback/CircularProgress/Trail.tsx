import { ColorType } from '@/types/color';
import { editColor } from '@/utils/color';

interface TrailProps {
  thickness: number;
  trailColor: ColorType;
}

const Trail = ({ thickness, trailColor }: TrailProps) => (
  <svg className="trail" viewBox="22 22 44 44">
    <circle
      cx="44"
      cy="44"
      r="20.2"
      fill="none"
      stroke={editColor(trailColor)}
      strokeWidth={thickness}
    />
  </svg>
);

export default Trail;
