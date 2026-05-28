import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Grid } from '@/components/layout/Grid';
import { Box } from '@/components/layout/Box';
import { Tooltip } from '@/components/data-display/Tooltip';
import useJinni from '@/hooks/useJinni';

const WhiteOverlayContent = () => {
  const { whiteOverlay } = useJinni();

  return (
    <Container
      className="JinniWhiteOverlay"
      style={{ backgroundColor: 'black' }}
    >
      <Grid rows={5} columns={5} spacing={10}>
        {Object.entries(whiteOverlay).map(([overlayType, overlay]) => (
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
                color: 'white'
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

const WhiteOverlay = () => {
  return (
    <JinniProviderWrapper>
      <WhiteOverlayContent />
    </JinniProviderWrapper>
  );
};

export default WhiteOverlay;
