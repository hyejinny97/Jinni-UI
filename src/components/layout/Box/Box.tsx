import './Box.scss';
import cn from 'classnames';
import { DefaultComponentProps } from '@/types/default-component-props';
import useStyle from '@/hooks/useStyle';
import { ElevationLevelType } from '@/types/elevation';
import { getComputedRound } from './Box.utils';

export type RoundKeywordType = 'sm' | 'md' | 'lg';
export type RoundType = RoundKeywordType | number;

interface BoxProps extends DefaultComponentProps<HTMLDivElement> {
  elevation?: ElevationLevelType;
  outlined?: boolean;
  round?: RoundType;
}

const Box = (props: BoxProps) => {
  const {
    elevation = 0,
    outlined = false,
    round = 0,
    children,
    className,
    style,
    ...rest
  } = props;
  const computedRound = getComputedRound(round);
  const newStyle = useStyle({
    elevation,
    borderRadius: `${computedRound}px`,
    ...style
  });

  return (
    <div
      className={cn('JinniBox', { outlined }, className)}
      style={newStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
