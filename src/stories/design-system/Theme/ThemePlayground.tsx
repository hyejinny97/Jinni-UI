import '../_share/ThemeSwitch.scss';
import Container from '../_share/Container';
import ArbitraryComponents from '../_share/ArbitraryComponents';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Switch from '@/components/Switch';
import { Stack } from '@/components/layout/Stack';
import Text from '@/components/Text';
import useJinni from '@/hooks/useJinni';

const ThemePlaygroundContent = () => {
  const { theme, changeTheme } = useJinni();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isDarkMode = event.target.checked;
    changeTheme(isDarkMode ? 'dark' : 'light');
  };

  return (
    <Container className="JinniThemePlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '500px'
        }}
      >
        <Text noMargin style={{ typography: 'title-medium' }}>
          Current theme: '{theme}'
        </Text>
        <Switch
          className="JinniThemeSwitch"
          checked={theme === 'dark'}
          onChange={handleThemeChange}
        />
      </Stack>
      <ArbitraryComponents />
    </Container>
  );
};

const ThemePlayground = () => {
  return (
    <JinniProviderWrapper>
      <ThemePlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default ThemePlayground;
