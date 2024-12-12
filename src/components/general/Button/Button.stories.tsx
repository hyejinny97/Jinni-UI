import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';
import { Stack } from '@/components/layout/Stack';
import { MailIcon } from '@/components/icons/MailIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { ArrowDownIcon } from '@/components/icons/ArrowDownIcon';
import { CircularProgress } from '@/components/feedback/CircularProgress';

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    centerIcon: {
      description: 'button의 중앙에 위치한 아이콘'
    },
    children: {
      description: '버튼 내부 내용(label)'
    },
    color: {
      description: 'button 색상',
      defaultValue: { summary: 'primary' }
    },
    disabled: {
      description: '버튼 비활성화',
      defaultValue: { summary: 'false' }
    },
    elevation: {
      description: 'elevation(box-shadow) 정도',
      defaultValue: { summary: '0' }
    },
    fullWidth: {
      description: '버튼 너비를 parent의 너비와 동일하게 맞춤',
      defaultValue: { summary: 'false' }
    },
    href: {
      description: '링크 url (a 태그를 반환해줌)'
    },
    isSquareSize: {
      description: 'true인 경우, 가로 세로 크기가 동일해짐',
      defaultValue: { summary: 'false' }
    },
    leftIcon: {
      description: 'button label의 왼쪽에 위치한 아이콘'
    },
    loading: {
      description: '로딩 여부(true인 경우, loading state를 나타냄)',
      defaultValue: { summary: 'false' }
    },
    loadingState: {
      description: 'loading state 형태',
      defaultValue: { summary: '<CircularProgress />' }
    },
    loadingStatePosition: {
      description: 'loading state 위치',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' }
      }
    },
    rightIcon: {
      description: 'button label의 오른쪽에 위치한 아이콘'
    },
    shape: {
      description: '버튼 모양',
      table: {
        type: { summary: 'pill | rounded' },
        defaultValue: { summary: 'rounded' }
      }
    },
    size: {
      description: '버튼 크기',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      description: '버튼 종류',
      table: {
        type: { summary: 'filled | subtle-filled | outlined | text' },
        defaultValue: { summary: 'filled' }
      }
    }
  },
  args: {
    children: 'Label',
    onClick: fn()
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

const LeftIcon = () => <MailIcon />;
const CenterIcon = () => <CartIcon />;
const RightIcon = () => <ArrowDownIcon />;

export const BasicButton: Story = {};

export const ButtonVariant: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" {...args} />
        <Button variant="subtle-filled" {...args} />
        <Button variant="outlined" {...args} />
        <Button variant="text" {...args} />
      </Stack>
    );
  }
};

export const ButtonShape: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button shape="rounded" {...args} />
        <Button shape="pill" {...args} />
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" disabled {...args} />
        <Button variant="subtle-filled" disabled {...args} />
        <Button variant="outlined" disabled {...args} />
        <Button variant="text" disabled {...args} />
      </Stack>
    );
  }
};

export const LinkButton: Story = {
  render: (args) => {
    return <Button href="#" {...args} />;
  }
};

export const LeftIconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button leftIcon={<LeftIcon />} variant="filled" {...args} />
        <Button leftIcon={<LeftIcon />} variant="subtle-filled" {...args} />
        <Button leftIcon={<LeftIcon />} variant="outlined" {...args} />
        <Button leftIcon={<LeftIcon />} variant="text" {...args} />
      </Stack>
    );
  }
};

export const RightIconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button rightIcon={<RightIcon />} variant="filled" {...args} />
        <Button rightIcon={<RightIcon />} variant="subtle-filled" {...args} />
        <Button rightIcon={<RightIcon />} variant="outlined" {...args} />
        <Button rightIcon={<RightIcon />} variant="text" {...args} />
      </Stack>
    );
  }
};

export const CenterIconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button centerIcon={<CenterIcon />} variant="filled" {...args} />
        <Button centerIcon={<CenterIcon />} variant="subtle-filled" {...args} />
        <Button centerIcon={<CenterIcon />} variant="outlined" {...args} />
        <Button centerIcon={<CenterIcon />} variant="text" {...args} />
      </Stack>
    );
  }
};

export const MultipleIconButton: Story = {
  render: (args) => {
    return (
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />} {...args} />
    );
  }
};

export const DefaultLoadingButton: Story = {
  render: (args) => {
    return <Button loading {...args} />;
  }
};

export const CustomLoadingState: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button loading loadingState="로딩중..." {...args} />
        <Button
          loading
          loadingState={
            <CircularProgress
              trailColor="rgba(0, 0, 0, 0.2)"
              progressColor="white"
              size={20}
            />
          }
          {...args}
        />
      </Stack>
    );
  }
};

export const LoadingStatePosition: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button loading loadingStatePosition="left" {...args} />
        <Button loading loadingStatePosition="center" {...args} />
        <Button loading loadingStatePosition="right" {...args} />
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => {
    return <Button fullWidth {...args} />;
  }
};

export const Elevation: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button elevation={3} {...args} />
        <Button elevation={5} {...args} />
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="secondary" {...args} />
          <Button variant="subtle-filled" color="secondary" {...args} />
          <Button variant="outlined" color="secondary" {...args} />
          <Button variant="text" color="secondary" {...args} />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="yellow-400" {...args} />
          <Button variant="subtle-filled" color="yellow-400" {...args} />
          <Button variant="outlined" color="yellow-400" {...args} />
          <Button variant="text" color="yellow-400" {...args} />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="green" {...args} />
          <Button variant="subtle-filled" color="green" {...args} />
          <Button variant="outlined" color="green" {...args} />
          <Button variant="text" color="green" {...args} />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="#159" {...args} />
          <Button variant="subtle-filled" color="#159" {...args} />
          <Button variant="outlined" color="#159" {...args} />
          <Button variant="text" color="#159" {...args} />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="rgb(100,100, 100)" {...args} />
          <Button variant="subtle-filled" color="rgb(100,100, 100)" {...args} />
          <Button variant="outlined" color="rgb(100,100, 100)" {...args} />
          <Button variant="text" color="rgb(100,100, 100)" {...args} />
        </Stack>
      </Stack>
    );
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button size="sm" {...args} />
        <Button size="md" {...args} />
        <Button size="lg" {...args} />
      </Stack>
    );
  }
};

export const SquareSize: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Stack direction="row" spacing={20}>
          <Button
            variant="filled"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="subtle-filled"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="outlined"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="text"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button
            variant="filled"
            shape="pill"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="subtle-filled"
            shape="pill"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="outlined"
            shape="pill"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
          <Button
            variant="text"
            shape="pill"
            centerIcon={<CenterIcon />}
            isSquareSize
            {...args}
          />
        </Stack>
      </Stack>
    );
  }
};

export const CustomButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button
          style={{
            background: 'linear-gradient(#e66465, #9198e5)',
            border: 'none'
          }}
          {...args}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    );
  }
};
