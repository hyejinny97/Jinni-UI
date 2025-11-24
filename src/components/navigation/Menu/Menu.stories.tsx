import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import Menu from './Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { Button } from '@/components/general/Button';
import { Divider } from '@/components/layout/Divider';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { CartIcon } from '@/components/icons/CartIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ListItem } from '@/components/data-display/List';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Motion } from '@/components/motion/Motion';

const meta: Meta<typeof Menu> = {
  component: Menu,
  argTypes: {
    anchorElRef: {
      description: 'anchor 요소 참조 객체',
      table: {
        type: {
          summary: 'React.RefObject<HTMLElement>'
        }
      }
    },
    anchorOrigin: {
      description: 'menu의 origin이 부착될 anchorEl의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number, vertical: 'top' | 'bottom' | 'center' | number }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'bottom' }` }
      }
    },
    anchorPosition: {
      description: 'client area에서 메뉴의 상대적인 위치',
      table: {
        type: {
          summary: `{ left: number, top: number }`
        }
      }
    },
    anchorReference: {
      description: '메뉴의 위치를 설정할 때, 어떤 anchor prop을 참조할지 결정',
      table: {
        type: { summary: `'anchorEl' | 'anchorPosition'` },
        defaultValue: { summary: `'anchorEl'` }
      }
    },
    children: {
      description: 'MenuList 컴포넌트 안에 담을 요소 (MenuItem, Divider 등)',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    disableScroll: {
      description: 'true이면, 화면이 스크롤 되지 않음',
      table: {
        type: { summary: 'boolean' }
      }
    },
    MenuListProps: {
      description: 'MenuList 컴포넌트에 적용되는 props',
      table: {
        type: { summary: 'MenuListProps' }
      }
    },
    menuOrigin: {
      description: 'anchor의 origin에 부착할 menu의 origin',
      table: {
        type: {
          summary: `{ horizontal: 'left' | 'right' | 'center' | number, vertical: 'top' | 'bottom' | 'center' | number }`
        },
        defaultValue: { summary: `{ horizontal: 'left', vertical: 'top' }` }
      }
    },
    onClose: {
      description: `Escape 키/Tab 키/backdrop 클릭 이벤트가 발생 시 호출되는 함수`,
      table: {
        type: {
          summary: `(event: MouseEvent | KeyboardEvent, reason: 'escapeKeyDown' |  'backdropClick' | 'tabKeyDown') => void`
        }
      }
    },
    open: {
      description: 'true이면, 메뉴가 나타남',
      table: {
        type: { summary: 'boolean' }
      }
    },
    TransitionComponent: {
      description: `transition 컴포넌트`,
      table: {
        type: { summary: `React.ReactNode` },
        defaultValue: { summary: `ScaleFade` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Menu>;

const BasicMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const IconMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <CartIcon size={15} color="gray-700" />
          Cart
        </MenuItem>
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <MailIcon size={15} color="gray-700" />
          Mail
        </MenuItem>
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <PersonIcon size={15} color="gray-700" />
          Profile
        </MenuItem>
      </Menu>
    </>
  );
};

const DenseMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ dense: true }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const SelectedMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(1);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const selectMenuItem = (idx: number) => () => {
    setSelectedIdx(idx);
    closeMenu();
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        {`Selected Item: Item ${selectedIdx + 1}`}
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={selectMenuItem(0)} disabled>
          Item 1
        </MenuItem>
        <MenuItem onClick={selectMenuItem(1)} selected={selectedIdx === 1}>
          Item 2
        </MenuItem>
        <MenuItem onClick={selectMenuItem(2)} selected={selectedIdx === 2}>
          Item 3
        </MenuItem>
      </Menu>
    </>
  );
};

const GroupMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <ListItem
          style={{
            fontWeight: 'var(--jinni-font-weight-bold)',
            fontSize: '14px',
            color: 'gray-600'
          }}
        >
          Category 1
        </ListItem>
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
        <Divider />
        <ListItem
          style={{
            fontWeight: 'var(--jinni-font-weight-bold)',
            fontSize: '14px',
            color: 'gray-600'
          }}
        >
          Category 2
        </ListItem>
        <MenuItem onClick={closeMenu}>Item 4</MenuItem>
        <MenuItem onClick={closeMenu}>Item 5</MenuItem>
        <MenuItem onClick={closeMenu}>Item 6</MenuItem>
      </Menu>
    </>
  );
};

const LinkMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem href="#" onClick={closeMenu}>
          Item 1
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          Item 2
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          Item 3
        </MenuItem>
      </Menu>
    </>
  );
};

const OptionMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const selectOption = (idx: number) => () => {
    setSelectedOptions((prev) =>
      prev.includes(idx)
        ? prev.filter((option) => option !== idx)
        : [...prev, idx]
    );
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(0)}
          onClick={selectOption(0)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(0) && <CheckIcon size={15} />}
          </span>
          Option 1
        </MenuItem>
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(1)}
          onClick={selectOption(1)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(1) && <CheckIcon size={15} />}
          </span>
          Option 2
        </MenuItem>
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(2)}
          onClick={selectOption(2)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(2) && <CheckIcon size={15} />}
          </span>
          Option 3
        </MenuItem>
      </Menu>
    </>
  );
};

const MenuOriginTemplate = () => {
  const MENU_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {MENU_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="basic-menu"
        >
          Open Menu
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        menuOrigin={{
          horizontal: MENU_ORIGIN[checkedValue].horizontal,
          vertical: MENU_ORIGIN[checkedValue].vertical
        }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const AnchorOriginTemplate = () => {
  const ANCHOR_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {ANCHOR_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="basic-menu"
        >
          Open Menu
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          horizontal: ANCHOR_ORIGIN[checkedValue].horizontal,
          vertical: ANCHOR_ORIGIN[checkedValue].vertical
        }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const AnchorPositionTemplate = () => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openMenu();
  };

  return (
    <>
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </p>
      <Menu
        id="basic-menu"
        open={open}
        onClose={closeMenu}
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const DisableScrollTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        disableScroll
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

const CustomizeMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ style: { maxHeight: '90px', overflowY: 'scroll' } }}
        style={{ marginTop: '5px' }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
        <MenuItem onClick={closeMenu}>Item 4</MenuItem>
        <MenuItem onClick={closeMenu}>Item 5</MenuItem>
      </Menu>
    </>
  );
};

const Scale = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0)' }}
      transition={{
        enter:
          'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-decelerate)',
        exit: 'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-accelerate)'
      }}
    >
      {children}
    </Motion>
  );
};

const CustomizeTransitionTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        TransitionComponent={Scale}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};

export const BasicMenu: Story = {
  render: () => <BasicMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const IconMenu: Story = {
  render: () => <IconMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const IconMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <CartIcon size={15} color="gray-700" />
          Cart
        </MenuItem>
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <MailIcon size={15} color="gray-700" />
          Mail
        </MenuItem>
        <MenuItem style={{ gap: '10px' }} onClick={closeMenu}>
          <PersonIcon size={15} color="gray-700" />
          Profile
        </MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const DenseMenu: Story = {
  render: () => <DenseMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DenseMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ dense: true }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const SelectedMenu: Story = {
  render: () => <SelectedMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SelectedMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(1);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const selectMenuItem = (idx: number) => () => {
    setSelectedIdx(idx);
    closeMenu();
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        {\`Selected Item: Item \${selectedIdx + 1}\`}
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem onClick={selectMenuItem(0)} disabled>
          Item 1
        </MenuItem>
        <MenuItem onClick={selectMenuItem(1)} selected={selectedIdx === 1}>
          Item 2
        </MenuItem>
        <MenuItem onClick={selectMenuItem(2)} selected={selectedIdx === 2}>
          Item 3
        </MenuItem>
      </Menu>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const GroupMenu: Story = {
  render: () => <GroupMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const GroupMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <ListItem
          style={{
            fontWeight: 'var(--jinni-font-weight-bold)',
            fontSize: '14px',
            color: 'gray-600'
          }}
        >
          Category 1
        </ListItem>
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
        <Divider />
        <ListItem
          style={{
            fontWeight: 'var(--jinni-font-weight-bold)',
            fontSize: '14px',
            color: 'gray-600'
          }}
        >
          Category 2
        </ListItem>
        <MenuItem onClick={closeMenu}>Item 4</MenuItem>
        <MenuItem onClick={closeMenu}>Item 5</MenuItem>
        <MenuItem onClick={closeMenu}>Item 6</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const LinkMenu: Story = {
  render: () => <LinkMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LinkMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem href="#" onClick={closeMenu}>
          Item 1
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          Item 2
        </MenuItem>
        <MenuItem href="#" onClick={closeMenu}>
          Item 3
        </MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const OptionMenu: Story = {
  render: () => <OptionMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const OptionMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const selectOption = (idx: number) => () => {
    setSelectedOptions((prev) =>
      prev.includes(idx)
        ? prev.filter((option) => option !== idx)
        : [...prev, idx]
    );
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
      >
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(0)}
          onClick={selectOption(0)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(0) && <CheckIcon size={15} />}
          </span>
          Option 1
        </MenuItem>
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(1)}
          onClick={selectOption(1)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(1) && <CheckIcon size={15} />}
          </span>
          Option 2
        </MenuItem>
        <MenuItem
          role="menuitemcheckbox"
          aria-checked={selectedOptions.includes(2)}
          onClick={selectOption(2)}
          style={{ columnGap: '5px' }}
        >
          <span style={{ display: 'inline-flex', minWidth: '15px' }}>
            {selectedOptions.includes(2) && <CheckIcon size={15} />}
          </span>
          Option 3
        </MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const MenuOrigin: Story = {
  render: () => <MenuOriginTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MenuOriginTemplate = () => {
  const MENU_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {MENU_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="basic-menu"
        >
          Open Menu
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        menuOrigin={{
          horizontal: MENU_ORIGIN[checkedValue].horizontal,
          vertical: MENU_ORIGIN[checkedValue].vertical
        }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const AnchorOrigin: Story = {
  render: () => <AnchorOriginTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AnchorOriginTemplate = () => {
  const ANCHOR_ORIGIN = [
    { label: 'H left / V top', horizontal: 'left', vertical: 'top' },
    { label: 'H left / V center', horizontal: 'left', vertical: 'center' },
    { label: 'H left / V bottom', horizontal: 'left', vertical: 'bottom' },
    { label: 'H center / V top', horizontal: 'center', vertical: 'top' },
    { label: 'H center / V center', horizontal: 'center', vertical: 'center' },
    { label: 'H center / V bottom', horizontal: 'center', vertical: 'bottom' },
    { label: 'H right / V top', horizontal: 'right', vertical: 'top' },
    { label: 'H right / V center', horizontal: 'right', vertical: 'center' },
    { label: 'H right / V bottom', horizontal: 'right', vertical: 'bottom' },
    { label: 'H 0 / V 20', horizontal: 0, vertical: 20 }
  ] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [checkedValue, setCheckedValue] = useState<number>(0);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const check = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={20} style={{ alignItems: 'center' }}>
        <Grid columns={3} columnSpacing={20}>
          {ANCHOR_ORIGIN.map((origin, idx) => (
            <Label key={origin.label} content={origin.label}>
              <Radio
                checked={checkedValue === idx}
                value={idx}
                onChange={check}
              />
            </Label>
          ))}
        </Grid>
        <Button
          ref={anchorElRef}
          onClick={openMenu}
          aria-haspopup={true}
          aria-expanded={open}
          aria-controls="basic-menu"
        >
          Open Menu
        </Button>
      </Stack>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          horizontal: ANCHOR_ORIGIN[checkedValue].horizontal,
          vertical: ANCHOR_ORIGIN[checkedValue].vertical
        }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const AnchorPosition: Story = {
  render: () => <AnchorPositionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AnchorPositionTemplate = () => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openMenu();
  };

  return (
    <>
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum
        purus, bibendum sit amet vulputate eget, porta semper ligula. Donec
        bibendum vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed
        dolor porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam
        quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci,
        quis finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus
        finibus ex, sit amet facilisis neque enim sed neque. Quisque accumsan
        metus vel maximus consequat. Suspendisse lacinia tellus a libero
        volutpat maximus.
      </p>
      <Menu
        id="basic-menu"
        open={open}
        onClose={closeMenu}
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const DisableScroll: Story = {
  render: () => <DisableScrollTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DisableScrollTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        disableScroll
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeMenu: Story = {
  render: () => <CustomizeMenuTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeMenuTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        MenuListProps={{ style: { maxHeight: '90px', overflowY: 'scroll' } }}
        style={{ marginTop: '5px' }}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
        <MenuItem onClick={closeMenu}>Item 4</MenuItem>
        <MenuItem onClick={closeMenu}>Item 5</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeTransition: Story = {
  render: () => <CustomizeTransitionTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const Scale = ({ children }: { children: React.ReactNode }) => {
  return (
    <Motion
      initial={{ transform: 'scale(0)' }}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0)' }}
      transition={{
        enter:
          'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-decelerate)',
        exit: 'transform var(--jinni-duration-short4) var(--jinni-easing-emphasized-accelerate)'
      }}
    >
      {children}
    </Motion>
  );
};

const CustomizeTransitionTemplate = () => {
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={anchorElRef}
        onClick={openMenu}
        aria-haspopup={true}
        aria-expanded={open}
        aria-controls="basic-menu"
      >
        Open Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeMenu}
        TransitionComponent={Scale}
      >
        <MenuItem onClick={closeMenu}>Item 1</MenuItem>
        <MenuItem onClick={closeMenu}>Item 2</MenuItem>
        <MenuItem onClick={closeMenu}>Item 3</MenuItem>
      </Menu>
    </>
  );
};`.trim()
      }
    }
  }
};
