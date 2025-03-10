import { useState } from 'react';
import { PaginationProps, FIRST_PAGE } from './Pagination';
import { isNumber } from '@/utils/isNumber';

export const usePage = ({
  count,
  pageDisplayCount,
  defaultPage,
  page,
  onChange
}: Pick<PaginationProps, 'defaultPage' | 'page' | 'onChange' | 'count'> & {
  pageDisplayCount: number;
}) => {
  const isControlled = page !== undefined && isNumber(page);
  const calculateRound = (page: number) =>
    Math.floor((page - FIRST_PAGE) / pageDisplayCount);

  const [uncontrolledPage, setUncontrolledPage] = useState<number>(
    defaultPage || FIRST_PAGE
  );
  const [round, setRound] = useState<number>(
    isControlled ? calculateRound(page) : calculateRound(uncontrolledPage)
  );
  const roundFirstPage = round * pageDisplayCount + FIRST_PAGE;
  const roundLastPage = Math.min(roundFirstPage + pageDisplayCount - 1, count);

  const handleChange = (newPage: number) => (event: React.SyntheticEvent) => {
    if (!isControlled) setUncontrolledPage(newPage);
    if (onChange) onChange(event, newPage);

    const newRound = calculateRound(newPage);
    if (newPage > roundLastPage || newPage < roundFirstPage) setRound(newRound);
  };

  return {
    roundFirstPage,
    roundLastPage,
    selectedPage: isControlled ? page : uncontrolledPage,
    handleChange
  };
};
