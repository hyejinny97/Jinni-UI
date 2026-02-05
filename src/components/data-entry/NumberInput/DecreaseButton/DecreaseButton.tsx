import './DecreaseButton.scss';
import cn from 'classnames';
import { ButtonBase, ButtonBaseProps } from '@/components/general/ButtonBase';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useNumberInput } from '../NumberInput.hooks';
import { useButtonPress } from './DecreaseButton.hooks';

type DecreaseButtonProps = Omit<ButtonBaseProps<'button'>, 'type' | 'href'>;

const DecreaseButton = (props: DecreaseButtonProps) => {
  const { size, disableDecrease: isDisabled } = useNumberInput();
  const { className, disabled = isDisabled, ...rest } = props;
  const { targetElRef } = useButtonPress();

  return (
    <ButtonBase
      ref={targetElRef}
      type="button"
      className={cn('JinniDecreaseButton', size, className)}
      disabled={disabled}
      tabIndex={-1}
      {...rest}
    >
      <ArrowDownIcon color="gray-600" />
    </ButtonBase>
  );
};

export default DecreaseButton;
