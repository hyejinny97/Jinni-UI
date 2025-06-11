import React, { useState, memo, useCallback, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Masonry from './Masonry';
import { Box } from '@/components/layout/Box';
import { Avatar } from '@/components/data-display/Avatar';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '@/components/data-display/Accordion';
import { Skeleton } from '@/components/feedback/Skeleton';
import { Grid } from '@/components/layout/Grid';

const meta: Meta<typeof Masonry> = {
  component: Masonry,
  argTypes: {
    children: {
      description: 'masonry의 items',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    columns: {
      description: '컬럼 수',
      table: {
        type: { summary: `number | Responsive<number>` },
        defaultValue: { summary: '4' }
      }
    },
    sequential: {
      description:
        'true이면, 가장 짧은 column이 아닌 왼쪽부터 오른쪽 순서대로 적재됨',
      table: {
        type: { summary: `boolean` },
        defaultValue: { summary: 'false' }
      }
    },
    spacing: {
      description: 'items 사이 간격',
      table: {
        type: { summary: `number | Responsive<number>` },
        defaultValue: { summary: '16' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Masonry>;

const ITEMS = [
  { id: 1, height: '50px' },
  { id: 2, height: '100px' },
  { id: 3, height: '150px' },
  { id: 4, height: '100px' },
  { id: 5, height: '250px' },
  { id: 6, height: '100px' },
  { id: 7, height: '150px' },
  { id: 8, height: '50px' },
  { id: 9, height: '100px' },
  { id: 10, height: '50px' }
];

const Item = memo(
  ({
    order,
    children,
    height,
    onDelete
  }: {
    order: number;
    children?: React.ReactNode;
    height?: string;
    onDelete?: (e: MouseEvent) => void;
  }) => {
    return (
      <Box
        elevation={3}
        round={4}
        style={{
          position: 'relative',
          alignItems: 'start',
          minWidth: '150px',
          height
        }}
      >
        <Avatar
          size="xs"
          style={{ position: 'absolute', top: 0, left: 0, margin: '8px' }}
        >
          {order}
        </Avatar>
        {onDelete && (
          <ButtonBase
            onClick={onDelete}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              borderRadius: '50%',
              margin: '8px'
            }}
          >
            <CloseIcon size={20} color="gray-500" />
          </ButtonBase>
        )}
        {children}
      </Box>
    );
  }
);

const ExpandableItem = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Accordion
      style={{
        elevation: 3,
        padding: '8px',
        height: 'max-content',
        width: '200px'
      }}
    >
      <AccordionItem>
        <AccordionSummary>{`Order: ${children}`}</AccordionSummary>
        <AccordionDetails>Lorem ipsum dolor sit amet.</AccordionDetails>
      </AccordionItem>
    </Accordion>
  );
});

const ImageMasonryTemplate = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const response = await fetch(
        'https://api.escuelajs.co/api/v1/products?offset=0&limit=10'
      );
      const products = await response.json();
      setProducts(products);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Grid columns={4} spacing={16}>
          {Array(10)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} height={180} />
            ))}
        </Grid>
      ) : (
        <Masonry>
          {products.map(({ id, images }, idx) => (
            <Item
              key={id}
              order={idx + 1}
              height={`${parseInt(ITEMS[idx].height) * 2}px`}
            >
              <img
                src={images[0]}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit'
                }}
              />
            </Item>
          ))}
        </Masonry>
      )}
    </>
  );
};

const AddItemsTemplate = () => {
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = [...items].map((item) => ({
      ...item,
      id: lastItemId + item.id
    }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id, height }) => (
          <Item key={id} order={id} height={height} />
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        leftIcon={<AddIcon />}
        onClick={addItems}
        style={{
          marginTop: '30px'
        }}
      >
        아이템 추가
      </Button>
    </>
  );
};

const DeleteItemTemplate = () => {
  const [items, setItems] = useState(ITEMS);

  const handleDelete = useCallback(
    (idToDelete: number) => () => {
      setItems((prev) => prev.filter(({ id }) => id !== idToDelete));
    },
    []
  );

  return (
    <Masonry>
      {items.map(({ id, height }) => (
        <Item key={id} order={id} height={height} onDelete={handleDelete(id)} />
      ))}
    </Masonry>
  );
};

const ResizeItemTemplate = () => {
  return (
    <Masonry>
      {ITEMS.map(({ id }) => (
        <ExpandableItem key={id}>{id}</ExpandableItem>
      ))}
    </Masonry>
  );
};

const AddResizeItemsTemplate = () => {
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = [...items].map((item) => ({
      ...item,
      id: lastItemId + item.id
    }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id }) => (
          <ExpandableItem key={id}>{id}</ExpandableItem>
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        leftIcon={<AddIcon />}
        onClick={addItems}
        style={{
          marginTop: '30px'
        }}
      >
        아이템 추가
      </Button>
    </>
  );
};

export const BasicMasonry: Story = {
  render: (args) => (
    <Masonry {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const ImageMasonry: Story = {
  render: (args) => <ImageMasonryTemplate {...args} />
};

export const DefaultColumns: Story = {
  render: (args) => (
    <Masonry columns={3} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const ResponsiveColumns: Story = {
  render: (args) => (
    <Masonry columns={{ xs: 3, sm: 4, md: 5 }} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const DefaultSpacing: Story = {
  render: (args) => (
    <Masonry spacing={8} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const ResponsiveSpacing: Story = {
  render: (args) => (
    <Masonry spacing={{ sm: 16, md: 32 }} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const Sequential: Story = {
  render: (args) => (
    <Masonry sequential {...args}>
      {ITEMS.map(({ id, height }) => (
        <Item key={id} order={id} height={height} />
      ))}
    </Masonry>
  )
};

export const AddItems: Story = {
  render: (args) => <AddItemsTemplate {...args} />
};

export const DeleteItem: Story = {
  render: (args) => <DeleteItemTemplate {...args} />
};

export const ChangeItemHeight: Story = {
  render: (args) => <ResizeItemTemplate {...args} />
};

export const AddItemAndChangeItemHeight: Story = {
  render: (args) => <AddResizeItemsTemplate {...args} />
};
