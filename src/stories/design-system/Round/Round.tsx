import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Grid from '@/components/Grid';
import Stack from '@/components/Stack';
import Box from '@/components/Box';
import Text from '@/components/Text';
import useJinni from '@/hooks/useJinni';

const RoundContent = () => {
  const { round } = useJinni();

  return (
    <Container className="JinniRound">
      <Grid columns={4} spacing={20}>
        {Object.entries(round).map(([key, value]) => (
          <Box
            key={key}
            style={{
              width: '100px',
              aspectRatio: '1/1',
              backgroundColor: 'gray-50',
              border: '1px solid var(--jinni-color-gray-300)',
              borderRadius: value
            }}
          >
            <Stack
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Text className="typo-title-medium" noMargin>
                {key}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ color: 'gray-500' }}
              >
                {value}
              </Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

const Round = () => {
  return (
    <JinniProviderWrapper>
      <RoundContent />
    </JinniProviderWrapper>
  );
};

export default Round;
