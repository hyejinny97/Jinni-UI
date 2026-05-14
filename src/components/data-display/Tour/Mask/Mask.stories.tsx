import type { Meta, StoryObj } from '@storybook/react';
import { useState, useRef } from 'react';
import Mask from './Mask';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { RadioGroup } from '@/components/data-entry/RadioGroup';
import { Radio } from '@/components/data-entry/Radio';
import { Label } from '@/components/data-entry/Label';
import { Chip } from '@/components/data-display/Chip';

const meta: Meta<typeof Mask> = {
  component: Mask,
  argTypes: {
    maskColor: {
      description: 'mask 색상 ',
      table: {
        type: { summary: `ColorType` },
        defaultValue: {
          summary: `'rgba(0, 0, 0, 0.7)'`
        }
      }
    },
    spotlightElRef: {
      description: 'mask에서 배제되는 요소',
      table: {
        type: { summary: `React.RefObject<HTMLElement>` }
      }
    },
    spotlightPadding: {
      description: 'spotlight의 패딩',
      table: {
        type: { summary: `number` },
        defaultValue: { summary: '5' }
      }
    },
    spotlightShape: {
      description: 'spotlight의 모양',
      table: {
        type: { summary: `'rectangular' | 'rounded' | 'circular'` },
        defaultValue: { summary: `'rectangular'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Mask>;

const BasicMaskTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && <Mask spotlightElRef={anchorRef} onClick={closeMask} />}
    </Stack>
  );
};

const MaskColorTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          maskColor="#2225"
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};

const SpotlightShapeTemplate = () => {
  const SHAPES = ['rectangular', 'rounded', 'circular'] as const;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shape, setShape] = useState<(typeof SHAPES)[number]>(SHAPES[0]);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };
  const handleShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShape(value as (typeof SHAPES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Shape
        </Chip>
        <RadioGroup name="shape" value={shape} onChange={handleShapeChange}>
          <Grid rows={1} columns={3} spacing={5}>
            {SHAPES.map((shape) => (
              <Label content={shape} style={{ color: 'on-surface' }}>
                <Radio value={shape} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: shape === 'circular' ? '100px' : '300px',
          height: '100px',
          backgroundColor: 'yellow-400',
          borderRadius: shape === 'circular' ? '100%' : undefined
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          spotlightShape={shape}
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};

const SpotlightPaddingTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          spotlightPadding={20}
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};

export const BasicMask: Story = {
  render: () => <BasicMaskTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const BasicMaskTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && <Mask spotlightElRef={anchorRef} onClick={closeMask} />}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const MaskColor: Story = {
  render: () => <MaskColorTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const MaskColorTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          maskColor="#2225"
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const SpotlightShape: Story = {
  render: () => <SpotlightShapeTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SpotlightShapeTemplate = () => {
  const SHAPES = ['rectangular', 'rounded', 'circular'] as const;
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shape, setShape] = useState<(typeof SHAPES)[number]>(SHAPES[0]);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };
  const handleShapeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShape(value as (typeof SHAPES)[number]);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Box
        as="fieldset"
        round="md"
        style={{ backgroundColor: 'surface-container', border: 'none' }}
      >
        <Chip as="legend" variant="filled" color="surface-container-highest">
          Shape
        </Chip>
        <RadioGroup name="shape" value={shape} onChange={handleShapeChange}>
          <Grid rows={1} columns={3} spacing={5}>
            {SHAPES.map((shape) => (
              <Label content={shape} style={{ color: 'on-surface' }}>
                <Radio value={shape} />
              </Label>
            ))}
          </Grid>
        </RadioGroup>
      </Box>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: shape === 'circular' ? '100px' : '300px',
          height: '100px',
          backgroundColor: 'yellow-400',
          borderRadius: shape === 'circular' ? '100%' : undefined
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          spotlightShape={shape}
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const SpotlightPadding: Story = {
  render: () => <SpotlightPaddingTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const SpotlightPaddingTemplate = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const openMask = () => {
    setOpen(true);
  };
  const closeMask = () => {
    setOpen(false);
  };

  return (
    <Stack spacing={20} style={{ alignItems: 'center' }}>
      <Button onClick={openMask}>Open Mask</Button>
      <Box
        ref={anchorRef}
        style={{
          width: '300px',
          height: '100px',
          backgroundColor: 'yellow-400'
        }}
      />
      {open && (
        <Mask
          spotlightElRef={anchorRef}
          spotlightPadding={20}
          onClick={closeMask}
        />
      )}
    </Stack>
  );
};
`.trim()
      }
    }
  }
};
