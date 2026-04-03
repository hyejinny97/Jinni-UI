import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeRangeField, DateTimeRangeFieldProps } from '.';
import { DateTimeField } from '@/components/data-entry/DateTimeField';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { RangeType, RangeFieldType } from '@/types/date-time-component';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { MINUTE } from '@/constants/time';

const meta: Meta<typeof DateTimeRangeField> = {
  title: 'components/data-entry/DateTimeRangePicker/DateTimeRangeField',
  component: DateTimeRangeField,
  argTypes: {
    centerIcon: {
      description: '두 date time field 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    dateFormat: {
      description: 'date format',
      table: {
        type: { summary: 'string' }
      }
    },
    defaultValue: {
      description: '초기 date time',
      table: {
        type: { summary: `{ start?: Date; end?: Date }` }
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
    endAdornment: {
      description: 'date time field 뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, dateTimeRangeField?: React.ReactNode }`
        }
      }
    },
    focusedField: {
      description: '현재 포커스된 date time field',
      table: {
        type: { summary: `'start' | 'end'` }
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
          summary: `(value: { start?: Date | null; end?: Date | null }) => void;`
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
          summary: `{ start?: string; end?: string }`
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
    startAdornment: {
      description: 'date time field 앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, dateTimeRangeField?: React.ReactNode }`
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
          summary: `{ start?: Date 객체 | null; end?: Date 객체 | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimeRangeField>;

const DateText = ({
  year,
  month,
  day
}: {
  year?: number;
  month?: number;
  day?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const Time = ({
  hour,
  minute,
  second
}: {
  hour?: number;
  minute?: number;
  second?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{hour !== undefined && `${hour}시`}</span>
      <span>{minute !== undefined && `${minute}분`}</span>
      <span>{second !== undefined && `${second}초`}</span>
    </Text>
  );
};

const ControlledDateTimeRangeFieldTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });
  const getTime = (rangeField: RangeFieldType) => ({
    hour: value[rangeField]?.getHours(),
    minute: value[rangeField]?.getMinutes(),
    second: value[rangeField]?.getSeconds()
  });
  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('start')} />
          <Time {...getTime('start')} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('end')} />
          <Time {...getTime('end')} />
        </Stack>
      </Text>
      <DateTimeRangeField
        value={value}
        onChange={handleChange}
        placeholder={{
          start: 'Select Start Date Time',
          end: 'Select End Date Time'
        }}
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DateTimeRangeField
        key={locale}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateTimeRangeFieldProps['options']> = [
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
  const [option, setOption] = useState<DateTimeRangeFieldProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeRangeFieldProps['options']);
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
      <DateTimeRangeField
        key={JSON.stringify(option)}
        locale="en-US"
        options={option}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
      />
    </Stack>
  );
};

const DateFormatTemplate = () => {
  const FORMATS = ['YYYY년 M월 D일', 'YYYY - MM - DD'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateTimeRangeField
        key={format}
        dateFormat={format}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
      />
    </Stack>
  );
};

const TimeFormatTemplate = () => {
  const FORMATS = ['tt:mm a', 'HH:mm:ss', 'TT시 mm분'] as const;
  const [format, setFormat] = useState<(typeof FORMATS)[number]>(FORMATS[0]);

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateTimeRangeField
        key={format}
        timeFormat={format}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
      />
    </Stack>
  );
};

const MultiDateTimeFieldTemplate = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const dateToMinute = (date: Date): number => {
    return Math.trunc(date.getTime() / MINUTE);
  };
  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const getTime = (date: Date | null) => ({
    hour: date?.getHours(),
    minute: date?.getMinutes(),
    second: date?.getSeconds()
  });
  const handleStartDateTimeChange = (value: Date | null) => {
    setStartDateTime(value);
  };
  const handleEndDateTimeChange = (value: Date | null) => {
    setEndDateTime(value);
  };

  const isChronologicalError =
    startDateTime &&
    endDateTime &&
    dateToMinute(startDateTime) > dateToMinute(endDateTime);

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(startDateTime)} />
          <Time {...getTime(startDateTime)} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(endDateTime)} />
          <Time {...getTime(endDateTime)} />
        </Stack>
      </Text>
      <Stack direction="row" spacing={20}>
        <DateTimeField
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateTimeField
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicDateTimeRangeField: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField {...args} />
      <DateTimeRangeField
        placeholder={{
          start: 'Select Start Date Time',
          end: 'Select End Date Time'
        }}
        {...args}
      />
      <DateTimeRangeField
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField />
  <DateTimeRangeField
    placeholder={{
      start: 'Select Start Date Time',
      end: 'Select End Date Time'
    }}
  />
  <DateTimeRangeField
    defaultValue={{
      start: new Date('2025-08-06T12:30'),
      end: new Date('2025-08-10T14:20')
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateTimeRangeField: Story = {
  render: () => <ControlledDateTimeRangeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateTimeRangeFieldTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: value[rangeField]?.getFullYear(),
    month: value[rangeField]?.getMonth(),
    day: value[rangeField]?.getDate()
  });
  const getTime = (rangeField: RangeFieldType) => ({
    hour: value[rangeField]?.getHours(),
    minute: value[rangeField]?.getMinutes(),
    second: value[rangeField]?.getSeconds()
  });
  const handleChange = (newValue: RangeType<Date | null>) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('start')} />
          <Time {...getTime('start')} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate('end')} />
          <Time {...getTime('end')} />
        </Stack>
      </Text>
      <DateTimeRangeField
        value={value}
        onChange={handleChange}
        placeholder={{
          start: 'Select Start Date Time',
          end: 'Select End Date Time'
        }}
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DateTimeRangeField
        key={locale}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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
  const OPTIONS: Array<DateTimeRangeFieldProps['options']> = [
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
  const [option, setOption] = useState<DateTimeRangeFieldProps['options']>(
    OPTIONS[0]
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateTimeRangeFieldProps['options']);
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
      <DateTimeRangeField
        key={JSON.stringify(option)}
        locale="en-US"
        options={option}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateTimeRangeField
        key={format}
        dateFormat={format}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
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
      <DateTimeRangeField
        key={format}
        timeFormat={format}
        defaultValue={{
          start: new Date('2025-08-06T12:30'),
          end: new Date('2025-08-10T14:20')
        }}
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
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        defaultValue={{ start: new Date('2025-06-30T12:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minTime={new Date('2025-06-30T14:30')}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minTime={new Date('2025-06-30T14:30')}
    defaultValue={{ start: new Date('2025-06-30T12:00') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        defaultValue={{ end: new Date('2025-06-30T18:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxTime={new Date('2025-06-30T17:25')}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxTime={new Date('2025-06-30T17:25')}
    defaultValue={{ end: new Date('2025-06-30T18:00') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        defaultValue={{ start: new Date('2025-06-30T14:10') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledTimes={[
      new Date('2025-06-30T14:10'),
      new Date('2025-06-30T12:30')
    ]}
    defaultValue={{ start: new Date('2025-06-30T14:10') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minDate={new Date('2025-06-30')}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        minDate={new Date('2025-06-30')}
        defaultValue={{ start: new Date('2025-03-15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minDate={new Date('2025-06-30')}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    minDate={new Date('2025-06-30')}
    defaultValue={{ start: new Date('2025-03-15') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxDate={new Date('2025-07-20')}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        maxDate={new Date('2025-07-20')}
        defaultValue={{ end: new Date('2025-08-01') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxDate={new Date('2025-07-20')}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    maxDate={new Date('2025-07-20')}
    defaultValue={{ end: new Date('2025-08-01') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        {...args}
      />
      <DateTimeRangeField
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        defaultValue={{ start: new Date('2025-07-10') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
  />
  <DateTimeRangeField
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
    defaultValue={{ start: new Date('2025-07-10') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        timeMode="preset"
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <DateTimeRangeField
        timeMode="preset"
        placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm"
        timeStep={30 * 60}
        defaultValue={{ start: new Date('2025-06-30T15:20') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    timeMode="preset"
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    timeStep={30 * 60}
  />
  <DateTimeRangeField
    timeMode="preset"
    placeholder={{ start: 'YYYY/MM/DD HH:mm', end: 'YYYY/MM/DD HH:mm' }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm"
    timeStep={30 * 60}
    defaultValue={{ start: new Date('2025-06-30T15:20') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInManualMode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField
        timeMode="manual"
        placeholder={{
          start: 'YYYY/MM/DD HH:mm:ss',
          end: 'YYYY/MM/DD HH:mm:ss'
        }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <DateTimeRangeField
        timeMode="manual"
        placeholder={{
          start: 'YYYY/MM/DD HH:mm:ss',
          end: 'YYYY/MM/DD HH:mm:ss'
        }}
        dateFormat="YYYY/MM/DD"
        timeFormat="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        defaultValue={{ start: new Date('2025-06-30T16:15') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <DateTimeRangeField
    timeMode="manual"
    placeholder={{
      start: 'YYYY/MM/DD HH:mm:ss',
      end: 'YYYY/MM/DD HH:mm:ss'
    }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <DateTimeRangeField
    timeMode="manual"
    placeholder={{
      start: 'YYYY/MM/DD HH:mm:ss',
      end: 'YYYY/MM/DD HH:mm:ss'
    }}
    dateFormat="YYYY/MM/DD"
    timeFormat="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
    defaultValue={{ start: new Date('2025-06-30T16:15') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const Readonly: Story = {
  render: (args) => (
    <DateTimeRangeField
      defaultValue={{
        start: new Date('2025-08-06T12:30'),
        end: new Date('2025-08-10T14:20')
      }}
      readOnly
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <DateTimeRangeField
      defaultValue={{
        start: new Date('2025-08-06T12:30'),
        end: new Date('2025-08-10T14:20')
      }}
      disabled
      {...args}
    />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateTimeRangeField key={variant} variant={variant} {...args} />
        )
      )}
    </Stack>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateTimeRangeField key={size} size={size} {...args} />
      ))}
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <DateTimeRangeField
      color="yellow-400"
      focusedColor="yellow-400"
      {...args}
    />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '650px' }}>
      <DateTimeRangeField fullWidth {...args} />
    </Box>
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <DateTimeRangeField disableHoverEffect {...args} />
      <DateTimeRangeField disableFocusEffect {...args} />
    </Stack>
  )
};

export const Adornments: Story = {
  render: () => (
    <DateTimeRangeField
      placeholder={{
        start: 'Flight Departure',
        end: 'Flight Arrival'
      }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        dateTimeRangeField: <DateRangeIcon size={20} color="gray-500" />
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateTimeRangeField
  placeholder={{
    start: 'Flight Departure',
    end: 'Flight Arrival'
  }}
  startAdornment={{
    start: <FlightTakeOffIcon size={20} color="gray-600" />,
    end: <FlightLandIcon size={20} color="gray-600" />
  }}
  endAdornment={{
    dateTimeRangeField: <DateRangeIcon size={20} color="gray-500" />
  }}
/>`.trim()
      }
    }
  }
};

export const CustomCenterIcon: Story = {
  render: (args) => (
    <DateTimeRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const MultiDateTimeField: Story = {
  render: () => <MultiDateTimeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiDateTimeFieldTemplate = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  const dateToMinute = (date: Date): number => {
    return Math.trunc(date.getTime() / MINUTE);
  };
  const getDate = (date: Date | null) => ({
    year: date?.getFullYear(),
    month: date?.getMonth(),
    day: date?.getDate()
  });
  const getTime = (date: Date | null) => ({
    hour: date?.getHours(),
    minute: date?.getMinutes(),
    second: date?.getSeconds()
  });
  const handleStartDateTimeChange = (value: Date | null) => {
    setStartDateTime(value);
  };
  const handleEndDateTimeChange = (value: Date | null) => {
    setEndDateTime(value);
  };

  const isChronologicalError =
    startDateTime &&
    endDateTime &&
    dateToMinute(startDateTime) > dateToMinute(endDateTime);

  return (
    <Stack spacing={20}>
      <Text noMargin style={{ display: 'inline-flex', gap: '10px' }}>
        Date Time:
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(startDateTime)} />
          <Time {...getTime(startDateTime)} />
        </Stack>
        <span>-</span>
        <Stack direction="row" spacing={5}>
          <DateText {...getDate(endDateTime)} />
          <Time {...getTime(endDateTime)} />
        </Stack>
      </Text>
      <Stack direction="row" spacing={20}>
        <DateTimeField
          value={startDateTime}
          onChange={handleStartDateTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <DateTimeField
          value={endDateTime}
          onChange={handleEndDateTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
