import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import Menu, { MenuProps } from './Menu';
import { MenuItem } from '@/components/navigation/MenuItem';
import { Button } from '@/components/general/Button';
import { Divider } from '@/components/layout/Divider';
import { Stack } from '@/components/layout/Stack';
import { CartIcon } from '@/components/icons/CartIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';

const meta: Meta<typeof Menu> = {
  component: Menu,
  argTypes: {
    anchorEl: {
      description: 'anchor가 되는 HTML element로, 메뉴의 위치를 결정해줌',
      table: {
        type: {
          summary: 'HTML element'
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
        type: { summary: 'anchorEl | anchorPosition' },
        defaultValue: { summary: 'anchorEl' }
      }
    },
    children: {
      description: '메뉴 콘텐츠(MenuItem, Divider 등)'
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
    onClick: {
      description: 'Menu를 클릭하거나 Enter 키를 누를 때 호출되는 함수'
    },
    onClose: {
      description: `'escapeKeydown', 'backdropClick', 'tabKeyDown' 이벤트 발생 시 호출되는 함수`
    },
    open: {
      description: 'true이면, 메뉴가 나타남'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Menu>;

const iconMenuItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '10px'
};

const MenuAnchorElTemplate = ({
  buttonContent,
  children,
  ...menuProps
}: {
  buttonContent?: string;
  children: Array<JSX.Element>;
  menuProps?: MenuProps;
}) => {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button ref={anchorRef} onClick={handleButtonClick}>
        {buttonContent || 'Open Menu'}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        {...menuProps}
      >
        {children}
      </Menu>
    </>
  );
};

const SelectedMenuTemplate = ({ ...args }) => {
  const [selectedIdx, setSelectedIdx] = useState(1);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
  };

  return (
    <MenuAnchorElTemplate
      buttonContent={`Selected Item: Item ${selectedIdx + 1}`}
      {...args}
    >
      <MenuItem onClick={() => handleSelect(0)} disabled>
        Item 1
      </MenuItem>
      <MenuItem onClick={() => handleSelect(1)} selected={selectedIdx === 1}>
        Item 2
      </MenuItem>
      <MenuItem onClick={() => handleSelect(2)} selected={selectedIdx === 2}>
        Item 3
      </MenuItem>
    </MenuAnchorElTemplate>
  );
};

const OptionMenuTemplate = ({ ...args }) => {
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  const handleButtonClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
  };

  return (
    <>
      <Button ref={anchorRef} onClick={handleButtonClick}>
        Open Menu
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        {...args}
      >
        <MenuItem
          onClick={() => handleSelectOption(0)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px'
          }}
        >
          <span style={{ minWidth: '15px' }}>
            {selectedOption === 0 && <CheckIcon size={15} />}
          </span>
          Item 1
        </MenuItem>
        <MenuItem
          onClick={() => handleSelectOption(1)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px'
          }}
        >
          <span style={{ minWidth: '15px' }}>
            {selectedOption === 1 && <CheckIcon size={15} />}
          </span>
          Item 2
        </MenuItem>
        <MenuItem
          onClick={() => handleSelectOption(2)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: '10px'
          }}
        >
          <span style={{ minWidth: '15px' }}>
            {selectedOption === 2 && <CheckIcon size={15} />}
          </span>
          Item 3
        </MenuItem>
      </Menu>
    </>
  );
};

const MenuAnchorPositionTemplate = ({ ...args }) => {
  const [open, setOpen] = useState(false);
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setOpen(true);
    setCoordinate(newCoordinate);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <p onContextMenu={handleContextMenu}>
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
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        {...args}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </Menu>
    </>
  );
};

export const BasicMenu: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <Divider style={{ margin: '5px 0' }} />
        <MenuItem>Item 3</MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};

export const IconMenu: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate {...args}>
        <MenuItem style={iconMenuItemStyle}>
          <CartIcon size={15} />
          Item 1
        </MenuItem>
        <MenuItem style={iconMenuItemStyle}>
          <MailIcon size={15} />
          Item 2
        </MenuItem>
        <MenuItem style={iconMenuItemStyle}>
          <PersonIcon size={15} />
          Item 3
        </MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};

export const DenseMenu: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate MenuListProps={{ dense: true }} {...args}>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};

export const SelectedMenu: Story = {
  render: (args) => SelectedMenuTemplate(args)
};

export const GroupMenu: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate {...args}>
        <MenuItem
          disabled
          style={{
            color: 'primary',
            fontWeight: '700'
          }}
        >
          Group Name
        </MenuItem>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};

export const LinkMenu: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate {...args}>
        <MenuItem href="https://www.naver.com">Item 1</MenuItem>
        <MenuItem href="#">Item 2</MenuItem>
        <MenuItem href="#">Item 3</MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};

export const OptionMenu: Story = {
  render: (args) => OptionMenuTemplate(args)
};

export const MenuOrigin: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'left', vertical: 'top' }}
            buttonContent="H left / V top (Default)"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'left', vertical: 'center' }}
            buttonContent="H left / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            buttonContent="H left / V bottom"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'center', vertical: 'top' }}
            buttonContent="H center / V top"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'center', vertical: 'center' }}
            buttonContent="H center / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            buttonContent="H center / V bottom"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'right', vertical: 'top' }}
            buttonContent="H right / V top"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'right', vertical: 'center' }}
            buttonContent="H right / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            buttonContent="H right / V bottom"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 0, vertical: 20 }}
            buttonContent="H 0 / V 20"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            menuOrigin={{ horizontal: 50, vertical: 0 }}
            buttonContent="H 50 / V 0"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
      </Stack>
    );
  }
};

export const AnchorOrigin: Story = {
  render: (args) => {
    return (
      <Stack spacing={30}>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            buttonContent="H left / V top"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
            buttonContent="H left / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            buttonContent="H left / V bottom (Default)"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            buttonContent="H center / V top"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
            buttonContent="H center / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            buttonContent="H center / V bottom"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            buttonContent="H right / V top"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
            buttonContent="H right / V center"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            buttonContent="H right / V bottom"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
        <Stack direction="row" spacing={20}>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 0, vertical: 20 }}
            buttonContent="H 0 / V 20"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
          <MenuAnchorElTemplate
            anchorOrigin={{ horizontal: 50, vertical: 0 }}
            buttonContent="H 50 / V 0"
            {...args}
          >
            <MenuItem>Item 1</MenuItem>
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </MenuAnchorElTemplate>
        </Stack>
      </Stack>
    );
  }
};

export const AnchorPosition: Story = {
  render: (args) => MenuAnchorPositionTemplate(args)
};

export const Customization: Story = {
  render: (args) => {
    return (
      <MenuAnchorElTemplate
        MenuListProps={{ style: { maxHeight: '90px', overflowY: 'scroll' } }}
        {...args}
      >
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
      </MenuAnchorElTemplate>
    );
  }
};
