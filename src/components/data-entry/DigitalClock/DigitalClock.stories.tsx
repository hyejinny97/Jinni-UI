import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DigitalClock from './DigitalClock';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { TimeOptions } from '@/components/data-entry/TimeField';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';

const meta: Meta<typeof DigitalClock> = {
  component: DigitalClock,
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
          summary: `(value: Date) => void;`
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
    readOnly: {
      description: 'true이면, 수정 불가',
      table: {
        type: {
          summary: `boolean`
        },
        defaultValue: { summary: 'false' }
      }
    },
    skipDisabledTime: {
      description: 'true이면, 비활성화된 times는 나타나지 않음',
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
          summary: `mode='preset' ? 3600 : {hour: 1, minute: 1, second: 1}`
        }
      }
    },
    value: {
      description: 'time',
      table: {
        type: {
          summary: `Date`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DigitalClock>;

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

const ControlledDigitalClockTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Date>(new Date(2025, 7, 3, 1, 30));
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Text style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <DigitalClock value={value} onChange={handleChange} {...props} />
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
          <DigitalClock
            locale={selectedLocale}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
          />
          <DigitalClock
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
          <DigitalClock
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
          />
          <DigitalClock
            options={OPTIONS[selectedOptionsIdx]}
            defaultValue={new Date(2025, 7, 3, 1, 30)}
            mode="manual"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export const Mode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <DigitalClock mode="preset" {...args} />
      <DigitalClock mode="manual" {...args} />
    </Stack>
  )
};

export const DefaultValue: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <DigitalClock
        mode="preset"
        defaultValue={new Date(2025, 7, 3, 1, 30)}
        {...args}
      />
      <DigitalClock
        mode="manual"
        defaultValue={new Date(2025, 7, 3, 1, 30)}
        {...args}
      />
    </Stack>
  )
};

export const ControlledDigitalClock: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <ControlledDigitalClockTemplate {...args} />
      <ControlledDigitalClockTemplate mode="manual" {...args} />
    </Stack>
  )
};

export const Locale: Story = {
  render: (args) => <LocaleTemplate {...args} />
};

export const Options: Story = {
  render: (args) => <OptionsTemplate {...args} />
};

export const Readonly: Story = {
  render: (args) => <DigitalClock readOnly {...args} />
};

export const Disabled: Story = {
  render: (args) => <DigitalClock disabled {...args} />
};

export const MinTimeAndMaxTime: Story = {
  render: (args) => (
    <Stack spacing={50}>
      <Stack direction="row" spacing={50}>
        <DigitalClock minTime={new Date(2025, 7, 4, 12, 30)} {...args} />
        <DigitalClock
          mode="manual"
          minTime={new Date(2025, 7, 4, 12, 30)}
          {...args}
        />
      </Stack>
      <Stack direction="row" spacing={50}>
        <DigitalClock maxTime={new Date(2025, 7, 4, 18, 20)} {...args} />
        <DigitalClock
          mode="manual"
          maxTime={new Date(2025, 7, 4, 18, 20)}
          {...args}
        />
      </Stack>
      <Stack direction="row" spacing={50}>
        <DigitalClock
          minTime={new Date(2025, 7, 4, 12, 30)}
          maxTime={new Date(2025, 7, 4, 18, 20)}
          {...args}
        />
        <DigitalClock
          mode="manual"
          minTime={new Date(2025, 7, 4, 12, 30)}
          maxTime={new Date(2025, 7, 4, 18, 20)}
          {...args}
        />
      </Stack>
    </Stack>
  )
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <DigitalClock
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        {...args}
      />
      <DigitalClock
        mode="manual"
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        {...args}
      />
    </Stack>
  )
};

export const SkipDisabledTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <DigitalClock
        minTime={new Date(2025, 7, 4, 12, 30)}
        maxTime={new Date(2025, 7, 4, 18, 20)}
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        skipDisabledTime
        {...args}
      />
      <DigitalClock
        mode="manual"
        minTime={new Date(2025, 7, 4, 12, 30)}
        maxTime={new Date(2025, 7, 4, 18, 20)}
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        skipDisabledTime
        {...args}
      />
    </Stack>
  )
};

export const TimeSteps: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <DigitalClock timeStep={10 * 60} {...args} />
      <DigitalClock
        mode="manual"
        timeStep={{ hour: 2, minute: 10, second: 30 }}
        options={{ timeStyle: 'medium' }}
        {...args}
      />
    </Stack>
  )
};
