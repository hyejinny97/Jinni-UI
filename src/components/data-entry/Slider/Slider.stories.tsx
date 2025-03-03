import './SliderCustom.scss';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/data-entry/Slider';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';

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
      description: 'slider의 기본 value',
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
        type: { summary: '(scaledValue: number, index: number) => string' },
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
      description: 'slider의 value가 변경됐을 때 호출되는 함수',
      table: {
        type: {
          summary:
            '(event: React.SyntheticEvent | Event, value: number | Array<number>, activeThumbIdx: number) => void }'
        }
      }
    },
    onChangeEnd: {
      description: 'slider의 연이은 value 변경이 끝날 때 호출되는 함수',
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
        type: { summary: `(scaledValue: number, index: number) => node` },
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
      description: 'slider의 value',
      table: {
        type: { summary: `Array<number> | number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Slider>;

const ControlledSliderTemplate = ({ ...props }) => {
  const [value, setValue] = useState<number>(60);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return <Slider value={value} onChange={handleChange} {...props} />;
};

const ControlledRangeSliderTemplate = ({ ...props }) => {
  const [value, setValue] = useState<Array<number>>([30, 60, 90]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as Array<number>);
  };

  return <Slider value={value} onChange={handleChange} {...props} />;
};

const MarksLabelCustomTemplate = ({ ...props }) => {
  const [value, setValue] = useState(30);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>
  ) => {
    setValue(newValue as number);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Slider
        value={value}
        onChange={handleChange}
        step={10}
        marks={[{ value: 0 }, { value: 100 }]}
        {...props}
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
        <Text onClick={() => setValue(0)}>0 min</Text>
        <Text onClick={() => setValue(100)}>100 max</Text>
      </div>
    </div>
  );
};

const MinimumDistanceTemplate1 = ({ ...props }) => {
  const minDistance = 10;
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
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Slider value={value} onChange={handleChange} disableSwap {...props} />
  );
};

const MinimumDistanceTemplate2 = ({ ...props }) => {
  const minDistance = 10;
  const [value, setValue] = useState([30, 70]);

  const handleChange = (
    _: React.SyntheticEvent | Event,
    newValue: number | Array<number>,
    activeThumbIdx: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumbIdx === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  return (
    <Slider value={value} onChange={handleChange} disableSwap {...props} />
  );
};

const NonLinearScaleTemplate = ({ ...props }) => {
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
        scale={calculateValue}
        onChange={handleChange}
        tooltipLabelFormat={formatValueLabel}
        getAriaValueText={formatValueLabel}
        TooltipProps={{ placement: 'bottom' }}
        {...props}
      />
    </>
  );
};

export const BasicSlider: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider name="temperature" required />
    </Stack>
  )
};

export const GetAriaValueText: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider
        name="temperature"
        getAriaValueText={(scaledValue) => `${scaledValue} celsius`}
      />
    </Stack>
  )
};

export const SlidedByDefault: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={30} />
    </Stack>
  )
};

export const ControlledSlider: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <ControlledSliderTemplate />
    </Stack>
  )
};

export const ChangeEnd: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <ControlledSliderTemplate
        onChangeEnd={(
          _: React.SyntheticEvent | Event,
          newValue: number | Array<number>
        ) => console.info(newValue)}
      />
    </Stack>
  )
};

export const MinimumMaximumValue: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider min={10} max={20} />
    </Stack>
  )
};

export const DiscreteSlider: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider step={20} />
      <Slider step={30} />
    </Stack>
  )
};

export const Marks: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider step={10} marks />
      <Slider
        step={10}
        marks={[{ value: 10 }, { value: 30 }, { value: 100 }]}
      />
      <Slider
        step={10}
        marks={[
          { value: 10, label: '10℃' },
          { value: 30, label: '30℃' },
          { value: 100, label: '100℃' }
        ]}
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
          { value: 10, label: <Text style={{ color: 'primary' }}>10℃</Text> },
          { value: 30, label: <Text style={{ color: 'primary' }}>30℃</Text> },
          { value: 100, label: <Text style={{ color: 'primary' }}>100℃</Text> }
        ]}
      />
    </Stack>
  )
};

export const CustomMarksLabel: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <MarksLabelCustomTemplate />
    </Stack>
  )
};

export const RangeSlider: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={[30, 60]} />
      <ControlledRangeSliderTemplate />
    </Stack>
  )
};

export const DisableSwap: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider step={10} defaultValue={[30, 60]} disableSwap />
    </Stack>
  )
};

export const MinimumDistance: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <MinimumDistanceTemplate1 />
      <MinimumDistanceTemplate2 />
    </Stack>
  )
};

export const VerticalSlider: Story = {
  render: () => (
    <Stack direction="row" style={{ height: '300px' }}>
      <Slider orientation="vertical" />
      <Slider
        orientation="vertical"
        marks={[
          { value: 10, label: <Text style={{ color: 'primary' }}>10℃</Text> },
          { value: 30, label: <Text style={{ color: 'primary' }}>30℃</Text> },
          { value: 100, label: <Text style={{ color: 'primary' }}>100℃</Text> }
        ]}
      />
    </Stack>
  )
};

export const Disabled: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={30} disabled />
      <Slider defaultValue={[30, 60]} disabled />
    </Stack>
  )
};

export const Color: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider color="secondary" />
      <Slider color="yellow-400" />
    </Stack>
  )
};

export const Size: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider
        size="sm"
        marks={[
          { value: 10, label: <Text style={{ color: 'primary' }}>10℃</Text> },
          { value: 30, label: <Text style={{ color: 'primary' }}>30℃</Text> },
          { value: 100, label: <Text style={{ color: 'primary' }}>100℃</Text> }
        ]}
      />
      <Slider
        size="md"
        marks={[
          { value: 10, label: <Text style={{ color: 'primary' }}>10℃</Text> },
          { value: 30, label: <Text style={{ color: 'primary' }}>30℃</Text> },
          { value: 100, label: <Text style={{ color: 'primary' }}>100℃</Text> }
        ]}
      />
      <Slider
        size="lg"
        marks={[
          { value: 10, label: <Text style={{ color: 'primary' }}>10℃</Text> },
          { value: 30, label: <Text style={{ color: 'primary' }}>30℃</Text> },
          { value: 100, label: <Text style={{ color: 'primary' }}>100℃</Text> }
        ]}
      />
    </Stack>
  )
};

export const Track: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider defaultValue={20} track={false} />
    </Stack>
  )
};

export const CustomizeTooltipOpen: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ open: true }} defaultValue={[20, 37]} />
      <Slider TooltipProps={{ open: false }} />
    </Stack>
  )
};

export const CustomizeTooltipPlacement: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ placement: 'bottom' }} />
    </Stack>
  )
};

export const CustomizeTooltipArrow: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ arrow: false }} />
    </Stack>
  )
};

export const CustomizeTooltipOffset: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider TooltipProps={{ offset: 0 }} />
    </Stack>
  )
};

export const TooltipLabelFormat: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider
        tooltipLabelFormat={(scaledValue: number) => `${scaledValue} ℃`}
      />
    </Stack>
  )
};

export const NonLinearScale: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <NonLinearScaleTemplate />
    </Stack>
  )
};

export const Customization: Story = {
  render: () => (
    <Stack style={{ width: '300px' }}>
      <Slider className="iOS-style" />
      <Slider className="pretto-style" />
    </Stack>
  )
};
