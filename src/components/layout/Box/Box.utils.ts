import { RoundType, RoundKeywordType } from './Box';

const isRoundKeyword = (round: RoundType): round is RoundKeywordType =>
  ['sm', 'md', 'lg'].some((keyword) => keyword === round);

export const getComputedRound = (round: RoundType) => {
  if (isRoundKeyword(round)) {
    const roundMap = { sm: 8, md: 12, lg: 16 };
    return roundMap[round];
  }
  return round;
};
