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
      description: '버튼 중앙에 위치한 아이콘'
    },
    children: {
      description: '버튼 내부 내용(label)'
    },
    color: {
      description: '버튼 색상',
      defaultValue: { summary: 'primary' }
    },
    disabled: {
      description: 'true이면, 비활성화됨',
      type: 'boolean',
      defaultValue: { summary: 'false' }
    },
    elevation: {
      description: 'elevation(box-shadow) 정도',
      defaultValue: { summary: '0' }
    },
    fullWidth: {
      description: 'true이면, 버튼 너비는 parent의 너비와 동일하게 맞춰짐',
      defaultValue: { summary: 'false' }
    },
    href: {
      description: '링크 url (a 태그로 변환해줌)',
      type: 'string'
    },
    isSquareSize: {
      description: 'true인 경우, 가로 세로 크기가 동일하게 됨',
      defaultValue: { summary: 'false' }
    },
    leftIcon: {
      description: '버튼 왼쪽에 위치한 아이콘'
    },
    loading: {
      description: 'true이면, 로딩 중임',
      defaultValue: { summary: 'false' }
    },
    loadingState: {
      description: '로딩 상태',
      defaultValue: { summary: '<CircularProgress />' }
    },
    loadingStatePosition: {
      description: '로딩 상태 위치',
      table: {
        type: { summary: 'left | center | right' },
        defaultValue: { summary: 'center' }
      }
    },
    rightIcon: {
      description: '버튼 오른쪽에 위치한 아이콘'
    },
    shape: {
      description: '버튼 모양 (border-radius)',
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
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

const LeftIcon = () => <MailIcon />;
const CenterIcon = () => <CartIcon />;
const RightIcon = () => <ArrowDownIcon />;

export const BasicButton: Story = {
  render: (args) => <Button {...args}>Label</Button>
};

export const ButtonVariant: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" {...args}>
          Label
        </Button>
        <Button variant="subtle-filled" {...args}>
          Label
        </Button>
        <Button variant="outlined" {...args}>
          Label
        </Button>
        <Button variant="text" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const ButtonShape: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button shape="rounded" {...args}>
          Label
        </Button>
        <Button shape="pill" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button variant="filled" disabled {...args}>
          Label
        </Button>
        <Button variant="subtle-filled" disabled {...args}>
          Label
        </Button>
        <Button variant="outlined" disabled {...args}>
          Label
        </Button>
        <Button variant="text" disabled {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const LinkButton: Story = {
  render: (args) => {
    return (
      <Button href="#" {...args}>
        Label
      </Button>
    );
  }
};

export const LeftIconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button leftIcon={<LeftIcon />} variant="filled" {...args}>
          Label
        </Button>
        <Button leftIcon={<LeftIcon />} variant="subtle-filled" {...args}>
          Label
        </Button>
        <Button leftIcon={<LeftIcon />} variant="outlined" {...args}>
          Label
        </Button>
        <Button leftIcon={<LeftIcon />} variant="text" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const RightIconButton: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button rightIcon={<RightIcon />} variant="filled" {...args}>
          Label
        </Button>
        <Button rightIcon={<RightIcon />} variant="subtle-filled" {...args}>
          Label
        </Button>
        <Button rightIcon={<RightIcon />} variant="outlined" {...args}>
          Label
        </Button>
        <Button rightIcon={<RightIcon />} variant="text" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const CenterIconButton: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Stack direction="row" spacing={20}>
          <Button centerIcon={<CenterIcon />} variant="filled" {...args}>
            Label
          </Button>
          <Button centerIcon={<CenterIcon />} variant="subtle-filled" {...args}>
            Label
          </Button>
          <Button centerIcon={<CenterIcon />} variant="outlined" {...args}>
            Label
          </Button>
          <Button centerIcon={<CenterIcon />} variant="text" {...args}>
            Label
          </Button>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button centerIcon={<CenterIcon />} variant="filled" {...args} />
          <Button
            centerIcon={<CenterIcon />}
            variant="subtle-filled"
            {...args}
          />
          <Button centerIcon={<CenterIcon />} variant="outlined" {...args} />
          <Button centerIcon={<CenterIcon />} variant="text" {...args} />
        </Stack>
      </Stack>
    );
  }
};

export const MultipleIconButton: Story = {
  render: (args) => {
    return (
      <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />} {...args}>
        Label
      </Button>
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
        <Button loading loadingStatePosition="left" {...args}>
          Label
        </Button>
        <Button loading loadingStatePosition="center" {...args}>
          Label
        </Button>
        <Button loading loadingStatePosition="right" {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const FullWidth: Story = {
  render: (args) => {
    return (
      <Button fullWidth {...args}>
        Label
      </Button>
    );
  }
};

export const Elevation: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button elevation={3} {...args}>
          Label
        </Button>
        <Button elevation={5} {...args}>
          Label
        </Button>
      </Stack>
    );
  }
};

export const Color: Story = {
  render: (args) => {
    return (
      <Stack spacing={20}>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="secondary" {...args}>
            Label
          </Button>
          <Button variant="subtle-filled" color="secondary" {...args}>
            Label
          </Button>
          <Button variant="outlined" color="secondary" {...args}>
            Label
          </Button>
          <Button variant="text" color="secondary" {...args}>
            Label
          </Button>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="yellow-400" {...args}>
            Label
          </Button>
          <Button variant="subtle-filled" color="yellow-400" {...args}>
            Label
          </Button>
          <Button variant="outlined" color="yellow-400" {...args}>
            Label
          </Button>
          <Button variant="text" color="yellow-400" {...args}>
            Label
          </Button>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="green" {...args}>
            Label
          </Button>
          <Button variant="subtle-filled" color="green" {...args}>
            Label
          </Button>
          <Button variant="outlined" color="green" {...args}>
            Label
          </Button>
          <Button variant="text" color="green" {...args}>
            Label
          </Button>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="#159" {...args}>
            Label
          </Button>
          <Button variant="subtle-filled" color="#159" {...args}>
            Label
          </Button>
          <Button variant="outlined" color="#159" {...args}>
            Label
          </Button>
          <Button variant="text" color="#159" {...args}>
            Label
          </Button>
        </Stack>
        <Stack direction="row" spacing={20}>
          <Button variant="filled" color="rgb(100,100, 100)" {...args}>
            Label
          </Button>
          <Button variant="subtle-filled" color="rgb(100,100, 100)" {...args}>
            Label
          </Button>
          <Button variant="outlined" color="rgb(100,100, 100)" {...args}>
            Label
          </Button>
          <Button variant="text" color="rgb(100,100, 100)" {...args}>
            Label
          </Button>
        </Stack>
      </Stack>
    );
  }
};

export const Size: Story = {
  render: (args) => {
    return (
      <Stack direction="row" spacing={20}>
        <Button size="sm" {...args}>
          Label
        </Button>
        <Button size="md" {...args}>
          Label
        </Button>
        <Button size="lg" {...args}>
          Label
        </Button>
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
        >
          Label
        </Button>
        <Button type="submit">Submit</Button>
      </Stack>
    );
  }
};
