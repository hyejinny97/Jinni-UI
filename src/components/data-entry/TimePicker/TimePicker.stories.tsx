import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TimePicker from './TimePicker';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { TimeOptions } from '@/components/data-entry/TimeField';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';
import { Button } from '@/components/general/Button';
import { TimeValidationError } from '@/components/data-entry/TimeField';
import { AccessTimeIcon } from '@/components/icons/AccessTimeIcon';
import { DigitalClock } from '@/components/data-entry/DigitalClock';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
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
          summary: `(value: Date | null, validationError?: 'minTime' | 'maxTime' | 'timeStep' | 'disabledTime') => void;`
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
          summary: `boolean`
        },
        defaultValue: { summary: 'false' }
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
    TimeFieldProps: {
      description: 'TimeField 컴포넌트의 Props',
      table: {
        type: {
          summary: `TimeFieldProps`
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
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

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

const ControlledTimePickerTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const hour = value?.getHours();
  const minute = value?.getMinutes();
  const second = value?.getSeconds();

  const handleChange = (
    newValue: Date | null,
    validationError?: TimeValidationError
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
        default:
          setErrorMessage('유효하지 않은 시간입니다.');
      }
    } else {
      setErrorMessage(undefined);
    }
  };

  return (
    <Stack>
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
      <TimePicker value={value} onChange={handleChange} {...props} />
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
        <Stack direction="row" spacing={50}>
          <TimePicker
            locale={selectedLocale}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
          />
          <TimePicker
            locale={selectedLocale}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
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
        <Stack direction="row" spacing={50}>
          <TimePicker
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
          />
          <TimePicker
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
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
    <TimePicker
      mode="manual"
      disabledTimes={[
        new Date(2025, 7, 4, 14, 30),
        new Date(2025, 7, 4, 15, 30)
      ]}
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

export const Mode: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <TimePicker mode="preset" />
      <TimePicker mode="manual" />
    </Stack>
  )
};

export const DefaultValue: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <TimePicker mode="preset" defaultValue={new Date(2025, 7, 6, 2, 30)} />
      <TimePicker mode="manual" defaultValue={new Date(2025, 7, 6, 2, 30)} />
    </Stack>
  )
};

export const FormWithTimePicker: Story = {
  render: () => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const time = formData.get('time');
        alert(`time: ${time}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <TimePicker name="time" mode="manual" />
      <Button type="submit" size="sm">
        제출
      </Button>
    </form>
  )
};

export const ControlledTimePicker: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <ControlledTimePickerTemplate />
      <ControlledTimePickerTemplate mode="manual" />
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
    <TimePicker defaultValue={new Date(2025, 7, 6, 2, 30)} readOnly />
  )
};

export const Disabled: Story = {
  render: () => (
    <TimePicker defaultValue={new Date(2025, 7, 6, 2, 30)} disabled />
  )
};

export const MinMaxTime: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <TimePicker
        minTime={new Date(2025, 7, 4, 12, 30)}
        maxTime={new Date(2025, 7, 4, 18, 20)}
      />
      <TimePicker
        mode="manual"
        minTime={new Date(2025, 7, 4, 12, 30)}
        maxTime={new Date(2025, 7, 4, 18, 20)}
      />
    </Stack>
  )
};

export const DisabledTimes: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <TimePicker
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
      />
      <TimePicker
        mode="manual"
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
      />
    </Stack>
  )
};

export const TimeSteps: Story = {
  render: () => (
    <Stack direction="row" spacing={50}>
      <TimePicker timeStep={10 * 60} />
      <TimePicker
        mode="manual"
        timeStep={{ hour: 2, minute: 10, second: 30 }}
        options={{ timeStyle: 'medium' }}
      />
    </Stack>
  )
};

export const CustomPopover: Story = {
  render: () => (
    <TimePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        PopoverContentProps: { elevation: 10 }
      }}
    />
  )
};

export const Placeholder: Story = {
  render: () => <TimePicker TimeFieldProps={{ placeholder: 'Select Time' }} />
};

export const TimeFormat: Story = {
  render: () => <TimePicker TimeFieldProps={{ format: 'A hh시 mm분' }} />
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <TimePicker
        TimeFieldProps={{ variant: 'filled', placeholder: 'filled' }}
      />
      <TimePicker
        TimeFieldProps={{ variant: 'outlined', placeholder: 'outlined' }}
      />
      <TimePicker
        TimeFieldProps={{ variant: 'underlined', placeholder: 'underlined' }}
      />
      <TimePicker
        TimeFieldProps={{ variant: 'borderless', placeholder: 'borderless' }}
      />
    </Stack>
  )
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <TimePicker TimeFieldProps={{ size: 'sm', placeholder: 'sm' }} />
      <TimePicker TimeFieldProps={{ size: 'md', placeholder: 'md' }} />
      <TimePicker TimeFieldProps={{ size: 'lg', placeholder: 'lg' }} />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <TimePicker
      TimeFieldProps={{ color: 'yellow-400', focusedColor: 'yellow-400' }}
    />
  )
};

export const FullWidth: Story = {
  render: () => <TimePicker TimeFieldProps={{ fullWidth: true }} />
};

export const Adornments: Story = {
  render: () => (
    <TimePicker
      TimeFieldProps={{
        startAdornment: <AccessTimeIcon size={20} color="gray-500" />
      }}
    />
  )
};

export const DisableEffect: Story = {
  render: () => (
    <TimePicker
      TimeFieldProps={{ disableHoverEffect: true, disableFocusEffect: true }}
    />
  )
};

export const CustomDigitalClock: Story = {
  render: () => <CustomDigitalClockTemplate />
};
