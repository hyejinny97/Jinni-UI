import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Fraction } from '@/components/data-display/Fraction';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Label } from '@/components/data-entry/Label';
import { Alert } from '@/components/feedback/Alert';
import { MailIcon } from '@/components/icons/MailIcon';
import { VisibilityIcon } from '@/components/icons/VisibilityIcon';
import { VisibilityOffIcon } from '@/components/icons/VisibilityOffIcon';
import { SearchIcon } from '@/components/icons/SearchIcon';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@/components/data-display/Table';

const meta: Meta<typeof Input> = {
  component: Input,
  argTypes: {
    defaultValue: {
      description: '초기 input value',
      table: {
        type: { summary: `string | number` },
        defaultValue: { summary: `''` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: { summary: `(event: ChangeEvent) => void` }
      }
    },
    type: {
      description: 'input 타입',
      table: {
        type: {
          summary: `'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'`
        }
      }
    },
    value: {
      description: 'input value',
      table: {
        type: { summary: `string | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

const ControlledInputTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 20;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'end' }}>
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
        <ButtonBase
          onClick={toggle}
          style={{
            display: 'inline-flex',
            padding: '3px',
            borderRadius: '50%'
          }}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <VisibilityOffIcon color="gray-500" />
          ) : (
            <VisibilityIcon color="gray-500" />
          )}
        </ButtonBase>
      }
    />
  );
};

const InputWithFormTemplate = () => {
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const tel = formData.get('tel');
    if (email && typeof email === 'string' && !validateEmail(email)) {
      setMessage('E-mail 형식이 올바르지 않습니다.');
      return;
    }
    setMessage('');
    alert(`name: ${name}\nemail: ${email}\ntel: ${tel}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <Alert status="error" style={{ marginBottom: '5px' }}>
          {message}
        </Alert>
      )}
      <Stack spacing={10}>
        <Label
          content="Name"
          labelPlacement="top"
          required
          style={{ alignItems: 'start' }}
        >
          <Input name="name" type="text" placeholder="ex) 홍길동" />
        </Label>
        <Label
          content="Email"
          labelPlacement="top"
          style={{ alignItems: 'start' }}
        >
          <Input
            name="email"
            type="email"
            placeholder="mail@example.com"
            {...(message && { borderColor: 'error' })}
          />
        </Label>
        <Stack>
          <Label
            content="tel"
            labelPlacement="top"
            style={{ alignItems: 'start' }}
          >
            <Input
              name="tel"
              aria-describedby="tel-helper-text"
              type="tel"
              placeholder="ex) xxx-xxxx-xxxx"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Label>
          <Text
            id="tel-helper-text"
            className="typo-label-medium"
            style={{ margin: '0 16px', color: 'gray-500' }}
          >
            '-' 없이 숫자만 기입하세요.
          </Text>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', marginTop: '10px' }}
      >
        <Button type="submit">제출</Button>
      </Stack>
    </form>
  );
};

export const BasicInput: Story = {
  render: (args) => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">type</TableCell>
              <TableCell align="center">Input</TableCell>
              <TableCell align="center">Input with default value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">'date'</TableCell>
              <TableCell align="center">
                <Input type="date" aria-label="날짜 선택" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="date"
                  defaultValue="2025-05-13"
                  min="2025-05-03"
                  max="2025-05-20"
                  aria-label="날짜 선택"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'datetime-local'</TableCell>
              <TableCell align="center">
                <Input
                  type="datetime-local"
                  aria-label="날짜 및 시간 선택"
                  {...args}
                />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="datetime-local"
                  defaultValue="2017-06-03T08:30"
                  aria-label="날짜 및 시간 선택"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'email'</TableCell>
              <TableCell align="center">
                <Input type="email" aria-label="이메일 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="email"
                  defaultValue="1234@naver.com"
                  aria-label="이메일 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'month'</TableCell>
              <TableCell align="center">
                <Input type="month" aria-label="달 선택" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="month"
                  defaultValue="2025-05"
                  aria-label="달 선택"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'number'</TableCell>
              <TableCell align="center">
                <Input type="number" aria-label="숫자 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="number"
                  defaultValue={3}
                  aria-label="숫자 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'password'</TableCell>
              <TableCell align="center">
                <Input type="password" aria-label="비밀번호 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="password"
                  defaultValue="1234"
                  aria-label="비밀번호 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'search'</TableCell>
              <TableCell align="center">
                <Input type="search" aria-label="검색어 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="search"
                  defaultValue="프로그래밍이란"
                  aria-label="검색어 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'tel'</TableCell>
              <TableCell align="center">
                <Input type="tel" aria-label="전화번호 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="tel"
                  defaultValue="123-456-7890"
                  aria-label="전화번호 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'text'</TableCell>
              <TableCell align="center">
                <Input type="text" aria-label="텍스트 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="text"
                  defaultValue="텍스트"
                  aria-label="텍스트 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'time'</TableCell>
              <TableCell align="center">
                <Input type="time" aria-label="시간 선택" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="time"
                  defaultValue="08:30"
                  aria-label="시간 선택"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'url'</TableCell>
              <TableCell align="center">
                <Input type="url" aria-label="url 입력" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="url"
                  defaultValue="https://example.com"
                  aria-label="url 입력"
                  {...args}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">'week'</TableCell>
              <TableCell align="center">
                <Input type="week" aria-label="주 선택" {...args} />
              </TableCell>
              <TableCell align="center">
                <Input
                  type="week"
                  defaultValue="2018-W18"
                  aria-label="주 선택"
                  {...args}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export const ControlledInput: Story = {
  render: () => <ControlledInputTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledInputTemplate = () => {
  const [value, setValue] = useState('');
  const MAX_COUNT = 20;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'end' }}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={\`\${MAX_COUNT}자까지 입력 가능합니다\`}
        maxLength={MAX_COUNT}
      />
      <Fraction value={value.length} count={MAX_COUNT} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Variants: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input type="date" variant="outlined" {...args} />
        <Input type="date" variant="filled" {...args} />
        <Input type="date" variant="underlined" {...args} />
        <Input type="date" variant="borderless" {...args} />
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
        <Input type="date" variant="outlined" disabled {...args} />
        <Input type="date" variant="filled" disabled {...args} />
        <Input type="date" variant="underlined" disabled {...args} />
        <Input type="date" variant="borderless" disabled {...args} />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Input
          color="error"
          focusedColor="error"
          placeholder="error"
          {...args}
        />
        <Input
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
      <Input placeholder="Full Width" fullWidth {...args} />
    </Box>
  )
};

export const AdornmentsBasic: Story = {
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
      </Stack>
    );
  }
};

export const AdornmentsPassword: Story = {
  render: () => <PasswordTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PasswordTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <ButtonBase
          onClick={toggle}
          style={{
            display: 'inline-flex',
            padding: '3px',
            borderRadius: '50%'
            }}
          aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <VisibilityOffIcon color="gray-500" />
          ) : (
            <VisibilityIcon color="gray-500" />
          )}
        </ButtonBase>
      }
    />
  );
};`.trim()
      }
    }
  }
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

export const InputWithForm: Story = {
  render: () => <InputWithFormTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const InputWithFormTemplate = () => {
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const tel = formData.get('tel');
    if (email && typeof email === 'string' && !validateEmail(email)) {
      setMessage('E-mail 형식이 올바르지 않습니다.');
      return;
    }
    setMessage('');
    alert(\`name: \${name}\\nemail: \${email}\\ntel: \${tel}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <Alert status="error" style={{ marginBottom: '5px' }}>
          {message}
        </Alert>
      )}
      <Stack spacing={10}>
        <Label
          content="Name"
          labelPlacement="top"
          required
          style={{ alignItems: 'start' }}
        >
          <Input name="name" type="text" placeholder="ex) 홍길동" />
        </Label>
        <Label
          content="Email"
          labelPlacement="top"
          style={{ alignItems: 'start' }}
        >
          <Input
            name="email"
            type="email"
            placeholder="mail@example.com"
            {...(message && { borderColor: 'error' })}
          />
        </Label>
        <Stack>
          <Label
            content="tel"
            labelPlacement="top"
            style={{ alignItems: 'start' }}
          >
            <Input
              name="tel"
              aria-describedby="tel-helper-text"
              type="tel"
              placeholder="ex) xxx-xxxx-xxxx"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Label>
          <Text
            id="tel-helper-text"
            className="typo-label-medium"
            style={{ margin: '0 16px', color: 'gray-500' }}
          >
            '-' 없이 숫자만 기입하세요.
          </Text>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        style={{ justifyContent: 'end', marginTop: '10px' }}
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
          aria-label="검색"
          {...args}
        />
        <Button
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0'
          }}
          aria-label="검색 실행"
        >
          <SearchIcon color="white" size={22} />
        </Button>
      </Stack>
    );
  }
};
