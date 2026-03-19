import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DayCalendar from './DayCalendar';
import { Day } from './Day';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof DayCalendar> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateDayCalendar/DayCalendar',
  component: DayCalendar,
  argTypes: {
    defaultValue: {
      description: '초기 selected date',
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
    disabledDates: {
      description: '비활성화 하는 특정 날짜 모음',
      table: {
        type: { summary: 'Array<Date>' }
      }
    },
    displayWeekNumber: {
      description: 'true이면, week number가 나타남',
      table: {
        type: { summary: 'boolean' }
      }
    },
    fixedWeekNumber: {
      description: 'day calendar에서 보여지는 week 개수',
      table: {
        type: { summary: 'number' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
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
    onChange: {
      description: 'value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date) => void;`
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
    referenceDate: {
      description: 'value, defaultValue prop이 없을 때 참조하는 date',
      table: {
        type: {
          summary: `Date`
        }
      }
    },
    renderDay: {
      description: 'dayProps를 인자로 받아 Day 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(dayProps: DayProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(dayProps: DayProps) => <Day {...dayProps} />`
        }
      }
    },
    showDaysOutsideCurrentMonth: {
      description:
        'true이면, day calendar에서 해당 month의 days 이외의 앞뒤 일부 days를 나타냄',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    value: {
      description: 'selected date',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof DayCalendar>;

const ControlledDayCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day}`}</span>
      </Text>
      <DayCalendar value={value} onChange={handleChange} />
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
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDayChange = (newValue: Date) => {
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
      <DayCalendar
        key={locale}
        value={value}
        onChange={handleDayChange}
        locale={locale}
      />
    </Stack>
  );
};

export const BasicDayCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DayCalendar {...args} />
      <DayCalendar defaultValue={new Date(2000, 0, 1)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DayCalendar />
  <DayCalendar defaultValue={new Date(2000, 0, 1)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDayCalendar: Story = {
  render: () => <ControlledDayCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDayCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={5}>
      <Text noMargin style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && \`\${year} /\`}</span>
        <span>{month !== undefined && \`\${month + 1} /\`}</span>
        <span>{day !== undefined && \`\${day}\`}</span>
      </Text>
      <DayCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DayCalendar
      referenceDate={new Date(2050, 0, 1)}
      onChange={(value: Date) =>
        alert(
          `Date: ${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`
        )
      }
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  referenceDate={new Date(2050, 0, 1)}
  onChange={(value: Date) =>
    alert(\`Date: \${value.getFullYear()}/\${value.getMonth() + 1}/\${value.getDate()}\`)
  }
/>`.trim()
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
  const [value, setValue] = useState<Date | null>(new Date());

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };
  const handleDayChange = (newValue: Date) => {
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
      <DayCalendar
        key={locale}
        value={value}
        onChange={handleDayChange}
        locale={locale}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <DayCalendar
      referenceDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 0, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  referenceDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 0, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DayCalendar
      referenceDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 0, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  referenceDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 0, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <DayCalendar
      referenceDate={new Date(2025, 0, 1)}
      disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  referenceDate={new Date(2025, 0, 1)}
  disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <DayCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DayCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar disabled />`.trim()
      }
    }
  }
};

export const ShowDaysOutside: Story = {
  render: (args) => <DayCalendar showDaysOutsideCurrentMonth {...args} />
};

export const FixWeekNumber: Story = {
  render: (args) => (
    <DayCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6} {...args} />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => <DayCalendar displayWeekNumber {...args} />
};

export const CustomDay: Story = {
  render: (args) => (
    <DayCalendar
      renderDay={(dayProps) => {
        const { value, children, marked, ...rest } = dayProps;
        const isDayWithSchedule = [3, 15, 24].some(
          (day) => value.getDate() === day
        );
        return (
          <Day
            color="green"
            rippleStartLocation="center"
            style={{
              position: 'relative',
              borderRadius: '4px',
              ...(marked && {
                borderStyle: 'dashed',
                borderColor: 'gray-300'
              })
            }}
            marked={marked}
            value={value}
            {...rest}
          >
            {children}
            <Box
              style={{
                display: isDayWithSchedule ? 'inline-block' : 'none',
                position: 'absolute',
                width: '8px',
                height: '8px',
                left: '100%',
                top: '0px',
                transform: 'translate(-80%, -20%)',
                backgroundColor: 'error',
                borderRadius: '50%'
              }}
            />
          </Day>
        );
      }}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  renderDay={(dayProps) => {
    const { value, children, marked, ...rest } = dayProps;
    const isDayWithSchedule = [3, 15, 24].some(
      (day) => value.getDate() === day
    );
    return (
      <Day
        color="green"
        rippleStartLocation="center"
        style={{
          position: 'relative',
          borderRadius: '4px',
          ...(marked && {
            borderStyle: 'dashed',
            borderColor: 'gray-300'
          })
        }}
        marked={marked}
        value={value}
        {...rest}
      >
        {children}
        <Box
          style={{
            display: isDayWithSchedule ? 'inline-block' : 'none',
            position: 'absolute',
            width: '5px',
            height: '5px',
            left: '100%',
            top: '0px',
            transform: 'translate(-80%, -20%)',
            backgroundColor: 'error',
            borderRadius: '50%'
          }}
        />
      </Day>
    );
  }}
/>`.trim()
      }
    }
  }
};
