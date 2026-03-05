import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeField, TimeFieldProps } from '.';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { TimeValidationError } from '@/types/time-component';

const meta: Meta<typeof TimeField> = {
  title: 'components/data-entry/TimePicker/TimeField',
  component: TimeField,
  argTypes: {
    defaultValue: {
      description: '초기 time',
      table: {
        type: { summary: 'Date' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    format: {
      description: 'time format',
      table: {
        type: { summary: 'string' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    maxTime: {
      description: '선택 가능한 최대 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    minTime: {
      description: '선택 가능한 최소 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    mode: {
      description: 'time 선택 방법',
      table: {
        type: { summary: `'preset' | 'manual'` },
        defaultValue: { summary: `'preset'` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date | null) => void;`
        }
      }
    },
    onErrorStatus: {
      description: 'error 상태가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(error: boolean, errorReason?: "minTime" | "maxTime" | "disabledTime" | "timeStep") => void;`
        }
      }
    },
    options: {
      description: 'time 속성',
      table: {
        type: {
          summary: `{
timeStyle: 'short' | 'medium';
}
| {
hour?: 'numeric' | '2-digit';
minute?: 'numeric' | '2-digit';
second?: 'numeric' | '2-digit';
hour12?: boolean;
hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
}`
        },
        defaultValue: { summary: `{ timeStyle: 'short' }` }
      }
    },
    placeholder: {
      description: 'placeholder',
      table: {
        type: {
          summary: `string`
        }
      }
    },
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    timeStep: {
      description: '두 time options 간 step',
      table: {
        type: {
          summary: `mode='preset' ? number : {hour: number, minute: number, second: number}`
        },
        defaultValue: {
          summary: `mode='preset' ? 1 : {hour: 1, minute: 1, second: 1}`
        }
      }
    },
    value: {
      description: 'time',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimeField>;

const ControlledTimeFieldTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <TimeField
        value={value}
        onChange={handleChange}
        placeholder="Select Time"
      />
    </Stack>
  );
};

const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<TimeFieldProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      minute: 'numeric',
      second: 'numeric'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<TimeFieldProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeFieldProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={JSON.stringify(option)}
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};

const TimeFormatTemplate = () => {
  const FORMATS = ['tt:mm a', 'HH:mm:ss', 'TT시 mm분'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<Date | null>(
    new Date(1970, 0, 1, 0, 35, 20)
  );

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={3} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={format}
        value={value}
        onChange={handleTimeChange}
        format={format}
      />
    </Stack>
  );
};

const DetectValidationErrorStatusTemplate = () => {
  const TIMES = [
    { label: 'T08:00', value: new Date('2025-06-30T08:00') },
    { label: 'T22:30', value: new Date('2025-06-30T22:30') },
    { label: 'T15:30', value: new Date('2025-06-30T15:30') },
    { label: 'T10:20', value: new Date('2025-06-30T10:20') }
  ] as const;
  const [timeIdx, setTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] = useState<TimeValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTimeIdx = Number(value);
    setTimeIdx(newTimeIdx);
    setValue(TIMES[newTimeIdx].value);
  };
  const handleErrorStatus = (_: boolean, errorReason?: TimeValidationError) => {
    setValidationError(errorReason);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Time that cause validation error
        </Chip>
        <RadioGroup
          name="time"
          value={String(timeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={4} spacing={5}>
            {TIMES.map((time, idx) => (
              <Label content={time.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          Time:
          <span>{hour !== undefined && `${hour}시`}</span>
          <span>{minute !== undefined && `${minute}분`}</span>
        </Text>
        <Text noMargin>Validation Error: '{validationError}'</Text>
      </Stack>
      <TimeField
        mode="preset"
        value={value}
        onChange={handleTimeChange}
        placeholder="Select Time"
        minTime={new Date('2025-06-30T09:00')}
        maxTime={new Date('2025-06-30T22:00')}
        disabledTimes={[
          new Date('2025-06-30T12:30'),
          new Date('2025-06-30T15:30')
        ]}
        timeStep={30 * 60}
        onErrorStatus={handleErrorStatus}
      />
    </Stack>
  );
};

export const BasicTimeField: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      <TimeField {...args} />
      <TimeField placeholder="Select Time" {...args} />
      <TimeField defaultValue={new Date()} {...args} />
      <TimeField defaultValue={new Date('2025-06-30T14:30')} {...args} />
      <TimeField
        defaultValue={new Date('December 17, 1995 03:24:00')}
        {...args}
      />
      <TimeField defaultValue={new Date(2025, 7, 20, 8, 45)} {...args} />
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Grid columns={3} spacing={20}>
  <TimeField />
  <TimeField placeholder="Select Time" />
  <TimeField defaultValue={new Date()} />
  <TimeField defaultValue={new Date('2025-06-30T14:30')} />
  <TimeField defaultValue={new Date('December 17, 1995 03:24:00')} />
  <TimeField defaultValue={new Date(2025, 7, 20, 8, 45)} />
</Grid>`.trim()
      }
    }
  }
};

export const ControlledTimeField: Story = {
  render: () => <ControlledTimeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTimeFieldTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && \`\${hour}시\`}</span>
        <span>{minute !== undefined && \`\${minute}분\`}</span>
      </Text>
      <TimeField
        value={value}
        onChange={handleChange}
        placeholder="Select Time"
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Locale: Story = {
  render: () => <LocaleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LocaleTemplate = () => {
  const LOCALES = [
    'ko-KR',
    'en-US',
    'fr-FR',
    'ja-JP',
    'zh-CN',
    'ar-EG'
  ] as const;
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>(LOCALES[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Locale
        </Chip>
        <RadioGroup name="locale" value={locale} onChange={handleLocaleChange}>
          <Grid rows={2} columns={3} spacing={5}>
            {LOCALES.map((locale) => (
              <Label content={locale}>
                <Radio value={locale} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Options: Story = {
  render: () => <OptionsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionsTemplate = () => {
  const OPTIONS: Array<TimeFieldProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      minute: 'numeric',
      second: 'numeric'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<TimeFieldProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeFieldProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Option
        </Chip>
        <RadioGroup
          name="option"
          value={JSON.stringify(option)}
          onChange={handleOptionChange}
        >
          <Grid rows={OPTIONS.length} columns={1} spacing={5}>
            {OPTIONS.map((option) => {
              const optionStr = JSON.stringify(option);
              return (
                <Label content={optionStr}>
                  <Radio value={optionStr} />
                </Label>
              );
            })}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={JSON.stringify(option)}
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TimeFormat: Story = {
  render: () => <TimeFormatTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TimeFormatTemplate = () => {
  const FORMATS = ['tt:mm a', 'HH:mm:ss', 'TT시 mm분'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<Date | null>(
    new Date(1970, 0, 1, 0, 35, 20)
  );

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Format
        </Chip>
        <RadioGroup name="format" value={format} onChange={handleFormatChange}>
          <Grid rows={1} columns={3} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <TimeField
        key={format}
        value={value}
        onChange={handleTimeChange}
        format={format}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        defaultValue={new Date('2025-06-30T12:00')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    minTime={new Date('2025-06-30T14:30')}
  />
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    minTime={new Date('2025-06-30T14:30')}
    defaultValue={new Date('2025-06-30T12:00')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        {...args}
      />
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        defaultValue={new Date('2025-06-30T18:00')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    maxTime={new Date('2025-06-30T17:25')}
  />
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    maxTime={new Date('2025-06-30T17:25')}
    defaultValue={new Date('2025-06-30T18:00')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
      <TimeField
        placeholder="HH:mm"
        format="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        defaultValue={new Date('2025-06-30T14:10')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
  />
  <TimeField
    placeholder="HH:mm"
    format="HH:mm"
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
    defaultValue={new Date('2025-06-30T14:10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimeField
        mode="preset"
        placeholder="HH:mm"
        format="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <TimeField
        mode="preset"
        placeholder="HH:mm"
        format="HH:mm"
        timeStep={30 * 60}
        defaultValue={new Date('2025-06-30T15:20')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimeField
    mode="preset"
    placeholder="HH:mm"
    format="HH:mm"
    timeStep={30 * 60}
  />
  <TimeField
    mode="preset"
    placeholder="HH:mm"
    format="HH:mm"
    timeStep={30 * 60}
    defaultValue={new Date('2025-06-30T15:20')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInManualMode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimeField
        mode="manual"
        placeholder="HH:mm:ss"
        format="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <TimeField
        mode="manual"
        placeholder="HH:mm:ss"
        format="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        defaultValue={new Date('2025-06-30T16:15')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimeField
    mode="manual"
    placeholder="HH:mm:ss"
    format="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <TimeField
    mode="manual"
    placeholder="HH:mm:ss"
    format="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
    defaultValue={new Date('2025-06-30T16:15')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DetectValidationErrorStatus: Story = {
  render: () => <DetectValidationErrorStatusTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DetectValidationErrorStatusTemplate = () => {
  const TIMES = [
    { label: 'T08:00', value: new Date('2025-06-30T08:00') },
    { label: 'T22:30', value: new Date('2025-06-30T22:30') },
    { label: 'T15:30', value: new Date('2025-06-30T15:30') },
    { label: 'T10:20', value: new Date('2025-06-30T10:20') }
  ] as const;
  const [timeIdx, setTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] = useState<TimeValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newTimeIdx = Number(value);
    setTimeIdx(newTimeIdx);
    setValue(TIMES[newTimeIdx].value);
  };
  const handleErrorStatus = (_: boolean, errorReason?: TimeValidationError) => {
    setValidationError(errorReason);
  };
  const handleTimeChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'gray-100', border: 'none' }}
      >
        <Chip as="legend" variant="subtle-filled" color="gray-600">
          Time that cause validation error
        </Chip>
        <RadioGroup
          name="time"
          value={String(timeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={1} columns={4} spacing={5}>
            {TIMES.map((time, idx) => (
              <Label content={time.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          Time:
          <span>{hour !== undefined && \`\${hour}시\`}</span>
          <span>{minute !== undefined && \`\${minute}분\`}</span>
        </Text>
        <Text noMargin>Validation Error: '{validationError}'</Text>
      </Stack>
      <TimeField
        mode="preset"
        value={value}
        onChange={handleTimeChange}
        placeholder="Select Time"
        minTime={new Date('2025-06-30T09:00')}
        maxTime={new Date('2025-06-30T22:00')}
        disabledTimes={[
          new Date('2025-06-30T12:30'),
          new Date('2025-06-30T15:30')
        ]}
        timeStep={30 * 60}
        onErrorStatus={handleErrorStatus}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <TimeField defaultValue={new Date('2025-06-30T14:10')} readOnly {...args} />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <TimeField
            key={variant}
            variant={variant}
            placeholder={variant}
            {...args}
          />
        )
      )}
    </Stack>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TimeField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TimeField defaultValue={new Date('2025-06-30T14:10')} disabled {...args} />
  )
};

export const Color: Story = {
  render: (args) => (
    <TimeField
      placeholder="Select Time"
      color="yellow-400"
      focusedColor="yellow-400"
      {...args}
    />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <TimeField placeholder="Select Time" fullWidth {...args} />
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => (
    <TimeField
      placeholder="Select Time"
      startAdornment={<AccessTimeIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TimeField placeholder="Select Time" disableHoverEffect {...args} />
      <TimeField placeholder="Select Time" disableFocusEffect {...args} />
    </Stack>
  )
};
