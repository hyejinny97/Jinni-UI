import './SwitchCustom.scss';
import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof Switch> = {
  component: Switch,
  argTypes: {
    checked: {
      description: 'true이면, check 됨'
    },
    color: {
      description: 'checked switch 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultChecked: {
      description: 'true이면, 기본적으로 check 됨'
    },
    disabled: {
      description: 'true이면, 비활성화 됨'
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    name: {
      description: 'switch name',
      type: 'string'
    },
    onChange: {
      description: 'checked state가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
    },
    required: {
      description: 'true이면, required 처리 됨',
      type: 'boolean'
    },
    rippleColor: {
      description: 'ripple 색상',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: { summary: `'black'` }
      }
    },
    rippleStartLocation: {
      description: 'ripple 시작점',
      table: {
        type: { summary: `'center' | 'clicked'` },
        defaultValue: { summary: `'center'` }
      }
    },
    size: {
      description: 'switch 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | string` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'switch value',
      table: {
        type: { summary: `any` },
        defaultValue: { summary: `'on'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

const ControlledSwitchTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>State: {checked ? 'Checked' : 'Unchecked'}</Text>
      <Switch checked={checked} onChange={handleChange} />
    </Stack>
  );
};

const SwitchWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apps = formData.getAll('app');
    alert(`App Alarm: ${apps.join(', ')}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={15}>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            App Alarm
          </Text>
          <Stack spacing={10}>
            <Label content="Gmail" required>
              <Switch name="app" value="gmail" />
            </Label>
            <Label content="NAVER">
              <Switch name="app" value="naver" />
            </Label>
            <Label content="YouTube">
              <Switch name="app" value="youtube" />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>확인</Button>
      </Stack>
    </form>
  );
};

export const BasicSwitch: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch {...args} />
      <Switch defaultChecked {...args} />
    </Stack>
  )
};

export const ControlledSwitch: Story = {
  render: () => <ControlledSwitchTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSwitchTemplate = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>State: {checked ? 'Checked' : 'Unchecked'}</Text>
      <Switch checked={checked} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const SwitchWithForm: Story = {
  render: () => <SwitchWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SwitchWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apps = formData.getAll('app');
    alert(\`App Alarm: \${apps.join(', ')}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={15}>
        <Box as="fieldset">
          <Text as="legend" className="typo-title-medium">
            App Alarm
          </Text>
          <Stack spacing={10}>
            <Label content="Gmail" required>
              <Switch name="app" value="gmail" />
            </Label>
            <Label content="NAVER">
              <Switch name="app" value="naver" />
            </Label>
            <Label content="YouTube">
              <Switch name="app" value="youtube" />
            </Label>
          </Stack>
        </Box>
        <Button fullWidth>확인</Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch disabled {...args} />
      <Switch defaultChecked disabled {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      <Switch size="sm" defaultChecked {...args} />
      <Switch size="md" defaultChecked {...args} />
      <Switch size="lg" defaultChecked {...args} />
      <Switch size="60px" defaultChecked {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch color="error" defaultChecked {...args} />
      <Switch color="yellow-500" defaultChecked {...args} />
      <Switch color="green" defaultChecked {...args} />
      <Switch color="rgb(10, 20, 30)" defaultChecked {...args} />
    </Stack>
  )
};

export const RippleEffect: Story = {
  render: (args) => (
    <Stack direction="row" spacing={10}>
      <Switch rippleColor="white" {...args} />
      <Switch disableRipple {...args} />
    </Stack>
  )
};

export const Customization: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <Label content="Theme Switch">
        <Switch className="theme-switch" {...args} />
      </Label>
      <Label content="Android Style" style={{ gap: '5px' }}>
        <Switch className="android-style" {...args} />
      </Label>
      <Label content="iOS Style" style={{ gap: '5px' }}>
        <Switch className="ios-style" {...args} />
      </Label>
    </Stack>
  )
};
