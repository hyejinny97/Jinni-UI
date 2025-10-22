import type { Meta, StoryObj } from '@storybook/react';
import Link from './Link';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Link> = {
  component: Link,
  argTypes: {
    as: {
      defaultValue: { summary: 'a' }
    },
    children: {
      description: '링크 콘텐츠'
    },
    href: {
      description: 'url'
    },
    lineClamp: {
      description: '보여지는 라인 수'
    },
    underline: {
      description: 'underline이 나타나는 조건',
      table: {
        type: { summary: `'always' | 'hover' | 'none'` },
        defaultValue: { summary: `'always'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Link>;

export const BasicLink: Story = {
  render: () => {
    return <Link href="#">Home</Link>;
  }
};

export const Typography: Story = {
  render: () => {
    return (
      <Link href="#" className="typo-headline-medium">
        Home
      </Link>
    );
  }
};

export const Color: Story = {
  render: () => {
    return (
      <Link href="#" style={{ color: 'primary' }}>
        Home
      </Link>
    );
  }
};

export const LineClamp: Story = {
  render: () => {
    return (
      <Link href="#" lineClamp={1} style={{ maxWidth: '300px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam possimus
        dignissimos, consequuntur obcaecati animi dolor labore odio eligendi
        officiis explicabo.
      </Link>
    );
  }
};

export const Underline: Story = {
  render: () => {
    return (
      <Stack>
        <Link href="#" underline="always">
          Home
        </Link>
        <Link href="#" underline="hover">
          Home
        </Link>
        <Link href="#" underline="none">
          Home
        </Link>
      </Stack>
    );
  }
};
