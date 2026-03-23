import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MonthCalendar from './MonthCalendar';
import { Month } from './Month';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof MonthCalendar> = {
  title:
    'components/data-entry/DatePicker/DateCalendar/DateMonthCalendar/MonthCalendar',
  component: MonthCalendar,
  argTypes: {
    disabled: {
      description: 'true이면, 비활성화됨',
      table: {
        type: { summary: 'boolean' }
      }
    },
    displayedDate: {
      description: '화면에 보여지는 날짜',
      table: {
        type: { summary: 'Date' }
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
    onMonthChange: {
      description: 'month button을 클릭했을 때 호출되는 함수',
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
    renderMonth: {
      description: 'monthProps를 인자로 받아 Month 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(monthProps: MonthProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(monthProps: MonthProps) => <Month {...monthProps} />`
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
    }
  }
};

export default meta;
type Story = StoryObj<typeof MonthCalendar>;

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
      <MonthCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};

export const BasicMonthCalendar: Story = {
  render: (args) => <MonthCalendar displayedDate={new Date()} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar displayedDate={new Date()} />`.trim()
      }
    }
  }
};

export const SelectedDate: Story = {
  render: (args) => (
    <MonthCalendar
      displayedDate={new Date(2000, 0, 1)}
      selectedDate={new Date(2000, 3, 1)}
      onMonthChange={(newDate) => alert(newDate.toString())}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  displayedDate={new Date(2000, 0, 1)}
  selectedDate={new Date(2000, 3, 1)}
  onMonthChange={(newDate) => alert(newDate.toString())}
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
      <MonthCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const MinDate: Story = {
  render: (args) => (
    <MonthCalendar
      displayedDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 2, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  displayedDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 2, 1)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <MonthCalendar
      displayedDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 9, 1)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  displayedDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 9, 1)}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => (
    <MonthCalendar displayedDate={new Date()} readOnly {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar displayedDate={new Date()} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <MonthCalendar displayedDate={new Date()} disabled {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar displayedDate={new Date()} disabled />`.trim()
      }
    }
  }
};

export const CustomMonth: Story = {
  render: (args) => (
    <MonthCalendar
      displayedDate={new Date(2025, 0, 1)}
      selectedDate={new Date(2025, 1, 1)}
      renderMonth={(monthProps) => (
        <Month
          color="green"
          rippleStartLocation="center"
          style={{ width: '100%', borderRadius: '4px' }}
          {...monthProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<MonthCalendar
  displayedDate={new Date()}
  selectedDate={new Date(2025, 1, 1)}
  renderMonth={(monthProps) => (
    <Month
      color="green"
      rippleStartLocation="center"
      style={{ width: '100%', borderRadius: '4px' }}
      {...monthProps}
    />
  )}
/>`.trim()
      }
    }
  }
};
