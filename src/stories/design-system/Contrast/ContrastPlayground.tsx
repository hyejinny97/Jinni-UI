import '../_share/ThemeSwitch.scss';
import Container from '../_share/Container';
import ArbitraryComponents from '../_share/ArbitraryComponents';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Switch } from '@/components/data-entry/Switch';
import { Select, Option } from '@/components/data-entry/Select';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import useJinni from '@/hooks/useJinni';

type ContrastType = 'standard' | 'medium' | 'high';

const ContrastPlaygroundContent = () => {
  const { theme, contrast, changeTheme, changeContrast } = useJinni();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isDarkMode = event.target.checked;
    changeTheme(isDarkMode ? 'dark' : 'light');
  };
  const handleContrastChange = (
    _: Event | React.SyntheticEvent,
    value: string | number
  ) => {
    changeContrast(value as ContrastType);
  };

  return (
    <Container className="JinniContrastPlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '550px'
        }}
      >
        <Text noMargin style={{ typography: 'title-medium' }}>
          Current contrast: '{contrast}'
        </Text>
        <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
          <Switch
            className="JinniThemeSwitch"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
          <Select value={contrast} onChange={handleContrastChange} size="sm">
            <Option value="standard">Standard</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Stack>
      </Stack>
      <ArbitraryComponents />
    </Container>
  );
};

const ContrastPlayground = () => {
  return (
    <JinniProviderWrapper>
      <ContrastPlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default ContrastPlayground;
