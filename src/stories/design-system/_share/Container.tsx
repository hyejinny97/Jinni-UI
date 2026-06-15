import cn from 'classnames';
import Box, { BoxProps } from '@/components/Box';

const Container = (props: BoxProps) => {
  const { children, className, style, ...rest } = props;

  return (
    <Box
      className={cn('JinniContainer', 'sb-unstyled', className)}
      round="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px 20px',
        backgroundColor: 'surface',
        boxShadow: 3,
        ...style
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Container;
