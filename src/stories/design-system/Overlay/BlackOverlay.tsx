import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Grid } from '@/components/layout/Grid';
import Box from '@/components/Box';
import Tooltip from '@/components/Tooltip';
import useJinni from '@/hooks/useJinni';

const BlackOverlayContent = () => {
  const { blackOverlay } = useJinni();

  return (
    <Container
      className="JinniBlackOverlay"
      style={{ backgroundColor: 'white' }}
    >
      <Grid rows={5} columns={5} spacing={10}>
        {Object.entries(blackOverlay).map(([overlayType, overlay]) => (
          <Tooltip content={overlay} offset={5} arrow>
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
                backgroundImage: overlay,
                color: 'black'
              }}
            >
              {overlayType}
            </Box>
          </Tooltip>
        ))}
      </Grid>
    </Container>
  );
};

const BlackOverlay = () => {
  return (
    <JinniProviderWrapper>
      <BlackOverlayContent />
    </JinniProviderWrapper>
  );
};

export default BlackOverlay;
