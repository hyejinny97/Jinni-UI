import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselFraction,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselProgress,
  CarouselProps
} from '.';
import { Dot, DotProps } from '@/components/navigation/Dots';
import { isNumber } from '@/utils/isNumber';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { SECOND } from '@/constants/time';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  argTypes: {
    autoplay: {
      description: 'true이면, 자동으로 slide가 넘어감',
      type: 'boolean'
    },
    autoplayDuration: {
      description: '한 slide당 유지 시간 (ms)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `5000` }
      }
    },
    children: {
      description:
        'CarouselContent,  CarouselDots, CarouselFraction, CarouselProgress, CarouselPrevButton, CarouselNextButton 등의 컴포넌트들',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    defaultValue: {
      description: '초기 active carousel item index',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `0` }
      }
    },
    disableAutoplayOnInteraction: {
      description:
        'true이면, carousel를 interaction한 상태인 경우 autoplay 타이머가 잠시 중지됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    infinite: {
      description: 'true이면, infinite slides가 됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    onAutoplayLeftTimeChange: {
      description:
        '다음 slide로 넘어가기까지 남은 시간이 변경될 때 마다 호출되는 함수',
      table: {
        type: { summary: `(timeLeft: number) => void` }
      }
    },
    orientation: {
      description: 'carousel 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const ITEMS = [
  { title: 'Slide 1' },
  { title: 'Slide 2' },
  { title: 'Slide 3' },
  { title: 'Slide 4' },
  { title: 'Slide 5' }
];

const SUB_ITEMS = [
  { title: 'Slide 3-1' },
  { title: 'Slide 3-2' },
  { title: 'Slide 3-3' }
];

const DEFAULT_AUTOPLAY_DURATION = 5000;

const BasicCarouselTemplate = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & CarouselProps) => {
  return (
    <Carousel style={{ width: '500px' }} {...props}>
      <CarouselContent>
        {ITEMS.map(({ title }) => (
          <CarouselItem
            key={title}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray-100'
            }}
          >
            {title}
          </CarouselItem>
        ))}
      </CarouselContent>
      {children}
    </Carousel>
  );
};

const CarouselTemplate = ({ ...props }) => {
  return (
    <BasicCarouselTemplate {...props}>
      <CarouselProgress />
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </BasicCarouselTemplate>
  );
};

const SubCarousel = () => {
  return (
    <Carousel orientation="vertical" style={{ width: '500px' }}>
      <CarouselContent>
        {SUB_ITEMS.map(({ title }) => {
          return (
            <CarouselItem
              key={title}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray-200'
              }}
            >
              {title}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};

const NestedCarouselTemplate = () => {
  return (
    <Carousel style={{ width: '500px' }}>
      <CarouselContent>
        {ITEMS.map(({ title }) => {
          return (
            <CarouselItem
              key={title}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray-100'
              }}
            >
              {title === 'Slide 3' ? <SubCarousel /> : title}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};

const AutoplayLeftTimeTemplate = () => {
  const [leftTime, setLeftTime] = useState(DEFAULT_AUTOPLAY_DURATION);
  const progressPercent =
    ((DEFAULT_AUTOPLAY_DURATION - leftTime + SECOND) /
      DEFAULT_AUTOPLAY_DURATION) *
    100;

  const handleLeftTimeChange = useCallback((newLeftTime: number) => {
    setLeftTime(newLeftTime);
  }, []);

  return (
    <BasicCarouselTemplate
      infinite
      autoplay
      onAutoplayLeftTimeChange={handleLeftTimeChange}
    >
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
      <CircularProgress
        percent={progressPercent}
        size="lg"
        showLabel
        labelFormat={() => `${leftTime / SECOND} s`}
        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      />
    </BasicCarouselTemplate>
  );
};

export const BasicCarousel: Story = {
  render: (args) => <CarouselTemplate {...args} />
};

export const DefaultValue: Story = {
  render: (args) => <CarouselTemplate defaultValue={3} {...args} />
};

export const Orientation: Story = {
  render: (args) => <CarouselTemplate orientation="vertical" {...args} />
};

export const CustomDotsPagination: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselDots
        size="sm"
        color="secondary"
        renderDot={({ value, selected, ...restDotProps }: DotProps) => (
          <Dot
            key={value}
            value={value}
            selected={selected}
            style={selected ? { color: 'white' } : {}}
            {...restDotProps}
          >
            {isNumber(value) && value + 1}
          </Dot>
        )}
      />
    </BasicCarouselTemplate>
  )
};

export const DotsPaginationPosition: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselDots position="bottom-end" />
    </BasicCarouselTemplate>
  )
};

export const CustomFractionPagination: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselFraction
        size="lg"
        style={{ fontWeight: '700', color: 'primary' }}
      />
    </BasicCarouselTemplate>
  )
};

export const FractionPaginationPosition: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselFraction position="bottom-end" />
    </BasicCarouselTemplate>
  )
};

export const CustomNavigation: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselPrevButton
        disableRipple
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 10px 0 5px',
          borderRadius: '12px',
          color: 'primary'
        }}
      >
        <FirstPageIcon /> Prev
      </CarouselPrevButton>
      <CarouselNextButton
        disableRipple
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0 5px 0 10px',
          borderRadius: '12px',
          color: 'primary'
        }}
      >
        Next <LastPageIcon />
      </CarouselNextButton>
    </BasicCarouselTemplate>
  )
};

export const NavigationPosition: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselPrevButton position="bottom-start" />
      <CarouselNextButton position="bottom-end" />
    </BasicCarouselTemplate>
  )
};

export const CustomProgress: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselProgress
        progressColor="yellow-400"
        trailColor="yellow-100"
        thickness="md"
        lineCap="round"
      />
    </BasicCarouselTemplate>
  )
};

export const ProgressPosition: Story = {
  render: (args) => (
    <BasicCarouselTemplate {...args}>
      <CarouselProgress position="bottom" />
    </BasicCarouselTemplate>
  )
};

export const NestedCarousel: Story = {
  render: (args) => <NestedCarouselTemplate {...args} />
};

export const InfiniteLoop: Story = {
  render: (args) => (
    <BasicCarouselTemplate infinite {...args}>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </BasicCarouselTemplate>
  )
};

export const Autoplay: Story = {
  render: (args) => (
    <BasicCarouselTemplate infinite autoplay {...args}>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </BasicCarouselTemplate>
  )
};

export const AutoplayDuration: Story = {
  render: (args) => (
    <BasicCarouselTemplate infinite autoplay autoplayDuration={3000} {...args}>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </BasicCarouselTemplate>
  )
};

export const DisableAutoplayOnInteraction: Story = {
  render: (args) => (
    <BasicCarouselTemplate
      infinite
      autoplay
      disableAutoplayOnInteraction
      {...args}
    >
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </BasicCarouselTemplate>
  )
};

export const AutoplayLeftTime: Story = {
  render: (args) => <AutoplayLeftTimeTemplate {...args} />
};
