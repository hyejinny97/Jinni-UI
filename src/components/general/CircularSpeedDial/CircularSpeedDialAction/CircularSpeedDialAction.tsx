import './CircularSpeedDialAction.scss';
import cn from 'classnames';
import { useId } from 'react';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { Tooltip, TooltipProps } from '@/components/data-display/Tooltip';
import { useCircularDial } from '../CircularSpeedDial.hooks';
import { useTooltipPlacement } from './CircularSpeedDialAction.hooks';

export type CircularSpeedDialActionProps<T extends AsType = 'button'> =
  ButtonProps<T> & {
    TooltipProps: Omit<TooltipProps, 'children'>;
  };

const CircularSpeedDialAction = <T extends AsType = 'button'>(
  props: CircularSpeedDialActionProps<T>
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
  const id = useId();
  const { positionType, container } = useCircularDial();
  const { wrapperElRef, tooltipPlacement } = useTooltipPlacement();

  return (
    <Tooltip
      id={id}
      triggers={['hover', 'focus']}
      placement={tooltipPlacement}
      positionType={positionType}
      container={container}
      {...TooltipProps}
    >
      <span
        ref={wrapperElRef}
        className={cn('JinniCircularSpeedDialActionWrapper')}
      >
        <Button
          role="menuitem"
          className={cn('JinniCircularSpeedDialAction', variant, className)}
          variant={variant}
          color={color}
          size={size}
          elevation={elevation}
          shape={shape}
          tabIndex={-1}
          aria-labelledby={id}
          {...rest}
        />
      </span>
    </Tooltip>
  );
};

export default CircularSpeedDialAction;
