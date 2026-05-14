import './TreeItem.scss';
import cn from 'classnames';
import { useMemo } from 'react';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { TreeItemIdType } from './TreeItem.types';
import useColor from '@/hooks/useColor';
import useJinni from '@/hooks/useJinni';
import { ColorType } from '@/types/color';
import { validatePositiveInteger } from '@/utils/isNumber';
import { getCloserToWhiteOrBlack } from '@/utils/colorLuminance';

type TreeItemProps<T extends AsType = 'li'> = Omit<
  DefaultComponentProps<T>,
  'children' | 'id'
> & {
  id: TreeItemIdType;
  children: React.ReactNode;
  layer?: number;
  selected?: boolean;
  expanded?: boolean;
  color?: ColorType;
  disabled?: boolean;
};

const TreeItem = <T extends AsType = 'li'>(props: TreeItemProps<T>) => {
  const {
    id,
    children,
    layer = 0,
    selected,
    expanded,
    color = 'primary-container',
    disabled,
    className,
    style,
    as: Component = 'li',
    ...rest
  } = props;
  const { theme } = useJinni();
  const normalizedColor = useColor(color);
  const textColor = useMemo(() => {
    const closerColor = getCloserToWhiteOrBlack(normalizedColor);
    return closerColor === 'white' ? 'black' : 'white';
  }, [normalizedColor]);
  const newStyle = useStyle({
    '--hover-overlay': `var(--jinni-${theme === 'light' ? 'black' : 'white'}-overlay-1)`,
    '--focus-overlay': `var(--jinni-${theme === 'light' ? 'black' : 'white'}-overlay-5)`,
    '--selected-background-color': `${normalizedColor}`,
    '--selected-color': textColor,
    '--layer': validatePositiveInteger({
      value: layer,
      allow: ['zero'],
      errorMessage: 'layer는 0 또는 양의 정수이어야 합니다.'
    }),
    ...style
  });

  return (
    <Component
      role="treeitem"
      className={cn('JinniTreeItem', { selected, disabled }, className)}
      data-id={id}
      data-selected={selected}
      data-expanded={expanded}
      data-disabled={disabled}
      style={newStyle}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default TreeItem;
