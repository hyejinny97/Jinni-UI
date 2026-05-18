import type { Meta, StoryObj } from '@storybook/react';
import ColorField, { ColorBlock } from './ColorField';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { ColorLensIcon } from '@/components/icons/ColorLensIcon';
import { ColorValueType } from '../ColorPicker.types';

const meta: Meta<typeof ColorField> = {
  component: ColorField,
  argTypes: {
    children: {
      description: 'color field content',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: `<ColorBlock />` }
      }
    },
    value: {
      description: '색상',
      table: {
        type: {
          summary: `#{string} | { r: number; g: number; b: number; a?: number; } | { h: number; s: number; b: number; a?: number; } | CSSColorKeywords | JinniColor | 'transparent'`
        },
        defaultValue: { summary: `'primary'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorField>;

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

export const BasicColorField: Story = {
  render: (args) => <ColorField {...args} />
};

export const ColorValue: Story = {
  render: (args) => {
    return (
      <Grid columns={2} spacing={20} style={{ width: '500px' }}>
        {COLORS.map((color) => (
          <Stack
            key={JSON.stringify(color)}
            spacing={5}
            style={{ alignItems: 'center' }}
          >
            <ColorField value={color} {...args} />
            <Text className="typo-label-small" noMargin>
              {JSON.stringify(color)}
            </Text>
          </Stack>
        ))}
      </Grid>
    );
  }
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <ColorField variant="outlined" {...args} />
        <ColorField variant="filled" {...args} />
        <ColorField variant="underlined" {...args} />
        <ColorField variant="borderless" {...args} />
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <ColorField size="sm" {...args} />
        <ColorField size="md" {...args} />
        <ColorField size="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return <ColorField disabled {...args} />;
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <ColorField color="yellow-400" focusedColor="yellow-400" {...args} />
    );
  }
};

export const FullWidth: Story = {
  render: (args) => {
    return (
      <Box style={{ width: '300px' }}>
        <ColorField fullWidth {...args} />
      </Box>
    );
  }
};

export const Adornment: Story = {
  render: (args) => {
    return (
      <ColorField
        startAdornment={<ColorLensIcon color="gray-500" size={24} />}
        {...args}
      />
    );
  }
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <ColorField disableHoverEffect {...args} />
        <ColorField disableFocusEffect {...args} />
      </Stack>
    );
  }
};

export const CustomColorField: Story = {
  render: (args) => {
    return (
      <ColorField {...args}>
        <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
          <ColorBlock
            color="yellowgreen"
            style={{ width: '30px', height: '30px' }}
          />
          <Text className="typo-label-small" noMargin>
            yellowgreen
          </Text>
        </Stack>
      </ColorField>
    );
  }
};
