import type { Meta, StoryObj } from '@storybook/react';
import ColorBox from './ColorBox';
import { useState } from 'react';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { ColorValueType, HSBObject } from '../ColorPicker.types';

const meta: Meta<typeof ColorBox> = {
  component: ColorBox,
  argTypes: {
    defaultValue: {
      description: '초기 색상',
      table: {
        type: {
          summary: `#{string} | { r: number; g: number; b: number; a?: number; } | { h: number; s: number; b: number; a?: number; } | CSSColorKeywords | JinniColor | 'transparent'`
        },
        defaultValue: { summary: `'primary'` }
      }
    },
    onChange: {
      description: '색상이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: Event | React.SyntheticEvent, value: { h: number; s: number; b: number; a?: number; }) => void;'
        }
      }
    },
    value: {
      description: '색상',
      table: {
        type: {
          summary: `#{string} | { r: number; g: number; b: number; a?: number; } | { h: number; s: number; b: number; a?: number; } | CSSColorKeywords | JinniColor | 'transparent'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorBox>;

const COLORS: ColorValueType[] = [
  'red',
  'transparent',
  'tertiary',
  'yellow-400',
  '#123999',
  '#1239995f',
  '#135',
  '#135a',
  { r: 233, g: 12, b: 198 },
  { r: 233, g: 12, b: 198, a: 0.4 },
  { h: 180, s: 60, b: 34 },
  { h: 180, s: 60, b: 34, a: 0.6 }
];

const ControlledColorBoxTemplate = () => {
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse(e.target.value) as ColorValueType);
  };
  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setValue(value);
  };

  return (
    <Stack direction="row" spacing={20}>
      <ColorBox value={value} onChange={handleColorChange} />
      <Grid columns={2} columnSpacing={10}>
        <RadioGroup
          name="color"
          value={JSON.stringify(value)}
          onChange={handleRadioChange}
        >
          {COLORS.map((color) => {
            const colorStr = JSON.stringify(color);
            return (
              <Label key={colorStr} content={colorStr}>
                <Radio value={colorStr} size="sm" />
              </Label>
            );
          })}
        </RadioGroup>
      </Grid>
    </Stack>
  );
};

export const BasicColorBox: Story = {
  render: (args) => {
    return (
      <Stack direction="row">
        <ColorBox {...args} />
        <ColorBox defaultValue="greenyellow" {...args} />
      </Stack>
    );
  }
};

export const ControlledColorBox: Story = {
  render: () => <ControlledColorBoxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledColorBoxTemplate = () => {
  const [value, setValue] = useState<ColorValueType>(COLORS[0]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(JSON.parse(e.target.value) as ColorValueType);
  };
  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: HSBObject
  ) => {
    setValue(value);
  };

  return (
    <Stack direction="row" spacing={20}>
      <ColorBox value={value} onChange={handleColorChange} />
      <Grid columns={2} columnSpacing={10}>
        <RadioGroup
          name="color"
          value={JSON.stringify(value)}
          onChange={handleRadioChange}
        >
          {COLORS.map((color) => {
            const colorStr = JSON.stringify(color);
            return (
              <Label key={colorStr} content={colorStr}>
                <Radio value={colorStr} size="sm" />
              </Label>
            );
          })}
        </RadioGroup>
      </Grid>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
