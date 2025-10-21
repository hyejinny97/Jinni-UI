import './Breadcrumbs.scss';
import cn from 'classnames';
import { Children, Fragment, useMemo, useState } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import { Button, ButtonProps } from '@/components/general/Button';
import { validatePositiveInteger } from '@/utils/isNumber';

export type BreadcrumbsProps<T extends AsType = 'nav'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    separator?: React.ReactNode;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
  };

const EllipsisButton = (props: ButtonProps) => (
  <Button
    variant="text"
    color="black"
    size="sm"
    shape="rounded"
    aria-label="Show path"
    {...props}
  >
    ...
  </Button>
);

const BreadCrumbSeparator = ({ children }: { children: React.ReactNode }) => (
  <li className="JinniBreadcrumbSeparator" aria-hidden="true">
    {children}
  </li>
);

const Breadcrumbs = <T extends AsType = 'ol'>(props: BreadcrumbsProps<T>) => {
  const {
    children,
    separator = '/',
    maxItems = 5,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    className,
    style,
    as: Component = 'nav',
    ...rest
  } = props;
  const validatedMaxItems = validatePositiveInteger({ value: maxItems });
  const validatedItemsBeforeCollapse = validatePositiveInteger({
    value: itemsBeforeCollapse
  });
  const validatedItemsAfterCollapse = validatePositiveInteger({
    value: itemsAfterCollapse
  });
  const items = Children.toArray(children);
  const maxItemsToDisplay = Math.max(
    validatedItemsBeforeCollapse + validatedItemsAfterCollapse,
    validatedMaxItems
  );
  const [collapsed, setCollapsed] = useState(items.length > maxItemsToDisplay);
  const newStyle = useStyle(style);

  const itemsToDisplay = useMemo(() => {
    return collapsed
      ? [
          ...items.slice(0, validatedItemsBeforeCollapse),
          <EllipsisButton onClick={() => setCollapsed((prev) => !prev)} />,
          ...items.slice(items.length - validatedItemsAfterCollapse)
        ]
      : items;
  }, [
    items,
    validatedItemsBeforeCollapse,
    validatedItemsAfterCollapse,
    collapsed
  ]);

  return (
    <Component
      className={cn('JinniBreadcrumbs', className)}
      style={newStyle}
      {...rest}
    >
      <ol>
        {itemsToDisplay.map((item, idx) => {
          const isLastChild = idx === itemsToDisplay.length - 1;
          return (
            <Fragment key={idx}>
              <li>{item}</li>
              {!isLastChild && (
                <BreadCrumbSeparator>{separator}</BreadCrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </ol>
    </Component>
  );
};

export default Breadcrumbs;
