import cn from 'classnames';
import { useContext } from 'react';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { Tooltip, TooltipProps } from '@/components/data-display/Tooltip';
import { useActionPosition } from './CircularSpeedDial.hooks';
import CircularSpeedDialContext from './CircularSpeedDial.contexts';
import { getTooltipPlacement } from './CircularSpeedDial.utils';

export type CircularSpeedDialActionProps<T extends AsType = 'button'> =
  ButtonProps<T> & {
    TooltipProps: Omit<TooltipProps, 'children'>;
    index?: number;
  };

const CircularSpeedDialAction = <T extends AsType = 'button'>(
  props: CircularSpeedDialActionProps<T>
) => {
  const {
    TooltipProps,
    index,
    variant = 'text',
    color = 'gray-600',
    size = 'md',
    elevation = 3,
    shape = 'pill',
    className,
    style,
    ...rest
  } = props;
  const circularSpeedDialContextValue = useContext(CircularSpeedDialContext);

  if (!circularSpeedDialContextValue)
    throw new Error('CircularSpeedDialContext 값을 가져올 수 없습니다.');
  if (index === undefined)
    throw new Error('CircularSpeedDialAction의 index 값이 없습니다.');

  const {
    mainCircleRadius,
    circularSpeedDialContentRadius,
    rotationAngleList
  } = circularSpeedDialContextValue;
  const rotationAngle = rotationAngleList[index];
  const { actionElRef, actionPosition } = useActionPosition({
    mainCircleRadius,
    circularSpeedDialContentRadius,
    rotationAngle
  });

  return (
    <Tooltip
      placement={getTooltipPlacement({ rotationAngle })}
      {...TooltipProps}
    >
      <Button
        ref={actionElRef}
        className={cn('JinniCircularSpeedDialAction', className)}
        variant={variant}
        color={color}
        size={size}
        elevation={elevation}
        shape={shape}
        style={{
          position: 'absolute',
          padding: '8px',
          ...actionPosition,
          ...style
        }}
        {...rest}
      />
    </Tooltip>
  );
};

export default CircularSpeedDialAction;
