import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TimeRangeField, { TimeRangeFieldProps } from './TimeRangeField';
import { TimeField } from '@/components/data-entry/TimeField';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { RangeType, RangeFieldType } from '@/types/time-component';

const meta: Meta<typeof TimeRangeField> = {
  title: 'components/data-entry/TimeRangePicker/TimeRangeField',
  component: TimeRangeField,
  argTypes: {
    centerIcon: {
      description: '두 time field 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<ArrowRightAltIcon />' }
      }
    },
    defaultValue: {
      description: '초기 time',
      table: {
        type: { summary: `{ start?: Date, end?: Date }` }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: `{ start?: boolean, end?: boolean }` }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: `{ start?: Array<Date>, end?: Array<Date> }` }
      }
    },
    endAdornment: {
      description: 'time field 뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, timeRangeField?: React.ReactNode }`
        }
      }
    },
    focusedField: {
      description: '현재 포커스된 time field',
      table: {
        type: { summary: `'start' | 'end'` }
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
        type: { summary: `{ start?: Date, end?: Date }` }
      }
    },
    minTime: {
      description: '선택 가능한 최소 시간',
      table: {
        type: { summary: `{ start?: Date, end?: Date }` }
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
          summary: `(value: { start?: Date | null, end?: Date | null }) => void;`
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
          summary: `{ start?: string, end?: string }`
        }
      }
    },
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `{ start?: boolean, end?: boolean }`
        }
      }
    },
    startAdornment: {
      description: 'time field 앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, timeRangeField?: React.ReactNode }`
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
          summary: `{ start?: Date | null, end?: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimeRangeField>;

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

const ControlledTimeRangeFieldTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
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
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Time:</span>
        <Time {...getTime('start')} />
        <span>-</span>
        <Time {...getTime('end')} />
      </Stack>
      <TimeRangeField value={value} onChange={handleChange} />
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<TimeRangeFieldProps['options']> = [
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
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<TimeRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeRangeFieldProps['options']);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
        key={format}
        value={value}
        onChange={handleTimeChange}
        format={format}
      />
    </Stack>
  );
};

const MultiTimeFieldTemplate = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const isChronologicalError =
    startTime &&
    endTime &&
    startTime.getHours() * 60 + startTime.getMinutes() >
      endTime.getHours() * 60 + endTime.getMinutes();

  const getTime = (time: Date | null) => ({
    hour: time?.getHours(),
    minute: time?.getMinutes(),
    second: time?.getSeconds()
  });
  const handleStartTimeChange = (value: Date | null) => {
    setStartTime(value);
  };
  const handleEndTimeChange = (value: Date | null) => {
    setEndTime(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Time:</span>
        <Time {...getTime(startTime)} />
        <span>-</span>
        <Time {...getTime(endTime)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <TimeField
          value={startTime}
          onChange={handleStartTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <TimeField
          value={endTime}
          onChange={handleEndTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
      </Stack>
    </Stack>
  );
};

export const BasicTimeRangeField: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TimeRangeField {...args} />
      <TimeRangeField
        placeholder={{ start: 'Select Start Time', end: 'Select End Time' }}
        {...args}
      />
      <TimeRangeField
        defaultValue={{
          start: new Date(2025, 7, 8, 12, 30),
          end: new Date(2025, 7, 8, 17, 20)
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangeField />
  <TimeRangeField
    placeholder={{ start: 'Select Start Time', end: 'Select End Time' }}
  />
  <TimeRangeField
    defaultValue={{
      start: new Date(2025, 7, 8, 12, 30),
      end: new Date(2025, 7, 8, 17, 20)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledTimeRangeField: Story = {
  render: () => <ControlledTimeRangeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTimeRangeFieldTemplate = () => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
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
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Time:</span>
        <Time {...getTime('start')} />
        <span>-</span>
        <Time {...getTime('end')} />
      </Stack>
      <TimeRangeField value={value} onChange={handleChange} />
    </Stack>
  );
};
`.trim()
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
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
  const OPTIONS: Array<TimeRangeFieldProps['options']> = [
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
      hour: '2-digit',
      hour12: true
    }
  ] as const;
  const [option, setOption] = useState<TimeRangeFieldProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeRangeFieldProps['options']);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 20)
  });

  const handleFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormat(value as (typeof FORMATS)[number]);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangeField
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
    <Stack spacing={20}>
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        minTime={{ start: new Date('2025-06-30T14:30') }}
        {...args}
      />
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        minTime={{ start: new Date('2025-06-30T14:30') }}
        defaultValue={{ start: new Date('2025-06-30T12:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    minTime={{ start: new Date('2025-06-30T14:30') }}
  />
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    minTime={{ start: new Date('2025-06-30T14:30') }}
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
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        maxTime={{ end: new Date('2025-06-30T17:25') }}
        {...args}
      />
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        maxTime={{ end: new Date('2025-06-30T17:25') }}
        defaultValue={{ end: new Date('2025-06-30T18:00') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    maxTime={{ end: new Date('2025-06-30T17:25') }}
  />
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    maxTime={{ end: new Date('2025-06-30T17:25') }}
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
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        disabledTimes={{
          start: [new Date('2025-06-30T14:10'), new Date('2025-06-30T12:30')]
        }}
        {...args}
      />
      <TimeRangeField
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        disabledTimes={{
          start: [new Date('2025-06-30T14:10'), new Date('2025-06-30T12:30')]
        }}
        defaultValue={{ start: new Date('2025-06-30T14:10') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    disabledTimes={{
      start: [new Date('2025-06-30T14:10'), new Date('2025-06-30T12:30')]
    }}
  />
  <TimeRangeField
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    disabledTimes={{
      start: [new Date('2025-06-30T14:10'), new Date('2025-06-30T12:30')]
    }}
    defaultValue={{ start: new Date('2025-06-30T14:10') }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const TimeStepInPresetMode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TimeRangeField
        mode="preset"
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <TimeRangeField
        mode="preset"
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm"
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
  <TimeRangeField
    mode="preset"
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
    timeStep={30 * 60}
  />
  <TimeRangeField
    mode="preset"
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm"
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
      <TimeRangeField
        mode="manual"
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <TimeRangeField
        mode="manual"
        placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
        format="HH:mm:ss"
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
  <TimeRangeField
    mode="manual"
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm:ss"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <TimeRangeField
    mode="manual"
    placeholder={{ start: 'HH:mm', end: 'HH:mm' }}
    format="HH:mm:ss"
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
    <TimeRangeField
      defaultValue={{
        start: new Date(2025, 7, 8, 12, 30),
        end: new Date(2025, 7, 8, 17, 20)
      }}
      readOnly={{ start: true, end: true }}
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TimeRangeField
      defaultValue={{
        start: new Date(2025, 7, 8, 12, 30),
        end: new Date(2025, 7, 8, 17, 20)
      }}
      disabled={{ start: true, end: true }}
      {...args}
    />
  )
};

export const Variants: Story = {
  render: (args) => (
    <Stack spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <TimeRangeField
            key={variant}
            variant={variant}
            placeholder={{ start: variant, end: variant }}
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
        <TimeRangeField
          key={size}
          size={size}
          placeholder={{ start: size, end: size }}
          {...args}
        />
      ))}
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <TimeRangeField color="yellow-400" focusedColor="yellow-400" {...args} />
  )
};

export const FullWidth: Story = {
  render: (args) => (
    <Box style={{ width: '500px' }}>
      <TimeRangeField fullWidth {...args} />
    </Box>
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <TimeRangeField disableHoverEffect disableFocusEffect {...args} />
  )
};

export const Adornments: Story = {
  render: () => (
    <TimeRangeField
      placeholder={{ start: 'Flight Departure', end: 'Flight Arrival' }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        timeRangeField: <AccessTimeIcon size={20} color="gray-500" />
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<TimeRangeField
  placeholder={{ start: 'Flight Departure', end: 'Flight Arrival' }}
  startAdornment={{
    start: <FlightTakeOffIcon size={20} color="gray-600" />,
    end: <FlightLandIcon size={20} color="gray-600" />
  }}
  endAdornment={{
    timeRangeField: <AccessTimeIcon size={20} color="gray-500" />
  }}
/>`.trim()
      }
    }
  }
};

export const CustomCenterIcon: Story = {
  render: (args) => (
    <TimeRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const MultiTimeField: Story = {
  render: () => <MultiTimeFieldTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiTimeFieldTemplate = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const isChronologicalError =
    startTime &&
    endTime &&
    startTime.getHours() * 60 + startTime.getMinutes() >
      endTime.getHours() * 60 + endTime.getMinutes();

  const getTime = (time: Date | null) => ({
    hour: time?.getHours(),
    minute: time?.getMinutes(),
    second: time?.getSeconds()
  });
  const handleStartTimeChange = (value: Date | null) => {
    setStartTime(value);
  };
  const handleEndTimeChange = (value: Date | null) => {
    setEndTime(value);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center' }}
      >
        <span>Time:</span>
        <Time {...getTime(startTime)} />
        <span>-</span>
        <Time {...getTime(endTime)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <TimeField
          value={startTime}
          onChange={handleStartTimeChange}
          {...(isChronologicalError && {
            color: 'error',
            focusedColor: 'error'
          })}
        />
        ~
        <TimeField
          value={endTime}
          onChange={handleEndTimeChange}
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
