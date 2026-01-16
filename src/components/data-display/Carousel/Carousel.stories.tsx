import './CarouselCustom.scss';
import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDot,
  CarouselDots,
  CarouselFraction,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselProgress
} from '.';
import { FirstPageIcon } from '@/components/icons/FirstPageIcon';
import { LastPageIcon } from '@/components/icons/LastPageIcon';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { SECOND } from '@/constants/time';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Radio } from '@/components/data-entry/Radio';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Label } from '@/components/data-entry/Label';
import { roundToDecimal } from '@/utils/roundToDecimal';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  argTypes: {
    autoplay: {
      description: 'true이면, 자동으로 slide가 넘어감',
      type: 'boolean'
    },
    autoplayDuration: {
      description: '한 slide당 유지 시간 (단위: ms)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `5000` }
      }
    },
    autoplayIntervalTime: {
      description:
        'onAutoplayLeftTimeChange 함수가 호출되는 시간 간격 (단위: ms)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `1000` }
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
      description: '초기 active slide index (zero-based index)',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `0` }
      }
    },
    disableAutoplayOnInteraction: {
      description:
        'true이면, carousel를 hover하거나 swipe한 상태인 경우 autoplay 타이머가 잠시 중지됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    disableBounceEffect: {
      description: 'true이면, Bounce Effect가 비활성화 됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    disableSlipEffect: {
      description: 'true이면, Slip Effect가 비활성화 됨',
      table: {
        type: { summary: `boolean` }
      }
    },
    disableSwipeEffect: {
      description: 'true이면, Swipe Effect가 비활성화 됨',
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
    onChange: {
      description: 'active slide가 변경됐을 때 호출되는 함수',
      table: {
        type: { summary: `(value: number) => void;` }
      }
    },
    orientation: {
      description: 'carousel 방향',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: `'horizontal'` }
      }
    },
    slideAlignment: {
      description: 'container 내 active slide의 위치',
      table: {
        type: { summary: `'start' | 'center'` },
        defaultValue: { summary: `'start'` }
      }
    },
    slipSize: {
      description: '미끄러지는 정도',
      table: {
        type: { summary: `'small' | 'medium' | 'large'` },
        defaultValue: { summary: `'medium'` }
      }
    },
    snapMode: {
      description: 'snap 여부',
      table: {
        type: { summary: `'snap' | 'free'` },
        defaultValue: { summary: `'snap'` }
      }
    },
    spacing: {
      description: 'slide 간 gap',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `0` }
      }
    },
    value: {
      description: 'active slide index (zero-based index)',
      table: {
        type: { summary: `number` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const ControlledCarouselTemplate = () => {
  const [value, setValue] = useState(2);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Text>value: {value}</Text>
      <Carousel
        value={value}
        onChange={handleChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `rgb(${channel},${channel},${channel})`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </>
  );
};

const DetectLeftTimeChangeTemplate = () => {
  const DEFAULT_AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(
    DEFAULT_AUTOPLAY_DURATION
  );
  const autoplayProgressPercent =
    ((DEFAULT_AUTOPLAY_DURATION - autoplayLeftTime) /
      DEFAULT_AUTOPLAY_DURATION) *
    100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div className="left-time-change" style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayIntervalTime={0.1 * SECOND}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `rgb(${channel},${channel},${channel})`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{`${Math.ceil(autoplayLeftTime / SECOND)}s`}</Text>
      </Box>
    </div>
  );
};

const AutoplayDurationTemplate = () => {
  const AUTOPLAY_DURATION = 3 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayDuration={AUTOPLAY_DURATION}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `rgb(${channel},${channel},${channel})`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{`${autoplayLeftTime / SECOND}s`}</Text>
      </Box>
    </div>
  );
};

const DisableAutoplayOnInteractionTemplate = () => {
  const AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayDuration={AUTOPLAY_DURATION}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        disableAutoplayOnInteraction
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `rgb(${channel},${channel},${channel})`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{`${autoplayLeftTime / SECOND}s`}</Text>
      </Box>
    </div>
  );
};

const SlidePerViewProportionalTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;
  const VIEWS = SLIDES - SLIDES_PER_VIEW + 1;
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: `0 0 calc((100% - ${GAP * 2}px) / ${SLIDES_PER_VIEW})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots>
        {Array(VIEWS)
          .fill(0)
          .map((_, idx) => (
            <CarouselDot key={idx} value={idx} />
          ))}
      </CarouselDots>
      <CarouselPrevButton disabled={value === 0} />
      <CarouselNextButton disabled={value === VIEWS - 1} />
    </Carousel>
  );
};

const GridTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;
  const VIEWS = SLIDES - SLIDES_PER_VIEW + 1;
  const BOXES_PER_SLIDE = 2;
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, slideIdx) => {
            const channel = 255 - 5 * (slideIdx + 1);
            return (
              <CarouselItem
                key={slideIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${GAP}px`,
                  flex: `0 0 calc((100% - ${GAP * 2}px) / ${SLIDES_PER_VIEW})`
                }}
              >
                {Array(BOXES_PER_SLIDE)
                  .fill(0)
                  .map((_, boxIdx) => (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: `rgb(${channel},${channel},${channel})`
                      }}
                    >
                      Slide {2 * slideIdx + boxIdx + 1}
                    </Box>
                  ))}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction value={value + 1} count={VIEWS} />
    </Carousel>
  );
};

const SlideAlignmentProportionalTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;

  return (
    <Carousel
      spacing={GAP}
      slideAlignment="center"
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: `0 0 calc((100% - ${GAP * 2}px) / ${SLIDES_PER_VIEW})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};

const SlipSizeTemplate = () => {
  const SLIP_SIZES = ['small', 'medium', 'large'] as const;
  const [slipSize, setSlipSize] =
    useState<(typeof SLIP_SIZES)[number]>('medium');

  const changeSlipSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlipSize(event.target.value as (typeof SLIP_SIZES)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="slip-size" value={slipSize} onChange={changeSlipSize}>
        <Stack direction="row">
          {SLIP_SIZES.map((size) => (
            <Label content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Carousel
        snapMode="free"
        slipSize={slipSize}
        spacing={10}
        style={{
          width: '600px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(10)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `rgb(${channel},${channel},${channel})`,
                    flex: '0 0 auto',
                    width: '200px'
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
    </Stack>
  );
};

const DotsAnimationTemplate = () => {
  const SLIDES = 5;
  const DEFAULT_VALUE = 1;
  const DEFAULT_DOT_SIZE = 10;
  const EXTENDED_DOT_SIZE = 30;
  const carouselElRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLElement[]>([]);
  const [progress, setProgress] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    const carouselItems = carouselItemsRef.current;
    if (!carouselEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds, intersectionRatio, target } =
            entry;
          const targetIdx = carouselItems.findIndex((item) => item === target);
          if (rootBounds) {
            const { left: itemLeft, right: itemRight } = boundingClientRect;
            const { left: rootLeft } = rootBounds;
            const isCrossingLeft = itemLeft <= rootLeft && itemRight > rootLeft;
            if (isCrossingLeft) {
              setProgress(
                roundToDecimal({
                  value: targetIdx + 1 - intersectionRatio,
                  digits: 2
                })
              );
            }
          }
        });
      },
      {
        root: carouselEl,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    carouselItems.forEach((item) => {
      io.observe(item);
    });
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <Carousel
      ref={carouselElRef}
      defaultValue={DEFAULT_VALUE}
      disableBounceEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                ref={(element) => {
                  if (element) {
                    carouselItemsRef.current.push(element);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const diff = Math.abs(idx - progress);
            const dotWidth =
              diff > 1
                ? DEFAULT_DOT_SIZE
                : EXTENDED_DOT_SIZE -
                  (EXTENDED_DOT_SIZE - DEFAULT_DOT_SIZE) * diff;
            return (
              <CarouselDot
                key={idx}
                value={idx}
                style={{
                  width: `${dotWidth}px`,
                  height: `${DEFAULT_DOT_SIZE}px`,
                  aspectRatio: 'auto',
                  borderRadius: '8px'
                }}
              />
            );
          })}
      </CarouselDots>
    </Carousel>
  );
};

const CoverflowEffectTemplate = () => {
  const DEFAULT_VALUE = 1;
  const ROTATE_DEGREE_PER_PROGRESS = 45;
  const carouselElRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLElement[]>([]);
  const [progress, setProgress] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    const carouselItems = carouselItemsRef.current;
    if (!carouselEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds, intersectionRatio, target } =
            entry;
          const targetIdx = carouselItems.findIndex((item) => item === target);
          if (rootBounds) {
            const { left: itemLeft, right: itemRight } = boundingClientRect;
            const { left: rootLeft } = rootBounds;
            const isCrossingLeft = itemLeft <= rootLeft && itemRight > rootLeft;
            if (isCrossingLeft) {
              setProgress(
                roundToDecimal({
                  value: targetIdx + 1 - intersectionRatio - 0.5,
                  digits: 2
                })
              );
            }
          }
        });
      },
      {
        root: carouselEl,
        rootMargin: '0px 0px 0px -50%',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    carouselItems.forEach((item) => {
      io.observe(item);
    });
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <Carousel
      className="coverflow-effect"
      ref={carouselElRef}
      defaultValue={DEFAULT_VALUE}
      slideAlignment="center"
      style={{
        width: '600px',
        height: '300px'
      }}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const rotateDegree = Math.max(
              -90,
              Math.min(90, (progress - idx) * ROTATE_DEGREE_PER_PROGRESS)
            );
            return (
              <CarouselItem
                key={idx}
                ref={(element) => {
                  if (element) {
                    carouselItemsRef.current.push(element);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray-200',
                  flex: '0 0 60%',
                  '--translate-z': `-${Math.abs(rotateDegree * 2)}px`,
                  '--rotate-y': `${rotateDegree}deg`,
                  '--shadow-rtl-opacity':
                    rotateDegree > 0 ? rotateDegree / 90 : 0,
                  '--shadow-ltr-opacity':
                    rotateDegree < 0 ? -rotateDegree / 90 : 0
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};

const StartOffsetSlidesTemplate = () => {
  const GAP = 20;
  const SLIDE_OFFSET = GAP + 30;
  const CAROUSEL_WIDTH = 800;
  const SLIDE_WIDTH = 200;
  const SLIDES = 10;
  const VIEWS = SLIDES - Math.floor(CAROUSEL_WIDTH / (SLIDE_WIDTH + GAP)) + 1;
  const [value, setValue] = useState(1);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: `${CAROUSEL_WIDTH}px`,
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => (
            <CarouselItem
              key={idx}
              style={{
                flex: '0 0 auto',
                width: `${SLIDE_WIDTH}px`,
                ...(idx > 0 && {
                  marginLeft: `-${SLIDE_OFFSET}px`,
                  paddingLeft: `${SLIDE_OFFSET}px`
                })
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'gray-100'
                }}
              >
                Slide {idx + 1}
              </Box>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselFraction value={value + 1} count={VIEWS} />
      <CarouselPrevButton />
      <CarouselNextButton disabled={value === VIEWS - 1} />
    </Carousel>
  );
};

const SequentiallyScaledDotsTemplate = () => {
  const SLIDES = 8;
  const SCALE_DIFF = 0.7;
  const [value, setValue] = useState(2);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={20}
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => (
            <CarouselItem
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray-100'
              }}
            >
              Slide {idx + 1}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselDots max={5}>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const isActiveDot = value === idx;
            const scale = isActiveDot ? 1 : SCALE_DIFF ** Math.abs(value - idx);
            return (
              <CarouselDot
                key={idx}
                value={idx}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: `scale(${scale})`
                }}
              />
            );
          })}
      </CarouselDots>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};

const FadeEffectTemplate = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      disableSwipeEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent style={{ display: 'block' }}>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  opacity: idx <= value ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};

export const BasicCarousel: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </Carousel>
  )
};

export const DefaultValue: Story = {
  render: (args) => (
    <Carousel
      defaultValue={2}
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </Carousel>
  )
};

export const ControlledCarousel: Story = {
  render: () => <ControlledCarouselTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ControlledCarouselTemplate = () => {
  const [value, setValue] = useState(2);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Text>value: {value}</Text>
      <Carousel
        value={value}
        onChange={handleChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
      </Carousel>
    </>
  );
};`.trim()
      }
    }
  }
};

export const BasicControlButtons: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const ControlButtonsPosition: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton position="bottom-start" />
      <CarouselNextButton position="bottom-end" />
    </Carousel>
  )
};

export const CustomControlButtons: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton
        disableOverlay
        disableRipple
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontWeight: '700',
          color: 'gray-500'
        }}
      >
        <FirstPageIcon color="gray-500" />
        <span>Prev</span>
      </CarouselPrevButton>
      <CarouselNextButton
        disableOverlay
        disableRipple
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontWeight: '700',
          color: 'gray-500'
        }}
      >
        <span>Next</span>
        <LastPageIcon color="gray-500" />
      </CarouselNextButton>
    </Carousel>
  )
};

export const BasicDots: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const DotsPosition: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots position="top-center" />
    </Carousel>
  )
};

export const CustomDots: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots>
        {Array(5)
          .fill(0)
          .map((_, idx) => (
            <CarouselDot
              key={idx}
              value={idx}
              size="lg"
              color="secondary"
              style={{ color: 'white' }}
            >
              {idx + 1}
            </CarouselDot>
          ))}
      </CarouselDots>
    </Carousel>
  )
};

export const BasicFraction: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction />
    </Carousel>
  )
};

export const FractionPosition: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction position="bottom-end" />
    </Carousel>
  )
};

export const CustomFraction: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction
        size="lg"
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
          padding: '3px 10px'
        }}
      />
    </Carousel>
  )
};

export const BasicProgress: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress />
    </Carousel>
  )
};

export const ProgressPosition: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress position="bottom" />
    </Carousel>
  )
};

export const CustomProgress: Story = {
  render: (args) => (
    <Carousel
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress
        progressColor="yellow-400"
        trackColor="yellow-100"
        thickness={6}
      />
    </Carousel>
  )
};

export const Orientation: Story = {
  render: (args) => (
    <Carousel
      orientation="vertical"
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress />
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const BasicAutoplay: Story = {
  render: (args) => (
    <Carousel
      autoplay
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const DetectLeftTimeChange: Story = {
  render: () => <DetectLeftTimeChangeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DetectLeftTimeChangeTemplate = () => {
  const DEFAULT_AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(
    DEFAULT_AUTOPLAY_DURATION
  );
  const autoplayProgressPercent =
    ((DEFAULT_AUTOPLAY_DURATION - autoplayLeftTime) /
      DEFAULT_AUTOPLAY_DURATION) *
    100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div className="left-time-change" style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayIntervalTime={0.1 * SECOND}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{\`\${Math.ceil(autoplayLeftTime / SECOND)}s\`}</Text>
      </Box>
    </div>
  );
};`.trim()
      }
    }
  }
};

export const AutoplayDuration: Story = {
  render: () => <AutoplayDurationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AutoplayDurationTemplate = () => {
  const AUTOPLAY_DURATION = 3 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayDuration={AUTOPLAY_DURATION}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{\`\${autoplayLeftTime / SECOND}s\`}</Text>
      </Box>
    </div>
  );
};
`.trim()
      }
    }
  }
};

export const DisableAutoplayOnInteraction: Story = {
  render: () => <DisableAutoplayOnInteractionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DisableAutoplayOnInteractionTemplate = () => {
  const AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Carousel
        autoplay
        autoplayDuration={AUTOPLAY_DURATION}
        onAutoplayLeftTimeChange={handleAutoplayLeftTimeChange}
        disableAutoplayOnInteraction
        style={{
          width: '500px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </Carousel>
      <Box
        style={{
          display: 'inline-flex',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <CircularProgress value={autoplayProgressPercent} />
        <Text
          className="typo-label-small"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            margin: 0,
            color: 'gray-500'
          }}
        >{\`\${autoplayLeftTime / SECOND}s\`}</Text>
      </Box>
    </div>
  );
};`.trim()
      }
    }
  }
};

export const Spacing: Story = {
  render: (args) => (
    <Carousel
      spacing={20}
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const SlidePerViewProportional: Story = {
  render: () => <SlidePerViewProportionalTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlidePerViewProportionalTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;
  const VIEWS = SLIDES - SLIDES_PER_VIEW + 1;
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`,
                  flex: \`0 0 calc((100% - \${GAP * 2}px) / \${SLIDES_PER_VIEW})\`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots>
        {Array(VIEWS)
          .fill(0)
          .map((_, idx) => (
            <CarouselDot key={idx} value={idx} />
          ))}
      </CarouselDots>
      <CarouselPrevButton disabled={value === 0} />
      <CarouselNextButton disabled={value === VIEWS - 1} />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const SlidePerViewNotProportional: Story = {
  render: (args) => (
    <Carousel
      spacing={20}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: '0 0 auto',
                  width: `${100 * (idx + 1)}px`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const Grid: Story = {
  render: () => <GridTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const GridTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;
  const VIEWS = SLIDES - SLIDES_PER_VIEW + 1;
  const BOXES_PER_SLIDE = 2;
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, slideIdx) => {
            const channel = 255 - 5 * (slideIdx + 1);
            return (
              <CarouselItem
                key={slideIdx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: \`\${GAP}px\`,
                  flex: \`0 0 calc((100% - \${GAP * 2}px) / \${SLIDES_PER_VIEW})\`
                }}
              >
                {Array(BOXES_PER_SLIDE)
                  .fill(0)
                  .map((_, boxIdx) => (
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                      }}
                    >
                      Slide {2 * slideIdx + boxIdx + 1}
                    </Box>
                  ))}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction value={value + 1} count={VIEWS} />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const SlideAlignmentProportional: Story = {
  render: () => <SlideAlignmentProportionalTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlideAlignmentProportionalTemplate = () => {
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;

  return (
    <Carousel
      spacing={GAP}
      slideAlignment="center"
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`,
                  flex: \`0 0 calc((100% - \${GAP * 2}px) / \${SLIDES_PER_VIEW})\`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const SlideAlignmentNotProportional: Story = {
  render: (args) => (
    <Carousel
      spacing={10}
      slideAlignment="center"
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: '0 0 auto',
                  width: `${100 * (idx + 1)}px`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const SnapFreeMode: Story = {
  render: (args) => (
    <Carousel
      snapMode="free"
      spacing={10}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(10)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: '0 0 auto',
                  width: '200px'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const SlipEffect: Story = {
  render: (args) => (
    <Carousel
      snapMode="free"
      disableSlipEffect
      spacing={10}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(10)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`,
                  flex: '0 0 auto',
                  width: '200px'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  )
};

export const SlipSize: Story = {
  render: () => <SlipSizeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlipSizeTemplate = () => {
  const SLIP_SIZES = ['small', 'medium', 'large'] as const;
  const [slipSize, setSlipSize] =
    useState<(typeof SLIP_SIZES)[number]>('medium');

  const changeSlipSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlipSize(event.target.value as (typeof SLIP_SIZES)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup name="slip-size" value={slipSize} onChange={changeSlipSize}>
        <Stack direction="row">
          {SLIP_SIZES.map((size) => (
            <Label content={size}>
              <Radio value={size} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Carousel
        snapMode="free"
        slipSize={slipSize}
        spacing={10}
        style={{
          width: '600px',
          height: '300px',
          border: '1px solid lightgray'
        }}
      >
        <CarouselContent>
          {Array(10)
            .fill(0)
            .map((_, idx) => {
              const channel = 255 - 5 * (idx + 1);
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`,
                    flex: '0 0 auto',
                    width: '200px'
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevButton />
        <CarouselNextButton />
      </Carousel>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const NestedCarousel: Story = {
  render: (args) => (
    <Carousel
      spacing={20}
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        <CarouselItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray-100'
          }}
        >
          Slide 1
        </CarouselItem>
        <CarouselItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray-100'
          }}
        >
          Slide 2
        </CarouselItem>
        <CarouselItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray-100'
          }}
        >
          <Carousel
            orientation="vertical"
            spacing={20}
            style={{
              width: '500px',
              height: '300px'
            }}
          >
            <CarouselContent>
              <CarouselItem
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray-200'
                }}
              >
                Slide 3-1
              </CarouselItem>
              <CarouselItem
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray-200'
                }}
              >
                Slide 3-2
              </CarouselItem>
              <CarouselItem
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray-200'
                }}
              >
                Slide 3-3
              </CarouselItem>
            </CarouselContent>
            <CarouselDots />
          </Carousel>
        </CarouselItem>
        <CarouselItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray-100'
          }}
        >
          Slide 4
        </CarouselItem>
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const SwipeEffect: Story = {
  render: (args) => (
    <Carousel
      disableSwipeEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const BounceEffect: Story = {
  render: (args) => (
    <Carousel
      disableBounceEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
      {...args}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `rgb(${channel},${channel},${channel})`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  )
};

export const DotsAnimation: Story = {
  render: () => <DotsAnimationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DotsAnimationTemplate = () => {
  const SLIDES = 5;
  const DEFAULT_VALUE = 1;
  const DEFAULT_DOT_SIZE = 10;
  const EXTENDED_DOT_SIZE = 30;
  const carouselElRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLElement[]>([]);
  const [progress, setProgress] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    const carouselItems = carouselItemsRef.current;
    if (!carouselEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds, intersectionRatio, target } =
            entry;
          const targetIdx = carouselItems.findIndex((item) => item === target);
          if (rootBounds) {
            const { left: itemLeft, right: itemRight } = boundingClientRect;
            const { left: rootLeft } = rootBounds;
            const isCrossingLeft = itemLeft <= rootLeft && itemRight > rootLeft;
            if (isCrossingLeft) {
              setProgress(
                roundToDecimal({
                  value: targetIdx + 1 - intersectionRatio,
                  digits: 2
                })
              );
            }
          }
        });
      },
      {
        root: carouselEl,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    carouselItems.forEach((item) => {
      io.observe(item);
    });
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <Carousel
      ref={carouselElRef}
      defaultValue={DEFAULT_VALUE}
      disableBounceEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                ref={(element) => {
                  if (element) {
                    carouselItemsRef.current.push(element);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const diff = Math.abs(idx - progress);
            const dotWidth =
              diff > 1
                ? DEFAULT_DOT_SIZE
                : EXTENDED_DOT_SIZE -
                  (EXTENDED_DOT_SIZE - DEFAULT_DOT_SIZE) * diff;
            return (
              <CarouselDot
                key={idx}
                value={idx}
                style={{
                  width: \`\${dotWidth}px\`,
                  height: \`\${DEFAULT_DOT_SIZE}px\`,
                  aspectRatio: 'auto',
                  borderRadius: '8px'
                }}
              />
            );
          })}
      </CarouselDots>
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const CoverflowEffect: Story = {
  render: () => <CoverflowEffectTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CoverflowEffectTemplate = () => {
  const DEFAULT_VALUE = 1;
  const ROTATE_DEGREE_PER_PROGRESS = 45;
  const carouselElRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLElement[]>([]);
  const [progress, setProgress] = useState<number>(DEFAULT_VALUE);

  useEffect(() => {
    const carouselEl = carouselElRef.current;
    const carouselItems = carouselItemsRef.current;
    if (!carouselEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { boundingClientRect, rootBounds, intersectionRatio, target } =
            entry;
          const targetIdx = carouselItems.findIndex((item) => item === target);
          if (rootBounds) {
            const { left: itemLeft, right: itemRight } = boundingClientRect;
            const { left: rootLeft } = rootBounds;
            const isCrossingLeft = itemLeft <= rootLeft && itemRight > rootLeft;
            if (isCrossingLeft) {
              setProgress(
                roundToDecimal({
                  value: targetIdx + 1 - intersectionRatio - 0.5,
                  digits: 2
                })
              );
            }
          }
        });
      },
      {
        root: carouselEl,
        rootMargin: '0px 0px 0px -50%',
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    );
    carouselItems.forEach((item) => {
      io.observe(item);
    });
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <Carousel
      className="coverflow-effect"
      ref={carouselElRef}
      defaultValue={DEFAULT_VALUE}
      slideAlignment="center"
      style={{
        width: '600px',
        height: '300px'
      }}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const rotateDegree = Math.max(
              -90,
              Math.min(90, (progress - idx) * ROTATE_DEGREE_PER_PROGRESS)
            );
            return (
              <CarouselItem
                key={idx}
                ref={(element) => {
                  if (element) {
                    carouselItemsRef.current.push(element);
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'gray-200',
                  flex: '0 0 60%',
                  '--translate-z': \`-\${Math.abs(rotateDegree * 2)}px\`,
                  '--rotate-y': \`\${rotateDegree}deg\`,
                  '--shadow-rtl-opacity':
                    rotateDegree > 0 ? rotateDegree / 90 : 0,
                  '--shadow-ltr-opacity':
                    rotateDegree < 0 ? -rotateDegree / 90 : 0
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const StartOffsetSlides: Story = {
  render: () => <StartOffsetSlidesTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const StartOffsetSlidesTemplate = () => {
  const GAP = 20;
  const SLIDE_OFFSET = GAP + 30;
  const CAROUSEL_WIDTH = 800;
  const SLIDE_WIDTH = 200;
  const SLIDES = 10;
  const VIEWS = SLIDES - Math.floor(CAROUSEL_WIDTH / (SLIDE_WIDTH + GAP)) + 1;
  const [value, setValue] = useState(1);

  const handleChange = (newValue: number) => {
    setValue(Math.min(VIEWS - 1, newValue));
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={GAP}
      style={{
        width: \`\${CAROUSEL_WIDTH}px\`,
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => (
            <CarouselItem
              key={idx}
              style={{
                flex: '0 0 auto',
                width: \`\${SLIDE_WIDTH}px\`,
                ...(idx > 0 && {
                  marginLeft: \`-\${SLIDE_OFFSET}px\`,
                  paddingLeft: \`\${SLIDE_OFFSET}px\`
                })
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'gray-100'
                }}
              >
                Slide {idx + 1}
              </Box>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselFraction value={value + 1} count={VIEWS} />
      <CarouselPrevButton />
      <CarouselNextButton disabled={value === VIEWS - 1} />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const SequentiallyScaledDots: Story = {
  render: () => <SequentiallyScaledDotsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SequentiallyScaledDotsTemplate = () => {
  const SLIDES = 8;
  const SCALE_DIFF = 0.7;
  const [value, setValue] = useState(2);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      spacing={20}
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => (
            <CarouselItem
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray-100'
              }}
            >
              Slide {idx + 1}
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselDots max={5}>
        {Array(SLIDES)
          .fill(0)
          .map((_, idx) => {
            const isActiveDot = value === idx;
            const scale = isActiveDot ? 1 : SCALE_DIFF ** Math.abs(value - idx);
            return (
              <CarouselDot
                key={idx}
                value={idx}
                style={{
                  transition: 'transform 0.3s ease',
                  transform: \`scale(\${scale})\`
                }}
              />
            );
          })}
      </CarouselDots>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};

export const FadeEffect: Story = {
  render: () => <FadeEffectTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FadeEffectTemplate = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Carousel
      value={value}
      onChange={handleChange}
      disableSwipeEffect
      style={{
        width: '500px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent style={{ display: 'block' }}>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = 255 - 5 * (idx + 1);
            return (
              <CarouselItem
                key={idx}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: \`rgb(\${channel},\${channel},\${channel})\`,
                  opacity: idx <= value ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </Carousel>
  );
};`.trim()
      }
    }
  }
};
