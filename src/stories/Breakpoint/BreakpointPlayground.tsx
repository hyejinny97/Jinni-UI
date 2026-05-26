import { useState, useEffect } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import useBreakpoint from '@/hooks/useBreakpoint';
import { BreakpointType } from '@/types/breakpoint';
import { ColorType } from '@/types/color';

const BreakpointPlaygroundContent = () => {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const currentBreakpoint = useBreakpoint();

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const colorStyle: Record<BreakpointType, ColorType> = {
    xs: 'red',
    sm: 'yellow',
    md: 'green',
    lg: 'blue',
    xl: 'purple'
  };
  const textColor =
    colorStyle[currentBreakpoint] === 'yellow' ? 'black' : 'white';

  return (
    <Container className="JinniBreakpointPlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '400px'
        }}
      >
        <Text className="typo-title-medium" noMargin>
          Viewport width: {viewportWidth}px
        </Text>
        <Text className="typo-title-medium" noMargin>
          Current breakpoint: '{currentBreakpoint}'
        </Text>
      </Stack>
      <Box
        round="md"
        style={{
          width: '150px',
          height: '150px',
          padding: '16px',
          backgroundColor: colorStyle
        }}
      >
        {Object.entries(colorStyle).map(([bpType, color]) => (
          <Text
            key={bpType}
            className="typo-body-medium"
            style={{
              margin: '3px 0',
              color: textColor
            }}
          >
            {bpType}: '{color}'
          </Text>
        ))}
      </Box>
    </Container>
  );
};

const BreakpointPlayground = () => {
  return (
    <JinniProviderWrapper>
      <BreakpointPlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default BreakpointPlayground;
