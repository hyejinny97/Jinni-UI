import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Button from './Button';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { MailIcon } from '@/components/icons/MailIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CircularProgress } from '@/components/feedback/CircularProgress';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    children: {
      description: '버튼 내부 내용(label)'
    },
    color: {
      description: '버튼 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    endAdornment: {
      description: 'content 뒤에 위치하는 부가 요소 (icon, avatar 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    fullWidth: {
      description: 'true이면, 버튼 너비는 parent의 너비와 동일하게 맞춰짐'
    },
    shape: {
      description: '버튼 모양',
      table: {
        type: { summary: `'pill' | 'rounded'` },
        defaultValue: { summary: `'rounded'` }
      }
    },
    size: {
      description: '버튼 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    startAdornment: {
      description: 'content 앞에 위치하는 부가 요소 (icon, avatar 등)',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    variant: {
      description: '버튼 종류',
      table: {
        type: { summary: `'filled' | 'subtle-filled' | 'outlined' | 'text'` },
        defaultValue: { summary: `'filled'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

const LoadingButtons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Stack direction="row" spacing={20}>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Label'}
      </Button>
      <Button
        startAdornment={isLoading && <CircularProgress progressColor="white" />}
        onClick={handleClick}
        disabled={isLoading}
      >
        Label
      </Button>
      <Button
        variant="outlined"
        endAdornment={
          isLoading ? (
            <CircularProgress progressColor="primary" />
          ) : (
            <PersonIcon color="primary" />
          )
        }
        onClick={handleClick}
        disabled={isLoading}
      >
        Profile
      </Button>
      <Button
        variant="subtle-filled"
        startAdornment={
          isLoading ? (
            <CircularProgress progressColor="primary" />
          ) : (
            <HomeIcon color="primary" />
          )
        }
        onClick={handleClick}
        disabled={isLoading}
        style={{ flexDirection: 'column' }}
      >
        Home
      </Button>
    </Stack>
  );
};

export const BasicButton: Story = {
  render: (args) => <Button {...args}>Label</Button>
};

export const ButtonVariant: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" {...args}>
          Label
        </Button>
        <Button variant="subtle-filled" {...args}>
          Label
        </Button>
        <Button variant="outlined" {...args}>
          Label
        </Button>
        <Button variant="text" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const ButtonShape: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button shape="rounded" {...args}>
          Label
        </Button>
        <Button shape="pill" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const IconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button startAdornment={<MailIcon color="white" />} {...args}>
          Mail
        </Button>
        <Button
          variant="outlined"
          endAdornment={<PersonIcon color="primary" />}
          {...args}
        >
          Profile
        </Button>
        <Button
          variant="subtle-filled"
          startAdornment={<HomeIcon color="primary" />}
          style={{ flexDirection: 'column' }}
          {...args}
        >
          Home
        </Button>
      </Stack>
    );
  }
};

export const LoadingButton: Story = {
  render: () => <LoadingButtons />,
  parameters: {
    docs: {
      source: {
        code: `const LoadingButtons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Stack direction="row" spacing={20}>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Label'}
      </Button>
      <Button
        startAdornment={isLoading && <CircularProgress progressColor="white" />}
        onClick={handleClick}
        disabled={isLoading}
      >
        Label
      </Button>
      <Button
        variant="outlined"
        endAdornment={
          isLoading ? (
            <CircularProgress progressColor="primary" />
          ) : (
            <PersonIcon color="primary" />
          )
        }
        onClick={handleClick}
        disabled={isLoading}
      >
        Profile
      </Button>
      <Button
        variant="subtle-filled"
        startAdornment={
          isLoading ? (
            <CircularProgress progressColor="primary" />
          ) : (
            <HomeIcon color="primary" />
          )
        }
        onClick={handleClick}
        disabled={isLoading}
        style={{ flexDirection: 'column' }}
      >
        Home
      </Button>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const FullWidth: Story = {
  render: (args) => {
    return (
      <Box style={{ width: '500px' }}>
        <Button fullWidth {...args}>
          Label
        </Button>
      </Box>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        {['secondary', 'yellow-400', 'green', '#159', 'rgb(100,100, 100)'].map(
          (color) => (
            <Stack direction="row" spacing={20}>
              {(['filled', 'subtle-filled', 'outlined', 'text'] as const).map(
                (variant) => (
                  <Button variant={variant} color={color} {...args}>
                    Label
                  </Button>
                )
              )}
            </Stack>
          )
        )}
      </Stack>
    );
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button size="sm" {...args}>
          Label
        </Button>
        <Button size="md" {...args}>
          Label
        </Button>
        <Button size="lg" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const ButtonType: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button type="button" {...args}>
          Button
        </Button>
        <Button type="submit" {...args}>
          Submit
        </Button>
        <Button type="reset" {...args}>
          Reset
        </Button>
      </Stack>
    );
  }
};

export const LinkButton: Story = {
  render: (args) => {
    return (
      <Button href="#" {...args}>
        Label
      </Button>
    );
  }
};

export const OverlayColor: Story = {
  render: (args) => {
    return (
      <Button overlayColor="black" {...args}>
        Label
      </Button>
    );
  }
};

export const DisableOverlay: Story = {
  render: (args) => {
    return (
      <Button disableOverlay {...args}>
        Label
      </Button>
    );
  }
};

export const RippleColor: Story = {
  render: (args) => {
    return (
      <Button rippleColor="black" {...args}>
        Label
      </Button>
    );
  }
};

export const RippleLocation: Story = {
  render: (args) => {
    return (
      <Button rippleStartLocation="center" {...args}>
        Label
      </Button>
    );
  }
};

export const DisableRipple: Story = {
  render: (args) => {
    return (
      <Button disableRipple {...args}>
        Label
      </Button>
    );
  }
};

export const Elevation: Story = {
  render: (args) => {
    return (
      <Button elevation={5} {...args}>
        Label
      </Button>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" disabled {...args}>
          Label
        </Button>
        <Button variant="subtle-filled" disabled {...args}>
          Label
        </Button>
        <Button variant="outlined" disabled {...args}>
          Label
        </Button>
        <Button variant="text" disabled {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const CustomButton: Story = {
  render: (args) => {
    return (
      <Button
        shape="pill"
        elevation={3}
        style={{
          padding: '0',
          width: '45px',
          height: '45px',
          background: 'linear-gradient(#e66465, #9198e5)',
          border: 'none'
        }}
        aria-label="add to shopping cart"
        {...args}
      >
        <CartIcon color="white" />
      </Button>
    );
  }
};
