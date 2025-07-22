import './CalendarCustom.scss';
import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, Day, DayProps, Month, MonthProps, Year, YearProps } from '.';
import cn from 'classnames';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Text } from '@/components/general/Text';
import { DateOptions } from '@/components/data-entry/DateField';
import { DAY } from '@/constants/time';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@/components/feedback/Modal';
import { Button } from '@/components/general/Button';
import { Input } from '@/components/data-entry/Input';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  argTypes: {
    defaultValue: {
      description: '초기 date',
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
      description: 'month당 보여지는 week 개수',
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
    onDayChange: {
      description: 'day 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date) => void;`
        }
      }
    },
    onMonthChange: {
      description: 'month 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date) => void;`
        }
      }
    },
    onYearChange: {
      description: 'year 값이 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary: `(value: Date) => void;`
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
  month?: 'numeric' | '2-digit' | 'long' | 'short';
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
        },
        defaultValue: { summary: 'false' }
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
    renderYear: {
      description: 'yearProps를 인자로 받아 Year 컴포넌트를 반환하는 함수',
      table: {
        type: {
          summary: `(yearProps: YearProps) => React.ReactNode;`
        },
        defaultValue: {
          summary: `(yearProps: YearProps) => <Year {...yearProps} />`
        }
      }
    },
    showDaysOutsideCurrentMonth: {
      description:
        'true이면, 현재 month에 해당하는 days 이외의 앞뒤 일부 days를 나타냄',
      table: {
        type: {
          summary: `boolean`
        }
      }
    },
    value: {
      description: 'date',
      table: {
        type: {
          summary: `Date | null`
        }
      }
    },
    yearsOrder: {
      description: 'years를 나타내는 순서',
      table: {
        type: {
          summary: `'asc' | 'desc'`
        },
        defaultValue: {
          summary: `'asc'`
        }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const LOCALES = ['ko-KR', 'en-US', 'fr-FR', 'ja-JP', 'zh-CN', 'ar-EG'];
const OPTIONS: Array<DateOptions> = [
  {
    dateStyle: 'medium'
  },
  {
    year: 'numeric'
  },
  {
    month: 'long'
  }
];

type NotesType = { [dayTimeStamp: number]: Array<string> };

const ControlledCalendarTemplate = () => {
  const [value, setValue] = useState<Date | null>(null);
  const year = value?.getFullYear();
  const month = value?.getMonth();
  const day = value?.getDate();

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <Stack>
      <Text style={{ display: 'inline-flex', gap: '5px' }}>
        Date:
        <span>{year !== undefined && `${year} /`}</span>
        <span>{month !== undefined && `${month + 1} /`}</span>
        <span>{day !== undefined && `${day}`}</span>
      </Text>
      <Calendar value={value} onChange={handleChange} />
    </Stack>
  );
};

const WeekPickerTemplate = () => {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / DAY;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const isInSameWeek = (dayA: Date | null, dayB: Date | null): boolean => {
    if (dayA === null || dayB === null) return false;
    return getWeekNumber(dayA) === getWeekNumber(dayB);
  };

  const handleSelectedDayChange = (newDate: Date) => {
    setSelectedDay(newDate);
  };

  return (
    <Calendar
      className="custom-week-picker"
      value={selectedDay}
      onChange={handleSelectedDayChange}
      showDaysOutsideCurrentMonth
      displayWeekNumber
      renderDay={(dayProps: Omit<DayProps, 'ref'>) => {
        const { day, className, ...rest } = dayProps;
        return (
          <Day
            {...rest}
            key={day.getTime()}
            day={day}
            className={cn(className, {
              hovered: isInSameWeek(day, hoveredDay),
              leftRounded: day.getDay() === 0,
              rightRounded: day.getDay() === 6
            })}
            selected={isInSameWeek(day, selectedDay)}
            marked={false}
            onMouseEnter={() => setHoveredDay(day)}
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
      <Calendar
        className="custom-calendar-with-notes"
        value={selectedDay}
        onChange={handleSelectedDayChange}
        referenceDate={new Date(2025, 6)}
        renderDay={(dayProps: Omit<DayProps, 'ref'>) => {
          const { day, className, children, onClick, ...rest } = dayProps;
          const dayTimeStamp = day.getTime();
          return (
            <Day
              {...rest}
              key={dayTimeStamp}
              className={cn(className)}
              day={day}
              marked={false}
              color="primary-container"
              onClick={(e) => {
                onClick && onClick(e);
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

export const BasicCalendar: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Calendar />
      <Calendar defaultValue={new Date(2022, 10, 5)} />
    </Stack>
  )
};

export const ControlledCalendar: Story = {
  render: () => <ControlledCalendarTemplate />
};

export const ChooseTheInitialDate: Story = {
  render: () => <Calendar referenceDate={new Date(2022, 10, 5)} />
};

export const Locale: Story = {
  render: () => (
    <Grid columns={3} spacing={20}>
      {LOCALES.map((locale) => (
        <Stack key={locale}>
          <Text>{`Locale: '${locale}'`}</Text>
          <Calendar locale={locale} defaultValue={new Date()} />
        </Stack>
      ))}
    </Grid>
  )
};

export const Options: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      {OPTIONS.map((options) => (
        <Stack
          key={JSON.stringify(options)}
          spacing={20}
          style={{ alignItems: 'center' }}
        >
          <Text
            style={{ fontSize: '13px' }}
          >{`Options: ${JSON.stringify(options)}`}</Text>
          <Calendar options={options} defaultValue={new Date()} />
        </Stack>
      ))}
    </Stack>
  )
};

export const Readonly: Story = {
  render: () => <Calendar defaultValue={new Date(2022, 10, 5)} readOnly />
};

export const Disabled: Story = {
  render: () => <Calendar defaultValue={new Date(2022, 10, 5)} disabled />
};

export const RestrictDate: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Calendar
        referenceDate={new Date('2025-07')}
        minDate={new Date('2025-07-15')}
      />
      <Calendar
        referenceDate={new Date('2025-07')}
        maxDate={new Date('2025-07-24')}
      />
      <Calendar
        referenceDate={new Date('2025-07')}
        disabledDates={[new Date('2025-07-10'), new Date('2025-07-15')]}
      />
    </Stack>
  )
};

export const OrderOfYears: Story = {
  render: () => <Calendar yearsOrder="dsc" options={{ year: 'numeric' }} />
};

export const ShowAdditionalDays: Story = {
  render: () => (
    <Stack direction="row" spacing={20}>
      <Calendar showDaysOutsideCurrentMonth />
      <Calendar showDaysOutsideCurrentMonth fixedWeekNumber={6} />
    </Stack>
  )
};

export const DisplayWeekNumber: Story = {
  render: () => <Calendar displayWeekNumber />
};

export const WeekPicker: Story = {
  render: () => <WeekPickerTemplate />
};

export const CalendarWithNotes: Story = {
  render: () => <CalendarWithNotesTemplate />
};

export const CustomMonthCalendar: Story = {
  render: () => (
    <Calendar
      options={{ month: 'long' }}
      renderMonth={(monthProps: Omit<MonthProps, 'ref'>) => {
        const { month, ...rest } = monthProps;
        return (
          <Month
            {...rest}
            key={month.getMonth()}
            month={month}
            color="green"
            style={{ width: '100%' }}
          />
        );
      }}
    />
  )
};

export const CustomYearCalendar: Story = {
  render: () => (
    <Calendar
      options={{ year: 'numeric' }}
      renderYear={(yearProps: Omit<YearProps, 'ref'>) => {
        const { year, ...rest } = yearProps;
        return (
          <Year
            {...rest}
            key={year.getFullYear()}
            year={year}
            color="green"
            style={{ width: '100%' }}
          />
        );
      }}
    />
  )
};
