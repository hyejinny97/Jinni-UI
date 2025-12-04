import { useState } from 'react';
import { PaginationProps, FIRST_PAGE } from './Pagination';
import { isNumber } from '@/utils/isNumber';

type UsePageProps = Required<
  Pick<PaginationProps, 'defaultPage' | 'displayCount'>
> &
  Pick<PaginationProps, 'page' | 'onChange' | 'count'>;

export const usePage = ({
  count,
  displayCount,
  defaultPage,
  page,
  onChange
}: UsePageProps) => {
  const isControlled = page !== undefined && isNumber(page);
  const calculateRound = (page: number) =>
    Math.floor((page - FIRST_PAGE) / displayCount);

  const [uncontrolledPage, setUncontrolledPage] = useState<number>(defaultPage);
  const [round, setRound] = useState<number>(
    isControlled ? calculateRound(page) : calculateRound(uncontrolledPage)
  );
  const roundFirstPage = round * displayCount + FIRST_PAGE;
  const roundLastPage = Math.min(roundFirstPage + displayCount - 1, count);

  const handleChange = (newPage: number) => (event: React.SyntheticEvent) => {
    if (!isControlled) setUncontrolledPage(newPage);
    if (onChange) onChange(event, newPage);
    if (newPage > roundLastPage || newPage < roundFirstPage) {
      const newRound = calculateRound(newPage);
      setRound(newRound);
    }
  };

  return {
    roundFirstPage,
    roundLastPage,
    selectedPage: isControlled ? page : uncontrolledPage,
    handleChange
  };
};
