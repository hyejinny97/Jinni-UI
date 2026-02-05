import './IncreaseButton.scss';
import cn from 'classnames';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { useNumberInput } from '../NumberInput.hooks';
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
      {...rest}
    >
      <ArrowUpIcon color="gray-600" />
    </ButtonBase>
  );
};

export default IncreaseButton;
