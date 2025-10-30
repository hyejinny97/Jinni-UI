import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Grid from './Grid';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/general/Text';
import { Stack } from '@/components/layout/Stack';
import { StyleType } from '@/types/style';
import { Radio } from '@/components/data-entry/Radio';
import { RadioLabel } from '@/components/data-entry/RadioLabel';

const meta: Meta<typeof Grid> = {
  component: Grid,
  argTypes: {
    children: {
      description: 'grid items'
    },
    columns: {
      description: '동일한 크기의 column 갯수',
      table: {
        type: { summary: `number | 'auto' | Responsive<number | 'auto'>` },
        defaultValue: { summary: `'auto'` }
      }
    },
    columnSpacing: {
      description: 'column-gap',
      table: {
        type: { summary: `number | string | Responsive<number | string>` }
      }
    },
    flow: {
      description: 'grid items가 auto placement 되는 방식 결정',
      table: {
        type: {
          summary: `'row' | 'column' | 'dense' | 'row-dense' | 'column-dense'`
        },
        defaultValue: { summary: `'row'` }
      }
    },
    rows: {
      description: '동일한 크기의 row 갯수',
      table: {
        type: { summary: `number | 'auto' | Responsive<number | 'auto'>` },
        defaultValue: { summary: `'auto'` }
      }
    },
    rowSpacing: {
      description: 'row-gap',
      table: {
        type: { summary: `number | string | Responsive<number | string>` }
      }
    },
    spacing: {
      description: 'row-gap과 column-gap',
      table: {
        type: { summary: `number | string | Responsive<number | string>` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Grid>;

const GrayBox = ({
  children,
  style
}: {
  children: React.ReactNode;
  style?: StyleType;
}) => (
  <Box
    round="sm"
    style={{
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: '10px',
      backgroundColor: 'gray-200',
      ...style
    }}
  >
    {children}
  </Box>
);

const GridFlowTemplate = () => {
  const FLOWS = [
    'row',
    'column',
    'dense',
    'row-dense',
    'column-dense'
  ] as const;
  const [checkedValue, setCheckedValue] = useState<(typeof FLOWS)[number]>(
    FLOWS[0]
  );

  const check = (value: (typeof FLOWS)[number]) => () => {
    setCheckedValue(value);
  };

  return (
    <Stack spacing={30}>
      <Stack direction="row" spacing={10}>
        {FLOWS.map((flow) => (
          <RadioLabel label={flow}>
            <Radio checked={checkedValue === flow} onChange={check(flow)} />
          </RadioLabel>
        ))}
      </Stack>
      <Grid rows={3} columns={3} spacing={10} flow={checkedValue}>
        <GrayBox style={{ gridColumn: 'span 2' }}>Grid Item 1</GrayBox>
        <GrayBox style={{ gridColumn: 'span 2' }}>Grid Item 2</GrayBox>
        <GrayBox>Grid Item 3</GrayBox>
        <GrayBox>Grid Item 4</GrayBox>
        <GrayBox>Grid Item 5</GrayBox>
      </Grid>
    </Stack>
  );
};

const AlignmentTemplate = () => {
  const POSITIONS = ['start', 'center', 'end'] as const;
  const [justifyItems, setJustifyItems] = useState<(typeof POSITIONS)[number]>(
    POSITIONS[1]
  );
  const [alignItems, setAlignItems] = useState<(typeof POSITIONS)[number]>(
    POSITIONS[1]
  );

  const changeJustifyItems = (value: (typeof POSITIONS)[number]) => () => {
    setJustifyItems(value);
  };
  const changeAlignItems = (value: (typeof POSITIONS)[number]) => () => {
    setAlignItems(value);
  };

  return (
    <Stack spacing={30}>
      <Stack>
        <Stack direction="row" spacing={10}>
          <Text>justify-items: </Text>
          {POSITIONS.map((position) => (
            <RadioLabel label={position}>
              <Radio
                checked={justifyItems === position}
                onChange={changeJustifyItems(position)}
              />
            </RadioLabel>
          ))}
        </Stack>
        <Stack direction="row" spacing={10}>
          <Text>align-items: </Text>
          {POSITIONS.map((position) => (
            <RadioLabel label={position}>
              <Radio
                checked={alignItems === position}
                onChange={changeAlignItems(position)}
              />
            </RadioLabel>
          ))}
        </Stack>
      </Stack>
      <Grid
        columns={3}
        spacing={10}
        style={{
          justifyItems,
          alignItems,
          width: '500px',
          height: '100px',
          border: '1px solid lightgray',
          borderRadius: '4px'
        }}
      >
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <GrayBox
              key={idx}
              style={{ width: 'max-content', height: 'max-content' }}
            >
              Grid Item {idx + 1}
            </GrayBox>
          ))}
      </Grid>
    </Stack>
  );
};

export const BasicGrid: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} spacing={10} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const ResponsiveGrid: Story = {
  render: (args) => (
    <Grid
      rows={{ xs: 2, md: 3 }}
      columns={{ xs: 3, md: 2 }}
      spacing={10}
      {...args}
    >
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const Spacing: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} spacing={10} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const RowColumnSpacing: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} rowSpacing={20} columnSpacing={50} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const ResponsiveSpacing: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} spacing={{ xs: '10px', md: '3rem' }} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const Span: Story = {
  render: (args) => (
    <Grid rows={3} columns={4} spacing={10} {...args}>
      <GrayBox
        style={{ gridRowStart: 1, gridRowEnd: -1, gridColumn: 'span 2' }}
      >
        Grid Item 1
      </GrayBox>
      <GrayBox style={{ gridColumn: 'span 2' }}>Grid Item 2</GrayBox>
      <GrayBox style={{ gridRow: 'span 2', gridColumn: 'span 2' }}>
        Grid Item 3
      </GrayBox>
    </Grid>
  )
};

export const RowStartEnd: Story = {
  render: (args) => (
    <Grid rows={3} spacing={10} style={{ height: '200px' }} {...args}>
      <GrayBox style={{ gridRowStart: 2, gridRowEnd: 'span 2' }}>
        Grid Item 1
      </GrayBox>
      <GrayBox style={{ gridRowStart: 'span 2', gridRowEnd: 3 }}>
        Grid Item 2
      </GrayBox>
      <GrayBox style={{ gridRow: { xs: '1 / 2', md: '1 / 4' } }}>
        Grid Item 3
      </GrayBox>
    </Grid>
  )
};

export const ColumnStartEnd: Story = {
  render: (args) => (
    <Grid columns={6} spacing={10} {...args}>
      <GrayBox style={{ gridColumnStart: 2, gridColumnEnd: 'span 4' }}>
        Grid Item 1
      </GrayBox>
      <GrayBox style={{ gridColumn: '1 / 3' }}>Grid Item 2</GrayBox>
      <GrayBox
        style={{ gridColumnStart: 'span 2', gridColumnEnd: { xs: 6, md: 7 } }}
      >
        Grid Item 3
      </GrayBox>
    </Grid>
  )
};

export const GridFlow: Story = {
  render: () => <GridFlowTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const GridFlowTemplate = () => {
  const FLOWS = [
    'row',
    'column',
    'dense',
    'row-dense',
    'column-dense'
  ] as const;
  const [checkedValue, setCheckedValue] = useState<(typeof FLOWS)[number]>(
    FLOWS[0]
  );

  const check = (value: (typeof FLOWS)[number]) => () => {
    setCheckedValue(value);
  };

  return (
    <Stack spacing={30}>
      <Stack direction="row" spacing={10}>
        {FLOWS.map((flow) => (
          <RadioLabel label={flow}>
            <Radio checked={checkedValue === flow} onChange={check(flow)} />
          </RadioLabel>
        ))}
      </Stack>
      <Grid rows={3} columns={3} spacing={10} flow={checkedValue}>
        <GrayBox style={{ gridColumn: 'span 2' }}>Grid Item 1</GrayBox>
        <GrayBox style={{ gridColumn: 'span 2' }}>Grid Item 2</GrayBox>
        <GrayBox>Grid Item 3</GrayBox>
        <GrayBox>Grid Item 4</GrayBox>
        <GrayBox>Grid Item 5</GrayBox>
      </Grid>
    </Stack>
  );
};`.trim()
      }
    }
  }
};

export const NestedGrid: Story = {
  render: (args) => (
    <Grid rows={4} columns={3} spacing={10} flow="column" {...args}>
      <GrayBox>Grid Item 1</GrayBox>
      <GrayBox>Grid Item 2</GrayBox>
      <GrayBox>Grid Item 3</GrayBox>
      <GrayBox>Grid Item 4</GrayBox>
      <GrayBox>Grid Item 5</GrayBox>
      <Grid
        rows={3}
        spacing={10}
        flow="column"
        style={{ gridRow: 'span 3', backgroundColor: 'yellow-50' }}
      >
        <GrayBox style={{ gridRowStart: 2 }}>Grid Item 6</GrayBox>
      </Grid>
      <GrayBox>Grid Item 7</GrayBox>
      <GrayBox>Grid Item 8</GrayBox>
      <GrayBox>Grid Item 9</GrayBox>
      <GrayBox>Grid Item 10</GrayBox>
    </Grid>
  )
};

export const GridTemplateCustomization: Story = {
  render: (args) => (
    <Grid
      spacing={10}
      style={{
        gridTemplateRows: '1fr 2fr 1fr',
        gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))'
      }}
      {...args}
    >
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const GridAuto: Story = {
  render: (args) => (
    <Grid
      spacing={10}
      style={{
        gridAutoRows: 'minmax(100px, auto)',
        gridAutoColumns: 'minmax(200px, auto)'
      }}
      {...args}
    >
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <GrayBox key={idx}>Grid Item {idx + 1}</GrayBox>
        ))}
    </Grid>
  )
};

export const GridTemplateArea: Story = {
  render: (args) => (
    <Grid
      spacing={10}
      style={{
        gridTemplateAreas: `"header header"
                        "main aside"
                        "footer footer"`,
        gridTemplateRows: '50px 1fr 30px',
        gridTemplateColumns: '150px 1fr',
        height: '200px'
      }}
      {...args}
    >
      <GrayBox style={{ gridArea: 'header' }}>Header</GrayBox>
      <GrayBox style={{ gridArea: 'main' }}>Main</GrayBox>
      <GrayBox style={{ gridArea: 'aside' }}>Aside</GrayBox>
      <GrayBox style={{ gridArea: 'footer' }}>Footer</GrayBox>
    </Grid>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Grid
  spacing={10}
  style={{
    gridTemplateAreas: \`"header header"
                        "main aside"
                        "footer footer"\`,
    gridTemplateRows: '50px 1fr 30px',
    gridTemplateColumns: '150px 1fr',
    height: '200px'
  }}
>
  <GrayBox style={{ gridArea: 'header' }}>Header</GrayBox>
  <GrayBox style={{ gridArea: 'main' }}>Main</GrayBox>
  <GrayBox style={{ gridArea: 'aside' }}>Aside</GrayBox>
  <GrayBox style={{ gridArea: 'footer' }}>Footer</GrayBox>
</Grid>`.trim()
      }
    }
  }
};

export const Alignment: Story = {
  render: () => <AlignmentTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AlignmentTemplate = () => {
  const POSITIONS = ['start', 'center', 'end'] as const;
  const [justifyItems, setJustifyItems] = useState<(typeof POSITIONS)[number]>(
    POSITIONS[1]
  );
  const [alignItems, setAlignItems] = useState<(typeof POSITIONS)[number]>(
    POSITIONS[1]
  );

  const changeJustifyItems = (value: (typeof POSITIONS)[number]) => () => {
    setJustifyItems(value);
  };
  const changeAlignItems = (value: (typeof POSITIONS)[number]) => () => {
    setAlignItems(value);
  };

  return (
    <Stack spacing={30}>
      <Stack>
        <Stack direction="row" spacing={10}>
          <Text>justify-items: </Text>
          {POSITIONS.map((position) => (
            <RadioLabel label={position}>
              <Radio
                checked={justifyItems === position}
                onChange={changeJustifyItems(position)}
              />
            </RadioLabel>
          ))}
        </Stack>
        <Stack direction="row" spacing={10}>
          <Text>align-items: </Text>
          {POSITIONS.map((position) => (
            <RadioLabel label={position}>
              <Radio
                checked={alignItems === position}
                onChange={changeAlignItems(position)}
              />
            </RadioLabel>
          ))}
        </Stack>
      </Stack>
      <Grid
        columns={3}
        spacing={10}
        style={{
          justifyItems,
          alignItems,
          width: '500px',
          height: '100px',
          border: '1px solid lightgray',
          borderRadius: '4px'
        }}
      >
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <GrayBox
              key={idx}
              style={{ width: 'max-content', height: 'max-content' }}
            >
              Grid Item {idx + 1}
            </GrayBox>
          ))}
      </Grid>
    </Stack>
  );
};`.trim()
      }
    }
  }
};
