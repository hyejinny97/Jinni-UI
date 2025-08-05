import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateTimeField, DateTimeValidationError, DateTimeOptions } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';

const meta: Meta<typeof DateTimeField> = {
  component: DateTimeField,
  argTypes: {
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
          summary: `(value: Date, validationError?: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime' | 'minDate' | 'maxDate' | 'disabledDate') => void;`
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
type Story = StoryObj<typeof DateTimeField>;

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

const ControlledDateTimeFieldTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const second = value?.getSeconds();

  const handleChange = (
    newValue: Date,
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
      <DateTimeField value={value} onChange={handleChange} {...props} />
      <Text style={{ color: 'error' }}>{errorMessage}</Text>
    </Stack>
  );
};

export const BasicDateTimeField: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      <DateTimeField />
      <DateTimeField placeholder="Select Date and Time" />
      <DateTimeField defaultValue={new Date()} />
      <DateTimeField defaultValue={new Date('2025-06-30T14:30')} />
      <DateTimeField defaultValue={new Date('December 17, 1995 03:24:00')} />
      <DateTimeField defaultValue={new Date(2025, 7, 20, 8, 45)} />
    </Grid>
  )
};

export const ControlledDateTimeField: Story = {
  render: () => <ControlledDateTimeFieldTemplate />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <DateTimeField locale={locale} defaultValue={new Date()} />
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
          <DateTimeField options={options} defaultValue={new Date()} />
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
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
          <DateTimeField
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            defaultValue={new Date()}
          />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictDate: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      <ControlledDateTimeFieldTemplate
        placeholder="MinDate=2025/06/30"
        minDate={new Date('2025-06-30')}
      />
      <ControlledDateTimeFieldTemplate
        placeholder="MaxDate=2025/07/20"
        maxDate={new Date('2025-07-20')}
      />
      <ControlledDateTimeFieldTemplate
        placeholder="DisabledDates=2025/07/10,2025/07/15"
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
      />
    </Grid>
  )
};

export const RestrictTime: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      <ControlledDateTimeFieldTemplate
        placeholder="MinTime=14:30"
        timeFormat="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
      />
      <ControlledDateTimeFieldTemplate
        placeholder="MaxTime=17:25"
        timeFormat="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
      />
      <ControlledDateTimeFieldTemplate
        placeholder="DisabledTimes=12:30,14:10"
        timeFormat="HH:mm"
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
    <Grid columns={2} spacing={20}>
      <ControlledDateTimeFieldTemplate
        timeMode="preset"
        placeholder="TimeStep=30 minutes"
        timeFormat="HH:mm"
        timeStep={30 * 60}
      />
      <ControlledDateTimeFieldTemplate
        timeMode="manual"
        placeholder="TimeStep=2 hours/10 minutes/10 seconds"
        timeFormat="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
      />
    </Grid>
  )
};

export const Variants: Story = {
  render: () => (
    <Grid columns={1} spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <DateTimeField
            key={variant}
            variant={variant}
            placeholder={variant}
          />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateTimeField key={size} size={size} placeholder={size} />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: () => (
    <DateTimeField defaultValue={new Date('2025-06-30T14:10')} readOnly />
  )
};

export const Disabled: Story = {
  render: () => (
    <DateTimeField defaultValue={new Date('2025-06-30T14:10')} disabled />
  )
};

export const Color: Story = {
  render: () => (
    <DateTimeField
      placeholder='color="yellow-400"'
      color="yellow-400"
      focusedColor="yellow-400"
    />
  )
};

export const FullWidth: Story = {
  render: () => <DateTimeField placeholder="fullWidth" fullWidth />
};

export const Adornments: Story = {
  render: () => (
    <DateTimeField
      placeholder="startAdornment"
      startAdornment={<AccessTimeIcon size={20} color="gray-500" />}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <Grid columns={2} spacing={20}>
      <DateTimeField placeholder="disableHoverEffect" disableHoverEffect />
      <DateTimeField placeholder="disableFocusEffect" disableFocusEffect />
    </Grid>
  )
};
