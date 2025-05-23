import { FormEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import Option from './Option';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { Chip } from '@/components/data-display/Chip';
import { Button } from '@/components/general/Button';

const meta: Meta<typeof Select> = {
  component: Select,
  argTypes: {
    children: {
      description: '선택지 (Option 컴포넌트들)',
      table: {
        type: { summary: `Array<JSX.Element>` }
      }
    },
    defaultValue: {
      description: '초기 selected value',
      table: {
        type: { summary: `string | Array<string>` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: 'false' }
      }
    },
    InputBaseProps: {
      description: 'InputBase 컴포넌트의 props',
      table: {
        type: { summary: `InputBaseProps` }
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
        type: { summary: `boolean` },
        defaultValue: { summary: 'false' }
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
          summary: `(event: Event | React.SyntheticEvent, value: string | Array<string>) => void;`
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
        'selected value를 입력값으로 받아, input 내부 content를 반환하는 함수',
      table: {
        type: { summary: `(value: string | Array<string>) => void` },
        defaultValue: {
          summary: `(value: string | Array<string>) => Array.isArray(value) ? value.join(', ') : value`
        }
      }
    },
    value: {
      description: 'selected value',
      table: {
        type: { summary: `string | Array<string>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5'];

const Form = ({ children }: { children: React.ReactNode }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.getAll('options');
    alert(`value: ${value}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      {children}
      <Button>submit</Button>
    </form>
  );
};

const SelectTemplate = ({ ...props }) => {
  return (
    <Select {...props}>
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const MultipleSelectTemplate = ({ ...props }) => {
  return (
    <Select multiple InputBaseProps={{ style: { width: '300px' } }} {...props}>
      {options.map((option) => (
        <Option
          key={option}
          value={option}
          style={{ width: '300px', boxSizing: 'border-box' }}
        >
          {option}
        </Option>
      ))}
    </Select>
  );
};

const ControlledSelectTemplate = () => {
  const [value, setValue] = useState<string>();

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectValue: string
  ) => {
    setValue(selectValue);
  };

  return <SelectTemplate value={value} onChange={handleChange} />;
};

const ControlledMultipleSelectTemplate = () => {
  const [value, setValue] = useState<string[]>();

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectValue: string[]
  ) => {
    setValue(selectValue);
  };

  return (
    <MultipleSelectTemplate
      value={value}
      onChange={handleChange}
      placeholder="controlled select"
    />
  );
};

const WithLabelAndTextTemplate = () => {
  const [value, setValue] = useState<string>();
  const empty = !value;

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectValue: string
  ) => {
    setValue(selectValue);
  };

  return (
    <>
      <label
        htmlFor="color"
        style={{ display: 'flex', flexDirection: 'column', rowGap: '3px' }}
      >
        Color *
        <Select id="color" value={value} onChange={handleChange}>
          <Option value="red">Red</Option>
          <Option value="yellow">Yellow</Option>
          <Option value="green">Green</Option>
        </Select>
      </label>
      {empty && (
        <Text
          className="typo-label-medium"
          style={{ color: 'error', margin: '3px 0' }}
        >
          반드시 선택해야 합니다.
        </Text>
      )}
    </>
  );
};

const OptionsWithCheckboxTemplate = () => {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (
    _: Event | React.SyntheticEvent,
    selectValue: string[]
  ) => {
    setValue(selectValue);
  };

  return (
    <Select
      multiple
      value={value}
      onChange={handleChange}
      InputBaseProps={{ style: { width: '300px' } }}
    >
      {options.map((option) => (
        <Option
          key={option}
          value={option}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '300px',
            boxSizing: 'border-box'
          }}
        >
          <Checkbox checked={value.includes(option)} />
          {option}
        </Option>
      ))}
    </Select>
  );
};

export const BasicSelect: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate {...args} />
        <SelectTemplate defaultValue="Option1" {...args} />
      </Stack>
    );
  }
};

export const SelectInsideForm: Story = {
  render: (args) => {
    return (
      <Form>
        <SelectTemplate name="options" {...args} />
      </Form>
    );
  }
};

export const ControlledSelect: Story = {
  render: (args) => {
    return <ControlledSelectTemplate {...args} />;
  }
};

export const Placeholder: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate placeholder="Select Option" {...args} />
        <SelectTemplate
          placeholder={
            <Text className="typo-label-medium" style={{ margin: 0 }}>
              Select Option
            </Text>
          }
          {...args}
        />
      </Stack>
    );
  }
};

export const DisabledSelect: Story = {
  render: (args) => {
    return <SelectTemplate disabled {...args} />;
  }
};

export const DisabledOption: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        <Option value="Option 1">Option 1</Option>
        <Option value="Option 2" disabled>
          Option 2
        </Option>
        <Option value="Option 3">Option 3</Option>
      </Select>
    );
  }
};

export const WithLabelAndHelperText: Story = {
  render: (args) => {
    return <WithLabelAndTextTemplate {...args} />;
  }
};

export const GroupMenu: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        <Option
          value=""
          className="typo-title-medium"
          disabled
          style={{ margin: 0, color: 'gray-500' }}
        >
          Category 1
        </Option>
        <Option value="Option 1">Option 1</Option>
        <Option value="Option 2">Option 2</Option>
        <Option value="Option 3">Option 3</Option>
        <Option
          value=""
          className="typo-title-medium"
          disabled
          style={{ margin: 0, color: 'gray-500' }}
        >
          Category 2
        </Option>
        <Option value="Option 4">Option 4</Option>
        <Option value="Option 5">Option 5</Option>
        <Option value="Option 6">Option 6</Option>
      </Select>
    );
  }
};

export const DefaultMultipleSelect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <MultipleSelectTemplate placeholder="uncontrolled select" {...args} />
        <MultipleSelectTemplate
          defaultValue={['Option1', 'Option2']}
          {...args}
        />
        <ControlledMultipleSelectTemplate {...args} />
      </Stack>
    );
  }
};

export const MultipleSelectInsideForm: Story = {
  render: (args) => {
    return (
      <Form>
        <MultipleSelectTemplate name="options" {...args} />
      </Form>
    );
  }
};

export const OptionWithCheckbox: Story = {
  render: (args) => {
    return <OptionsWithCheckboxTemplate {...args} />;
  }
};

export const ChipValue: Story = {
  render: (args) => {
    return (
      <MultipleSelectTemplate
        renderValue={(values: string[]) => (
          <Stack
            direction="row"
            spacing={5}
            style={{ width: '100%', overflow: 'visible', flexWrap: 'wrap' }}
          >
            {values.map((value) => (
              <Chip key={value} label={value} variant="subtle-filled" />
            ))}
          </Stack>
        )}
        {...args}
      />
    );
  }
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate InputBaseProps={{ variant: 'filled' }} {...args} />
        <SelectTemplate InputBaseProps={{ variant: 'outlined' }} {...args} />
        <SelectTemplate InputBaseProps={{ variant: 'underlined' }} {...args} />
        <SelectTemplate InputBaseProps={{ variant: 'borderless' }} {...args} />
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate InputBaseProps={{ size: 'sm' }} {...args} />
        <SelectTemplate InputBaseProps={{ size: 'md' }} {...args} />
        <SelectTemplate InputBaseProps={{ size: 'lg' }} {...args} />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate InputBaseProps={{ color: 'secondary' }} {...args} />
        <SelectTemplate InputBaseProps={{ color: 'yellow-400' }} {...args} />
      </Stack>
    );
  }
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <SelectTemplate
        InputBaseProps={{
          endAdornment: '↓'
        }}
        {...args}
      />
    );
  }
};

export const DisableEffects: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <SelectTemplate
          InputBaseProps={{ disableHoverEffect: true }}
          {...args}
        />
        <SelectTemplate
          InputBaseProps={{ disableFocusEffect: true }}
          {...args}
        />
      </Stack>
    );
  }
};

export const Dense: Story = {
  render: (args) => {
    return (
      <SelectTemplate
        MenuProps={{ MenuListProps: { dense: true } }}
        {...args}
      />
    );
  }
};

export const MenuPosition: Story = {
  render: (args) => {
    return (
      <SelectTemplate
        MenuProps={{
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          menuOrigin: { horizontal: 'left', vertical: 'top' }
        }}
        {...args}
      />
    );
  }
};
