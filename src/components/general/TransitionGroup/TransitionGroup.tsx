import cn from 'classnames';
import { useRef, useEffect } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { getChildrenKeys, controlInProp } from './Transition.utils';

export type TransitionGroupProps<T extends AsType = 'div'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
  };

const TransitionGroup = <T extends AsType = 'div'>(
  props: TransitionGroupProps<T>
) => {
  const { children, className, style, as: Component = 'div', ...rest } = props;
  const currentChildrenKeys = getChildrenKeys(children);
  const prevChildrenKeys = useRef<React.Key[]>([]);
  const newStyle = useStyle(style);

  useEffect(() => {
    prevChildrenKeys.current = currentChildrenKeys;
  }, [currentChildrenKeys]);

  return (
    <Component
      className={cn('JinniTransitionGroup', className)}
      style={newStyle}
      {...rest}
    >
      {controlInProp({
        children,
        prevChildrenKeys: prevChildrenKeys.current,
        currentChildrenKeys
      })}
    </Component>
  );
};

export default TransitionGroup;
