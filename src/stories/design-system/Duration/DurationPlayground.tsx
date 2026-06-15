import { useState, useMemo } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import Button from '@/components/Button';
import useJinni from '@/hooks/useJinni';

const DurationPlaygroundContent = () => {
  const { duration } = useJinni();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const longestTime = useMemo<number>(
    () => Math.max(...Object.values(duration).map((time) => parseInt(time))),
    [duration]
  );

  const clickButton = () => {
    setIsAnimating(true);
  };
  const handleTransitionEnd = () => {
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
      clearTimeout(timeoutId);
    }, 500);
  };

  return (
    <Container className="JinniDurationPlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'end',
          alignItems: 'center',
          minWidth: '550px'
        }}
      >
        <Button
          onClick={clickButton}
          disabled={isAnimating}
          color="gray-500"
          style={{
            borderRadius: '10px',
            boxShadow: isAnimating
              ? '0 4px 0 var(--jinni-color-gray-600), 0 3px 5px rgba(0,0,0,0.5)'
              : '0 6px 0 var(--jinni-color-gray-600), 0 6px 10px rgba(0,0,0,0.5)',
            transform: isAnimating ? 'translateY(0)' : 'translateY(-4px)',
            transition: 'box-shadow 0.1s'
          }}
        >
          Go
        </Button>
      </Stack>
      <Grid
        columns={4}
        spacing={10}
        style={{
          justifyItems: 'center',
          alignItems: 'center',
          minWidth: '550px',
          padding: '16px',
          backgroundColor: 'surface-container-lowest',
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      >
        {Object.entries(duration).map(([durationType, durationTime]) => (
          <Box
            key={durationType}
            round="xs"
            style={{
              width: '80%',
              aspectRatio: '1/1',
              border: '1px solid var(--jinni-color-outline-variant)'
            }}
          >
            <Stack
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                borderRadius: 'inherit',
                backgroundColor: isAnimating
                  ? 'inverse-surface'
                  : 'surface-container-lowest',
                transition: isAnimating
                  ? `background-color ${durationTime} ease`
                  : 'none'
              }}
              {...(longestTime === parseInt(durationTime) && {
                onTransitionEnd: handleTransitionEnd
              })}
            >
              <Text
                className="typo-body-medium"
                noMargin
                style={{
                  fontWeight: 500,
                  color: isAnimating ? 'inverse-on-surface' : 'on-surface'
                }}
              >
                {durationType}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{
                  color: 'gray-400'
                }}
              >
                {durationTime}
              </Text>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

const DurationPlayground = () => {
  return (
    <JinniProviderWrapper>
      <DurationPlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default DurationPlayground;
