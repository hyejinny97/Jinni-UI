import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  DragProvider,
  Drag,
  DragContainer,
  DragTrigger,
  DragIntersection
} from '.';
import { Button } from '@/components/general/Button';
import { Box } from '@/components/layout/Box';
import { StyleType } from '@/types/style';
import { Backdrop } from '@/components/feedback/Backdrop';

const meta: Meta<typeof Drag> = {
  component: Drag,
  argTypes: {
    children: {
      description: 'drag 되는 대상',
      table: {
        type: { summary: `React.ReactNode` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Drag>;

const YellowBox = ({
  children,
  style
}: {
  children?: React.ReactNode;
  style?: StyleType;
}) => (
  <Box
    style={{
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100px',
      height: '100px',
      backgroundColor: 'yellow',
      ...style
    }}
  >
    {children}
  </Box>
);

const SmallGreenBox = () => (
  <Box
    style={{
      width: '20px',
      height: '20px',
      backgroundColor: 'green',
      cursor: 'pointer'
    }}
  />
);

const Carousel = () => {
  const carouselContentRef = useRef<HTMLElement>(null);

  const handleIntersect = (entry: IntersectionObserverEntry) => {
    const { boundingClientRect, rootBounds, intersectionRatio } = entry;
    const carouselContent = carouselContentRef.current;
    let signedDestination: number | null = null;
    if (rootBounds && carouselContent) {
      const { left: targetLeft, right: targetRight } = boundingClientRect;
      const { left: rootLeft } = rootBounds;
      const { left: carouselContentLeft } =
        carouselContent.getBoundingClientRect();
      const isCrossingLeft = targetLeft <= rootLeft && targetRight >= rootLeft;
      if (isCrossingLeft) {
        if (intersectionRatio > 0.5) {
          signedDestination = carouselContentLeft - targetLeft;
        } else {
          signedDestination = carouselContentLeft - targetRight;
        }
      }
    }
    return { signedDestination };
  };

  return (
    <DragProvider>
      <DragContainer
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'gray-300',
          margin: '0 auto',
          overflow: 'hidden'
        }}
      >
        <Drag ref={carouselContentRef} style={{ display: 'inline-flex' }}>
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <DragIntersection key={idx} onIntersect={handleIntersect}>
                <YellowBox
                  style={{
                    border: '1px solid lightgrey',
                    boxSizing: 'border-box'
                  }}
                >
                  {idx + 1}
                </YellowBox>
              </DragIntersection>
            ))}
        </Drag>
      </DragContainer>
    </DragProvider>
  );
};

const LeftDrawer = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const handleIntersect = (entry: IntersectionObserverEntry) => {
    const { boundingClientRect, rootBounds, intersectionRatio } = entry;
    if (rootBounds) {
      const { left: targetLeft, right: targetRight } = boundingClientRect;
      const { left: rootLeft } = rootBounds;
      const isCrossingLeft = targetLeft <= rootLeft && targetRight >= rootLeft;
      if (isCrossingLeft) {
        if (intersectionRatio > 0.5) {
          return { signedDestination: 300 };
        } else {
          return { signedDestination: 0, onDestinationArrived: closeDrawer };
        }
      }
    }
    return { signedDestination: null };
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Backdrop open={open} onClick={closeDrawer} disableScroll>
        <DragProvider disableOverDragEffect>
          <DragContainer
            style={{
              position: 'absolute',
              top: 0,
              left: '-300px',
              width: '600px',
              height: '100vh'
            }}
          >
            <Drag
              style={{
                width: '300px',
                height: '100vh',
                transform: 'translateX(300px)'
              }}
            >
              <DragIntersection
                root="viewport"
                onIntersect={handleIntersect}
                style={{
                  padding: '16px',
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  elevation: 20,
                  backgroundColor: 'white',
                  userSelect: 'none'
                }}
              >
                Drawer content
              </DragIntersection>
            </Drag>
          </DragContainer>
        </DragProvider>
      </Backdrop>
    </>
  );
};

const BottomDrawer = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const handleIntersect = (entry: IntersectionObserverEntry) => {
    const { rootBounds, intersectionRatio } = entry;
    if (rootBounds) {
      const { height: rootHeight } = rootBounds;
      if (intersectionRatio < 0.2) {
        return {
          signedDestination: rootHeight,
          onDestinationArrived: closeDrawer
        };
      } else if (intersectionRatio < 0.8) {
        return { signedDestination: rootHeight / 2, acceleration: 0.1 };
      } else {
        return { signedDestination: 0, acceleration: 0.1 };
      }
    }
    return { signedDestination: null };
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Backdrop open={open} onClick={closeDrawer} disableScroll>
        <DragProvider direction="vertical" disableOverDragEffect>
          <DragContainer
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: `calc(100vh * 2)`
            }}
          >
            <Drag
              style={{
                width: '100vw',
                height: '100vh',
                transform: `translateY(calc(100vh / 2))`
              }}
            >
              <DragIntersection
                root="viewport"
                onIntersect={handleIntersect}
                style={{
                  padding: '16px',
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px 8px 0 0',
                  boxSizing: 'border-box',
                  elevation: 20,
                  backgroundColor: 'white',
                  userSelect: 'none'
                }}
              >
                댓글
              </DragIntersection>
            </Drag>
          </DragContainer>
        </DragProvider>
      </Backdrop>
    </>
  );
};

export const BasicDrag: Story = {
  render: () => (
    <DragProvider>
      <Drag>
        <YellowBox />
      </Drag>
    </DragProvider>
  )
};

export const Direction: Story = {
  render: () => (
    <DragProvider direction="vertical">
      <Drag>
        <YellowBox />
      </Drag>
    </DragProvider>
  )
};

export const TriggerElement: Story = {
  render: () => (
    <DragProvider>
      <Drag style={{ position: 'relative' }}>
        <YellowBox />
        <DragTrigger style={{ position: 'absolute', top: 0, right: 0 }}>
          <SmallGreenBox />
        </DragTrigger>
      </Drag>
    </DragProvider>
  )
};

export const LargeContainer: Story = {
  render: () => (
    <DragProvider>
      <DragContainer
        style={{
          width: '500px',
          height: '100px',
          backgroundColor: 'gray-300',
          margin: '0 auto'
        }}
      >
        <Drag>
          <YellowBox style={{ opacity: 0.5 }} />
        </Drag>
      </DragContainer>
    </DragProvider>
  )
};

export const SmallContainer: Story = {
  render: () => (
    <DragProvider>
      <DragContainer
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'gray-300',
          margin: '0 auto'
        }}
      >
        <Drag>
          <YellowBox style={{ opacity: 0.5, width: '400px' }} />
        </Drag>
      </DragContainer>
    </DragProvider>
  )
};

export const Slip: Story = {
  render: () => (
    <DragProvider slip>
      <DragContainer
        style={{
          width: '500px',
          height: '100px',
          backgroundColor: 'gray-300',
          margin: '0 auto'
        }}
      >
        <Drag>
          <YellowBox style={{ opacity: 0.5 }} />
        </Drag>
      </DragContainer>
    </DragProvider>
  )
};

export const SlipSize: Story = {
  render: () => (
    <>
      {(['small', 'medium', 'large'] as const).map((slipSize, idx) => (
        <DragProvider key={slipSize} slipSize={slipSize}>
          <h6>{`${idx + 1}. slip size: ${slipSize}`}</h6>
          <DragContainer
            style={{
              width: '500px',
              height: '100px',
              backgroundColor: 'gray-300',
              margin: '0 auto'
            }}
          >
            <Drag>
              <YellowBox style={{ opacity: 0.5 }} />
            </Drag>
          </DragContainer>
        </DragProvider>
      ))}
    </>
  )
};

export const DisableOverDragEffect: Story = {
  render: () => (
    <DragProvider disableOverDragEffect>
      <DragContainer
        style={{
          width: '500px',
          height: '100px',
          backgroundColor: 'gray-300',
          margin: '0 auto'
        }}
      >
        <Drag>
          <YellowBox style={{ opacity: 0.5 }} />
        </Drag>
      </DragContainer>
    </DragProvider>
  )
};

export const ThresholdCarousel: Story = {
  render: () => <Carousel />
};

export const ThresholdLeftDrawer: Story = {
  render: () => <LeftDrawer />
};

export const ThresholdBottomDrawer: Story = {
  render: () => <BottomDrawer />
};

export const DisableDrag: Story = {
  render: () => (
    <DragProvider disabled>
      <Drag>
        <YellowBox />
      </Drag>
    </DragProvider>
  )
};
