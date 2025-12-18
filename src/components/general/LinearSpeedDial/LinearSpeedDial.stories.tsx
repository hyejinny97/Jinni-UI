import { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  LinearSpeedDial,
  LinearSpeedDialAction,
  LinearSpeedDialProps
} from '.';
import { FileCopyIcon } from '@/components/icons/FileCopyIcon';
import { PrintIcon } from '@/components/icons/PrintIcon';
import { SaveIcon } from '@/components/icons/SaveIcon';
import { ShareIcon } from '@/components/icons/ShareIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Radio } from '@/components/data-entry/Radio';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Label } from '@/components/data-entry/Label';
import { Iframe } from '@/components/_share/Iframe';

const meta: Meta<typeof LinearSpeedDial> = {
  component: LinearSpeedDial,
  argTypes: {
    anchorElRef: {
      description: 'anchor element의 reference',
      table: {
        type: { summary: 'React.RefObject<HTMLElement>' }
      }
    },
    anchorPosition: {
      description: 'client area에서 anchor의 상대적인 위치',
      table: {
        type: { summary: '{ left: number; top: number; }' }
      }
    },
    anchorReference: {
      description:
        'speed dial의 위치를 설정할 때, 어떤 anchor prop을 참조할지 결정',
      table: {
        type: { summary: `'anchorEl' | 'anchorPosition'` },
        defaultValue: { summary: `'anchorEl'` }
      }
    },
    children: {
      description: 'action buttons (ex) LinearSpeedDialAction 등)',
      table: {
        type: { summary: `React.ReactNode` }
      }
    },
    offset: {
      description: 'anchor와 speed dial 사이 거리',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: `16` }
      }
    },
    onClose: {
      description:
        'Escape 키/Background 클릭/MouseLeave/Blur 이벤트가 발생 시 호출되는 함수',
      table: {
        type: {
          summary: `(event: Event | React.SyntheticEvent, reason: "backgroundClick" | "blur" | "mouseLeave" | "escapeKeyDown") => void`
        }
      }
    },
    open: {
      description: 'true이면, action buttons가 나타남',
      table: {
        type: { summary: `boolean` }
      }
    },
    placement: {
      description: 'action buttons가 나타나는 위치',
      table: {
        type: { summary: `'up' | 'down' | 'left' | 'right'` },
        defaultValue: { summary: `'up'` }
      }
    },
    positionType: {
      description: 'popper의 position type',
      table: {
        type: { summary: `'absolute' | 'fixed'` },
        defaultValue: { summary: `'absolute'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof LinearSpeedDial>;

const insertDocumentStyles = (iframeDoc: Document) => {
  const styles = Array.from(window.document.head.querySelectorAll('style'));
  styles.forEach((style) => {
    iframeDoc.head.appendChild(style.cloneNode(true));
  });
};

const BasicLinearSpeedDialTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};

const LinearSpeedDialWithFABTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const iframeDocBody = useRef<HTMLElement>();
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const closeSpeedDial: LinearSpeedDialProps['onClose'] = (_, reason) => {
    if (reason === 'backgroundClick') {
      setOpen(false);
    }
  };
  const toggle = () => setOpen((prev) => !prev);
  const onLoad = (iframeDoc: Document) => {
    iframeDocBody.current = iframeDoc.body;
    insertDocumentStyles(iframeDoc);
  };

  return (
    <Iframe
      title="Temporary drawer"
      onLoad={onLoad}
      style={{ width: '300px', height: '300px' }}
    >
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iure, ab
        nam vel ducimus deleniti nihil. Illo tenetur quibusdam id deserunt culpa
        autem dolorum debitis explicabo vero enim ab non at deleniti nam
        consequuntur necessitatibus, accusantium amet illum nulla pariatur
        exercitationem perspiciatis odit est earum! Maxime ad totam eveniet
        ipsum expedita. Fuga numquam excepturi placeat mollitia dignissimos quam
        voluptatum explicabo iure odio amet accusantium tenetur, impedit
        voluptas perspiciatis ipsam est nihil voluptates itaque cum nam sunt
        similique suscipit? Eius nam quod nobis consequuntur distinctio. Enim
        voluptatibus molestiae ut, qui quaerat nemo cupiditate temporibus cumque
        nulla, blanditiis distinctio sint error obcaecati dignissimos vero dicta
        in, sed ab molestias! Ipsa perspiciatis, quibusdam adipisci laboriosam
        nemo fugiat, id incidunt odit rerum, veritatis voluptatibus suscipit
        harum porro. Alias architecto aspernatur nisi maxime praesentium, illum
        iure unde suscipit perspiciatis mollitia dolorem ad, iste distinctio
        doloremque fuga voluptatem aut exercitationem perferendis nihil magni?
        Laboriosam soluta nobis incidunt harum delectus, veritatis fuga ratione
        velit dolorem amet corrupti nesciunt eligendi eos possimus error
        voluptatum voluptate sed, accusamus, aperiam molestias veniam beatae.
        Officiis accusantium doloribus incidunt repellat natus repudiandae
        magnam suscipit quos quaerat, nam ullam sapiente quas tenetur porro
        commodi, minima eos nesciunt quasi dolorem harum quae ad ea.
      </Text>
      <Button
        ref={anchorElRef}
        onClick={toggle}
        shape="pill"
        elevation={5}
        style={{
          position: 'fixed',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
        positionType="fixed"
        container={iframeDocBody.current}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Iframe>
  );
};

const PlacementTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const PLACEMENTS = ['up', 'down', 'left', 'right'] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<(typeof PLACEMENTS)[number]>('up');

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);
  const handlePlacementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlacement(event.target.value as (typeof PLACEMENTS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup
        name="placement"
        value={placement}
        onChange={handlePlacementChange}
      >
        <Stack direction="row">
          {PLACEMENTS.map((placement) => (
            <Label key={placement} content={placement}>
              <Radio value={placement} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Box
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          border: '1px solid',
          borderColor: 'gray-200'
        }}
      >
        <Button
          ref={anchorElRef}
          onClick={toggle}
          onFocus={openSpeedDial}
          onMouseEnter={openSpeedDial}
          shape="pill"
          elevation={5}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: 0,
            width: '50px',
            height: '50px',
            transform: open
              ? 'translate(-50%, -50%) rotate(45deg)'
              : 'translate(-50%, -50%)',
            transition: 'transform 0.3s'
          }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="basic-speed-dial"
        >
          <AddIcon color="white" size={20} />
        </Button>
        <LinearSpeedDial
          id="basic-speed-dial"
          aria-label="useful tools"
          anchorElRef={anchorElRef}
          open={open}
          onClose={closeSpeedDial}
          placement={placement}
        >
          {ACTIONS.map((action) => (
            <LinearSpeedDialAction
              key={action.name}
              TooltipProps={{ content: action.name }}
              onClick={() => setOpen(false)}
            >
              {action.icon}
            </LinearSpeedDialAction>
          ))}
        </LinearSpeedDial>
      </Box>
    </Stack>
  );
};

const DistanceFromAnchorTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
        offset={30}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};

const AnchorPositionTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial: LinearSpeedDialProps['onClose'] = (_, reason) => {
    if (reason === 'mouseLeave') return;
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openSpeedDial();
  };

  return (
    <Box
      style={{
        width: '500px'
      }}
    >
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
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
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};

const CustomizeButtonTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="tertiary" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="tertiary" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="tertiary" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="tertiary" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            variant="subtle-filled"
            color="tertiary"
            shape="rounded"
            size="lg"
            rippleStartLocation="center"
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};

const CustomizeTooltipTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            onClick={() => setOpen(false)}
            TooltipProps={{
              content: action.name,
              arrow: true,
              open: true,
              placement: 'right'
            }}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};

export const BasicLinearSpeedDial: Story = {
  render: () => <BasicLinearSpeedDialTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicLinearSpeedDialTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const LinearSpeedDialWithFAB: Story = {
  render: () => <LinearSpeedDialWithFABTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const LinearSpeedDialWithFABTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const iframeDocBody = useRef<HTMLElement>();
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const closeSpeedDial: LinearSpeedDialProps['onClose'] = (_, reason) => {
    if (reason === 'backgroundClick') {
      setOpen(false);
    }
  };
  const toggle = () => setOpen((prev) => !prev);
  const onLoad = (iframeDoc: Document) => {
    iframeDocBody.current = iframeDoc.body;
    insertDocumentStyles(iframeDoc);
  };

  return (
    <Iframe
      title="Temporary drawer"
      onLoad={onLoad}
      style={{ width: '300px', height: '300px' }}
    >
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio iure, ab
        nam vel ducimus deleniti nihil. Illo tenetur quibusdam id deserunt culpa
        autem dolorum debitis explicabo vero enim ab non at deleniti nam
        consequuntur necessitatibus, accusantium amet illum nulla pariatur
        exercitationem perspiciatis odit est earum! Maxime ad totam eveniet
        ipsum expedita. Fuga numquam excepturi placeat mollitia dignissimos quam
        voluptatum explicabo iure odio amet accusantium tenetur, impedit
        voluptas perspiciatis ipsam est nihil voluptates itaque cum nam sunt
        similique suscipit? Eius nam quod nobis consequuntur distinctio. Enim
        voluptatibus molestiae ut, qui quaerat nemo cupiditate temporibus cumque
        nulla, blanditiis distinctio sint error obcaecati dignissimos vero dicta
        in, sed ab molestias! Ipsa perspiciatis, quibusdam adipisci laboriosam
        nemo fugiat, id incidunt odit rerum, veritatis voluptatibus suscipit
        harum porro. Alias architecto aspernatur nisi maxime praesentium, illum
        iure unde suscipit perspiciatis mollitia dolorem ad, iste distinctio
        doloremque fuga voluptatem aut exercitationem perferendis nihil magni?
        Laboriosam soluta nobis incidunt harum delectus, veritatis fuga ratione
        velit dolorem amet corrupti nesciunt eligendi eos possimus error
        voluptatum voluptate sed, accusamus, aperiam molestias veniam beatae.
        Officiis accusantium doloribus incidunt repellat natus repudiandae
        magnam suscipit quos quaerat, nam ullam sapiente quas tenetur porro
        commodi, minima eos nesciunt quasi dolorem harum quae ad ea.
      </Text>
      <Button
        ref={anchorElRef}
        onClick={toggle}
        shape="pill"
        elevation={5}
        style={{
          position: 'fixed',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
        positionType="fixed"
        container={iframeDocBody.current}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Iframe>
  );
};`.trim()
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
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const PLACEMENTS = ['up', 'down', 'left', 'right'] as const;
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<(typeof PLACEMENTS)[number]>('up');

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);
  const handlePlacementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPlacement(event.target.value as (typeof PLACEMENTS)[number]);
  };

  return (
    <Stack spacing={10} style={{ alignItems: 'center' }}>
      <RadioGroup
        name="placement"
        value={placement}
        onChange={handlePlacementChange}
      >
        <Stack direction="row">
          {PLACEMENTS.map((placement) => (
            <Label key={placement} content={placement}>
              <Radio value={placement} />
            </Label>
          ))}
        </Stack>
      </RadioGroup>
      <Box
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          border: '1px solid',
          borderColor: 'gray-200'
        }}
      >
        <Button
          ref={anchorElRef}
          onClick={toggle}
          onFocus={openSpeedDial}
          onMouseEnter={openSpeedDial}
          shape="pill"
          elevation={5}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: 0,
            width: '50px',
            height: '50px',
            transform: open
              ? 'translate(-50%, -50%) rotate(45deg)'
              : 'translate(-50%, -50%)',
            transition: 'transform 0.3s'
          }}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls="basic-speed-dial"
        >
          <AddIcon color="white" size={20} />
        </Button>
        <LinearSpeedDial
          id="basic-speed-dial"
          aria-label="useful tools"
          anchorElRef={anchorElRef}
          open={open}
          onClose={closeSpeedDial}
          placement={placement}
        >
          {ACTIONS.map((action) => (
            <LinearSpeedDialAction
              key={action.name}
              TooltipProps={{ content: action.name }}
              onClick={() => setOpen(false)}
            >
              {action.icon}
            </LinearSpeedDialAction>
          ))}
        </LinearSpeedDial>
      </Box>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const DistanceFromAnchor: Story = {
  render: () => <DistanceFromAnchorTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DistanceFromAnchorTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
        offset={30}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
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
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const [coordinate, setCoordinate] = useState({ left: 0, top: 0 });
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial: LinearSpeedDialProps['onClose'] = (_, reason) => {
    if (reason === 'mouseLeave') return;
    setOpen(false);
  };
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    const newCoordinate = {
      left: event.clientX,
      top: event.clientY
    };
    setCoordinate(newCoordinate);
    openSpeedDial();
  };

  return (
    <Box
      style={{
        width: '500px'
      }}
    >
      <p
        onContextMenu={handleContextMenu}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
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
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorReference="anchorPosition"
        anchorPosition={coordinate}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            onClick={() => setOpen(false)}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeButton: Story = {
  render: () => <CustomizeButtonTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeButtonTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="tertiary" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="tertiary" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="tertiary" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="tertiary" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            TooltipProps={{ content: action.name }}
            variant="subtle-filled"
            color="tertiary"
            shape="rounded"
            size="lg"
            rippleStartLocation="center"
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};`.trim()
      }
    }
  }
};

export const CustomizeTooltip: Story = {
  render: () => <CustomizeTooltipTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const CustomizeTooltipTemplate = () => {
  const ACTIONS = [
    { icon: <FileCopyIcon size={20} color="gray-700" />, name: 'Copy' },
    { icon: <SaveIcon size={20} color="gray-700" />, name: 'Save' },
    { icon: <PrintIcon size={20} color="gray-700" />, name: 'Print' },
    { icon: <ShareIcon size={20} color="gray-700" />, name: 'Share' }
  ];
  const anchorElRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openSpeedDial = () => {
    setOpen(true);
  };
  const closeSpeedDial = () => {
    setOpen(false);
  };
  const toggle = () => setOpen((prev) => !prev);

  return (
    <Box
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        border: '1px solid',
        borderColor: 'gray-200'
      }}
    >
      <Button
        ref={anchorElRef}
        onClick={toggle}
        onFocus={openSpeedDial}
        onMouseEnter={openSpeedDial}
        shape="pill"
        elevation={5}
        style={{
          position: 'absolute',
          right: '10px',
          bottom: '10px',
          padding: 0,
          width: '50px',
          height: '50px',
          transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s'
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="basic-speed-dial"
      >
        <AddIcon color="white" size={20} />
      </Button>
      <LinearSpeedDial
        id="basic-speed-dial"
        aria-label="useful tools"
        anchorElRef={anchorElRef}
        open={open}
        onClose={closeSpeedDial}
      >
        {ACTIONS.map((action) => (
          <LinearSpeedDialAction
            key={action.name}
            onClick={() => setOpen(false)}
            TooltipProps={{
              content: action.name,
              arrow: true,
              open: true,
              placement: 'right'
            }}
          >
            {action.icon}
          </LinearSpeedDialAction>
        ))}
      </LinearSpeedDial>
    </Box>
  );
};`.trim()
      }
    }
  }
};
