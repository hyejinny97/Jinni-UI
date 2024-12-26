import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Text> = {
  component: Text,
  argTypes: {
    as: {
      defaultValue: { summary: '<p>' }
    },
    children: {
      description: '텍스트 콘텐츠'
    },
    lineClamp: {
      description: '보여지는 라인 수'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Text>;

export const BasicText: Story = {
  render: (args) => {
    return <Text {...args}>Hello, world!</Text>;
  }
};

export const HTMLSemanticElement: Story = {
  render: (args) => {
    return (
      <Stack>
        <Text as="h1" {...args}>
          h1
        </Text>
        <Text as="h2" {...args}>
          h2
        </Text>
        <Text as="h3" {...args}>
          h3
        </Text>
        <Text as="h4" {...args}>
          h4
        </Text>
        <Text as="h5" {...args}>
          h5
        </Text>
        <Text as="h6" {...args}>
          h6
        </Text>
        <Text as="p" {...args}>
          p
        </Text>
        <Text as="b" {...args}>
          bold
        </Text>
        <Text as="i" {...args}>
          italic
        </Text>
        <Text as="u" {...args}>
          underline
        </Text>
        <Text as="abbr" {...args}>
          I18N
        </Text>
        <Text as="cite" {...args}>
          citation
        </Text>
        <Text as="del" {...args}>
          deleted
        </Text>
        <Text as="em" {...args}>
          emphasis
        </Text>
        <Text as="ins" {...args}>
          inserted
        </Text>
        <Text as="kbd" {...args}>
          ctrl + c
        </Text>
        <Text as="mark" {...args}>
          highlighted
        </Text>
        <Text as="s" {...args}>
          strikethrough
        </Text>
        <Text as="samp" {...args}>
          sample
        </Text>
        <Text as="sub" {...args}>
          sub
        </Text>
        <Text as="sup" {...args}>
          sup
        </Text>
      </Stack>
    );
  }
};

export const Typography: Story = {
  render: (args) => {
    return (
      <Stack>
        <Text className="typo-display-large" {...args}>
          display-large
        </Text>
        <Text className="typo-display-medium" {...args}>
          display-medium
        </Text>
        <Text className="typo-display-small" {...args}>
          display-small
        </Text>
        <Text className="typo-headline-large" {...args}>
          headline-large
        </Text>
        <Text className="typo-headline-medium" {...args}>
          headline-medium
        </Text>
        <Text className="typo-headline-small" {...args}>
          headline-small
        </Text>
        <Text className="typo-title-large" {...args}>
          title-large
        </Text>
        <Text className="typo-title-medium" {...args}>
          title-medium
        </Text>
        <Text className="typo-title-small" {...args}>
          title-small
        </Text>
        <Text className="typo-body-large" {...args}>
          body-large
        </Text>
        <Text className="typo-body-medium" {...args}>
          body-medium
        </Text>
        <Text className="typo-body-small" {...args}>
          body-small
        </Text>
        <Text className="typo-label-large" {...args}>
          label-large
        </Text>
        <Text className="typo-label-medium" {...args}>
          label-medium
        </Text>
        <Text className="typo-label-small" {...args}>
          label-small
        </Text>
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Text {...args}>
        텍스트 중{' '}
        <Text
          as="mark"
          style={{
            backgroundColor: 'primary',
            color: 'white',
            padding: '2px 5px',
            borderRadius: '3px'
          }}
        >
          하이라이트
        </Text>
        되는 부분입니다.
      </Text>
    );
  }
};

export const LineClamp: Story = {
  render: (args) => {
    return (
      <Text lineClamp={3} {...args}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum,
        excepturi totam minus nulla ut et quia consectetur dolorem culpa ullam
        ab voluptate quae aliquam, accusantium nesciunt magnam officia, magni
        libero quasi! Et veniam enim sit assumenda modi dolores sint, omnis
        eveniet. Consequatur maiores architecto blanditiis, explicabo maxime
        facere dolorem dicta reiciendis quisquam sed autem, tenetur a minus.
        Quam, repellat iure veritatis aperiam delectus necessitatibus labore
        temporibus accusantium at amet neque numquam nam perferendis est ullam
        quidem facilis consectetur dicta omnis? Facere architecto inventore,
        doloribus nisi harum rerum, sequi dolore nam voluptatum quis unde?
        Quibusdam at cupiditate officia magni veniam sapiente?
      </Text>
    );
  }
};

export const Customization: Story = {
  render: (args) => {
    return (
      <Text
        {...args}
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          textDecorationLine: 'underline'
        }}
      >
        text
      </Text>
    );
  }
};
