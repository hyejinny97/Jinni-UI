import type { Meta, StoryObj } from '@storybook/react';
import ColorBox from './ColorBox';
import { useState } from 'react';
import { ColorType } from '@/types/color';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { RgbaObject } from '@/utils/colorFormat';

const meta: Meta<typeof ColorBox> = {
  component: ColorBox,
  argTypes: {
    defaultValue: {
      description: '초기 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    onChange: {
      description: '색상(value)이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: Event | React.SyntheticEvent, value: RgbaObject) => void;'
        }
      }
    },
    value: {
      description: '색상',
      table: {
        type: { summary: 'ColorType' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorBox>;

const DynamicColorBox = () => {
  const [value, setValue] = useState<ColorType>();

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as ColorType);
  };

  const handleColorChange = (
    _: Event | React.SyntheticEvent,
    value: RgbaObject
  ) => {
    const { r, g, b, a } = value;
    setValue(`rgba(${r},${g},${b},${a})`);
  };

  return (
    <Stack direction="row" spacing={20}>
      <ColorBox value={value} onChange={handleColorChange} />
      <Grid columns={2} columnSpacing={10}>
        {[
          'tertiary',
          'transparent',
          'red',
          'yellow-400',
          '#123999',
          '#12399988',
          '#135',
          '#135c',
          'rgb(233,12,198)',
          'rgba(233,12,198,0.4)',
          'hsl(180,60%,34%)',
          'hsla(180,60%,34%,0.6)'
        ].map((color) => (
          <RadioLabel key={color} label={color}>
            <Radio
              value={color}
              checked={value === color}
              onChange={handleRadioChange}
              size="sm"
            />
          </RadioLabel>
        ))}
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
  render: (args) => {
    return <DynamicColorBox {...args} />;
  }
};
