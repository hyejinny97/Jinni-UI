import './Pagination.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { VariantType } from '@/components/Button';
import { ColorType } from '@/types/color';
import PaginationItem, {
  PaginationItemProps,
  PageButtonType,
  ShapeType,
  SizeType
} from '../PaginationItem';
import PaginationEllipsis, {
  PaginationEllipsisProps
} from './PaginationEllipsis';
import { usePage } from './Pagination.hooks';
import {
  generatePageArray,
  isEllipsis,
  isPaginationItem
} from './Pagination.utils';
import { validatePositiveInteger } from '@/utils/isNumber';

export type PaginationProps<
  T extends AsType = 'ul',
  P extends AsType = 'button'
> = Omit<DefaultComponentProps<T>, 'onChange'> & {
  count: number;
  displayCount?: number;
  defaultPage?: number;
  page?: number;
  onChange?: (event: React.SyntheticEvent, page: number) => void;
  displayMethod?: 'default' | 'ellipsis';
  siblingCount?: number;
  boundaryCount?: number;
  renderPaginationItem?: (itemProps: PaginationItemProps<P>) => React.ReactNode;
  variant?: {
    selectedPage: VariantType;
    page: VariantType;
  };
  color?: ColorType;
  disabled?: boolean;
  shape?: ShapeType;
  size?: SizeType;
};

export const FIRST_PAGE = 1;

const VARIANT = {
  selectedPage: 'filled' as VariantType,
  page: 'text' as VariantType
};

const Pagination = <T extends AsType = 'ul', P extends AsType = 'button'>(
  props: PaginationProps<T, P>
) => {
  const {
    count,
    displayCount = 5,
    defaultPage = FIRST_PAGE,
    page,
    onChange,
    displayMethod = 'default',
    siblingCount = 1,
    boundaryCount = 1,
    renderPaginationItem = (itemProps: PaginationItemProps<P>) => (
      <PaginationItem {...(itemProps as PaginationItemProps)} />
    ),
    variant = VARIANT,
    color = 'primary',
    disabled = false,
    shape = 'circular',
    size = 'md',
    className,
    style,
    as,
    ...rest
  } = props;
  const Component = (as ?? 'ul') as React.ElementType;
  const pageCount = validatePositiveInteger({ value: count });
  const pageDisplayCount = validatePositiveInteger({ value: displayCount });
  const { roundFirstPage, roundLastPage, selectedPage, handleChange } = usePage(
    {
      count,
      displayCount: pageDisplayCount,
      defaultPage,
      page,
      onChange
    }
  );
  const pageArray = generatePageArray({
    displayMethod,
    boundaryCount,
    siblingCount,
    selectedPage,
    roundFirstPage,
    roundLastPage
  });
  const newStyle = useStyle(style);

  const items: Array<PaginationItemProps<P> | PaginationEllipsisProps> = [
    {
      type: 'first',
      page: FIRST_PAGE,
      onClick: handleChange(FIRST_PAGE),
      disabled: selectedPage === FIRST_PAGE || disabled,
      shape,
      size,
      'aria-label': 'go to first page'
    },
    {
      type: 'prev',
      page: selectedPage - 1,
      onClick: handleChange(selectedPage - 1),
      disabled: selectedPage === FIRST_PAGE || disabled,
      shape,
      size,
      'aria-label': 'go to previous page'
    },
    ...pageArray.map(({ type, page }) => {
      switch (type) {
        case 'page': {
          const selected = selectedPage === page;
          return {
            type: 'page',
            page,
            selected,
            onClick: handleChange(page),
            variant: selected ? variant.selectedPage : variant.page,
            color,
            disabled,
            shape,
            size,
            'aria-label': `go to page ${page}`,
            'aria-current': selected ? 'page' : undefined
          } as unknown as PageButtonType<P>;
        }
        case 'ellipsis':
          return {
            type: 'ellipsis',
            page,
            size
          } as PaginationEllipsisProps;
      }
    }),
    {
      type: 'next',
      page: selectedPage + 1,
      onClick: handleChange(selectedPage + 1),
      disabled: selectedPage === pageCount || disabled,
      shape,
      size,
      'aria-label': 'go to next page'
    },
    {
      type: 'last',
      page: pageCount,
      onClick: handleChange(pageCount),
      disabled: selectedPage === pageCount || disabled,
      shape,
      size,
      'aria-label': 'go to last page'
    }
  ];

  return (
    <Component
      role="navigation"
      aria-label="pagination navigation"
      className={cn('JinniPagination', size, className)}
      style={newStyle}
      {...rest}
    >
      {items.map((itemProps, idx) => (
        <li
          key={
            itemProps.type === 'ellipsis'
              ? `ellipsis/${idx}`
              : `${itemProps.type}/${itemProps.page}`
          }
        >
          {isEllipsis<P>(itemProps) && <PaginationEllipsis {...itemProps} />}
          {isPaginationItem<P>(itemProps) && renderPaginationItem(itemProps)}
        </li>
      ))}
    </Component>
  );
};

export default Pagination;
