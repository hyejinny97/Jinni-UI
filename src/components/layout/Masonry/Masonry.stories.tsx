import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Masonry from './Masonry';
import { Box } from '@/components/layout/Box';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Button } from '@/components/general/Button';
import { Text } from '@/components/general/Text';
import { CloseIcon } from '@/components/icons/CloseIcon';
import { AddIcon } from '@/components/icons/AddIcon';
import {
  Accordion,
  AccordionItem,
  AccordionSummary,
  AccordionDetails
} from '@/components/data-display/Accordion';
import { Skeleton } from '@/components/feedback/Skeleton';

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
        type: { summary: `boolean` }
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

const AddItemsTemplate = () => {
  const ADDED_ITEMS_NM = 30;
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = Array(ADDED_ITEMS_NM)
      .fill(0)
      .map((_, idx) => ({
        ...ITEMS[idx % ITEMS.length],
        id: lastItemId + idx + 1
      }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id, height }) => (
          <Box
            key={id}
            elevation={3}
            round={4}
            style={{
              minWidth: '150px',
              height
            }}
          >
            <Text
              style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
            >
              {id}
            </Text>
          </Box>
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        startAdornment={<AddIcon color="primary" />}
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

  const deleteItem = (idToDelete: number) => () => {
    setItems((prev) => prev.filter(({ id }) => id !== idToDelete));
  };

  return (
    <Masonry>
      {items.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            position: 'relative',
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
          <ButtonBase
            aria-label={`delete masonry item-${id}`}
            onClick={deleteItem(id)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'inline-flex',
              borderRadius: '50%',
              margin: '8px',
              padding: '2px',
              backgroundColor: 'gray-500'
            }}
          >
            <CloseIcon size={16} color="white" />
          </ButtonBase>
        </Box>
      ))}
    </Masonry>
  );
};

const AddResizeItemsTemplate = () => {
  const ADDED_ITEMS_NM = 30;
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = Array(ADDED_ITEMS_NM)
      .fill(0)
      .map((_, idx) => ({
        ...ITEMS[idx % ITEMS.length],
        id: lastItemId + idx + 1
      }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id }) => (
          <Accordion
            key={id}
            style={{
              elevation: 3,
              padding: '8px',
              height: 'max-content',
              minWidth: '150px'
            }}
          >
            <AccordionItem>
              <AccordionSummary>{`Order: ${id}`}</AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet.</AccordionDetails>
            </AccordionItem>
          </Accordion>
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        startAdornment={<AddIcon color="primary" />}
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
    <Masonry>
      {isLoading
        ? Array(10)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                width="auto"
                height={parseInt(ITEMS[idx].height) * 2}
                style={{
                  minWidth: '150px'
                }}
              />
            ))
        : products.map(({ id, images, title }, idx) => (
            <Box
              key={id}
              elevation={3}
              round={4}
              style={{
                position: 'relative',
                minWidth: '150px',
                height: `${parseInt(ITEMS[idx].height) * 2}px`
              }}
            >
              <Text
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  textAlign: 'center',
                  margin: '8px',
                  color: 'white'
                }}
              >
                {idx + 1}
              </Text>
              <img
                src={images[0]}
                alt={title}
                width={150}
                height={parseInt(ITEMS[idx].height) * 2}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit'
                }}
              />
            </Box>
          ))}
    </Masonry>
  );
};

export const BasicMasonry: Story = {
  render: (args) => (
    <Masonry {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const BasicColumns: Story = {
  render: (args) => (
    <Masonry columns={3} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const ResponsiveColumns: Story = {
  render: (args) => (
    <Masonry columns={{ xs: 3, sm: 4, md: 5 }} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const BasicSpacing: Story = {
  render: (args) => (
    <Masonry spacing={8} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const ResponsiveSpacing: Story = {
  render: (args) => (
    <Masonry spacing={{ sm: 16, md: 32 }} {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const Sequential: Story = {
  render: (args) => (
    <Masonry sequential {...args}>
      {ITEMS.map(({ id, height }) => (
        <Box
          key={id}
          elevation={3}
          round={4}
          style={{
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
        </Box>
      ))}
    </Masonry>
  )
};

export const AddItems: Story = {
  render: () => <AddItemsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AddItemsTemplate = () => {
  const ADDED_ITEMS_NM = 30;
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = Array(ADDED_ITEMS_NM)
      .fill(0)
      .map((_, idx) => ({
        ...ITEMS[idx % ITEMS.length],
        id: lastItemId + idx + 1
      }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id, height }) => (
          <Box
          key={id}
            elevation={3}
            round={4}
            style={{
              minWidth: '150px',
              height
            }}
          >
            <Text
              style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
            >
              {id}
            </Text>
          </Box>
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        startAdornment={<AddIcon color="primary" />}
        onClick={addItems}
        style={{
          marginTop: '30px'
        }}
      >
        아이템 추가
      </Button>
    </>
  );
};`.trim()
      }
    }
  }
};

export const DeleteItem: Story = {
  render: () => <DeleteItemTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const DeleteItemTemplate = () => {
  const [items, setItems] = useState(ITEMS);

  const deleteItem = (idToDelete: number) => () => {
    setItems((prev) => prev.filter(({ id }) => id !== idToDelete));
  };

  return (
    <Masonry>
      {items.map(({ id, height }) => (
        <Box
        key={id}
          elevation={3}
          round={4}
          style={{
            position: 'relative',
            minWidth: '150px',
            height
          }}
        >
          <Text
            style={{ textAlign: 'center', margin: '8px', color: 'gray-600' }}
          >
            {id}
          </Text>
          <ButtonBase
            aria-label={\`delete masonry item-\${id}\`}
            onClick={deleteItem(id)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'inline-flex',
              borderRadius: '50%',
              margin: '8px',
              padding: '2px',
              backgroundColor: 'gray-500'
            }}
          >
            <CloseIcon size={16} color="white" />
          </ButtonBase>
        </Box>
      ))}
    </Masonry>
  );
};`.trim()
      }
    }
  }
};

export const ChangeItemHeight: Story = {
  render: (args) => (
    <Masonry {...args}>
      {ITEMS.map(({ id }) => (
        <Accordion
          key={id}
          style={{
            elevation: 3,
            padding: '8px',
            height: 'max-content',
            minWidth: '150px'
          }}
        >
          <AccordionItem>
            <AccordionSummary>{`Order: ${id}`}</AccordionSummary>
            <AccordionDetails>Lorem ipsum dolor sit amet.</AccordionDetails>
          </AccordionItem>
        </Accordion>
      ))}
    </Masonry>
  )
};

export const AddItemAndChangeItemHeight: Story = {
  render: () => <AddResizeItemsTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const AddResizeItemsTemplate = () => {
  const ADDED_ITEMS_NM = 30;
  const [items, setItems] = useState(ITEMS);

  const addItems = () => {
    const lastItemId = items[items.length - 1].id;
    const newItems = Array(ADDED_ITEMS_NM)
      .fill(0)
      .map((_, idx) => ({
        ...ITEMS[idx % ITEMS.length],
        id: lastItemId + idx + 1
      }));
    setItems([...items, ...newItems]);
  };

  return (
    <>
      <Masonry>
        {items.map(({ id }) => (
          <Accordion
          key={id}
            style={{
              elevation: 3,
              padding: '8px',
              height: 'max-content',
              minWidth: '150px'
            }}
          >
            <AccordionItem>
              <AccordionSummary>{\`Order: \${id}\`}</AccordionSummary>
              <AccordionDetails>Lorem ipsum dolor sit amet.</AccordionDetails>
            </AccordionItem>
          </Accordion>
        ))}
      </Masonry>
      <Button
        variant="outlined"
        fullWidth
        startAdornment={<AddIcon color="primary" />}
        onClick={addItems}
        style={{
          marginTop: '30px'
        }}
      >
        아이템 추가
      </Button>
    </>
  );
};`.trim()
      }
    }
  }
};

export const ImageMasonry: Story = {
  render: () => <ImageMasonryTemplate />,
  parameters: {
    docs: {
      source: {
        code: `const ImageMasonryTemplate = () => {
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
    <Masonry>
      {isLoading
        ? Array(10)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                width="auto"
                height={parseInt(ITEMS[idx].height) * 2}
                style={{
                  minWidth: '150px'
                }}
              />
            ))
        : products.map(({ id, images, title }, idx) => (
            <Box
              key={id}
              elevation={3}
              round={4}
              style={{
                position: 'relative',
                minWidth: '150px',
                height: \`\${parseInt(ITEMS[idx].height) * 2}px\`
              }}
            >
              <Text
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  textAlign: 'center',
                  margin: '8px',
                  color: 'white'
                }}
              >
                {idx + 1}
              </Text>
              <img
                src={images[0]}
                alt={title}
                width={150}
                height={parseInt(ITEMS[idx].height) * 2}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit'
                }}
              />
            </Box>
          ))}
    </Masonry>
  );
};`.trim()
      }
    }
  }
};
