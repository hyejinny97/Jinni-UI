import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeRangeField, TimeRangeValidationError, RangeType } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import {
  TimeOptions,
  ValidationError,
  TimeField
} from '@/components/data-entry/TimeField';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

const meta: Meta<typeof TimeRangeField> = {
  component: TimeRangeField,
  argTypes: {
    centerIcon: {
      description: '두 TimeField 중앙에 위치한 아이콘',
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
    endAdornment: {
      description: '뒤에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, timeRangeField?: React.ReactNode }`
        }
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
          summary: `(value: { start?: Date | null, end?: Date | null }, validationError: { start?: ValidationError, end?: ValidationError, chronologicalOrder?: boolean }) => void;`
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
        },
        defaultValue: { summary: `{ start?: false, end?: false }` }
      }
    },
    startAdornment: {
      description: '앞에 위치하는 부가 요소 (icon ,text 등)',
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
  },
  {
    minute: 'numeric',
    second: 'numeric'
  },
  {
    hour: '2-digit',
    hour12: true
  }
];
const FORMATS = ['tt:mm a', 'HH:mm:ss', 'TT시 mm분'];
const DEFAULT_VALUE = {
  start: new Date(2025, 7, 8, 12, 30),
  end: new Date(2025, 7, 8, 17, 20)
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
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{hour !== undefined && `${hour}시`}</span>
      <span>{minute !== undefined && `${minute}분`}</span>
      <span>{second !== undefined && `${second}초`}</span>
    </Text>
  );
};

const ControlledTimeRangeFieldTemplate = ({ ...props }) => {
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

  const getErrorMessage = (error: ValidationError): string => {
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
      <TimeRangeField value={value} onChange={handleChange} {...props} />
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

const MultiTimeFieldTemplate = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startValidationError, setStartValidationError] =
    useState<ValidationError>();
  const [endValidationError, setEndValidationError] =
    useState<ValidationError>();
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

  const getErrorMessage = (error: ValidationError): string => {
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
    validationError?: ValidationError
  ) => {
    setStartTime(value);
    setStartValidationError(validationError);
  };
  const handleEndTimeChange = (
    value: Date | null,
    validationError?: ValidationError
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
        <TimeField
          value={startTime}
          onChange={handleStartTimeChange}
          color={isStartTimeValidationError ? 'error' : undefined}
          focusedColor={isStartTimeValidationError ? 'error' : undefined}
          minTime={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minTime='3:30'`}
        />
        ~
        <TimeField
          value={endTime}
          onChange={handleEndTimeChange}
          color={isEndTimeValidationError ? 'error' : undefined}
          focusedColor={isEndTimeValidationError ? 'error' : undefined}
          minTime={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minTime='3:30'`}
        />
      </Stack>
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
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
      <TimeRangeField defaultValue={DEFAULT_VALUE} {...args} />
    </Stack>
  )
};

export const ControlledTimeRangeField: Story = {
  render: (args) => <ControlledTimeRangeFieldTemplate {...args} />
};

export const Locale: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <TimeRangeField
            locale={locale}
            defaultValue={DEFAULT_VALUE}
            {...args}
          />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)} direction="row" spacing={20}>
          <TimeRangeField
            options={options}
            defaultValue={DEFAULT_VALUE}
            {...args}
          />
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
        </Stack>
      ))}
    </Grid>
  )
};

export const CustomizeTimeFormat: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      {FORMATS.map((format) => (
        <Stack key={format}>
          <Text>{`Format: '${format}'`}</Text>
          <TimeRangeField
            format={format}
            defaultValue={DEFAULT_VALUE}
            {...args}
          />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictTime: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      <ControlledTimeRangeFieldTemplate
        placeholder={{ start: 'MinTime=14:30', end: 'MinTime=14:30' }}
        format="HH:mm"
        minTime={{
          start: MIN_TIME,
          end: MIN_TIME
        }}
        {...args}
      />
      <ControlledTimeRangeFieldTemplate
        placeholder={{ start: 'MaxTime=17:25', end: 'MaxTime=17:25' }}
        format="HH:mm"
        maxTime={{
          start: MAX_TIME,
          end: MAX_TIME
        }}
        {...args}
      />
      <ControlledTimeRangeFieldTemplate
        placeholder={{
          start: 'DisabledTimes=12:30,14:10',
          end: 'DisabledTimes=12:30,14:10'
        }}
        format="HH:mm"
        disabledTimes={{ start: DISABLED_TIMES, end: DISABLED_TIMES }}
        {...args}
      />
    </Grid>
  )
};

export const TimeSteps: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      <ControlledTimeRangeFieldTemplate
        mode="preset"
        placeholder={{
          start: 'TimeStep=30 minutes',
          end: 'TimeStep=30 minutes'
        }}
        format="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <ControlledTimeRangeFieldTemplate
        mode="manual"
        placeholder={{
          start: 'TimeStep=2 hours/10 minutes/10 seconds',
          end: 'TimeStep=2 hours/10 minutes/10 seconds'
        }}
        format="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
    </Grid>
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
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
    </Grid>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Grid columns={1} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TimeRangeField
          key={size}
          size={size}
          placeholder={{ start: size, end: size }}
          {...args}
        />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => (
    <TimeRangeField
      defaultValue={DEFAULT_VALUE}
      readOnly={{ start: true, end: true }}
    />
  )
};

export const Disabled: Story = {
  render: () => (
    <TimeRangeField
      defaultValue={DEFAULT_VALUE}
      disabled={{ start: true, end: true }}
    />
  )
};

export const Color: Story = {
  render: (args) => (
    <TimeRangeField color="yellow-400" focusedColor="yellow-400" {...args} />
  )
};

export const FullWidth: Story = {
  render: (args) => <TimeRangeField fullWidth {...args} />
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
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <TimeRangeField disableHoverEffect disableFocusEffect {...args} />
  )
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
  render: (args) => <MultiTimeFieldTemplate {...args} />
};
