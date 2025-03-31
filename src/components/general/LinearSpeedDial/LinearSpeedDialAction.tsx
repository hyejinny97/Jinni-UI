import cn from 'classnames';
import { useContext } from 'react';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { Tooltip, TooltipProps } from '@/components/data-display/Tooltip';
import LinearSpeedDialContext from './LinearSpeedDial.contexts';
import { getTooltipPlacement } from './LinearSpeedDial.utils';

export type LinearSpeedDialActionProps<T extends AsType = 'button'> =
  ButtonProps<T> & {
    TooltipProps: Omit<TooltipProps, 'children'>;
  };

const LinearSpeedDialAction = <T extends AsType = 'button'>(
  props: LinearSpeedDialActionProps<T>
) => {
  const {
    TooltipProps,
    variant = 'text',
    color = 'gray-600',
    isSquareSize = true,
    size = 'md',
    elevation = 3,
    shape = 'pill',
    className,
    ...rest
  } = props;
  const linearSpeedDialContextValue = useContext(LinearSpeedDialContext);

  if (!linearSpeedDialContextValue)
    throw new Error('CircularSpeedDialContext 값을 가져올 수 없습니다.');

  return (
    <Tooltip
      placement={getTooltipPlacement(linearSpeedDialContextValue.direction)}
      {...TooltipProps}
    >
      <Button
        className={cn('JinniLinearSpeedDialAction', className)}
        variant={variant}
        color={color}
        isSquareSize={isSquareSize}
        size={size}
        elevation={elevation}
        shape={shape}
        {...rest}
      />
    </Tooltip>
  );
};

export default LinearSpeedDialAction;
