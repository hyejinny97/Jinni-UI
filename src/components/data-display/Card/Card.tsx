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
    outlined = false,
    style,
    ...rest
  } = props;

  return (
    <Box
      className={cn('JinniCard', className)}
      elevation={elevation}
      round={round}
      outlined={outlined}
      style={style}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
