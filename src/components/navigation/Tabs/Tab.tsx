import cn from 'classnames';
import { forwardRef } from 'react';
import { AsType } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';

export type ValueType = string | number;

type TabProps<T extends AsType = 'button'> = ButtonProps<T> & {
  value?: ValueType;
  selected?: boolean;
};

const Tab = forwardRef(
  <T extends AsType = 'button'>(
    props: TabProps<T>,
    ref: React.Ref<HTMLElement>
  ) => {
    const { variant, selected, color, children, className, ...rest } = props;

    return (
      <Button
        ref={ref}
        className={cn('JinniTab', { selected }, className)}
        variant={variant || 'text'}
        color={selected ? color : 'gray-500'}
        {...rest}
      >
        {children}
      </Button>
    );
  }
);

Tab.displayName = 'Tab';

export default Tab;
