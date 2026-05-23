import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  InfiniteCarousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselFraction,
  CarouselPrevButton,
  CarouselNextButton,
  CarouselProgress
} from '.';
import useJinni from '@/hooks/useJinni';
import { SECOND } from '@/constants/time';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof InfiniteCarousel> = {
  component: InfiniteCarousel
};

export default meta;
type Story = StoryObj<typeof InfiniteCarousel>;

const BasicInfiniteCarouselTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  );
};

const DefaultValueTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      defaultValue={2}
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  );
};

const NavigationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </InfiniteCarousel>
  );
};

const DotsPaginationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </InfiniteCarousel>
  );
};

const FractionPaginationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction />
    </InfiniteCarousel>
  );
};

const ProgressTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress />
    </InfiniteCarousel>
  );
};

const OrientationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      orientation="vertical"
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
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
    </InfiniteCarousel>
  );
};

const AutoplayTemplate = () => {
  const { theme } = useJinni();
  const AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <InfiniteCarousel
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
              const channel = theme === 'light' ? 0 : 255;
              const alpha = (5 * idx) / 100;
              const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'surface-container',
                    backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                    color: 'on-surface'
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </InfiniteCarousel>
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
            color: 'on-surface-variant'
          }}
        >{`${autoplayLeftTime / SECOND}s`}</Text>
      </Box>
    </div>
  );
};

const SpacingTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      spacing={20}
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  );
};

const SlidePerViewTemplate = () => {
  const { theme } = useJinni();
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface',
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
    </InfiniteCarousel>
  );
};

const SlideAlignmentTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      slideAlignment="center"
      spacing={20}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = `rgba(${channel},${channel},${channel},${alpha})`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
                  color: 'on-surface',
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
    </InfiniteCarousel>
  );
};

export const BasicInfiniteCarousel: Story = {
  render: () => <BasicInfiniteCarouselTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicInfiniteCarouselTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  )
}`.trim()
      }
    }
  }
};

export const DefaultValue: Story = {
  render: () => <DefaultValueTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DefaultValueTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      defaultValue={2}
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const Navigation: Story = {
  render: () => <NavigationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const NavigationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const DotsPagination: Story = {
  render: () => <DotsPaginationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DotsPaginationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselDots />
    </InfiniteCarousel>
  );
};
`.trim()
      }
    }
  }
};

export const FractionPagination: Story = {
  render: () => <FractionPaginationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const FractionPaginationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselFraction />
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const Progress: Story = {
  render: () => <ProgressTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ProgressTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselProgress />
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const Orientation: Story = {
  render: () => <OrientationTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OrientationTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      orientation="vertical"
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
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
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const Autoplay: Story = {
  render: () => <AutoplayTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AutoplayTemplate = () => {
  const { theme } = useJinni();
  const AUTOPLAY_DURATION = 5 * SECOND;
  const [autoplayLeftTime, setAutoplayLeftTime] = useState(AUTOPLAY_DURATION);
  const autoplayProgressPercent =
    ((AUTOPLAY_DURATION - autoplayLeftTime) / AUTOPLAY_DURATION) * 100;

  const handleAutoplayLeftTimeChange = (newTimeLeft: number) => {
    setAutoplayLeftTime(newTimeLeft);
  };

  return (
    <div style={{ position: 'relative' }}>
      <InfiniteCarousel
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
              const channel = theme === 'light' ? 0 : 255;
              const alpha = (5 * idx) / 100;
              const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
              return (
                <CarouselItem
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'surface-container',
                    backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                    color: 'on-surface'
                  }}
                >
                  Slide {idx + 1}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselDots />
      </InfiniteCarousel>
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
            color: 'on-surface-variant'
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
  render: () => <SpacingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SpacingTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      spacing={20}
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const SlidePerView: Story = {
  render: () => <SlidePerViewTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlidePerViewTemplate = () => {
  const { theme } = useJinni();
  const GAP = 10;
  const SLIDES_PER_VIEW = 3;
  const SLIDES = 5;

  return (
    <InfiniteCarousel
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
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface',
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
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const SlideAlignment: Story = {
  render: () => <SlideAlignmentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SlideAlignmentTemplate = () => {
  const { theme } = useJinni();

  return (
    <InfiniteCarousel
      slideAlignment="center"
      spacing={20}
      style={{
        width: '600px',
        height: '300px',
        border: '1px solid lightgray'
      }}
    >
      <CarouselContent>
        {Array(5)
          .fill(0)
          .map((_, idx) => {
            const channel = theme === 'light' ? 0 : 255;
            const alpha = (5 * idx) / 100;
            const overlayColor = \`rgba(\${channel},\${channel},\${channel},\${alpha})\`;
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container',
                  backgroundImage: \`linear-gradient(to bottom, \${overlayColor}, \${overlayColor})\`,
                  color: 'on-surface',
                  flex: '0 0 auto',
                  width: \`\${100 * (idx + 1)}px\`
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
    </InfiniteCarousel>
  );
};`.trim()
      }
    }
  }
};

export const SnapFree: Story = {
  render: () => (
    <InfiniteCarousel
      snapMode="free"
      slipSize="large"
      spacing={10}
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
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
  snapMode="free"
  slipSize="large"
  spacing={10}
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
        return (
          <CarouselItem
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'surface-container'
            }}
          >
            Slide {idx + 1}
          </CarouselItem>
        );
      })}
  </CarouselContent>
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const SwipeEffect: Story = {
  render: () => (
    <InfiniteCarousel
      disableSwipeEffect
      spacing={10}
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
            return (
              <CarouselItem
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'surface-container'
                }}
              >
                Slide {idx + 1}
              </CarouselItem>
            );
          })}
      </CarouselContent>
      <CarouselPrevButton />
      <CarouselNextButton />
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
  disableSwipeEffect
  spacing={10}
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
        return (
          <CarouselItem
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'surface-container'
            }}
          >
            Slide {idx + 1}
          </CarouselItem>
        );
      })}
  </CarouselContent>
  <CarouselPrevButton />
  <CarouselNextButton />
</InfiniteCarousel>`.trim()
      }
    }
  }
};
