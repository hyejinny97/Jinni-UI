import { Fragment, useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from '.';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { PersonIcon } from '@/components/icons/PersonIcon';
import { MailIcon } from '@/components/icons/MailIcon';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { BurgerIcon } from '@/components/icons/BurgerIcon';
import { Stack } from '@/components/layout/Stack';
import { Box, BoxProps } from '@/components/layout/Box';
import { Iframe } from '@/components/_share/Iframe';
import { List, ListItem, ListItemButton } from '@/components/data-display/List';
import { Divider } from '@/components/layout/Divider';
import { AsType } from '@/types/default-component-props';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  argTypes: {
    anchorOrigin: {
      description: 'drawer가 위치할 anchor의 origin',
      table: {
        type: {
          summary: `'left' | 'right' | 'top' | 'bottom'`
        },
        defaultValue: { summary: `'left'` }
      }
    },
    BoxProps: {
      description: 'Box 컴포넌트에 적용되는 props',
      table: {
        type: { summary: `BoxProps` }
      }
    },
    children: {
      description: 'drawer  콘텐츠 (DrawerHeader, DrawerBody, DrawerFooter 등)'
    },
    container: {
      description: 'portal container',
      table: {
        type: {
          summary: `Element | DocumentFragment`
        },
        defaultValue: { summary: `document.body` }
      }
    },
    onClose: {
      description: 'Escape 키/backdrop 클릭 이벤트가 일어날 때 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event, reason: "escapeKeyDown" | "backdropClick") => void`
        }
      }
    },
    open: {
      description: 'true이면, drawer가 나타남'
    },
    variant: {
      description: 'drawer 종류',
      table: {
        type: {
          summary: `'permanent' | 'persistent' | 'temporary'`
        },
        defaultValue: { summary: `'temporary'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const LONG_TEXT = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet error cumque voluptates voluptate debitis doloremque rem doloribus ducimus quia sit. Eaque quae consequuntur dicta unde enim itaque iure fuga voluptatibus sint. Soluta aperiam dignissimos repellendus! Eos sequi nostrum autem deserunt libero earum fugiat tenetur sit culpa nam quam explicabo, dolorum neque. Deleniti beatae blanditiis animi delectus est voluptates odio reprehenderit. Numquam provident aspernatur totam neque magni fugit laborum, commodi amet, nobis odio pariatur non in modi possimus expedita facere earum officiis! Illo magni necessitatibus, inventore molestiae officia eligendi veniam corporis numquam! Vero, quia reprehenderit exercitationem at excepturi adipisci laudantium mollitia voluptates fugiat dolore aspernatur dolor natus itaque ipsa harum maiores quae repudiandae, magni ab dolores sint sed saepe. Amet voluptatum deleniti maxime blanditiis autem ratione perspiciatis quae sint, sapiente, labore earum illo, debitis itaque distinctio architecto. Quisquam, nobis dolorum. Accusamus numquam atque odio asperiores harum beatae voluptate corporis, rem hic non, eveniet reiciendis inventore sint! Commodi illum pariatur iure exercitationem officiis a ex suscipit? Ad molestias, atque exercitationem blanditiis dolores, id veniam voluptas nulla animi, in eius ullam. Fugiat maxime exercitationem facilis aliquid, laudantium impedit obcaecati, quisquam omnis modi sapiente in dicta pariatur quod, atque rerum totam assumenda odio. Ipsum, doloribus, esse sed eius fugiat quae porro expedita accusantium, et alias mollitia. Repellat dolorem minima modi, sunt quasi consectetur! Assumenda illum quia doloribus praesentium laboriosam consectetur, tenetur facere perspiciatis vitae, cupiditate alias esse fugiat optio nam provident repellat. Fugit vel doloribus provident nesciunt iusto! Provident quia fugit odio voluptatem voluptas eveniet perferendis necessitatibus velit id veritatis sequi cumque voluptate illo culpa repellat reprehenderit unde architecto iste eius, possimus dicta dolore incidunt aspernatur. Atque, quaerat sequi neque est quasi eius laboriosam, veritatis aliquam eaque nisi laborum amet omnis dolore veniam ex itaque, numquam necessitatibus quis vel esse! Voluptate facere error quasi sunt, ullam minima id iure ab earum perspiciatis aliquam quia quae eos animi illo blanditiis eligendi architecto iusto sed omnis. Dolores sint, molestias rem inventore veritatis illum totam enim! Iure fugiat ea corporis culpa incidunt, pariatur maiores tempore doloremque, repellendus placeat, magni eligendi debitis voluptatibus fuga. Exercitationem, atque, consequuntur explicabo cupiditate ullam earum rem quibusdam quis corrupti excepturi quod quos? Quidem adipisci quasi, repellendus blanditiis mollitia nulla iusto, perspiciatis libero sit eveniet dolores. Odit nostrum atque ratione aliquam aut tempore facilis blanditiis perspiciatis velit laboriosam in id, ab quis, sapiente iure soluta asperiores repellat, veniam quos similique omnis dicta ad. Sunt eius tempora consequuntur quaerat fugiat dolores a perferendis illo ipsa voluptate aliquid quam sed incidunt provident, magni ducimus? Facere alias quisquam sequi est facilis nam eveniet nemo accusantium, totam ipsum dolore officiis quia ipsam, assumenda expedita minima suscipit cupiditate, dolor qui rem laudantium ducimus saepe voluptatum! Expedita, doloribus adipisci? Sapiente fuga voluptate odit excepturi deleniti! Corporis, obcaecati beatae dolor ducimus a quae magnam aliquid hic at rem possimus est quasi. Officiis harum atque repellat aspernatur aut non, totam ex eius modi sint expedita veritatis illo molestiae assumenda beatae hic, enim cupiditate ducimus dicta optio? At corporis dolorum provident perferendis.`;
const DRAWER_WIDTH = 200;

const insertDocumentStyles = (iframeDoc: Document) => {
  const styles = Array.from(window.document.head.querySelectorAll('style'));
  styles.forEach((style) => {
    iframeDoc.head.appendChild(style.cloneNode(true));
  });
};

const ToolBar = <T extends AsType = 'div'>({
  children,
  style,
  ...rest
}: BoxProps<T>) => (
  <Box
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      width: '100%',
      height: '50px',
      minHeight: '50px',
      boxSizing: 'border-box',
      ...style
    }}
    {...rest}
  >
    {children}
  </Box>
);

const DrawerContent = ({
  isCollapsed,
  transition
}: {
  isCollapsed?: boolean;
  transition?: string;
}) => {
  const LISTS = [
    { label: 'Home', icon: <HomeIcon color="gray-500" /> },
    { label: 'Mail', icon: <MailIcon color="gray-500" /> },
    { label: 'Profile', icon: <PersonIcon color="gray-500" /> }
  ];

  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <Fragment key={idx}>
            <Divider />
            <List style={{ minWidth: '100%' }}>
              {LISTS.map((item) => (
                <ListItem key={item.label} style={{ padding: 0 }}>
                  <ListItemButton
                    style={{
                      gap: '10px',
                      padding: isCollapsed ? '16px' : '8px 16px',
                      color: 'gray-500',
                      ...(transition && { transition: `padding ${transition}` })
                    }}
                  >
                    {item.icon} {!isCollapsed && item.label}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Fragment>
        ))}
    </>
  );
};

const BasicDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer open={open} onClose={closeDrawer}>
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

const PlacementTemplate = () => {
  const PLACEMENTS = [
    { label: 'Left Drawer', value: 'left' },
    { label: 'Right Drawer', value: 'right' },
    { label: 'Top Drawer', value: 'top' },
    { label: 'Bottom Drawer', value: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<(typeof PLACEMENTS)[number]['value']>('left');

  const openDrawer =
    (placement: (typeof PLACEMENTS)[number]['value']) => () => {
      setAnchorOrigin(placement);
      setOpen(true);
    };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={10}>
        {PLACEMENTS.map((placement) => (
          <Button onClick={openDrawer(placement.value)}>
            {placement.label}
          </Button>
        ))}
      </Stack>
      <Drawer open={open} onClose={closeDrawer} anchorOrigin={anchorOrigin}>
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

const TemporaryDrawerTemplate = () => {
  const [open, setOpen] = useState(false);
  const iframeDocBody = useRef<Element>();

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const onLoad = (iframeDoc: Document) => {
    iframeDocBody.current = iframeDoc.body;
    insertDocumentStyles(iframeDoc);
  };

  return (
    <Iframe title="Temporary drawer" onLoad={onLoad} style={{ width: '700px' }}>
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) - 1)`,
          elevation: 5
        }}
      >
        <ButtonBase
          style={{ padding: '8px', borderRadius: '50%' }}
          onClick={openDrawer}
        >
          <BurgerIcon color="white" />
        </ButtonBase>
        Temporary Drawer
      </ToolBar>
      <main>
        <ToolBar />
        <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
      </main>
      <Drawer
        variant="temporary"
        open={open}
        onClose={closeDrawer}
        container={iframeDocBody.current}
        style={{ width: `${DRAWER_WIDTH}px` }}
      >
        <ToolBar />
        <div style={{ overflowY: 'auto' }}>
          <DrawerContent />
        </div>
      </Drawer>
    </Iframe>
  );
};

const MiniVariantDrawerTemplate = () => {
  const TRANSITION = '0.3s ease';
  const scrollbarWidth = 16;
  const COLLAPSED_DRAWER_WIDTH = 56 + scrollbarWidth;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const expandDrawer = () => {
    setIsCollapsed(false);
  };
  const collapseDrawer = () => {
    setIsCollapsed(true);
  };

  return (
    <Iframe
      title="Mini variant drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5,
          width: isCollapsed ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
          marginLeft: isCollapsed ? 0 : `${DRAWER_WIDTH}px`,
          transition: `width ${TRANSITION}, margin-left ${TRANSITION}`,
          gap: '10px'
        }}
      >
        <ButtonBase
          style={{ padding: '8px', borderRadius: '50%' }}
          onClick={expandDrawer}
        >
          <BurgerIcon color="white" />
        </ButtonBase>
        Permanent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          variant="permanent"
          anchorOrigin="left"
          style={{
            width: isCollapsed
              ? `${COLLAPSED_DRAWER_WIDTH}px`
              : `${DRAWER_WIDTH}px`,
            overflowX: 'hidden',
            transition: `width ${TRANSITION}`
          }}
        >
          <ToolBar style={{ justifyContent: 'end' }}>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={collapseDrawer}
            >
              <ArrowLeftIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <DrawerContent isCollapsed={isCollapsed} transition={TRANSITION} />
          </div>
        </Drawer>
        <main>
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  );
};

const LeftPersistentDrawerTemplate = () => {
  const TRANSITION = `var(--jinni-duration-short4) var(--jinni-easing-emphasized)`;
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Iframe
      title="Left persistent drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5,
          width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          marginLeft: open ? `${DRAWER_WIDTH}px` : 0,
          transition: `width ${TRANSITION}, margin-left ${TRANSITION}`,
          gap: '10px'
        }}
      >
        {!open && (
          <ButtonBase
            style={{ padding: '8px', borderRadius: '50%' }}
            onClick={openDrawer}
          >
            <BurgerIcon color="white" />
          </ButtonBase>
        )}
        Persistent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          open={open}
          variant="persistent"
          anchorOrigin="left"
          style={{ width: `${DRAWER_WIDTH}px` }}
        >
          <ToolBar style={{ justifyContent: 'end' }}>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={closeDrawer}
            >
              <ArrowLeftIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
        <main
          style={{
            width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
            marginLeft: open ? 0 : `-${DRAWER_WIDTH}px`,
            transition: `width ${TRANSITION}, margin-left ${TRANSITION}`
          }}
        >
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  );
};

const RightPersistentDrawerTemplate = () => {
  const TRANSITION = `var(--jinni-duration-short4)var(--jinni-easing-emphasized)`;
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Iframe
      title="Right persistent drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5,
          width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
          marginRight: open ? `${DRAWER_WIDTH}px` : 0,
          transition: `width ${TRANSITION}, margin-right ${TRANSITION}`,
          gap: '10px',
          justifyContent: 'space-between'
        }}
      >
        Persistent Drawer
        {!open && (
          <ButtonBase
            style={{ padding: '8px', borderRadius: '50%' }}
            onClick={openDrawer}
          >
            <BurgerIcon color="white" />
          </ButtonBase>
        )}
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <main
          style={{
            width: open ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
            marginRight: open ? 0 : `-${DRAWER_WIDTH}px`,
            transition: `width ${TRANSITION}, margin-right ${TRANSITION}`
          }}
        >
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
        <Drawer
          open={open}
          variant="persistent"
          anchorOrigin="right"
          style={{ width: `${DRAWER_WIDTH}px` }}
        >
          <ToolBar>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={closeDrawer}
            >
              <ArrowRightIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
      </Box>
    </Iframe>
  );
};

const CustomizeDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        BoxProps={{
          elevation: 20,
          style: { backgroundColor: 'surface-container-low' }
        }}
      >
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};

export const BasicDrawer: Story = {
  render: () => <BasicDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer open={open} onClose={closeDrawer}>
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const Placement: Story = {
  render: () => <PlacementTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const PlacementTemplate = () => {
  const PLACEMENTS = [
    { label: 'Left Drawer', value: 'left' },
    { label: 'Right Drawer', value: 'right' },
    { label: 'Top Drawer', value: 'top' },
    { label: 'Bottom Drawer', value: 'bottom' }
  ] as const;
  const [open, setOpen] = useState(false);
  const [anchorOrigin, setAnchorOrigin] =
    useState<(typeof PLACEMENTS)[number]['value']>('left');

  const openDrawer =
    (placement: (typeof PLACEMENTS)[number]['value']) => () => {
      setAnchorOrigin(placement);
      setOpen(true);
    };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack direction="row" spacing={10}>
        {PLACEMENTS.map((placement) => (
          <Button onClick={openDrawer(placement.value)}>
            {placement.label}
          </Button>
        ))}
      </Stack>
      <Drawer open={open} onClose={closeDrawer} anchorOrigin={anchorOrigin}>
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};
`.trim()
      }
    }
  }
};

export const Temporary: Story = {
  render: () => <TemporaryDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const TemporaryDrawerTemplate = () => {
  const [open, setOpen] = useState(false);
  const iframeDocBody = useRef<Element>();

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };
  const onLoad = (iframeDoc: Document) => {
    iframeDocBody.current = iframeDoc.body;
    insertDocumentStyles(iframeDoc);
  };

  return (
    <Iframe title="Temporary drawer" onLoad={onLoad} style={{ width: '700px' }}>
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: \`calc(var(--jinni-z-index-drawer) - 1)\`,
          elevation: 5
        }}
      >
        <ButtonBase
          style={{ padding: '8px', borderRadius: '50%' }}
          onClick={openDrawer}
        >
          <BurgerIcon color="white" />
        </ButtonBase>
        Temporary Drawer
      </ToolBar>
      <main>
        <ToolBar />
        <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
      </main>
      <Drawer
        variant="temporary"
        open={open}
        onClose={closeDrawer}
        container={iframeDocBody.current}
        style={{ width: \`${DRAWER_WIDTH}px\` }}
      >
        <ToolBar />
        <div style={{ overflowY: 'auto' }}>
          <DrawerContent />
        </div>
      </Drawer>
    </Iframe>
  );
};`.trim()
      }
    }
  }
};

export const LeftPermanentDrawerWithFullHeader: Story = {
  render: (args) => (
    <Iframe
      title="Left permanent drawer with full header"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5
        }}
      >
        Permanent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          variant="permanent"
          anchorOrigin="left"
          style={{ width: `${DRAWER_WIDTH}px` }}
          {...args}
        >
          <ToolBar />
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
        <main>
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  )
};

export const RightPermanentDrawerWithFullHeader: Story = {
  render: (args) => (
    <Iframe
      title="Right permanent drawer with full header"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5
        }}
      >
        Permanent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <main>
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
        <Drawer
          variant="permanent"
          anchorOrigin="right"
          style={{ width: `${DRAWER_WIDTH}px` }}
          {...args}
        >
          <ToolBar />
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
      </Box>
    </Iframe>
  )
};

export const LeftPermanentDrawerWithPartialHeader: Story = {
  render: (args) => (
    <Iframe
      title="Left permanent drawer with partial header"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: `calc(var(--jinni-z-index-drawer) + 1)`,
          elevation: 5,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          marginLeft: `${DRAWER_WIDTH}px`
        }}
      >
        Permanent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          variant="permanent"
          anchorOrigin="left"
          style={{ width: `${DRAWER_WIDTH}px` }}
          {...args}
        >
          <ToolBar />
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
        <main>
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  )
};

export const MiniVariantDrawer: Story = {
  render: () => <MiniVariantDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MiniVariantDrawerTemplate = () => {
  const TRANSITION = '0.3s ease';
  const scrollbarWidth = 16;
  const COLLAPSED_DRAWER_WIDTH = 56 + scrollbarWidth;
  const [isCollapsed, setIsCollapsed] = useState(true);

  const expandDrawer = () => {
    setIsCollapsed(false);
  };
  const collapseDrawer = () => {
    setIsCollapsed(true);
  };

  return (
    <Iframe
      title="Mini variant drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: \`calc(var(--jinni-z-index-drawer) + 1)\`,
          elevation: 5,
          width: isCollapsed ? '100%' : \`calc(100% - \${DRAWER_WIDTH}px)\`,
          marginLeft: isCollapsed ? 0 : \`\${DRAWER_WIDTH}px\`,
          transition: \`width \${TRANSITION}, margin-left \${TRANSITION}\`,
          gap: '10px'
        }}
      >
        <ButtonBase
          style={{ padding: '8px', borderRadius: '50%' }}
          onClick={expandDrawer}
        >
          <BurgerIcon color="white" />
        </ButtonBase>
        Permanent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          variant="permanent"
          anchorOrigin="left"
          style={{
            width: isCollapsed
              ? \`\${COLLAPSED_DRAWER_WIDTH}px\`
              : \`\${DRAWER_WIDTH}px\`,
            overflowX: 'hidden',
            transition: \`width \${TRANSITION}\`
          }}
        >
          <ToolBar style={{ justifyContent: 'end' }}>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={collapseDrawer}
            >
              <ArrowLeftIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <DrawerContent isCollapsed={isCollapsed} transition={TRANSITION} />
          </div>
        </Drawer>
        <main>
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  );
};`.trim()
      }
    }
  }
};

export const LeftPersistentDrawer: Story = {
  render: () => <LeftPersistentDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LeftPersistentDrawerTemplate = () => {
  const TRANSITION = \`var(--jinni-duration-short4) var(--jinni-easing-emphasized)\`;
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Iframe
      title="Left persistent drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: \`calc(var(--jinni-z-index-drawer) + 1)\`,
          elevation: 5,
          width: open ? \`calc(100% - \${DRAWER_WIDTH}px)\` : '100%',
          marginLeft: open ? \`\${DRAWER_WIDTH}px\` : 0,
          transition: \`width \${TRANSITION}, margin-left \${TRANSITION}\`,
          gap: '10px'
        }}
      >
        {!open && (
          <ButtonBase
            style={{ padding: '8px', borderRadius: '50%' }}
            onClick={openDrawer}
          >
            <BurgerIcon color="white" />
          </ButtonBase>
        )}
        Persistent Drawer
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <Drawer
          open={open}
          variant="persistent"
          anchorOrigin="left"
          style={{ width: \`\${DRAWER_WIDTH}px\` }}
        >
          <ToolBar style={{ justifyContent: 'end' }}>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={closeDrawer}
            >
              <ArrowLeftIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
        <main
          style={{
            width: open ? \`calc(100% - \${DRAWER_WIDTH}px)\` : '100%',
            marginLeft: open ? 0 : \`-\${DRAWER_WIDTH}px\`,
            transition: \`width \${TRANSITION}, margin-left \${TRANSITION}\`
          }}
        >
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
      </Box>
    </Iframe>
  );
};`.trim()
      }
    }
  }
};

export const RightPersistentDrawer: Story = {
  render: () => <RightPersistentDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const RightPersistentDrawerTemplate = () => {
  const TRANSITION = \`var(--jinni-duration-short4) var(--jinni-easing-emphasized)\`;
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Iframe
      title="Right persistent drawer"
      onLoad={insertDocumentStyles}
      style={{ width: '700px' }}
    >
      <ToolBar
        as="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'primary',
          color: 'on-primary',
          zIndex: \`calc(var(--jinni-z-index-drawer) + 1)\`,
          elevation: 5,
          width: open ? \`calc(100% - \${DRAWER_WIDTH}px)\` : '100%',
          marginRight: open ? \`\${DRAWER_WIDTH}px\` : 0,
          transition: \`width \${TRANSITION}, margin-right \${TRANSITION}\`,
          gap: '10px',
          justifyContent: 'space-between'
        }}
      >
        Persistent Drawer
        {!open && (
          <ButtonBase
            style={{ padding: '8px', borderRadius: '50%' }}
            onClick={openDrawer}
          >
            <BurgerIcon color="white" />
          </ButtonBase>
        )}
      </ToolBar>
      <Box
        style={{
          display: 'flex'
        }}
      >
        <main
          style={{
            width: open ? \`calc(100% - \${DRAWER_WIDTH}px)\` : '100%',
            marginRight: open ? 0 : \`-\${DRAWER_WIDTH}px\`,
            transition: \`width \${TRANSITION}, margin-right \${TRANSITION}\`
          }}
        >
          <ToolBar />
          <div style={{ padding: '16px' }}>{LONG_TEXT}</div>
        </main>
        <Drawer
          open={open}
          variant="persistent"
          anchorOrigin="right"
          style={{ width: \`\${DRAWER_WIDTH}px\` }}
        >
          <ToolBar>
            <ButtonBase
              style={{ padding: '5px', borderRadius: '50%' }}
              onClick={closeDrawer}
            >
              <ArrowRightIcon color="gray-500" />
            </ButtonBase>
          </ToolBar>
          <div style={{ overflowY: 'auto' }}>
            <DrawerContent />
          </div>
        </Drawer>
      </Box>
    </Iframe>
  );
};
`.trim()
      }
    }
  }
};

export const CustomizeDrawer: Story = {
  render: () => <CustomizeDrawerTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeDrawerTemplate = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer}>Open Drawer</Button>
      <Drawer
        open={open}
        onClose={closeDrawer}
        BoxProps={{
          elevation: 20,
          style: { backgroundColor: 'surface-container-low' }
        }}
      >
        <DrawerHeader style={{ position: 'relative' }}>
          Drawer Header
          <ButtonBase
            onClick={closeDrawer}
            style={{
              display: 'inline-flex',
              position: 'absolute',
              right: '5px',
              top: '5px',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <CloseIcon />
          </ButtonBase>
        </DrawerHeader>
        <DrawerBody>Drawer Body</DrawerBody>
        <DrawerFooter>
          <Button onClick={closeDrawer}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};`.trim()
      }
    }
  }
};
