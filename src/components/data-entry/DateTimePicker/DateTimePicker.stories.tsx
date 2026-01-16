import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from '@/components/data-entry/DateTimePicker';
import {
  DateTimeValidationError,
  DateTimeOptions
} from '@/components/data-entry/DateTimeField';
import { DigitalClock } from '@/components/data-entry/DigitalClock';
import { Calendar, CalendarProps } from '@/components/data-entry/Calendar';
import { Button } from '@/components/general/Button';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  argTypes: {
    DateTimeFieldProps: {
      description: 'DateTimeField 컴포넌트의 Props',
      table: {
        type: { summary: 'DateTimeFieldProps' }
      }
    },
    defaultValue: {
      description: '초기 datetime',
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
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
    name: {
      description: 'input name',
      table: {
        type: { summary: 'string' }
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
          summary: `(value: Date | null, validationError?: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime' | 'minDate' | 'maxDate' | 'disabledDate') => void;`
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
          summary: `boolean`
        }
      }
    },
    renderCalendar: {
      description:
        'calendarProps를 인자로 받아 Calendar 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(calendarProps: CalendarProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(calendarProps: CalendarProps) => <Calendar {...calendarProps} />;`
        }
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
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

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

const ControlledDateTimePickerTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const second = value?.getSeconds();

  const handleChange = (
    newValue: Date | null,
    validationError?: DateTimeValidationError
  ) => {
    setValue(newValue);
    if (validationError) {
      switch (validationError) {
        case 'minTime':
          setErrorMessage('최소 시간보다 작습니다.');
          break;
        case 'maxTime':
          setErrorMessage('최대 시간보다 큽니다.');
          break;
        case 'disabledTime':
          setErrorMessage('해당 시간은 비활성화되어 있습니다.');
          break;
        case 'timeStep':
          setErrorMessage('선택할 수 없는 시간입니다.');
          break;
        case 'minDate':
          setErrorMessage('최소 날짜보다 작습니다.');
          break;
        case 'maxDate':
          setErrorMessage('최대 날짜보다 큽니다.');
          break;
        case 'disabledDate':
          setErrorMessage('해당 날짜는 비활성화되어 있습니다.');
          break;
        default:
          setErrorMessage('유효하지 않은 날짜와 시간입니다.');
      }
    } else {
      setErrorMessage(undefined);
    }
  };

  return (
    <Stack>
      <Text style={{ display: 'inline-flex', gap: '5px' }}>
        DateTime:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day}`}</span>
        &nbsp;
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
        <span>{second !== undefined && `${second}초`}</span>
      </Text>
      <DateTimePicker value={value} onChange={handleChange} {...props} />
      <Text style={{ color: 'error' }}>{errorMessage}</Text>
    </Stack>
  );
};

export const Basic: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker />
      <DateTimePicker defaultValue={new Date()} />
    </Stack>
  )
};

export const TimeMode: Story = {
  render: () => (
    <DateTimePicker
      timeMode="preset"
      defaultValue={new Date(2025, 7, 6, 2, 30)}
    />
  )
};

export const FormWithDateTimePicker: Story = {
  render: () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const datetime = formData.get('datetime');
        alert(`datetime: ${datetime}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <DateTimePicker name="datetime" />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  )
};

export const ControlledDateTimePicker: Story = {
  render: () => <ControlledDateTimePickerTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={2} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateTimePicker locale={locale} defaultValue={new Date()} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {OPTIONS.map((options) => (
        <Stack key={JSON.stringify(options)} direction="row" spacing={20}>
          <DateTimePicker options={options} defaultValue={new Date()} />
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
        </Stack>
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => (
    <DateTimePicker defaultValue={new Date('2025-06-30T14:10')} readOnly />
  )
};

export const Disabled: Story = {
  render: () => (
    <DateTimePicker defaultValue={new Date('2025-06-30T14:10')} disabled />
  )
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{ placeholder: 'MinDate=2025/06/30' }}
        minDate={new Date('2025-06-30')}
      />
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{ placeholder: 'MaxDate=2025/07/20' }}
        maxDate={new Date('2025-07-20')}
      />
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{
          placeholder: 'DisabledDates=2025/07/10,2025/07/15'
        }}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
      />
    </Grid>
  )
};

export const RestrictTime: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{
          placeholder: 'MinTime=14:30',
          timeFormat: 'HH:mm'
        }}
        minTime={new Date('2025-06-30T14:30')}
      />
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{
          placeholder: 'MaxTime=17:25',
          timeFormat: 'HH:mm'
        }}
        maxTime={new Date('2025-06-30T17:25')}
      />
      <ControlledDateTimePickerTemplate
        DateTimeFieldProps={{
          placeholder: 'DisabledTimes=12:30,14:10',
          timeFormat: 'HH:mm'
        }}
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
      />
    </Grid>
  )
};

export const TimeSteps: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <DateTimePicker timeMode="preset" timeStep={10 * 60} />
      <DateTimePicker
        timeMode="manual"
        timeStep={{ hour: 2, minute: 10, second: 30 }}
        options={{ timeStyle: 'medium' }}
      />
    </Stack>
  )
};

export const CustomPopover: Story = {
  render: () => (
    <DateTimePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
    />
  )
};

export const Placeholder: Story = {
  render: () => (
    <DateTimePicker
      DateTimeFieldProps={{ placeholder: 'Select Date and Time' }}
    />
  )
};

export const DateTimeFormat: Story = {
  render: () => (
    <DateTimePicker
      DateTimeFieldProps={{
        dateFormat: 'YYYY년 M월 D일',
        timeFormat: 'TT시 mm분'
      }}
    />
  )
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={20}>
      <DateTimePicker
        DateTimeFieldProps={{ variant: 'filled', placeholder: 'filled' }}
      />
      <DateTimePicker
        DateTimeFieldProps={{ variant: 'outlined', placeholder: 'outlined' }}
      />
      <DateTimePicker
        DateTimeFieldProps={{
          variant: 'underlined',
          placeholder: 'underlined'
        }}
      />
      <DateTimePicker
        DateTimeFieldProps={{
          variant: 'borderless',
          placeholder: 'borderless'
        }}
      />
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <DateTimePicker DateTimeFieldProps={{ size: 'sm', placeholder: 'sm' }} />
      <DateTimePicker DateTimeFieldProps={{ size: 'md', placeholder: 'md' }} />
      <DateTimePicker DateTimeFieldProps={{ size: 'lg', placeholder: 'lg' }} />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <DateTimePicker
      DateTimeFieldProps={{ color: 'yellow-400', focusedColor: 'yellow-400' }}
    />
  )
};

export const FullWidth: Story = {
  render: () => <DateTimePicker DateTimeFieldProps={{ fullWidth: true }} />
};

export const Adornments: Story = {
  render: () => (
    <DateTimePicker
      DateTimeFieldProps={{
        startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <DateTimePicker
      DateTimeFieldProps={{
        disableHoverEffect: true,
        disableFocusEffect: true
      }}
    />
  )
};

export const CustomDigitalClock: Story = {
  render: () => (
    <DateTimePicker
      maxTime={new Date(2025, 7, 4, 16, 30)}
      renderDigitalClock={(digitalClockProps) => {
        return <DigitalClock skipDisabledTime {...digitalClockProps} />;
      }}
    />
  )
};

export const CustomCalendar: Story = {
  render: () => (
    <DateTimePicker
      renderCalendar={(calendarProps: CalendarProps) => (
        <Calendar
          {...calendarProps}
          yearsOrder="dsc"
          referenceDate={new Date('2022-06-15')}
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          displayWeekNumber
        />
      )}
    />
  )
};
