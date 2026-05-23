import '../_share/ThemeSwitch.scss';
import { useState } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { Switch } from '@/components/data-entry/Switch';
import { Select, Option } from '@/components/data-entry/Select';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Tooltip } from '@/components/data-display/Tooltip';
import { Toast, ToastProps } from '@/components/feedback/Toast';
import { JinniColorScheme } from '@/types/color';
import useJinni from '@/hooks/useJinni';

const KEY_COLORS = [
  ['primary', 'on-primary'],
  ['secondary', 'on-secondary'],
  ['tertiary', 'on-tertiary'],
  ['primary-container', 'on-primary-container'],
  ['secondary-container', 'on-secondary-container'],
  ['tertiary-container', 'on-tertiary-container']
] as const;

const STATUS_COLORS = [
  ['success', 'on-success'],
  ['info', 'on-info'],
  ['warning', 'on-warning'],
  ['error', 'on-error'],
  ['success-container', 'on-success-container'],
  ['info-container', 'on-info-container'],
  ['warning-container', 'on-warning-container'],
  ['error-container', 'on-error-container']
] as const;

const SURFACE_COLORS = [
  ['surface-dim', 'surface', 'surface-bright'],
  [
    'surface-container-lowest',
    'surface-container-low',
    'surface-container',
    'surface-container-high',
    'surface-container-highest'
  ],
  ['on-surface', 'on-surface-variant', 'inverse-surface', 'inverse-on-surface']
] as const;

const OUTLINE_COLORS = ['outline', 'outline-variant'] as const;

type ContrastType = 'standard' | 'medium' | 'high';

type SurfaceColorType = (typeof SURFACE_COLORS)[number][number];

const ColorBox = ({
  colorType,
  contrastColorType,
  colorValue
}: {
  colorType: JinniColorScheme;
  contrastColorType: JinniColorScheme;
  colorValue: string;
}) => {
  const [toastContent, setTostContent] = useState<string | null>(null);
  const open = !!toastContent;

  const openToast = (text: string) => {
    setTostContent(text);
  };
  const closeToast: ToastProps['onClose'] = (_, reason) => {
    if (reason !== 'backgroundClick') {
      setTostContent(null);
    }
  };
  const copyToClipboard = async (colorValue: string) => {
    try {
      await navigator.clipboard.writeText(colorValue);
      openToast(`[${colorValue}] Copied to clipboard 🎉`);
    } catch {
      openToast(`[${colorValue}] Clipboard copy failed 😥`);
    }
  };

  return (
    <>
      <Tooltip content={colorValue} offset={5} arrow>
        <ButtonBase
          elevation={0}
          disableOverlay
          disableRipple
          onClick={() => copyToClipboard(colorValue)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '12px 16px',
            width: '100%',
            backgroundColor: colorType
          }}
        >
          <Text noMargin style={{ color: contrastColorType }}>
            {colorType}
          </Text>
        </ButtonBase>
      </Tooltip>
      <Toast
        key={toastContent}
        message={toastContent}
        open={open}
        onClose={closeToast}
        autoHideDuration={3}
      />
    </>
  );
};

const ColorSchemeContent = () => {
  const {
    color: { scheme },
    theme,
    contrast,
    changeTheme,
    changeContrast
  } = useJinni();

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
  const getContrastColor = (
    surfaceColor: SurfaceColorType
  ): SurfaceColorType => {
    switch (surfaceColor) {
      case 'on-surface':
      case 'on-surface-variant':
        return 'surface';
      case 'inverse-surface':
        return 'inverse-on-surface';
      case 'inverse-on-surface':
        return 'inverse-surface';
      default:
        return 'on-surface';
    }
  };

  return (
    <Container
      className="JinniColorScheme"
      style={{ gap: '30px', backgroundColor: 'surface-container-lowest' }}
    >
      <Stack
        direction="row"
        spacing={10}
        style={{
          justifyContent: 'end',
          alignItems: 'center',
          width: '800px'
        }}
      >
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
      <Stack spacing={20} style={{ width: '800px' }}>
        <Grid columns={3} spacing={10}>
          {KEY_COLORS.map((colorPairs) => {
            const [color1, color2] = colorPairs;
            return (
              <Stack key={color1} spacing={3}>
                <ColorBox
                  colorType={color1}
                  contrastColorType={color2}
                  colorValue={scheme[color1]}
                />
                <ColorBox
                  colorType={color2}
                  contrastColorType={color1}
                  colorValue={scheme[color2]}
                />
              </Stack>
            );
          })}
        </Grid>
        <Grid columns={4} spacing={10}>
          {STATUS_COLORS.map((colorPairs) => {
            const [color1, color2] = colorPairs;
            return (
              <Stack key={color1} spacing={3}>
                <ColorBox
                  colorType={color1}
                  contrastColorType={color2}
                  colorValue={scheme[color1]}
                />
                <ColorBox
                  colorType={color2}
                  contrastColorType={color1}
                  colorValue={scheme[color2]}
                />
              </Stack>
            );
          })}
        </Grid>
        <Grid columns={4} spacing={10}>
          <Stack spacing={3} style={{ gridColumn: 'span 3' }}>
            {SURFACE_COLORS.map((colorPairs) => (
              <Stack key={colorPairs[0]} direction="row" spacing={3}>
                {colorPairs.map((colorType) => (
                  <ColorBox
                    key={colorType}
                    colorType={colorType}
                    contrastColorType={getContrastColor(colorType)}
                    colorValue={scheme[colorType]}
                  />
                ))}
              </Stack>
            ))}
          </Stack>
          <Stack spacing={3}>
            <ColorBox
              colorType={OUTLINE_COLORS[0]}
              contrastColorType="surface"
              colorValue={scheme[OUTLINE_COLORS[0]]}
            />
            <ColorBox
              colorType={OUTLINE_COLORS[1]}
              contrastColorType="surface"
              colorValue={scheme[OUTLINE_COLORS[1]]}
            />
          </Stack>
        </Grid>
      </Stack>
    </Container>
  );
};

const ColorScheme = () => {
  return (
    <JinniProviderWrapper>
      <ColorSchemeContent />
    </JinniProviderWrapper>
  );
};

export default ColorScheme;
