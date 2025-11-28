import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Backdrop from './Backdrop';
import { CircularProgress } from '@/components/feedback/CircularProgress';
import { Button } from '@/components/general/Button';
import {
  JinniProvider,
  DEFAULT_DESIGN_SYSTEM
} from '@/components/_share/JinniProvider';
import { Switch } from '@/components/data-entry/Switch';
import { Label } from '@/components/data-entry/Label';
import { Stack } from '@/components/layout/Stack';

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
          <CircularProgress progressColor="primary-container" />
        </Backdrop>
      )}
    </>
  );
};

const BackdropColorByThemeTemplate = () => {
  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);
  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(e.target.checked);
  };

  return (
    <JinniProvider
      designSystem={{
        ...DEFAULT_DESIGN_SYSTEM,
        theme: darkTheme ? 'dark' : 'light'
      }}
    >
      <Stack spacing={20}>
        <Label content="Dark Theme">
          <Switch checked={darkTheme} onChange={changeTheme} />
        </Label>
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
            <CircularProgress progressColor="primary-container" />
          </Backdrop>
        )}
      </Stack>
    </JinniProvider>
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
          <CircularProgress progressColor="primary-container" />
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
          <CircularProgress progressColor="primary-container" />
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
          <CircularProgress progressColor="primary-container" />
        </Backdrop>
      )}
    </>
  );
};`.trim()
      }
    }
  }
};

export const BackdropColorByTheme: Story = {
  render: () => <BackdropColorByThemeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BackdropColorByThemeTemplate = () => {
  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const openBackdrop = () => setOpen(true);
  const closeBackdrop = () => setOpen(false);
  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(e.target.checked);
  };

  return (
    <JinniProvider
      designSystem={{
        ...DEFAULT_DESIGN_SYSTEM,
        theme: darkTheme ? 'dark' : 'light'
      }}
    >
      <Stack spacing={20}>
        <Label content="Dark Theme">
          <Switch checked={darkTheme} onChange={changeTheme} />
        </Label>
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
            <CircularProgress progressColor="primary-container" />
          </Backdrop>
        )}
      </Stack>
    </JinniProvider>
  );
};
`.trim()
      }
    }
  }
};
