import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Grid } from '@/components/layout/Grid';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Tooltip } from '@/components/data-display/Tooltip';
import useJinni from '@/hooks/useJinni';

const BoxShadowContent = () => {
  const { boxShadow } = useJinni();

  return (
    <Container className="JinniBoxShadow" style={{ backgroundColor: 'white' }}>
      <Grid rows={5} columns={5} spacing={50}>
        {Object.entries(boxShadow).map(([shadowType, shadowValue]) => (
          <Tooltip
            content={shadowValue.split(/(?<=rgba\([^)]*\),)\s*/).map((val) => (
              <Text
                key={val}
                className="label-small"
                noMargin
                style={{ color: 'white' }}
              >
                {val}
              </Text>
            ))}
            offset={5}
            arrow
          >
            <Box
              className="typo-body-large"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
                aspectRatio: '1/1',
                boxShadow: shadowValue,
                color: 'black'
              }}
            >
              {shadowType}
            </Box>
          </Tooltip>
        ))}
      </Grid>
    </Container>
  );
};

const BoxShadow = () => {
  return (
    <JinniProviderWrapper>
      <BoxShadowContent />
    </JinniProviderWrapper>
  );
};

export default BoxShadow;
