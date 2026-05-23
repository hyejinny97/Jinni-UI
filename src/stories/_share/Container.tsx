import cn from 'classnames';
import { Box, BoxProps } from '@/components/layout/Box';

const Container = (props: BoxProps) => {
  const { children, className, style, ...rest } = props;

  return (
    <Box
      className={cn('JinniContainer', 'sb-unstyled', className)}
      elevation={3}
      round="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px',
        backgroundColor: 'surface',
        ...style
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Container;
