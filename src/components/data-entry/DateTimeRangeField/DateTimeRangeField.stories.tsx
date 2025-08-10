import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeRangeField, DateTimeRangeValidationError, RangeType } from '.';
import {
  DateTimeField,
  DateTimeValidationError,
  DateTimeOptions
} from '@/components/data-entry/DateTimeField';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { FlightLandIcon } from '@/components/icons/FlightLandIcon';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { DateRangeIcon } from '@/components/icons/DateRangeIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

const meta: Meta<typeof DateTimeRangeField> = {
  component: DateTimeRangeField,
  argTypes: {
    centerIcon: {
      description: '두 DateTimeField 중앙에 위치한 아이콘',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: '<ArrowRightAltIcon />' }
      }
    },
    defaultValue: {
      description: '초기 datetime',
      table: {
        type: { summary: '{ start?: Date, end?: Date }' }
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    focusedDateTime: {
      description: '현재 포커스된 DateTimeField',
      table: {
        type: { summary: `'start' | 'end'` }
      }
    },
    endAdornment: {
      description: '뒤에 위치하는 부가 요소 (icon ,text 등)',
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
    dateFormat: {
      description: 'date format',
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
    maxDate: {
      description: '선택 가능한 최대 날짜',
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
    timeMode: {
      description: 'time 선택 방법',
      table: {
        type: { summary: `'preset' | 'manual'` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: { start: Date | null, end: Date | null }, validationError?: { start: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime' | 'minDate' | 'maxDate' | 'disabledDate', end: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime' | 'minDate' | 'maxDate' | 'disabledDate', chronologicalOrder: boolean, includeDisabledDate: boolean }) => void;`
        }
      }
    },
    options: {
      description: 'datetime 속성',
      table: {
        type: {
          summary: `DateOptions & TimeOptions`
        }
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
          summary: `boolean`
        }
      }
    },
    startAdornment: {
      description: '앞에 위치하는 부가 요소 (icon ,text 등)',
      table: {
        type: {
          summary: `{ start?: React.ReactNode; end?: React.ReactNode, dateTimeRangeField?: React.ReactNode }`
        }
      }
    },
    timeStep: {
      description: '두 time options 간 step',
      table: {
        type: {
          summary: `timeMode='preset' ? number : {hour: number, minute: number, second: number}`
        }
      }
    },
    value: {
      description: 'datetime',
      table: {
        type: {
          summary: `{ start: Date | null, end: Date | null }`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimeRangeField>;

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateTimeOptions> = [
  {
    dateStyle: 'medium',
    timeStyle: 'medium'
  },
  {
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h24'
  },
  {
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  },
  {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    hour12: true
  }
];
const FORMATS = [
  { dateFormat: 'YYYY년 M월 D일', timeFormat: 'TT시 mm분' },
  { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm:ss' }
];
const DEFAULT_VALUE = {
  start: new Date(2025, 6, 8, 12, 30),
  end: new Date(2025, 6, 13, 17, 20)
};

const DateTimeStr = ({ date }: { date: Date | null }) => {
  const year = date?.getFullYear();
  const month = date?.getMonth();
  const day = date?.getDate();
  const hour = date?.getHours();
  const minute = date?.getMinutes();
  const second = date?.getSeconds();

  return (
    <Text
      style={{ display: 'inline-flex', gap: '2px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
      &nbsp;
      <span>{hour !== undefined && `${hour}시`}</span>
      <span>{minute !== undefined && `${minute}분`}</span>
      <span>{second !== undefined && `${second}초`}</span>
    </Text>
  );
};

const ControlledDateTimeRangeFieldTemplate = ({ ...props }) => {
  const [value, setValue] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [validationError, setValidationError] =
    useState<DateTimeRangeValidationError>();

  const getErrorMessage = (error: DateTimeValidationError): string => {
    switch (error) {
      case 'minTime':
        return '최소 시간보다 작습니다.';
      case 'maxTime':
        return '최대 시간보다 큽니다.';
      case 'disabledTime':
        return '해당 시간은 비활성화되어 있습니다.';
      case 'timeStep':
        return '선택할 수 없는 시간입니다.';
      case 'minDate':
        return '최소 날짜보다 작습니다.';
      case 'maxDate':
        return '최대 날짜보다 큽니다.';
      case 'disabledDate':
        return '해당 날짜는 비활성화되어 있습니다.';
      default:
        return '유효하지 않은 날짜와 시간입니다.';
    }
  };

  const handleChange = (
    newValue: RangeType<Date | null>,
    validationError?: DateTimeRangeValidationError
  ) => {
    setValue(newValue);
    setValidationError(validationError);
  };

  let errorMessage: string = '';
  if (validationError?.['chronologicalOrder']) {
    errorMessage = '시작 날짜가 끝 날짜보다 큽니다.';
  } else if (validationError?.['includeDisabledDate']) {
    errorMessage = '비활성화된 날짜가 포함되어 있습니다.';
  } else if (validationError?.start) {
    errorMessage = 'start dateTime: ' + getErrorMessage(validationError.start);
  } else if (validationError?.end) {
    errorMessage = 'end dateTime: ' + getErrorMessage(validationError.end);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        DateTime:
        <DateTimeStr date={value.start} />
        <span>-</span>
        <DateTimeStr date={value.end} />
      </Stack>
      <DateTimeRangeField value={value} onChange={handleChange} {...props} />
      <Text style={{ color: 'error' }}>{errorMessage}</Text>
    </Stack>
  );
};

const MultiDateTimeFieldTemplate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startValidationError, setStartValidationError] =
    useState<DateTimeValidationError>();
  const [endValidationError, setEndValidationError] =
    useState<DateTimeValidationError>();

  const isLowerThan = ({
    baseDate,
    targetDate
  }: {
    baseDate: Date | null;
    targetDate: Date | null;
  }): boolean => {
    if (!baseDate || !targetDate) return false;
    return baseDate.getTime() > targetDate.getTime();
  };

  const getErrorMessage = (error: DateTimeValidationError): string => {
    switch (error) {
      case 'minTime':
        return '최소 시간보다 작습니다.';
      case 'maxTime':
        return '최대 시간보다 큽니다.';
      case 'disabledTime':
        return '해당 시간은 비활성화되어 있습니다.';
      case 'timeStep':
        return '선택할 수 없는 시간입니다.';
      case 'minDate':
        return '최소 날짜보다 작습니다.';
      case 'maxDate':
        return '최대 날짜보다 큽니다.';
      case 'disabledDate':
        return '해당 날짜는 비활성화되어 있습니다.';
      default:
        return '유효하지 않은 날짜와 시간입니다.';
    }
  };

  const handleStartDateChange = (
    value: Date | null,
    validationError?: DateTimeValidationError
  ) => {
    setStartDate(value);
    setStartValidationError(validationError);
  };
  const handleEndDateChange = (
    value: Date | null,
    validationError?: DateTimeValidationError
  ) => {
    setEndDate(value);
    setEndValidationError(validationError);
  };

  const isChronologicalError = isLowerThan({
    baseDate: startDate,
    targetDate: endDate
  });
  const isStartDateTimeValidationError =
    !!startValidationError || isChronologicalError;
  const isEndDateTimeValidationError =
    !!endValidationError || isChronologicalError;

  let errorMessage: string = '';
  if (isChronologicalError) {
    errorMessage = '시작 날짜가 끝 날짜보다 큽니다.';
  } else if (startValidationError) {
    errorMessage = 'start date: ' + getErrorMessage(startValidationError);
  } else if (endValidationError) {
    errorMessage = 'end date: ' + getErrorMessage(endValidationError);
  }

  return (
    <Stack>
      <Stack direction="row" spacing={8} style={{ alignItems: 'center' }}>
        <span>Date:</span>
        <DateTimeStr date={startDate} />
        <span>-</span>
        <DateTimeStr date={endDate} />
      </Stack>
      <Stack direction="row" spacing={20}>
        <DateTimeField
          value={startDate}
          onChange={handleStartDateChange}
          color={isStartDateTimeValidationError ? 'error' : undefined}
          focusedColor={isStartDateTimeValidationError ? 'error' : undefined}
          minDate={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minDate='2025/8/10'`}
        />
        ~
        <DateTimeField
          value={endDate}
          onChange={handleEndDateChange}
          color={isEndDateTimeValidationError ? 'error' : undefined}
          focusedColor={isEndDateTimeValidationError ? 'error' : undefined}
          minDate={new Date(2025, 7, 10, 3, 30)}
          placeholder={`minDate='2025/8/10'`}
        />
      </Stack>
      {errorMessage && <Text style={{ color: 'error' }}>{errorMessage}</Text>}
    </Stack>
  );
};

export const BasicDateTimeRangeField: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateTimeRangeField />
      <DateTimeRangeField
        placeholder={{
          start: 'Select Start DateTime',
          end: 'Select End DateTime'
        }}
      />
      <DateTimeRangeField defaultValue={DEFAULT_VALUE} />
    </Stack>
  )
};

export const ControlledDateTimeRangeField: Story = {
  render: () => <ControlledDateTimeRangeFieldTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateTimeRangeField locale={locale} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)}>
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
          <DateTimeRangeField options={options} defaultValue={DEFAULT_VALUE} />
        </Stack>
      ))}
    </Grid>
  )
};

export const CustomizeDateTimeFormat: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {FORMATS.map(({ dateFormat, timeFormat }) => (
        <Stack key={dateFormat}>
          <Text>{`Format: '${dateFormat} ${timeFormat}'`}</Text>
          <DateTimeRangeField
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            defaultValue={DEFAULT_VALUE}
          />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) MinDate = 2025/06/30
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          minDate={new Date('2025-06-30')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) MaxDate = 2025/07/20
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          maxDate={new Date('2025-07-20')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          3) DisabledDates = 2025/07/10, 2025/07/15
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
        />
      </Stack>
    </Grid>
  )
};

export const RestrictTime: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) MinTime = 14:30
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          timeFormat="HH:mm"
          minTime={new Date('2025-06-30T14:30')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) MaxTime = 17:25
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          timeFormat="HH:mm"
          maxTime={new Date('2025-06-30T17:25')}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          3) DisabledTimes = 12:30, 14:10
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          timeFormat="HH:mm"
          disabledTimes={[
            new Date('2025-06-30T14:10'),
            new Date('2025-06-30T12:30')
          ]}
        />
      </Stack>
    </Grid>
  )
};

export const TimeSteps: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          1) Preset Mode (TimeStep = 30 minutes)
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          timeMode="preset"
          timeFormat="HH:mm"
          timeStep={30 * 60}
        />
      </Stack>
      <Stack>
        <Text style={{ marginBottom: '0', fontWeight: 700 }}>
          2) Manual Mode (TimeStep = 2 hours/10 minutes/10 seconds)
        </Text>
        <ControlledDateTimeRangeFieldTemplate
          timeMode="manual"
          timeFormat="HH:mm:ss"
          timeStep={{ hour: 2, minute: 10, second: 10 }}
        />
      </Stack>
    </Grid>
  )
};

export const Variants: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateTimeRangeField key={variant} variant={variant} />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateTimeRangeField
          key={size}
          size={size}
          defaultValue={DEFAULT_VALUE}
        />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => <DateTimeRangeField defaultValue={DEFAULT_VALUE} readOnly />
};

export const Disabled: Story = {
  render: () => <DateTimeRangeField defaultValue={DEFAULT_VALUE} disabled />
};

export const Color: Story = {
  render: () => (
    <DateTimeRangeField color="yellow-400" focusedColor="yellow-400" />
  )
};

export const FullWidth: Story = {
  render: () => <DateTimeRangeField fullWidth />
};

export const Adornments: Story = {
  render: () => (
    <DateTimeRangeField
      placeholder={{ start: 'Flight Departure', end: 'Flight Arrival' }}
      startAdornment={{
        start: <FlightTakeOffIcon size={20} color="gray-600" />,
        end: <FlightLandIcon size={20} color="gray-600" />
      }}
      endAdornment={{
        dateTimeRangeField: <DateRangeIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => <DateTimeRangeField disableHoverEffect disableFocusEffect />
};

export const CustomCenterIcon: Story = {
  render: () => (
    <DateTimeRangeField
      centerIcon={<ArrowRightIcon size={20} color="gray-500" />}
    />
  )
};

export const MultiDateTimeField: Story = {
  render: () => <MultiDateTimeFieldTemplate />
};
