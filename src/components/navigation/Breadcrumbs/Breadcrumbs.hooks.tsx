import { useState } from 'react';
import { validateMaxItems } from './Breadcrumbs.utils';
import { Button } from '@/components/general/Button';
import { BreadcrumbsProps } from './Breadcrumbs';

type UseDisplayProps = Required<
  Pick<
    BreadcrumbsProps,
    'maxItems' | 'itemsBeforeCollapse' | 'itemsAfterCollapse'
  >
> & {
  childrenLiArray: JSX.Element[];
};

const useDisplay = (props: UseDisplayProps): JSX.Element[] => {
  const { maxItems, itemsBeforeCollapse, itemsAfterCollapse, childrenLiArray } =
    props;
  const validatedMaxItems = validateMaxItems({
    maxItems,
    itemsBeforeCollapse,
    itemsAfterCollapse
  });
  const isMoreThanMaxItems = childrenLiArray.length > validatedMaxItems;
  const [collapsed, setCollapsed] = useState(isMoreThanMaxItems);

  const handleCollapsedButtonClick = () => {
    setCollapsed(false);
  };

  let displayedChildren = childrenLiArray;
  if (collapsed) {
    displayedChildren = [
      ...displayedChildren.slice(0, itemsBeforeCollapse),
      <li>
        <Button
          aria-label="Show path"
          variant="text"
          color="black"
          size="sm"
          onClick={handleCollapsedButtonClick}
        >
          ...
        </Button>
      </li>,
      ...displayedChildren.slice(displayedChildren.length - itemsAfterCollapse)
    ];
  }

  return displayedChildren;
};

export default useDisplay;
