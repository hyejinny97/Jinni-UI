import Container from '../_share/Container';
import JinniProviderWrapper from '../_share/JinniProviderWrapper';
import { useState } from 'react';
import Label from '@/components/Label';
import ColorPicker, {
  HSBObject,
  isHsbObject,
  hsbObjToHex
} from '@/components/ColorPicker';
import { HEX } from '@/types/color';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import useJinni from '@/hooks/useJinni';
import { toRgbaObject } from '@/utils/colorFormat';

const OverlayPlaygroundContent = () => {
  const { overlayAlpha } = useJinni();
  const [backgroundColor, setBackgroundColor] = useState<HSBObject | HEX>(
    '#fff'
  );
  const [overlayColor, setOverlayColor] = useState<HSBObject | HEX>('#000');

  const bgColorInHex: HEX = isHsbObject(backgroundColor)
    ? hsbObjToHex(backgroundColor)
    : backgroundColor;
  const olColorInHex: HEX = isHsbObject(overlayColor)
    ? hsbObjToHex(overlayColor)
    : overlayColor;
  const { r, g, b } = toRgbaObject(olColorInHex);

  const changeBackgroundColor = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setBackgroundColor(value);
  };
  const changeOverlayColor = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setOverlayColor(value);
  };

  return (
    <Container className="JinniOverlayPlayground" style={{ gap: '30px' }}>
      <Stack
        direction="row"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '400px'
        }}
      >
        <Label
          content={<Text className="typo-body-medium">Background Color</Text>}
          labelPlacement="start"
          style={{ gap: '10px' }}
        >
          <ColorPicker
            value={backgroundColor}
            onChange={changeBackgroundColor}
          />
        </Label>
        <Label
          content={<Text className="typo-body-medium">Overlay Color</Text>}
          labelPlacement="start"
          style={{ gap: '10px' }}
        >
          <ColorPicker value={overlayColor} onChange={changeOverlayColor} />
        </Label>
      </Stack>
      <Grid rows={5} columns={5} spacing={10}>
        {Object.entries(overlayAlpha).map(([overlayType, alpha]) => (
          <Tooltip content={alpha} offset={5} arrow>
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
                backgroundImage: `linear-gradient(rgba(${r},${g},${b},${alpha}))`,
                backgroundColor: bgColorInHex
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

const OverlayPlayground = () => {
  return (
    <JinniProviderWrapper>
      <OverlayPlaygroundContent />
    </JinniProviderWrapper>
  );
};

export default OverlayPlayground;
