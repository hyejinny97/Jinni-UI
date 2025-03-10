import { AsType } from '@/types/default-component-props';
import { FIRST_PAGE, PaginationProps } from './Pagination';
import { PaginationItemProps } from './PaginationItem';
import { EllipsisProps } from './Ellipsis';

type PageType =
  | { key: number; type: 'page'; page: number }
  | { key: number; type: 'ellipsis'; page: null };

export const convertToPositiveInteger = (value: number): number =>
  Math.round(Math.max(value, FIRST_PAGE));

export const generatePageArray = ({
  displayMethod,
  boundaryCount,
  siblingCount,
  selectedPage,
  roundFirstPage,
  roundLastPage
}: Required<
  Pick<PaginationProps, 'displayMethod' | 'boundaryCount' | 'siblingCount'>
> & {
  selectedPage: number;
  roundFirstPage: number;
  roundLastPage: number;
}): Array<PageType> => {
  const selectedPageIndex = selectedPage - roundFirstPage;
  const pageArray = Array.from<unknown, PageType>(
    { length: roundLastPage - roundFirstPage + 1 },
    (_, idx) => ({
      key: idx + roundFirstPage,
      type: 'ellipsis',
      page: null
    })
  );

  const updateToPageType = (start: number, count: number) => {
    for (
      let i = start;
      i >= 0 && i < pageArray.length && count > 0;
      i++, count--
    ) {
      pageArray[i].type = 'page';
      pageArray[i].page = pageArray[i].key;
    }
  };

  if (displayMethod === 'default') {
    return pageArray.map((el) => ({ ...el, type: 'page', page: el.key }));
  }

  updateToPageType(selectedPageIndex, 1);
  updateToPageType(0, boundaryCount);
  updateToPageType(pageArray.length - boundaryCount, boundaryCount);
  updateToPageType(selectedPageIndex - siblingCount, siblingCount);
  updateToPageType(selectedPageIndex + 1, siblingCount);

  let hasLeftEllipsis = false;
  let hasRightEllipsis = false;
  const newPageArray = [] as Array<PageType>;
  for (let i = 0; i < pageArray.length; i++) {
    const el = pageArray[i];
    if (el.type === 'page') {
      newPageArray.push(el);
      continue;
    }
    if (hasLeftEllipsis && hasRightEllipsis) continue;
    if (!hasLeftEllipsis && i < selectedPageIndex) {
      newPageArray.push({ ...el, type: 'ellipsis' });
      hasLeftEllipsis = true;
    }
    if (!hasRightEllipsis && i > selectedPageIndex) {
      newPageArray.push({ ...el, type: 'ellipsis' });
      hasRightEllipsis = true;
    }
  }
  return newPageArray;
};

export const isEllipsis = <P extends AsType = 'button'>(
  props: PaginationItemProps<P> | EllipsisProps
): props is EllipsisProps => props.type === 'ellipsis';

export const isPaginationItem = <P extends AsType = 'button'>(
  props: PaginationItemProps<P> | EllipsisProps
): props is PaginationItemProps<P> =>
  ['first', 'last', 'prev', 'next', 'page'].includes(props.type);
