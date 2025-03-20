import './Card.scss';
import cn from 'classnames';
import { AsType } from '@/types/default-component-props';
import { Box, BoxProps } from '@/components/layout/Box';

type CardProps<T extends AsType = 'div'> = BoxProps<T> & {
  children: React.ReactNode;
};

const Card = <T extends AsType = 'div'>(props: CardProps<T>) => {
  const {
    children,
    className,
    elevation = 3,
    round = 'sm',
    style,
    ...rest
  } = props;

  return (
    <Box
      className={cn('JinniCard', className)}
      elevation={elevation}
      round={round}
      style={style}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
