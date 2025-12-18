import { VariantType, CircularSpeedDialProps } from './CircularSpeedDial';

export const getDefaultPlacement = (variant: VariantType) => {
  switch (variant) {
    case 'semi-circular':
      return 'up';
    case 'quarter-circular':
      return 'up-left';
    case 'circular':
      return;
  }
};

export const findRadius = (element: HTMLElement) =>
  Math.max(element.offsetWidth, element.offsetHeight) / 2;

export const findElementByLayer = ({
  root,
  elementClassNameToFind
}: {
  root: HTMLElement;
  elementClassNameToFind: string;
}): HTMLElement[] => {
  const result: HTMLElement[] = [];
  const queue: HTMLElement[] = [];

  queue.push(...(Array.from(root.children) as HTMLElement[]));

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.classList.contains(elementClassNameToFind)) {
      result.push(current);
      continue;
    }
    queue.push(...(Array.from(current.children) as HTMLElement[]));
  }

  return result;
};

export const getRotationAngleList = ({
  actionsNumber,
  placement
}: {
  actionsNumber: number;
  placement: CircularSpeedDialProps['placement'];
}) => {
  const rotationAngleList = Array.from({ length: actionsNumber });
  switch (placement) {
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

export const calculateActionCenterPosition = ({
  speedDialContentRadius,
  anchorRadius,
  offset,
  actionRadius,
  rotationAngle
}: {
  speedDialContentRadius: number;
  anchorRadius: number;
  offset: number;
  actionRadius: number;
  rotationAngle: number;
}) => {
  const angleInRadians = (rotationAngle * Math.PI) / 180;
  return {
    cx:
      speedDialContentRadius +
      (anchorRadius + offset + actionRadius) * Math.cos(angleInRadians),
    cy:
      speedDialContentRadius +
      (anchorRadius + offset + actionRadius) * Math.sin(angleInRadians)
  };
};
