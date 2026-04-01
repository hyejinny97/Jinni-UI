import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeField, DateTimeFieldProps } from '.';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { DateTimeValidationError } from '@/types/date-time-component';

const meta: Meta<typeof DateTimeField> = {
  title: 'components/data-entry/DateTimePicker/DateTimeField',
  component: DateTimeField,
  argTypes: {
    dateFormat: {
      description: 'date format',
      table: {
        type: { summary: 'string' }
      }
    },
    defaultValue: {
      description: '초기 date time',
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    maxDate: {
      description: '선택 가능한 최대 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    maxTime: {
      description: '선택 가능한 최대 시간',
      table: {
        type: { summary: 'Date' }
      }
    },
    minDate: {
      description: '선택 가능한 최소 날짜',
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
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date | null) => void;`
        }
      }
    },
    onErrorStatus: {
      description: 'validation error status가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(error: boolean, errorReason?: {time?: "minTime" | "maxTime" | "disabledTime" | "timeStep"; date?: 'minDate' | 'maxDate' | 'disabledDate'}) => void;`
        }
      }
    },
    options: {
      description: 'date time 속성',
      table: {
        type: {
          summary: `TimeOptions & DateOptions`
        }
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
    timeFormat: {
      description: 'time format',
      table: {
        type: { summary: 'string' }
      }
    },
    timeMode: {
      description: 'time 선택 방법',
      table: {
        type: { summary: `'preset' | 'manual'` },
        defaultValue: { summary: `'preset'` }
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
      description: 'date time',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimeField>;

const ControlledDateTimeFieldTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        DateTime:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day} `}</span>
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <DateTimeField
        value={value}
        onChange={handleChange}
        placeholder="Select Date Time"
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
      <DateTimeField
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateTimeFieldProps['options']> = [
    {
      dateStyle: 'medium',
      timeStyle: 'medium'
    },
    {
      dateStyle: 'short',
      timeStyle: 'short'
    },
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<DateTimeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeFieldProps['options']);
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
      <DateTimeField
        key={JSON.stringify(option)}
        locale="en-US"
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};

const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleDateChange = (newValue: Date | null) => {
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
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateTimeField
        key={format}
        value={value}
        onChange={handleDateChange}
        dateFormat={format}
      />
    </Stack>
  );
};

const TimeFormatTemplate = () => {
  const FORMATS = ['tt:mm a', 'HH:mm:ss', 'TT시 mm분'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

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
      <DateTimeField
        key={format}
        value={value}
        onChange={handleTimeChange}
        timeFormat={format}
      />
    </Stack>
  );
};

const DetectValidationErrorStatusTemplate = () => {
  const DATE_TIMES = [
    { label: '2025/06/15', value: new Date('2025-06-15') },
    { label: '2025/07/30', value: new Date('2025-07-30') },
    { label: '2025/07/10', value: new Date('2025-07-10') },
    { label: '2025/07/15', value: new Date('2025-07-15') },
    { label: 'T08:00', value: new Date('2025-06-30T08:00') },
    { label: 'T22:30', value: new Date('2025-06-30T22:30') },
    { label: 'T15:30', value: new Date('2025-06-30T15:30') },
    { label: 'T10:20', value: new Date('2025-06-30T10:20') }
  ] as const;
  const [dateTimeIdx, setDateTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] =
    useState<DateTimeValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const validationErrorArr = [
    validationError?.date,
    validationError?.time
  ].filter(Boolean);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateTimeIdx = Number(value);
    setDateTimeIdx(newDateTimeIdx);
    setValue(DATE_TIMES[newDateTimeIdx].value);
  };
  const handleErrorStatus = (
    _: boolean,
    errorReason?: DateTimeValidationError
  ) => {
    setValidationError(errorReason);
  };
  const handleDateTimeChange = (newValue: Date | null) => {
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
          DateTime that cause validation error
        </Chip>
        <RadioGroup
          name="date time"
          value={String(dateTimeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={2} columns={4} spacing={5}>
            {DATE_TIMES.map((dateTime, idx) => (
              <Label content={dateTime.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          DateTime:
          <span>{year !== undefined && `${year} /`}</span>
          <span>{month !== undefined && `${month + 1} /`}</span>
          <span>{day !== undefined && `${day} `}</span>
          <span>{hour !== undefined && `${hour}시`}</span>
          <span>{minute !== undefined && `${minute}분`}</span>
        </Text>
        <Text noMargin>
          Validation Error: '
          {validationErrorArr.length > 0 ? validationErrorArr.join(', ') : ''}'
        </Text>
      </Stack>
      <DateTimeField
        timeMode="preset"
        value={value}
        onChange={handleDateTimeChange}
        placeholder="Select Date Time"
        minTime={new Date('2025-06-30T09:00')}
        maxTime={new Date('2025-06-30T22:00')}
        disabledTimes={[
          new Date('2025-06-30T12:30'),
          new Date('2025-06-30T15:30')
        ]}
        timeStep={30 * 60}
        minDate={new Date('2025-06-30')}
        maxDate={new Date('2025-07-20')}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        onErrorStatus={handleErrorStatus}
      />
    </Stack>
  );
};

export const BasicDateTimeField: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeField {...args} />
      <DateTimeField placeholder="Select Date Time" {...args} />
      <DateTimeField defaultValue={new Date()} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeField />
  <DateTimeField placeholder="Select Date Time" />
  <DateTimeField defaultValue={new Date()} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateTimeField: Story = {
  render: () => <ControlledDateTimeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateTimeFieldTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        DateTime:
        <span>{year !== undefined && \`\${year} /\`}</span>
        <span>{month !== undefined && \`\${month + 1} /\`}</span>
        <span>{day !== undefined && \`\${day} \`}</span>
        <span>{hour !== undefined && \`\${hour}시\`}</span>
        <span>{minute !== undefined && \`\${minute}분\`}</span>
      </Text>
      <DateTimeField
        value={value}
        onChange={handleChange}
        placeholder="Select Date Time"
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
      <DateTimeField
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
  const OPTIONS: Array<DateTimeFieldProps['options']> = [
    {
      dateStyle: 'medium',
      timeStyle: 'medium'
    },
    {
      dateStyle: 'short',
      timeStyle: 'short'
    },
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    },
    {
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<DateTimeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeFieldProps['options']);
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
      <DateTimeField
        key={JSON.stringify(option)}
        locale="en-US"
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

export const DateFormat: Story = {
  render: () => <DateFormatTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleDateChange = (newValue: Date | null) => {
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
          <Grid rows={1} columns={2} spacing={5}>
            {FORMATS.map((format) => (
              <Label content={format}>
                <Radio value={format} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateTimeField
        key={format}
        value={value}
        onChange={handleDateChange}
        dateFormat={format}
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
  const [value, setValue] = useState<Date | null>(new Date());

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
      <DateTimeField
        key={format}
        value={value}
        onChange={handleTimeChange}
        timeFormat={format}
      />
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const MinTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
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
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minTime={new Date('2025-06-30T14:30')}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
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
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
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
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxTime={new Date('2025-06-30T17:25')}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
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
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
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
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
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

export const MinDate: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minDate={new Date('2025-06-30')}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minDate={new Date('2025-06-30')}
        defaultValue={new Date('2025-03-15')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minDate={new Date('2025-06-30')}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minDate={new Date('2025-06-30')}
    defaultValue={new Date('2025-03-15')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxDate={new Date('2025-07-20')}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxDate={new Date('2025-07-20')}
        defaultValue={new Date('2025-08-01')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Stack direction="row" spacing={20}>
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxDate={new Date('2025-07-20')}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxDate={new Date('2025-07-20')}
    defaultValue={new Date('2025-08-01')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateTimeField
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        defaultValue={new Date('2025-07-10')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateTimeField
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={new Date('2025-07-10')}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateTimeField
        timeMode="preset"
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <DateTimeField
        timeMode="preset"
        placeholder="YYYY/MM/DD HH:mm"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
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
  <DateTimeField
    timeMode="preset"
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    timeStep={30 * 60}
  />
  <DateTimeField
    timeMode="preset"
    placeholder="YYYY/MM/DD HH:mm"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
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
      <DateTimeField
        timeMode="manual"
        placeholder="YYYY/MM/DD HH:mm:ss"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <DateTimeField
        timeMode="manual"
        placeholder="YYYY/MM/DD HH:mm:ss"
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm:ss"
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
  <DateTimeField
    timeMode="manual"
    placeholder="YYYY/MM/DD HH:mm:ss"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <DateTimeField
    timeMode="manual"
    placeholder="YYYY/MM/DD HH:mm:ss"
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm:ss"
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
  const DATE_TIMES = [
    { label: '2025/06/15', value: new Date('2025-06-15') },
    { label: '2025/07/30', value: new Date('2025-07-30') },
    { label: '2025/07/10', value: new Date('2025-07-10') },
    { label: '2025/07/15', value: new Date('2025-07-15') },
    { label: 'T08:00', value: new Date('2025-06-30T08:00') },
    { label: 'T22:30', value: new Date('2025-06-30T22:30') },
    { label: 'T15:30', value: new Date('2025-06-30T15:30') },
    { label: 'T10:20', value: new Date('2025-06-30T10:20') }
  ] as const;
  const [dateTimeIdx, setDateTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] =
    useState<DateTimeValidationError>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const validationErrorArr = [
    validationError?.date,
    validationError?.time
  ].filter(Boolean);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateTimeIdx = Number(value);
    setDateTimeIdx(newDateTimeIdx);
    setValue(DATE_TIMES[newDateTimeIdx].value);
  };
  const handleErrorStatus = (
    _: boolean,
    errorReason?: DateTimeValidationError
  ) => {
    setValidationError(errorReason);
  };
  const handleDateTimeChange = (newValue: Date | null) => {
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
          DateTime that cause validation error
        </Chip>
        <RadioGroup
          name="date time"
          value={String(dateTimeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={2} columns={4} spacing={5}>
            {DATE_TIMES.map((dateTime, idx) => (
              <Label content={dateTime.label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Stack>
        <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
          DateTime:
          <span>{year !== undefined && \`\${year} /\`}</span>
          <span>{month !== undefined && \`\${month + 1} /\`}</span>
          <span>{day !== undefined && \`\${day} \`}</span>
          <span>{hour !== undefined && \`\${hour}시\`}</span>
          <span>{minute !== undefined && \`\${minute}분\`}</span>
        </Text>
        <Text noMargin>
          Validation Error: '
          {validationErrorArr.length > 0 ? validationErrorArr.join(', ') : ''}'
        </Text>
      </Stack>
      <DateTimeField
        timeMode="preset"
        value={value}
        onChange={handleDateTimeChange}
        placeholder="Select Date Time"
        minTime={new Date('2025-06-30T09:00')}
        maxTime={new Date('2025-06-30T22:00')}
        disabledTimes={[
          new Date('2025-06-30T12:30'),
          new Date('2025-06-30T15:30')
        ]}
        timeStep={30 * 60}
        minDate={new Date('2025-06-30')}
        maxDate={new Date('2025-07-20')}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
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
    <DateTimeField
      defaultValue={new Date('2025-06-30T14:10')}
      readOnly
      {...args}
    />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateTimeField
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
        <DateTimeField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateTimeField
      defaultValue={new Date('2025-06-30T14:10')}
      disabled
      {...args}
    />
  )
};

export const Color: Story = {
  render: (args) => (
    <DateTimeField
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
      <DateTimeField placeholder="Select Time" fullWidth {...args} />
    </Box>
  )
};

export const Adornments: Story = {
  render: (args) => (
    <DateTimeField
      placeholder="Select Time"
      startAdornment={<AccessTimeIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeField placeholder="Select Time" disableHoverEffect {...args} />
      <DateTimeField placeholder="Select Time" disableFocusEffect {...args} />
    </Stack>
  )
};
