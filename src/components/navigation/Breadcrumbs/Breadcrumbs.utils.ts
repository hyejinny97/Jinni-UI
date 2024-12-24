import { BreadcrumbsProps } from './Breadcrumbs';

type ValidateMaxItemsProps = Required<
  Pick<
    BreadcrumbsProps,
    'maxItems' | 'itemsBeforeCollapse' | 'itemsAfterCollapse'
  >
>;

export const validateMaxItems = ({
  maxItems,
  itemsBeforeCollapse,
  itemsAfterCollapse
}: ValidateMaxItemsProps) => {
  const totalItems = itemsBeforeCollapse + itemsAfterCollapse;
  if (maxItems < totalItems) return totalItems;
  return maxItems;
};
