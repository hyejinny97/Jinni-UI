import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from '.';
import { Stack } from '@/components/layout/Stack';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/general/Button';
import { ButtonBase } from '@/components/general/ButtonBase';
import { Text } from '@/components/general/Text';
import { Box } from '@/components/layout/Box';
import { Avatar } from '@/components/data-display/Avatar';
import { Checkbox } from '@/components/data-entry/Checkbox';
import { MorevertIcon } from '@/components/icons/MorevertIcon';
import { FavoriteIcon } from '@/components/icons/FavoriteIcon';
import { FavoriteBorderIcon } from '@/components/icons/FavoriteBorderIcon';
import { BookmarkIcon } from '@/components/icons/BookmarkIcon';
import { BookmarkBorderIcon } from '@/components/icons/BookmarkBorderIcon';

const meta: Meta<typeof Card> = {
  component: Card,
  argTypes: {
    children: {
      description: '카드 내용',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    },
    elevation: {
      description: '계층(높낮이)',
      table: {
        type: { summary: 'ElevationLevelType' },
        defaultValue: { summary: '3' }
      }
    },
    outlined: {
      description: 'border 존재 여부',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    round: {
      description: 'border-radius 값',
      table: {
        type: { summary: `'sm' | 'md' | 'lg' | number` },
        defaultValue: { summary: `'sm'` }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardTemplate = ({ ...props }) => {
  return (
    <Card style={{ maxWidth: '270px' }} {...props}>
      <CardHeader style={{ paddingBottom: '8px' }}>
        <Text as="h3" className="typo-title-large" style={{ margin: '5px 0' }}>
          Card Title
        </Text>
        <Text
          as="h4"
          className="typo-title-medium"
          style={{ color: 'gray-400', margin: '0' }}
        >
          Card SubTitle
        </Text>
      </CardHeader>
      <CardBody>
        <Text className="typo-body-medium" style={{ margin: '0' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          quibusdam doloremque optio. Ipsum nobis eligendi temporibus nemo
          consequuntur, similique architecto.
        </Text>
      </CardBody>
      <CardFooter>
        <Button variant="text">Learn More</Button>
      </CardFooter>
    </Card>
  );
};

const ComplexCardTemplate = () => {
  return (
    <Card style={{ maxWidth: '300px' }}>
      <CardHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '10px'
        }}
      >
        <Avatar size="sm" style={{ backgroundColor: 'purple' }}>
          H
        </Avatar>
        <Box style={{ flex: '1' }}>
          <Text as="h3" className="typo-title-medium" style={{ margin: '0' }}>
            Pasta
          </Text>
          <Text
            className="typo-label-medium"
            style={{ color: 'gray-400', margin: '0' }}
          >
            2025.03.20
          </Text>
        </Box>
        <ButtonBase
          style={{
            display: 'inline-flex',
            padding: '8px',
            borderRadius: '50%'
          }}
        >
          <MorevertIcon />
        </ButtonBase>
      </CardHeader>
      <img
        src="https://recipe1.ezmember.co.kr/cache/recipe/2022/09/30/8e7eb8e3019532a8dc6d39a9a325aad41.jpg"
        alt="pasta"
      />
      <CardBody>
        <Text className="typo-body-medium" style={{ margin: '0' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          quibusdam doloremque optio. Ipsum nobis eligendi temporibus nemo
          consequuntur, similique architecto.
        </Text>
      </CardBody>
      <CardFooter>
        <Checkbox
          icon={<FavoriteBorderIcon />}
          checkedIcon={<FavoriteIcon />}
          color="red"
        />
        <Checkbox
          icon={<BookmarkBorderIcon />}
          checkedIcon={<BookmarkIcon />}
          color="gray-800"
        />
        <Text
          className="typo-label-medium"
          style={{
            flex: '1',
            textAlign: 'end',
            margin: '0 10px',
            color: 'gray-500'
          }}
        >
          조회수 14
        </Text>
      </CardFooter>
    </Card>
  );
};

const ClickableCardTemplate = () => {
  const CARD_ITEMS = [
    {
      id: 1,
      title: 'Plants',
      description: 'Plants are essential for all life.'
    },
    {
      id: 2,
      title: 'Animals',
      description: 'Animals are a part of nature.'
    },
    {
      id: 3,
      title: 'Humans',
      description: 'Humans depend on plants and animals for survival.'
    }
  ];
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <Grid columns={2} spacing={20}>
      {CARD_ITEMS.map(({ id, title, description }) => (
        <Card
          as={ButtonBase}
          key={id}
          style={{
            backgroundColor: id === selectedCard ? 'gray-200' : 'white'
          }}
          onClick={() => setSelectedCard(id)}
        >
          <CardHeader className="typo-title-medium">{title}</CardHeader>
          <CardBody className="typo-body-medium">{description}</CardBody>
        </Card>
      ))}
    </Grid>
  );
};

export const BasicCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>Card Header</CardHeader>
      <CardBody>Card Body</CardBody>
      <CardFooter>
        <Button>Learn More</Button>
        <Button variant="text">Delete Card</Button>
      </CardFooter>
    </Card>
  )
};

export const Elevation: Story = {
  render: (args) => <CardTemplate elevation={10} {...args} />
};

export const Outlined: Story = {
  render: (args) => <CardTemplate outlined elevation={0} {...args} />
};

export const Round: Story = {
  render: (args) => (
    <Stack direction="row" spacing={20}>
      <CardTemplate round="sm" {...args} />
      <CardTemplate round="md" {...args} />
      <CardTemplate round="lg" {...args} />
    </Stack>
  )
};

export const ComplexCard: Story = {
  render: (args) => <ComplexCardTemplate {...args} />
};

export const ClickableCard: Story = {
  render: (args) => <ClickableCardTemplate {...args} />
};
