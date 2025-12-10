import './TabPrevButton.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowUpIcon } from '@/components/icons/ArrowUpIcon';
import { useTabsContext } from '../Tabs.hooks';

type TabPrevButtonProps<T extends AsType = 'button'> = ButtonProps<T>;

const TabPrevButton = <T extends AsType = 'button'>(
  props: TabPrevButtonProps<T>
) => {
  const { tabListOrientation, slidePrevTab, noPrevTab, tabSize } =
    useTabsContext();
  const {
    children = tabListOrientation === 'horizontal' ? (
      <ArrowLeftIcon />
    ) : (
      <ArrowUpIcon />
    ),
    className,
    ...rest
  } = props;

  return (
    <Button
      className={cn('JinniTabPrevButton', className)}
      variant="text"
      color="gray-500"
      size={tabSize}
      disabled={noPrevTab}
      onClick={slidePrevTab}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default TabPrevButton;
