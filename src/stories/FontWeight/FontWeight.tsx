import { Fragment } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Grid } from '@/components/layout/Grid';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import useJinni from '@/hooks/useJinni';

const FontWeightContent = () => {
  const { fontWeight } = useJinni();

  return (
    <Container className="JinniFontWeight">
      <Grid
        columns={2}
        rowSpacing={10}
        columnSpacing={40}
        style={{ gridTemplateColumns: 'auto auto' }}
      >
        {Object.entries(fontWeight).map(([key, value]) => (
          <Fragment key={key}>
            <Stack
              style={{
                display: 'inline-flex',
                alignItems: 'start',
                width: 'max-content'
              }}
            >
              <Text
                className="typo-title-medium"
                noMargin
                style={{ display: 'inline-block', color: 'on-surface' }}
              >
                {key}
              </Text>
              <Text
                className="typo-label-medium"
                noMargin
                style={{ display: 'inline-block', color: 'gray-400' }}
              >
                {value}
              </Text>
            </Stack>
            <Text
              noMargin
              style={{ fontWeight: value, color: 'on-surface-variant' }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo,
              dolorum?
            </Text>
          </Fragment>
        ))}
      </Grid>
    </Container>
  );
};

const FontWeight = () => {
  return (
    <JinniProviderWrapper>
      <FontWeightContent />
    </JinniProviderWrapper>
  );
};

export default FontWeight;
