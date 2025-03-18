import { useEffect } from 'react';
import useJinni from '@/hooks/useJinni';
import { ELEVATION_LEVELS } from '@/constants/elevation';
import { ElevationLevelType } from '@/types/elevation';
import { isNumber } from '@/utils/isNumber';

export const useElevationEffect = ({
  buttonBaseElRef,
  elevation,
  disabled
}: {
  buttonBaseElRef: React.RefObject<HTMLElement>;
  elevation?: ElevationLevelType;
  disabled?: boolean;
}) => {
  const jinniContext = useJinni();

  useEffect(() => {
    const elevationMaxValue = Math.max(...ELEVATION_LEVELS);
    const hasElevation = elevation !== undefined && isNumber(elevation);
    const buttonBaseEl = buttonBaseElRef.current;
    if (!hasElevation || !buttonBaseEl || disabled) return;

    const lift = () => {
      const highElevationLevel = Math.min(
        elevation + 2,
        elevationMaxValue
      ) as ElevationLevelType;
      buttonBaseEl.style.boxShadow = jinniContext.boxShadow[highElevationLevel];
    };

    const liftHigh = () => {
      const highElevationLevel = Math.min(
        elevation + 5,
        elevationMaxValue
      ) as ElevationLevelType;
      buttonBaseEl.style.boxShadow = jinniContext.boxShadow[highElevationLevel];
    };

    const drop = () => {
      buttonBaseEl.style.boxShadow = jinniContext.boxShadow[elevation];
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
  }, [buttonBaseElRef, elevation, jinniContext.boxShadow, disabled]);
};
