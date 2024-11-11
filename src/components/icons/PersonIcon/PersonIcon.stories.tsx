import type { Meta, StoryObj } from '@storybook/react';
import { PersonIcon } from '.';

const meta: Meta<typeof PersonIcon> = {
  component: PersonIcon,
  args: {
    color: 'black'
  },
  argTypes: {
    size: {
      control: 'number'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'black', 'yellow-400']
    }
  }
};

export default meta;
type Story = StoryObj<typeof PersonIcon>;

export const Size: Story = {
  args: {
    size: 100
  }
};

export const Color: Story = {
  args: {
    color: 'yellow-400'
  }
};
