import type { Meta, StoryObj } from '@storybook/react';
import Grid from './Grid';
import GridItem from './GridItem';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Divider } from '@/components/layout/Divider';

const meta: Meta<typeof Grid> = {
  component: Grid,
  argTypes: {
    children: {
      description: 'grid items'
    },
    columns: {
      description: 'grid container 내 동일한 크기의 column 갯수',
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
      description: 'grid container 내 동일한 크기의 row 갯수',
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

const Container = ({ children }: { children: React.ReactNode }) => (
  <Stack spacing={20}>{children}</Stack>
);

const Item = ({ children }: { children: React.ReactNode }) => (
  <Box
    round="sm"
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      padding: '10px',
      backgroundColor: 'gray-200'
    }}
  >
    {children}
  </Box>
);

export const BasicGrid: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} spacing={10} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
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
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
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
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
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
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
        ))}
    </Grid>
  )
};

export const ResponsiveSpacing: Story = {
  render: (args) => (
    <Grid rows={2} columns={3} spacing={{ xs: 10, md: '3rem' }} {...args}>
      {Array(6)
        .fill(0)
        .map((_, idx) => (
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
        ))}
    </Grid>
  )
};

export const Span: Story = {
  render: (args) => (
    <Grid rows={3} columns={4} spacing={10} {...args}>
      <GridItem rowSpan="full" columnSpan={2}>
        <Item>Grid Item 1</Item>
      </GridItem>
      <GridItem columnSpan={2}>
        <Item>Grid Item 2</Item>
      </GridItem>
      <GridItem rowSpan={2} columnSpan={2}>
        <Item>Grid Item 3</Item>
      </GridItem>
    </Grid>
  )
};

export const RowStartEnd: Story = {
  render: (args) => (
    <Grid rows={3} spacing={10} style={{ height: '200px' }} {...args}>
      <GridItem rowStart={2} rowSpan={2}>
        <Item>Grid Item 1</Item>
      </GridItem>
      <GridItem rowEnd={3} rowSpan={2}>
        <Item>Grid Item 2</Item>
      </GridItem>
      <GridItem rowStart={1} rowEnd={4}>
        <Item>Grid Item 3</Item>
      </GridItem>
    </Grid>
  )
};

export const ColumnStartEnd: Story = {
  render: (args) => (
    <Grid columns={6} spacing={10} {...args}>
      <GridItem columnStart={2} columnSpan={4}>
        <Item>Grid Item 1</Item>
      </GridItem>
      <GridItem columnStart={1} columnEnd={3}>
        <Item>Grid Item 2</Item>
      </GridItem>
      <GridItem columnEnd={7} columnSpan={2}>
        <Item>Grid Item 3</Item>
      </GridItem>
    </Grid>
  )
};

export const GridFlow: Story = {
  render: (args) => (
    <Container>
      <Divider>row</Divider>
      <Grid rows={3} columns={3} spacing={10} flow="row" {...args}>
        <GridItem columnSpan={2}>
          <Item>Grid Item 1</Item>
        </GridItem>
        <GridItem columnSpan={2}>
          <Item>Grid Item 2</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 3</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 4</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 5</Item>
        </GridItem>
      </Grid>
      <Divider>row-dense</Divider>
      <Grid rows={3} columns={3} spacing={10} flow="row-dense" {...args}>
        <GridItem columnSpan={2}>
          <Item>Grid Item 1</Item>
        </GridItem>
        <GridItem columnSpan={2}>
          <Item>Grid Item 2</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 3</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 4</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 5</Item>
        </GridItem>
      </Grid>
      <Divider>column</Divider>
      <Grid rows={3} columns={3} spacing={10} flow="column" {...args}>
        <GridItem columnSpan={2}>
          <Item>Grid Item 1</Item>
        </GridItem>
        <GridItem columnSpan={2}>
          <Item>Grid Item 2</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 3</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 4</Item>
        </GridItem>
        <GridItem>
          <Item>Grid Item 5</Item>
        </GridItem>
      </Grid>
    </Container>
  )
};

export const NestedGrid: Story = {
  render: (args) => (
    <Grid rows={4} columns={3} spacing={10} flow="column" {...args}>
      <GridItem>
        <Item>Grid Item 1</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 2</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 3</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 4</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 5</Item>
      </GridItem>
      <GridItem rowSpan={3}>
        <Grid
          rows={3}
          spacing={10}
          flow="column"
          style={{ backgroundColor: 'yellow-50' }}
        >
          <GridItem rowStart={2}>
            <Item>Grid Item 6</Item>
          </GridItem>
        </Grid>
      </GridItem>
      <GridItem>
        <Item>Grid Item 7</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 8</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 9</Item>
      </GridItem>
      <GridItem>
        <Item>Grid Item 10</Item>
      </GridItem>
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
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
        ))}
    </Grid>
  )
};

export const GridAuto: Story = {
  render: (args) => (
    <Grid
      spacing={10}
      style={{
        gridAutoRows: 'minmax(60px, auto)',
        gridAutoColumns: 'max-content'
      }}
      {...args}
    >
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
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
                          "nav main"
                          "nav footer"`,
        gridTemplateRows: '50px 1fr 30px',
        gridTemplateColumns: '150px 1fr'
      }}
      {...args}
    >
      <GridItem style={{ gridArea: 'header' }}>
        <Item>Header</Item>
      </GridItem>
      <GridItem style={{ gridArea: 'nav' }}>
        <Item>Nav</Item>
      </GridItem>
      <GridItem style={{ gridArea: 'main' }}>
        <Item>Main</Item>
      </GridItem>
      <GridItem style={{ gridArea: 'footer' }}>
        <Item>Footer</Item>
      </GridItem>
    </Grid>
  )
};

export const Alignment: Story = {
  render: (args) => (
    <Grid
      columns={3}
      spacing={10}
      style={{ justifyItems: 'center', alignItems: 'center' }}
      {...args}
    >
      {Array(3)
        .fill(0)
        .map((_, idx) => (
          <GridItem key={idx}>
            <Item>Grid Item {idx + 1}</Item>
          </GridItem>
        ))}
    </Grid>
  )
};
