import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton, { ValueType } from './ToggleButton';
import { Stack } from '@/components/layout/Stack';
import { FormatAlignLeftIcon } from '@/components/icons/FormatAlignLeftIcon';
import { FormatAlignCenterIcon } from '@/components/icons/FormatAlignCenterIcon';
import { FormatAlignRightIcon } from '@/components/icons/FormatAlignRightIcon';
import { FormatAlignJustifyIcon } from '@/components/icons/FormatAlignJustifyIcon';

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
  argTypes: {
    color: {
      description: 'selected toggle button의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultSelected: {
      description: '초기 selected 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    onChange: {
      description: 'selected state가 변경될 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.MouseEvent, selected: boolean) => void'
        }
      }
    },
    selected: {
      description: 'selected 여부',
      table: {
        type: { summary: 'boolean' }
      }
    },
    size: {
      description: 'toggle button의 크기',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    value: {
      description: 'toggle button을 구분하는 특정 값',
      table: {
        type: { summary: `number | string | boolean` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

const ITEMS = [
  { value: 'left-alignment', icon: <FormatAlignLeftIcon /> },
  { value: 'center-alignment', icon: <FormatAlignCenterIcon /> },
  { value: 'right-alignment', icon: <FormatAlignRightIcon /> },
  { value: 'justify-alignment', icon: <FormatAlignJustifyIcon /> }
];

const ControlledToggleButtonTemplate = () => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleChange = (_: React.MouseEvent, selected: boolean) => {
    setSelected(selected);
  };

  return (
    <ToggleButton
      value="left-alignment"
      centerIcon={<FormatAlignLeftIcon />}
      selected={selected}
      onChange={handleChange}
    />
  );
};

const RadioButtonsTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<ValueType | undefined>();

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) setSelectedValue(value);
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          centerIcon={icon}
          selected={selectedValue === value}
          onChange={handleChange(value)}
        />
      ))}
    </Stack>
  );
};

const CheckboxButtonsTemplate = () => {
  const [selectedValues, setSelectedValues] = useState<Array<ValueType>>([]);

  const handleChange =
    (value: ValueType) => (_: React.MouseEvent, selected: boolean) => {
      if (selected) {
        setSelectedValues((prevValue) => [...prevValue, value]);
      } else {
        setSelectedValues((prevValue) =>
          prevValue.filter((val) => val !== value)
        );
      }
    };

  return (
    <Stack direction="row" spacing={20}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton
          key={value}
          value={value}
          centerIcon={icon}
          selected={selectedValues.includes(value)}
          onChange={handleChange(value)}
        />
      ))}
    </Stack>
  );
};

export const BasicToggleButton: Story = {
  render: (args) => (
    <ToggleButton
      value="left-alignment"
      centerIcon={<FormatAlignLeftIcon />}
      {...args}
    />
  )
};

export const DefaultSelected: Story = {
  render: (args) => (
    <ToggleButton
      value="left-alignment"
      centerIcon={<FormatAlignLeftIcon />}
      defaultSelected
      {...args}
    />
  )
};

export const ControlledToggleButton: Story = {
  render: (args) => <ControlledToggleButtonTemplate {...args} />
};

export const Color: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        color="primary"
        defaultSelected
        {...args}
      />
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        color="secondary"
        defaultSelected
        {...args}
      />
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        color="tertiary"
        defaultSelected
        {...args}
      />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        size="sm"
        {...args}
      />
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        size="md"
        {...args}
      />
      <ToggleButton
        value="left-alignment"
        centerIcon={<FormatAlignLeftIcon />}
        size="lg"
        {...args}
      />
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <ToggleButton
      value="left-alignment"
      centerIcon={<FormatAlignLeftIcon />}
      disabled
      {...args}
    />
  )
};

export const RadioButtons: Story = {
  render: (args) => <RadioButtonsTemplate {...args} />
};

export const CheckboxButtons: Story = {
  render: (args) => <CheckboxButtonsTemplate {...args} />
};
