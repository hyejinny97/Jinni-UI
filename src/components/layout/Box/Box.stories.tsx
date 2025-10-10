import type { Meta, StoryObj } from '@storybook/react';
import Box, { BoxProps } from './Box';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Box> = {
  component: Box,
  argTypes: {
    children: {
      description: 'content',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    elevation: {
      description: '계층(높낮이)',
      table: {
        type: { summary: 'ElevationLevelType (0~24)' }
      }
    },
    outlined: {
      description: 'true이면, 테두리가 나타남'
    },
    round: {
      description: 'border radius',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Box>;

const CustomBox = ({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) => {
  return (
    <div {...rest} style={{ color: 'yellowgreen', ...style }}>
      {children}
    </div>
  );
};

const SquareBox = (props: BoxProps) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      ...props?.style
    }}
  />
);

export const BasicBox: Story = {
  render: (args) => <Box {...args}>content</Box>
};

export const AsHtmlElement: Story = {
  render: (args) => (
    <Box as="section" {...args}>
      content
    </Box>
  )
};

export const AsComponent: Story = {
  render: (args) => (
    <Box as={CustomBox} {...args}>
      content
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `const CustomBox = ({
  children,
  style,
  ...rest
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
}) => {
  return (
    <div {...rest} style={{ color: 'yellowgreen', ...style }}>
      {children}
    </div>
  );
};

<Box as={CustomBox}>
  content
</Box>
`.trim()
      }
    }
  }
};

export const Customization: Story = {
  render: (args) => (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100px',
        height: '100px',
        backgroundColor: 'gray-100',
        color: 'gray-500'
      }}
      {...args}
    >
      content
    </Box>
  )
};

export const Elevation: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <SquareBox elevation={5}>content</SquareBox>
      <SquareBox elevation={20}>content</SquareBox>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const SquareBox = (props: BoxProps) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      ...props?.style
    }}
  />
);

<Stack direction="row" spacing={50}>
  <SquareBox elevation={5}>content</SquareBox>
  <SquareBox elevation={20}>content</SquareBox>
</Stack>
`.trim()
      }
    }
  }
};

export const Outlined: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <SquareBox outlined>content</SquareBox>
      <SquareBox
        outlined
        style={{ borderColor: 'primary', borderStyle: 'dashed' }}
      >
        content
      </SquareBox>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const SquareBox = (props: BoxProps) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      ...props?.style
    }}
  />
);

<Stack direction="row" spacing={50}>
  <SquareBox outlined>content</SquareBox>
  <SquareBox
    outlined
    style={{ borderColor: 'primary', borderStyle: 'dashed' }}
  >
    content
  </SquareBox>
</Stack>
`.trim()
      }
    }
  }
};

export const Round: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <SquareBox outlined round="sm">
        content
      </SquareBox>
      <SquareBox outlined round="md">
        content
      </SquareBox>
      <SquareBox outlined round="lg">
        content
      </SquareBox>
      <SquareBox outlined round={30}>
        content
      </SquareBox>
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
const SquareBox = (props: BoxProps) => (
  <Box
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      ...props?.style
    }}
  />
);

<Stack direction="row" spacing={50}>
  <SquareBox outlined round="sm">
    content
  </SquareBox>
  <SquareBox outlined round="md">
    content
  </SquareBox>
  <SquareBox outlined round="lg">
    content
  </SquareBox>
  <SquareBox outlined round={30}>
    content
  </SquareBox>
</Stack>
`.trim()
      }
    }
  }
};
