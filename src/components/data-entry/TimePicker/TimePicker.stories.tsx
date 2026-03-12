import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TimePicker, { TimePickerProps } from './TimePicker';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { Button } from '@/components/general/Button';
import { FlightTakeOffIcon } from '@/components/icons/FlightTakeOffIcon';
import { ManualDigitalClock } from '@/components/data-entry/ManualDigitalClock';

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
        type: { summary: 'boolean' }
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
    name: {
      description: 'input name',
      table: {
        type: { summary: `string` }
      }
    },
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date | null) => void;`
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
          summary: `mode='preset' ? 1800 : {hour: 1, minute: 1, second: 1}`
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

const ControlledTimePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && `${hour}시`}</span>
        <span>{minute !== undefined && `${minute}분`}</span>
      </Text>
      <Stack direction="row" spacing={20}>
        <TimePicker mode="preset" value={value} onChange={handleChange} />
        <TimePicker mode="manual" value={value} onChange={handleChange} />
      </Stack>
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
  const [value, setValue] = useState<Date | null>(new Date(1970, 0, 1, 2, 30));

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
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
      <Stack direction="row" spacing={20}>
        <TimePicker
          mode="preset"
          value={value}
          onChange={handleTimeChange}
          locale={locale}
        />
        <TimePicker
          mode="manual"
          value={value}
          onChange={handleTimeChange}
          locale={locale}
        />
      </Stack>
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<TimePickerProps['options']> = [
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
  const [option, setOption] = useState<TimePickerProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimePickerProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
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
      <Stack direction="row" spacing={20}>
        <TimePicker
          mode="preset"
          value={value}
          onChange={handleTimeChange}
          options={option}
        />
        <TimePicker
          mode="manual"
          value={value}
          onChange={handleTimeChange}
          options={option}
        />
      </Stack>
    </Stack>
  );
};

export const Mode: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimePicker mode="preset" {...args} />
      <TimePicker mode="manual" {...args} />
    </Stack>
  )
};

export const DefaultValue: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimePicker
        mode="preset"
        defaultValue={new Date(2025, 7, 6, 2, 30)}
        {...args}
      />
      <TimePicker
        mode="manual"
        defaultValue={new Date(2025, 7, 6, 2, 30)}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={50}>
  <TimePicker
    mode="preset"
    defaultValue={new Date(2025, 7, 6, 2, 30)}
  />
  <TimePicker
    mode="manual"
    defaultValue={new Date(2025, 7, 6, 2, 30)}
  />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledTimePicker: Story = {
  render: () => <ControlledTimePickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledTimePickerTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const hour = value?.getHours();
  const minute = value?.getMinutes();

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Time:
        <span>{hour !== undefined && \`\${hour}시\`}</span>
        <span>{minute !== undefined && \`\${minute}분\`}</span>
      </Text>
      <Stack direction="row" spacing={20}>
        <TimePicker mode="preset" value={value} onChange={handleChange} />
        <TimePicker mode="manual" value={value} onChange={handleChange} />
      </Stack>
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
  const [value, setValue] = useState<Date | null>(new Date(1970, 0, 1, 2, 30));

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleTimeChange = (newValue: Date | null) => {
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
      <Stack direction="row" spacing={20}>
        <TimePicker
          mode="preset"
          value={value}
          onChange={handleTimeChange}
          locale={locale}
        />
        <TimePicker
          mode="manual"
          value={value}
          onChange={handleTimeChange}
          locale={locale}
        />
      </Stack>
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
  const OPTIONS: Array<TimePickerProps['options']> = [
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
  const [option, setOption] = useState<TimePickerProps['options']>(OPTIONS[0]);
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as TimePickerProps['options']);
  };
  const handleTimeChange = (newValue: Date | null) => {
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
      <Stack direction="row" spacing={20}>
        <TimePicker
          mode="preset"
          value={value}
          onChange={handleTimeChange}
          options={option}
        />
        <TimePicker
          mode="manual"
          value={value}
          onChange={handleTimeChange}
          options={option}
        />
      </Stack>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimePicker
        mode="preset"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
      <TimePicker
        mode="manual"
        minTime={new Date('2025-06-30T14:30')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimePicker mode="preset" minTime={new Date('2025-06-30T14:30')} />
  <TimePicker mode="manual" minTime={new Date('2025-06-30T14:30')} />
</Stack>`.trim()
      }
    }
  }
};

export const MaxTime: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <TimePicker
        mode="preset"
        maxTime={new Date('2025-06-30T17:30')}
        {...args}
      />
      <TimePicker
        mode="manual"
        maxTime={new Date('2025-06-30T17:30')}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <TimePicker mode="preset" maxTime={new Date('2025-06-30T17:30')} />
  <TimePicker mode="manual" maxTime={new Date('2025-06-30T17:30')} />
</Stack>`.trim()
      }
    }
  }
};

export const DisabledTimes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <TimePicker
        mode="preset"
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        {...args}
      />
      <TimePicker
        mode="manual"
        disabledTimes={[
          new Date(2025, 7, 4, 14, 30),
          new Date(2025, 7, 4, 15, 30)
        ]}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={50}>
  <TimePicker
    mode="preset"
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
</Stack>`.trim()
      }
    }
  }
};

export const TimeSteps: Story = {
  render: (args) => (
    <Stack direction="row" spacing={50}>
      <TimePicker mode="preset" timeStep={10 * 60} {...args} />
      <TimePicker
        mode="manual"
        timeStep={{ hour: 2, minute: 10, second: 30 }}
        options={{ timeStyle: 'medium' }}
        {...args}
      />
    </Stack>
  )
};

export const Readonly: Story = {
  render: (args) => (
    <TimePicker defaultValue={new Date(2025, 7, 6, 2, 30)} readOnly {...args} />
  )
};

export const Disabled: Story = {
  render: (args) => (
    <TimePicker defaultValue={new Date(2025, 7, 6, 2, 30)} disabled {...args} />
  )
};

export const TimePickerWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const time = formData.get('time');
        alert(`time: ${time}`);
      }}
      style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
    >
      <TimePicker name="time" mode="manual" {...args} />
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
    const time = formData.get('time');
    alert(\`time: \${time}\`);
  }}
  style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}
>
  <TimePicker name="time" mode="manual" />
  <Button type="submit" size="sm">
    제출
  </Button>
</form>`.trim()
      }
    }
  }
};

export const CustomTimeField: Story = {
  render: () => (
    <Box style={{ width: '300px' }}>
      <TimePicker
        TimeFieldProps={{
          placeholder: 'Select Time',
          format: 'A hh시 mm분',
          variant: 'filled',
          size: 'lg',
          color: 'secondary',
          focusedColor: 'secondary',
          fullWidth: true,
          startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />,
          disableHoverEffect: true
        }}
      />
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box style={{ width: '300px' }}>
  <TimePicker
    TimeFieldProps={{
      placeholder: 'Select Time',
      format: 'A hh시 mm분',
      variant: 'filled',
      size: 'lg',
      color: 'secondary',
      focusedColor: 'secondary',
      fullWidth: true,
      startAdornment: <FlightTakeOffIcon size={20} color="gray-500" />,
      disableHoverEffect: true
    }}
  />
</Box>`.trim()
      }
    }
  }
};

export const CustomDigitalClock: Story = {
  render: () => (
    <TimePicker
      mode="manual"
      disabledTimes={[
        new Date(2025, 7, 4, 15, 30),
        new Date(2025, 7, 4, 16, 30)
      ]}
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
        code: `<TimePicker
  mode="manual"
  disabledTimes={[
    new Date(2025, 7, 4, 15, 30),
    new Date(2025, 7, 4, 16, 30)
  ]}
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
    <TimePicker
      PopoverProps={{
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        popoverOrigin: { horizontal: 'center', vertical: 'top' },
        BoxProps: { elevation: 10 }
      }}
      {...args}
    />
  )
};
