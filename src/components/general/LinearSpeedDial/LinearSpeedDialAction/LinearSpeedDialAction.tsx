import './LinearSpeedDialAction.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { Tooltip, TooltipProps } from '@/components/data-display/Tooltip';
import { getTooltipPlacement } from './LinearSpeedDialAction.utils';
import { useLinearDial } from '../LinearSpeedDial.hooks';

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
    size = 'md',
    elevation = 3,
    shape = 'pill',
    className,
    ...rest
  } = props;
  const { placement } = useLinearDial();

  return (
    <Tooltip
      triggers={['hover', 'focus']}
      placement={getTooltipPlacement(placement)}
      {...TooltipProps}
    >
      <span className={cn('JinniLinearSpeedDialActionWrapper')}>
        <Button
          className={cn('JinniLinearSpeedDialAction', variant, className)}
          variant={variant}
          color={color}
          size={size}
          elevation={elevation}
          shape={shape}
          tabIndex={-1}
          {...rest}
        />
      </span>
    </Tooltip>
  );
};

export default LinearSpeedDialAction;
