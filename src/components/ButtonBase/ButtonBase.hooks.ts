import { useEffect, useRef } from 'react';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { ElevationLevelType } from '@/types/elevation';
import { isNumber } from '@/utils/isNumber';

export const useElevationEffect = ({
  elevation,
  disabled
}: {
  elevation?: ElevationLevelType;
  disabled?: boolean;
}) => {
  const buttonBaseElRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const elevationMaxValue = Math.max(...ELEVATION_LEVELS);
    const hasElevation = elevation !== undefined && isNumber(elevation);
    const buttonBaseEl = buttonBaseElRef.current;
    if (!hasElevation || !buttonBaseEl || disabled) return;

    const applyElevation = (elevationLevel: ElevationLevelType) => {
      const elevationClass = Array.from(buttonBaseEl.classList).find(
        (className) => className.startsWith('elevation-')
      );
      if (elevationClass) buttonBaseEl.classList.remove(elevationClass);
      buttonBaseEl.classList.add(`elevation-${elevationLevel}`);
    };

    const lift = () => {
      const highElevationLevel = Math.min(
        elevation + 2,
        elevationMaxValue
      ) as ElevationLevelType;
      applyElevation(highElevationLevel);
    };

    const liftHigh = () => {
      const highElevationLevel = Math.min(
        elevation + 5,
        elevationMaxValue
      ) as ElevationLevelType;
      applyElevation(highElevationLevel);
    };

    const drop = () => {
      applyElevation(elevation);
    };

    const handleKeyDown = (e: KeyboardEvent) =>
      (e.code === 'Enter' || e.code === 'Space') && liftHigh();

    buttonBaseEl.addEventListener('mouseover', lift);
    buttonBaseEl.addEventListener('mouseout', drop);
    buttonBaseEl.addEventListener('mousedown', liftHigh);
    buttonBaseEl.addEventListener('mouseup', lift);
    buttonBaseEl.addEventListener('focus', lift);
    buttonBaseEl.addEventListener('blur', drop);
    buttonBaseEl.addEventListener('keydown', handleKeyDown);
    buttonBaseEl.addEventListener('keyup', lift);

    return () => {
      buttonBaseEl.removeEventListener('mouseover', lift);
      buttonBaseEl.removeEventListener('mouseout', drop);
      buttonBaseEl.removeEventListener('mousedown', liftHigh);
      buttonBaseEl.removeEventListener('mouseup', lift);
      buttonBaseEl.removeEventListener('focus', lift);
      buttonBaseEl.removeEventListener('blur', drop);
      buttonBaseEl.removeEventListener('keydown', handleKeyDown);
      buttonBaseEl.removeEventListener('keyup', lift);
    };
  }, [elevation, disabled]);

  return { buttonBaseElRef };
};
