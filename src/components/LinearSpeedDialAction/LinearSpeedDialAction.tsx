import './LinearSpeedDialAction.scss';
import cn from 'classnames';
import { useId } from 'react';
import { AsType } from '@/types/default-component-props';
import Button, { ButtonProps } from '@/components/Button';
import Tooltip, { TooltipProps } from '@/components/Tooltip';
import { getTooltipPlacement } from './LinearSpeedDialAction.utils';
import { useLinearDial } from '../LinearSpeedDial';

export type LinearSpeedDialActionProps<T extends AsType = 'button'> =
  ButtonProps<T> & {
    TooltipProps: Omit<TooltipProps, 'children'>;
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    TransitionComponent?: React.ComponentType<any>;
  };

const LinearSpeedDialAction = <T extends AsType = 'button'>(
  props: LinearSpeedDialActionProps<T>
) => {
  const {
    TooltipProps,
    variant = 'text',
    color = 'on-surface-variant',
    size = 'md',
    elevation = 3,
    shape = 'pill',
    TransitionComponent = 'span',
    className,
    ...rest
  } = props;
  const id = useId();
  const { placement, positionType, container } = useLinearDial();

  return (
    <Tooltip
      id={id}
      triggers={['hover', 'focus']}
      placement={getTooltipPlacement(placement)}
      positionType={positionType}
      container={container}
      {...TooltipProps}
    >
      <TransitionComponent className={cn('JinniLinearSpeedDialActionWrapper')}>
        <Button
          role="menuitem"
          className={cn('JinniLinearSpeedDialAction', variant, className)}
          variant={variant}
          color={color}
          size={size}
          elevation={elevation}
          shape={shape}
          tabIndex={-1}
          aria-labelledby={id}
          {...rest}
        />
      </TransitionComponent>
    </Tooltip>
  );
};

export default LinearSpeedDialAction;
