import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateTimeField, { DateTimeFieldProps } from './DateTimeField';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  DateTimeValidationError,
  DisabledDateTimesFnType
} from '@/types/date-time-component';
import { DAY } from '@/constants/time';

const meta: Meta<typeof DateTimeField> = {
  title: 'components/DateTimePicker/DateTimeField',
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
    disabledDateTimes: {
      description: '비활성화하고자 하는 특정 날짜/시간 모음',
      table: {
        type: {
          summary: `Array<Date> | ({ dateTime }: { dateTime: Date; }) ⇒ boolean;`
        }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
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
          summary: `(error: boolean, errorReason?: Array<'disabledDateTime' | 'timeStep'>) => void;`
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

const timeToMinute = (time: Date) => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  return hour * 3600 + minute * 60;
};

type CaseType = {
  label: string;
  disabledDateTimes: Array<Date> | DisabledDateTimesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Disable today at 9:00 AM.',
    disabledDateTimes: [
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0
      )
    ]
  },
  {
    label: 'Disable today from 3:00 PM to 6:00 PM.',
    disabledDateTimes: ({ dateTime }) => {
      const isToday = dateToDay(new Date()) === dateToDay(dateTime);
      if (isToday) {
        const start = new Date();
        const end = new Date();
        start.setHours(15, 0, 0, 0);
        end.setHours(18, 0, 0, 0);
        const startTime = timeToMinute(start);
        const endTime = timeToMinute(end);
        const time = timeToMinute(dateTime);
        return startTime <= time && time <= endTime;
      }
      return false;
    }
  },
  {
    label: 'Selectable from 9:00 AM to 6:00 PM on weekdays.',
    disabledDateTimes: ({ dateTime }) => {
      const isWeekday = dateTime.getDay() !== 0 && dateTime.getDay() !== 6;
      if (isWeekday) {
        const start = new Date();
        const end = new Date();
        start.setHours(9, 0, 0, 0);
        end.setHours(18, 0, 0, 0);
        const startTime = timeToMinute(start);
        const endTime = timeToMinute(end);
        const time = timeToMinute(dateTime);
        return !(startTime <= time && time <= endTime);
      }
      return true;
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateTimeField
        options={{ hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }}
        disabledDateTimes={CASES[caseIdx].disabledDateTimes}
      />
    </Stack>
  );
};

const DetectValidationErrorStatusTemplate = () => {
  const DATE_TIMES = [
    { label: '2025/06/15T00:00', value: new Date('2025-06-15T00:00') },
    { label: '2025/06/30T08:00', value: new Date('2025-06-30T08:00') },
    { label: '2025/06/30T08:20', value: new Date('2025-06-30T08:20') },
    { label: '2025/06/30T08:40', value: new Date('2025-06-30T08:40') }
  ] as const;
  const [dateTimeIdx, setDateTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] =
    useState<DateTimeValidationError[]>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateTimeIdx = Number(value);
    setDateTimeIdx(newDateTimeIdx);
    setValue(DATE_TIMES[newDateTimeIdx].value);
  };
  const handleErrorStatus = (
    _: boolean,
    errorReason?: DateTimeValidationError[]
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          DateTime that cause validation error
        </Chip>
        <RadioGroup
          name="date time"
          value={String(dateTimeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={DATE_TIMES.length} columns={1}>
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
          {validationError && validationError.length > 0
            ? validationError.join(', ')
            : ''}
          '
        </Text>
      </Stack>
      <DateTimeField
        timeMode="preset"
        value={value}
        onChange={handleDateTimeChange}
        placeholder="Select Date Time"
        timeStep={30 * 60}
        disabledDateTimes={[
          new Date('2025-06-15T00:00'),
          new Date('2025-06-30T08:00'),
          new Date('2025-06-30T08:40')
        ]}
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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

export const DisabledDateTimes: Story = {
  render: () => <DisabledDateTimesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const dateToDay = (date: Date) => {
  const dateInLocalMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return Math.trunc(dateInLocalMidnight.getTime() / DAY);
};

const timeToMinute = (time: Date) => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  return hour * 3600 + minute * 60;
};

type CaseType = {
  label: string;
  disabledDateTimes: Array<Date> | DisabledDateTimesFnType;
};

const CASES: CaseType[] = [
  {
    label: 'Disable today at 9:00 AM.',
    disabledDateTimes: [
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0
      )
    ]
  },
  {
    label: 'Disable today from 3:00 PM to 6:00 PM.',
    disabledDateTimes: ({ dateTime }) => {
      const isToday = dateToDay(new Date()) === dateToDay(dateTime);
      if (isToday) {
        const start = new Date();
        const end = new Date();
        start.setHours(15, 0, 0, 0);
        end.setHours(18, 0, 0, 0);
        const startTime = timeToMinute(start);
        const endTime = timeToMinute(end);
        const time = timeToMinute(dateTime);
        return startTime <= time && time <= endTime;
      }
      return false;
    }
  },
  {
    label: 'Selectable from 9:00 AM to 6:00 PM on weekdays.',
    disabledDateTimes: ({ dateTime }) => {
      const isWeekday = dateTime.getDay() !== 0 && dateTime.getDay() !== 6;
      if (isWeekday) {
        const start = new Date();
        const end = new Date();
        start.setHours(9, 0, 0, 0);
        end.setHours(18, 0, 0, 0);
        const startTime = timeToMinute(start);
        const endTime = timeToMinute(end);
        const time = timeToMinute(dateTime);
        return !(startTime <= time && time <= endTime);
      }
      return true;
    }
  }
];

const DisabledDateTimesTemplate = () => {
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <DateTimeField
        options={{ hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }}
        disabledDateTimes={CASES[caseIdx].disabledDateTimes}
      />
    </Stack>
  );
};`.trim()
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
    { label: '2025/06/15T00:00', value: new Date('2025-06-15T00:00') },
    { label: '2025/06/30T08:00', value: new Date('2025-06-30T08:00') },
    { label: '2025/06/30T08:20', value: new Date('2025-06-30T08:20') },
    { label: '2025/06/30T08:40', value: new Date('2025-06-30T08:40') }
  ] as const;
  const [dateTimeIdx, setDateTimeIdx] = useState<number>(-1);
  const [validationError, setValidationError] =
    useState<DateTimeValidationError[]>();
  const [value, setValue] = useState<Date | null>(new Date('2025-06-30T10:00'));
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newDateTimeIdx = Number(value);
    setDateTimeIdx(newDateTimeIdx);
    setValue(DATE_TIMES[newDateTimeIdx].value);
  };
  const handleErrorStatus = (
    _: boolean,
    errorReason?: DateTimeValidationError[]
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
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          DateTime that cause validation error
        </Chip>
        <RadioGroup
          name="date time"
          value={String(dateTimeIdx)}
          onChange={handleRadioChange}
        >
          <Grid rows={DATE_TIMES.length} columns={1} spacing={5}>
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
          {validationError && validationError.length > 0
            ? validationError.join(', ')
            : ''}
          '
        </Text>
      </Stack>
      <DateTimeField
        timeMode="preset"
        value={value}
        onChange={handleDateTimeChange}
        placeholder="Select Date Time"
        timeStep={30 * 60}
        disabledDateTimes={[
          new Date('2025-06-15T00:00'),
          new Date('2025-06-30T08:00'),
          new Date('2025-06-30T08:40')
        ]}
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
