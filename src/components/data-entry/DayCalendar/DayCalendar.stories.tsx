import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DayCalendar from './DayCalendar';
import { Day } from './Day';
import { Stack } from '@/components/layout/Stack';
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
    displayedDate: {
      description: '화면에 보여지는 날짜',
      table: {
        type: { summary: 'Date' }
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
    onDayChange: {
      description: 'day button을 클릭했을 때 호출되는 함수',
      table: {
        type: { summary: '(newDate: Date) ⇒ void;' }
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
    selectedDate: {
      description: '선택된 날짜',
      table: {
        type: {
          summary: `Date | null`
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
    }
  }
};

export default meta;
type Story = StoryObj<typeof DayCalendar>;

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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DayCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};

export const BasicDayCalendar: Story = {
  render: (args) => <DayCalendar displayedDate={new Date()} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar displayedDate={new Date()} />`.trim()
      }
    }
  }
};

export const SelectedDate: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date(2025, 0, 1)}
      selectedDate={new Date(2025, 0, 5)}
      onDayChange={(newDate) => alert(newDate.toString())}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  displayedDate={new Date(2025, 0, 1)}
  selectedDate={new Date(2025, 0, 5)}
  onDayChange={(newDate) => alert(newDate.toString())}
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
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
      <DayCalendar key={locale} displayedDate={new Date()} locale={locale} />
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
      displayedDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 0, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  displayedDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 0, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 0, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  displayedDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 0, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date(2025, 0, 1)}
      disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar
  displayedDate={new Date(2025, 0, 1)}
  disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => (
    <DayCalendar displayedDate={new Date()} readOnly {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar displayedDate={new Date()} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <DayCalendar displayedDate={new Date()} disabled {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DayCalendar displayedDate={new Date()} disabled />`.trim()
      }
    }
  }
};

export const ShowDaysOutside: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date()}
      showDaysOutsideCurrentMonth
      {...args}
    />
  )
};

export const FixWeekNumber: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date()}
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...args}
    />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => (
    <DayCalendar displayedDate={new Date()} displayWeekNumber {...args} />
  )
};

export const CustomDay: Story = {
  render: (args) => (
    <DayCalendar
      displayedDate={new Date(2025, 0, 1)}
      selectedDate={new Date(2025, 0, 5)}
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
  displayedDate={new Date(2025, 0, 1)}
  selectedDate={new Date(2025, 0, 5)}
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
