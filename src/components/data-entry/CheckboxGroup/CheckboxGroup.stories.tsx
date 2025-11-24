import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CheckboxGroup from './CheckboxGroup';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  argTypes: {
    checkedIcon: {
      description: 'checked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    children: {
      description: 'Checkbox 컴포넌트들',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'checked checkbox 색상',
      table: {
        type: { summary: 'ColorType' }
      }
    },
    defaultValue: {
      description: '초기에 check된 checkbox의 value',
      table: {
        type: { summary: `Array<string>` },
        defaultValue: { summary: `[]` }
      }
    },
    disableRipple: {
      description: 'true이면, ripple effect가 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    icon: {
      description: 'unchecked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    name: {
      description: '하위 모든 checkbox들에 지정할 name',
      table: {
        type: { summary: 'string' }
      }
    },
    onChange: {
      description: 'checked state가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void'
        }
      }
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
    value: {
      description: 'check된 checkbox의 value',
      table: {
        type: { summary: `Array<string>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const ControlledCheckboxGroupTemplate = () => {
  const [value, setValue] = useState(['red', 'yellow']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setValue((prev) => [...prev, e.target.value]);
    else setValue((prev) => prev.filter((val) => val !== e.target.value));
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Checked color: {value.join(', ')}</Text>
      <CheckboxGroup name="color" value={value} onChange={handleChange}>
        <Stack spacing={5}>
          <Label content="빨간색">
            <Checkbox value="red" />
          </Label>
          <Label content="노란색">
            <Checkbox value="yellow" />
          </Label>
          <Label content="초록색">
            <Checkbox value="green" />
          </Label>
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export const BasicCheckboxGroup: Story = {
  render: () => (
    <CheckboxGroup name="color" defaultValue={['red', 'yellow']}>
      <Label content="빨간색">
        <Checkbox value="red" />
      </Label>
      <Label content="노란색">
        <Checkbox value="yellow" />
      </Label>
      <Label content="초록색">
        <Checkbox value="green" />
      </Label>
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup name="color" defaultValue={['red', 'yellow']}>
  <Label content="빨간색">
    <Checkbox value="red" />
  </Label>
  <Label content="노란색">
    <Checkbox value="yellow" />
  </Label>
  <Label content="초록색">
    <Checkbox value="green" />
  </Label>
</CheckboxGroup>`.trim()
      }
    }
  }
};

export const ControlledCheckboxGroup: Story = {
  render: () => <ControlledCheckboxGroupTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledCheckboxGroupTemplate = () => {
  const [value, setValue] = useState(['red', 'yellow']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setValue((prev) => [...prev, e.target.value]);
    else setValue((prev) => prev.filter((val) => val !== e.target.value));
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Checked color: {value.join(', ')}</Text>
      <CheckboxGroup name="color" value={value} onChange={handleChange}>
        <Stack spacing={5}>
          <Label content="빨간색">
            <Checkbox value="red" />
          </Label>
          <Label content="노란색">
            <Checkbox value="yellow" />
          </Label>
          <Label content="초록색">
            <Checkbox value="green" />
          </Label>
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeIcon: Story = {
  render: () => (
    <CheckboxGroup
      name="color"
      defaultValue={['red']}
      icon={
        <Box
          style={{
            margin: '4px',
            width: '16px',
            height: '16px',
            backgroundColor: 'gray-100',
            borderRadius: '4px'
          }}
        />
      }
      checkedIcon={<CheckIcon />}
    >
      <Stack direction="row" style={{ alignItems: 'center' }}>
        <Label content="빨간색">
          <Checkbox value="red" />
        </Label>
        <Label content="노란색">
          <Checkbox value="yellow" />
        </Label>
        <Label content="초록색">
          <Checkbox value="green" />
        </Label>
      </Stack>
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  name="color"
  defaultValue={['red']}
  icon={
    <Box
      style={{
        margin: '4px',
        width: '16px',
        height: '16px',
        backgroundColor: 'gray-100',
        borderRadius: '4px'
      }}
    />
  }
  checkedIcon={<CheckIcon />}
>
  <Stack direction="row" style={{ alignItems: 'center' }}>
    <Label content="빨간색">
      <Checkbox value="red" />
    </Label>
    <Label content="노란색">
      <Checkbox value="yellow" />
    </Label>
    <Label content="초록색">
      <Checkbox value="green" />
    </Label>
  </Stack>
</CheckboxGroup>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <CheckboxGroup
      name="color"
      defaultValue={['red', 'yellow']}
      color="tertiary"
    >
      <Label content="빨간색">
        <Checkbox value="red" />
      </Label>
      <Label content="노란색">
        <Checkbox value="yellow" />
      </Label>
      <Label content="초록색">
        <Checkbox value="green" />
      </Label>
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  name="color"
  defaultValue={['red', 'yellow']}
  color="tertiary"
>
  <Label content="빨간색">
    <Checkbox value="red" />
  </Label>
  <Label content="노란색">
    <Checkbox value="yellow" />
  </Label>
  <Label content="초록색">
    <Checkbox value="green" />
  </Label>
</CheckboxGroup>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <CheckboxGroup
      name="color"
      defaultValue={['red', 'yellow']}
      rippleStartLocation="clicked"
    >
      <Label content="빨간색">
        <Checkbox value="red" />
      </Label>
      <Label content="노란색">
        <Checkbox value="yellow" />
      </Label>
      <Label content="초록색">
        <Checkbox value="green" />
      </Label>
    </CheckboxGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  name="color"
  defaultValue={['red', 'yellow']}
  rippleStartLocation="clicked"
>
  <Label content="빨간색">
    <Checkbox value="red" />
  </Label>
  <Label content="노란색">
    <Checkbox value="yellow" />
  </Label>
  <Label content="초록색">
    <Checkbox value="green" />
  </Label>
</CheckboxGroup>`.trim()
      }
    }
  }
};
