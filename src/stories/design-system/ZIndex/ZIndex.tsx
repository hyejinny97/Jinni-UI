import './ZIndex.scss';
import { useMemo } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Stack from '@/components/Stack';
import Box, { BoxProps } from '@/components/Box';
import Text from '@/components/Text';
import useJinni from '@/hooks/useJinni';
import { BoxShadowType } from '@/types/boxShadow';

type FloatingBoxProps = BoxProps & {
  order: number;
};

const TRANSLATE_Y_SCALE = 35;
const WIDTH_SCALE = 30;

const FloatingBox = (props: FloatingBoxProps) => {
  const { order, style, ...rest } = props;
  const lightness = 50 + 8 * order;
  const width = `calc(100% + ${WIDTH_SCALE * order}px)`;
  const translateY = TRANSLATE_Y_SCALE * order;
  const left = -(WIDTH_SCALE / 2) * order;
  const shadow = Math.min(5 + order, 24) as BoxShadowType;

  return (
    <Box
      className="JinniFloatingBox"
      style={{
        position: 'absolute',
        left: `${left}px`,
        width: `${width}`,
        height: '100%',
        backgroundColor: `hsl(206,68%,${lightness}%)`,
        transform: `translateY(${translateY}px)`,
        boxShadow: shadow,
        textAlign: 'center',
        boxSizing: 'border-box',
        ...style
      }}
      {...rest}
    />
  );
};

const ZIndexContent = () => {
  const { zIndex } = useJinni();
  const groupByZIndex = useMemo(() => {
    const group: Record<number, string[]> = {};
    Object.entries(zIndex).map(([token, value]) => {
      if (group[value]) {
        group[value].push(token);
      } else {
        group[value] = [token];
      }
    });
    return group;
  }, [zIndex]);
  const count = Object.keys(groupByZIndex).length;

  return (
    <Container
      className="JinniZIndex"
      style={{
        justifyContent: 'start',
        height: `calc(100px + ${(count - 1) * TRANSLATE_Y_SCALE}px)`,
        boxSizing: 'content-box'
      }}
    >
      <Box
        style={{
          position: 'relative',
          width: '300px',
          height: '100px'
        }}
      >
        {Object.entries(groupByZIndex).map(([value, tokenGroup], idx) => (
          <FloatingBox key={value} order={idx} style={{ zIndex: value }}>
            <Stack
              direction="row"
              spacing={15}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              {tokenGroup.map((token) => (
                <Stack
                  direction="row"
                  spacing={5}
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Text className="typo-title-medium" noMargin>
                    {token}
                  </Text>
                  <Text
                    className="typo-label-medium"
                    noMargin
                    style={{ color: 'gray-600' }}
                  >
                    ({value})
                  </Text>
                </Stack>
              ))}
            </Stack>
          </FloatingBox>
        ))}
      </Box>
    </Container>
  );
};

const ZIndex = () => {
  return (
    <JinniProviderWrapper>
      <ZIndexContent />
    </JinniProviderWrapper>
  );
};

export default ZIndex;
