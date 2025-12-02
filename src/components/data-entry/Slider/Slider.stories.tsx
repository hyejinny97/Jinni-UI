import './SliderCustom.scss';
import { useState, FormEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/data-entry/Slider';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/general/Button';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';

const meta: Meta<typeof Slider> = {
  component: Slider,
  argTypes: {
    color: {
      description: 'slider의 색상',
      table: {
        type: { summary: 'ColorType' },
        defaultValue: { summary: `'primary'` }
      }
    },
    defaultValue: {
      description: '초기 slider value',
      table: {
        type: { summary: 'Array<number> | number' }
      }
    },
    disabled: {
      description: 'true이면, 비활성화 됨',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    disableSwap: {
      description: 'true이면, 한 thumb이 다른 thumb를 넘어 가지 않음',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `false` }
      }
    },
    getAriaValueText: {
      description:
        'slider의 value를 사용자 친화적인 이름으로 변경해주는 함수 (screen reader 사용자에게 중요한 정보)',
      table: {
        type: { summary: '(scaledValue: number, thumbIdx: number) => string' },
        defaultValue: { summary: `(scaledValue: number) ⇒ String(scaledValue)` }
      }
    },
    marks: {
      description: 'rail 위에 표시되는 마크',
      table: {
        type: { summary: 'Array<{ value: number, label?: node }> | boolean' },
        defaultValue: { summary: `false` }
      }
    },
    max: {
      description: 'slider value 최댓값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `100` }
      }
    },
    min: {
      description: 'slider value 최솟값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: `0` }
      }
    },
    name: {
      description: 'slider name',
      type: 'string'
    },
    onChange: {
      description: 'slider value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: React.SyntheticEvent | Event, value: number | Array<number>, activeThumbIdx: number) => void'
        }
      }
    },
    onChangeEnd: {
      description: 'slider value 변경이 끝날 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: React.SyntheticEvent | Event, value: number | Array) => void'
        }
      }
    },
    orientation: {
      description: 'slider의 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    scale: {
      description: 'slider value의 scale을 변경하는 transformation function',
      table: {
        type: { summary: `(value: number) => number` },
        defaultValue: { summary: `(value: number) ⇒ value` }
      }
    },
    size: {
      description: 'slider의 사이즈',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: `'md'` }
      }
    },
    step: {
      description: 'value step',
      table: {
        type: { summary: `number | null` },
        defaultValue: { summary: `1` }
      }
    },
    tooltipLabelFormat: {
      description: 'tooltip의 value label의 format을 변경하는 function',
      table: {
        type: { summary: `(scaledValue: number, thumbIdx: number) => node` },
        defaultValue: { summary: `(scaledValue: number) ⇒ scaledValue` }
      }
    },
    TooltipProps: {
      description: 'tooltip 컴포넌트의 props',
      table: {
        type: { summary: `TooltipProps` }
      }
    },
    track: {
      description: '트랙 설정',
      table: {
        type: { summary: `'normal' | false` },
        defaultValue: { summary: `'normal'` }
      }
    },
    value: {
      description: 'slider value',
      table: {
        type: { summary: `Array<number> | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

const ControlledSliderTemplate = () => {
  const [value, setValue] = useState<number>(60);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>Slider value: {value}</Text>
      <Slider value={value} onChange={handleChange} />
    </Stack>
  );
};

const FinalValueTemplate = () => {
  const [value, setValue] = useState<number>(60);
  const [finalValue, setFinalValue] = useState<number | null>(null);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };
  const handleChangeEnd = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setFinalValue(newValue as number);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>Slider value: {value}</Text>
      <Text noMargin>Final value: {finalValue}</Text>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
      />
    </Stack>
  );
};

const CustomMarksLabelTemplate = () => {
  const [value, setValue] = useState(30);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <Slider
        value={value}
        onChange={handleChange}
        step={10}
        marks={[{ value: 0 }, { value: 100 }]}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '100%',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          className="typo-label-medium"
          onClick={() => setValue(0)}
          noMargin
        >
          0 min
        </Text>
        <Text
          className="typo-label-medium"
          onClick={() => setValue(100)}
          noMargin
        >
          100 max
        </Text>
      </div>
    </div>
  );
};

const ControlledRangeSliderTemplate = () => {
  const [value, setValue] = useState<Array<number>>([30, 60]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as Array<number>);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>First value: {value[0]}</Text>
      <Text noMargin>Second value: {value[1]}</Text>
      <Slider value={value} onChange={handleChange} />
    </Stack>
  );
};

const EnforceMinimumDistanceTemplate = () => {
  const MIN_DISTANCE = 10;
  const [value, setValue] = useState([30, 70]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
    activeThumbIdx: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumbIdx === 0) {
      setValue([Math.min(newValue[0], value[1] - MIN_DISTANCE), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + MIN_DISTANCE)]);
    }
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Slider value={value} onChange={handleChange} disableSwap />
    </Stack>
  );
};

const ShiftRangeTemplate = () => {
  const MIN_DISTANCE = 10;
  const [value, setValue] = useState([30, 70]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
    activeThumbIdx: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MIN_DISTANCE) {
      if (activeThumbIdx === 0) {
        const clamped = Math.min(newValue[0], 100 - MIN_DISTANCE);
        setValue([clamped, clamped + MIN_DISTANCE]);
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE);
        setValue([clamped - MIN_DISTANCE, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Slider value={value} onChange={handleChange} disableSwap />
    </Stack>
  );
};

const NonLinearScaleTemplate = () => {
  const [value, setValue] = useState<number>(5);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  const calculateValue = (value: number) => {
    return 2 ** value;
  };

  const formatValueLabel = (scaledValue: number) => {
    const units = ['KB', 'MB', 'GB', 'TB'];

    let unitIndex = 0;
    let value = scaledValue;
    while (value >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1;
      value /= 1024;
    }
    return `${value} ${units[unitIndex]}`;
  };

  return (
    <>
      <Text>Storage: {formatValueLabel(calculateValue(value))}</Text>
      <Slider
        min={5}
        max={30}
        step={1}
        value={value}
        onChange={handleChange}
        scale={calculateValue}
        tooltipLabelFormat={formatValueLabel}
        getAriaValueText={formatValueLabel}
        TooltipProps={{ placement: 'bottom' }}
        style={{ width: '300px' }}
      />
    </>
  );
};

const TooltipOpenTemplate = () => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenTooltip(event.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'start' }}>
      <Slider
        defaultValue={[20, 40]}
        TooltipProps={{ open: openTooltip }}
        style={{ width: '300px' }}
      />
      <Label content="Open Tooltip" labelPlacement="start">
        <Switch checked={openTooltip} onChange={toggle} />
      </Label>
    </Stack>
  );
};

export const BasicSlider: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider {...args} />
      <Slider defaultValue={30} {...args} />
    </Stack>
  )
};

export const ControlledSlider: Story = {
  render: () => <ControlledSliderTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledSliderTemplate = () => {
  const [value, setValue] = useState<number>(60);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>Slider value: {value}</Text>
      <Slider value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const FinalValue: Story = {
  render: () => <FinalValueTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FinalValueTemplate = () => {
  const [value, setValue] = useState<number>(60);
  const [finalValue, setFinalValue] = useState<number | null>(null);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };
  const handleChangeEnd = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setFinalValue(newValue as number);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>Slider value: {value}</Text>
      <Text noMargin>Final value: {finalValue}</Text>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
      />
    </Stack>
  );
};
`.trim()
      }
    }
  }
};

export const MinimumMaximumValue: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider min={10} max={20} {...args} />
    </Stack>
  )
};

export const DiscreteSlider: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider step={20} {...args} />
      <Slider step={30} {...args} />
    </Stack>
  )
};

export const BasicMarks: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider step={10} marks {...args} />
      <Slider
        step={10}
        marks={[{ value: 10 }, { value: 30 }, { value: 100 }]}
        {...args}
      />
      <Slider
        step={10}
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        {...args}
      />
    </Stack>
  )
};

export const StepOnMarks: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider
        step={null}
        marks={[
          { value: 10, label: <Text className="typo-label-medium">10℃</Text> },
          { value: 30, label: <Text className="typo-label-medium">30℃</Text> },
          { value: 100, label: <Text className="typo-label-medium">100℃</Text> }
        ]}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack style={{ width: '300px' }}>
  <Slider
    step={null}
    marks={[
      { value: 10, label: <Text className="typo-label-medium">10℃</Text> },
      { value: 30, label: <Text className="typo-label-medium">30℃</Text> },
      { value: 100, label: <Text className="typo-label-medium">100℃</Text> }
    ]}
  />
</Stack>`.trim()
      }
    }
  }
};

export const CustomMarksLabel: Story = {
  render: () => <CustomMarksLabelTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomMarksLabelTemplate = () => {
  const [value, setValue] = useState(30);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <Slider
        value={value}
        onChange={handleChange}
        step={10}
        marks={[{ value: 0 }, { value: 100 }]}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '100%',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          className="typo-label-medium"
          onClick={() => setValue(0)}
          noMargin
        >
          0 min
        </Text>
        <Text
          className="typo-label-medium"
          onClick={() => setValue(100)}
          noMargin
        >
          100 max
        </Text>
      </div>
    </div>
  );
};`.trim()
      }
    }
  }
};

export const RangeSliderDefaultValue: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={[30, 60]} {...args} />
      <Slider defaultValue={[30, 60, 90]} {...args} />
    </Stack>
  )
};

export const RangeSliderValue: Story = {
  render: () => <ControlledRangeSliderTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledRangeSliderTemplate = () => {
  const [value, setValue] = useState<Array<number>>([30, 60]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as Array<number>);
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Text noMargin>First value: {value[0]}</Text>
      <Text noMargin>Second value: {value[1]}</Text>
      <Slider value={value} onChange={handleChange} />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const DisableSwap: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider step={10} defaultValue={[30, 60]} disableSwap {...args} />
    </Stack>
  )
};

export const EnforceMinimumDistance: Story = {
  render: () => <EnforceMinimumDistanceTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const EnforceMinimumDistanceTemplate = () => {
  const MIN_DISTANCE = 10;
  const [value, setValue] = useState([30, 70]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
    activeThumbIdx: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumbIdx === 0) {
      setValue([Math.min(newValue[0], value[1] - MIN_DISTANCE), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + MIN_DISTANCE)]);
    }
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Slider value={value} onChange={handleChange} disableSwap />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const ShiftRange: Story = {
  render: () => <ShiftRangeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ShiftRangeTemplate = () => {
  const MIN_DISTANCE = 10;
  const [value, setValue] = useState([30, 70]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
    activeThumbIdx: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < MIN_DISTANCE) {
      if (activeThumbIdx === 0) {
        const clamped = Math.min(newValue[0], 100 - MIN_DISTANCE);
        setValue([clamped, clamped + MIN_DISTANCE]);
      } else {
        const clamped = Math.max(newValue[1], MIN_DISTANCE);
        setValue([clamped - MIN_DISTANCE, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <Stack style={{ width: '300px' }}>
      <Slider value={value} onChange={handleChange} disableSwap />
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const SliderWithForm: Story = {
  render: (args) => (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const temperature = formData.get('temperature');
        alert(`temperature: ${temperature}`);
      }}
    >
      <Stack direction="row" spacing={20}>
        <Slider
          name="temperature"
          getAriaValueText={(scaledValue) => `${scaledValue} celsius`}
          style={{ width: '300px' }}
          {...args}
        />
        <Button>제출</Button>
      </Stack>
    </form>
  ),
  parameters: {
    docs: {
      source: {
        code: `<form
  onSubmit={(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const temperature = formData.get('temperature');
    alert(\`temperature: \${temperature}\`);
  }}
>
  <Stack direction="row" spacing={20}>
    <Slider
      name="temperature"
      getAriaValueText={(scaledValue) => \`\${scaledValue} celsius\`}
      style={{ width: '300px' }}
    />
    <Button>제출</Button>
  </Stack>
</form>`.trim()
      }
    }
  }
};

export const NonLinearScale: Story = {
  render: () => <NonLinearScaleTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NonLinearScaleTemplate = () => {
  const [value, setValue] = useState<number>(5);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  const calculateValue = (value: number) => {
    return 2 ** value;
  };

  const formatValueLabel = (scaledValue: number) => {
    const units = ['KB', 'MB', 'GB', 'TB'];

    let unitIndex = 0;
    let value = scaledValue;
    while (value >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1;
      value /= 1024;
    }
    return \`\${value} \${units[unitIndex]}\`;
  };

  return (
    <>
      <Text>Storage: {formatValueLabel(calculateValue(value))}</Text>
      <Slider
        min={5}
        max={30}
        step={1}
        value={value}
        onChange={handleChange}
        scale={calculateValue}
        tooltipLabelFormat={formatValueLabel}
        getAriaValueText={formatValueLabel}
        TooltipProps={{ placement: 'bottom' }}
        style={{ width: '300px' }}
      />
    </>
  );
};`.trim()
      }
    }
  }
};

export const VerticalSlider: Story = {
  render: (args) => (
    <Stack direction="row" style={{ height: '300px' }}>
      <Slider orientation="vertical" {...args} />
      <Slider
        orientation="vertical"
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        {...args}
      />
    </Stack>
  )
};

export const Disabled: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={30} disabled {...args} />
      <Slider defaultValue={[30, 60]} disabled {...args} />
    </Stack>
  )
};

export const Color: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider color="secondary" {...args} />
      <Slider color="yellow-400" {...args} />
    </Stack>
  )
};

export const Size: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider
        size="sm"
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        {...args}
      />
      <Slider
        size="md"
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        {...args}
      />
      <Slider
        size="lg"
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        {...args}
      />
    </Stack>
  )
};

export const Track: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={30} track={false} {...args} />
      <Slider
        defaultValue={30}
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
        track={false}
        {...args}
      />
    </Stack>
  )
};

export const TooltipOpen: Story = {
  render: () => <TooltipOpenTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TooltipOpenTemplate = () => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const toggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenTooltip(event.target.checked);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'start' }}>
      <Slider
        defaultValue={[20, 40]}
        TooltipProps={{ open: openTooltip }}
        style={{ width: '300px' }}
      />
      <Label content="Open Tooltip" labelPlacement="start">
        <Switch checked={openTooltip} onChange={toggle} />
      </Label>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const TooltipPlacement: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ placement: 'bottom' }} {...args} />
    </Stack>
  )
};

export const TooltipArrow: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ arrow: false }} {...args} />
    </Stack>
  )
};

export const TooltipOffset: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ offset: 5 }} {...args} />
    </Stack>
  )
};

export const TooltipLabelFormat: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider
        tooltipLabelFormat={(scaledValue: number) => `${scaledValue} ℃`}
        {...args}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack style={{ width: '300px' }}>
  <Slider tooltipLabelFormat={(scaledValue: number) => \`\${scaledValue} ℃\`} />
</Stack>`.trim()
      }
    }
  }
};

export const Customization: Story = {
  render: (args) => (
    <Stack style={{ width: '300px' }}>
      <Slider className="iOS-style" defaultValue={20} {...args} />
      <Slider className="pretto-style" defaultValue={20} {...args} />
    </Stack>
  )
};
