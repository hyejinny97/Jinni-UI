import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ToggleButtonGroup from './ToggleButtonGroup';
import { ToggleButton, ValueType } from '@/components/general/ToggleButton';
import { Stack } from '@/components/layout/Stack';
import { FormatAlignLeftIcon } from '@/components/icons/FormatAlignLeftIcon';
import { FormatAlignCenterIcon } from '@/components/icons/FormatAlignCenterIcon';
import { FormatAlignRightIcon } from '@/components/icons/FormatAlignRightIcon';
import { FormatAlignJustifyIcon } from '@/components/icons/FormatAlignJustifyIcon';

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  argTypes: {
    children: {
      description: 'ToggleButton 컴포넌트들',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    color: {
      description: 'selected toggle button의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultValue: {
      description: '초기 selected value',
      table: {
        type: { summary: `ValueType | Array<ValueType> | null` }
      }
    },
    disabled: {
      description: 'boolean',
      table: {
        type: { summary: `false` }
      }
    },
    onChange: {
      description: 'selected value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: React.MouseEvent, value: ValueType | Array<ValueType> | null) => void`
        }
      }
    },
    orientation: {
      description: 'toggle buttons 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
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
      description: 'selected value',
      table: {
        type: { summary: `ValueType | Array<ValueType> | null` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

const ITEMS = [
  { value: 'left-alignment', icon: <FormatAlignLeftIcon /> },
  { value: 'center-alignment', icon: <FormatAlignCenterIcon /> },
  { value: 'right-alignment', icon: <FormatAlignRightIcon /> },
  { value: 'justify-alignment', icon: <FormatAlignJustifyIcon /> }
];

const ToggleButtonGroupTemplate = ({ ...props }) => {
  return (
    <ToggleButtonGroup {...props}>
      {ITEMS.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} centerIcon={icon} />
      ))}
    </ToggleButtonGroup>
  );
};

const ExclusiveControlledTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<ValueType | null>(null);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as ValueType | null);
  };

  return (
    <ToggleButtonGroupTemplate value={selectedValue} onChange={handleChange} />
  );
};

const MultipleControlledTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <ToggleButtonGroupTemplate value={selectedValue} onChange={handleChange} />
  );
};

const ExclusiveSelectAtLeastOneTemplate = () => {
  const [selectedValue, setSelectedValue] =
    useState<ValueType>('left-alignment');

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if (newValue !== null) setSelectedValue(newValue as ValueType);
  };

  return (
    <ToggleButtonGroupTemplate value={selectedValue} onChange={handleChange} />
  );
};

const MultipleSelectAtLeastOneTemplate = () => {
  const [selectedValue, setSelectedValue] = useState<Array<ValueType>>([
    'left-alignment',
    'right-alignment'
  ]);

  const handleChange = (
    _: React.MouseEvent,
    newValue: ValueType | Array<ValueType> | null
  ) => {
    if ((newValue as Array<ValueType>).length > 0)
      setSelectedValue(newValue as Array<ValueType>);
  };

  return (
    <ToggleButtonGroupTemplate value={selectedValue} onChange={handleChange} />
  );
};

export const BasicToggleButtonGroup: Story = {
  render: (args) => <ToggleButtonGroupTemplate {...args} />
};

export const ExclusiveDefaultValue: Story = {
  render: (args) => (
    <ToggleButtonGroupTemplate defaultValue="left-alignment" {...args} />
  )
};

export const MultipleDefaultValue: Story = {
  render: (args) => (
    <ToggleButtonGroupTemplate
      defaultValue={['left-alignment', 'right-alignment']}
      {...args}
    />
  )
};

export const ExclusiveControlled: Story = {
  render: (args) => <ExclusiveControlledTemplate {...args} />
};

export const MultipleControlled: Story = {
  render: (args) => <MultipleControlledTemplate {...args} />
};

export const Color: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <ToggleButtonGroupTemplate
        defaultValue="left-alignment"
        color="primary"
        {...args}
      />
      <ToggleButtonGroupTemplate
        defaultValue="left-alignment"
        color="secondary"
        {...args}
      />
      <ToggleButtonGroupTemplate
        defaultValue="left-alignment"
        color="tertiary"
        {...args}
      />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <ToggleButtonGroupTemplate size="sm" {...args} />
      <ToggleButtonGroupTemplate size="md" {...args} />
      <ToggleButtonGroupTemplate size="lg" {...args} />
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => <ToggleButtonGroupTemplate disabled {...args} />
};

export const VerticalToggleButtonGroup: Story = {
  render: (args) => (
    <ToggleButtonGroupTemplate orientation="vertical" {...args} />
  )
};

export const ExclusiveSelectAtLeastOne: Story = {
  render: (args) => <ExclusiveSelectAtLeastOneTemplate {...args} />
};

export const MultipleSelectAtLeastOne: Story = {
  render: (args) => <MultipleSelectAtLeastOneTemplate {...args} />
};
