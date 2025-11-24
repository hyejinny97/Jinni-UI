import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import RadioGroup from './RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  argTypes: {
    checkedIcon: {
      description: 'checked 됐을 때 나타나는 icon',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    children: {
      description: 'Radio 컴포넌트들',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    color: {
      description: 'checked radio 색상',
      table: {
        type: { summary: 'ColorType' }
      }
    },
    defaultValue: {
      description: '초기에 check된 radio의 value',
      table: {
        type: { summary: `string` },
        defaultValue: { summary: `''` }
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
      description: '하위 모든 radio들에 지정할 name',
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
      description: 'check된 radio의 value',
      table: {
        type: { summary: `string` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const ControlledRadioGroupTemplate = () => {
  const [value, setValue] = useState('red');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Checked color: {value}</Text>
      <RadioGroup name="color" value={value} onChange={handleChange}>
        <Stack spacing={5}>
          <Label content="빨간색">
            <Radio value="red" />
          </Label>
          <Label content="노란색">
            <Radio value="yellow" />
          </Label>
          <Label content="초록색">
            <Radio value="green" />
          </Label>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export const BasicRadioGroup: Story = {
  render: () => (
    <RadioGroup name="color" defaultValue="red">
      <Label content="빨간색">
        <Radio value="red" />
      </Label>
      <Label content="노란색">
        <Radio value="yellow" />
      </Label>
      <Label content="초록색">
        <Radio value="green" />
      </Label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup name="color" defaultValue='red'>
  <Label content="빨간색">
    <Radio value="red" />
  </Label>
  <Label content="노란색">
    <Radio value="yellow" />
  </Label>
  <Label content="초록색">
    <Radio value="green" />
  </Label>
</RadioGroup>`.trim()
      }
    }
  }
};

export const ControlledRadioGroup: Story = {
  render: () => <ControlledRadioGroupTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledRadioGroupTemplate = () => {
  const [value, setValue] = useState('red');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <Text>Checked color: {value}</Text>
      <RadioGroup name="color" value={value} onChange={handleChange}>
        <Stack spacing={5}>
          <Label content="빨간색">
            <Radio value="red" />
          </Label>
          <Label content="노란색">
            <Radio value="yellow" />
          </Label>
          <Label content="초록색">
            <Radio value="green" />
          </Label>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeIcon: Story = {
  render: () => (
    <RadioGroup
      name="color"
      defaultValue="red"
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
          <Radio value="red" />
        </Label>
        <Label content="노란색">
          <Radio value="yellow" />
        </Label>
        <Label content="초록색">
          <Radio value="green" />
        </Label>
      </Stack>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup
  name="color"
  defaultValue="red"
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
      <Radio value="red" />
    </Label>
    <Label content="노란색">
      <Radio value="yellow" />
    </Label>
    <Label content="초록색">
      <Radio value="green" />
    </Label>
  </Stack>
</RadioGroup>`.trim()
      }
    }
  }
};

export const Color: Story = {
  render: () => (
    <RadioGroup name="color" defaultValue="red" color="tertiary">
      <Label content="빨간색">
        <Radio value="red" />
      </Label>
      <Label content="노란색">
        <Radio value="yellow" />
      </Label>
      <Label content="초록색">
        <Radio value="green" />
      </Label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup name="color" defaultValue="red" color="tertiary">
  <Label content="빨간색">
    <Radio value="red" />
  </Label>
  <Label content="노란색">
    <Radio value="yellow" />
  </Label>
  <Label content="초록색">
    <Radio value="green" />
  </Label>
</RadioGroup>`.trim()
      }
    }
  }
};

export const RippleEffect: Story = {
  render: () => (
    <RadioGroup name="color" defaultValue="red" rippleStartLocation="clicked">
      <Label content="빨간색">
        <Radio value="red" />
      </Label>
      <Label content="노란색">
        <Radio value="yellow" />
      </Label>
      <Label content="초록색">
        <Radio value="green" />
      </Label>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      source: {
        code: `<RadioGroup name="color" defaultValue="red" rippleStartLocation="clicked">
  <Label content="빨간색">
    <Radio value="red" />
  </Label>
  <Label content="노란색">
    <Radio value="yellow" />
  </Label>
  <Label content="초록색">
    <Radio value="green" />
  </Label>
</RadioGroup>`.trim()
      }
    }
  }
};
