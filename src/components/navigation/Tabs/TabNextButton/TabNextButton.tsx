import './TabNextButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { useTabsContext } from '../Tabs.hooks';

type TabNextButtonProps<T extends AsType = 'button'> = ButtonProps<T>;

const TabNextButton = <T extends AsType = 'button'>(
  props: TabNextButtonProps<T>
) => {
  const { tabListOrientation, slideNextTab, noNextTab, tabSize } =
    useTabsContext();
  const {
    children = tabListOrientation === 'horizontal' ? (
      <ArrowRightIcon />
    ) : (
      <ArrowDownIcon />
    ),
    className,
    ...rest
  } = props;

  return (
    <Button
      className={cn('JinniTabNextButton', className)}
      variant="text"
      color="gray-500"
      size={tabSize}
      disabled={noNextTab}
      onClick={slideNextTab}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TabNextButton;
