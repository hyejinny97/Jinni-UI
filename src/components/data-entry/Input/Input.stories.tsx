import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Fraction } from '@/components/data-display/Fraction';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { MailIcon } from '@/components/icons/MailIcon';
import { VisibilityIcon } from '@/components/icons/VisibilityIcon';
import { VisibilityOffIcon } from '@/components/icons/VisibilityOffIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    type: {
      description: 'input 타입',
      table: {
        type: {
          summary: `'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

const Domain = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <h3 className="typo-title-medium" style={{ margin: '5px 0 10px 0' }}>
        {title}
      </h3>
      <Stack direction="row" spacing={30}>
        {children}
      </Stack>
    </Box>
  );
};

const ControlledInputTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 20;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.length > MAX_COUNT) return;
    setValue(newValue);
  };

  return (
    <Stack direction="row" spacing={10} style={{ alignItems: 'center' }}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={`${MAX_COUNT}자까지 입력 가능합니다`}
        maxLength={MAX_COUNT}
      />
      <Fraction value={value.length} count={MAX_COUNT} />
    </Stack>
  );
};

const PasswordTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        showPassword ? (
          <VisibilityOffIcon onClick={toggle} />
        ) : (
          <VisibilityIcon onClick={toggle} />
        )
      }
    />
  );
};

const WithLabelAndHelperTextTemplate = () => {
  const [value, setValue] = useState('');
  const empty = !value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="user-name"
        style={{ display: 'flex', flexDirection: 'column', rowGap: '3px' }}
      >
        User Name *
        <Input
          id="user-name"
          type="text"
          value={value}
          onChange={handleChange}
          style={empty ? { borderColor: 'error' } : undefined}
        />
      </label>
      {empty && (
        <Text
          className="typo-label-medium"
          style={{ color: 'error', margin: '3px 0' }}
        >
          필수로 입력해야 합니다.
        </Text>
      )}
    </>
  );
};

export const BasicInput: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Domain title={`type='date'`}>
          <Input type="date" {...args} />
          <Input
            type="date"
            defaultValue="2025-05-13"
            min="2025-05-03"
            max="2025-05-20"
            {...args}
          />
        </Domain>
        <Domain title={`type='datetime-local'`}>
          <Input type="datetime-local" {...args} />
          <Input
            type="datetime-local"
            defaultValue="2017-06-03T08:30"
            {...args}
          />
        </Domain>
        <Domain title={`type='email'`}>
          <Input type="email" {...args} />
          <Input type="email" defaultValue="1234@naver.com" {...args} />
        </Domain>
        <Domain title={`type='month'`}>
          <Input type="month" {...args} />
          <Input type="month" defaultValue="2025-05" {...args} />
        </Domain>
        <Domain title={`type='number'`}>
          <Input type="number" {...args} />
          <Input type="number" defaultValue={3} {...args} />
        </Domain>
        <Domain title={`type='password'`}>
          <Input type="password" {...args} />
          <Input type="password" defaultValue="1234" {...args} />
        </Domain>
        <Domain title={`type='search'`}>
          <Input type="search" {...args} />
          <Input type="search" defaultValue="프로그래밍이란" {...args} />
        </Domain>
        <Domain title={`type='tel'`}>
          <Input type="tel" {...args} />
          <Input type="tel" defaultValue="123-456-7890" {...args} />
        </Domain>
        <Domain title={`type='text'`}>
          <Input type="text" {...args} />
          <Input type="text" defaultValue="텍스트" {...args} />
        </Domain>
        <Domain title={`type='time'`}>
          <Input type="time" {...args} />
          <Input type="time" defaultValue="08:30" {...args} />
        </Domain>
        <Domain title={`type='url'`}>
          <Input type="url" {...args} />
          <Input type="url" defaultValue="https://example.com" {...args} />
        </Domain>
        <Domain title={`type='week'`}>
          <Input type="week" {...args} />
          <Input type="week" defaultValue="2018-W18" {...args} />
        </Domain>
      </Stack>
    );
  }
};

export const ControlledInput: Story = {
  render: (args) => <ControlledInputTemplate {...args} />
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Domain title={`type='text'`}>
          <Input variant="outlined" placeholder="Outlined" {...args} />
          <Input variant="filled" placeholder="Filled" {...args} />
          <Input variant="underlined" placeholder="Underlined" {...args} />
          <Input variant="borderless" placeholder="Borderless" {...args} />
        </Domain>
        <Domain title={`type='number'`}>
          <Input
            type="number"
            variant="outlined"
            placeholder="Outlined"
            {...args}
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Filled"
            {...args}
          />
          <Input
            type="number"
            variant="underlined"
            placeholder="Underlined"
            {...args}
          />
          <Input
            type="number"
            variant="borderless"
            placeholder="Borderless"
            {...args}
          />
        </Domain>
        <Domain title={`type='date'`}>
          <Input type="date" variant="outlined" {...args} />
          <Input type="date" variant="filled" {...args} />
          <Input type="date" variant="underlined" {...args} />
          <Input type="date" variant="borderless" {...args} />
        </Domain>
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input size="sm" placeholder="sm" {...args} />
        <Input size="md" placeholder="md" {...args} />
        <Input size="lg" placeholder="lg" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Domain title={`type='text'`}>
          <Input variant="outlined" placeholder="Outlined" disabled {...args} />
          <Input variant="filled" placeholder="Filled" disabled {...args} />
          <Input
            variant="underlined"
            placeholder="Underlined"
            disabled
            {...args}
          />
          <Input
            variant="borderless"
            placeholder="Borderless"
            disabled
            {...args}
          />
        </Domain>
        <Domain title={`type='number'`}>
          <Input
            type="number"
            variant="outlined"
            placeholder="Outlined"
            disabled
            {...args}
          />
          <Input
            type="number"
            variant="filled"
            placeholder="Filled"
            disabled
            {...args}
          />
          <Input
            type="number"
            variant="underlined"
            placeholder="Underlined"
            disabled
            {...args}
          />
          <Input
            type="number"
            variant="borderless"
            placeholder="Borderless"
            disabled
            {...args}
          />
        </Domain>
        <Domain title={`type='date'`}>
          <Input type="date" variant="outlined" disabled {...args} />
          <Input type="date" variant="filled" disabled {...args} />
          <Input type="date" variant="underlined" disabled {...args} />
          <Input type="date" variant="borderless" disabled {...args} />
        </Domain>
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input color="error" placeholder="error" autoFocus {...args} />
        <Input
          color="yellow-400"
          placeholder="yellow-400"
          autoFocus
          {...args}
        />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => <Input placeholder="Full Width" fullWidth {...args} />
};

export const Adornments: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input type="number" endAdornment="kg" placeholder="weight" {...args} />
        <Input
          type="email"
          startAdornment={<MailIcon color="gray-600" />}
          endAdornment="@naver.com"
          placeholder="email"
          {...args}
        />
        <PasswordTemplate {...args} />
      </Stack>
    );
  }
};

export const WithLabelAndHelperText: Story = {
  render: (args) => <WithLabelAndHelperTextTemplate {...args} />
};

export const DisableEffect: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input
          variant="filled"
          placeholder="Disable hover effect"
          disableHoverEffect
          {...args}
        />
        <Input
          variant="filled"
          placeholder="Disable focus effect"
          disableFocusEffect
          {...args}
        />
      </Stack>
    );
  }
};

export const Customization: Story = {
  render: (args) => {
    return (
      <Stack direction="row">
        <Input
          type="search"
          placeholder="Search Item..."
          style={{
            height: '33.6px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            borderRight: 'none'
          }}
          {...args}
        />
        <Button
          centerIcon={<SearchIcon />}
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0'
          }}
        />
      </Stack>
    );
  }
};
