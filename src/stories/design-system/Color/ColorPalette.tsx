import { useState, useMemo } from 'react';
import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import ButtonBase from '@/components/ButtonBase';
import Tooltip from '@/components/Tooltip';
import Toast, { ToastProps } from '@/components/Toast';
import { DEFAULT_COLOR_PALETTE } from '@/constants/color';
import { HEX } from '@/types/color';

const ColorTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      className="typo-title-medium"
      noMargin
      style={{ color: 'on-surface' }}
    >
      {children}
    </Text>
  );
};

const ColorBox = ({ color }: { color: HEX }) => {
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
  const copyToClipboard = async (color: HEX) => {
    try {
      await navigator.clipboard.writeText(color);
      openToast(`[${color}] Copied to clipboard 🎉`);
    } catch {
      openToast(`[${color}] Clipboard copy failed 😥`);
    }
  };

  return (
    <>
      <Tooltip content={color} offset={5} arrow>
        <ButtonBase
          elevation={0}
          disableOverlay
          disableRipple
          onClick={() => copyToClipboard(color)}
          style={{
            display: 'inline-block',
            width: '35px',
            height: '35px',
            backgroundColor: color,
            borderRadius: '4px'
          }}
        />
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

const ColorPaletteContent = () => {
  const { colorTypes, colorSteps, colorValueData } = useMemo(() => {
    const colorValueData: HEX[][] = [];
    const colorSteps = new Set<string>(['']);
    const colorTypes = new Set<string>();
    let lastType: string | null = null;

    Object.entries(DEFAULT_COLOR_PALETTE).forEach(([name, value]) => {
      const [colorType, colorStep] = name.split('-');
      if (lastType && name.startsWith(lastType)) {
        colorValueData[colorValueData.length - 1].push(value);
      } else {
        colorTypes.add(colorType);
        lastType = colorType;
        colorValueData.push([value]);
      }
      if (!colorSteps.has(colorStep)) {
        colorSteps.add(colorStep);
      }
    });

    return {
      colorTypes: Array.from(colorTypes),
      colorSteps: Array.from(colorSteps),
      colorValueData
    };
  }, []);

  return (
    <Container
      className="JinniColorPalette"
      style={{ backgroundColor: 'surface-container-lowest' }}
    >
      <Grid
        columns={12}
        spacing={15}
        style={{
          justifyItems: 'center',
          alignItems: 'center',
          gridTemplateColumns: 'repeat(12, auto)'
        }}
      >
        {colorSteps.map((colorStep) => (
          <ColorTitle key={colorStep}>{colorStep}</ColorTitle>
        ))}
        {colorValueData.map((row, rowIdx) => (
          <>
            <ColorTitle key={rowIdx}>{colorTypes[rowIdx]}</ColorTitle>
            {row.map((value) => (
              <ColorBox key={value} color={value} />
            ))}
          </>
        ))}
      </Grid>
    </Container>
  );
};

const ColorPalette = () => {
  return (
    <JinniProviderWrapper>
      <ColorPaletteContent />
    </JinniProviderWrapper>
  );
};

export default ColorPalette;
