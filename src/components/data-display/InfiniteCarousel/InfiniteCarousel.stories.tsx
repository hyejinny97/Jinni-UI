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
import { SECOND } from '@/constants/time';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof InfiniteCarousel> = {
  component: InfiniteCarousel
};

export default meta;
type Story = StoryObj<typeof InfiniteCarousel>;

const AutoplayTemplate = () => {
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
            color: 'gray-500'
          }}
        >{`${autoplayLeftTime / SECOND}s`}</Text>
      </Box>
    </div>
  );
};

const SlidePerViewTemplate = () => {
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
    </InfiniteCarousel>
  );
};

const SlideAlignmentTemplate = () => {
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
    </InfiniteCarousel>
  );
};

export const BasicInfiniteCarousel: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `
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
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const DefaultValue: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const Navigation: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
  <CarouselPrevButton />
  <CarouselNextButton />
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const DotsPagination: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const FractionPagination: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
  <CarouselFraction />
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const Progress: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
  <CarouselProgress />
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const Orientation: Story = {
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
  <CarouselProgress />
  <CarouselDots />
  <CarouselPrevButton />
  <CarouselNextButton />
</InfiniteCarousel>`.trim()
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
  render: () => (
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
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
</InfiniteCarousel>`.trim()
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
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
  snapMode="free"
  slipSize="large"
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
</InfiniteCarousel>`.trim()
      }
    }
  }
};

export const SwipeEffect: Story = {
  render: () => (
    <InfiniteCarousel
      disableSwipeEffect
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
      <CarouselPrevButton />
      <CarouselNextButton />
    </InfiniteCarousel>
  ),
  parameters: {
    docs: {
      source: {
        code: `<InfiniteCarousel
  disableSwipeEffect
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
  <CarouselPrevButton />
  <CarouselNextButton />
</InfiniteCarousel>`.trim()
      }
    }
  }
};
