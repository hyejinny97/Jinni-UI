// Transition 제거
import * as motionMock from '@/tests/mocks/motion.mock.tsx';

vi.mock('@/components/motion/Motion', () => ({
  __esModule: true,
  Motion: motionMock.Motion
}));

vi.mock('@/components/motion/AnimatePresence', () => ({
  __esModule: true,
  AnimatePresence: motionMock.AnimatePresence
}));

// Tour 테스트
import { useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/tests/react-testing-tools';
import { Tour, TourStep } from '.';

describe('<Tour />', () => {
  it('renders nothing when open is false', () => {
    const TourTemplate = () => {
      const step1Ref = useRef<HTMLElement>(null);
      const step2Ref = useRef<HTMLElement>(null);

      return (
        <>
          <button ref={step1Ref}>Step 1 Anchor</button>
          <button ref={step2Ref}>Step 2 Anchor</button>
          <Tour open={false} value="step 1">
            <TourStep anchorElRef={step1Ref} value="step 1">
              Step 1 Content
            </TourStep>
            <TourStep anchorElRef={step2Ref} value="step 2">
              Step 2 Content
            </TourStep>
          </Tour>
        </>
      );
    };

    render(<TourTemplate />);
    expect(screen.queryByText('Step 1 Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Step 2 Content')).not.toBeInTheDocument();
  });

  it('renders the active step when open is true', () => {
    const TourTemplate = () => {
      const step1Ref = useRef<HTMLElement>(null);
      const step2Ref = useRef<HTMLElement>(null);

      return (
        <>
          <button ref={step1Ref}>Step 1 Anchor</button>
          <button ref={step2Ref}>Step 2 Anchor</button>
          <Tour open={true} value="step 1">
            <TourStep anchorElRef={step1Ref} value="step 1">
              Step 1 Content
            </TourStep>
            <TourStep anchorElRef={step2Ref} value="step 2">
              Step 2 Content
            </TourStep>
          </Tour>
        </>
      );
    };

    render(<TourTemplate />);
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();
    expect(screen.queryByText('Step 2 Content')).not.toBeInTheDocument();
  });

  it('calls onClose with reason "backdropClick" when mask is clicked', () => {
    const onClose = vi.fn();
    const TourTemplate = () => {
      const step1Ref = useRef<HTMLElement>(null);

      return (
        <>
          <button ref={step1Ref}>Step 1 Anchor</button>
          <Tour open={true} value="step 1" onClose={onClose}>
            <TourStep anchorElRef={step1Ref} value="step 1">
              Step 1 Content
            </TourStep>
          </Tour>
        </>
      );
    };

    render(<TourTemplate />);
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();

    const masks = document.querySelectorAll('.JinniMask');
    expect(masks.length).toBeGreaterThan(0);
    fireEvent.click(masks[0]);

    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('backdropClick');
  });

  it('calls onClose with reason "escapeKeydown" when Escape key is pressed', () => {
    const onClose = vi.fn();
    const TourTemplate = () => {
      const step1Ref = useRef<HTMLElement>(null);

      return (
        <>
          <button ref={step1Ref}>Step 1 Anchor</button>
          <Tour open={true} value="step 1" onClose={onClose}>
            <TourStep anchorElRef={step1Ref} value="step 1">
              Step 1 Content
            </TourStep>
          </Tour>
        </>
      );
    };

    render(<TourTemplate />);
    expect(screen.getByText('Step 1 Content')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(onClose).toHaveBeenCalled();
    expect(onClose.mock.calls[0][1]).toBe('escapeKeydown');
  });
});
