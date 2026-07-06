import './YearRangeCalendarCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import YearRangeCalendar from './YearRangeCalendar';
import Stack from '@/components/Stack';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Grid from '@/components/Grid';
import RadioGroup from '@/components/RadioGroup';
import Radio from '@/components/Radio';
import Label from '@/components/Label';
import Chip from '@/components/Chip';
import {
  RangeType,
  RangeFieldType,
  RangeDisabledDatesFnType
} from '@/types/date-component';

const meta: Meta<typeof YearRangeCalendar> = {
  title:
    'components/DateRangePicker/DateRangeCalendar/DateYearRangeCalendar/YearRangeCalendar',
  component: YearRangeCalendar,
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
        type: {
          summary: `({ date, rangeField }: { date: Date; rangeField: 'start' | 'end'; }) => boolean;`
        }
      }
    },
    displayedDate: {
      description: '화면에 보여지는 날짜',
      table: {
        type: { summary: 'Date' }
      }
    },
    hoveredDate: {
      description: 'hover한 날짜',
      table: {
        type: { summary: 'Date | null' }
      }
    },
    locale: {
      description: 'BCP47 언어 태그를 포함하는 문자열',
      table: {
        type: { summary: 'string' }
      }
    },
    onHoverDate: {
      description: '날짜에 hover 했을 때 호출되는 함수',
      table: {
        type: { summary: '(newHoveredDate: Date | null) => void;' }
      }
    },
    onSelectDate: {
      description: 'selected date가 변경되었을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(newSelectedDate: { start?: Date | null; end?: Date | null }, selectedDate?: Date) ⇒ void;'
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
    selectedDate: {
      description: '선택된 날짜 범위',
      table: {
        type: {
          summary: `{ start?: Date | null; end?: Date | null }`
        }
      }
    },
    yearsOrder: {
      description: 'years를 나타내는 순서',
      table: {
        type: {
          summary: `'asc' | 'dsc'`
        },
        defaultValue: {
          summary: `'asc'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof YearRangeCalendar>;

const DateText = ({
  year,
  month,
  day
}: {
  year?: number;
  month?: number;
  day?: number;
}) => {
  return (
    <Text
      noMargin
      style={{ display: 'inline-flex', gap: '5px', maxWidth: 'max-content' }}
    >
      <span>{year !== undefined && `${year} /`}</span>
      <span>{month !== undefined && `${month + 1} /`}</span>
      <span>{day !== undefined && `${day}`}</span>
    </Text>
  );
};

const ControlledSelectTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: selectedDate[rangeField]?.getFullYear(),
    month: selectedDate[rangeField]?.getMonth(),
    day: selectedDate[rangeField]?.getDate()
  });

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Selected Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <YearRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
      />
    </Stack>
  );
};

const ControlledHoverTemplate = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const year = hoveredDate?.getFullYear();
  const month = hoveredDate?.getMonth();
  const day = hoveredDate?.getDate();

  const handleHover = (newValue: Date | null) => {
    setHoveredDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Hovered Date:</span>
        <DateText year={year} month={month} day={day} />
      </Stack>
      <YearRangeCalendar
        displayedDate={new Date()}
        hoveredDate={hoveredDate}
        onHoverDate={handleHover}
      />
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
      <YearRangeCalendar
        key={locale}
        displayedDate={new Date()}
        locale={locale}
      />
    </Stack>
  );
};

type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: RangeDisabledDatesFnType;
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (value: RangeType<Date | null>) => RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
  },
  {
    label: `'End' can only be selected up to 'start' + 10 years.`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start.getFullYear();
          const year = date.getFullYear();
          return year < start || start + 10 <= year;
        }
        return false;
      }
  }
];

const DisabledDatesTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <YearRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(selectedDate)
            : CASES[caseIdx].disabledDates
        }
      />
    </Stack>
  );
};

export const BasicYearRangeCalendar: Story = {
  render: (args) => <YearRangeCalendar displayedDate={new Date()} {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<YearRangeCalendar displayedDate={new Date()} />`.trim()
      }
    }
  }
};

export const ControlledSelect: Story = {
  render: () => <ControlledSelectTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSelectTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });

  const getDate = (rangeField: RangeFieldType) => ({
    year: selectedDate[rangeField]?.getFullYear(),
    month: selectedDate[rangeField]?.getMonth(),
    day: selectedDate[rangeField]?.getDate()
  });

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Selected Date:</span>
        <DateText {...getDate('start')} />
        <span>-</span>
        <DateText {...getDate('end')} />
      </Stack>
      <YearRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ControlledHover: Story = {
  render: () => <ControlledHoverTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledHoverTemplate = () => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const year = hoveredDate?.getFullYear();
  const month = hoveredDate?.getMonth();
  const day = hoveredDate?.getDate();

  const handleHover = (newValue: Date | null) => {
    setHoveredDate(newValue);
  };

  return (
    <Stack spacing={20}>
      <Stack
        direction="row"
        spacing={8}
        style={{ height: '20px', alignItems: 'center', color: 'on-surface' }}
      >
        <span>Hovered Date:</span>
        <DateText year={year} month={month} day={day} />
      </Stack>
      <YearRangeCalendar
        displayedDate={new Date()}
        hoveredDate={hoveredDate}
        onHoverDate={handleHover}
      />
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

  const handleLocaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocale(value as (typeof LOCALES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
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
      <YearRangeCalendar key={locale} displayedDate={new Date()} locale={locale} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: () => <DisabledDatesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `type CaseType = {
  label: string;
  withValue?: false;
  disabledDates: RangeDisabledDatesFnType;
};

type CaseWithValueType = {
  label: string;
  withValue: true;
  disabledDates: (value: RangeType<Date | null>) => RangeDisabledDatesFnType;
};

const CASES: Array<CaseType | CaseWithValueType> = [
  {
    label: 'Available from 2000 to 2050.',
    disabledDates: ({ date }) => {
      const year = date.getFullYear();
      return year < 2000 || 2050 < year;
    }
  },
  {
    label: 'Available starting this year.',
    disabledDates: ({ date }) => {
      const currentYear = new Date().getFullYear();
      return date.getFullYear() < currentYear;
    }
  },
  {
    label: \`'End' can only be selected up to 'start' + 10 years.\`,
    withValue: true,
    disabledDates:
      (value: RangeType<Date | null>) =>
      ({ date, rangeField }) => {
        if (rangeField === 'end' && value.start) {
          const start = value.start.getFullYear();
          const year = date.getFullYear();
          return year < start || start + 10 <= year;
        }
        return false;
      }
  }
];

const DisabledDatesTemplate = () => {
  const [selectedDate, setSelectedDate] = useState<RangeType<Date | null>>({
    start: null,
    end: null
  });
  const [caseIdx, setCaseIdx] = useState<number>(0);

  const handleSelect = (newValue: RangeType<Date | null>) => {
    setSelectedDate(newValue);
  };
  const handleCaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCaseIdx(Number(value));
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="sm"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Cases
        </Chip>
        <RadioGroup
          name="case"
          value={String(caseIdx)}
          onChange={handleCaseChange}
        >
          <Grid columns={1}>
            {CASES.map(({ label }, idx) => (
              <Label content={label}>
                <Radio value={String(idx)} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <YearRangeCalendar
        displayedDate={new Date()}
        selectedDate={selectedDate}
        onSelectDate={handleSelect}
        disabledDates={
          CASES[caseIdx].withValue
            ? CASES[caseIdx].disabledDates(selectedDate)
            : CASES[caseIdx].disabledDates
        }
      />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => (
    <YearRangeCalendar displayedDate={new Date()} readOnly {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearRangeCalendar displayedDate={new Date()} readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => (
    <YearRangeCalendar displayedDate={new Date()} disabled {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearRangeCalendar displayedDate={new Date()} disabled />`.trim()
      }
    }
  }
};

export const OrderOfYears: Story = {
  render: (args) => (
    <YearRangeCalendar displayedDate={new Date()} yearsOrder="dsc" {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearRangeCalendar displayedDate={new Date()} yearsOrder='dsc' />`.trim()
      }
    }
  }
};

export const CustomRangeYear: Story = {
  render: (args) => (
    <YearRangeCalendar
      className="custom-range-year"
      displayedDate={new Date()}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<YearRangeCalendar
  className="custom-range-year"
  displayedDate={new Date()}
/>`.trim()
      }
    }
  }
};
