import { VariantType, CircularSpeedDialProps } from './CircularSpeedDial';

export const getDefaultDirection = (variant: VariantType) => {
  switch (variant) {
    case 'semi-circular':
      return 'up';
    case 'quarter-circular':
      return 'up-left';
    case 'circular':
      return;
  }
};

export const getMainCircleRadius = ({
  anchorElRef,
  offset
}: Required<
  Pick<CircularSpeedDialProps, 'anchorElRef' | 'offset'>
>): number => {
  const anchorEl = anchorElRef.current;
  const offsetNumber = parseInt(offset);
  if (!anchorEl) return offsetNumber;

  const anchorRadius = anchorEl.offsetWidth / 2;
  return anchorRadius + offsetNumber;
};

export const getRotationAngleList = ({
  actionsNumber,
  direction
}: {
  actionsNumber: number;
  direction: CircularSpeedDialProps['direction'];
}) => {
  const rotationAngleList = Array.from({ length: actionsNumber });
  switch (direction) {
    case 'up':
      return rotationAngleList.map(
        (_, index) => 180 + (180 / (actionsNumber - 1)) * index
      );
    case 'down':
      return rotationAngleList.map(
        (_, index) => (180 / (actionsNumber - 1)) * index
      );
    case 'left':
      return rotationAngleList.map(
        (_, index) => 90 + (180 / (actionsNumber - 1)) * index
      );
    case 'right':
      return rotationAngleList.map(
        (_, index) => 270 + (180 / (actionsNumber - 1)) * index
      );
    case 'up-left':
      return rotationAngleList.map(
        (_, index) => 180 + (90 / (actionsNumber - 1)) * index
      );
    case 'up-right':
      return rotationAngleList.map(
        (_, index) => 270 + (90 / (actionsNumber - 1)) * index
      );
    case 'down-left':
      return rotationAngleList.map(
        (_, index) => 90 + (90 / (actionsNumber - 1)) * index
      );
    case 'down-right':
      return rotationAngleList.map(
        (_, index) => (90 / (actionsNumber - 1)) * index
      );
    default:
      return rotationAngleList.map((_, index) => (360 / actionsNumber) * index);
  }
};

export const insertProps = (
  elements: Array<JSX.Element>
): Array<JSX.Element> => {
  return elements.map((element, index) => ({
    ...element,
    props: {
      ...element.props,
      index
    }
  }));
};

export const calculateActionCenterPosition = ({
  mainCircleRadius,
  circularSpeedDialContentRadius,
  actionRadius,
  rotationAngle
}: {
  mainCircleRadius: number;
  circularSpeedDialContentRadius: number;
  actionRadius: number;
  rotationAngle: number;
}) => {
  const angleInRadians = (rotationAngle * Math.PI) / 180;
  return {
    cx:
      circularSpeedDialContentRadius +
      (mainCircleRadius + actionRadius) * Math.cos(angleInRadians),
    cy:
      circularSpeedDialContentRadius +
      (mainCircleRadius + actionRadius) * Math.sin(angleInRadians)
  };
};

export const getTooltipPlacement = ({
  rotationAngle
}: {
  rotationAngle: number;
}) => {
  if (90 < rotationAngle && rotationAngle < 270) return 'left';
  else if (rotationAngle < 90 || rotationAngle > 270) return 'right';
  else if (rotationAngle === 90) return 'bottom';
  else if (rotationAngle === 270) return 'top';
};
