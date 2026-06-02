import './Typography.scss';
import { useState, useMemo, Fragment } from 'react';
import cn from 'classnames';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import useJinni from '@/hooks/useJinni';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { TypographySpec } from '@/types/typography';

const TypographyContent = () => {
  const { typography } = useJinni();
  const typoSpecs = useMemo<string[]>(
    () => Object.keys(typography['display-large']),
    [typography]
  );
  const [selectedTypo, setSelectedTypo] = useState<string | null>(null);

  return (
    <Container className="JinniTypographyContent">
      <Stack className="container" direction="row" spacing={10}>
        <Stack className="typo-name-box">
          {Object.entries(typography).map(([typo]) => (
            <Box
              key={typo}
              className={cn('typo-name', `typo-${typo}`, {
                selected: typo === selectedTypo
              })}
              round="xs"
              onClick={() => setSelectedTypo(typo)}
            >
              {typo}
            </Box>
          ))}
        </Stack>
        <Grid
          className="typo-spec-box"
          columns={2}
          columnSpacing={10}
          style={{ gridTemplateColumns: 'auto auto' }}
        >
          {typoSpecs.map((spec) => (
            <Fragment key={spec}>
              <span className="typo-spec">{spec}: </span>
              <span className="typo-spec">
                {selectedTypo &&
                  typography[selectedTypo] &&
                  typography[selectedTypo][spec as keyof TypographySpec]}
              </span>
            </Fragment>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

const Typography = () => {
  return (
    <JinniProviderWrapper>
      <TypographyContent />
    </JinniProviderWrapper>
  );
};

export default Typography;
