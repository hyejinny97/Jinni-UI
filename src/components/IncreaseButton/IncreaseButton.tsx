import './IncreaseButton.scss';
import cn from 'classnames';
import ButtonBase, { ButtonBaseProps } from '@/components/ButtonBase';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { useNumberInput } from '../NumberInput';
import { useButtonPress } from './IncreaseButton.hooks';

type IncreaseButtonProps = Omit<ButtonBaseProps<'button'>, 'type' | 'href'>;

const IncreaseButton = (props: IncreaseButtonProps) => {
  const { size, disableIncrease: isDisabled } = useNumberInput();
  const { className, disabled = isDisabled, ...rest } = props;
  const { targetElRef } = useButtonPress();

  return (
    <ButtonBase
      ref={targetElRef}
      type="button"
      className={cn('JinniIncreaseButton', size, className)}
      disabled={disabled}
      tabIndex={-1}
      aria-label="increase"
      {...rest}
    >
      <ArrowUpIcon color="on-surface-variant" />
    </ButtonBase>
  );
};

export default IncreaseButton;
