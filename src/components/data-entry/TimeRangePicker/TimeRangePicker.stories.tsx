import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TimeRangePicker from './TimeRangePicker';
import { TimePicker } from '@/components/data-entry/TimePicker';
import {
  TimeRangeValidationError,
  RangeType
} from '@/components/data-entry/TimeRangeField';
import {
  TimeOptions,
  TimeValidationError
} from '@/components/data-entry/TimeField';
import { DigitalClock } from '@/components/data-entry/DigitalClock';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { Button } from '@/components/general/Button';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
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
        type: { summary: `{ start?: boolean, end?: boolean }` },
        defaultValue: { summary: `{ start?: false, end?: false }` }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: `{ start?: Array<Date>, end?: Array<Date> }` }
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
        type: { summary: '{ start?: Date, end?: Date }' }
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
          summary: `(value: { start?: Date | null, end?: Date | null }, validationError?: { start?: ValidationError, end?: ValidationError, chronologicalOrder?: boolean }) => void;`
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
        },
        defaultValue: { summary: `{ start?: false, end?: false }` }
      }
    },
    renderDigitalClock: {
      description:
        'digitalClockProps를 입력값으로 받아 DigitalClock 컴포넌트를 렌더하는 함수',
      table: {
        type: {
          summary: `(digitalClockProps: DigitalClockProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(digitalClockProps: DigitalClockProps) => <DigitalClock {...digitalClockProps} />`
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
          summary: `mode='preset' ? 3600 : {hour: 1, minute: 1, second: 1}`
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

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<TimeOptions> = [
  {
    timeStyle: 'medium'
  },
  {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h24'
  }
];
const DEFAULT_VALUE = {
  start: new Date(2025, 7, 8, 12, 30),
  end: new Date(2025, 7, 8, 17, 0)
};
const MIN_TIME = new Date('2025-06-30T14:30');
const MAX_TIME = new Date('2025-06-30T17:25');
const DISABLED_TIMES = [
  new Date('2025-06-30T14:10'),
  new Date('2025-06-30T12:30')
];

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

const ControlledTimeRangePickerTemplate = ({ ...props }) => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [validationError, setValidationError] =
    useState<TimeRangeValidationError>();

  const getTime = (timePosition: 'start' | 'end') => ({
    hour: value[timePosition]?.getHours(),
    minute: value[timePosition]?.getMinutes(),
    second: value[timePosition]?.getSeconds()
  });

  const getErrorMessage = (error: TimeValidationError): string => {
    switch (error) {
      case 'minTime':
        return '최소 시간보다 작습니다.';
      case 'maxTime':
        return '최대 시간보다 큽니다.';
      case 'disabledTime':
        return '해당 시간은 비활성화되어 있습니다.';
      case 'timeStep':
        return '선택할 수 없는 시간입니다.';
    }
  };

  const handleChange = (
    newValue: RangeType<Date | null>,
    validationError?: TimeRangeValidationError
  ) => {
    setValue(newValue);
    setValidationError(validationError);
  };

  let errorMessage: string = '';
  if (validationError?.['chronologicalOrder']) {
    errorMessage = '시작 시간이 끝 시간보다 큽니다.';
  } else if (validationError?.start) {
    errorMessage = 'start time: ' + getErrorMessage(validationError.start);
  } else if (validationError?.end) {
    errorMessage = 'end time: ' + getErrorMessage(validationError.end);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Time:</span>
        <Time {...getTime('start')} />
        <span>-</span>
        <Time {...getTime('end')} />
      </Stack>
      <TimeRangePicker value={value} onChange={handleChange} {...props} />
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

const LocaleTemplate = () => {
  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocale(event.target.value);
  };

  return (
    <Stack>
      <Grid columns={LOCALES.length}>
        {LOCALES.map((locale) => (
          <RadioLabel key={locale} label={locale}>
            <Radio
              value={locale}
              checked={selectedLocale === locale}
              onChange={handleChange}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Stack key={selectedLocale} style={{ alignItems: 'center' }}>
        <Text>{`Locale: '${selectedLocale}'`}</Text>
        <Stack spacing={20}>
          <TimeRangePicker
            locale={selectedLocale}
            defaultValue={DEFAULT_VALUE}
          />
          <TimeRangePicker
            locale={selectedLocale}
            defaultValue={DEFAULT_VALUE}
            mode="manual"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const OptionsTemplate = () => {
  const [selectedOptionsIdx, setSelectedOptionsIdx] = useState<number>(0);

  const handleChange = (idx: number) => {
    setSelectedOptionsIdx(idx);
  };

  return (
    <Stack>
      <Grid columns={OPTIONS.length}>
        {OPTIONS.map((option, idx) => (
          <RadioLabel key={idx} label={JSON.stringify(option)}>
            <Radio
              value={idx}
              checked={selectedOptionsIdx === idx}
              onChange={() => handleChange(idx)}
            />
          </RadioLabel>
        ))}
      </Grid>
      <Stack key={selectedOptionsIdx} style={{ alignItems: 'center' }}>
        <Text>{`Options: '${JSON.stringify(OPTIONS[selectedOptionsIdx])}'`}</Text>
        <Stack spacing={20}>
          <TimeRangePicker
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={DEFAULT_VALUE}
          />
          <TimeRangePicker
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={DEFAULT_VALUE}
            mode="manual"
          />
        </Stack>
      </Stack>
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
        color: 'gray-600',
        textAlign: 'center'
      }}
    >
      {children}
    </Text>
  );
};

const CustomDigitalClockTemplate = () => {
  return (
    <TimeRangePicker
      mode="manual"
      disabledTimes={{ start: DISABLED_TIMES, end: DISABLED_TIMES }}
      renderDigitalClock={(digitalClockProps) => {
        return (
          <>
            <Grid columns={3}>
              <Title>AM/PM</Title>
              <Title>Hours</Title>
              <Title>Minutes</Title>
            </Grid>
            <DigitalClock skipDisabledTime {...digitalClockProps} />
          </>
        );
      }}
    />
  );
};

const MultiTimePickerTemplate = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startValidationError, setStartValidationError] =
    useState<TimeValidationError>();
  const [endValidationError, setEndValidationError] =
    useState<TimeValidationError>();
  const isChronologicalError =
    startTime &&
    endTime &&
    startTime.getHours() * 60 + startTime.getMinutes() >
      endTime.getHours() * 60 + endTime.getMinutes();
  const isStartTimeValidationError =
    !!startValidationError || isChronologicalError;
  const isEndTimeValidationError = !!endValidationError || isChronologicalError;

  const getTime = (time: Date | null) => ({
    hour: time?.getHours(),
    minute: time?.getMinutes(),
    second: time?.getSeconds()
  });

  const getErrorMessage = (error: TimeValidationError): string => {
    switch (error) {
      case 'minTime':
        return '최소 시간보다 작습니다.';
      case 'maxTime':
        return '최대 시간보다 큽니다.';
      case 'disabledTime':
        return '해당 시간은 비활성화되어 있습니다.';
      case 'timeStep':
        return '선택할 수 없는 시간입니다.';
    }
  };

  const handleStartTimeChange = (
    value: Date | null,
    validationError?: TimeValidationError
  ) => {
    setStartTime(value);
    setStartValidationError(validationError);
  };
  const handleEndTimeChange = (
    value: Date | null,
    validationError?: TimeValidationError
  ) => {
    setEndTime(value);
    setEndValidationError(validationError);
  };

  let errorMessage: string = '';
  if (isChronologicalError) {
    errorMessage = '시작 시간이 끝 시간보다 큽니다.';
  } else if (startValidationError) {
    errorMessage = 'start time: ' + getErrorMessage(startValidationError);
  } else if (endValidationError) {
    errorMessage = 'end time: ' + getErrorMessage(endValidationError);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Time:</span>
        <Time {...getTime(startTime)} />
        <span>-</span>
        <Time {...getTime(endTime)} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <TimePicker
          value={startTime}
          onChange={handleStartTimeChange}
          minTime={MIN_TIME}
          TimeFieldProps={{
            placeholder: `minTime='3:30'`,
            color: isStartTimeValidationError ? 'error' : undefined,
            focusedColor: isStartTimeValidationError ? 'error' : undefined
          }}
        />
        ~
        <TimePicker
          value={endTime}
          onChange={handleEndTimeChange}
          minTime={MIN_TIME}
          TimeFieldProps={{
            placeholder: `minTime='3:30'`,
            color: isEndTimeValidationError ? 'error' : undefined,
            focusedColor: isEndTimeValidationError ? 'error' : undefined
          }}
        />
      </Stack>
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

export const Mode: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker mode="preset" />
      <TimeRangePicker mode="manual" />
    </Stack>
  )
};

export const DefaultValue: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker mode="preset" defaultValue={DEFAULT_VALUE} />
      <TimeRangePicker mode="manual" defaultValue={DEFAULT_VALUE} />
    </Stack>
  )
};

export const FormWithTimeRangePicker: Story = {
  render: () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const startTime = formData.get('startTime');
        const endTime = formData.get('endTime');
        alert(`startTime: ${startTime}\nendTime: ${endTime}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <TimeRangePicker
        name={{ start: 'startTime', end: 'endTime' }}
        mode="manual"
      />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  )
};

export const ControlledTimeRangePicker: Story = {
  render: () => (
    <Stack spacing={20}>
      <ControlledTimeRangePickerTemplate />
      <ControlledTimeRangePickerTemplate mode="manual" />
    </Stack>
  )
};

export const Locale: Story = {
  render: () => <LocaleTemplate />
};

export const Options: Story = {
  render: () => <OptionsTemplate />
};

export const Readonly: Story = {
  render: () => (
    <TimeRangePicker
      defaultValue={DEFAULT_VALUE}
      readOnly={{ start: true, end: true }}
    />
  )
};

export const Disabled: Story = {
  render: () => (
    <TimeRangePicker
      defaultValue={DEFAULT_VALUE}
      disabled={{ start: true, end: true }}
    />
  )
};

export const MinMaxTime: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker
        minTime={{ start: MIN_TIME, end: MIN_TIME }}
        maxTime={{ start: MAX_TIME, end: MAX_TIME }}
      />
      <TimeRangePicker
        mode="manual"
        minTime={{ start: MIN_TIME, end: MIN_TIME }}
        maxTime={{ start: MAX_TIME, end: MAX_TIME }}
      />
    </Stack>
  )
};

export const DisabledTimes: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker
        disabledTimes={{ start: DISABLED_TIMES, end: DISABLED_TIMES }}
      />
      <TimeRangePicker
        mode="manual"
        disabledTimes={{ start: DISABLED_TIMES, end: DISABLED_TIMES }}
      />
    </Stack>
  )
};

export const TimeSteps: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker timeStep={10 * 60} />
      <TimeRangePicker
        mode="manual"
        timeStep={{ hour: 2, minute: 10, second: 30 }}
        options={{ timeStyle: 'medium' }}
      />
    </Stack>
  )
};

export const CustomPopover: Story = {
  render: () => (
    <TimeRangePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        PopoverContentProps: { elevation: 10 }
      }}
    />
  )
};

export const Placeholder: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        placeholder: { start: 'Select Start Time', end: 'Select End Time' }
      }}
    />
  )
};

export const TimeFormat: Story = {
  render: () => (
    <TimeRangePicker TimeRangeFieldProps={{ format: 'A hh시 mm분' }} />
  )
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker
        TimeRangeFieldProps={{
          variant: 'filled',
          placeholder: { start: 'filled', end: 'filled' }
        }}
      />
      <TimeRangePicker
        TimeRangeFieldProps={{
          variant: 'outlined',
          placeholder: { start: 'outlined', end: 'outlined' }
        }}
      />
      <TimeRangePicker
        TimeRangeFieldProps={{
          variant: 'underlined',
          placeholder: { start: 'underlined', end: 'underlined' }
        }}
      />
      <TimeRangePicker
        TimeRangeFieldProps={{
          variant: 'borderless',
          placeholder: { start: 'borderless', end: 'borderless' }
        }}
      />
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={20}>
      <TimeRangePicker
        TimeRangeFieldProps={{
          size: 'sm',
          placeholder: { start: 'sm', end: 'sm' }
        }}
      />
      <TimeRangePicker
        TimeRangeFieldProps={{
          size: 'md',
          placeholder: { start: 'md', end: 'md' }
        }}
      />
      <TimeRangePicker
        TimeRangeFieldProps={{
          size: 'lg',
          placeholder: { start: 'lg', end: 'lg' }
        }}
      />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        color: 'yellow-400',
        focusedColor: 'yellow-400'
      }}
    />
  )
};

export const FullWidth: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        fullWidth: true
      }}
    />
  )
};

export const Adornments: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        placeholder: { start: 'Flight Departure', end: 'Flight Arrival' },
        startAdornment: {
          start: <FlightTakeOffIcon size={20} color="gray-600" />,
          end: <FlightLandIcon size={20} color="gray-600" />
        }
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        disableHoverEffect: true,
        disableFocusEffect: true
      }}
    />
  )
};

export const CustomCenterIcon: Story = {
  render: () => (
    <TimeRangePicker
      TimeRangeFieldProps={{
        centerIcon: <ArrowRightIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const CustomDigitalClock: Story = {
  render: () => <CustomDigitalClockTemplate />
};

export const MultiTimePicker: Story = {
  render: () => <MultiTimePickerTemplate />
};
