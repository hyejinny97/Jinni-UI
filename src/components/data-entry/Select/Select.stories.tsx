import { FormEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import { Option, OptionValueType } from './Option';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Chip } from '@/components/data-display/Chip';
import { Button } from '@/components/general/Button';
import { ListItem } from '@/components/data-display/List';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    children: {
      description: 'Option 컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    defaultValue: {
      description: '초기 selected value',
      table: {
        type: { summary: `string | number | Array<string | number>` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    MenuProps: {
      description: 'Menu 컴포넌트의 props',
      table: {
        type: { summary: `MenuProps` }
      }
    },
    multiple: {
      description: 'true이면, multiple selections이 가능함',
      table: {
        type: { summary: `boolean` }
      }
    },
    name: {
      description: 'select name',
      table: {
        type: { summary: `string` }
      }
    },
    onChange: {
      description: 'selected value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, value: string | number | Array<string | number>) => void;`
        }
      }
    },
    placeholder: {
      description: 'input 의 placeholder',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    renderValue: {
      description:
        'selected option의 value와 label을 입력값으로 받아, input 내부 content를 반환하는 함수',
      table: {
        type: {
          summary: `(selectedOption: Array<{ value: string | number, label: React.ReactNode }>) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(selectedOption) => selectedOption.map((option) => option.label).join(', ');`
        }
      }
    },
    required: {
      description: 'true이면, 필수 선택해야 함',
      table: {
        type: { summary: `boolean` }
      }
    },
    value: {
      description: 'selected value',
      table: {
        type: { summary: `string | number | Array<string | number>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: 'option1', label: 'Option1' },
  { value: 'option2', label: 'Option2' },
  { value: 'option3', label: 'Option3' },
  { value: 'option4', label: 'Option4' },
  { value: 'option5', label: 'Option5' }
];

const ControlledSelectTemplate = () => {
  const [value, setValue] = useState<OptionValueType>('');

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectedValue: OptionValueType
  ) => {
    setValue(selectedValue);
  };

  return (
    <>
      <Text>Selected value: {value}</Text>
      <Select value={value} onChange={handleChange}>
        {OPTIONS.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};

const OptionsWithCheckboxTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<OptionValueType[]>([]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    value: OptionValueType[]
  ) => {
    setSelectedValue(value);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      multiple
      renderValue={(selectedOption) =>
        selectedOption
          .map(({ value }) => {
            const idx = OPTIONS.findIndex((option) => option.value === value);
            return OPTIONS[idx].label;
          })
          .join(', ')
      }
      style={{ width: '300px' }}
    >
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value} style={{ width: '300px' }}>
          <Checkbox checked={selectedValue.includes(value)} />
          {label}
        </Option>
      ))}
    </Select>
  );
};

const SelectWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    alert(`color: ${color}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Color"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <Select name="color">
          <Option value="red">Red</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="green">Green</Option>
        </Select>
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

export const BasicSelect: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Select {...args}>
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
        <Select defaultValue="option1" {...args}>
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Stack>
    );
  }
};

export const ControlledSelect: Story = {
  render: () => <ControlledSelectTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSelectTemplate = () => {
  const [value, setValue] = useState<OptionValueType>('');

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectedValue: OptionValueType
  ) => {
    setValue(selectedValue);
  };

  return (
    <>
      <Text>Selected value: {value}</Text>
      <Select value={value} onChange={handleChange}>
        {OPTIONS.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};`.trim()
      }
    }
  }
};

export const Placeholder: Story = {
  render: (args) => (
    <Select placeholder="Select Option" {...args}>
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Select disabled {...args}>
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};

export const MultipleSelect: Story = {
  render: (args) => (
    <Select multiple defaultValue={['option1', 'option2']} {...args}>
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};

export const GroupOption: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        <ListItem className="typo-title-medium">Category 1</ListItem>
        <Option value="Option 1">Option 1</Option>
        <Option value="Option 2">Option 2</Option>
        <Option value="Option 3">Option 3</Option>
        <ListItem className="typo-title-medium">Category 2</ListItem>
        <Option value="Option 4">Option 4</Option>
        <Option value="Option 5">Option 5</Option>
        <Option value="Option 6">Option 6</Option>
      </Select>
    );
  }
};

export const RenderingValuesInChip: Story = {
  render: (args) => {
    return (
      <Select
        multiple
        defaultValue={['option1']}
        renderValue={(selectedOptions) => (
          <Stack
            direction="row"
            spacing={5}
            style={{ width: '100%', overflow: 'visible', flexWrap: 'wrap' }}
          >
            {selectedOptions.map(({ value, label }) => (
              <Chip key={value} variant="subtle-filled">
                {label}
              </Chip>
            ))}
          </Stack>
        )}
        {...args}
      >
        {OPTIONS.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Select
  multiple
  defaultValue={['option1']}
  renderValue={(selectedOptions) => (
    <Stack
      direction="row"
      spacing={5}
      style={{ width: '100%', overflow: 'visible', flexWrap: 'wrap' }}
    >
      {selectedOptions.map(({ value, label }) => (
        <Chip key={value} variant="subtle-filled">
          {label}
        </Chip>
      ))}
    </Stack>
  )}
>
  {OPTIONS.map(({ value, label }) => (
    <Option key={value} value={value}>
      {label}
    </Option>
  ))}
</Select>`.trim()
      }
    }
  }
};

export const OptionWithCheckbox: Story = {
  render: () => <OptionsWithCheckboxTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionsWithCheckboxTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<OptionValueType[]>([]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    value: OptionValueType[]
  ) => {
    setSelectedValue(value);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      multiple
      renderValue={(selectedOption) =>
        selectedOption
          .map(({ value }) => {
            const idx = OPTIONS.findIndex((option) => option.value === value);
            return OPTIONS[idx].label;
          })
          .join(', ')
      }
      style={{ width: '300px' }}
    >
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value} style={{ width: '300px' }}>
          <Checkbox checked={selectedValue.includes(value)} />
          {label}
        </Option>
      ))}
    </Select>
  );
};`.trim()
      }
    }
  }
};

export const SelectWithForm: Story = {
  render: () => <SelectWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SelectWithFormTemplate = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const color = formData.get('color');
    alert(\`color: \${color}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label
        content="Color"
        labelPlacement="top"
        required
        style={{ alignItems: 'start' }}
      >
        <Select name="color">
          <Option value="red">Red</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="green">Green</Option>
        </Select>
      </Label>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', margin: '10px 16px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};`.trim()
      }
    }
  }
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['outlined', 'filled', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <Select
            key={variant}
            variant={variant}
            placeholder={variant}
            {...args}
          >
            {OPTIONS.map(({ value, label }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        )
      )}
    </Stack>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} size={size} placeholder={size} {...args}>
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      ))}
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['error', 'yellow'] as const).map((color) => (
        <Select
          key={color}
          color={color}
          focusedColor={color}
          placeholder={color}
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      ))}
    </Stack>
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '300px' }}>
      <Select fullWidth {...args}>
        {OPTIONS.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => (
    <Select startAdornment="🔅" {...args}>
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};

export const DisableEffects: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Select
          variant="filled"
          placeholder="Disable hover effect"
          disableHoverEffect
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
        <Select
          variant="filled"
          placeholder="Disable focus effect"
          disableFocusEffect
          {...args}
        >
          {OPTIONS.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Stack>
    );
  }
};

export const Dense: Story = {
  render: (args) => (
    <Select MenuProps={{ MenuListProps: { dense: true } }} {...args}>
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};

export const MenuPosition: Story = {
  render: (args) => (
    <Select
      MenuProps={{
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        menuOrigin: { horizontal: 'left', vertical: 'top' }
      }}
      {...args}
    >
      {OPTIONS.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  )
};
