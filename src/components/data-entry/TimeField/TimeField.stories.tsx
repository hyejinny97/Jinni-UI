import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TimeField, ValidationError, TimeFieldProps } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';

const meta: Meta<typeof TimeField> = {
  component: TimeField,
  argTypes: {
    defaultValue: {
      description: '초기 time',
      table: {
        type: { summary: 'Date' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabledTimes: {
      description: '비활성화 하는 특정 시간 모음',
      table: {
        type: { summary: 'Array<Date>' }
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
        type: { summary: 'Date' }
      }
    },
    minTime: {
      description: '선택 가능한 최소 시간',
      table: {
        type: { summary: 'Date' }
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
          summary: `(value: Date, validationError?: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime') => void;`
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
          summary: `string`
        }
      }
    },
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `boolean`
        },
        defaultValue: { summary: 'false' }
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
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimeField>;

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<TimeFieldProps['options']> = [
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

const ControlledTimeFieldTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const second = value?.getSeconds();

  const handleChange = (newValue: Date, validationError?: ValidationError) => {
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
        default:
          setErrorMessage('유효하지 않은 시간입니다.');
      }
    } else {
      setErrorMessage(undefined);
    }
  };

  return (
    <Stack>
      <TimeField value={value} onChange={handleChange} {...props} />
      {errorMessage ? (
        <Text style={{ color: 'error' }}>{errorMessage}</Text>
      ) : (
        <Text style={{ display: 'inline-flex', gap: '5px' }}>
          Time:
          <span>{hour !== undefined && `${hour}시`}</span>
          <span>{minute !== undefined && `${minute}분`}</span>
          <span>{second !== undefined && `${second}초`}</span>
        </Text>
      )}
    </Stack>
  );
};

export const BasicTimeField: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      <TimeField {...args} />
      <TimeField placeholder="Select Time" {...args} />
      <TimeField defaultValue={new Date()} {...args} />
      <TimeField defaultValue={new Date('2025-06-30T14:30')} {...args} />
      <TimeField
        defaultValue={new Date('December 17, 1995 03:24:00')}
        {...args}
      />
      <TimeField defaultValue={new Date(2025, 7, 20, 8, 45)} {...args} />
    </Grid>
  )
};

export const ControlledTimeField: Story = {
  render: (args) => (
    <ControlledTimeFieldTemplate placeholder="Controlled TimeField" {...args} />
  )
};

export const Locale: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <TimeField locale={locale} defaultValue={new Date()} {...args} />
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
          <TimeField options={options} defaultValue={new Date()} {...args} />
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
    <Grid columns={3} spacing={20}>
      {FORMATS.map((format) => (
        <Stack key={format}>
          <Text>{`Format: '${format}'`}</Text>
          <TimeField format={format} defaultValue={new Date()} {...args} />
        </Stack>
      ))}
    </Grid>
  )
};

export const RestrictTime: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      <ControlledTimeFieldTemplate
        placeholder="MinTime=14:30"
        format="HH:mm"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
      <ControlledTimeFieldTemplate
        placeholder="MaxTime=17:25"
        format="HH:mm"
        maxTime={new Date('2025-06-30T17:25')}
        {...args}
      />
      <ControlledTimeFieldTemplate
        placeholder="DisabledTimes=12:30,14:10"
        format="HH:mm"
        disabledTimes={[
          new Date('2025-06-30T14:10'),
          new Date('2025-06-30T12:30')
        ]}
        {...args}
      />
    </Grid>
  )
};

export const TimeSteps: Story = {
  render: (args) => (
    <Grid columns={2} spacing={20}>
      <ControlledTimeFieldTemplate
        mode="preset"
        placeholder="TimeStep=30 minutes"
        format="HH:mm"
        timeStep={30 * 60}
        {...args}
      />
      <ControlledTimeFieldTemplate
        mode="manual"
        placeholder="TimeStep=2 hours/10 minutes/10 seconds"
        format="HH:mm:ss"
        timeStep={{ hour: 2, minute: 10, second: 10 }}
        {...args}
      />
    </Grid>
  )
};

export const Variants: Story = {
  render: (args) => (
    <Grid columns={4} spacing={20}>
      {(['filled', 'outlined', 'underlined', 'borderless'] as const).map(
        (variant) => (
          <TimeField
            key={variant}
            variant={variant}
            placeholder={variant}
            {...args}
          />
        )
      )}
    </Grid>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <Grid columns={3} spacing={20}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TimeField key={size} size={size} placeholder={size} {...args} />
      ))}
    </Grid>
  )
};

export const Readonly: Story = {
  render: (args) => (
    <TimeField defaultValue={new Date('2025-06-30T14:10')} readOnly {...args} />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TimeField defaultValue={new Date('2025-06-30T14:10')} disabled {...args} />
  )
};

export const Color: Story = {
  render: (args) => (
    <TimeField placeholder='color="yellow-400"' color="yellow-400" {...args} />
  )
};

export const FullWidth: Story = {
  render: (args) => <TimeField placeholder="fullWidth" fullWidth {...args} />
};

export const Adornments: Story = {
  render: (args) => (
    <TimeField
      placeholder="startAdornment"
      startAdornment={<AccessTimeIcon size={20} color="gray-500" />}
      {...args}
    />
  )
};

export const DisableEffect: Story = {
  render: (args) => (
    <Grid columns={2} spacing={20}>
      <TimeField
        placeholder="disableHoverEffect"
        disableHoverEffect
        {...args}
      />
      <TimeField
        placeholder="disableFocusEffect"
        disableFocusEffect
        {...args}
      />
    </Grid>
  )
};
