import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Link> = {
  component: Link,
  argTypes: {
    as: {
      defaultValue: { summary: '<a>' }
    },
    children: {
      description: '링크 콘텐츠'
    },
    lineClamp: {
      description: '보여지는 라인 수'
    },
    underline: {
      description: '링크 underline 여부',
      table: {
        type: { summary: 'always | hover | none' },
        defaultValue: { summary: 'always' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Link>;

export const BasicLink: Story = {
  render: (args) => {
    return (
      <Link href="#" {...args}>
        Home
      </Link>
    );
  }
};

export const Typography: Story = {
  render: (args) => {
    return (
      <Link href="#" className="typo-headline-medium" {...args}>
        Home
      </Link>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Link href="#" style={{ color: 'primary' }} {...args}>
        Home
      </Link>
    );
  }
};

export const LineClamp: Story = {
  render: (args) => {
    return (
      <Link href="#" lineClamp={1} style={{ maxWidth: '300px' }} {...args}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam possimus
        dignissimos, consequuntur obcaecati animi dolor labore odio eligendi
        officiis explicabo.
      </Link>
    );
  }
};

export const Underline: Story = {
  render: (args) => {
    return (
      <Stack>
        <Link href="#" underline="always" {...args}>
          Home
        </Link>
        <Link href="#" underline="hover" {...args}>
          Home
        </Link>
        <Link href="#" underline="none" {...args}>
          Home
        </Link>
      </Stack>
    );
  }
};
