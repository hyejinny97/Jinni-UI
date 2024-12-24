import './Breadcrumbs.scss';
import cn from 'classnames';
import { Children, Fragment } from 'react';
import useStyle from '@/hooks/useStyle';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useDisplay from './Breadcrumbs.hooks';

export type BreadcrumbsProps<T extends AsType = 'ol'> =
  DefaultComponentProps<T> & {
    children: React.ReactNode;
    separator?: React.ReactNode;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
  };

const Breadcrumbs = <T extends AsType = 'ol'>(props: BreadcrumbsProps<T>) => {
  const {
    children,
    separator = '/',
    maxItems = 5,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    className,
    style,
    as: Component = 'ol',
    ...rest
  } = props;
  const newStyle = useStyle(style);
  const childrenArray = Children.toArray(children);
  const childrenLiArray = childrenArray.map((child, childIdx) => (
    <li className="JinniBreadcrumb" key={childIdx}>
      {child}
    </li>
  ));
  const displayedChildren = useDisplay({
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse,
    childrenLiArray
  });

  return (
    <Component
      className={cn('JinniBreadcrumbs', className)}
      style={newStyle}
      {...rest}
    >
      {displayedChildren.map((child, childIdx) => {
        const isLastChild = childIdx === displayedChildren.length - 1;
        return (
          <Fragment key={childIdx}>
            {child}
            {!isLastChild && (
              <li className="JinniSeparator" aria-hidden="true">
                {separator}
              </li>
            )}
          </Fragment>
        );
      })}
    </Component>
  );
};

export default Breadcrumbs;
