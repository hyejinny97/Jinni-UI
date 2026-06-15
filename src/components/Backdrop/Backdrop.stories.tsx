import { useState, forwardRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Backdrop from './Backdrop';
import CircularProgress from '@/components/CircularProgress';
import { Button } from '@/components/general/Button';
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';

const meta: Meta<typeof Backdrop> = {
  component: Backdrop,
  argTypes: {
    children: {
      description: 'backdrop 위에 위치할 콘텐츠'
    },
    disableScroll: {
      description: 'true이면, 화면이 스크롤 되지 않음'
    },
    invisible: {
      description: 'true인 경우, 투명한 backdrop이 나타남'
    },
    onClick: {
      description: 'backdrop을 클릭했을 때 호출되는 함수',
      table: {
        type: { summary: '(e: React.MouseEvent) => void' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

const BasicBackdropTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && <Backdrop onClick={closeBackdrop} />}
    </>
  );
};

const BackdropWithContentsTemplate = ({ ...rest }) => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && (
        <Backdrop
          onClick={closeBackdrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          {...rest}
        >
          <CircularProgress progressColor="primary" />
        </Backdrop>
      )}
    </>
  );
};

const Fade = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      />
    );
  }
);

const TransitionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      <AnimatePresence>
        {open && (
          <Backdrop
            as={Fade}
            onClick={closeBackdrop}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress progressColor="primary" />
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};

export const BasicBackdrop: Story = {
  render: () => <BasicBackdropTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicBackdropTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && <Backdrop onClick={closeBackdrop} />}
    </>
  );
};`.trim()
      }
    }
  }
};

export const BackdropWithContents: Story = {
  render: () => <BackdropWithContentsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BackdropWithContentsTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && (
        <Backdrop
          onClick={closeBackdrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress progressColor="primary" />
        </Backdrop>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const Invisible: Story = {
  render: () => <BackdropWithContentsTemplate invisible />,
  parameters: {
    docs: {
      source: {
        code: `const InvisibleTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && (
        <Backdrop
          invisible
          onClick={closeBackdrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress progressColor="primary" />
        </Backdrop>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const DisableScroll: Story = {
  render: () => <BackdropWithContentsTemplate disableScroll />,
  parameters: {
    docs: {
      source: {
        code: `const DisableScrollTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      {open && (
        <Backdrop
          disableScroll
          onClick={closeBackdrop}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress progressColor="primary" />
        </Backdrop>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const Transition: Story = {
  render: () => <TransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `
import { motion, HTMLMotionProps, AnimatePresence } from 'motion/react';
        
const Fade = forwardRef(
  (props: HTMLMotionProps<'div'>, ref: React.Ref<HTMLDivElement>) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      />
    );
  }
);

const TransitionTemplate = () => {
  const [open, setOpen] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);

  return (
    <>
      <Button onClick={openBackdrop}>Open Backdrop</Button>
      <AnimatePresence>
        {open && (
          <Backdrop
            as={Fade}
            onClick={closeBackdrop}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress progressColor="primary" />
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
};        
`.trim()
      }
    }
  }
};
