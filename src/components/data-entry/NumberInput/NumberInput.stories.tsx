import './CustomNumberInput.scss';
import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput, DecreaseButton, IncreaseButton } from '.';
import { Text } from '@/components/general/Text';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof NumberInput> = {
  component: NumberInput,
  argTypes: {
    defaultValue: {
      description: '초기 input value',
      table: {
        type: { summary: `number | ''` },
        defaultValue: { summary: `''` }
      }
    },
    disableClampOnBlur: {
      description: 'true이면, 입력란이 blur될 때 clamp effect가 비활성화 됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    formatter: {
      description: `''(empty string)이나 숫자 타입의 value를 입력값으로 받아 입력란에 나타낼 문자열을 렌더하는 함수`,
      table: {
        type: { summary: `function (value: number | '') => string;` },
        defaultValue: { summary: `(value: number | '') => \`\${value}\`;` }
      }
    },
    max: {
      description: `input value 최댓값`,
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `Number.MAX_SAFE_INTEGER` }
      }
    },
    min: {
      description: `input value 최솟값`,
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `Number.MIN_SAFE_INTEGER` }
      }
    },
    onChange: {
      description: `input value가 변경됐을 때 호출되는 함수`,
      table: {
        type: {
          summary: `function (event: React.SyntheticEvent | Event, value: number | '') => void;`
        }
      }
    },
    parser: {
      description: `입력란에 나타낸 문자열을 ''(empty string)이나 숫자 타입의 value로 변환하는 함수`,
      table: {
        type: { summary: `function (value: string) => number | '';` },
        defaultValue: {
          summary: `function (value: string) => value === '' ? '' : Number(value);`
        }
      }
    },
    step: {
      description: `value step`,
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `1` }
      }
    },
    value: {
      description: 'input value',
      table: {
        type: { summary: `number | ''` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

const ControlledNumberInputTemplate = () => {
  const [value, setValue] = useState<number | ''>('');

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | ''
  ) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Text>value: {value}</Text>
      <NumberInput value={value} onChange={handleChange} placeholder="숫자" />
    </Stack>
  );
};

const NumberInputWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const purchaseAmount = formData.get('purchase-amount');
    alert(`purchase amount: ${purchaseAmount}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Purchase Amount"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <NumberInput name="purchase-amount" placeholder="구매량" min={0} />
      </Label>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', margin: '10px 16px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};

export const BasicNumberInput: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput {...args} />
        <NumberInput defaultValue={15} {...args} />
      </Stack>
    );
  }
};

export const ControlledNumberInput: Story = {
  render: () => <ControlledNumberInputTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledNumberInputTemplate = () => {
  const [value, setValue] = useState<number | ''>('');

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | ''
  ) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Text>value: {value}</Text>
      <NumberInput value={value} onChange={handleChange} placeholder="숫자" />
    </Stack>
  );
}`.trim()
      }
    }
  }
};

export const Step: Story = {
  render: (args) => <NumberInput step={3} {...args} />
};

export const MinimumAndMaximumValue: Story = {
  render: (args) => <NumberInput min={10} max={30} {...args} />
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput variant="outlined" placeholder="outlined" {...args} />
        <NumberInput variant="filled" placeholder="filled" {...args} />
        <NumberInput variant="underlined" placeholder="underlined" {...args} />
        <NumberInput variant="borderless" placeholder="borderless" {...args} />
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput size="sm" placeholder="sm" {...args} />
        <NumberInput size="md" placeholder="md" {...args} />
        <NumberInput size="lg" placeholder="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput
          variant="outlined"
          placeholder="outlined"
          disabled
          {...args}
        />
        <NumberInput variant="filled" placeholder="filled" disabled {...args} />
        <NumberInput
          variant="underlined"
          placeholder="underlined"
          disabled
          {...args}
        />
        <NumberInput
          variant="borderless"
          placeholder="borderless"
          disabled
          {...args}
        />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput
          color="error"
          focusedColor="error"
          placeholder="error"
          {...args}
        />
        <NumberInput
          color="yellow-400"
          focusedColor="yellow-400"
          placeholder="yellow-400"
          {...args}
        />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <NumberInput placeholder="Full Width" fullWidth {...args} />
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => <NumberInput startAdornment="💰" {...args} />
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <NumberInput
          variant="filled"
          placeholder="Disable hover effect"
          disableHoverEffect
          {...args}
        />
        <NumberInput
          variant="filled"
          placeholder="Disable focus effect"
          disableFocusEffect
          {...args}
        />
      </Stack>
    );
  }
};

export const NumberInputWithForm: Story = {
  render: () => <NumberInputWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NumberInputWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const purchaseAmount = formData.get('purchase-amount');
    alert(\`purchase amount: \${purchaseAmount}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Purchase Amount"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <NumberInput name="purchase-amount" placeholder="구매량" min={0} />
      </Label>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', margin: '10px 16px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};
`.trim()
      }
    }
  }
};

export const AllowingOutOfRangeValues: Story = {
  render: (args) => (
    <NumberInput min={10} max={30} disableClampOnBlur {...args} />
  )
};

export const Percent: Story = {
  render: (args) => (
    <NumberInput
      defaultValue={0}
      min={0}
      max={100}
      formatter={(value: number | '') => (value === '' ? '' : `${value}%`)}
      parser={(value: string) => {
        const parsedValue = value.replace(/%/, '');
        return parsedValue === '' ? '' : Number(parsedValue);
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<NumberInput
  defaultValue={0}
  min={0}
  max={100}
  formatter={(value: number | '') => (value === '' ? '' : \`\${value}%\`)}
  parser={(value: string) => {
    const parsedValue = value.replace(/%/, '');
    return parsedValue === '' ? '' : Number(parsedValue);
  }}
/>`.trim()
      }
    }
  }
};

export const Currency: Story = {
  render: (args) => (
    <NumberInput
      defaultValue={1000000}
      formatter={(value: number | '') => `$ ${value.toLocaleString('en-US')}`}
      parser={(value: string) => {
        const parsedValue = value.replace(/[^0-9.-]/g, '');
        return parsedValue === '' ? '' : Number(parsedValue);
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<NumberInput
  defaultValue={1000000}
  formatter={(value: number | '') => \`$ \${value.toLocaleString('en-US')}\`}
  parser={(value: string) => {
    const parsedValue = value.replace(/[^0-9.-]/g, '');
    return parsedValue === '' ? '' : Number(parsedValue);
  }}
/>`.trim()
      }
    }
  }
};

export const MobileSpinButton: Story = {
  render: (args) => (
    <NumberInput
      className="spin-button-within-input"
      startAdornment={
        <DecreaseButton style={{ flex: 1, alignItems: 'center' }} />
      }
      endAdornment={
        <IncreaseButton style={{ flex: 1, alignItems: 'center' }} />
      }
      {...args}
    />
  )
};
