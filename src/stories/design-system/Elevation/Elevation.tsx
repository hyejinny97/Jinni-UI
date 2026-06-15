import cn from 'classnames';
import '../_share/ThemeSwitch.scss';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import Switch from '@/components/Switch';
import useJinni from '@/hooks/useJinni';

const ElevationContent = () => {
  const { elevation, theme, changeTheme } = useJinni();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isDarkMode = event.target.checked;
    changeTheme(isDarkMode ? 'dark' : 'light');
  };

  return (
    <Container
      className="JinniElevation"
      style={{
        gap: '30px',
        backgroundColor: 'surface'
      }}
    >
      <Stack
        direction="row"
        spacing={10}
        style={{
          justifyContent: 'end',
          alignItems: 'center',
          minWidth: '500px'
        }}
      >
        <Switch
          className="JinniThemeSwitch"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
      </Stack>
      <Grid rows={5} columns={5} spacing={50}>
        {Object.keys(elevation).map((level) => (
          <Tooltip
            key={level}
            content={
              <>
                <Text
                  className="label-small"
                  noMargin
                  style={{ color: 'white' }}
                >
                  Box Shadow: {level}
                </Text>
                {theme === 'dark' && (
                  <Text
                    className="label-small"
                    noMargin
                    style={{ color: 'white' }}
                  >
                    White Overlay: {level}
                  </Text>
                )}
              </>
            }
            offset={5}
            arrow
          >
            <Box
              className={cn(`elevation-${level}`, 'typo-body-large')}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px',
                width: '100%',
                aspectRatio: '1/1',
                backgroundColor: 'surface-container-lowest',
                color: 'on-surface'
              }}
            >
              {level}
            </Box>
          </Tooltip>
        ))}
      </Grid>
    </Container>
  );
};

const Elevation = () => {
  return (
    <JinniProviderWrapper>
      <ElevationContent />
    </JinniProviderWrapper>
  );
};

export default Elevation;
