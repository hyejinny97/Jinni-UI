import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { JinniProvider } from '@/components/_share/JinniProvider';
import { DEFAULT_DESIGN_SYSTEM } from '@/components/_share/JinniProvider/JinniProvider.constants';
import { Switch } from '@/components/data-entry/Switch';
import { SwitchLabel } from '@/components/data-entry/SwitchLabel';
import { Text, TextProps } from '@/components/general/Text';
import { AsType } from '@/types/default-component-props';
import { Avatar } from '@/components/data-display/Avatar';
import dogImage1 from '@/assets/images/dog-1.jpg';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  argTypes: {
    animation: {
      description: '애니메이션 타입',
      table: {
        type: { summary: `'pulse' | 'wave' | 'none'` },
        defaultValue: { summary: `'pulse'` }
      }
    },
    height: {
      description: 'skeleton 높이',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: `children ? 'auto' : '1em'` }
      }
    },
    variant: {
      description: 'skeleton 모양 (border-radius 결정)',
      table: {
        type: { summary: `'rectangular' | 'rounded' | 'circular'` },
        defaultValue: { summary: `'rounded'` }
      }
    },
    width: {
      description: 'skeleton 너비',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: `children ? 'auto' : '100%'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const ColorByThemeWithSwitch = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [wave, setWave] = useState(false);

  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(e.target.checked);
  };
  const changeAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWave(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={2} spacing={20}>
        <SwitchLabel label="Dark Theme">
          <Switch checked={darkTheme} onChange={changeTheme} />
        </SwitchLabel>
        <SwitchLabel label="Wave animation">
          <Switch checked={wave} onChange={changeAnimation} />
        </SwitchLabel>
      </Grid>
      <JinniProvider
        designSystem={{
          ...DEFAULT_DESIGN_SYSTEM,
          theme: darkTheme ? 'dark' : 'light'
        }}
      >
        <Stack
          spacing={20}
          style={{
            minWidth: '500px',
            padding: '16px',
            backgroundColor: darkTheme ? 'black' : 'white'
          }}
        >
          <Skeleton variant="rectangular" animation={wave ? 'wave' : 'pulse'} />
          <Skeleton variant="rounded" animation={wave ? 'wave' : 'pulse'} />
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation={wave ? 'wave' : 'pulse'}
          />
        </Stack>
      </JinniProvider>
    </Stack>
  );
};

const Typo = <T extends AsType = 'p'>({
  loading,
  children,
  ...rest
}: TextProps<T> & {
  loading?: boolean;
}) => {
  return (
    <Text noMargin style={{ textAlign: 'right' }} {...rest}>
      {loading ? <Skeleton /> : children}
    </Text>
  );
};

const SkeltonInferringParent = () => {
  return (
    <Grid columns={2} spacing={20}>
      <Stack spacing={10} style={{ width: '300px' }}>
        <Typo as="h1">h1</Typo>
        <Typo as="h2">h2</Typo>
        <Typo as="h3">h3</Typo>
        <Typo as="p">p</Typo>
        <Typo className="typo-headline-medium">headline-medium</Typo>
        <Typo className="typo-title-medium">title-medium</Typo>
        <Typo className="typo-body-medium">body-medium</Typo>
      </Stack>
      <Stack spacing={10} style={{ width: '200px' }}>
        <Typo as="h1" loading>
          h1
        </Typo>
        <Typo as="h2" loading>
          h2
        </Typo>
        <Typo as="h3" loading>
          h3
        </Typo>
        <Typo as="p" loading>
          p
        </Typo>
        <Typo className="typo-headline-medium" loading>
          headline-medium
        </Typo>
        <Typo className="typo-title-medium" loading>
          title-medium
        </Typo>
        <Typo className="typo-body-medium" loading>
          body-medium
        </Typo>
      </Stack>
    </Grid>
  );
};

const Card = ({ loading }: { loading?: boolean }) => {
  return (
    <Stack spacing={10}>
      <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <Avatar src={dogImage1} alt="강아지" />
        )}
        {loading ? (
          <Skeleton>
            <Text className="typo-title-medium" noMargin>
              Short Title
            </Text>
          </Skeleton>
        ) : (
          <Text className="typo-title-medium" noMargin>
            Skeleton
          </Text>
        )}
      </Stack>
      {loading ? (
        <Skeleton>
          <div style={{ height: '100px' }} />
        </Skeleton>
      ) : (
        `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
            asperiores ullam consequuntur inventore accusantium neque eius
            debitis similique architecto omnis, minima quo fugiat ad possimus
            incidunt excepturi odit magni aliquid?`
      )}
    </Stack>
  );
};

const SkeletonInferringChildren = () => {
  return (
    <Grid columns={2} spacing={20}>
      <Card />
      <Card loading />
    </Grid>
  );
};

export const BasicSkeleton: Story = {
  render: (args) => (
    <Stack spacing={10} style={{ minWidth: '500px' }}>
      <Skeleton {...args} />
      <Skeleton width="50%" height={10} {...args} />
    </Stack>
  )
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={10} style={{ minWidth: '500px' }}>
      <Skeleton variant="rectangular" {...args} />
      <Skeleton variant="rounded" {...args} />
      <Skeleton variant="circular" width={50} height={50} {...args} />
    </Stack>
  )
};

export const Animations: Story = {
  render: (args) => (
    <Stack spacing={10} style={{ minWidth: '500px' }}>
      <Skeleton animation="pulse" {...args} />
      <Skeleton animation="wave" {...args} />
      <Skeleton animation="none" {...args} />
    </Stack>
  )
};

export const ColorByTheme: Story = {
  render: () => <ColorByThemeWithSwitch />,
  parameters: {
    docs: {
      source: {
        code: `const ColorByThemeWithSwitch = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [wave, setWave] = useState(false);

  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(e.target.checked);
  };
  const changeAnimation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWave(e.target.checked);
  };

  return (
    <Stack spacing={20}>
      <Grid columns={2} spacing={20}>
        <SwitchLabel label="Dark Theme">
          <Switch checked={darkTheme} onChange={changeTheme} />
        </SwitchLabel>
        <SwitchLabel label="Wave animation">
          <Switch checked={wave} onChange={changeAnimation} />
        </SwitchLabel>
      </Grid>
      <JinniProvider
        designSystem={{
          ...DEFAULT_DESIGN_SYSTEM,
          theme: darkTheme ? 'dark' : 'light'
        }}
      >
        <Stack
          spacing={20}
          style={{
            minWidth: '500px',
            padding: '16px',
            backgroundColor: darkTheme ? 'black' : 'white'
          }}
        >
          <Skeleton variant="rectangular" animation={wave ? 'wave' : 'pulse'} />
          <Skeleton variant="rounded" animation={wave ? 'wave' : 'pulse'} />
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            animation={wave ? 'wave' : 'pulse'}
          />
        </Stack>
      </JinniProvider>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeColor: Story = {
  render: (args) => (
    <Stack style={{ minWidth: '500px' }}>
      <Skeleton style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }} {...args} />
    </Stack>
  )
};

export const InferringParent: Story = {
  render: () => <SkeltonInferringParent />,
  parameters: {
    docs: {
      source: {
        code: `const Typo = <T extends AsType = 'p'>({
  loading,
  children,
  ...rest
}: TextProps<T> & {
  loading?: boolean;
}) => {
  return (
    <Text noMargin style={{ textAlign: 'right' }} {...rest}>
      {loading ? <Skeleton /> : children}
    </Text>
  );
};

const SkeltonInferringParent = () => {
  return (
    <Grid columns={2} spacing={20}>
      <Stack spacing={10} style={{ width: '300px' }}>
        <Typo as="h1">h1</Typo>
        <Typo as="h2">h2</Typo>
        <Typo as="h3">h3</Typo>
        <Typo as="p">p</Typo>
        <Typo className="typo-headline-medium">headline-medium</Typo>
        <Typo className="typo-title-medium">title-medium</Typo>
        <Typo className="typo-body-medium">body-medium</Typo>
      </Stack>
      <Stack spacing={10} style={{ width: '200px' }}>
        <Typo as="h1" loading>
          h1
        </Typo>
        <Typo as="h2" loading>
          h2
        </Typo>
        <Typo as="h3" loading>
          h3
        </Typo>
        <Typo as="p" loading>
          p
        </Typo>
        <Typo className="typo-headline-medium" loading>
          headline-medium
        </Typo>
        <Typo className="typo-title-medium" loading>
          title-medium
        </Typo>
        <Typo className="typo-body-medium" loading>
          body-medium
        </Typo>
      </Stack>
    </Grid>
  );
};`.trim()
      }
    }
  }
};

export const InferringChildren: Story = {
  render: () => <SkeletonInferringChildren />,
  parameters: {
    docs: {
      source: {
        code: `const Card = ({ loading }: { loading?: boolean }) => {
  return (
    <Stack spacing={10}>
      <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <Avatar src={dogImage1} alt="강아지" />
        )}
        {loading ? (
          <Skeleton>
            <Text className="typo-title-medium" noMargin>
              Short Title
            </Text>
          </Skeleton>
        ) : (
          <Text className="typo-title-medium" noMargin>
            Skeleton
          </Text>
        )}
      </Stack>
      {loading ? (
        <Skeleton>
          <div style={{ height: '100px' }} />
        </Skeleton>
      ) : (
        \`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
            asperiores ullam consequuntur inventore accusantium neque eius
            debitis similique architecto omnis, minima quo fugiat ad possimus
            incidunt excepturi odit magni aliquid?\`
      )}
    </Stack>
  );
};

const SkeletonInferringChildren = () => {
  return (
    <Grid columns={2} spacing={20}>
      <Card />
      <Card loading />
    </Grid>
  );
};`.trim()
      }
    }
  }
};
