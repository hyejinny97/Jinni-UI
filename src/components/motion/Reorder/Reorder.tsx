import './Reorder.scss';
import cn from 'classnames';
import { useRef } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ReorderItemValueType } from './Reorder.types';
import { ReorderContext } from './Reorder.contexts';

type ReorderProps<T extends AsType = 'ul'> = Omit<
  DefaultComponentProps<T>,
  'onChange'
> & {
  value: Array<ReorderItemValueType>;
  onChange: (value: Array<ReorderItemValueType>) => void;
  direction?: 'horizontal' | 'vertical';
};

const Reorder = <T extends AsType = 'ul'>(props: ReorderProps<T>) => {
  const {
    children,
    value,
    onChange,
    direction = 'vertical',
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
  const isReorderingRef = useRef<boolean>(false);
  const newStyle = useStyle(style);

  const moveItem = (
    fromId: ReorderItemValueType,
    toId: ReorderItemValueType
  ) => {
    if (fromId === toId) return;
    const oldIndex = value.indexOf(fromId);
    const newIndex = value.indexOf(toId);
    if (oldIndex === -1 || newIndex === -1) return;

    const newValue = [...value];
    const [moved] = newValue.splice(oldIndex, 1);
    newValue.splice(newIndex, 0, moved);

    onChange(newValue);
    isReorderingRef.current = true;
  };

  return (
    <ReorderContext.Provider
      value={{
        moveItem,
        direction,
        isReorderingRef
      }}
    >
      <Component
        className={cn('JinniReorder', direction, className)}
        style={newStyle}
        {...rest}
      >
        {children}
      </Component>
    </ReorderContext.Provider>
  );
};

export default Reorder;
