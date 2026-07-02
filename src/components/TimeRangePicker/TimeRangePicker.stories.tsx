import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TimeRangePicker, { TimeRangePickerProps } from './TimeRangePicker';
import TimePicker from '@/components/TimePicker';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledTimesFnType,
  RangeDisabledTimesWithUnitFnType,
  TimeMode
} from '@/types/time-component';
import ManualDigitalClock from '@/components/ManualDigitalClock';
import Box from '@/components/Box';
import Stack from '@/components/Stack';
import Grid from '@/components/Grid';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import Switch from '@/components/Switch';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

const meta: Meta<typeof TimeRangePicker> = {
  component: TimeRangePicker,
  argTypes: {
    defaultValue: {
      description: '초기 time',
      table: {
        type: { summary: '{ start?: Date, end?: Date }' }
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
        type: {
          summary: `mode='preset' ? 
Array<Date> | ({ time, rangeField }: { time: Date; rangeField: 'start' | 'end'; }) ⇒ boolean 
:
Array<Date> | ({ time, unit, rangeField }: { time: Date; unit: 'hour' | 'minute' | 'second'; rangeField: 'start' | 'end'; }) ⇒ boolean `
        }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    mode: {
      description: 'time 선택 방법',
      table: {
        type: { summary: `'preset' | 'manual'` },
        defaultValue: { summary: `'preset'` }
      }
    },
    name: {
      description: 'input name',
      table: {
        type: { summary: `{ start?: string, end?: string }` }
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
    PopoverProps: {
      description: 'Popover 컴포넌트의 props',
      table: {
        type: {
          summary: `PopoverProps`
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
    renderDigitalClock: {
      description:
        'digitalClockProps를 입력값으로 받아 mode에 따라 ManualDigitalClock 이나 PresetDigitalClock 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: `(digitalClockProps: ({ mode: 'preset' } & PresetDigitalClockProps) | ({ mode: 'manual' } & ManualDigitalClockProps)) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(digitalClockProps: ({ mode: 'preset' } & PresetDigitalClockProps) | ({ mode: 'manual' } & ManualDigitalClockProps)) => digitalClockProps.mode === 'preset' ? <PresetDigitalClock {...digitalClockProps} /> : <ManualDigitalClock {...digitalClockProps} />;`
        }
      }
    },
    TimeRangeFieldProps: {
      description: 'TimeRangeField 컴포넌트의 Props',
      table: {
        type: {
          summary: `TimeRangeFieldProps`
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
          summary: `mode='preset' ? 1800 : {hour: 1, minute: 1, second: 1}`
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
type Story = StoryObj<typeof TimeRangePicker>;

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
      style={{
        display: 'inline-flex',
        gap: '5px',
        maxWidth: 'max-content',
        margin: 0
      }}
    >
      <span>{hour !== undefined && `${hour}시`}</span>
      <span>{minute !== undefined && `${minute}분`}</span>
      <span>{second !== undefined && `${second}초`}</span>
    </Text>
  );
};

const ControlledTimeRangePickerTemplate = () => {
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
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Time:</span>
        <Time {...getTime('start')} />
        <span>-</span>
        <Time {...getTime('end')} />
      </Stack>
      <TimeRangePicker value={value} onChange={handleChange} />
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
    end: new Date(2025, 7, 8, 17, 0)
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
      <TimeRangePicker
        key={locale}
        value={value}
        onChange={handleTimeChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<TimeRangePickerProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    }
  ] as const;
  const [option, setOption] = useState<TimeRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 0)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeRangePickerProps['options']);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangePicker
        key={JSON.stringify(option)}
        value={value}
        onChange={handleTimeChange}
        options={option}
      />
    </Stack>
  );
};

const dateToMinute = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return hour * 3600 + minute * 60;
};

type CaseType = {
  label: string;
  disabledTimes: {
    preset: Array<Date> | RangeDisabledTimesFnType;
    manual: Array<Date> | RangeDisabledTimesWithUnitFnType;
  };
};

const CASES: CaseType[] = [
  {
    label: 'Disables at 3:00 PM and 3:30 PM.',
    disabledTimes: {
      preset: [new Date('2025-06-30T15:00'), new Date('2025-06-30T15:30')],
      manual: [new Date('2025-06-30T15:00'), new Date('2025-06-30T15:30')]
    }
  },
  {
    label: 'Available from 9:00 AM to 6:30 PM.',
    disabledTimes: {
      preset: ({ time }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 30));
        const timeInMinute = dateToMinute(time);
        return (
          timeInMinute < startTimeInMinute || endTimeInMinute < timeInMinute
        );
      },
      manual: ({ time, unit }) => {
        if (unit === 'hour') {
          return time.getHours() < 9 || time.getHours() > 18;
        }
        if (unit === 'minute') {
          const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
          const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 30));
          const timeInMinute = dateToMinute(time);
          return (
            timeInMinute < startTimeInMinute || endTimeInMinute < timeInMinute
          );
        }
        return false;
      }
    }
  },
  {
    label: 'Disables from 3:30 PM to 5:20 PM.',
    disabledTimes: {
      preset: ({ time }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 15, 30));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 17, 20));
        const timeInMinute = dateToMinute(time);
        return (
          startTimeInMinute < timeInMinute && timeInMinute < endTimeInMinute
        );
      },
      manual: ({ time, unit }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 15, 30));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 17, 20));
        if (unit === 'hour') {
          const hour = time.getHours();
          return (
            startTimeInMinute <= dateToMinute(new Date(1970, 0, 1, hour, 0)) &&
            dateToMinute(new Date(1970, 0, 1, hour, 59)) <= endTimeInMinute
          );
        }
        if (unit === 'minute') {
          const timeInMinute = dateToMinute(time);
          return (
            startTimeInMinute < timeInMinute && timeInMinute < endTimeInMinute
          );
        }
        return false;
      }
    }
  },
  {
    label: `'Start' is selectable from 9:00 AM, and 'end' up to 6:00 PM.`,
    disabledTimes: {
      preset: ({ time, rangeField }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 0));
        const timeInMinute = dateToMinute(time);
        if (rangeField === 'start') {
          return timeInMinute < startTimeInMinute;
        }
        if (rangeField === 'end') {
          return endTimeInMinute < timeInMinute;
        }
        return false;
      },
      manual: ({ time, unit, rangeField }) => {
        if (unit === 'hour') {
          if (rangeField === 'start') return time.getHours() < 9;
          if (rangeField === 'end') return time.getHours() > 18;
        }
        if (unit === 'minute') {
          const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
          const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 0));
          const timeInMinute = dateToMinute(time);
          if (rangeField === 'start') return timeInMinute < startTimeInMinute;
          if (rangeField === 'end') return endTimeInMinute < timeInMinute;
        }
        return false;
      }
    }
  }
];

const DisabledTimesTemplate = () => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack spacing={5} style={{ alignItems: 'end' }}>
        <Label content={`'manual' mode`}>
          <Switch checked={isManualMode} onChange={handleModeChange} />
        </Label>
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
      </Stack>
      <TimeRangePicker
        mode={mode}
        disabledTimes={CASES[caseIdx].disabledTimes[mode]}
      />
    </Stack>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      style={{
        margin: '3px 0',
        fontSize: '12px',
        fontWeight: '700',
        color: 'on-surface-variant',
        textAlign: 'center'
      }}
    >
      {children}
    </Text>
  );
};

const MultiTimePickerTemplate = () => {
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
    <Stack spacing={20} style={{ color: 'on-surface' }}>
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
        <TimePicker
          value={startTime}
          onChange={handleStartTimeChange}
          {...(isChronologicalError && {
            TimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <TimePicker
          value={endTime}
          onChange={handleEndTimeChange}
          {...(isChronologicalError && {
            TimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
      </Stack>
    </Stack>
  );
};

export const Mode: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TimeRangePicker mode="preset" {...args} />
      <TimeRangePicker mode="manual" {...args} />
    </Stack>
  )
};

export const DefaultValue: Story = {
  render: (args) => (
    <Stack spacing={20}>
      <TimeRangePicker
        mode="preset"
        defaultValue={{
          start: new Date(2025, 7, 6, 2, 30),
          end: new Date(2025, 7, 6, 17, 0)
        }}
        {...args}
      />
      <TimeRangePicker
        mode="manual"
        defaultValue={{
          start: new Date(2025, 7, 6, 2, 30),
          end: new Date(2025, 7, 6, 17, 0)
        }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangePicker
    mode="preset"
    defaultValue={{
      start: new Date(2025, 7, 6, 2, 30),
      end: new Date(2025, 7, 6, 17, 0)
    }}
  />
  <TimeRangePicker
    mode="manual"
    defaultValue={{
      start: new Date(2025, 7, 6, 2, 30),
      end: new Date(2025, 7, 6, 17, 0)
    }}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledTimeRangePicker: Story = {
  render: () => <ControlledTimeRangePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTimeRangePickerTemplate = () => {
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
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Time:</span>
        <Time {...getTime('start')} />
        <span>-</span>
        <Time {...getTime('end')} />
      </Stack>
      <TimeRangePicker value={value} onChange={handleChange} />
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
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 0)
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
      <TimeRangePicker
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
  const OPTIONS: Array<TimeRangePickerProps['options']> = [
    {
      timeStyle: 'medium'
    },
    {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h24'
    }
  ] as const;
  const [option, setOption] = useState<TimeRangePickerProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: new Date(2025, 7, 8, 12, 30),
    end: new Date(2025, 7, 8, 17, 0)
  });

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimeRangePickerProps['options']);
  };
  const handleTimeChange = (newValue: RangeType<Date | null>) => {
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
      <TimeRangePicker
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

export const DisabledTimes: Story = {
  render: () => <DisabledTimesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
const dateToMinute = (date: Date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return hour * 3600 + minute * 60;
};

type CaseType = {
  label: string;
  disabledTimes: {
    preset: Array<Date> | RangeDisabledTimesFnType;
    manual: Array<Date> | RangeDisabledTimesWithUnitFnType;
  };
};

const CASES: CaseType[] = [
  {
    label: 'Disables at 3:00 PM and 3:30 PM.',
    disabledTimes: {
      preset: [new Date('2025-06-30T15:00'), new Date('2025-06-30T15:30')],
      manual: [new Date('2025-06-30T15:00'), new Date('2025-06-30T15:30')]
    }
  },
  {
    label: 'Available from 9:00 AM to 6:30 PM.',
    disabledTimes: {
      preset: ({ time }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 30));
        const timeInMinute = dateToMinute(time);
        return (
          timeInMinute < startTimeInMinute || endTimeInMinute < timeInMinute
        );
      },
      manual: ({ time, unit }) => {
        if (unit === 'hour') {
          return time.getHours() < 9 || time.getHours() > 18;
        }
        if (unit === 'minute') {
          const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
          const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 30));
          const timeInMinute = dateToMinute(time);
          return (
            timeInMinute < startTimeInMinute || endTimeInMinute < timeInMinute
          );
        }
        return false;
      }
    }
  },
  {
    label: 'Disables from 3:30 PM to 5:20 PM.',
    disabledTimes: {
      preset: ({ time }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 15, 30));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 17, 20));
        const timeInMinute = dateToMinute(time);
        return (
          startTimeInMinute < timeInMinute && timeInMinute < endTimeInMinute
        );
      },
      manual: ({ time, unit }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 15, 30));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 17, 20));
        if (unit === 'hour') {
          const hour = time.getHours();
          return (
            startTimeInMinute <= dateToMinute(new Date(1970, 0, 1, hour, 0)) &&
            dateToMinute(new Date(1970, 0, 1, hour, 59)) <= endTimeInMinute
          );
        }
        if (unit === 'minute') {
          const timeInMinute = dateToMinute(time);
          return (
            startTimeInMinute < timeInMinute && timeInMinute < endTimeInMinute
          );
        }
        return false;
      }
    }
  },
  {
    label: \`'Start' is selectable from 9:00 AM, and 'end' up to 6:00 PM.\`,
    disabledTimes: {
      preset: ({ time, rangeField }) => {
        const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
        const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 0));
        const timeInMinute = dateToMinute(time);
        if (rangeField === 'start') {
          return timeInMinute < startTimeInMinute;
        }
        if (rangeField === 'end') {
          return endTimeInMinute < timeInMinute;
        }
        return false;
      },
      manual: ({ time, unit, rangeField }) => {
        if (unit === 'hour') {
          if (rangeField === 'start') return time.getHours() < 9;
          if (rangeField === 'end') return time.getHours() > 18;
        }
        if (unit === 'minute') {
          const startTimeInMinute = dateToMinute(new Date(1970, 0, 1, 9, 0));
          const endTimeInMinute = dateToMinute(new Date(1970, 0, 1, 18, 0));
          const timeInMinute = dateToMinute(time);
          if (rangeField === 'start') return timeInMinute < startTimeInMinute;
          if (rangeField === 'end') return endTimeInMinute < timeInMinute;
        }
        return false;
      }
    }
  }
];

const DisabledTimesTemplate = () => {
  const [isManualMode, setIsManualMode] = useState(false);
  const [caseIdx, setCaseIdx] = useState<number>(0);
  const mode: TimeMode = isManualMode ? 'manual' : 'preset';

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualMode(e.target.checked);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Stack spacing={5} style={{ alignItems: 'end' }}>
        <Label content={\`'manual' mode\`}>
          <Switch checked={isManualMode} onChange={handleModeChange} />
        </Label>
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
      </Stack>
      <TimeRangePicker
        mode={mode}
        disabledTimes={CASES[caseIdx].disabledTimes[mode]}
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
    <Stack spacing={20}>
      <TimeRangePicker mode="preset" timeStep={60 * 60} {...args} />
      <TimeRangePicker
        mode="preset"
        timeStep={60 * 60}
        defaultValue={{ start: new Date('2025-06-30T15:20') }}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing={20}>
  <TimeRangePicker mode="preset" timeStep={60 * 60} />
  <TimeRangePicker
    mode="preset"
    timeStep={60 * 60}
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
      <TimeRangePicker
        mode="manual"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
      <TimeRangePicker
        mode="manual"
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
  <TimeRangePicker
    mode="manual"
    timeStep={{ hour: 2, minute: 10, second: 10 }}
  />
  <TimeRangePicker
    mode="manual"
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
    <TimeRangePicker
      defaultValue={{
        start: new Date(2025, 7, 8, 12, 30),
        end: new Date(2025, 7, 8, 17, 0)
      }}
      readOnly={{ start: true, end: true }}
      {...args}
    />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TimeRangePicker
      defaultValue={{
        start: new Date(2025, 7, 8, 12, 30),
        end: new Date(2025, 7, 8, 17, 0)
      }}
      disabled={{ start: true, end: true }}
      {...args}
    />
  )
};

export const TimeRangePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const departure = formData.get('departure time');
        const arrival = formData.get('arrival time');
        alert(`- Departure time: ${departure}\n- Arrival time: ${arrival}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <TimeRangePicker
        name={{ start: 'departure time', end: 'arrival time' }}
        mode="manual"
        {...args}
      />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  ),
  parameters: {
    docs: {
      source: {
        code: `<form
  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const departure = formData.get('departure time');
    const arrival = formData.get('arrival time');
    alert(\`- Departure time: \${departure}\n- Arrival time: \${arrival}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <TimeRangePicker
    name={{ start: 'departure time', end: 'arrival time' }}
    mode="manual"
  />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomTimeRangeField: Story = {
  render: () => (
    <Box style={{ width: '500px' }}>
      <TimeRangePicker
        TimeRangeFieldProps={{
          placeholder: {
            start: 'Select Departure Time',
            end: 'Select Arrival Time'
          },
          format: 'A hh시 mm분',
          variant: 'filled',
          size: 'sm',
          color: 'gray-400',
          focusedColor: 'tertiary',
          fullWidth: true,
          startAdornment: {
            start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
            end: <FlightLandIcon size={20} color="on-surface-variant" />
          },
          disableHoverEffect: true,
          centerIcon: <ArrowRightIcon size={20} color="gray-400" />
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '500px' }}>
  <TimeRangePicker
    TimeRangeFieldProps={{
      placeholder: {
        start: 'Select Departure Time',
        end: 'Select Arrival Time'
      },
      format: 'A hh시 mm분',
      variant: 'filled',
      size: 'sm',
      color: 'gray-400',
      focusedColor: 'tertiary',
      fullWidth: true,
      startAdornment: {
        start: <FlightTakeOffIcon size={20} color="on-surface-variant" />,
        end: <FlightLandIcon size={20} color="on-surface-variant" />
      },
      disableHoverEffect: true,
      centerIcon: <ArrowRightIcon size={20} color="gray-400" />
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDigitalClock: Story = {
  render: () => (
    <TimeRangePicker
      mode="manual"
      disabledTimes={[new Date(1970, 0, 1, 5, 0), new Date(1970, 0, 1, 5, 30)]}
      renderDigitalClock={(digitalClockProps) => {
        return (
          <>
            <Grid columns={3}>
              <Title>AM/PM</Title>
              <Title>Hours</Title>
              <Title>Minutes</Title>
            </Grid>
            {digitalClockProps.mode === 'manual' && (
              <ManualDigitalClock skipDisabledTime {...digitalClockProps} />
            )}
          </>
        );
      }}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<TimeRangePicker
  mode="manual"
  disabledTimes={[new Date(1970, 0, 1, 5, 0), new Date(1970, 0, 1, 5, 30)]}
  renderDigitalClock={(digitalClockProps) => {
    return (
      <>
        <Grid columns={3}>
          <Title>AM/PM</Title>
          <Title>Hours</Title>
          <Title>Minutes</Title>
        </Grid>
        {digitalClockProps.mode === 'manual' && (
          <ManualDigitalClock skipDisabledTime {...digitalClockProps} />
        )}
      </>
    );
  }}
/>`.trim()
      }
    }
  }
};

export const CustomPopover: Story = {
  render: (args) => (
    <TimeRangePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};

export const MultiTimePicker: Story = {
  render: () => <MultiTimePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MultiTimePickerTemplate = () => {
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
    <Stack spacing={20} style={{ color: 'on-surface' }}>
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
        <TimePicker
          value={startTime}
          onChange={handleStartTimeChange}
          {...(isChronologicalError && {
            TimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
          })}
        />
        ~
        <TimePicker
          value={endTime}
          onChange={handleEndTimeChange}
          {...(isChronologicalError && {
            TimeFieldProps: {
              color: 'error',
              focusedColor: 'error'
            }
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
