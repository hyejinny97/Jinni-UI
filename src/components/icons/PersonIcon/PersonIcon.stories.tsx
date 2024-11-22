import type { Meta, StoryObj } from '@storybook/react';
import { PersonIcon } from '.';

const meta: Meta<typeof PersonIcon> = {
  component: PersonIcon,
  argTypes: {
    color: {
      control: { type: 'color' }
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
