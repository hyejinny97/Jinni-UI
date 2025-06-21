import type { Meta, StoryObj } from '@storybook/react';
import ColorField from './ColorField';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { ColorLensIcon } from '@/components/icons/ColorLensIcon';
import { ColorType } from '@/types/color';

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
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ColorField>;

const ColorDomain = ({ value }: { value: ColorType }) => {
  return (
    <Stack spacing={5} style={{ alignItems: 'center' }}>
      <ColorField value={value} />
      <Text className="typo-label-small" style={{ margin: 0 }}>
        {value}
      </Text>
    </Stack>
  );
};

export const BasicColorField: Story = {
  render: (args) => {
    return <ColorField {...args} />;
  }
};

export const ColorValue: Story = {
  render: (args) => {
    return (
      <Grid columns={2} spacing={20} style={{ width: '500px' }}>
        <ColorDomain value="red" {...args} />
        <ColorDomain value="transparent" {...args} />
        <ColorDomain value="primary" {...args} />
        <ColorDomain value="yellow-400" {...args} />
        <ColorDomain value="#123999" {...args} />
        <ColorDomain value="#12399988" {...args} />
        <ColorDomain value="#135" {...args} />
        <ColorDomain value="#135c" {...args} />
        <ColorDomain value="rgb(233, 12, 198)" {...args} />
        <ColorDomain value="rgba(233, 12, 198, 0.4)" {...args} />
        <ColorDomain value="hsl(180, 60%, 34%)" {...args} />
        <ColorDomain value="hsla(180, 60%, 34%, 0.6)" {...args} />
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
    return <ColorField color="yellow-400" {...args} />;
  }
};

export const FullWidth: Story = {
  render: (args) => {
    return <ColorField fullWidth {...args} />;
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
          <div
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'yellowgreen'
            }}
          />
          <Text className="typo-label-small" style={{ margin: 0 }}>
            yellowgreen
          </Text>
        </Stack>
      </ColorField>
    );
  }
};
