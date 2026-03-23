import './CustomDateDayCalendar.scss';
import { useState, FormEvent } from 'react';
import cn from 'classnames';
import type { Meta, StoryObj } from '@storybook/react';
import DateDayCalendar, { DateDayCalendarProps } from './DateDayCalendar';
import { Day } from '@/components/data-entry/DayCalendar';
import { CalendarHeader } from '@/components/data-entry/CalendarHeader';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Grid } from '@/components/layout/Grid';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';
import { DAY } from '@/constants/time';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@/components/feedback/Modal';
import { Button } from '@/components/general/Button';
import { Input } from '@/components/data-entry/Input';

const meta: Meta<typeof DateDayCalendar> = {
  title: 'components/data-entry/DatePicker/DateCalendar/DateDayCalendar',
  component: DateDayCalendar,
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
    onMonthClick: {
      description: 'month button이 클릭 됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `() => void;`
        }
      }
    },
    onYearClick: {
      description: 'year button이 클릭 됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `() => void;`
        }
      }
    },
    options: {
      description: 'date 속성',
      table: {
        type: {
          summary: `{
  dateStyle: 'short' | 'medium'
}
| 
{
  year?: 'numeric' | '2-digit';
  day?: 'numeric' | '2-digit' | 'long' | 'short';
  day?: 'numeric' | '2-digit';
}`
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
    renderCalendarHeader: {
      description:
        'calendarHeaderProps를 인자로 받아 CalendarHeader 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(calendarHeaderProps: CalendarHeaderProps) => <CalendarHeader {...calendarHeaderProps} />;`
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
type Story = StoryObj<typeof DateDayCalendar>;

type NotesType = { [dayTimeStamp: number]: Array<string> };

const ControlledDateDayCalendarTemplate = () => {
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
      <DateDayCalendar value={value} onChange={handleChange} />
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
  const handleDateDayChange = (newValue: Date) => {
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
      <DateDayCalendar
        key={locale}
        value={value}
        onChange={handleDateDayChange}
        locale={locale}
      />
    </Stack>
  );
};

const OptionsTemplate = () => {
  const OPTIONS: Array<DateDayCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' }
  ] as const;
  const [option, setOption] = useState<DateDayCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateDayCalendarProps['options']);
  };
  const handleDateChange = (newValue: Date | null) => {
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
          <Grid rows={1} columns={2} spacing={5}>
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
      <DateDayCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        locale="en-US"
        options={option}
      />
    </Stack>
  );
};

const WeekPickerTemplate = () => {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.ceil(
      (date.getTime() - firstDayOfYear.getTime()) / DAY
    );
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
  };

  const isInSameWeek = (dayA: Date | null, dayB: Date | null): boolean => {
    if (dayA === null || dayB === null) return false;
    return getWeekNumber(dayA) === getWeekNumber(dayB);
  };

  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  return (
    <DateDayCalendar
      className="custom-week-picker"
      value={selectedDay}
      onChange={handleSelectedDayChange}
      showDaysOutsideCurrentMonth
      displayWeekNumber
      renderDay={(dayProps) => {
        const { value, className, ...rest } = dayProps;
        return (
          <Day
            {...rest}
            className={cn(className, {
              hovered: isInSameWeek(value, hoveredDay),
              leftRounded: value.getDay() === 0,
              rightRounded: value.getDay() === 6
            })}
            value={value}
            selected={isInSameWeek(value, selectedDay)}
            marked={false}
            onMouseEnter={() => setHoveredDay(value)}
            onMouseLeave={() => setHoveredDay(null)}
            disableOverlay
          />
        );
      }}
    />
  );
};

const CalendarWithNotesTemplate = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [notes, setNotes] = useState<NotesType>({
    [new Date(2025, 6, 8).getTime()]: ['공부하기']
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content');
    const day = selectedDay?.getTime();
    if (!day) return;
    const newNotes = JSON.parse(JSON.stringify(notes));
    if (newNotes[day]) {
      newNotes[day].push(content);
    } else {
      newNotes[day] = [content];
    }
    setNotes(newNotes);
    handleClose();
  };
  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  return (
    <>
      <DateDayCalendar
        className="custom-calendar-with-notes"
        value={selectedDay}
        onChange={handleSelectedDayChange}
        referenceDate={new Date(2025, 6)}
        renderDay={(dayProps) => {
          const { value, className, children, onClick, ...rest } = dayProps;
          const dayTimeStamp = value.getTime();
          return (
            <Day
              {...rest}
              className={cn(className)}
              value={value}
              marked={false}
              color="primary-container"
              onClick={(e) => {
                onClick?.(e);
                handleOpen();
              }}
            >
              <div className="day-number">{children}</div>
              <Stack spacing={3}>
                {notes[dayTimeStamp]?.map((content) => (
                  <Text key={content} className="note">
                    {content}
                  </Text>
                ))}
              </Stack>
            </Day>
          );
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Note</ModalHeader>
          <ModalBody>
            <Input
              name="content"
              placeholder="content"
              fullWidth
              style={{ marginTop: '1px' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="subtle-filled" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Ok</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export const BasicDateDayCalendar: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <DateDayCalendar {...args} />
      <DateDayCalendar defaultValue={new Date(2000, 0, 1)} {...args} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack direction="row" spacing={20}>
  <DateDayCalendar />
  <DateDayCalendar defaultValue={new Date(2000, 0, 1)} />
</Stack>`.trim()
      }
    }
  }
};

export const ControlledDateDayCalendar: Story = {
  render: () => <ControlledDateDayCalendarTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledDateDayCalendarTemplate = () => {
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
      <DateDayCalendar value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ChooseTheInitialDate: Story = {
  render: (args) => (
    <DateDayCalendar
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
        code: `<DateDayCalendar
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
  const handleDateDayChange = (newValue: Date) => {
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
      <DateDayCalendar
        key={locale}
        value={value}
        onChange={handleDateDayChange}
        locale={locale}
      />
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
  const OPTIONS: Array<DateDayCalendarProps['options']> = [
    { dateStyle: 'medium' },
    { dateStyle: 'short' },
  ] as const;
  const [option, setOption] = useState<DateDayCalendarProps['options']>(
    OPTIONS[0]
  );
  const [value, setValue] = useState<Date | null>(new Date());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setOption(JSON.parse(value) as DateDayCalendarProps['options']);
  };
  const handleDateChange = (newValue: Date | null) => {
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
          <Grid rows={1} columns={2} spacing={5}>
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
      <DateDayCalendar
        key={JSON.stringify(option)}
        value={value}
        onChange={handleDateChange}
        locale="en-US"
        options={option}
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
    <DateDayCalendar
      referenceDate={new Date(2025, 0, 1)}
      minDate={new Date(2025, 0, 10)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar
  referenceDate={new Date(2025, 0, 1)}
  minDate={new Date(2025, 0, 10)}
/>`.trim()
      }
    }
  }
};

export const MaxDate: Story = {
  render: (args) => (
    <DateDayCalendar
      referenceDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 0, 20)}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar
  referenceDate={new Date(2025, 0, 1)}
  maxDate={new Date(2025, 0, 20)}
/>`.trim()
      }
    }
  }
};

export const DisabledDates: Story = {
  render: (args) => (
    <DateDayCalendar
      referenceDate={new Date(2025, 0, 1)}
      disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar
  referenceDate={new Date(2025, 0, 1)}
  disabledDates={[new Date(2025, 0, 15), new Date(2025, 0, 28)]}
/>`.trim()
      }
    }
  }
};

export const ReadOnly: Story = {
  render: (args) => <DateDayCalendar readOnly {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar readOnly />`.trim()
      }
    }
  }
};

export const Disabled: Story = {
  render: (args) => <DateDayCalendar disabled {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar disabled />`.trim()
      }
    }
  }
};

export const ShowAdditionalDays: Story = {
  render: (args) => (
    <DateDayCalendar
      showDaysOutsideCurrentMonth
      fixedWeekNumber={6}
      {...args}
    />
  )
};

export const DisplayWeekNumber: Story = {
  render: (args) => <DateDayCalendar displayWeekNumber {...args} />
};

export const WeekPicker: Story = {
  render: () => <WeekPickerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const WeekPickerTemplate = () => {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = Math.ceil(
      (date.getTime() - firstDayOfYear.getTime()) / DAY
    );
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
  };

  const isInSameWeek = (dayA: Date | null, dayB: Date | null): boolean => {
    if (dayA === null || dayB === null) return false;
    return getWeekNumber(dayA) === getWeekNumber(dayB);
  };

  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  return (
    <DateDayCalendar
      className="custom-week-picker"
      value={selectedDay}
      onChange={handleSelectedDayChange}
      showDaysOutsideCurrentMonth
      displayWeekNumber
      renderDay={(dayProps) => {
        const { value, className, ...rest } = dayProps;
        return (
          <Day
            {...rest}
            className={cn(className, {
              hovered: isInSameWeek(value, hoveredDay),
              leftRounded: value.getDay() === 0,
              rightRounded: value.getDay() === 6
            })}
            value={value}
            selected={isInSameWeek(value, selectedDay)}
            marked={false}
            onMouseEnter={() => setHoveredDay(value)}
            onMouseLeave={() => setHoveredDay(null)}
            disableOverlay
          />
        );
      }}
    />
  );
};`.trim()
      }
    }
  }
};

export const CalendarWithNotes: Story = {
  render: () => <CalendarWithNotesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CalendarWithNotesTemplate = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [notes, setNotes] = useState<NotesType>({
    [new Date(2025, 6, 8).getTime()]: ['공부하기']
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('content');
    const day = selectedDay?.getTime();
    if (!day) return;
    const newNotes = JSON.parse(JSON.stringify(notes));
    if (newNotes[day]) {
      newNotes[day].push(content);
    } else {
      newNotes[day] = [content];
    }
    setNotes(newNotes);
    handleClose();
  };
  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  return (
    <>
      <DateDayCalendar
        className="custom-calendar-with-notes"
        value={selectedDay}
        onChange={handleSelectedDayChange}
        referenceDate={new Date(2025, 6)}
        renderDay={(dayProps) => {
          const { value, className, children, onClick, ...rest } = dayProps;
          const dayTimeStamp = value.getTime();
          return (
            <Day
              {...rest}
              className={cn(className)}
              value={value}
              marked={false}
              color="primary-container"
              onClick={(e) => {
                onClick?.(e);
                handleOpen();
              }}
            >
              <div className="day-number">{children}</div>
              <Stack spacing={3}>
                {notes[dayTimeStamp]?.map((content) => (
                  <Text key={content} className="note">
                    {content}
                  </Text>
                ))}
              </Stack>
            </Day>
          );
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Note</ModalHeader>
          <ModalBody>
            <Input
              name="content"
              placeholder="content"
              fullWidth
              style={{ marginTop: '1px' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="subtle-filled" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Ok</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomCalendarHeader: Story = {
  render: (args) => (
    <DateDayCalendar
      renderCalendarHeader={(calendarHeaderProps) => (
        <CalendarHeader
          style={{ marginBottom: '5px', backgroundColor: 'gray-200' }}
          prevIcon="Prev"
          nextIcon="Next"
          {...calendarHeaderProps}
        />
      )}
      {...args}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `<DateDayCalendar
  renderCalendarHeader={(calendarHeaderProps) => (
    <CalendarHeader
      style={{ marginBottom: '5px', backgroundColor: 'gray-200' }}
      {...calendarHeaderProps}
    />
  )}
/>`.trim()
      }
    }
  }
};
