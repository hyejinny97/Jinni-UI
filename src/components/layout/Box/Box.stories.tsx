import type { Meta, StoryObj } from '@storybook/react';
import Box, { BoxProps } from './Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';

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
        type: {
          summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | number`
        }
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
  render: (args) => (
    <Box style={{ color: 'on-surface' }} {...args}>
      content
    </Box>
  )
};

export const AsHtmlElement: Story = {
  render: (args) => (
    <Box as="section" style={{ color: 'on-surface' }} {...args}>
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
        backgroundColor: 'surface-container-high',
        color: 'on-surface-variant'
      }}
      {...args}
    >
      content
    </Box>
  )
};

export const Elevation: Story = {
  render: () => (
    <Stack direction="row" spacing={50} style={{ color: 'on-surface' }}>
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

<Stack direction="row" spacing={50} style={{ color: 'on-surface' }}>
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
    <Stack direction="row" spacing={50} style={{ color: 'on-surface' }}>
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

<Stack direction="row" spacing={50} style={{ color: 'on-surface' }}>
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
    <Grid columns={3} spacing={20} style={{ color: 'on-surface' }}>
      <SquareBox outlined round="none">
        none
      </SquareBox>
      <SquareBox outlined round="xs">
        xs
      </SquareBox>
      <SquareBox outlined round="sm">
        sm
      </SquareBox>
      <SquareBox outlined round="md">
        md
      </SquareBox>
      <SquareBox outlined round="lg">
        lg
      </SquareBox>
      <SquareBox outlined round="xl">
        xl
      </SquareBox>
      <SquareBox outlined round="xxl">
        xxl
      </SquareBox>
      <SquareBox outlined round="full">
        full
      </SquareBox>
      <SquareBox outlined round={30}>
        number 30
      </SquareBox>
    </Grid>
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

<Grid columns={3} spacing={20} style={{ color: 'on-surface' }}>
  <SquareBox outlined round="none">
    none
  </SquareBox>
  <SquareBox outlined round="xs">
    xs
  </SquareBox>
  <SquareBox outlined round="sm">
    sm
  </SquareBox>
  <SquareBox outlined round="md">
    md
  </SquareBox>
  <SquareBox outlined round="lg">
    lg
  </SquareBox>
  <SquareBox outlined round="xl">
    xl
  </SquareBox>
  <SquareBox outlined round="xxl">
    xxl
  </SquareBox>
  <SquareBox outlined round="full">
    full
  </SquareBox>
  <SquareBox outlined round={30}>
    number 30
  </SquareBox>
</Grid>
`.trim()
      }
    }
  }
};
