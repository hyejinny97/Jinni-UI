import './Pagination.scss';
import cn from 'classnames';
import { AsType, DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { VariantType } from '@/components/general/Button';
import { ColorType } from '@/types/color';
import {
  PaginationItem,
  PaginationItemProps,
  PageButtonType,
  ShapeType,
  SizeType
} from './PaginationItem';
import PaginationEllipsis, {
  PaginationEllipsisProps
} from './PaginationEllipsis';
import { usePage } from './Pagination.hooks';
import {
  generatePageArray,
  isEllipsis,
  isPaginationItem
} from './Pagination.utils';
import { WithKey } from './Pagination.types';
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
      <PaginationItem {...itemProps} />
    ),
    variant = VARIANT,
    color = 'primary',
    disabled = false,
    shape = 'circular',
    size = 'md',
    className,
    style,
    as: Component = 'ul',
    ...rest
  } = props;
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

  const items: Array<
    WithKey<PaginationItemProps<P>> | WithKey<PaginationEllipsisProps>
  > = [
    {
      key: 'first',
      type: 'first',
      page: FIRST_PAGE,
      onClick: handleChange(FIRST_PAGE),
      disabled: selectedPage === FIRST_PAGE || disabled,
      shape,
      size
    },
    {
      key: 'prev',
      type: 'prev',
      page: selectedPage - 1,
      onClick: handleChange(selectedPage - 1),
      disabled: selectedPage === FIRST_PAGE || disabled,
      shape,
      size
    },
    ...pageArray.map(({ key, type, page }) => {
      switch (type) {
        case 'page':
          return {
            key,
            type: 'page',
            page,
            selected: selectedPage === page,
            onClick: handleChange(page),
            variant:
              selectedPage === page ? variant.selectedPage : variant.page,
            color,
            disabled,
            shape,
            size
          } as WithKey<PageButtonType<P>>;
        case 'ellipsis':
          return {
            key,
            type: 'ellipsis',
            page,
            size
          } as WithKey<PaginationEllipsisProps>;
      }
    }),
    {
      key: 'next',
      type: 'next',
      page: selectedPage + 1,
      onClick: handleChange(selectedPage + 1),
      disabled: selectedPage === pageCount || disabled,
      shape,
      size
    },
    {
      key: 'last',
      type: 'last',
      page: pageCount,
      onClick: handleChange(pageCount),
      disabled: selectedPage === pageCount || disabled,
      shape,
      size
    }
  ];

  return (
    <Component
      className={cn('JinniPagination', size, className)}
      style={newStyle}
      {...rest}
    >
      {items.map(({ key, ...itemProps }) => (
        <li key={key}>
          {isEllipsis<P>(itemProps) && <PaginationEllipsis {...itemProps} />}
          {isPaginationItem<P>(itemProps) && renderPaginationItem(itemProps)}
        </li>
      ))}
    </Component>
  );
};

export default Pagination;
